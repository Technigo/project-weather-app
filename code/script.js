const date = document.getElementById("date")
const header = document.getElementById("header")
const body = document.body;
const img = document.querySelector(".img");
const text = document.querySelector("#text");

const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=4efc415dbf1df503974ec65e3563d721"
const API_FORCAST = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4efc415dbf1df503974ec65e3563d721"

let todayWeather;

//Displays sunrise and sunset times
navigator.geolocation.getCurrentPosition(position => {
fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=4efc415dbf1df503974ec65e3563d721`)
.then(res => {
    if (!res.ok) {
    throw Error("Weather data not available")
    }
    return res.json()
    })
.then(data => {
   getWeather(data);
   filterWeather(data);
 })
.catch(err => console.error(err))
});
 
const getWeather = (data) => {
    console.log(data)
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('12:00'))

    todayWeather = data.list[0].weather[0].main;

    const todayTemp = data.list[0].main.temp;

    const getSunRise = new Date((data.city.sunrise + data.city.timezone + new Date().getTimezoneOffset()*60) * 1000);

    const getSunSet = new Date((data.city.sunset + data.city.timezone + new Date().getTimezoneOffset()*60) * 1000);


header.innerHTML = `
   <p>${todayWeather} | ${Math.round(todayTemp)}°</p>
   <p> sunrise ${getSunRise.getHours()}.${getSunRise.getMinutes()} </p>
   <p> sunset ${getSunSet.getHours()}.${getSunSet.getMinutes()} </p>

`;


filteredForecast.forEach((day) => {

    console.log(day)

    const weekDay = new Date(day.dt * 1000).toLocaleDateString('en', {weekday: 'short'});

    // Display the weather of the week
    const mainTemp = day.main.temp.toFixed(0)

    date.innerHTML +=`
    <ul><li>
    <span>${weekDay}</span>
    <span>${mainTemp}°</span>
    </li><ul> 
    ` 
})
}

const filterWeather = (data) => {
    if (todayWeather === "Rain") {
        body.classList.toggle("rainy");
        text.innerHTML = `
        <img class="img" src="/Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="umbrella icon">
        <h1>Don't forget you umbrella. It's wet in ${data.city.name} today.</h1>        
        `
    }  
    else if (todayWeather === "Clear") {
        body.classList.toggle("sunny");
        text.innerHTML = `
        <img class="img" src="/Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="sun-glasses icon">
        <h1>Get your sunnies on. ${data.city.name} is rather great today.</h1>        
        `
    } else {
        body.classList.remove();
        text.innerHTML = `
        <img class="img" src="/Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="cloud icon">
        <h1>Light a fire and get cosy. ${data.city.name} is looking grey today</h1> 
        `
    }

}



