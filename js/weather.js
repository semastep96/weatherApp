import { render } from "./render.js";
import { storage } from "./storage.js";

const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastServerUrl = 'https://api.openweathermap.org/data/2.5/forecast'
const apiKey = '920b4a118979e137690af39581c7f381';
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
        storage.saveCurrentCity(info.name)
      })
      .catch(alert)
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
  },
  getInfoAndRender(cityName) {
    return new Promise (() => {
      weather.getCityInfo(cityName)
        .then(() => {weather.getForecast(cityName).then(render.all)})
        .catch(alert)
    })
  }
}
