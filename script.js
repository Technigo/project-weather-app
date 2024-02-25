// DOM selectors

// Connecting weather API
const apiKey = "a1f68c4f65b632802ca0dd3405694457";
let city = "Bern";

const currentWeatherFeature = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
  );
};
