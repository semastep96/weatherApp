import { UI } from './view.js'
import { favorites } from './favorites.js'
import { render } from './render.js'
import { storage } from './storage.js'
import { weather } from './weather.js'

UI.FORM.addEventListener("submit", formHandler)
UI.LIKE.addEventListener("click", likeBtnHandler)

function likeBtnHandler() {
  UI.LIKE.classList.toggle('active')
  const isNew = UI.LIKE.classList.contains('active')
  const cityName = UI.TAB.NOW.querySelector('.now__location').textContent

  isNew ? favorites.addCity(cityName) : favorites.deleteCity(cityName)
  storage.saveFavoriteCities(favorites.cities)
  render.favorites()
}

export function formHandler() {
  const cityName = this.querySelector(".search__input").value;
  this.reset()
  weather.getInfoAndRender(cityName).catch(alert)
}

function start() {
  const currentCity = storage.getCurrentCity()
  favorites.cities = storage.getFavoriteCities()
  weather.getInfoAndRender(currentCity).catch(alert)
}

start()