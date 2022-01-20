import { UI } from "./view.js"
import { weather } from "./weather.js"
import { favorites } from "./favorites.js"
import { storage } from "./storage.js";
import { timeConvert } from "./time_convert.js";

export const render = {
  tabNow: () => {
    const imgSrc = `img/weather/${weather.info.weather[0].icon}.png`

    UI.TAB.NOW.querySelector('.now__location').innerText = weather.info.name
    UI.TAB.NOW.querySelector('.now__celsius>span').innerText = Math.round(weather.info.main.temp)
    UI.TAB.NOW.querySelector('.now__img').src = imgSrc
    UI.LIKE.classList.remove('active')

    favorites.cities.forEach(city => {
      if (city === weather.info.name) {
        UI.LIKE.classList.add('active')
      }
    })
  },

  favorites: () => {
    UI.LOCATIONS.innerHTML = ""

    favorites.cities.forEach(city => {
      function deleteBtnHandler(event) {
        const isDeleteCurrent = city === UI.TAB.NOW.querySelector('.now__location').textContent

        event.stopPropagation()
        this.parentElement.remove()
        if (isDeleteCurrent) {
          UI.LIKE.classList.remove('active')
        }
        favorites.deleteCity(city)
        storage.saveFavoriteCities(favorites.cities)
      }
      
      function locationHandler() {
        weather.getInfoAndRender(city).catch(alert)
      }

      function createLocationDiv() {
        const location = document.createElement('div')
        const btn = document.createElement('button')
        location.classList.add("location")
        location.textContent = city
        btn.classList.add('location__delete')
        btn.addEventListener('click', deleteBtnHandler)
        location.append(btn)
        location.addEventListener('click', locationHandler)
        return location
      }

      UI.LOCATIONS.append(createLocationDiv())
    })
  },

  details: () => {
    const sunrise = timeConvert(weather.info.sys.sunrise)
    const sunset = timeConvert(weather.info.sys.sunset)

    UI.TAB.DETAILS.querySelector('.location').textContent = weather.info.name;
    UI.TAB.DETAILS.querySelector('.details__temperature span').textContent = Math.round(weather.info.main.temp)
    UI.TAB.DETAILS.querySelector('.details__feels span').textContent = Math.round(weather.info.main.feels_like)
    UI.TAB.DETAILS.querySelector('.details__weather span').textContent = weather.info.weather[0].main
    UI.TAB.DETAILS.querySelector('.details__sunrise span').textContent = `${sunrise.hours}:${sunrise.minutes}`
    UI.TAB.DETAILS.querySelector('.details__sunset span').textContent = `${sunset.hours}:${sunset.minutes}`
  },

  forecast: () => {
    const container = UI.TAB.FORECAST.querySelector('.forecast__cards')

    UI.TAB.FORECAST.querySelector('.location').textContent = weather.forecast.city.name
    
    container.innerHTML = ""
    weather.forecast.list.forEach(forecast => {
      const date = timeConvert(forecast.dt)
      const div = document.createElement('div')
      div.classList.add('forecast__card', 'card')
      div.append(createCardTop())
      div.append(createCardBottom())
      container.append(div)

      function createCardTop() {
        const cardTop = document.createElement('div')
        cardTop.classList.add('card__top')
  
        const cardDate = document.createElement('div')
        cardDate.classList.add('card__date')
        cardDate.textContent = `${date.day} ${date.month}`
  
        const cardTime = document.createElement('div')
        cardTime.classList.add('card__time')
        cardTime.textContent = `${date.hours}:${date.minutes}`
  
        cardTop.append(cardDate)
        cardTop.append(cardTime)
        return cardTop
      }

      function createCardBottom () {
        const cardTemperature = document.createElement('div')
        cardTemperature.classList.add('card__temperature')
      
        const cardReal = document.createElement('div')
        cardReal.classList.add('card__real')
        cardReal.innerHTML = `Temperature: <span>${Math.round(forecast.main.temp)}</span>°`

        const cardFeels = document.createElement('div')
        cardFeels.classList.add('card__feels')
        cardFeels.innerHTML = `Feels like: <span>${Math.round(forecast.main.feels_like)}</span>°`
        cardTemperature.append(cardReal)
        cardTemperature.append(cardFeels)

        const cardWeather = document.createElement('div')
        cardWeather.classList.add('card__weather')
        cardWeather.innerHTML = `${forecast.weather[0].main}<img src="img/weather/${forecast.weather[0].icon}.png" alt="weather" class="card__img">`

        const cardBottom = document.createElement('div')
        cardBottom.classList.add('card__bottom')
        cardBottom.append(cardTemperature)
        cardBottom.append(cardWeather)

        return cardBottom
      }
    })
  },

  all() {
    render.tabNow()
    render.favorites()
    render.details()
    render.forecast()
  },
}
