const API_TODAY = `
https://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=7dee0e5a05b2c9d92a37a397279281ca
`;
const API_FORECAST = `
https://api.openweathermap.org/data/2.5/forecast?q=Gothenburg,Sweden&units=metric&APPID=dfa433e7ce60074523483f09849d33d2
`;

const sectionToday = document.getElementById('today');
const sectionForecast = document.getElementById('forecast');

fetch(API_TODAY)
  .then(response => response.json())
  .then(data => {
    console.log('today data:', data);
    console.log('weather main:', data.weather[0].main);

    const sunrise = new Date(data.sys.sunrise * 1000)
      .toLocaleTimeString()
      .slice(0, 5);
    const sunset = new Date(data.sys.sunset * 1000)
      .toLocaleTimeString()
      .slice(0, 5);

    let imageSrc, weatherDescription;

    if (data.weather[0].main === 'Clear') {
      imageSrc = 'noun_Sunglasses_2055147.svg';
      weatherDescription = `Get your sunnies on. ${data.name} is looking rather great today.`;
    } else if (data.weather[0].main === 'Rain') {
      imageSrc = 'noun_Umbrella_2030530.svg';
      weatherDescription = `Don't forget your umbrella. It's wet in ${data.name} today`;
    } else {
      imageSrc = 'noun_Cloud_1188486.svg';
      weatherDescription = `Light a fire and get cosy. ${data.name} is looking grey today.`;
    }

    sectionToday.innerHTML = `
    <p class="today-temp">${
      data.weather[0].description
    } | ${data.main.temp.toFixed(1)}°</p>
    <p class="sunrise">sunrise ${sunrise}</p>
    <p class="sunset">sunset ${sunset}</p>
    <img class="weather-icon"
    src="/Designs/Design-2/icons/${imageSrc}"
  />
    <h1 class="today-title">${weatherDescription}</h1>
    `;
  });

fetch(API_FORECAST)
  .then(response => response.json())
  .then(data => {
    console.log('forecast data:', data);

    const forecastDays = data.list.filter(day => day.dt_txt.includes('12:00'));
    console.log(forecastDays);
    sectionForecast.innerHTML = '';
    forecastDays.forEach(day => {
      const date = new Date(day.dt * 1000);
      day.weekday = String(date).slice(0, 3);
      sectionForecast.innerHTML += `
      <div class="forecast-day-container">
       <p class="forecast-day">${day.weekday}</p>
       <p class="forecast-day-temp">${day.main.temp.toFixed(1)}°</p>
      </div>
      `;
    });
  });
