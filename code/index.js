// Dom Section
const tempElement = document.getElementById("temp");
const daysForecast = document.querySelectorAll(".day");
const iconsForecast = document.querySelectorAll(".icon");




const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "64dc0a4bc655c3566178e4cae018559e";
const lat = "Stockholm";
const lon = "Sweden";
const URL = `${baseUrl}q=${lat},${lon}&units=metric&APPID=${apiKey}`




const fetchWeatherAsync = async () =>{
  const response = await fetch(URL).catch((err) => console.log("my ERROR" , err));
  const data = await response.json()
  console.log(data)
  updateHTML(data)
  
}
fetchWeatherAsync()

// forecast API

const baseAPIForecast = "https://api.openweathermap.org/data/2.5/forecast?";
const URLForecast = `${baseAPIForecast}q=${lat},${lon}&units=metric&APPID=${apiKey}`

// date
const daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date();

const nextFiveDAys = [];

for (let index = 1; index < 6; index++) {
  const date = new Date(today);
  
  date.setDate(today.getDate() + index);
  const dayName = daysName[date.getDay()];
  nextFiveDAys.push(dayName)
  
}
console.log(nextFiveDAys)
daysForecast.forEach((dayForc , index)=>{
  dayForc.innerHTML = nextFiveDAys[index]
})
// fetch forecast

const fetchForecastAsync = async () =>{
  const responseForecast = await fetch(URLForecast).catch((err)=> console.log("ERROR" , err));
  const data = await responseForecast.json();
  console.log(data)

  iconsForecast.forEach((icon , index)=>{
    const iconNum = data.list[index].weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconNum}@2x.png`
    
  })
  
  
 
}
fetchForecastAsync()

const updateHTML = (data) =>{
 
    console.log(data.name)
    console.log(data.main.temp)
    console.log(data.wind.speed)
    console.log(data.weather[0].description)
    tempElement.innerText = data.main.temp;


}

