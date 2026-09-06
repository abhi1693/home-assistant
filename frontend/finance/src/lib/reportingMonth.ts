import { Hass } from "./ha";
import { useReportingPeriod } from "./reportingPeriod";

export function useReportingMonth(hass:Hass,group?:string) {
  const {month,setMonth}=useReportingPeriod(hass,group);
  return [month,setMonth] as const;
}
