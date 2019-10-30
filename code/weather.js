// city, temp, humidiy
fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f48cb7911f220b235e97074a198afa46')

    .then((Response) => {
        return Response.json()
    })
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
        sun.innerHTML += `<p>Sunrise: ${`${sunrise.getHours()}.00`}</p>`
        sun.innerHTML += `<p>Sunset: ${`${sunset.getHours()}:${sunset.getMinutes()}`}</p>`
    });

// 5 day forcast, stockholm

fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f48cb7911f220b235e97074a198afa46')
    .then((Response) => {
        return Response.json()

    })

    .then((json) => {
        forcast.innerHTML = `<h2> Hourly forcast</h2>`

        //day 1 
        // Time interval One
        const hour1 = json.list[0].dt
        const time1 = new Date(hour1 * 1000).getHours()
        document.getElementById("hour1").innerHTML += `<p>${time1}.00</P>`
        document.getElementById("hour1").innerHTML += `<p>${json.list[0].weather[0].description}</p>`
        const minTempOne = json.list[0].main.temp_min
        const maxTempOne = json.list[0].main.temp_max
        const minTemp = minTempOne.toFixed(0.1)
        const maxTemp = maxTempOne.toFixed(0.1)
        document.getElementById("hour1").innerHTML += `<p>${minTemp} ° / ${maxTemp} °C</p>`


        //day 2
        const hour2 = json.list[1].dt
        const time2 = new Date(hour2 * 1000).getHours()
        document.getElementById("hour2").innerHTML += `<p>${time2}.00</p>`
        document.getElementById("hour2").innerHTML += `<p>${json.list[1].weather[0].description}</p>`
        const minTempTwo = json.list[1].main.temp_min
        const maxTempTwo = json.list[1].main.temp_max
        const minTemp2 = minTempTwo.toFixed(0.1)
        const maxTemp2 = maxTempTwo.toFixed(0.1)
        document.getElementById("hour2").innerHTML += `<p>${minTemp2} ° / ${maxTemp2} °C </p>`


        // //day 3
        const hour3 = json.list[2].dt
        const time3 = new Date(hour3 * 1000).getHours()
        document.getElementById("hour3").innerHTML += `<p>${time3}.00 </p>`
        document.getElementById("hour3").innerHTML += `<p>${json.list[2].weather[0].description} </p>`
        const minTempThree = json.list[2].main.temp_min
        const maxTempThree = json.list[2].main.temp_max
        const minTemp3 = minTempThree.toFixed(0.1)
        const maxTemp3 = maxTempThree.toFixed(0.1)
        document.getElementById("hour3").innerHTML += `<p>${minTemp3} ° / ${maxTemp3} °C </p>`
    })