
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Oslo,Norway&units=metric&APPID=f6d4a6b982660083075e6275bf84e753
`
const forecastUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid,Spain&units=metric&APPID=f6d4a6b982660083075e6275bf84e753`
const card = document.getElementById("card")


//fetch json data from url variable
  fetch(weatherUrl)
      .then((response) => {
         return response.json()
      })
      .then ((json) => {
          console.log(json)

//DOM values from json
       const city = json.name 
       const country = json.sys.country    
       const mainDescription = json.weather[0].main
       const description = json.weather[0].description
       const temperature = json.main.temp
       const sunrise = new Date( json.sys.sunrise * 1000).toLocaleTimeString([], {
        hour:"2-digit",
        minute:"2-digit",
      })
       const sunset = new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
        hour:"2-digit",
        minute:"2-digit",
      })
 
 //function to display todays weather from description value
           if (mainDescription === "Clear") {
             card.innerHTML = `
             <div id="clear">
             <h2>${city}, ${country}</h2>
             <h4>${description} | ${json.main.temp}°c</h4>
             <h4>sunrise: ${sunrise}</h4> 
             <h4>sunset: ${sunset}</h4>
             <img class="weather-icon" src="./design/icons/sunglassestest.png"/>
             <h1>Get your sunnies on. ${city} is looking rather great today.</h1></div>`
           }
            else if (mainDescription === "Rain") {
            card.innerHTML =`
            <div id ="rain">
            <h2>${city}, ${country}</h2>
            <h4>${description} | ${temperature}°</h4>
            <h4>sunrise: ${sunrise}</h4> 
            <h4>sunset: ${sunset}</h4>
            <img class="weather-icon" src="./design/icons/umbrellatest.png"/>
            <h1>Don’t forget your umbrella. It’s wet in ${city}today.</h1></div>` 
           }
            else if (mainDescription === "Clouds") {
             card.innerHTML = `
             <div id ="cloud">
             <h2>${city}, ${country}</h2>
             <h4>${description} | ${temperature}°c</h4>
             <h4>sunrise: ${sunrise}</h4> 
             <h4>sunset: ${sunset}</h4>
             <img class="weather-icon" src="./design/icons/cloud.png"/> <h1>Light a fire and get cosy. ${city} is looking grey today.</h1></div>` 
           }}

          ) 

          ;
         
      

  
      
    






