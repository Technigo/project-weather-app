const currentCity = document.getElementById('current-city');
const container = document.getElementById('weather');
const cityInput = document.getElementById('city-input');
const sunState = document.getElementById('sun-state');
const currentCityWeather = document.getElementById('current-city-weather');
const searchButton = document.getElementById('search-button');
const swipeButton = document.getElementById('swipe-button');
const forecastTable = document.getElementById('forecast-table');
const heroImage = document.querySelector('.hero-image');

const apiKey = '30497ceff63316bea65ec674ac0ba4c7';

const cities = [
    {
        name: 'Stockholm',
        image: 'https://images.unsplash.com/photo-1571824637968-964d9bd10d36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80'
    },
    {
        name: 'Rome',
        image: 'https://images.unsplash.com/photo-1590273971191-2af8df641e2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80'
    },
    {
        name: 'Bordeaux',
        image: 'https://images.unsplash.com/photo-1576762846960-c6f1dcffade1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80'
    },
    {
        name: 'Vienna',
        image: 'https://images.unsplash.com/photo-1585425422110-bb85558b2293?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80'
    }
];


let selectedCity = 0;
//Reusable functions:
//Convert a Unix timestamp into "hour:min" format
const formattedTime = (timestamp, timeshift) => {
    const offset = new Date().getTimezoneOffset() * 60;
    const sunStatusDate = new Date((timestamp + offset + timeshift) * 1000);
    const hours = sunStatusDate.getHours();
    const minutes = sunStatusDate.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

//array to display days
const dayTime = (timestamp) => {
    const dateTime = new Date(timestamp * 1000);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[dateTime.getDay()];
}



//----------------------  Part1  ------------------------------------------
//Fetch current data for when entering the page
const getWeatherData = (cityName) => {
    currentCity.innerHTML = '';
    currentCityWeather.innerHTML = '';
    sunState.innerHTML = '';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    heroImage.style.backgroundImage = `url(${cities[selectedCity].image})`;
    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((currentWeatherJson) => {
            console.log(currentWeatherJson);

            // Display current weather information for the entered city
            currentCity.innerHTML += `
            <h1>${currentWeatherJson.main.temp.toFixed(1)}°C </h1>
            `;
            currentCity.innerHTML += `
            <h2> ${currentWeatherJson.name}</h2>
            `;
            currentCity.innerHTML += `
            <p>${formattedTime(currentWeatherJson.dt, currentWeatherJson.timezone)}</p>
            `
            currentCityWeather.innerHTML += `
            <p> ${currentWeatherJson.weather[0].description}</p>
            `;
            currentCityWeather.innerHTML += `
            <img src="https://openweathermap.org/img/wn/${currentWeatherJson.weather[0].icon}@2x.png">
            `;
            sunState.innerHTML += `
            <p> sunrise ${formattedTime(currentWeatherJson.sys.sunrise, currentWeatherJson.timezone)} </p>
            `;
            sunState.innerHTML += `
            <p> sunset ${formattedTime(currentWeatherJson.sys.sunset, currentWeatherJson.timezone)}</p>
            `;
        })
        .catch((error) => {
            console.log('Error type:', error)
        });
}
//--------------------Part 2  ---------------------------------
const weeklyForecast = (cityName) => {
    // Fetch current weather data for the entered city
    // Fetch 5-day weather forecast for the entered city
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;

    fetch(forecastUrl)
        .then((response) => response.json())
        .then((forecastJson) => {
            console.log(forecastJson);

            // Display the 5-day weather forecast for the entered city 
            forecastTable.textContent = '';
            const today = new Date();
            const todaysDate = today.toLocaleDateString()
            const processedDates = [];
            processedDates.push(todaysDate);

            let daysAdded = 0; // Keep track of the number of days added

            // Create processedDates array
            forecastJson.list.forEach((forecast) => {
                const dayDate = dayTime(forecast.dt);

                if (!processedDates.includes(dayDate) && daysAdded < 5) {
                    const row = document.createElement('tr');
                    const dateCell = document.createElement('td');
                    dateCell.textContent = dayDate;
                    row.appendChild(dateCell);

                    const iconCell = document.createElement('td');
                    const icon = document.createElement('img');
                    icon.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
                    iconCell.appendChild(icon);
                    row.appendChild(iconCell);

                    const tempCell = document.createElement('td');
                    tempCell.textContent = `${forecast.main.temp.toFixed(1)} °C`;
                    row.appendChild(tempCell);

                    const windSpeedCell = document.createElement('td');
                    windSpeedCell.textContent = `${forecast.wind.speed} m/s`
                    row.appendChild(windSpeedCell)

                    forecastTable.appendChild(row);
                    processedDates.push(dayDate);
                    daysAdded++; // Increment the daysAdded counter
                }
            });
        })
        .catch((error) => {
            console.error('Error message:', error)
        });
}

//Event listeners 
//for the searchbutton
searchButton.addEventListener('click', () => {
    const cityName = cityInput.value;
    const city = {
        name: cityName,
        image: 'https://unsplash.com/photos/6sf5rf8QYFE'
    }

    if (cityName === '') {
        alert('Please enter a city name.');
        return;
    }

    getWeatherData(cityName);
    weeklyForecast(cityName);
});

//for the swipebutton

swipeButton.addEventListener('click', () => {
    selectedCity++;
    if (selectedCity < cities.length) {
        getWeatherData(cities[selectedCity].name);
        weeklyForecast(cities[selectedCity].name);
    } else {
        selectedCity = 0;
        getWeatherData(cities[selectedCity].name);
        weeklyForecast(cities[selectedCity].name);
    }
});
window.addEventListener('load', () => {
    getWeatherData(cities[selectedCity].name);
    weeklyForecast(cities[selectedCity].name);
});