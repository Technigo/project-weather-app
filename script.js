const container = document.getElementById('card')

fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=14156af54d10ce159e1b521416adb87f")
    .then((response)=> {
        return response.json()
    })
    .then((json) => {
        console.log(json)

        // Convert Unix timestamps to date objects
        const sunrise = new Date(json.sys.sunrise * 1000);
        const sunset = new Date(json.sys.sunset * 1000);

        container.innerHTML = `
        <h1> ${json.name} </h1>
        <h2> ${(Math.round(json.main.temp))}°C</h2>
        <h3> ${json.weather[0].description}</h3>
        <h4> sunrise ${sunrise.toLocaleTimeString()} sunset ${sunset.toLocaleTimeString()}  </h4>
        `
    })


    