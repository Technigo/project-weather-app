/*Global variables*/
const header = document.getElementById('header')
const weekdays = document.getElementById('weekdays')

/*Our fetch json function, we changed the api from "weather?q=Stockholm" to "forecast?q=Stockholm", so we could get the 5 day forecast.*/
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=fed8be257d06e9a0aa60731701ed1473')
    .then ((response) => {
        return response.json()
    })
    .then((json) => {
        /*Here we have our "workable" json, that we use throughout the code.*/
        console.log(json)
        
        /*Here we are invoking our functions.*/
        getWeather(json);


        filterWeather(json);

    })
    
    /*Here we declare or getWeather function*/
    const getWeather = (json) => {       

        /*Declare 2 varibales that will make the code cleaner when we are trying to get the sunrise/sunset in our wished format*/
        const shortSunrise = json.city.sunrise;
        const shortSunset = json.city.sunset;

        /*Here we make the data given from json to 4 numbers instead of the given 10 numbers (UTC)*/
        const sunrise = new Date (shortSunrise * 1000);

        const sunset = new Date (shortSunset * 1000);

        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })
        
        /*Here we are getting the temperature that we will put in our header. Then we are rounding it to 0 decimals*/
        const number = json.list[0].main.temp;
        const rounded = Math.round(number * 10) / 10;
        
        /*Here is the header, with temperature and the city's times for sunrise and sunset.*/
        header.innerHTML +=`<p>${json.list[0].weather[0].main} | ${rounded}°C</p>`
        header.innerHTML +=`<p>sunrise ${sunriseTime}</p>`
        header.innerHTML +=`<p>sunset ${sunsetTime}</p>` 
        
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        /*We use forEach() to loop thorugh the array of the comming 5 days.
        console.log(filteredForecast)*/
 
        filteredForecast.forEach((day) => {
        console.log(day);
        /*This gives us the comming 5 weekdays in short format.*/  
        const weekDay = new Date(day.dt * 1000).toLocaleDateString('en', {weekday: 'short'});
    
        /*This gives us the temperature of the comming 5 days.*/
        const mainTemp = day.main.temp.toFixed(0)
    
        /*This displays the comming 5 days forecast in the body.*/
        weekdays.innerHTML +=`
        <li>
        <span>${weekDay}</span>
        <span>${mainTemp}°</span>
        </li>
        `
    })
 }
    
   /*Declare function filterWeather, that will show different backgrounds, colors and pictures depening on what the weather is:
     If its Cloudy in Stockholm show 'Clouds' else if ... and so on. */
const filterWeather = (json) => {
    if (json.list[0].weather[0].main == 'Clouds') {
        document.body.style.backgroundColor = "#F4F7F8";
        document.body.style.color = "#F47775";
        text.innerHTML = `
        <img class="weather-img" src="./Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="cloud img">
        <h1>Light a fire and get a blanket. ${json.city.name} is grey today.</h1>        
        `
    } else if (json.list[0].weather[0].main == 'Rain') {
        document.body.style.backgroundColor = "A3DEF7";
        document.body.style.color = "#164A68";
        text.innerHTML = `
        <img class="weather-img" src="./Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="umbrella icon">
        <h1>Don't forget you umbrella. It's wet in ${json.city.name} today.</h1>        
        `
    } else {
        document.body.style.backgroundColor = "F7E9B9";
        document.body.style.color = "#2A5510";
        text.innerHTML = `
        <img class="weather-img" src="./icons/noun_Sunglasses_2055147.svg" alt="sun-glasses icon">
        <h1>Get your shades on. ${data.city.name} is rather fair today.</h1>        
        `        
    }
}

