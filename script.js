const API_URL =
  'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3';
const API_FORECAST =
  'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3';
const cityName = document.getElementById('name');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const forecast = document.getElementById('forecast');
const displayWeekdays = document.getElementById('displayWeekdays');

fetch(API_URL)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // console.log(json);
    // console.log("city:", json.name);
    cityName.innerHTML = `
    <p>${json.name}</p>`;

    // console.log("temp:", json.main.temp);
    const tempDecimal = json.main.temp.toFixed(1);
    // console.log(tempDecimal);
    temp.innerHTML = `
    <p>${tempDecimal}°C</p>`;

    // console.log("description:", json.weather[0].description);
    description.innerHTML = `
    <p>${json.weather[0].description}</p>`;
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
  })
    // const filterForecastDecimal = filteredForecast[0].main.temp.toFixed(0)
    // const filterForecastDecimalTwo = filteredForecast[1].main.temp.toFixed(0)
    // const filterForecastDecimalThree = filteredForecast[2].main.temp.toFixed(0)
    // const filterForecastDecimalFour = filteredForecast[3].main.temp.toFixed(0)
    // const filterForecastDecimalFive = filteredForecast[4].main.temp.toFixed(0)
    // console.log(filterForecastDecimal)
    // forecast.innerHTML = `
    // <p>${filterForecastDecimal}°C</p>
    // <p>${filterForecastDecimalTwo}°C</p>
    // <p>${filterForecastDecimalThree}°C</p>
    // <p>${filterForecastDecimalFour}°C</p>
    // <p>${filterForecastDecimalFive}°C</p>`

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

    // // example of displaying the first name of the next day forecast
    // const firstDay = new Date(filteredForecast[0].dt_txt);
    // // console log the first day with date and time
    // console.log('first day with date and time:', firstDay);

    // const firstGetDay = firstDay.getDay();
    // // console log the day/weekday. This number represent an american weekday.
    // // 0 = sunday, 1 = monday, 2 = tuesday, 3 = wednesday, 4 = thursday, 5 = friday, 6 = saturday
    // console.log('first day (in number):', firstGetDay);

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
  ;
