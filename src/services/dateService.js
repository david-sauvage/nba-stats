import { format, utcToZonedTime } from 'date-fns-tz'

const NY_TIMEZONE = 'America/New_York'
const DAY_FORMAT = 'yyyy-MM-dd'

export default {
  getDayInUsa: function (utcDate) {
    return format(utcToZonedTime(new Date(utcDate), NY_TIMEZONE), DAY_FORMAT)
  }
}
