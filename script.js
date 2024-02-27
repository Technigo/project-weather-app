// DOM selectors
const onLoadContainer = document.getElementById('content-on-load')

//Global scope
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const targetCity = 'umea,sweden'
const API_KEY = '&APPID=9fd58fe4bdef8641db37b66e72207fcb'
const units = '&units=metric'
const URL = `${BASE_URL}${targetCity}${units}${API_KEY}`


//Function to update HTML with forecast
const updateHtml = (data) => {
  const weather = data.weather[0].description
  const city = data.name
  const temp = Math.round(data.main.temp)
  
  //sunrise and sunset
  const rise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  const set = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

  onLoadContainer.innerHTML = `<h3>It is ${temp} degrees celsius and ${weather} in ${city} today
    The sun goes up at ${rise} and goes down at ${set}`
}

//Fetching the API and converting to Json
fetch(URL)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    updateHtml(data)
    console.log(data)
   
  })
  .catch((error) => console.log(error))

/*
const requestSweden = fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=9fd58fe4bdef8641db37b66e72207fcb').then(response => response.json())
const requestSpain = fetch('https://api.openweathermap.org/data/2.5/weather?q=Madrid,Spain&units=metric&APPID=9fd58fe4bdef8641db37b66e72207fcb').then(response => response.json())
const requestThailand = fetch('https://api.openweathermap.org/data/2.5/weather?q=Krabi,Thailand&units=metric&APPID=9fd58fe4bdef8641db37b66e72207fcb').then(response => response.json())
    Promise.all([requestSweden, requestSpain, requestThailand])
      .then(([data1, data2, data3]) => {
        console.log(data1, data2, data3)
        onLoadContainer.innerHTML = `<h3>The weather in Sweden is: ${data1.main.temp}
        The weather in Spain is: ${data2.name}
        The weather in Thailand is: ${data3.name}</h3>`
      })
      .catch(error => {
        console.error(error)
      })
      */
