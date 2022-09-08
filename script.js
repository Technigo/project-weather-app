const region = document.getElementById('region')
const sunrise = document.getElementById('sunrise-time')
const sunset = document.getElementById('sunset-time')

fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=fb125bc213d8ee5c4a432b3a2b24aecf")
    .then((response) => {
        return response.json()
    })

    .then((json) => {
        console.log(json)

        const weathers = json.weather
        weathers.map((weather) => {
            console.log(weather.description)

        region.innerHTML = `
        <h1> ${json.name} </h1>
        <p>${weather.description}</p>
        <p>temperature ${(json.main.temp).toFixed(1)}, feels like ${json.main.feels_like.toFixed(1)}, min temperature ${json.main.temp_min.toFixed(1)}, max temperature ${json.main.temp_max.toFixed(1)} </p>
        `
        sunrise.innerHTML = new Date(json.sys.sunrise *1000);
        //sunrise.setUTCHours(8)
        sunset.innerHTML = new Date(json.sys.sunset *1000);
        //sunset.setUTCHours(8)
            console.log(sunrise, sunset) 
        
            
        //sys: {type: 1, id: 1788, country: 'SE', sunrise: 1662523067, sunset: 1662572058} 
        //timezone: 7200 visibility: 10000
        //;

        //setUTCHours(hoursValue, minutesValue) Hur definerar jag variablerna?
        //An integer between 0 and 23, representing the hour. 
        //An integer between 0 and 59, representing the minutes.

        /*const setUTCHours = json.sys
        setUTCHours((sunrise) => {
            console.log(sunrise)
        }
        */

        })

    })




