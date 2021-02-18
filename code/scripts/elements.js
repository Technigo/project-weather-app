export const getWeatherToday = (data) => {
  let html = `
    <img
      class="btn icon-hamburger"
      id="btnSideMenu"
      src="./assets/icon-hamburger.svg"
      alt="icon side menu"
    />  
    <img 
      src="./assets/${data.type.icon}.svg" 
      alt="${data.type.description}" 
      class="header-info__icon"
    />
    <div class="header-title__wrapper">
      <h1>${data.temp}</h1>
      <span>&deg;C</span>
    </div>
    <h2>${data.city}</h2>
    <h3>${data.type.description}</h3>
    <div class="sun-times__wrapper" id="sunTimes">
      <h3>sunrise</h3>
      <h3>${data.sunrise}</h3>
      <h3>sunset</h3>
      <h3>${data.sunset}</h3>
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
        src="./assets/${data.type.icon}.svg" 
        alt="${data.type.description}" 
        class="forecast__daily--items forecast__daily--image"
      ></img>
      <p class="forecast__daily--items">
        ${data.minTemp} &deg; / ${data.maxTemp} &deg; C
      </p>
    </div>
    `;

  return html;
};
