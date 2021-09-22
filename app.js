// DOM-SELECTORS
const dailyContent = document.getElementById("dailyContent");
const weeklyContent = document.getElementById("weeklyContent");

// Global variables
let dayAndTemp = []; // empty list
let city = "Gothenburg";
city = "Paris";
let dailyContentIcon = "";

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
    if (main === `Thunderstorm`) {
      dailyContentIcon = `Thunderstorm`;
    } else if (main === `Drizzle`) {
      dailyContentIcon = `Drizzle`;
    } else if (main === `Rain`) {
      dailyContentIcon = `Rain`;
    } else if (main === `Snow`) {
      dailyContentIcon = `Snow`;
    } else if (main === `Mist`) {
      dailyContentIcon = `Mist`;
    } else if (main === `Smoke`) {
      dailyContentIcon = `Smoke`;
    } else if (main === `Haze`) {
      dailyContentIcon = `Haze`;
    } else if (main === `Dust`) {
      dailyContentIcon = `Dust`;
    } else if (main === `Fog`) {
      dailyContentIcon = `Fog`;
    } else if (main === `Sand`) {
      dailyContentIcon = `Sand`;
    } else if (main === `Dust`) {
      dailyContentIcon = `Dust`;
    } else if (main === `Ash`) {
      dailyContentIcon = `Ash`;
    } else if (main === `Squall`) {
      dailyContentIcon = `Squall`;
    } else if (main === `Tornado`) {
      dailyContentIcon = `Tornado`;
    } else if (main === `Clear`) {
      dailyContentIcon = `Clear`;
    } else if (main === `Clouds`) {
      dailyContentIcon = `Clouds`;
    }

    // Change the innerhtml with new content and use the values we picked up from the json.
    console.log(dailyContentIcon);
    dailyContent.innerHTML = `
        <div class="main-daily-info">
        <div class="headings">
        <div><i class="fas fa-bars"></i></div>
         <div class="daily-temp">
          <h1>${Math.round(data.main.temp * 10) / 10}
           <span class="celsius">°C</span>
          </h1>
          <div>${dailyContentIcon}</div>
         </div>
         <h2>${data.name}</h2>
         <h3>${description}</h3>
       
      
         <div class="main-sunset-sunrise">
          <h3>Sunrise:</h3>
          <h3>${sunriseTime}</h3>
          <h3>Sunset:</h3>
          <h3>${sunsetTime}</h3>
         </div>
         </div>
        </div>
        `;
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
      //tempMin: minTemp and tempMax:maxTemp
      dayAndTemp.push({
        day: element,
        dayOfWeek: dayOfWeek,
        tempMin: minTemp,
        tempMax: maxTemp,
        description: description,
      });
    });

    console.log(dayAndTemp); // console.log the dayAndTemp

    //
    dayAndTemp.forEach((weekday) => {
      let icon = "";

      if (weekday.description === `Thunderstorm`) {
        icon = `Thunderstorm`;
      } else if (weekday.description === `Drizzle`) {
        icon = `Drizzle`;
      } else if (weekday.description === `Rain`) {
        icon = `Rain`;
      } else if (weekday.description === `Snow`) {
        icon = `Snow`;
      } else if (weekday.description === `Mist`) {
        icon = `Mist`;
      } else if (weekday.description === `Smoke`) {
        icon = `Smoke`;
      } else if (weekday.description === `Haze`) {
        icon = `Haze`;
      } else if (weekday.description === `Dust`) {
        icon = `Dust`;
      } else if (weekday.description === `Fog`) {
        icon = `Fog`;
      } else if (weekday.description === `Sand`) {
        icon = `Sand`;
      } else if (weekday.description === `Dust`) {
        icon = `Dust`;
      } else if (weekday.description === `Ash`) {
        icon = `Ash`;
      } else if (weekday.description === `Squall`) {
        icon = `Squall`;
      } else if (weekday.description === `Tornado`) {
        icon = `Tornado`;
      } else if (weekday.description === `Clear`) {
        icon = `Clear`;
      } else if (weekday.description === `Clouds`) {
        icon = `Clouds`;
      }

      weeklyContent.innerHTML += `<div class="day">
      <h4>${weekday.dayOfWeek}</h4><h4>${icon}</h4><h4>${weekday.tempMin}°   /   ${weekday.tempMax}°C</h4>     
      </div>`;
    });
  });
