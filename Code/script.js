//Variables for different cities
const weatherStockholm = "http://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=e74df95bd073adf9306ac7f46ad51144";
let cityName = "";
//const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
//const container = document.getElementById("main");
const weather = document.getElementById("weatherToday");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const sun = document.getElementById("sun");


const forecast = document.getElementById("forecast");
//sunRise = new Intl.DateTimeFormat('en-US', options).format(sunRise);

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let dateToday = new Date();

const weatherToday = () => {

fetch("http://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=e74df95bd073adf9306ac7f46ad51144").then((response) => {
    return response.json();
})
.then((json) => {
    console.log(json);
    
    city.innerHTML = json.name;
    temp.innerHTML = json.main.temp.toFixed(1);
    description.innerHTML = json.weather.map((a) => a.description);
    //sunSet.innerHTML = json.sys.sunset;
    //sunRise.innerHTML = json.sys.sunrise;
    const sunRise = json.sys.sunrise
    const sunSet = json.sys.sunset
    let sunrise = new Date(sunRise * 1000)
    let sunset = new Date(sunSet * 1000)
    sun.innerHTML += `<p id="sunrise">Sunrise: ${`${sunrise.getHours()}:${sunrise.getMinutes()}`}</p>`;
    sun.innerHTML += `<p id ="sunset">Sunset: ${`${sunset.getHours()}:${sunset.getMinutes()}`}</p>`;

    const newDate = new Date(json.dt * 1000)
    const todaysDate = newDate.toDateString()
    document.getElementById("date").innerHTML = `${todaysDate}`;

    
    
    
});
}
weatherToday();

// const fiveDayForecast = () => {

// fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=e74df95bd073adf9306ac7f46ad51144").then((response) => {
//     return response.json();
// })
// .then((weatherForecast) => {
//     console.log(weatherForecast);

//     const forecastWeather = weatherForecast.list[0].dt;
//     const hour1 = 
//     let time = new Date(hour1 * 1000).getHours()
//     document.getElementById("time").innerHTML += `<p> ${time}.00</p>`; 


    
    
// });

// }
// fiveDayForecast();