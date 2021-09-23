// DOM-SELECTORS
const dailyContent = document.getElementById("dailyContent");
const weeklyContent = document.getElementById("weeklyContent");

// Global variables
let dayAndTemp = []; // empty list
let city = "Gothenburg";
let dailyContentIcon = ``;

//Functions
function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek)
    ? null
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek];
}

const weatherCityToday = `https://api.openweathermap.org/data/2.5/weather?q=${city},Sweden&units=metric&APPID=6f4589c9a1ed485fe713e8f5159a6ff9`;

// Fetch the JSON from the API and save the variables sunrise and sunset
fetch(weatherCityToday)
  .then((res) => res.json())
  .then((data) => {
    console.log(data); // Important console.log
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    let description = data.weather[0].description;
    let main = data.weather[0].main;
    // A function that converts epoch to ordinary time and then from milliseconds to seconds.
    function convert(t) {
      const dt = new Date(t * 1000);
      const hr = dt.getHours();
      const m = "0" + dt.getMinutes();
      return hr + ":" + m.substr(-2);
    }

    const sunriseTime = convert(sunrise);
    const sunsetTime = convert(sunset);

    console.log(description);

    //condintional that change the dailyContentIcon depending on the weather.
    if (main === `Thunderstorm`) {
      dailyContentIcon = `<i class="fa-solid fa-cloud-bolt daily-weather-icon"></i>`;
    } else if (main === `Drizzle`) {
      dailyContentIcon = `<i class="fa-solid fa-cloud-drizzle daily-weather-icon"></i>`;
    } else if (main === `Rain`) {
      dailyContentIcon = `<i class="fa-solid fa-cloud-rain daily-weather-icon"></i>`;
    } else if (main === `Snow`) {
      dailyContentIcon = `<i class="fa-solid fa-cloud-snow daily-weather-icon"></i>`;
    } else if (main === `Mist`) {
      dailyContentIcon = `<i class="fa-solid fa-cloud-fog daily-weather-icon"></i>`;
    } else if (main === `Smoke`) {
      dailyContentIcon = `<i class="fa-solid fa-smoke daily-weather-icon"></i>`;
    } else if (main === `Haze`) {
      dailyContentIcon = `<i class="fa-solid fa-sun-haze daily-weather-icon"></i>`;
    } else if (main === `Dust`) {
      dailyContentIcon = `<i class="fa-solid fa-sun-dust daily-weather-icon"></i>`;
    } else if (main === `Fog`) {
      dailyContentIcon = `<i class="fa-solid fa-cloud-fog daily-weather-icon"></i>`;
    } else if (main === `Sand`) {
      dailyContentIcon = `<i class="fa-solid fa-sun-dust daily-weather-icon"></i>`;
    } else if (main === `Ash`) {
      dailyContentIcon = `<i class="fa-solid fa-cloud-sun daily-weather-icon"></i>`;
    } else if (main === `Squall`) {
      dailyContentIcon = `<i class="fa-solid fa-tornado daily-weather-icon"></i>`;
    } else if (main === `Tornado`) {
      dailyContentIcon = `<i class="fa-solid fa-tornado daily-weather-icon"></i>`;
    } else if (main === `Clear`) {
      dailyContentIcon = `<i class="fa-solid fa-sun-bright daily-weather-icon yellow"></i>`;
    } else if (main === `Clouds`) {
      dailyContentIcon = `<i class="fa-solid fa-clouds daily-weather-icon"></i>`;
    }

    // Conversion of the first letter in description to be a uppercase. (Done by doing a slice to not do the whole word.)
    description = description.charAt(0).toUpperCase() + description.slice(1);

    // Change the innerhtml with new content and use the values we picked up from the json.
    console.log(dailyContentIcon);
    dailyContent.innerHTML = `
      <div class="main-daily-info">
       <div class="headings">
        <div><i class="fa-thin fa-bars"></i></div>
        <div class="daily-icon-container">${dailyContentIcon}</div>
        <div class="daily-temp">
         <h1>${Math.round(data.main.temp * 10) / 10}
          <span class="celsius">°C</span>
         </h1>
        </div>
        <h2>${data.name}</h2>
        <h3>${description}</h3>
        <div class="main-sunset-sunrise">
         <h3 class="sunrise-sunset"> Sunrise: </h3>
         <h3 class="sunrise-sunset"> ${sunriseTime}</h3>
         <h3 class="sunrise-sunset"> Sunset:</h3>
         <h3 class="sunrise-sunset">${sunsetTime}</h3>
        </div>
       </div>
       <button class="button"><i class="far fa-chevron-right"></i></button>
      </div>`;
  });

const weatherForecast5DaysCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city},Sweden&units=metric&APPID=6f4589c9a1ed485fe713e8f5159a6ff9`;

// Fetch the JSON from the API for the five day weather forecast
fetch(weatherForecast5DaysCity)
  .then((res) => res.json())
  .then((data) => {
    console.log(data); // remove this later

    // myDates and myDescriptions is at this point empty
    let myDates = [];

    // A function in which we forEach element in the list targets the dt_txt file and do a split between the date and the time.
    // This will separate the 2021-09-21 from the time 09:00 and make two strings of it in an array.
    // We do a if statement to check if the variable myDates consist of the date[at position 0 since the date is at the 0 position in the array]
    // If myDates doesnt contain the date that is looped over it gets added to myDates.
    data.list.forEach((element) => {
      let date = element.dt_txt.split(" ");

      if (!myDates.includes(date[0])) {
        myDates.push(date[0]);
      }
    });
    console.log(myDates);

    // myDates ends up being an array with 6 objects in it and since we dont want todays information we use the function myDates.shift
    // which removes the first object in an array.
    myDates.shift();

    //myDates now consists of the 5 dates. We now loop over the element which is the 5 days and forEach date we go in into the big list of 40 values and
    //filter the list to pick up the dt_txt that includes the date. For example the first search will be 2021-09-22.
    myDates.forEach((element) => {
      let weatherAt9 = data.list.filter((e) =>
        e.dt_txt.includes(`${element} 09:00:00`)
      );

      console.log("weather at 9", weatherAt9);

      let description = weatherAt9[0].weather[0].main;
      console.log(description);

      // e is 1 of the 40 objects in the weekly json.
      let weatherDuringADay = data.list.filter((e) =>
        e.dt_txt.includes(element)
      );

      //We set the minTemp and the maxTemp to specified values.
      let minTemp = 80;
      let maxTemp = -80;

      // we do a comparison of the weather during the days to find the minTemp and MaxTemp of each day.
      weatherDuringADay.forEach((e) => {
        if (e.main.temp_min < minTemp) {
          minTemp = Math.round(e.main.temp_min);
        } else if (e.main.temp_max > maxTemp) {
          maxTemp = Math.round(e.main.temp_max);
        }
      });

      // we call for the function getDayOfWeek (to get the fri, sat, sun or whatever the day is for day) and save it into a variable called dayOfWeek
      const dayOfWeek = getDayOfWeek(element);

      // After this is done we push it up to an object were we say that day:element (the day it is looping over)
      //dayOfWeek: dayOfWeek (got this by envoking getDayOfWeek with the element (which is the actual day it is looping over)
      //tempMin: minTemp, tempMax:maxTemp, description: description.
      dayAndTemp.push({
        day: element,
        dayOfWeek: dayOfWeek,
        tempMin: minTemp,
        tempMax: maxTemp,
        description: description,
      });
    });

    console.log(dayAndTemp); // console.log the dayAndTemp

    // Conditional statements to show the icons for the weekly weather depending
    // on the weather registrered for the day in `main`.
    dayAndTemp.forEach((weekday) => {
      let icon = "";

      if (weekday.description === `Thunderstorm`) {
        icon = `<i class="fa-solid fa-cloud-bolt weekly-weather-icon"></i>`;
      } else if (weekday.description === `Drizzle`) {
        icon = `<i class="fa-solid fa-cloud-drizzle weekly-weather-icon"></i>`;
      } else if (weekday.description === `Rain`) {
        icon = `<i class="fa-solid fa-cloud-rain weekly-weather-icon"></i>`;
      } else if (weekday.description === `Snow`) {
        icon = `<i class="fa-solid fa-cloud-snow weekly-weather-icon"></i>`;
      } else if (weekday.description === `Mist`) {
        icon = `<i class="fa-solid fa-cloud-fog weekly-weather-icon"></i>`;
      } else if (weekday.description === `Smoke`) {
        icon = `<i class="fa-solid fa-smoke weekly-weather-icon"></i>`;
      } else if (weekday.description === `Haze`) {
        icon = `<i class="fa-solid fa-sun-haze weekly-weather-icon"></i>`;
      } else if (weekday.description === `Dust`) {
        icon = `<i class="fa-solid fa-sun-dust weekly-weather-icon"></i>`;
      } else if (weekday.description === `Fog`) {
        icon = `<i class="fa-solid fa-cloud-fog weekly-weather-icon"></i>`;
      } else if (weekday.description === `Sand`) {
        icon = `<i class="fa-solid fa-sun-dust weekly-weather-icon">`;
      } else if (weekday.description === `Ash`) {
        icon = `<i class="fa-solid fa-cloud-sun weekly-weather-icon"></i>`;
      } else if (weekday.description === `Squall`) {
        icon = `<i class="fa-solid fa-tornado weekly-weather-icon">`;
      } else if (weekday.description === `Tornado`) {
        icon = `<i class="fa-solid fa-tornado weekly-weather-icon"></i>`;
      } else if (weekday.description === `Clear`) {
        icon = `<i class="fa-solid fa-sun-bright weekly-weather-icon"></i>`;
      } else if (weekday.description === `Clouds`) {
        icon = `<i class="fa-solid fa-clouds weekly-weather-icon"></i>`;
      }

      weeklyContent.innerHTML += `<div class="day">
      <h4>${weekday.dayOfWeek}</h4><h4>${icon}</h4><h4>${weekday.tempMin}°   /   ${weekday.tempMax}°C</h4>     
      </div>`;
    });
  });
