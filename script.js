const container = document.getElementById('weatherOne')

fetch('https://api.openweathermap.org/data/2.5/weather?q=sydney,&units=metric&APPID=156328eec9b7853e6ecd35c030202c4c') //Change to our weather API-key
    .then((response) => {
        console.log(response)
        return response.json()
    })
    .then((json) => { 
        const tempDecimal = json.main.temp.toFixed(1) //Change to (0) for no decimals
            container.innerHTML = `<p>${json.name} is the city</p>`
            container.innerHTML += `<p>${tempDecimal} °C is the temperature </p>`
            container.innerHTML += `<p>${json.weather[0].description} is the weather </p>`
    })
    /*
     Take a look at this, should the getElementById be here?
     container.innerHTML = `<h1>There are ${json.number} people in space right now</h1>`

     json.weather.forEach((person) => {
       container.innerHTML += `<p>${person.name} is on the ${person.craft}</p>`
     })
     */

/*
     json.name((weather) => {
        container.innerHTML += `<p>${json.name} is the name of the city</p>`
        console.log(json)*/