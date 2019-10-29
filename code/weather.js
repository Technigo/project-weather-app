// city, temp, humidiy
fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f48cb7911f220b235e97074a198afa46')

    .then((Response) => {
        return Response.json()
    })
console.log(json)
    .then((json) => {
        header.innerHTML = `<h1> ${json.name} weather right now is </h1>`
        const temp = json.main.temp
        const temp1 = temp.toFixed(0.1)
        weather.innerHTML += `<p>Temperature: ${temp1} °C</p>`
        weather.innerHTML += `${json.weather[0].description}`
        weather.innerHTML += `<p>humidity:${json.main.humidity}%`

        const time1 = json.sys.sunrise
        const time2 = json.sys.sunset
        let sunrise = new Date(time1 * 1000)
        let sunset = new Date(time2 * 1000)
        sun.innerHTML += `<p>Sunrise: ${`${sunrise.getHours()}:${sunrise.getMinutes()}`}</p>`
        sun.innerHTML += `<p>Sunset: ${`${sunset.getHours()}:${sunset.getMinutes()}`}</p>`
    });

// 5 day forcast, stockholm

fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f48cb7911f220b235e97074a198afa46')
    .then((Response) => {
        return Response.json()

    })

    .then((json) => {
        forcast.innerHTML = `<h2> 3 day forcast</h2>`

        //day 1 
        const weekday = json.list[1].dt
        let newWeekday = new Date(weekday)
        let day = newWeekday.getDay()

        day1.innerHTML += `<h2>${day}</h2>`
        day1.innerHTML += `<h3>${json.list[1].weather.description}</h3>`
        day1.innerHTML += `<h3>Tempature min: ${json.list[6].main.temp_min} <br> Temp max: ${json.list[7].main.temp_max} </h3`
        //day 2
        day2.innerHTML += `<h3></h3>`
        day2.innerHTML += `<h3></h3>`

        //day 3

    })