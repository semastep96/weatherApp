export const storage = {
  saveFavoriteCities: function (favoriteCities) {
    if (!favoriteCities) {
      return
    }
    const favorites = JSON.stringify([...favoriteCities])
    localStorage.setItem("favoriteCities", favorites)
  },
  getFavoriteCities: function () {
    const favoriteCities = localStorage.getItem("favoriteCities")
    if (!favoriteCities) {
      return new Set([])
    }
    return new Set(JSON.parse(favoriteCities))
  },
}
