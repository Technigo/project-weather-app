// creating variables
const apiKey = '8ba8157c8f9c786166631ade41fce81c';
const container = document.getElementById('container');
const forecast = document.getElementById('forecast');
const btnSearchCity = document.getElementById('btn-searchCity');
const allInfo = document.querySelector('allInfo');
const cityName = document.getElementById('city');
const degree = document.getElementById('degree');
const weather = document.getElementById('weather');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const search = document.getElementById('search');
const timeInBackground = document.getElementById('time');

const day = document.getElementById('day');
const navBar = document.getElementById('navBar');

const date = new Date();
let now = new Date().toLocaleDateString('en-us', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

const time = date.toLocaleTimeString().substring(0, 5);

day.innerHTML = `${now}`;
timeInBackground.innerHTML = time;

// fetching data from the URL
const fetchForecastByCity = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  // main function, fetching updating hero and forecast
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      updateHero(data);
      updateForecast(data);
      search.value = '';
    });
};

// calling the function
btnSearchCity.addEventListener('click', () => {
  const city = document.getElementById('search').value;
  fetchForecastByCity(city);
});

/**  Switch to get the icons images to the right condition */
const getIconByWeatherCondition = (condition) => {
  switch (condition) {
    case 'Clouds':
      return 'img/cloud3.png';
    case 'Rain':
      return 'img/rain.png';
    case 'Clear':
      return 'img/clear.png';

    default:
      console.log(`condition not found ${condition}.`);
  }
};

const background = document.querySelector('.wrapper');

// changing the background according to the weather
const appBackground = (weatherAppearance) => {
  background.style.backgroundSize = 'cover';
  background.style.repeat = 'no-repeat';

  if (weatherAppearance === 'Rain') {
    background.style.backgroundImage =
      "url('https://st.depositphotos.com/1013195/1395/i/450/depositphotos_13958901-stock-photo-rainy-day.jpg') ";
  } else if (weatherAppearance === 'Clear') {
    background.style.backgroundImage =
      "url('https://wallpaperaccess.com/sunny-day')";
  } else if (weatherAppearance === 'Clouds') {
    background.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbHVkeSUyMHNreXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')";
  } else if (weatherAppearance === 'Snow') {
    background.style.backgroundImage =
      "url('https://cdn.pixabay.com/photo/2014/12/02/22/05/snowflakes-554635__340.jpg')";
  }
};

// updating hero function (city name, degree, sunrise & sunset)
const updateHero = (data) => {
  cityName.innerHTML = data.city.name;
  weather.innerHTML = data.list[0].weather[0].main;
  degree.innerHTML = `<h2>${Math.round(
    data.list[0].main.temp.toFixed(1)
  )} ${'&#8451;'}</h2>
  <h6>Sunrise: ${new Date(data.city.sunrise * 1000)
    .toLocaleTimeString()
    .substring(0, 5)} </h6>
  <h6>Sunset: ${new Date(data.city.sunset * 1000)
    .toLocaleTimeString()
    .substring(0, 5)} </h6>
   `;

  const weatherAppearance = data.list[0].weather[0].main;
  appBackground(weatherAppearance);
};

// forecast for the next 5 days
const updateForecast = (data) => {
  const filteredTemp = data.list.filter((item) =>
    item.dt_txt.includes('12:00')
  );
  const weekdayName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  forecast.innerHTML = '';
  filteredTemp.forEach((item) => {
    const date = new Date(item.dt * 1000);
    let dayName = weekdayName[date.getDay()];
    let icon = getIconByWeatherCondition(item.weather[0].main);

    forecast.innerHTML += `
        <div class="weekdays"> 
          <div class="weekday-name">
            <p>${dayName}<p>
            <div class="temp-weather">
              <img class="weather-icon" src="${icon}"/>
              <p>${Math.floor(item.main.temp)} °C </p> 
            </div>
          </div>
        </div>
      `;
  });
};

// Star the app with a default city
fetchForecastByCity('Malmo');
