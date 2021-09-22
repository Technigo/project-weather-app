const API_URL =
  'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3';
const API_FORECAST =
  'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3';
const cityName = document.getElementById('name');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const humidity = document.getElementById("humidity");
const forecast = document.getElementById('forecast');
const displayWeekdays = document.getElementById('displayWeekdays');
const sunTime = document.getElementById("suntimes");

fetch(API_URL)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // console.log(json);
    // console.log("city:", json.name);
    cityName.innerHTML = `
    <p>${json.name}</p>`;

    console.log("temp:", json.main.temp);
    const tempDecimal = json.main.temp.toFixed(0); //Kriss&Sofia took the decimal away!
    console.log(tempDecimal);
    // temp.innerHTML = `
    // <p>${tempDecimal}°c</p>`;

    // console.log("description:", json.weather[0].description);
    description.innerHTML = `
    <p>${json.weather[0].description}</p>`;

    humidity.innerHTML =`
    <p>${json.main.humidity}% relative humidity</p>`;
  });

fetch(API_FORECAST)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(`Filtered forecast:`,filteredForecast)

    filteredForecast.forEach((cast, index) => {
      const tempOfTheDay = filteredForecast[index].main.temp.toFixed(0)
      const descriptNow = filteredForecast[index].weather[0].description
      console.log(descriptNow)
      forecast.innerHTML += `
      <p>${tempOfTheDay}°C ${descriptNow}</p>`
    })

    // display the name of the weekday for the next five days forecast

    // set up an array with the names of each weekday.
    // So weekday[0] = 'Sunday'; weekday[1] = 'Monday' and so on.
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    // local variable where we can store the names of the weekdays
    const weekdaysNamesArray = [];

    filteredForecast.forEach((_, index) => {
      // for all of the five arrays in 'filteredForecast' we want to get the Date and Time
      // we can get the data from 'filteredForecast[index].dt_txt'
      // store each data in a variable named 'dateAndTime'
      const dateAndTime = new Date(filteredForecast[index].dt_txt);
      // console each date and time we get (five times)
      console.log('day with date and time:', dateAndTime);
      // store the data that define which weekday it is in an array named 'weekdaysNamesArray'
      weekdaysNamesArray[index] = dateAndTime.getDay();
    });

    // get an array with all five weekdays (in numbers)
    console.log('array with all five days (in numbers):', weekdaysNamesArray);

    // to transform the data into names and display it on the webpage
    weekdaysNamesArray.forEach((day) => {
      displayWeekdays.innerHTML += `
      ${weekday[day]}
      `;
    });
    `<p>${json.weather[0].description} | ${tempDecimal}°C</p>`;

    // console.log("main:", json.weather[0].main);
    // if (json.weather[0].main === 'Clear') {
    //     body.style.background = 
    // }

    console.log("suntimes:", json.sys.sunset);

    const rise = new Date(json.sys.sunrise * 1000); // new Date() shows todays date. The json.sys.sunrise gets the time for the sunrise in ms x 1000 to get a whole second
    const up = rise.toLocaleTimeString([], {
      // returns the date object as a string, using local (timezone) conventions
      hour: "2-digit", // show the time as 00:00 hour/minute
      minute: "2-digit",
    });
    sunTime.innerHTML = `<p>Sunrise ${up}</p>`;

    console.log("SUNRISE:", rise);
    const set = new Date(json.sys.sunset * 1000);
    const down = set.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log("SUNSET:", set);
    sunTime.innerHTML += `<p>Sunset ${down}</p>`;
  });
