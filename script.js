const container = document.getElementById("weaterApp");
const tempContainer = document.getElementById("temp");
const descriptionContainer = document.getElementById("description");
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
    //return json.toFixed(1);
    console.log(json); //first check
    tempContainer.innerHTML += `<h1>${json.main.temp.toFixed(1)}degrees</h1>`;
    //return json.toFixed(1);
    descriptionContainer.innerHTML += `<h1>${json.weather[0].description}</h1>`;

    //Declare variable for the time of sunrise/sunset
    const unixTimestampSunrise = json.sys.sunrise;
    //To get sunrise/sunset time in hours:minutes:seconds
    let sunrise = new Date(unixTimestampSunrise * 1000);
    //Declare new variable to show only hh:mm
    let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short" });
    sunriseContainer.innerHTML += `<p>Sunrise today ${sunriseTime}</p>`;

    const unixTimestampSunset = json.sys.sunset;
    let sunset = new Date(unixTimestampSunset * 1000);
    let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short" });
    sunsetContainer.innerHTML += `<p>Sunset today ${sunsetTime}</p>`;
  });
