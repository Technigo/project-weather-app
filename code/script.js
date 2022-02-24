//DOM selectors
const date = document.getElementById("date")
const header = document.getElementById("header")
const body = document.body;
const img = document.querySelector(".img");
const text = document.querySelector("#text");

//Global variable
let todayWeather;

//Fetch openweather forecast API 
//We use navigator.geolocation.getCurrentPosition to be able to access the current position of the device. 
navigator.geolocation.getCurrentPosition(position => {   
fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=4efc415dbf1df503974ec65e3563d721`)
.then(res => {
    //if the response isn´t ok an error will be thrown.
    if (!res.ok) {
    throw Error("Weather data not available")
    }
    return res.json()
    })
.then(data => {
    //getWeather() is used to get our weather data for today and the next 5 days and update the HTML inside the function.
   getWeather(data);

   //filterWeater() is used to style the background and font color depending on the weater.
   filterWeather(data);
 })
.catch(err => console.error(err))
});
 
const getWeather = (data) => {
    
    //Get current weather and save it to the global variable so we can access it in all functions. 
    todayWeather = data.list[0].weather[0].main;

    //Get current temperature.
    const todayTemp = data.list[0].main.temp;

    //To get the time for the sunrise and sunset we create a date object.  
    const getSunRise = new Date((data.city.sunrise + data.city.timezone + new Date().getTimezoneOffset()*60) * 1000);

    const getSunSet = new Date((data.city.sunset + data.city.timezone + new Date().getTimezoneOffset()*60) * 1000);

    //This displays the current temperature and the sunrise and sunset times in the header.
    header.innerHTML = `
    <p>${todayWeather} | ${Math.round(todayTemp)}°</p>
    <p> Sunrise ${getSunRise.getHours()}.${getSunRise.getMinutes()} </p>
    <p> Sunset ${getSunSet.getHours()}.${getSunSet.getMinutes()} </p>
    `;
    
    //Get the current weater for the next 5 days at 12:00. 
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))
    
    //We use forEach() to loop thorugh the array of the comming 5 days.
    filteredForecast.forEach((day) => {
    
    //This gives us the comming 5 weekdays in short format.    
    const weekDay = new Date(day.dt * 1000).toLocaleDateString('en', {weekday: 'short'});

    //This gives us the temperature of the comming 5 days.
    const mainTemp = day.main.temp.toFixed(0)

    //This displays the comming 5 days forecast in the body.
    date.innerHTML +=`
    <li>
    <span>${weekDay}</span>
    <span>${mainTemp}°</span>
    </li>
    ` 
})
}

//If-else statement for changing styling depending on todaysWeather.
const filterWeather = (data) => {
    if (todayWeather === "Rain") {
        body.classList.toggle("rainy");
        text.innerHTML = `
        <img class="img" src="./icons/noun_Umbrella_2030530.svg" alt="umbrella icon">
        <h1>Don't forget you umbrella. It's wet in ${data.city.name} today.</h1>        
        `
    }  
    else if (todayWeather === "Clear") {
        body.classList.toggle("sunny");
        text.innerHTML = `
        <img class="img" src="./icons/noun_Sunglasses_2055147.svg" alt="sun-glasses icon">
        <h1>Get your sunnies on. ${data.city.name} is rather great today.</h1>        
        `
    } else {
        body.classList.remove();
        text.innerHTML = `
        <img class="img" src="./icons/noun_Cloud_1188486.svg" alt="cloud icon">
        <h1>Light a fire and get cosy. ${data.city.name} is looking grey today</h1> 
        `
    }
}
