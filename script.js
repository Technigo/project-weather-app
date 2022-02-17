const displayWeatherInfo = document.getElementById('displayWeatherInfo')

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5877e9b20cbe99b1b6637d0e4bb81238'

fetch(url)
.then((response)=>response.json())
.then((data)=>{
    console.log(data)
    cityName  = data.name
    temp      = data.main.temp.toFixed(1)
    type      = data.weather[0].description

    //display todays weather
    displayWeatherInfo.innerHTML = 
    `<div class = "weatherInfo">
    <p class="degree">${temp}°c</p>
     <p class="cityName">${cityName}</p>
     <p class="tempType">${type.charAt(0).toUpperCase()}${type.slice(1)}</p>
     
    
    </div>`

})


