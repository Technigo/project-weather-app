// DOM-SELECTORS
const dailyContent = document.getElementById('dailyContent')
const weeklyContent = document.getElementById('weeklyContent')

const weatherGothenburgToday = "https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=6f4589c9a1ed485fe713e8f5159a6ff9"

fetch(weatherGothenburgToday)
    .then((res)=>res.json())
    .then((data) => {
        console.log(data);
        dailyContent.innerHTML =`
        <div class="main-daily-info">
         <div class="daily-temp">
          <h1>${Math.round(data.main.temp)}
           <span class="celcius">°C</span>
          </h1>
         </div>
         <h2>${data.name}</h2>
         <h3>${data.weather[0].main}</h3>
        </div>
        `
    })

   
    
    
    // sunrise 22:30 sunset 00:00 json.sys.sunrise, json.sys.sunset

