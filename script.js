/*const apiKey = 'd0398012f9d3d7dc84a0eecbfd46c69a'*/
/*const location = 'Stockholm,Sweden' */
const container = document.getElementById("weatherApp");
const tempDescription = document.getElementById("container2")
//const tempContainer = document.getElementById("temp");
//const descriptionContainer = document.getElementById("description");
const sunriseContainer = document.getElementById("sunrise");
const sunsetContainer = document.getElementById("sunset");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=d0398012f9d3d7dc84a0eecbfd46c69a"
)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    container.innerHTML = `<h1>The weather in ${json.name}</h1>`;

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


//Forecast 5 days
const handle5DayForecast = (json) => {
  const forecastDiv = document.getElementById('forecast')
  console.log(json)
  const dates = {}

  json.list.forEach((weather) => {
    const date = weather.dt_txt.split(' ')[0]
    if (dates[date]) {
      dates[date].push(weather)
    } else {
      dates[date] = [weather]
    }

  })
  Object.entries(dates).forEach((item, index) => {
    if (index === 0) {
      return
    }
    const date = item[0]
    const weatherValues = item[1]

    //console.log(date, weatherValues)
    const temps = weatherValues.map((value) => {
      return value.main.temp
    })
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)
    console.log(date, minTemp, maxTemp)
    
    //the descriptions for the forecast
    const firstForecast = document.getElementById("day1")
    const secondForecast = document.getElementById("day2")
    const thirdForecast = document.getElementById("day3")
    const forthForecast = document.getElementById("day4")
    const fifthForecast = document.getElementById("day5")


    // += gives the whole list
    forecastDiv.innerHTML += `<ul>${date} | min: ${minTemp.toFixed(1)}° | max: ${maxTemp.toFixed(1)}°  </ul>`
    
    firstForecast.innerHTML = `<p> | ${json.list[7].weather[0].main.toLowerCase()}</p>`;
    secondForecast.innerHTML = `<p> | ${json.list[15].weather[0].main.toLowerCase()}</p>`;
    thirdForecast.innerHTML = `<p>  | ${json.list[23].weather[0].main.toLowerCase()}</p>`;
    forthForecast.innerHTML = `<p> | ${json.list[31].weather[0].main.toLowerCase()}</p>`;
    fifthForecast.innerHTML = `<p> | ${json.list[39].weather[0].main.toLowerCase()}</p>`;
  })
}

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=d0398012f9d3d7dc84a0eecbfd46c69a`)
  .then((res) => res.json())
  .then(handle5DayForecast)



  /*  *** 1st forecast edition ***
  const forecastContainer = document.getElementById("forecast");
  const todayContainer = document.getElementById("today");
  const tueContainer = document.getElementById("tue");
  const wedContainer = document.getElementById("wed");
  const thuContainer = document.getElementById("thu");
  const friContainer = document.getElementById("fri");*/

  /*fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=d0398012f9d3d7dc84a0eecbfd46c69a"
  
  )
    .then((response) => {
      return response.json();
    })

  .then((json) => {
    //forecastContainer.innerHTML = `<h1>Weather right now in ${json.list}.</h1>`;
    todayContainer.innerHTML = `<p>Today | min ${json.list[0].main.temp_min.toFixed(
      1
    )}&#8451  |  max ${json.list[0].main.temp_max.toFixed(1)}
    &#8451  |  ${json.list[0].weather[0].description}</p>`;

    tueContainer.innerHTML = `<p>Tue | min ${json.list[8].main.temp_min.toFixed(
      1
    )}&#8451 |  max ${json.list[8].main.temp_max.toFixed(1)}
    &#8451 | ${json.list[8].weather[0].description}</p>`;

    wedContainer.innerHTML = `<p>Wed | min ${json.list[16].main.temp_min.toFixed(
      1
    )}&#8451 | max ${json.list[16].main.temp_max.toFixed(1)}
    &#8451 | ${json.list[16].weather[0].description} </p>`;

    thuContainer.innerHTML = `<p>Thu | min ${json.list[24].main.temp_min.toFixed(
      1
    )}&#8451 | max ${json.list[24].main.temp_max.toFixed(1)}
    &#8451 | ${json.list[24].weather[0].description}</p>`;

    friContainer.innerHTML = `<p>Fri | min ${json.list[32].main.temp_min.toFixed(
      1
    )}&#8451 | max ${json.list[32].main.temp_max.toFixed(1)}
    &#8451 | ${json.list[32].weather[0].description}</p>`;

    console.log(json);
  }); */
