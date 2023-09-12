// Dom Section
const tempElement = document.getElementById("temp");


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

// headers
// const URLToAnotherAPI = "http"
// const options = { method: GET headers:{ ApiKey:"" ApiHost:""}, body: JSON.stringfy(data)}
// fetch(URLToAnotherAPI , options)

const updateHTML = (data) =>{
  console.log(data)
    console.log(data.name)
    console.log(data.main.temp)
    console.log(data.wind.speed)
    console.log(data.weather[0].description)
    tempElement.innerText = data.main.temp;


}

