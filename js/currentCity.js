import Cookies from './js.cookie.mjs'

export const currentCity = {
  save: function (currentCity) {
    if (!currentCity) {
      return
    }
    const inHour = new Date(new Date().getTime() + 60 * 60 * 1000)
    Cookies.set("currentCity", currentCity, {
      expires: inHour
  })
  },
  get: function () {
    const currentCity = Cookies.get("currentCity")
    if (!currentCity) {
      return "Aktobe"
    }
    return currentCity
  },
}