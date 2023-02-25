
//DOM-selectors
const today = document.getElementById("weatherToday");
const dailyTextMsg = document.getElementById("dailyText");
const dayFive = document.getElementById("fiveDays");
const bodySelector = document.getElementById("bodyStyle")
const form = document.getElementById("mainForm");
const cityInput = document.getElementById("citysearch");

//api key
const apiKey = "4f9ca5d3e70c95a041bc513ac8b31ff8"

//URLs for today and five-day forecast
let userCity = "Lisbon"; //Default city
const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=${apiKey}`;
const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&units=metric&appid=${apiKey}`

//This code fetches the data, turns it into json and passes it to other functions
fetch(cityURL)
  .then(response => response.json())
  .then(dataForecast => {
    currentTemp(dataForecast);      //functions for later use
    checkWeather(dataForecast);
  }) 
  .catch(error => console.error(error));


//Sunrise/sunset/weather today-function
const currentTemp = (dataForecast) => {
  //construction of time variables
  const sunriseTime = dataForecast.sys.sunrise;
  const sunsetTime = dataForecast.sys.sunset;
  const sunriseDate = new Date(sunriseTime * 1000);
  const hoursSunrise = sunriseDate.getHours() + ":" + sunriseDate.getMinutes();
  const sunsetDate = new Date(sunsetTime * 1000);
  const hoursSunset = sunsetDate.getHours() + ":" + sunsetDate.getMinutes()
  const sunriseTimeString =sunriseDate.toLocaleTimeString();
  const toDay = new Date (dataForecast.dt * 1000).toLocaleString('en-US', {weekday: 'long', timeZone: 'Europe/Lisbon'}); 
    
  today.innerHTML =`
    <h3>${toDay}</h3>
      <p>${dataForecast.weather[0].description} | ${Math.round(dataForecast.main.temp)}°C</p>

      <div>
        <p class="sunrises" id="sunrise"> 
        Sunrise ${hoursSunrise}</p>
      </div>
      <div>
        <p class="sunsets" id="sunset"> 
        Sunset ${hoursSunset}</p>
      </div>
      `
}

//Checks weather type (cloudy, clear, rainy) and returns background color and text message
const checkWeather = (dataForecast) => {
  if (dataForecast.weather[0].main === 'Clouds'){
    bodySelector.classList.remove(...bodySelector.classList);
    bodySelector.classList.add('cloudy');
    dailyTextMsg.innerHTML=`
      <div>
        <img src="/Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="">
        <p>It's cloudy in ${dataForecast.name} right now</p>
      </div>
      `
    }
    else if (dataForecast.weather[0].main === 'Clear'){
      bodySelector.classList.remove(...bodySelector.classList);
      bodySelector.classList.add('sunny');
      dailyTextMsg.innerHTML=`
        <div>
          <img src="/Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt=""> 
          <p>It's sunny in ${dataForecast.name} right now</p>
        </div>
      `
    } 
    else if (dataForecast.weather[0].main === 'Fog'){
      bodySelector.classList.remove(...bodySelector.classList);
      bodySelector.classList.add('foggy');
     dailyTextMsg.innerHTML=`
      <div>
        <img src="/Designs/Design-2/icons/icons8-fog-64.png" alt="fog">
        <p>It's foggy in ${dataForecast.name} right now</p>
      </div>`
    } 
    else {
      bodySelector.classList.remove(...bodySelector.classList);
      bodySelector.classList.add('rain');
     dailyTextMsg.innerHTML=`
     <div>
      <img src="/Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="">
      <p>It's raining in ${dataForecast.name} right now</p>
    </div>`
    };
};


fetch(fiveDayURL)
.then(response => response.json())
.then(fiveDayData => {
  ///includes  data from everyday at 12.00 hours 
  console.log(fiveDayData)
  fiveDayForecast(fiveDayData)
}) 

//Five day weather function
const fiveDayForecast = (fiveDayData) => {
//Every time function runs, old forecast is deleted
  dayFive.innerHTML = "";
  //returns forecast at 12:00
  const filteredData = fiveDayData.list.filter(data => data.dt_txt.includes('12:00:00'));
  //This part slices first five days
  const sliceData= filteredData.slice(0, 5);

  //function to show the data in html
  sliceData.forEach(data => {
    const day = new Date (data.dt_txt).toLocaleString('en-US', {weekday: 'short'});
    const temp = Math.round(data.main.temp);

    dayFive.innerHTML += `
    <div class= "border"> 
            <p class="day">${day}</p>
            <p class="temperature">${temp}°C</p>
            </div>
          `;
    })
};

//Eventlistener for searchbar
form.addEventListener("submit", (event) => {
  event.preventDefault();
  userCity = cityInput.value.trim(); 

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=6dc9ca16706cabb0c8c9d20011825ab1`)
    .then(response => response.json())
    .then(data => {
      checkWeather(data);
      currentTemp(data);
    })
    .catch(error => {
      console.error(error);
    });
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&units=metric&appid=6dc9ca16706cabb0c8c9d20011825ab1`)
    .then(response => response.json())
    .then(data => {
    fiveDayForecast(data); 
    })
    .catch(error => {
      console.error(error);
    });
});

