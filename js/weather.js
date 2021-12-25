import { render } from "./render.js";
import { storage } from "./storage.js";

const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastServerUrl = 'https://api.openweathermap.org/data/2.5/forecast'
const apiKey = '920b4a118979e137690af39581c7f381';
const metric = '&units=metric'

export const weather = {
  info: null,
  forecast: null,
  getCityInfo: async cityName => {
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}${metric}`;
    try {
      let response = await fetch(url)
      if (response.status === 404) {
        throw new Error("City is not found")
      }
      let info = await response.json()
      weather.info = info 
      storage.saveCurrentCity(info.name)
    } catch (err) {
      alert(err)
    }
  },
  getForecast: async cityName => {
    const url = `${forecastServerUrl}?q=${cityName}&appid=${apiKey}${metric}`;
    try {
      let response = await fetch(url)
      if (response.status === 404) {
        throw new Error("Forecast not found:(")
      }
      let forecast = await response.json()
      weather.forecast = forecast 
    } catch (err) {
      alert(err)
    }
  },
  getInfoAndRender: async cityName => {
    try {
      await weather.getCityInfo(cityName)
      await weather.getForecast(cityName)
      render.all()
    } catch (err) {
      alert(err)
    }
  }
}
