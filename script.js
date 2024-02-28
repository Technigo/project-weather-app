const container = document.getElementById('weather')
const latitude = 59.3326
const longitude = 18.0649
const suffix= ""

fetch(`https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=bce383502bdab6bfcc1cdc83a8289f0a`)
.then((response) =>{
    return (response.json())
})
.then((json)=> {
    const temperature = json.main.temp
    const weatherDescription = json.weather[0].description

    const sunriseTime = new Date(json.sys.sunrise * 1000)
    const sunsetTime = new Date (json.sys.sunset * 1000) 
    const formatTime = (time) =>{
        return time.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    }
    container.innerHTML = 
    `<p> ${json.name} city</p>
    <p>Temperature: ${json.main.temp} C<p>
    <h1 class="multiline-text">We are seeing ${weatherDescription} over ${json.name} today.</h1>
    <p> Sunrise: ${formatTime(sunriseTime)}</p>
    <p> Sunset: ${formatTime(sunsetTime)}</p>`
    
   
    console.log(json);
})
 .catch((error) => {
    console.error(`Error fetching weather data`, error)
 })

 const getForecast = async (latitude, longitude) => {
    try{
        const response = await fetch (`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=bce383502bdab6bfcc1cdc83a8289f0a`)
        const data = await response.json()
        const forecastArray =[...data.list]
        const filteredArray = forecastArray.filter((day)=>{
            return day.dt_txt.toLowerCase("12.00.00")
        })
        filteredArray.forEach((day, index)=>{
            if (index <4){
                let timestamp = day.dt;
                let date = new Date(timestamp * 1000)
                let dayOfTheWeek = date.toLocaleDateString("en-US", {weekday: "short"})
                document.querySelector ('.forecast__container').innerHTML +=`
                <div class= "forecast__singel-day-flex">
                <p class="forecast__day">${dayOfTheWeek} - ${parseInt(day.main.temp)}°C ${day.wind.speed} </p>
                <p class="forecast__temp"></p>
                <p class="forecast__speed"></p></div>`
            } else return
        })
    }catch (error){
        console.log ("error occured", error)
    }
 }
document.addEventListener('DOMContentLoaded', () => {
    getForecast();
});

