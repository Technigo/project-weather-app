const region = document.getElementById('region')


fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=fb125bc213d8ee5c4a432b3a2b24aecf")
    .then((response) => {
        return response.json()
    })

    .then((json) => {
        console.log(json)
        region.innerHTML = `
        <h1> ${json.name} </h1>
        <p>Temperature ${(json.main.temp).toFixed(1)}, feels like ${json.main.feels_like.toFixed(1)}, min temperature ${json.main.temp_min.toFixed(1)}, max temperature ${json.main.temp_max.toFixed(1)} </p>
        `
        console.log(json.name)
    })

    

//- the city name OK
// - the temperature (rounded to 1 decimal place)
// - and what type of weather it is (the "description" in the JSON)