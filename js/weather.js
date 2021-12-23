const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastServerUrl = 'https://api.openweathermap.org/data/2.5/forecast'
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const metric = '&units=metric'

export const weather = {
  info: null,
  forecast: null,
  getCityInfo: cityName => {
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}${metric}`;
    return fetch(url)
      .then(response => { return response.json() })
      .then(info => { 
        if (!info.name) {
          throw new Error("City is not found")
        }
        weather.info = info 
      })
  },
  getForecast: cityName => {
    const url = `${forecastServerUrl}?q=${cityName}&appid=${apiKey}${metric}`;
    return fetch(url)
      .then(response => { return response.json() })
      .then(forecast => { 
        if (forecast === 404) {
          throw Error("Forecast not found:(")
        }
        weather.forecast = forecast 
      })
      .catch(alert)
  }
}
