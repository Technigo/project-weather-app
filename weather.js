

const container = document.getElementById('weather') 
fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=461046c1b035d88b328cf5cc47778c02')
.then((response) => {
    return response.json()
})
//Present the data: the city name, the temperature (rounded to 1 decimal place), and what type of weather it is (the "description" in the JSON)
.then((json) => {
    console.log(json)
    container.innerHTML=`<p>City name:${json.name}</p>`
    container.innerHTML+=`<p>Temperature: ${json.main.temp.toFixed(1)}</p>`
    container.innerHTML+=`<p>Type of weather: ${json.weather[0].description}</p>`
})
.catch((err) => {
    console.log('Caught error: ${err}')
})