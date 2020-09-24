const API_KEY = '2c57bc1d70d090d5c103c4167c1a5a74';
const API_URL1 = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;
const API_URL2 = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;

const containerToday = document.getElementById('todays-weather');
const containerForecast = document.getElementById('weather-forecast');
const containerDayOne = document.getElementById('day-one');
const containerDayTwo = document.getElementById('day-two');
const containerDayThree = document.getElementById('day-three');
const containerDayFour = document.getElementById('day-four');
const containerDayFive= document.getElementById('day-five');

let filteredForecast;

fetch(API_URL1)
    .then((response) => {
        return response.json();
    })
    .then((todaysResults) => {
       //containerToday.innerHTML += generateHTMLForTodaysWeather(todaysResults);
       //containerToday.innerHTML = `<h1>Current City: ${todaysResults.name}</h1>`
       //containerToday.innerHTML += `<h2>Temperature: ${todaysResults.main.temp}.toFixed(1)c</h2>`
       //containerToday.innerHTML += `<h3>${todaysResults.weather[0].description}</h3>`
       const city = `City: ${todaysResults.name}`;
       const temperature = tempConvert(todaysResults.main.temp);
       const description = todaysResults.weather[0].description;
       const sunrise = timeConvert(todaysResults.sys.sunrise);
       const sunset = timeConvert(todaysResults.sys.sunset);
       containerToday.innerHTML = city;
       containerToday.innerHTML += `${temperature}\u00B0`;
       containerToday.innerHTML += description;
       console.log(sunrise);
       containerToday.innerHTML += sunrise;
       containerToday.innerHTML += sunset;
    });

    fetch(API_URL2)
        .then((response) => {
            return response.json()
        })
        .then((fiveDayForecast) => {
                filteredForecast = fiveDayForecast.list.filter(item => 
                item.dt_txt.includes('12:00'))
                console.log(filteredForecast);
                const dayOne = tempConvert(filteredForecast[0].main.temp);
                containerDayOne.innerHTML = dayOne;
                containerDayOne.innerHTML += printDay();
                
                const dayTwo = tempConvert(filteredForecast[1].main.temp);
                containerDayTwo.innerHTML = dayTwo;
                const dayThree = tempConvert(filteredForecast[2].main.temp);
                containerDayThree.innerHTML = dayThree;
                const dayFour = tempConvert(filteredForecast[3].main.temp);
                containerDayFour.innerHTML = dayFour;
                const dayFive = tempConvert(filteredForecast[4].main.temp);
                containerDayFive.innerHTML = dayFive;
        });
        


function tempConvert(number) {
    return Math.round(number * 10) / 10;
}

const timeConvert = (time) => {
    const sun = new Date(time * 1000);
    const sunTimeString = sun.toLocaleTimeString([], {
        hour:"2-digit", 
        minute:"2-digit",
    });
    return sunTimeString;
};

const printDay = (day) => {
    const forecastDays = new Date(day * 1000);
    const forecastDaysString = forecastDays.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
    console.log(forecastDaysString);
    return forecastDaysString;
    
};

//const day = printDay(filteredForecast)

/*const generateHTMLForTodaysWeather = () => {
    
}; */




