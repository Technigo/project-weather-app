const containerDiv = document.getElementById('astros')

fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5efe76b9dced790a8b8d34af9bba77d8&units=metric')
    .then((response) => {
        return response.json()
    })

    .then((json) =>{
        containerDiv.innerHTML = `<p>Hello from</p> <h1>${json.name}!</h1>`
        containerDivLeft.innerHTML = `<h1>${json.main.temp}°</h1>`
       
        json.weather.forEach((mainWeather) => {
            containerDivRight.innerHTML = `<h1>${mainWeather.main}</h1>`
        })
        
        containerDivSunrise.innerHTML = `<p>Sunrise: ${json.sys.sunrise}</p>`
        

        containerDivSunset.innerHTML = `<p>Sunset: ${json.sys.sunset}</p>`

    })

    
    let timeInMillisecond = 1571226737065
    let date = new Date(timeInMillisecond);