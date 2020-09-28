import { API_KEY } from './api.js';

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kaxholmen,Sweden&units=metric&appid=${API_KEY}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Kaxholmen,Sweden&units=metric&APPID=${API_KEY}`;
const forecastContainer = document.querySelector('.forecast');


fetch(weatherUrl)
    .then((response) => {
        return response.json();
    })
    .then((currentWeather) => {

        upDateWeather(currentWeather);

    });

const upDateWeather = (currentWeather) => {
    //update temperature, weathertype and icon
    document.getElementById('name').innerHTML = currentWeather.name;
    document.getElementById('degrees').innerHTML = `${currentWeather.main.temp.toFixed(1)} °C`;
    document.getElementById('weather-type').innerHTML = currentWeather.weather[0].description;
    const weatherPicID = currentWeather.weather[0].icon;
    weatherPic.src = `./assets/${weatherPicID}.png`;

    //update time of sunrise
    const sunriseTime = new Date(currentWeather.sys.sunrise * 1000);
    const sunriseTimeString = sunriseTime.toLocaleTimeString('sv-SE', { timestyle: 'long', hour: "2-digit", minute: "2-digit" });
    document.getElementById('sunrise').innerHTML += sunriseTimeString;

    //update time of sunset
    const sunsetTime = new Date(currentWeather.sys.sunset * 1000);
    const sunsetTimeString = sunsetTime.toLocaleTimeString('sv-SE', { timestyle: 'long', hour: "2-digit", minute: "2-digit" });
    document.getElementById('sunset').innerHTML += sunsetTimeString;

}

//get the name of the day
const weekDays = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    const dayName = days[d.getDay()];
    return dayName;

}

const date = document.getElementById('day')
date.innerHTML = weekDays();

//get today's date
const today = () => {
    const months = ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const current_datetime = new Date()
    const formatted_date = `${current_datetime.getDate()} ${months[current_datetime.getMonth()]} ${current_datetime.getFullYear()}`;
    return `  ${formatted_date}`;
}

date.innerHTML += today();


fetch(forecastUrl)
    .then((response) => {
        return response.json();
    })
    .then((forecastArray) => {
        const filteredArray = forecastArray.list.filter(item => item.dt_txt.includes('12:00'));
        console.log(filteredArray);

        const forecast = filteredArray.map((forecast) => {
            const day = (new  Date(forecast.dt  *  1000)).toLocaleDateString("en-US",   {  weekday:   "long" })
            const temperature = (forecast.main.temp).toFixed(1);
            const weatherType = forecast.weather[0].description

            // const iconSrc = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

            console.log(day);
            console.log(temperature);
            document.getElementById('days').innerHTML += `<p>${day} &nbsp</p>`;
            document.getElementById('temp').innerHTML += `<p>${temperature} °C  &nbsp &nbsp</p>`;
            document.getElementById('description').innerHTML += `<p>${weatherType}</p>`;
            // document.getElementById('forecastIcon').src += iconSrc;


        });


    });