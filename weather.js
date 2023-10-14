let city = "Knivsta"

let url ="https://api.openweathermap.org/data/2.5/weather?q=city,Sweden&units=metric&APPID=f40f4543214ad55ead8d6ca12cb39ee0"
let newUrl = new URL(url)
console.log(newUrl)
newUrl = newUrl.searchParams.set("q", city);
let urlForecast ="https://api.openweathermap.org/data/2.5/forecast?q=city,Sweden&units=metric&APPID=f40f4543214ad55ead8d6ca12cb39ee0"
const body = document.getElementById("body")
const sunrise = document.getElementById("sunrise")
const sunset = document.getElementById("sunset")
const weatherDescription = document.getElementById("weatherUpdate")
const todaysWeather = document.getElementById("dayDescription")
const todaysTemperature = document.getElementById("dayTemperature")

const mon = [].slice.call(document.querySelectorAll(".mon"),2)
const weekday = ["sun","mon","tue","wed","thu","fri","sat"];

const pickTodaysDescription = (todaysDescription) => {
  body.classList.remove(...body.classList)
  if
  (todaysDescription === "Clear") {
    body.classList.add("suns-out")
    weatherDescription.innerHTML = `Get your sunnies on. ${city} is looking rather great today.`
  } 
   else if  (todaysDescription === "Clouds") {
    body.classList.add("cloudy")
    weatherDescription.innerHTML = `Time to light a fire and get cosy. ${city} is looking grey today.`
  }
  else if (todaysDescription === "Rain" || todaysDescription === "Thunderstorm" || todaysDescription === "Drizzle" || todaysDescription === "Snow") {
    body.classList.add("rainy")
    weatherDescription.innerHTML = `It's wet in ${city} today. Don't forget your umbrella.`
  } else {
    body.classList.add("unknown")
    weatherDescription.innerHTML = `We don't know what's gonna be like, but be careful in ${city}!`
  }
}

const setTemperature = (fiveDays) => {
    for (let index = 5; index < mon.length; index++) {
        mon[index].innerHTML = Math.round(fiveDays[index - 5].main.temp) + "°";
    }
}

const setDayName = (fiveDays) => {
    for (let index = 0; index < 5; index++) {
        const date = new Date(fiveDays[index].dt * 1000);
        mon[index].innerHTML = weekday[date.getDay()];
    }
}
const fetchWeather =  async () => {
    try{
      const response = await fetch(urlForecast);
      const data = await response.json();
      const fiveDays = data.list.filter(d =>  {
        const date = new Date(d.dt * 1000);
        let time = 11;
        let dtTime = date.getHours();
        return time === dtTime;
        });

    setDayName(fiveDays); 
    console.log(fiveDays)   
    setTemperature(fiveDays);

    }catch(error) {
        console.error(error);
    }
};

const changeCity = () => {
city = document.getElementById("city").value;
urlForecast = new URL(urlForecast);
urlForecast.searchParams.set("q", city);
fetchWeather()
}

const fetchSunriseSunset =  async () => {
  try{
    const todaysResponse = await fetch(url);
    const todaysData = await todaysResponse.json();
    todaysWeather.innerHTML = todaysData.weather[0].description
    sunrise.innerHTML = new Date(todaysData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    sunset.innerHTML = new Date(todaysData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    pickTodaysDescription(todaysData.weather[0].main)
  }
  catch(error) {
  console.log(error)
  }
};

fetchWeather()
fetchSunriseSunset()

