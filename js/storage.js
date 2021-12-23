export const storage = {
  saveFavoriteCities: function (favoriteCities) {
    if (!favoriteCities) {
      return
    }
    const favorites = JSON.stringify(favoriteCities)
    localStorage.setItem("favoriteCities", favorites)
  },
  getFavoriteCities: function () {
    const favoriteCities = localStorage.getItem("favoriteCities")
    if (!favoriteCities) {
      return []
    }
    return JSON.parse(favoriteCities)
  },
  saveCurrentCity: function (currentCity) {
    if (!currentCity) {
      return
    }
    localStorage.setItem("currentCity", currentCity)
  },
  getCurrentCity: function () {
    const currentCity = localStorage.getItem("currentCity")
    if (!currentCity) {
      return "Aktobe"
    }
    return currentCity
  },
}
