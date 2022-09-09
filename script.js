const cityWeather = document.getElementById("weather-placeholder");
const cityTemp = document.getElementById("temp-placeholder");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const cityName = document.getElementById("city-placeholder");
const weeklyTemp = document.getElementById("weekly-temperature-placeholder");
const hero = document.getElementById("hero");
const todaysIcon = document.getElementById("todays-icon");
let selectedCity = document.querySelectorAll('.city-selection');

let weeklyWeather;
let dailyIcon;

selectedCity.forEach((option) => {
  option.addEventListener('change', (event) => {
    let location = event.target.options[event.target.selectedIndex].value

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?${location}&units=metric&APPID=8802f8b4b2d622931613aace44be57ae`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      cityName.innerHTML = json.city.name;
      cityTemp.innerHTML = `${json.list[0].main.temp.toFixed(1)} °C`;
      let theWeather = json.list[0].weather[0].description;
      cityWeather.innerHTML = json.list[0].weather[0].description;
      
      const sunriseStart = new Date(json.city.sunrise * 1000);
      const sunsetStart = new Date(json.city.sunset * 1000); 
      sunriseTime.innerHTML = `sunrise ${sunriseStart.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
      sunsetTime.innerHTML = `sunset ${sunsetStart.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;


      //Actual weather & background picture
      //clouds
      if (json.list[0].weather[0].main.includes("Clouds")) {
        hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/bg-cloud-sun.jpg')`;
        todaysIcon.innerHTML = 
          `<img src=\'images/Clouds.png'>`
      //rain
      } else if (json.list[0].weather[0].main.includes("Rain")) {
        hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/bg-rain.jpeg')`;
        todaysIcon.innerHTML = 
          `<img src=\'images/Rain.png'>`
      //clear
      } else if (json.list[0].weather[0].main.includes("Clear")) {
        hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/bg-clear.png')`;
        todaysIcon.innerHTML = 
          `<img src=\'images/Clear.png'>`
      //snow      
      } else if (json.list[0].weather[0].main.includes("Snow")) {
        hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/bg-snow.jpeg')`;
        todaysIcon.innerHTML = 
          `<img src=\'images/Snow.png'>`
      //other
      } else {
        hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/rain.jpeg')`;
        todaysIcon.innerHTML = 
          `<img src=\'images/cloud-sun-icon.png'>`
      }

      todaysIcon.innerHTML += `<h3>${theWeather} in ${json.city.name}</h3>`;
      weeklyWeather = json.list.filter((item) => item.dt_txt.includes("12:00"));
      console.log(weeklyWeather);
      weeklyTemp.innerHTML = '' //to reset value
      weeklyWeather = weeklyWeather.map((day) => {
          let date = new Date(day.dt * 1000);
          let nameOfDay = date.toLocaleDateString('en-Us', {weekday: 'long'});
          let dailyTemperature = day.main.temp.toFixed(1);
          dailyIcon = `<img src=\'images/${day.weather[0].main}.png'>`;
          return (
              weeklyTemp.innerHTML +=`
              <li>
                  <p>${nameOfDay}</p>
                  <p class="daily-icon">${dailyIcon}</p>
                  <p class="daily-temperature">${dailyTemperature}°C</p>
              </li>
        `)   
      })

    })

    .catch((error) => {
      console.log("caught error", error);
    });


  }) 
})