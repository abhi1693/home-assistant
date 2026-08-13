"""Expose pending Seerr requests and admin-only approval actions."""

from __future__ import annotations

import asyncio
from datetime import timedelta
import logging
from typing import Any

from aiohttp import ClientError, ClientSession, ClientTimeout
import voluptuous as vol

from homeassistant.components.sensor import PLATFORM_SCHEMA, SensorEntity
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import (
    CoordinatorEntity,
    DataUpdateCoordinator,
    UpdateFailed,
)

from . import DOMAIN
from .model import request_summary

_LOGGER = logging.getLogger(__name__)

ATTR_REQUEST_ID = "request_id"
CONF_API_KEY = "api_key"
CONF_BASE_URL = "base_url"
CONF_EXTERNAL_URL = "external_url"
SERVICE_APPROVE = "approve"
SERVICE_DECLINE = "decline"
SCAN_INTERVAL = timedelta(seconds=60)

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend(
    {
        vol.Required(CONF_API_KEY): cv.string,
        vol.Required(CONF_BASE_URL): cv.url,
        vol.Required(CONF_EXTERNAL_URL): cv.url,
    }
)

REQUEST_SCHEMA = vol.Schema(
    {vol.Required(ATTR_REQUEST_ID): vol.All(vol.Coerce(int), vol.Range(min=1))}
)


class SeerrApiError(HomeAssistantError):
    """A safe Seerr API error that never includes credentials or payloads."""


class SeerrClient:
    """Small authenticated client for the Seerr request API."""

    def __init__(self, session: ClientSession, base_url: str, api_key: str) -> None:
        self._session = session
        self._base_url = base_url.rstrip("/")
        self._headers = {"X-Api-Key": api_key, "Accept": "application/json"}

    async def async_pending_requests(self) -> list[dict[str, Any]]:
        """Fetch pending requests and resolve their human-readable titles."""
        payload = await self._async_request(
            "GET",
            "/request",
            params={
                "filter": "pending",
                "take": "20",
                "skip": "0",
                "sort": "added",
                "sortDirection": "desc",
            },
        )
        requests = payload.get("results") if isinstance(payload, dict) else None
        if not isinstance(requests, list):
            raise SeerrApiError("Seerr returned an invalid request list")

        details = await asyncio.gather(
            *(self._async_media_detail(item) for item in requests),
            return_exceptions=True,
        )
        summaries = []
        for item, detail in zip(requests, details, strict=True):
            if isinstance(detail, Exception):
                _LOGGER.warning(
                    "Unable to resolve the title for Seerr request %s",
                    item.get("id"),
                )
                detail = {}
            summaries.append(request_summary(item, detail))
        return summaries

    async def async_set_status(self, request_id: int, status: str) -> None:
        """Approve or decline one request without retrying the mutation."""
        await self._async_request("POST", f"/request/{request_id}/{status}")

    async def _async_media_detail(self, request: dict[str, Any]) -> dict[str, Any]:
        media = request.get("media") or {}
        media_type = request.get("type") or media.get("mediaType")
        media_id = media.get("tmdbId")
        if media_type not in {"movie", "tv"} or not isinstance(media_id, int):
            return {}
        detail = await self._async_request("GET", f"/{media_type}/{media_id}")
        return detail if isinstance(detail, dict) else {}

    async def _async_request(
        self,
        method: str,
        path: str,
        *,
        params: dict[str, str] | None = None,
    ) -> Any:
        url = f"{self._base_url}/api/v1{path}"
        try:
            async with self._session.request(
                method,
                url,
                headers=self._headers,
                params=params,
                timeout=ClientTimeout(total=10),
            ) as response:
                if response.status >= 400:
                    raise SeerrApiError(f"Seerr returned HTTP {response.status}")
                return await response.json()
        except SeerrApiError:
            raise
        except (ClientError, TimeoutError) as err:
            raise SeerrApiError("Unable to reach Seerr") from err


class FamilySeerrCoordinator(DataUpdateCoordinator[list[dict[str, Any]]]):
    """Poll the small pending queue and serialize status changes."""

    def __init__(self, hass: HomeAssistant, client: SeerrClient) -> None:
        super().__init__(
            hass,
            _LOGGER,
            name="Family Seerr requests",
            update_interval=SCAN_INTERVAL,
        )
        self.client = client
        self.action_lock = asyncio.Lock()

    async def _async_update_data(self) -> list[dict[str, Any]]:
        try:
            return await self.client.async_pending_requests()
        except SeerrApiError as err:
            raise UpdateFailed(str(err)) from err


class FamilySeerrRequestsSensor(CoordinatorEntity, SensorEntity):
    """One entity carrying sanitized pending-request summaries."""

    _attr_has_entity_name = False
    _attr_icon = "mdi:movie-check-outline"
    _attr_name = "Seerr pending requests"
    _attr_unique_id = "family-seerr-pending-requests"

    def __init__(
        self, coordinator: FamilySeerrCoordinator, external_url: str
    ) -> None:
        super().__init__(coordinator)
        self._external_url = external_url

    @property
    def native_value(self) -> int:
        """Return the number of requests awaiting approval."""
        return len(self.coordinator.data or [])

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Expose only data needed by the admin request card."""
        return {
            "requests": self.coordinator.data or [],
            "external_url": self._external_url,
        }


async def _async_require_admin(hass: HomeAssistant, call: ServiceCall) -> None:
    user_id = call.context.user_id
    user = await hass.auth.async_get_user(user_id) if user_id else None
    if user is None or not user.is_active or not user.is_admin:
        raise HomeAssistantError(
            "An active Home Assistant administrator is required to manage requests"
        )


async def async_setup_platform(
    hass: HomeAssistant,
    config: dict[str, Any],
    async_add_entities: AddEntitiesCallback,
    discovery_info: dict[str, Any] | None = None,
) -> None:
    """Set up the pending queue and its protected actions."""
    del discovery_info
    client = SeerrClient(
        async_get_clientsession(hass),
        str(config[CONF_BASE_URL]),
        config[CONF_API_KEY],
    )
    coordinator = FamilySeerrCoordinator(hass, client)
    await coordinator.async_refresh()
    async_add_entities(
        [FamilySeerrRequestsSensor(coordinator, str(config[CONF_EXTERNAL_URL]))]
    )
    hass.data[DOMAIN] = coordinator

    async def async_manage(call: ServiceCall, status: str) -> None:
        await _async_require_admin(hass, call)
        request_id = call.data[ATTR_REQUEST_ID]
        async with coordinator.action_lock:
            pending_ids = {
                item.get("id") for item in (coordinator.data or [])
            }
            if request_id not in pending_ids:
                await coordinator.async_refresh()
                pending_ids = {
                    item.get("id") for item in (coordinator.data or [])
                }
            if request_id not in pending_ids:
                raise HomeAssistantError("This request is no longer pending")
            await client.async_set_status(request_id, status)
            await coordinator.async_refresh()

    async def async_approve(call: ServiceCall) -> None:
        await async_manage(call, SERVICE_APPROVE)

    async def async_decline(call: ServiceCall) -> None:
        await async_manage(call, SERVICE_DECLINE)

    hass.services.async_register(
        DOMAIN, SERVICE_APPROVE, async_approve, schema=REQUEST_SCHEMA
    )
    hass.services.async_register(
        DOMAIN, SERVICE_DECLINE, async_decline, schema=REQUEST_SCHEMA
    )
