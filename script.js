const city = document.getElementById('city')
const weather = document.getElementById('weather')
const temperature = document.getElementById('temperature')
const forecast = document.getElementById('forecast')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const header = document.getElementById('header')


const API_KEY = "b881032f7a405f3e6e05ebbfb98e3e49"

let cityName = "Stockholm"
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${API_KEY}`;

const formattedTime = (timestamp) => {
    sunStatus = new Date(timestamp * 1000)
    const hours = sunStatus.getHours();
    const minutes = sunStatus.getMinutes();
    const time = `  
    ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return (time)
}


const fetchWeather = () => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            header.innerHTML = `
                <h3>${data.weather[0].description} | ${data.main.temp.toFixed(1)}°C</h3>
                <h3>Sunrise ${formattedTime(data.sys.sunrise)} | Sunset ${formattedTime(data.sys.sunset)}</h3>
            `;

            city.innerHTML = `
                <h1>${data.name}</h1>
                <h1>${data.main.temp.toFixed(1)}°C</h1>
            `;

            switch (data.weather[0].description) {
                case 'Clouds':
                    console.log('clouds');
                    city.innerHTML = `
                    <img src="design/design2/icons/noun_Cloud_1188486.svg" alt="cloudy"/>

                    <h1>It's cloudy in ${data.name} today. Read a book and get cozy.</h1>
                    `;
                    break;

                case 'Rain':
                    city.innerHTML = `
                    <img src="http://www.w3.org/2000/svg" alt="umbrella"/>

                    <h1>It's raining in ${data.name} today. Put netflix on and just chill. </h1>
                    `;
                    break;

                default:
                    console.log('sunny');
                    city.innerHTML = `
                    <img src="design/design2/icons/noun_Sunglasses_2055147.svg" alt="sunglasses" />
                    
                    <h1>The sky is clear ${data.name} today. Grab your shades and enjoy while it last.</h1>
                    `;
                    break;
            }
        })
        .catch((error) => {
            console.log('Error', error);
        });
};

fetchWeather();


const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`;

const weeklyforecast = document.getElementById('weeklyforecast');

const fetchForecast = () => {
    fetch(forecastURL)
        .then((response) => response.json())
        .then((forecast) => {
            weeklyforecast.innerHTML = '';


            const dailyForecast = {};

            forecast.list.forEach((forecastData) => {
                const date = new Date(forecastData.dt * 1000); // Convert Unix timestamp to milliseconds
                const day = date.toLocaleDateString(undefined, { weekday: 'long' });


                if (!dailyForecast[day]) {
                    dailyForecast[day] = {
                        temperature: forecastData.main.temp,
                        description: forecastData.weather[0].description,
                    };
                } else {

                    dailyForecast[day].temperature = forecastData.main.temp;
                    dailyForecast[day].description = forecastData.weather[0].description;
                }
            });


            for (const day in dailyForecast) {
                const row = document.createElement('tr');
                const dayCell = document.createElement('td');
                const temperatureCell = document.createElement('td');


                dayCell.textContent = day;
                temperatureCell.textContent = `${dailyForecast[day].temperature} °C`;

                row.appendChild(dayCell);
                row.appendChild(temperatureCell);
                weeklyforecast.appendChild(row);
            }
        })
        .catch((error) => {
            console.error('Error', error);
        });
};


fetchForecast();


