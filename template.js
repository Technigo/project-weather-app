const today = ({ city, temp, sunUp, sunSet, icon, weatherType }) => `
<article class="todaysWeather weatherapp-${weatherType}">
  <h2>${city}</h2>
  <h1>${Math.round(temp)}°C</h1>
  ${weatherType}
  <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
  <h4>The sun goes up at: ${sunUp}</h4>
  <h4>The sun goes down at: ${sunSet}</h4>
</article>
`;

const forecast = ({ day, noonTemp, weatherType, icon }) => `
<li class="forecastWeather"> 
  ${day}
  ${weatherType}
  ${noonTemp}
  <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
</li>
`;
