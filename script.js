const topSection = document.getElementById("topSection");
const main = document.getElementById("main");
const degrees = document.getElementById("degrees");
const city = document.getElementById("city");
const condition = document.getElementById("condition");
const sunriseSunset = document.getElementById("sunriseSunset");
const button = document.getElementById("button");
const mainImage = document.getElementById("mainImage");
const forecast = document.getElementById("forecastWrapper");

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Reykjavik&appid=fa2755c779ce094fc80f2fa365eea704&units=metric"
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    //started to add first details to our topsection
    degrees.innerHTML = `${json.main.temp.toFixed(1)}<sup>°C</sup>`;
    city.innerHTML = json.name;
    condition.innerHTML = json.weather[0].description;

    //Below the current UNIX time of sunrise/sunset times will be converted to HH:MM
    const sunriseData = new Date(json.sys.sunrise * 1000);
    console.log(sunriseData);
    const sunsetData = new Date(json.sys.sunset * 1000);
    console.log(sunsetData);
    //Here I used the option argument to customize the result of the toLocaleTimeString method
    const sunriseTime = sunriseData.toLocaleString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log(sunriseTime);
    const sunsetTime = sunsetData.toLocaleString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log(sunsetTime);
    //Added the converted time for sunrise/sunset to section sunriseSunset
    sunriseSunset.innerHTML = `<h3>sunrise</h3>`;
    sunriseSunset.innerHTML += `<h3>${sunriseTime}</h3>`;
    sunriseSunset.innerHTML += `<h3>sunset</h3>`;
    sunriseSunset.innerHTML += `<h3>${sunsetTime}</h3>`;
    console.log(json.sys);
    console.log(currentTimeCorrectFormat);
    //Show different background depending on what time the sunrise/sunset is
    if (
      sunriseTime <= currentTimeCorrectFormat &&
      currentTimeCorrectFormat < sunsetTime
    ) {
      topSection.style.backgroundImage = `linear-gradient(50deg, #663399 0%, #b9bfff 50%, #22277A 100%)`;
    } else {
      if (window.innerWidth < 668) {
        topSection.style.backgroundImage =
          "url(Designs/Design-1/assets/night-small.jpg)";
      } else if (window.innerWidth < 1023) {
        topSection.style.backgroundImage =
          "url(Designs/Design-1/assets/night-medium.jpg)";
      } else {
        topSection.style.backgroundImage =
          "url(Designs/Design-1/assets/night-large.jpg)";
      }
    }

    //Variable for Todays weather main, to use when changing the picture in topSection
    let mainWeatherToday = json.weather[0].main;
    console.log(mainWeatherToday);
    if (mainWeatherToday === "Snow") {
      weatherImg = "Designs/Design-1/assets/snow.svg";
    } else if (mainWeatherToday === "Rain" || mainWeatherToday === "Drizzle") {
      weatherImg = "Designs/Design-1/assets/rain.svg";
    } else if (mainWeatherToday === "Thunderstorm") {
      weatherImg = "Designs/Design-1/assets/thunder.svg";
    } else if (
      mainWeatherToday === "Mist" ||
      mainWeatherToday === "Fog" ||
      mainWeatherToday === "Ash"
    ) {
      weatherImg = "Designs/Design-1/assets/mist.svg";
    } else if (mainWeatherToday === "Clouds") {
      weatherImg = "Designs/Design-1/assets/cloud.svg";
    } else if (mainWeatherToday === "Clear") {
      weatherImg = "Designs/Design-1/assets/clear.svg";
    }
    mainImage.innerHTML += `<image src=${weatherImg} alt='icon of the weather Today'/>`;
  });

//Make the current time be in same format as sunrise/sunset time to be able to compare
const currentTime = new Date();
const currentTimeCorrectFormat = currentTime.toLocaleTimeString("sv-SE", {
  hour: "2-digit",
  minute: "2-digit",
});

fetch(
  "https://api.openweathermap.org/data/2.5/forecast?lat=64.1355&lon=-21.8954&appid=fa2755c779ce094fc80f2fa365eea704&units=metric"
)
  .then((response) => {
    return response.json();
  })
  .then((fiveDay) => {
    //mapping the data, starting point is dates
    const getDates = fiveDay.list.map((day) => ({
      ...day,
      date: new Date(day.dt_txt),
    }));

    //Empty array to be populated with our chosen data
    const forecasts = [];

    const today = new Date();
    const currentDate = new Date();

    //looping through and using helper function to filter on days (since we have several data points from each day)
    for (let i = 0; i < 5; i++) {
      currentDate.setDate(today.getDate() + i);
      let currentWeatherItems = getDates.filter((day) =>
        datesAreOnSameDay(day.date, currentDate)
      );
      console.log("current", currentWeatherItems);

      //pushing the data in to our new array!
      forecasts.push({
        dayDate: currentWeatherItems[0].dt, //the actual date from the data, we use the first time each date happens
        weatherIcon: currentWeatherItems[0].weather[0].main, //the weather for each day represented by the first instance (we could also search for how many times a certain weather type occurs and use the most common as well, but we use this for now)
        highTemp: getMaxTemp(currentWeatherItems), //The high temperature
        lowTemp: getMinTemp(currentWeatherItems), //The low temperature
      });
    }
    console.log(forecasts); //testing the array

    //Using our new array!
    //Format the dayDate from the new array to a string dayName, to be populated into HTML
    forecasts.forEach((item) => {
      const date = new Date(item.dayDate * 1000);
      let dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      // Looping through the array and deciding on the icon depending on weather forecast
      let mainWeather = item.weatherIcon;
      if (mainWeather === "Snow") {
        weatherImg = "Designs/Design-1/assets/snow.svg";
      } else if (mainWeather === "Rain" || mainWeather === "Drizzle") {
        weatherImg = "Designs/Design-1/assets/rain.svg";
      } else if (mainWeather === "Thunderstorm") {
        weatherImg = "Designs/Design-1/assets/thunder.svg";
      } else if (
        mainWeather === "Mist" ||
        mainWeather === "Fog" ||
        mainWeather === "Ash"
      ) {
        weatherImg = "Designs/Design-1/assets/mist.svg";
      } else if (mainWeather === "Clouds") {
        weatherImg = "Designs/Design-1/assets/cloud.svg";
      } else if (mainWeather === "Clear") {
        weatherImg = "Designs/Design-1/assets/clear.svg";
      }

      //Populating the HTML with the data
      forecast.innerHTML += `<div class="forecast-weekday">
        <div class="each-weekday">${dayName}</div>
        <div class="forecast-img"><img src=${weatherImg}></div> 
        <div class="forecast-temp">${item.highTemp} °C /&nbsp;${item.lowTemp} °C</div>
        </div>`;
    });
  })
  .catch((error) => console.log(error));

//Function to get rounded high temperature for the entire day
const getMaxTemp = (data) => {
  const temps = data.map((item) => item["main"]["temp"]);
  return Math.round(Math.max(...temps));
};
//Function to get rounded low temperature for the entire day
const getMinTemp = (data) => {
  const temps = data.map((item) => item["main"]["temp"]);
  return Math.round(Math.min(...temps));
};

const datesAreOnSameDay = (first, second) =>
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();
