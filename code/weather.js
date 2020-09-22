const changeCity = () => {
    let city = document.getElementById("city-label").value 
    console.log(city)
    fetchWeather(city)
}

const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLatLongCurrent);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
}

const getLatLongCurrent = (position) => {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    fetchForecast(position.coords.latitude, position.coords.longitude)
}

const getLatLong = (forecast) => {
    const lat = forecast.coord.lat
    console.log(lat)
    const lon = forecast.coord.lon
    console.log(lon)
    fetchForecast(lat, lon)
}

const fetchWeather = (city) => {
  return fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city},Sweden&units=metric&APPID=7d01b328e34c450986cb7faef032a771`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      getLatLong(json);
    });
};

const getDayOfWeek = (dayOfWeek) => {
  return isNaN(dayOfWeek)
    ? null
    : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][dayOfWeek];
};

const fetchForecast = (lat, lon) => {
  return fetch(
    // `https://api.openweathermap.org/data/2.5/onecall?lat=59.3326&lon=18.0649&%20exclude=current,minutely,hourly&appid=7d01b328e34c450986cb7faef032a771&units=metric`
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&%20exclude=current,minutely,hourly&appid=7d01b328e34c450986cb7faef032a771&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      sthlmForecast(json);
    });
};

const getIcon = (desc) => {
  let imgsrc;
  console.log(desc);
  if (desc == "Clouds") return (imgsrc = "clouds.png");
  else return (imsrc = "clear.png");
};

const sthlmForecast = (forecast) => {
  //get current city
  const currentCity = forecast.timezone.split("/")[1]
  const currentCityHTML = document.getElementById("city")
  currentCityHTML.innerHTML = currentCity

  //get current temp
  const currentTemp = document.getElementById("current");
  currentTemp.innerHTML = `${Math.round(forecast.current.temp)}&#8451`;

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

  //Get days for forecast
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
  document.getElementById("day1-temp").innerHTML = `<img src='${getIcon(
    forecast.daily[0].weather[0].main
  )}'>   `;

  //Dates with forecast
  document.getElementById("day1-temp").innerHTML += ` ${Math.round(
    forecast.daily[0].temp.min
  )} / ${Math.round(forecast.daily[0].temp.max)}`;
  document.getElementById("day2-temp").innerHTML = `${Math.round(
    forecast.daily[1].temp.min
  )} / ${Math.round(forecast.daily[1].temp.max)}`;
  document.getElementById("day3-temp").innerHTML = `${Math.round(
    forecast.daily[2].temp.min
  )} / ${Math.round(forecast.daily[2].temp.max)}`;
  document.getElementById("day4-temp").innerHTML = `${Math.round(
    forecast.daily[3].temp.min
  )} / ${Math.round(forecast.daily[3].temp.max)}`;
  document.getElementById("day5-temp").innerHTML = `${Math.round(
    forecast.daily[4].temp.min
  )} / ${Math.round(forecast.daily[4].temp.max)}`;
};

/*const sthlmWeather = (weather) => {
  console.log(weather.main.temp);
  document.getElementById("sthlm").innerHTML += `${weather.main.temp}`;
  //console.log(new Date(weather.sys.sunrise * 1000));
  const sunrise = new Date(weather.sys.sunrise * 1000);
  const sunset = new Date(weather.sys.sunset * 1000);
  console.log(new Date(weather.sys.sunset * 1000).getMinutes());
  document.getElementById("sthlm").innerHTML += `<p>Sunrise: ${
    sunrise.getHours() <= 9 ? `0` : ``
  }${sunrise.getHours()}:${sunrise.getMinutes()}</p>`;
  document.getElementById("sthlm").innerHTML += `<p>Sunset: ${
    sunset.getHours() <= 9 ? `0` : ``
  }${sunset.getHours()}:${sunset.getMinutes()}</p>`;
  //console.log(sunrise.getHours());
};*/

/*const fetchForecast = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7d01b328e34c450986cb7faef032a771`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        //console.log(json.name);
        //console.log(json.main.temp);
        //const roundedWeather = Math.round(json.main.temp * 10) / 10;
        //console.log(roundedWeather);
        //console.log(json.weather[0].description);
        sthlmForecast(json);
        //return json;
      });
  };*/

/*const sthlmWeather = (weather) => {
    console.log(weather.main.temp);
    document.getElementById("sthlm").innerHTML += `${weather.main.temp}`
    //console.log(new Date(weather.sys.sunrise * 1000));
    const sunrise = new Date(weather.sys.sunrise * 1000);
    const sunset = new Date(weather.sys.sunset * 1000);
    console.log((new Date(weather.sys.sunset * 1000)).getMinutes());
    document.getElementById("sthlm").innerHTML += `<p>Sunrise: ${(sunrise.getHours()) <= 9 ? `0`:``}${sunrise.getHours()}:${sunrise.getMinutes()}</p>`
    document.getElementById("sthlm").innerHTML += `<p>Sunset: ${(sunset.getHours()) <= 9 ? `0`:``}${sunset.getHours()}:${sunset.getMinutes()}</p>`
    //console.log(sunrise.getHours());
}*/

/*const sthlmForecast = (forecast) => {
    const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'))
    filteredForecast.forEach((day) => console.log(day.main.temp_min, day.main.temp_max))
}*/

/*let sthlmWeather = fetchWeather().then((weather) => {
  // This will be executed later, after the results are received from the server
  sthlmWeather = weather;
  let sunriseSthlm = new Date(sthlmWeather.sys.sunrise);
  console.log(sunriseSthlm.getHours())
  document.getElementById("sthlm").innerHTML += `${sthlmWeather.main.temp}`
});*/

//setTimeout(((console.log(sthlmWeather.main)), 2000));

//document.getElementById("sthlm").innerHTML += `${sthlmWeather.main.temp}`
