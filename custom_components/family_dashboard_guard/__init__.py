"""Guard Git-owned dashboard state."""

from __future__ import annotations

from homeassistant.components import frontend
from homeassistant.core import HomeAssistant


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Remove the superseded built-in Home panel."""
    frontend.async_remove_panel(hass, "home", warn_if_unknown=False)
    return True
