// DOM-SELECTORS
const dailyContent = document.getElementById("dailyContent");
const weeklyContent = document.getElementById("weeklyContent");

// Global variables
let dayAndTemp = [];
let city = "Gothenburg";
let dailyContentIcon = ``;

//Functions
// Function to get what day of the week a date is.
const getDayOfWeek = (date) => {
  const dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek)
    ? null
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek];
};

// Function that shows or hides the menu.
const toggleMenu = () => {
  const menu = document.getElementById("menu");
  menu.classList.toggle("menu-active");
};

// Function that changes city depending on the value of "town".
const display = (town) => {
  city = town;
  getWeatherPrognose();
};

// Function that contains all the data to fetch the weather prognoses we use on our site.
const getWeatherPrognose = () => {
  // Reset the innerHTML of weeklyContent and empties dayAndTemp.
  weeklyContent.innerHTML = ``;
  dayAndTemp = [];

  // --------The api for daily temperatures----------
  const weatherCityToday = `https://api.openweathermap.org/data/2.5/weather?q=${city},Sweden&units=metric&APPID=6f4589c9a1ed485fe713e8f5159a6ff9`;
  // Fetch the JSON from the API and save the variables sunrise and sunset, description and main and makes the adjustment for timezones.
  fetch(weatherCityToday)
    .then((res) => res.json())
    .then((data) => {
      const timezoneOffset = new Date().getTimezoneOffset() * 60;
      const sunrise = data.sys.sunrise + data.timezone + timezoneOffset;
      const sunset = data.sys.sunset + data.timezone + timezoneOffset;
      let description = data.weather[0].description;
      const main = data.weather[0].main;

      // A function that converts epoch to ordinary time and then from milliseconds to seconds.
      const convert = (t) => {
        const dt = new Date(t * 1000);
        const hr = dt.getHours();
        const m = "0" + dt.getMinutes();
        return hr + ":" + m.substr(-2);
      };
      const sunriseTime = convert(sunrise);
      const sunsetTime = convert(sunset);

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

      // Conversion of the first letter in description to be a uppercase.
      description = description.charAt(0).toUpperCase() + description.slice(1);

      // Change the innerhtml with new content and use the values we picked up from the json.
      dailyContent.innerHTML = `
      <div class="main-daily-info">
       <div class="headings">
        <div><i class="fa-thin fa-bars" onClick="toggleMenu()"></i></div>
        <div class="menu" id="menu">
          <div class="menu-option" onClick="display('Gothenburg')">Gothenburg</div>
          <div class="menu-option" onClick="display('Kaktovik')">Kakotiv</div>
          <div class="menu-option" onClick="display('Sydney')">Sydney</div>
          <div class="menu-option" onClick="display('Brasil')">Brasil</div>
          <div class="menu-option" onClick="display('Tokyo')">Tokyo</div>
        </div>
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

      // Function that changes the background color depending on the temperature.
      if (data.main.temp < 5) {
        dailyContent.style.background =
          "linear-gradient(180deg, #828385 0%, #c0c0c2 100%)";
      } else if (data.main.temp > 5 && data.main.temp < 20) {
        dailyContent.style.background =
          "linear-gradient(180deg, rgba(114, 105, 255, 1) 0%, rgba(227, 227, 255, 1) 100%)";
      } else {
        dailyContent.style.background =
          "linear-gradient(180deg, #f3c673 0%, #fbd994 100%)";
      }
    })
    .catch((data) => {
      dailyContent.innerHTML = `
        <div class="error-content-daily">
          Sorry we cant fetch the API for the daily content for you at the moment, please try again
          later!
        </div>`;
    });
  // --------The api for weekly temperatures----------
  const weatherForecast5DaysCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city},Sweden&units=metric&APPID=6f4589c9a1ed485fe713e8f5159a6ff9`;

  // Fetch the JSON from the API for the five day weather forecast
  fetch(weatherForecast5DaysCity)
    .then((res) => res.json())
    .then((data) => {
      const myDates = [];

      // A function in which we forEach element in the list targets the dt_txt file and do a split between the date and the time.
      // We do a if statement to check if the variable myDates consist of the date[0] (since it is the first position).
      // If myDates doesnt contain the date that is looped and it is not todays date it gets added to the variabel myDates.
      data.list.forEach((element) => {
        const date = element.dt_txt.split(" ");

        if (
          !myDates.includes(date[0]) &&
          new Date(date[0]).toLocaleDateString() !==
            new Date().toLocaleDateString()
        ) {
          myDates.push(date[0]);
        }
      });

      // ForEach date in myDates we save all elements that contains that date and the time 12:00:00.
      // Due to slow information update in the api we also stop the code if weatherat12.lenght is equal to 0.
      myDates.forEach((element) => {
        const weatherAt12 = data.list.filter((e) =>
          e.dt_txt.includes(`${element} 12:00:00`)
        );

        if (weatherAt12.length === 0) {
          return;
        }

        const description = weatherAt12[0].weather[0].main;

        // Filter so we get all information for one day.
        const weatherDuringADay = data.list.filter((e) =>
          e.dt_txt.includes(element)
        );

        //We set the minTemp and the maxTemp to specified values.
        let minTemp = 80;
        let maxTemp = -80;

        // We do a comparison of the weather during the days to find the minTemp and maxTemp of each day.
        weatherDuringADay.forEach((e) => {
          if (e.main.temp_min < minTemp) {
            minTemp = Math.round(e.main.temp_min);
          } else if (e.main.temp_max > maxTemp) {
            maxTemp = Math.round(e.main.temp_max);
          }
        });

        // we call for the function getDayOfWeek and save it into a variable called dayOfWeek.
        const dayOfWeek = getDayOfWeek(element);

        // After this is done we push it up to an object were we say that day:element, dayOfWeek: dayOfWeek, tempMin: minTemp, tempMax:maxTemp, description: description.
        dayAndTemp.push({
          day: element,
          dayOfWeek: dayOfWeek,
          tempMin: minTemp,
          tempMax: maxTemp,
          description: description,
        });
      });

      // Conditional statements to show the icons for the weekly weather depending
      // on the weather registrered for the day in `main` (which we saved into a variable called description).
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
    })
    .catch((data) => {
      weeklyContent.innerHTML = `<div classname="error-content-weekly">
      Sorry we cant fetch the API for the weekly content for you at the moment, please try again
      later!
    </div>`;
    });
};

// Start the website.
getWeatherPrognose();
