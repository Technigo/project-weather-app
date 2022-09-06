const cityName = document.getElementById('city')
const temperature = document.getElementById('temperature')


fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=07e49e158145921c4197d32487c9067e')
.then((response) => {
    return response.json()
})
.then((data) => {
    //console.log(data.weather[0].main) //array
    //console.log(data.main.temp_max) //object
    console.log(Math.round("3.1415"))
    cityName.innerHTML = data.name
    temperature.innerHTML = data.main.temp.toFixed(1)
});

//I did it like this: ${json.main.temp.toFixed(1)}, inside the innerHTML string.
