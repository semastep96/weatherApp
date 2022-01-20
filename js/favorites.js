export const favorites = {
  cities: new Set(),
  addCity(name) {
    this.cities.add(name)
  },
  deleteCity(name) {
    this.cities.delete(name)
  }
}