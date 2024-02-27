/*Your task is to present some data on your web app. Start with:
- the city name
- the temperature (rounded to 1 decimal place)
- and what type of weather it is (the "description" in the JSON)*/

const container = document.getElementById('weather')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=bce383502bdab6bfcc1cdc83a8289f0a')
.then((response) =>{
    return (response.json())
})
.then((json)=> {
    const temperature = json.main.temp
    const weatherDescription = json.weather[0].description;
    container.innerHTML = 
    `<h1>The weather in ${json.name}, right now.</h1>
    <p>Temperature: ${json.main.temp} C<p>
    <p>Its looking like ${weatherDescription}`
   
    console.log(json);
})
 .catch((error) => {
    console.error(`Error fetching weather data`, error)
 })
