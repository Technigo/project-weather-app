// The toggle from night to day

const toggle = document.getElementById('theme-toggle');
const weatherCard = document.querySelector('.weather-card');

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        document.body.style.backgroundImage = "url('assets/design-1/day-sky.jpg')";
        weatherCard.classList.add('day-mode');
    } else {
        document.body.style.backgroundImage = "url('assets/design-1/night-sky.jpg')";
        weatherCard.classList.remove('day-mode');
    }
});

// The search functionality

const searchButton = document.getElementById('search-btn');
const searchBarContainer = document.querySelector('.search-bar-container');

// Add event listener to the search button
searchButton.addEventListener('click', () => {
    searchBarContainer.classList.toggle('active');
    if (searchBarContainer.classList.contains('active')) {
        document.getElementById('search-bar').focus();
    }
});

const apiKey = "6f10170466235746161a1b24e2d289bd"; 

// Function to fetch weather data for a given city
const fetchWeatherByCity = (city) => {
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            updateHtml(data); // Update the HTML with the fetched data
        })
        .catch((error) => {
            console.error("Error fetching the weather data:", error);
            alert('Unable to fetch data for the provided city. Please try another city.');
        });
};

// Event listener for search input (trigger on 'Enter' key press)
const searchInput = document.getElementById('search-bar');

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const city = event.target.value.trim();
        if (city) {
            fetchWeatherByCity(city); // Fetch weather for the searched city
        } else {
            alert('Please enter a valid city name');
        }
    }
});

// Initial fetch for default city (Dubai)
fetchWeatherByCity("Dubai");

// Function to format time for sunrise and sunset
const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

// Function to update the HTML with weather data
const updateHtml = (data) => {
    const location = document.querySelector(".location h1");
    const currentTemp = document.querySelector(".current-temp h2");
    const sunsetTime = document.getElementById("sunset-time");
    const sunriseTime = document.getElementById("sunrise-time");
    const weatherDescription = document.getElementById("weather-description");

    // Update the location, temperature, and details in the weather card
    location.textContent = data.city.name;
    currentTemp.textContent = `${data.list[0].main.temp.toFixed(1)}°C`;

    const sunset = formatTime(data.city.sunset);
    const sunrise = formatTime(data.city.sunrise);

    sunsetTime.textContent = `Sunset: ${sunset}`;
    sunriseTime.textContent = `Sunrise: ${sunrise}`;

    const weatherCondition = data.list[0].weather[0].main;
    switch (weatherCondition) {
        case "Clear":
            weatherDescription.textContent = "A clear and sunny day ahead.";
            break;
        case "Clouds":
            weatherDescription.textContent = "Clouds are covering the sky.";
            break;
        case "Rain":
            weatherDescription.textContent = "Expect some rain showers.";
            break;
        case "Thunderstorm":
            weatherDescription.textContent = "Thunderstorms expected, stay indoors!";
            break;
    }

    updateWeeklyForecast(data.list);
};

// Function to update the weekly forecast
const updateWeeklyForecast = (forecastList) => {
    const forecastItems = document.querySelectorAll(".forecast-item");

    const dailyForecast = forecastList.filter(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        return forecastDate.getHours() === 12; // Picked 12:00 PM
    }).slice(0, 5); // Get the first 5 days

    dailyForecast.forEach((forecast, index) => {
        const forecastTemp = forecast.main.temp.toFixed(1); // Round to 1 decimal place
        const forecastWeather = forecast.weather[0].main;
        const dayName = new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });

        forecastItems[index].querySelector("p:nth-of-type(1)").textContent = dayName;
        forecastItems[index].querySelector("p:nth-of-type(2)").textContent = `${forecastTemp}°C`;

        const icon = forecastItems[index].querySelector("img");
        switch (forecastWeather) {
            case "Clear":
                icon.src = "assets/design-1/sunny.png";
                break;
            case "Clouds":
                icon.src = "assets/design-1/cloudy.png";
                break;
            case "Rain":
                icon.src = "assets/design-1/rain.png";
                break;
            case "Thunderstorm":
                icon.src = "assets/design-1/storm.png";
        }
    });
};
