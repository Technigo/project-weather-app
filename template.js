const today = ({ city, temp, sunUp, sunSet, icon, specWeatherType }) => `
<article class="todaysWeather">
<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
  <h2>${city}</h2>
  <h1>${Math.round(temp)} °C</h1>
  <h1>${specWeatherType}</h1>
  
  <h4>The sun goes up at: ${sunUp}</h4>
  <h4>The sun goes down at: ${sunSet}</h4>
</article>
`;

const forecast = ({ day, noonTemp, weatherType, icon }) => `
<li class="forecastweather"> 
<p>${day}</p> 
<p>${weatherType}</p> 
<p>${noonTemp} °C</p>
  <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
</li>
`;
