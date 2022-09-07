const region = document.getElementById('region')
const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=fb125bc213d8ee5c4a432b3a2b24aecf")
    .then((response) => {
        return response.json()
    })

    .then((json) => {

        const weathers = json.weather
        weathers.map((weather) => {

        region.innerHTML = `
        <h1> ${json.name} </h1>
        <h3> Today </h3>
        <p>${weather.description}</p>
        <p>temperature ${(json.main.temp).toFixed(0)}°</p>
        `
        })
    })

//WEATHER-FORECAST FEATURE 
// Show a forecast for the next 5 days. You can choose how to display the forecast 
// - perhaps you want to show the min and max temperature for each day, or perhaps you want to show 
//the temperature from the middle of the day, or the humidity, what it feels like and so on.


fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=fb125bc213d8ee5c4a432b3a2b24aecf")
    .then((response) => {
        return response.json()
    })

    .then((json) => {
        console.log(json)
        
        //Filters the json to an array with only the data from 12:00 each day (5 days in total).
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)

        //weather description of each day
       filteredForecast.map((day)=>{
            console.log(day.weather[0].description)

                let weekday = new Date(day.dt_txt).getDay();
                console.log(weekdays[weekday]);


                region.innerHTML += `
                <div id="forecastSection" class="forecast-section">
                    <div id="weekdaysection" class="weekday-section">
                         <h3> ${weekdays[weekday]} </h3>
                    </div>
                    
                    <div id="temperature" class="temperature">
                    <p>${day.weather[0].description} ${(day.main.temp).toFixed(0)}°</p>
                    </div>

                </div>
                `
            
    })

    
    })