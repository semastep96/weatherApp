export function timeConvert(unixTime) {
  const formattedTime = {
    hours: '00',
    minutes: '00',
    day: '00',
    month: 'unknown',
  }
  
  const date = new Date(unixTime * 1000)
  const month = date.toLocaleString('en-US', {month: "short"})
  const day = date.toLocaleString('en-US', {day: "numeric"})
  const hours = date.getHours()
  const minutes = "0" + date.getMinutes()

  if (unixTime) {
    formattedTime.hours = hours;
    formattedTime.minutes = minutes.slice(-2);
    formattedTime.day = day;
    formattedTime.month = month;
  }
  return formattedTime
}