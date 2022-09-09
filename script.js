const cityWeather = document.getElementById("weather-placeholder");
const cityTemp = document.getElementById("temp-placeholder");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const cityName = document.getElementById("city-placeholder");
const weeklyTemp = document.getElementById("weekly-temperature-placeholder");
const hero = document.getElementById("hero");
const todaysIcon = document.getElementById("todays-icon");


let weeklyWeather;
let dailyIcon;

fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae"
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    cityName.innerHTML = json.city.name;
    cityTemp.innerHTML = `${json.list[0].main.temp.toFixed(1)} °C`;
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
        `<img src=\'images/Clouds.png'>
        <h3>It is rather gray today in ${json.city.name}.</h3>`;
    //rain
    } else if (json.list[0].weather[0].main.includes("Rain")) {
      hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/bg-rain.jpeg')`;
      todaysIcon.innerHTML = 
        `<img src=\'images/Rain.png'>
        <h3>Don't forget you umbrella. It's raining in ${json.city.name}.</h3>`;
    //clear
    } else if (json.list[0].weather[0].main.includes("Clear")) {
      hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/bg-clear.png')`;
      todaysIcon.innerHTML = 
        `<img src=\'images/Clear.png'>
        <h3>The sky is clear in ${json.city.name} today.</h3>`;
    //snow      
    } else if (json.list[0].weather[0].main.includes("Snow")) {
      hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/bg-snow.jpeg')`;
      todaysIcon.innerHTML = 
        `<img src=\'images/Snow.png'>
        <h3>It is snowing in ${json.city.name}.</h3>`;
    //other
    } else {
      hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('images/rain.jpeg')`;
      todaysIcon.innerHTML = 
        `<img src=\'images/cloud-sun-icon.png'>
        <h3>It is a cloudy ${json.city.name} now.</h3>`;
    }

    weeklyWeather = json.list.filter((item) => item.dt_txt.includes("12:00"));
    console.log(weeklyWeather);
/*     weeklyWeather = weeklyWeather.map((day) => {
      let date = new Date(day.dt * 1000);
      let nameOfDay = date.toLocaleDateString("en-Us", { weekday: "long" });
      let dailyTemperature = day.main.temp.toFixed(1);

      if (day.weather[0].main.includes("Clouds")) {
        dailyIcon = `<img src=\'images/icon-cloud.png'>`;
      } else if (day.weather[0].main.includes("Rain")) {
        dailyIcon = `<img src=\'images/icon-rain.png'>`;
      } else if (day.weather[0].main.includes("Clear")) {
        dailyIcon = `<img src=\'images/icon-sun.png'>`;
      } else if (day.weather[0].main.includes("Snow")) {
      } else {
        dailyIcon = `<img src=\'images/icon-snow.png'>`;
      }

      console.log(weeklyTemp);
      return (weeklyTemp.innerHTML += `
           <li>
           <span>${nameOfDay}</span>
           <span>${dailyIcon}</span>
           <span>${dailyTemperature}°C</span>
           </li>
           `);
    }); */
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


