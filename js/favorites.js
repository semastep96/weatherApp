export const favorites = {
  cities: [],
  addCity(name) {
    this.cities.push({
      name,
    })
  },
  deleteCity(name) {
    this.cities.forEach((city, index) => {
      if (name === city.name) {
        this.cities.splice(index, 1)
      }
    })
  }
}