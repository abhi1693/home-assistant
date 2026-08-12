"""Remove platform dashboards superseded by the family dashboard."""

from homeassistant.components import frontend
from homeassistant.core import HomeAssistant


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Remove the built-in Home panel after the frontend is initialized."""
    frontend.async_remove_panel(hass, "home", warn_if_unknown=False)
    return True
