console.log('hej')

const dailyWeather = document.getElementById('dailyWeather')
const greeting = document.getElementById('greeting')
const forecast = document.getElementById('forecast')

 const API_URLD = ('https://api.openweathermap.org/data/2.5/weather?q=Berlin,de&appid=d423e9bdbd74d4fcdd3804322b8767eb')
 const API_URLF = ('https://api.openweathermap.org/data/2.5/forecast?q=Berlin,de&APPID=d423e9bdbd74d4fcdd3804322b8767eb')
    // First API - gives us Daily weather
    fetch(API_URLD)
    // fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d423e9bdbd74d4fcdd3804322b8767eb')
    .then((res) => res.json())
    .then((json) => {
        // console.log('data', data)
        console.log(json.main.temp)

        const celcius= Math.floor((json.main.temp - 273.15)) // convert kelvin to celcius
      
     

        dailyWeather.innerHTML= `
        <p>${json.weather[0].main} | ${celcius} </p> 
        <p>Sunrise ${json.sys.sunrise}</p>
        <p>Sunset ${json.sys.sunset}</p>`  
        

        // const currentSunrise = new Date(
		// 	(json.sys.sunrise * 1000 + json.sys.timezone + new Date().getTimezoneOffset())
		// ).toTimeString()
        // console.log(currentSunrise)

		//dailyWeather.innerHTML = currentSunrise




    })



    // Second API - gives us 5 days forcast
    fetch(API_URLF)
    .then((res) => res.json())
    .then((data) => {
        console.log('data', data)
        // console.log(json.main.temp)
        // console.log(json.weather[0].main)
        // console.log(json.sys.sunrise)
        // console.log(json.sys.sunset)
    })

   

 