
const weatherStockholm = "https://api.openweathermap.org/data/2.5/weather?q=stockholm&units=metric&appid=e74df95bd073adf9306ac7f46ad51144";
const forecastStockholm = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=e74df95bd073adf9306ac7f46ad51144";

const weather = document.getElementById("weatherToday");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const sun = document.getElementById("sun");
const forecast = document.getElementById("forecast");
const minMaxTemp = document.getElementById("minMaxTemp");
const forecastTemp = document.getElementById("forecastTemp");


    

const weekdays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];



const weatherToday = () => {

fetch(weatherStockholm)
.then((response) => {
    return response.json();
})
.then((json) => {
    console.log(json);
    
    const sunRise = json.sys.sunrise
    const sunSet = json.sys.sunset
    let sunrise = new Date(sunRise * 1000)
    let sunset = new Date(sunSet * 1000)

    city.innerHTML = json.name;
  temp.innerHTML = json.main.temp.toFixed(1);
    description.innerHTML = json.weather.map((a) => a.description);
    

    sun.innerHTML += `<p id="sunrise">Sunrise ${`${sunrise.getHours()}:${sunrise.getMinutes()}`}</p>`;
    sun.innerHTML += `<p id ="sunset">Sunset ${`${sunset.getHours()}:${sunset.getMinutes()}`}</p>`;

    const newDate = new Date(json.dt * 1000)
    const todaysDate = newDate.toDateString()
    document.getElementById("date").innerHTML = `${todaysDate}`;

    
    
    
});
}
weatherToday();


fetch(forecastStockholm)
  .then((response) => {
     return response.json();
 })
 .then((weatherForecast) => {
     console.log(weatherForecast);

     

     let dayArray = []
    weatherForecast.list.forEach(day => {
      let date = new Date(day.dt_txt);
      if (date.getHours() == "12") {
        dayArray.push(day)
      }
      
    })

    displayDays(dayArray)
 })

     const displayDays = (dayArray) => {
      const weekdaysDiv = document.getElementById("weekdays");
      for (i = 1; i < dayArray.length; i++) {
        console.log(dayArray[i])
        let currentDate = new Date(dayArray[i].dt_txt) 
        let currentDay = currentDate.getDay()
        console.log(currentDay)
        weekdaysDiv.innerHTML += `<div class="week_days"> 
                                    <div>${weekdays[currentDay]}</div>
                                    <div>${(getNumber(dayArray[i].main.temp))}&deg;C </div>
                                   <img src="https://openweathermap.org/img/wn/${dayArray[i].weather[0].icon}.png">
                                  </div>`
                                  
      }
    }

 const getNumber = (theNumber) => {
    if (theNumber > 0) {
      return theNumber;
    } else {
      return theNumber.toString();
    }
  }

    
