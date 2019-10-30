const container = document.getElementById("weatherApp");
const tempDescription = document.getElementById("container2")
//const tempContainer = document.getElementById("temp");
//const descriptionContainer = document.getElementById("description");
const sunriseContainer = document.getElementById("sunrise");
const sunsetContainer = document.getElementById("sunset");

fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d0398012f9d3d7dc84a0eecbfd46c69a"
)
  .then(response => {
    return response.json();
  })

  .then(json => {
    container.innerHTML = `<h1>Weather right now in ${json.name}.</h1>`;

    console.log(json); //first check
    tempDescription.innerHTML += `<p>${json.weather[0].description} | ${json.main.temp.toFixed(1)} &#8451</p>`
    //tempContainer.innerHTML += `<p>${json.main.temp.toFixed(1)} &#8451 
    //</p>`;

    //descriptionContainer.innerHTML += `<p>${json.weather[0].description}</p>`;

    //Declare variable for the time of sunrise/sunset
    const unixTimestampSunrise = json.sys.sunrise;
    //To get sunrise/sunset time in hours:minutes:seconds
    let sunrise = new Date(unixTimestampSunrise * 1000);
    //Declare new variable to show only hh:mm
    let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
    sunriseContainer.innerHTML += `<p>sunrise ${sunriseTime}</p>`;

    const unixTimestampSunset = json.sys.sunset;
    let sunset = new Date(unixTimestampSunset * 1000);
    let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });
    sunsetContainer.innerHTML += `<p>sunset ${sunsetTime}</p>`;
  });

const forecastContainer = document.getElementById("forecast");
const todayContainer = document.getElementById("today");
const tueContainer = document.getElementById("tue");
const wedContainer = document.getElementById("wed");
const thuContainer = document.getElementById("thu");
const friContainer = document.getElementById("fri");

fetch(
  "http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=d0398012f9d3d7dc84a0eecbfd46c69a"

)
  .then(response => {
    return response.json();
  })

  .then(json => {
    //forecastContainer.innerHTML = `<h1>Weather right now in ${json.list}.</h1>`;
    todayContainer.innerHTML = `<p>Todays: min temp ${json.list[0].main.temp_min.toFixed(
      1
    )}&#8451  |  max temp ${json.list[0].main.temp_max.toFixed(1)}
    &#8451  |  ${json.list[0].weather[0].description}</p>`;

    tueContainer.innerHTML = `<p>Tuesday: min temp ${json.list[8].main.temp_min.toFixed(
      1
    )}&#8451 | max temp ${json.list[8].main.temp_max.toFixed(1)}
    &#8451 | ${json.list[8].weather[0].description}</p>`;

    wedContainer.innerHTML = `<p>Wednsday: min temp ${json.list[16].main.temp_min.toFixed(
      1
    )}&#8451 | max temp ${json.list[16].main.temp_max.toFixed(1)}
    &#8451 | ${json.list[16].weather[0].description} </p>`;

    thuContainer.innerHTML = `<p>Thursday: min temp ${json.list[24].main.temp_min.toFixed(
      1
    )}&#8451 | max temp ${json.list[24].main.temp_max.toFixed(1)}
    &#8451 | ${json.list[24].weather[0].description}</p>`;

    friContainer.innerHTML = `<p>Friday: min temp ${json.list[32].main.temp_min.toFixed(
      1
    )}&#8451 | max temp ${json.list[32].main.temp_max.toFixed(1)}
    &#8451 | ${json.list[32].weather[0].description}</p>`;

    console.log(json);
  });
