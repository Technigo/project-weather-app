const card = document.getElementById("card")

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f6d4a6b982660083075e6275bf84e753`

const city = "Stockholm"
const country = "Sweden"

//fetch json data from url variable
  fetch(weatherUrl)
      .then((response) => {
         return response.json()
      })
      .then ((json) => {
          //console.log(json)

//DOM values from json     
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
             <h2>${city}, ${country}</h2>
             <h4>${description} | ${json.main.temp}°</h4>
             <h4>sunrise: ${sunrise}</h4> 
             <h4>sunset: ${sunset}</h4>
             <img class="weather-icon" src="./design/icons/sunglasses.jpg"/>
             <h1>Get your sunnies on. Stockholm is looking rather great today.  </h1>`
           }
            else if (mainDescription === "Rain") {
           card.innerHTML = `
           <h2>${city}, ${country}</h2>
           <h4>${description} | ${temperature}°</h4>
            <h4>sunrise: ${sunrise}</h4> 
            <h4>sunset: ${sunset}</h4>
            <img class="weather-icon" src="./design/icons/umbrella.png"/>
            <h1>Don’t forget your umbrella. It’s wet in Stockholm today. </h1>` 
           }
            else if (mainDescription === "Clouds") {
             card.innerHTML = `
             <h2>${city}, ${country}</h2>
             <h4>${description} | ${temperature}°</h4>
             <h4>sunrise: ${sunrise}</h4> 
             <h4>sunset: ${sunset}</h4>
             <img class="weather-icon" src="./design/icons/cloud.jpg"/> <h1>Light a fire and get cosy. Stockholm is looking grey today.  </h1>` 
           }}

          ) 

          ;
         
      

  
      
    






