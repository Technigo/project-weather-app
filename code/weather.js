window.onload = function exampleFunction() { 
    getLatLong("Stockholm"); 
} 

const changeCity = () => {
    let city = document.getElementById("city-label").value 
    getLatLong(city)
}

const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCity);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }

}

const getCity = (position) => {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7d01b328e34c450986cb7faef032a771`)
    .then(response => response.json())
        .then(forecast => {
            document.getElementById("city").innerHTML = forecast.city.name
            fetchForecast(lat, lon)
    });
}

const getLatLong = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},Sweden&units=metric&APPID=7d01b328e34c450986cb7faef032a771`)
    .then(response => response.json())
        .then(forecast => {
            const lat = forecast.coord.lat
            const lon = forecast.coord.lon
            document.getElementById("city").innerHTML = forecast.name
            fetchForecast(lat, lon)
    });
}

const fetchWeather = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},Sweden&units=metric&APPID=7d01b328e34c450986cb7faef032a771`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      getLatLong(json);
    });
};

const fetchForecast = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&%20exclude=current,minutely,hourly&appid=7d01b328e34c450986cb7faef032a771&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      sthlmForecast(json);
    });
};

const getDayOfWeek = (dayOfWeek) => {
    return isNaN(dayOfWeek)
      ? null
      : [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ][dayOfWeek];
  };

const sthlmForecast = (forecast) => {
  //get current city
//   const currentCity = forecast.timezone.split("/")[1]
//   const currentCityHTML = document.getElementById("city")
//   currentCityHTML.innerHTML == "" ? currentCityHTML.innerHTML = currentCity : currentCityHTML.innerHTML += "";
//   let citySet = true;
  //currentCityHTML.innerHTML = currentCity

  //get current temp
  const currentTemp = document.getElementById("current");
  currentTemp.innerHTML = `${Math.round(forecast.current.temp)}&#8451`;

  //get current weather icon
  const currentIcon = document.getElementById("current-icon");
  currentIcon.src = `${forecast.current.weather[0].icon}@2x.png`;

  //get current weather
  const currentWeather = document.getElementById("current-weather")
  currentWeather.innerHTML = forecast.current.weather[0].description;

  //get sunrise/sunset
  const sunriseHTML = document.getElementById("sunrise");
  const sunsetHTML = document.getElementById("sunset");
  const sunrise = new Date(forecast.current.sunrise * 1000);
  const sunriseString = sunrise.toLocaleTimeString("en-US", {
    timestyle: "short",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(forecast.current.sunset * 1000);
  const sunsetString = sunset.toLocaleTimeString("en-US", {
    timestyle: "short",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  sunriseHTML.innerHTML = `Sunrise:  ${sunriseString}`;
  sunsetHTML.innerHTML = `Sunset:  ${sunsetString}`;

  //Get new array with forecast to map in new array
  const slicedForecast = forecast.daily.slice(0, 5);
  //get array for HTML elements to loop through
  const daysInForecast = document.getElementsByClassName("day")

  //loop through each day and set HTML
  slicedForecast.forEach((day, index) => {
    daysInForecast[index].querySelector(".next-day").innerHTML = `${getDayOfWeek(new Date(day.dt * 1000).getDay())}`;
    daysInForecast[index].querySelector(".day-temp").innerHTML = `<img src='${day.weather[0].icon}@2x.png'>   `;
    daysInForecast[index].querySelector(".day-temp").innerHTML += `<span>${Math.round(day.temp.min)} / ${Math.round(day.temp.max)}</span>`;
  })


/*
  //Get days for forecast. try with getelement by class name or similar. Then you can use the loop just like maks
  document.getElementById("day1").innerHTML = `${getDayOfWeek(
    new Date(forecast.daily[0].dt * 1000).getDay()
  )}`;
  document.getElementById("day2").innerHTML = `${getDayOfWeek(
    new Date(forecast.daily[1].dt * 1000).getDay()
  )}`;
  document.getElementById("day3").innerHTML = `${getDayOfWeek(
    new Date(forecast.daily[2].dt * 1000).getDay()
  )}`;
  document.getElementById("day4").innerHTML = `${getDayOfWeek(
    new Date(forecast.daily[3].dt * 1000).getDay()
  )}`;
  document.getElementById("day5").innerHTML = `${getDayOfWeek(
    new Date(forecast.daily[4].dt * 1000).getDay()
  )}`;
*/
  //try to generate HTML with foreach
//   let container = document.getElementById("forecast");
//   forecastArr = forecast.daily;
//   console.log(forecastArr)
//   forecastArr.forEach((forecastline, index) => {
//     container.innerHTML = "";
//     //generate day
//     container.innerHTML += `<div class = "day">`
//     container.innerHTML +=     `<p class = "next day">${getDayOfWeek(new Date(forecastline.dt * 1000).getDay())}>`
//     //generate icon
//     container.innerHTML +=      `<p class = "day-temp">`
//     container.innerHTML +=      `<img src='${forecastline.weather[0].icon}@2x.png'>`
//     //generate temp
//     container.innerHTML +=      `<span>${Math.round(forecastline.temp.min)} / ${Math.round(forecastline.temp.max)}</span>`
//     container.innerHTML +=      `</p>`
//     container.innerHTML +=  `</div>`
  

  //Dates with forecast
//   document.getElementById("day1-temp").innerHTML = `<img src='${
//     forecast.daily[0].weather[0].icon
//   }@2x.png'>   `;
//   document.getElementById("day1-temp").innerHTML += `<span>${Math.round(
//     forecast.daily[0].temp.min
//   )} / ${Math.round(forecast.daily[0].temp.max)}</span>`;

//   document.getElementById("day2-temp").innerHTML = `<img src='${
//     forecast.daily[1].weather[0].icon
//   }@2x.png'>   `;
//   document.getElementById("day2-temp").innerHTML += `<span>${Math.round(
//     forecast.daily[1].temp.min
//   )} / ${Math.round(forecast.daily[1].temp.max)}</span>`;

//   document.getElementById("day3-temp").innerHTML = `<img src='${
//     forecast.daily[2].weather[0].icon
//   }@2x.png'>   `;
//   document.getElementById("day3-temp").innerHTML += `<span>${Math.round(
//     forecast.daily[2].temp.min
//   )} / ${Math.round(forecast.daily[2].temp.max)}</span>`;

//   document.getElementById("day4-temp").innerHTML = `<img src='${
//     forecast.daily[3].weather[0].icon
//   }@2x.png'>   `;
//   document.getElementById("day4-temp").innerHTML += `<span>${Math.round(
//     forecast.daily[3].temp.min
//   )} / ${Math.round(forecast.daily[3].temp.max)}</span>`;

//   document.getElementById("day5-temp").innerHTML = `<img src='${
//     forecast.daily[4].weather[0].icon
//   }@2x.png'>   `;
//   document.getElementById("day5-temp").innerHTML += `<span>${Math.round(
//     forecast.daily[4].temp.min
//   )} / ${Math.round(forecast.daily[4].temp.max)}</span>`;
}


