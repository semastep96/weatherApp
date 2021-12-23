const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

export const weather = {
  info: null,
  getCityInfo: cityName => {
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    return fetch(url)
      .then(response => { return response.json() })
      .then(info => { 
        if (!info.name) {
          throw new Error("City is not found")
        }
        weather.info = info 
        console.log(weather.info);
      })
  }
}
