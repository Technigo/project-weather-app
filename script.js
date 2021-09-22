//SELECTORS
const weatherDisplay = document.getElementById("weather-display");
const fiveDays = document.getElementById("five-days");
const mainSection = document.getElementById("main__section");
const weatherH1 = document.getElementById("heading1");
const pictureWeather = document.getElementById("weatherImage");

//APIS ADDRESS
const API_KEY =
  "https://api.openweathermap.org/data/2.5/weather?q=Oslo,Norway&units=metric&APPID=0783dde9496332573fca5cd853c81369";

const fiveDaysForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=Oslo,Norway&units=metric&APPID=0783dde9496332573fca5cd853c81369";

// FIRST FETCH
fetch(API_KEY)
  .then((response) => {
    return response.json();
  })

  .then((json) => {
    // console.log(`This is an object: ${JSON.stringify(json)}`);
    const sunriseTime = json.sys.sunrise; //a varible for sunrise time in miliseconds
    const sunsetTime = json.sys.sunset; //a varible for sunset time in miliseconds
    const sunriseRealTime = new Date(sunriseTime * 1000); // converts the sunrise miliseconds time to normaltime
    const sunsetRealTime = new Date(sunsetTime * 1000); // converts the sunset miliseconds time to normaltime
    //calling the functions to get only hours and minutes.
    const temperatureRounded = Math.floor(json.main.temp);
    const [sunriseHour, sunriseMinutes, sunsetHour, sunsetMinutes] = [
      sunriseRealTime.getHours(),
      sunriseRealTime.getMinutes(),
      sunsetRealTime.getHours(),
      sunsetRealTime.getMinutes(),
    ];
    console.log(json);
    console.log(json.weather[0].main, json.weather[0].main === "Clear" )
    if (json.weather[0].main === "Clear") { 
      mainSection.classList.add("sunny");
      console.log(mainSection)
      weatherH1.innerHTML = `Get your sunnies on ${json.name} is looking rather great today!`;
      pictureWeather.setAttribute(
        "src",
        "./Designs/Design-2/icons/noun_Sunglasses_2055147.svg"
      );
    
    } else if (json.weather[0].main === "Rain" || json.weather.main === "Drizzle" ||  json.weather.main === "Thunderstorm" ||  json.weather.main === "Snow") {
      mainSection.classList.add("rainy");
      weatherH1.innerHTML = `Don't forget your umbrella. It's wet in ${json.name} today!`;
      pictureWeather.setAttribute(
        "src",
        "/Designs/Design-2/icons/noun_Umbrella_2030530.svg"
      );
    } else { 
      mainSection.classList.add("cloudy");
      weatherH1.innerHTML = `Light a fire and get cosy. ${json.name} is looking grey today!`;
      pictureWeather.setAttribute(
        "src",
        "/Designs/Design-2/icons/noun_Cloud_1188486.svg"
      );
    }

    weatherDisplay.innerHTML = `
    <div>
    <p>city: ${json.name}</p>
    <p> ${temperatureRounded} °C</p>
    <p>Type of weather: ${json.weather[0].description}</p>
    <p>Sunrise: ${sunriseHour}:${sunriseMinutes}</p>
    <p>Sunset: ${sunsetHour}:${sunsetMinutes}</p>
    </div>
    `
  })
  .catch(error => {
    console.error('error', error)
  })

// SECOND FETCH
fetch(fiveDaysForcast) //getting info from api url above
  .then((response) => response.json()) //here we get the info and json converts into
  .then((fiveDaysWeather) => {
    // here we start printing the information we are getting from the api
    //a parameter
    // console.log(fiveDaysWeather);
    // since we only want certain values so below we fetch the dates at a specific time
    const filterWeather = fiveDaysWeather.list.filter((item) =>
      item.dt_txt.includes("12:00")
    );
    // console.log(filterWeather);
    //create an array with our weekdays
    const weekdays = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    filterWeather.forEach((item) => {
      // convert dt to javascript default date format
      // from seconds => millisecond
      const d = new Date(item.dt * 1000);
      // format the date to a weekday number
      const weekdayNumber = d.getDay();
      console.log(`hello ${weekdays[weekdayNumber]}`);
      // use that number as the index of the array
      // innerHTML = weekdays[weekdayNumber];
      const roundedTemperature = Math.floor(item.main.temp);
      // roundedTemperature = Math.floor(roundedTemperature);
      console.log(roundedTemperature);

      //printing the weekday number with the weekday array above
      fiveDays.innerHTML += ` 
      <div class="daily-forecast"> 
      <p> ${weekdays[weekdayNumber]}</p> 
      <p> ${roundedTemperature}°C </p>
      </div> 
  `;
    })
  })
.catch(error => {
  console.error('error', error)
})