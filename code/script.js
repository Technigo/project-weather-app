console.log('hej')

const dailyWeather = document.getElementById('dailyWeather')
const greeting = document.getElementById('greeting')
const forecast = document.getElementById('forecast')
const icon = document.getElementById("icon")
const body = document.getElementById("body")

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
        
        //Converts time
        const rise = new Date(json.sys.sunrise * 1000);
        const up = rise.toLocaleTimeString([], {
          timeStyle: "short",
        });
        const set = new Date(json.sys.sunset * 1000);
        const down = set.toLocaleTimeString([], {
          timeStyle: "short",
        });
        
        //gets City, Weather+temp, Sunrise and Sunset
        dailyWeather.innerHTML= `
        <p>${json.name} </p>
        <p>${json.weather[0].main} | ${celcius} °C</p> 
        <p>Sunrise ${up}</p>
        <p>Sunset ${down}</p>`  

        //code for the diffrerent backgrounmessages
        const backgroundchange=()=>{
            if (json.weather[0].main === "Clear"){
             icon.src = "./icons/Sunglasses.svg"
             greeting.innerHTML += `<p>${json.name} Blue skies and sunshine on my mind!</p>`
             document.body.style.backgroundColor = "#F7E9B9";
             document.body.style.color = "#2A5510";
        }
            else if (json.weather[0].main === "Rain") {
              icon.src = "./icons/Umbrella.svg"
              greeting.innerHTML += `<p>Rain is just confetti from the sky</p>`
              document.body.style.backgroundColor = "#A3DEF7";
              document.body.style.color = "#164A68" 
            }

            else if (json.weather[0].main === "Clouds") {
            icon.src = "./Icons/Cloud.svg";
            greeting.innerHTML += `<p> Life is like a cloud; fluffy, beautiful and illusionary</p>`
            document.body.style.backgroundColor = "#F4F7F8";
            document.body.style.color = "#F47775";   
              }

            else {      
            greeting.innerHTML = `<p>The weather is the weather, you have to deal with whatever.</p>`
            document.body.style.backgroundColor = "#F7E9B9";
            document.body.style.color = "#2A5510"
            }
        }
         backgroundchange()
        
        })



    
   

 