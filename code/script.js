const dailyWeather = document.getElementById('dailyWeather')
const greeting = document.getElementById('greeting')
const forecast = document.getElementById('forecast')
const icon = document.getElementById("icon")
const body = document.getElementById("body")


//Idas nyckel för 16 dagars prognos
// 87aa112f2381dd87d3641c6c22b5c78e 


 const API_URLD = ('http://api.openweathermap.org/data/2.5/weather?q=Berlin,de&APPID=d423e9bdbd74d4fcdd3804322b8767eb')
 const API_URLF = 'https://api.openweathermap.org/data/2.5/forecast?q=Berlin&units=metric&APPID=947f288ad7c7a6c1279353f3ee6f09d1'
    // First API - gives us Daily weather
    fetch(API_URLD)
    // fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d423e9bdbd74d4fcdd3804322b8767eb')
    .then((res) => res.json())
    .then((json) => {
        //console.log('data', data)
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
        <p>${json.name}</p>
        <p>${json.weather[0].main} | ${celcius} °C</p> 
        <p>Sunrise ${up}</p>
        <p>Sunset ${down}</p>`

        const backgroundchange=()=>{
          if (json.weather[0].main === "Clear"){
           icon.src = "./icons/Sunglasses.svg"
           greeting.innerHTML += `<p> Blue skies and only sunshine on your mind in ${json.name} today!</p>`
           document.body.style.backgroundColor = "#F7E9B9";
           document.body.style.color = "#2A5510";
      }
          else if (json.weather[0].main === "Rain") {
            icon.src = "./icons/Umbrella.svg"
            greeting.innerHTML += `<p>Rain in ${json.name} is just confetti from the sky!</p>`
            document.body.style.backgroundColor = "#A3DEF7";
            document.body.style.color = "#164A68" 
          }

          else if (json.weather[0].main === "Clouds") {
          icon.src = "./Icons/Cloud.svg";
          greeting.innerHTML += `<p> Life in ${json.name} is like a cloud today; fluffy, beautiful and illusionary</p>`
          document.body.style.backgroundColor = "#F4F7F8";
          document.body.style.color = "#F47775";   
            }

          else {      
          greeting.innerHTML = `<p>In ${json.name} the weather is the weather, you have to deal with whatever.</p>`
          document.body.style.backgroundColor = "#F7E9B9";
          document.body.style.color = "#2A5510"
          }
      }
       backgroundchange()
      
      })
        
        

    // Second API - gives us 5 days forcastdata
    fetch(API_URLF)
    .then((res) => res.json())
    .then((data) => {
        console.log('data', data)
        const filteredForecast = data.list.filter((item) =>
         item.dt_txt.includes("12:00")
         );
        filteredForecast.forEach((item) => {
          const date = new Date(item.dt * 1000);
          forecast.innerHTML += `
            <div class="day-style" >
             <p> ${new Date(date).toLocaleDateString("en-UK", {
             weekday: "short",
             })} </p>
            <p> ${item.main.temp.toFixed(1)}° C  </p> 
             </div>
             <hr>`;
         });


       
        // console.log(json.main.temp)
        // console.log(json.weather[0].main)
        // console.log(json.sys.sunrise)
        // console.log(json.sys.sunset)

    })

        //code for the diffrerent backgrounmessages
      



    
   

   // HTML today's weather
//    containerToday.innerHTML = `
//    <section class="weather">
//    <div class="temp_city_weather">
//    <div class="temp_city">
//    <h1>${temp}°C</h1>
//    <h2>${city}</h2>
//    <p>${weatherDescription}</p>
//    </div>
//    <img src="https://openweathermap.org/img/wn/${wIcon}@2x.png" />
//    </div>
//    <div class="sunrise_sunset">
//    <p>Sunrise: ${sunrise}</p>
//    <p>Sunset: ${sunset}</p>
//    </div>
//    </section>`
// })
// Function that shows the day and temp for the five coming days


// fetch(API_URL)
//   .then((response) => {
//     return response.json();
//   })
//   .then((json) => {
//     const filteredForecast = json.list.filter((item) =>
//       item.dt_txt.includes("12:00")
//     );
//     filteredForecast.forEach((item) => {
//       const date = new Date(item.dt * 1000);
//       bottomBox.innerHTML += `
//     <div class="day-style" >
//       <p> ${new Date(date).toLocaleDateString("en-US", {
//         weekday: "short",
//       })} </p>
//       <p> ${item.main.temp.toFixed(1)}°  </p>
//     </div>
//     <hr>
//    `;
//     });
//   });