const API_KEY = "f54ca9831c8974c87fd4826fae420a1a"
const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`
const API_URL_5DAYS = `https://api.openweathermap.org/data/2.5/forecast?q=Malmo,Sweden&units=metric&APPID=${API_KEY}`



fetch(API_URL)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        // const weatherContainer = document.getElementById('weather');
        // weatherContainer.innerHTML = `<h1>${json.name}</h1>`

        const cityContainer = document.getElementById('city');
        cityContainer.innerHTML = `<h1>${json.name} hej hej</h1>`
       
        const weatherContainer = document.getElementById('weather')
        json.weather.forEach((weather) => {
            const sunrise = new Date(json.sys.sunrise * 1000);
            const sunRiseTime = sunrise.toLocaleTimeString ('se-SV', { hour : '2-digit', minute : '2-digit'});
            const sunset = new Date(json.sys.sunset * 1000);
            const sunSetTime = sunset.toLocaleTimeString ('se-SV', { hour : '2-digit', minute : '2-digit'});
            
            weatherContainer.innerHTML += `<p>${weather.description} | ${json.main.temp.toFixed(1)} </p>`
            weatherContainer.innerHTML += `<p>sunrise ${sunRiseTime}</p>`
            weatherContainer.innerHTML += `<p>sunset ${sunSetTime}</p>`
        });

     }) 
    

//    const weatherColors = () => {
//        if (weather.main === "clouds")
        

//        else (weather.main === "clear")

//        else if (weather.main === "rain") || (weather.main === "drizzle")
//  }



     

fetch(API_URL_5DAYS)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        const forecastUl = document.getElementById('forecast');
        const filteredForecastMidDay = json.list.filter(item => item.dt_txt.includes('12:00'));
        
        // Didn't need all this code since todays date isn't showing
        // const dateToday = new Date();
        // const dayOfMonth = dateToday.getDate();
        // const filteredForecastNotToday = filteredForecastMidDay.filter(forecast => {
        //     const forecastDate = new Date(forecast.dt * 1000)
        //     const forecastDay = forecastDate.getDate();
        //     return dayOfMonth !== forecastDay;
        // })

        filteredForecastMidDay.forEach((forecast) => {
            const forecastDate = new Date(forecast.dt * 1000);
            const options = { weekday: 'short' };
            const weekdayString = new Intl.DateTimeFormat('en-US', options).format(forecastDate);

           forecastUl.innerHTML += `<li>${weekdayString} ${forecast.main.temp.toFixed(0)}°</li>`       
        });
     }) 

  