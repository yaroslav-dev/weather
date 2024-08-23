import axios from 'axios'
const weatherAPIKey = 'd1271d0ec082e4e555d9401c654290e2'

export const getUserData = () => {
  return new Promise((res, rej) => {
    axios.get('https://ipapi.co/json/')
      .then(response => {
        res(response.data)
      })
      .catch(error => {
        rej(error)
      })
  })
}

export const getWeatherData = (lat, lon) => {
  return new Promise((res, rej) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=metric`)
      .then((response) => {
        res(response.data)
      })
      .catch((error) => {
        rej(error)
      })
  })
}

export const getGeoData = (lat, lon) => {
  return new Promise((res, rej) => {
    axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=0&appid=${weatherAPIKey}`)
      .then((response) => {
        res(response.data)
      })
      .catch((error) => {
        rej(error)
      })
  })
}

export const getHourlyWeatherData = (lat, lon, limit) => {
  return new Promise((res, rej) => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}${limit ? '&cnt=' : ''}${limit ? limit : ''}&appid=${weatherAPIKey}&units=metric`)
      .then((response) => {
        res(response.data)
      })
      .catch((error) => {
        rej(error)
      })
  })
}

