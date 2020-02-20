let dateTimeConvertFactor = 1000;

fetch("https://api.openweathermap.org/data/2.5/forecast?q=karlstad,SWE&units=metric&appid=81d357180ff563fe7c461222930c95a7") 

  .then((response) => {
    return response.json()
  })

.then((weatherData) => {
    // today's forecast 

  let sunriseDateTime = new Date(weatherData.city.sunrise * dateTimeConvertFactor);
  let sunsetDateTime = new Date(weatherData.city.sunset * dateTimeConvertFactor);
  let currentWeatherForecast = weatherData.list[0];

  document.getElementById("weatherConditions").innerHTML = `${currentWeatherForecast.weather[0].description}`;
  document.getElementById("temperature").innerHTML = `${roundNumber(currentWeatherForecast.main.temp)}°c`
  document.getElementById("weatherConditionsImage").src = `https://openweathermap.org/img/wn/${currentWeatherForecast.weather[0].icon}@2x.png`
  document.getElementById("sunrise").innerHTML += `${("0" + sunriseDateTime.getHours()).slice(-2)}.${("0" + sunriseDateTime.getMinutes()).slice(-2)}`;
  document.getElementById("sunset").innerHTML += ` ${sunsetDateTime.getHours()}.${("0" + sunsetDateTime.getMinutes()).slice(-2)}`;

   if (currentWeatherForecast.weather[0].main === "Clouds" ) { // cloudy weather
    setWeatherAdviceAndStyling(
      `Light a fire and get cosy. ${weatherData.city.name} is looking grey today.`, 
      "cloudy", 
      "Designs/Design-2/icons/noun_Cloud_1188486.svg"
    );
  }

  else if (currentWeatherForecast.weather[0].id === 800 || currentWeatherForecast.weather[0].id === 801)  { //sunny weather
    let image = "Designs/Design-2/icons/noun_cloudysun.svg"

    if (currentWeatherForecast.weather[0].id === 800) {
      image = "Designs/Design-2/icons/noun_Sunglasses_2055147.svg" 
    }
   
    setWeatherAdviceAndStyling(
      `Don't forget your sunglasses. ${weatherData.city.name} is shining today!`,
      "sunny",
      image,
    );
  }

  else if (currentWeatherForecast.weather[0].icon === "50d") { // atmosphere group
    setWeatherAdviceAndStyling(
      `Maybe indoor activities today. ${weatherData.city.name} is full of ${currentWeatherForecast.weather[0].main.toLowerCase()}`, 
      "atmosphere"
    );
  }
  
  else if (currentWeatherForecast.weather[0].main === "Snow") { // snow
    setWeatherAdviceAndStyling(
      `Is it Christmas already? ${weatherData.city.name} is full of ${currentWeatherForecast.weather[0].main.toLowerCase()} today`,
      "snow",
      "Designs/Design-2/icons/noun_snow.svg"
    );
  }

  else if (currentWeatherForecast.weather[0].main === "Rain") { // rain / drizzle
    setWeatherAdviceAndStyling(
      `Bring your umbrella! It's raining in ${weatherData.city.name} today`,
      "rain",
      "Designs/Design-2/icons/noun_Umbrella_2030530.svg"
    );
  }

    else if (currentWeatherForecast.weather[0].main === "Thunderstorm") { // thunder
      setWeatherAdviceAndStyling(
        `Relax  indoors today! There is a ${currentWeatherForecast.weather[0].main.toLowerCase()} in ${weatherData.city.name}!`,
        "thunder",
        "Designs/Design-2/icons/noun_storm.svg"
      );
  }
 
// this week's forecast

  const today = new Date();
  const todaysDate = `${today.getFullYear()}-${('0' + (today.getMonth()+1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
  
  const filteredDays = weatherData.list.filter(item => !item.dt_txt.includes(todaysDate) && item.dt_txt.includes('12:00')); 
  const weeklyForecastElement = document.getElementById("weeklyForecast");

  filteredDays.forEach(day => {
    weeklyForecastElement.innerHTML += `
    <div class="weekday"> 
      <p> ${getDayOfWeek(day.dt)} </p>
      <p> ${roundNumber(day.main.temp)}°c</p>
    </div>`;
  });

})

const setWeatherAdviceAndStyling = (advice, body, image = null) => {

  document.getElementById("weatherAdvice").innerHTML = advice;
  document.getElementById("body").classList.add(body);

  if (image != null) {
    document.getElementById("weatherConditionsImage").src = image;
  }
}

const roundNumber = (temperature) => {
 return Math.round(temperature);
}

const getDayOfWeek = (param) => {
  let weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  let date = new Date (param * dateTimeConvertFactor);

  let specificDay = date.getDay();
  
  return weekdays[specificDay]
}


