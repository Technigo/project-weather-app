const container = document.getElementById('weather')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=bce383502bdab6bfcc1cdc83a8289f0a')
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
    `<h1>The weather in ${json.name}, right now.</h1>
    <p>Temperature: ${json.main.temp} C<p>
    <p>Its looking like ${weatherDescription}
    <p> Sunrise: ${formatTime(sunriseTime)}</p>
    <p> Sunset: ${formatTime(sunsetTime)}</p>`
    
   
    console.log(json);
})
 .catch((error) => {
    console.error(`Error fetching weather data`, error)
 })
