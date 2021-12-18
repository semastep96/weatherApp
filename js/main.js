import {UI} from './view.js'
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const cityName = 'boston';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let newInfo = null;

UI.FORM.addEventListener("submit", formHandler)

function formHandler() {
  const cityName = this.querySelector(".search__input").value;
  this.reset()
  getCityInfo(cityName)
    .then(() => {
    fillTabNow();
    })
    .catch(e => {
      alert(e)
    })
}

function fillTabNow() {
  const imgSrc = `img/weather/${newInfo.weather[0].icon}.png`
  UI.TAB.NOW.querySelector('.now__location').innerText = newInfo.name
  UI.TAB.NOW.querySelector('.now__celsius>span').innerText = Math.round(newInfo.main.temp)
  UI.TAB.NOW.querySelector('.now__img').src = imgSrc
}

function getCityInfo(cityName) {
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
  return fetch(url)
    .then(response => { return response.json() })
    .then(info => { 
      if (!info.name) {
        throw new Error("City is not found")
      }
      newInfo = info 
    })
}

