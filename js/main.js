import {UI} from './view.js'
const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let newInfo = null;
const favoriteLocations = []

UI.FORM.addEventListener("submit", formHandler)

UI.LIKE.addEventListener('click', likeHandler)

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
  UI.LIKE.classList.remove('active')
  favoriteLocations.forEach(location => {
    if (location.textContent === newInfo.name) {
      UI.LIKE.classList.add('active')
      return
    }
  })
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

function likeHandler() {
  const cityName = UI.TAB.NOW.querySelector('.now__location').textContent

  function findInFavoriteIndex() {
    const inFavoriteIndex = favoriteLocations.findIndex(location => location.textContent === cityName)
    return inFavoriteIndex
  }

  function deleteBtnHandler(event) {
    event.stopPropagation()
    if (this.parentElement.textContent === UI.TAB.NOW.querySelector('.now__location').textContent) {
      UI.LIKE.classList.remove("active")
    }
    const index = findInFavoriteIndex()
    favoriteLocations.splice(index, 1)
    fillFavorite()
  }

  function locationHandler() {
    getCityInfo(cityName)
      .then(() => {
      fillTabNow()
      })
      .catch(e => alert(e))
  }

  const inFavoriteIndex = findInFavoriteIndex()

  if (inFavoriteIndex === -1) {
    const location = document.createElement('div')
    const btn = document.createElement('button')
    location.classList.add("location")
    location.textContent = cityName
    btn.classList.add('location__delete')
    btn.addEventListener('click', deleteBtnHandler)
    location.append(btn)
    location.addEventListener('click', locationHandler)
    favoriteLocations.push(location)
    fillFavorite()
    return
  }
  
  favoriteLocations.splice(inFavoriteIndex, 1)
  fillFavorite()
}

function fillFavorite() {
  UI.LOCATIONS.innerHTML = ""
  favoriteLocations.forEach(location => {
    UI.LOCATIONS.append(location)
  })
}

function start(cityName) {
  getCityInfo(cityName)
  .then(() => {
  fillTabNow();
  })
  .catch(e => {
    alert(e)
  })
}

start('Мончегорск')
