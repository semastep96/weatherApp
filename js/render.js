import { UI } from "./view.js"
import { weather } from "./weather.js"
import { favorites } from "./favorites.js"
import { storage } from "./storage.js";

export const render = {
  tabNow: () => {
    const imgSrc = `img/weather/${weather.info.weather[0].icon}.png`
    UI.TAB.NOW.querySelector('.now__location').innerText = weather.info.name
    UI.TAB.NOW.querySelector('.now__celsius>span').innerText = Math.round(weather.info.main.temp)
    UI.TAB.NOW.querySelector('.now__img').src = imgSrc
    UI.LIKE.classList.remove('active')

    favorites.cities.forEach(city => {
      if (city.name === weather.info.name) {
        UI.LIKE.classList.add('active')
      }
    })
  },
  favorites: () => {
    UI.LOCATIONS.innerHTML = ""

    favorites.cities.forEach(city => {
      function deleteBtnHandler(event) {
        const isDeleteCurrent = city.name === UI.TAB.NOW.querySelector('.now__location').textContent

        event.stopPropagation()
        this.parentElement.remove()
        if (isDeleteCurrent) {
          UI.LIKE.classList.remove('active')
        }
        favorites.deleteCity(city.name)
        storage.saveFavoriteCities(favorites.cities)
      }
      
      function locationHandler() {
        storage.saveCurrentCity(city.name)
        weather.getCityInfo(city.name)
          .then(render.all)
          .catch(alert)
      }

      const location = document.createElement('div')
      const btn = document.createElement('button')
      location.classList.add("location")
      location.textContent = city.name
      btn.classList.add('location__delete')
      btn.addEventListener('click', deleteBtnHandler)
      location.append(btn)
      location.addEventListener('click', locationHandler)
      UI.LOCATIONS.append(location)
    })
  },
  all() {
    render.tabNow()
    render.favorites()
  },
}
