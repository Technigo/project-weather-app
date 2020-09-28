import { API_KEY } from './api.js';

const weatherbase = "https://api.openweathermap.org/data/2.5/";
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Kaxholmen,Sweden&units=metric&APPID=${API_KEY}`;
const searchbox = document.querySelector('#search');

const setQuery = (evt) => {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

searchbox.addEventListener('keypress', setQuery);

function getResults(query) {
    fetch(`${weatherbase}weather?q=${query}&units=metric&appid=${API_KEY}`)
        .then((response) => {
            return response.json();
        })
        .then((currentWeather) => {
            console.log(currentWeather);
            upDateWeather(currentWeather);

        });
}
const upDateWeather = (currentWeather) => {
    console.log(currentWeather);
    //update temperature, weathertype and icon
    let city = document.getElementById('name');
    city.innerHTML = `${currentWeather.name}, ${currentWeather.sys.country}`;
    document.getElementById('degrees').innerHTML = `${currentWeather.main.temp.toFixed(1)} °C`;
    const description = currentWeather.weather[0].description;
    document.getElementById('weather-type').innerHTML = description;
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

    setBackground(description);
}

const setBackground = (description) => {
    const wrapper = document.getElementById('wrapper');

    if (description === 'Clear') {
        wrapper.style.backgroundImage = 'url(./img/clear.jpg)';
    } else if (description === 'Clouds') {
        wrapper.style.backgroundImage = 'url(./img/clouds.jpg)';
    } else if (description === 'Rain' || description === 'Drizzle') {
        wrapper.style.backgroundImage = 'url(./img/rain.jpg)';
    } else if (description === 'Thunderstorm') {
        wrapper.style.backgroundImage = 'url(./img/thunder.jpg)';
    } else if (description === 'Snow') {
        wrapper.style.backgroundImage = 'url(./assets/snow.jpg)';
    } else if (description === 'Mist' || description === 'Fog') {
        wrapper.style.backgroundImage = 'url(./img/fog.jpg)';
    }
};

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

            document.getElementById('days').innerHTML += `<p>${day} &nbsp</p>`;
            document.getElementById('temp').innerHTML += `<p>${temperature} °C  &nbsp &nbsp</p>`;
            document.getElementById('description').innerHTML += `<p>${weatherType}</p>`;
        });
    });