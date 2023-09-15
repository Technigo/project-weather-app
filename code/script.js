const currentCity = document.getElementById('current-city');
const container = document.getElementById('weather');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const swipeButton = document.getElementById('swipe-button');
const forecastTable = document.getElementById('forecast-table')
const heroImage = document.querySelector('.hero-image');


const apiKey = '30497ceff63316bea65ec674ac0ba4c7';

const cities = [
    {
        name: 'Stockholm',
        image: 'https://images.unsplash.com/photo-1620408696006-d1315bf240f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2773&q=80'
    },
    {
        name: 'Rome',
        image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
    },
    {
        name: 'Bordeaux',
        image: 'https://images.unsplash.com/photo-1526581671404-349f224db79b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
    },
    {
        name: 'Vienna',
        image: 'https://images.unsplash.com/photo-1526581671404-349f224db79b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80'
    }
];


let selectedCity = 0;
//Reusable functions:
//Convert a Unix timestamp into "hour:min" format
const formattedTime = (timestamp, timeshift) => {
    const offset = new Date().getTimezoneOffset() * 60;
    sunStatusDate = new Date((timestamp + offset + timeshift) * 1000);
    const hours = sunStatusDate.getHours();
    const minutes = sunStatusDate.getMinutes();
    const time = `
    ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return (time)
}



//----------------------  Part1  ------------------------------------------
//Fetch current data for when entering the page
getWeatherData = (city) => {
    currentCity.innerHTML = '';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${apiKey}`;
    heroImage.style.backgroundImage = `url(${city.image})`;
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
            currentCity.innerHTML += `
            <p> ${currentWeatherJson.weather[0].description}</p>
            `;
            currentCity.innerHTML += `
            <img src="https://openweathermap.org/img/wn/${currentWeatherJson.weather[0].icon}@2x.png">
            `;
            currentCity.innerHTML += `
            <p> sunrise ${formattedTime(currentWeatherJson.sys.sunrise, currentWeatherJson.timezone)} / sunset ${formattedTime(currentWeatherJson.sys.sunset, currentWeatherJson.timezone)}
            `;

        })
        .catch((error) => {
            console.log('Error type:', error)
        });
}

//--------------------Part 2  ---------------------------------
weeklyForecast = (city) => {
    // Fetch current weather data for the entered city
    // Fetch 5-day weather forecast for the entered city
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=metric&appid=${apiKey}`;
    console.log(weeklyForecast)
    fetch(forecastUrl)
        .then((response) => response.json())
        .then((forecastJson) => {
            console.log(forecastJson);

            // Display the 5-day weather forecast for the entered city 
            forecastTable.textContent = ''; //clear content 
            const today = new Date();
            const todaysDate = today.toLocaleDateString()
            const processedDates = []; //keep track of displayed dates just like with the dogs!!
            processedDates.push(todaysDate);

            //Create processedDates array
            forecastJson.list.forEach((forecast) => {

                const dateTime = new Date(forecast.dt * 1000); // Convert timestamp from seconds to ms adapted to Javascript
                const date = dateTime.toLocaleDateString(); // Formated date accordingly to the user's locale

                // Display date, weather description, and temperature in Celsius
                if (!processedDates.includes(date)) {//if the date is not in the processedDates array
                    const row = document.createElement('tr');//create a table row

                    const dateCell = document.createElement('td');
                    dateCell.textContent = `${date}`;
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

                    forecastTable.appendChild(row)
                    processedDates.push(date); // push method to array
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
    const city = cityInput.value;

    // Ensure the user has entered a city name
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    getWeatherData(city);
    weeklyForecast(city);
});

//for the swipebutton

swipeButton.addEventListener('click', () => {
    selectedCity++;
    if (selectedCity < cities.length) {
        getWeatherData(cities[selectedCity]);
        weeklyForecast(cities[selectedCity]);
    }
    else {//selectedCity >= cities.length
        selectedCity = 0;
        getWeatherData(cities[selectedCity]);
        weeklyForecast(cities[selectedCity]);
    }
});
window.addEventListener('load', () => {
    getWeatherData(cities[selectedCity]);
    weeklyForecast(cities[selectedCity]);

});

