export const getWeatherToday = (currentWeather, city) => {
  let html = `
    <img
      class="btn icon-hamburger"
      id="btnSideMenu"
      src="./assets/icon-hamburger.svg"
      alt="icon side menu"
    />  
    <img 
      src="./assets/${currentWeather.weather[0].icon}.svg" 
      alt="${currentWeather.weather[0].description}" 
      class="header-info__icon"
    />
    <div class="header-title__wrapper">
      <h1>${currentWeather.temp}</h1>
      <span>&deg;C</span>
    </div>
    <h2>${city.name}</h2>
    <h3>${currentWeather.weather[0].description}</h3>
    <div class="sun-times__wrapper" id="sunTimes">
      <h3>sunrise</h3>
      <h3>${currentWeather.sunrise}</h3>
      <h3>sunset</h3>
      <h3>${currentWeather.sunset}</h3>
    </div>
    <div class="other-info hidden" id="moreInfo">
      <h3>humidity</h3>
      <h3>${currentWeather.humidity} %</h3>
      <h3>wind</h3>
      <h3>${currentWeather.wind_speed} m/s 
        <img 
          class="icon-wind" 
          src="./assets/icon-arrow-up.svg"
          style="transform: rotate(${currentWeather.wind_deg}deg)" />
      </h3>
      <h3>air pressure</h3>
      <h3>${currentWeather.pressure} hPa</h3>
    </div>
    <div class="btn btn-round btn--float" id="showMore">
      <img class="icon-arrow-down" id="showMore" src="./assets/icon-arrow.svg" />
    </div>  
    `;

  return html;
};

export const getForecastElement = (data) => {
  let html = "";

  html += `
    <div class="forecast__daily">
      <p class="forecast__daily--items">
        ${data.day}
      </p>
      <img 
        src="./assets/${data.weather[0].icon}.svg" 
        alt="${data.weather[0].description}" 
        class="forecast__daily--items forecast__daily--image"
      ></img>
      <p class="forecast__daily--items">
        ${data.temp.min} &deg; / ${data.temp.max} &deg; C
      </p>
    </div>
    `;

  return html;
};
