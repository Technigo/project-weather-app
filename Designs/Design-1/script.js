const API_KEY = '2c57bc1d70d090d5c103c4167c1a5a74';
const API_URL1 = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;
const API_URL2 = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;

const containerTodaysTemp = document.getElementById('todays-temperature');
const containerCurrentCity = document.getElementById('main-city');
const containerMainDescription = document.getElementById('main-description');
const containerSunTimes = document.getElementById('sun-times');
const forecastContainer = document.getElementsByClassName('five-day-forecast');

const containerForecast = document.getElementById('weather-forecast');

fetch(API_URL1)
    .then((response) => {
        return response.json();
    })
    .then((todaysResults) => {
       const city = `${todaysResults.name}`;
       const temperature = tempConvert(todaysResults.main.temp);
       const description = todaysResults.weather[0].description;
       const sunrise = timeConvert(todaysResults.sys.sunrise);
       const sunset = timeConvert(todaysResults.sys.sunset);
       containerTodaysTemp.innerHTML += `${temperature}\u00B0`;
       containerCurrentCity.innerHTML += city;
       containerMainDescription.innerHTML += description;
       containerSunTimes.innerHTML += `Sunrise: ${sunrise} | `;
       containerSunTimes.innerHTML += `Sunset: ${sunset}`;
    });

    fetch(API_URL2)
        .then((response) => {
            return response.json()
        })
        .then((forecastArray) => {
                // filter the array for 12:00 only
                const filteredArray = forecastArray.list.filter((item) => 
                    item.dt_txt.includes("12:00")
                );
                // map to create new and filtered array of weather forecast
                const forecasts = filteredArray.map((forecast) => {
                    const day = setDayDate(forecast.dt);
                   // const date = setDayDate(forecast.dt);
                    const iconSrc = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
                    const temperature = tempConvert(forecast.main.temp);
                    const feelsLike = tempConvert(forecast.main.feels_like);
                    console.log(day, iconSrc, temperature, feelsLike);
                    return {day, iconSrc, temperature, feelsLike};
                });
                // forEach loop to print data to HTML
                forecasts.forEach((item, index) => {
                    console.log(item);
                    forecastContainer[index].querySelector('.day').innerText = item.day;
                    //forecastContainer[index].querySelector('.date').innerText = item.date;
                    forecastContainer[index].querySelector('.icon').src = item.iconSrc;
                    forecastContainer[index].querySelector('.temperature').innerText = `${item.temperature}\u00B0 / ${item.feelsLike}\u00B0`;
                });
             });        


function tempConvert(number) {
    return Math.round(number * 10) / 10;
};

const timeConvert = (time) => {
    const sun = new Date(time * 1000);
    const sunTimeString = sun.toLocaleTimeString([], {
        hour:"2-digit", 
        minute:"2-digit",
    });
    return sunTimeString;
};

const setDayDate = (day) => {
    const dayDate = new Date(day * 1000);
    const dayDateString = dayDate.toLocaleDateString([], {
        weekday: "short",
        day: "numeric",
        month: "short",
    });
    console.log(dayDateString);
    return dayDateString;
};






