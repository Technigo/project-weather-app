fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f48cb7911f220b235e97074a198afa46')

    .then((Response) => {
        return Response.json()
    })
    .then((json) => {


        const temp = json.main.temp
        const temp1 = temp.toFixed(0.1)
        document.getElementById("temp").innerHTML += `${temp1}°C `

        document.getElementById("humidity").innerHTML += `humidity: ${json.main.humidity}%`

        const time1 = json.sys.sunrise
        const time2 = json.sys.sunset
        let sunrise = new Date(time1 * 1000)
        let sunset = new Date(time2 * 1000)
        sun.innerHTML += `<p id="sunrise">Sunrise: ${`${sunrise.getHours()}.00`}</p>`
        sun.innerHTML += `<p id ="sunset">Sunset: ${`${sunset.getHours()}:${sunset.getMinutes()}`}</p>`

        const id = json.weather[0].id
        if (id >= 200 && id <= 232) {
            weatherIcon.src = "assets/lighting.png"
            //lighting 
        } else if (id >= 300 && id <= 531) {
            weatherIcon.src = "assets/rain.png"
            //rain
        } else if (id >= 600 && id <= 622) {
            theImage.src = "assets/snow.png"
            //snow
        } else if (id >= 701 && id <= 781) {
            weatherIcon.src = "assets/fog.png"
            //Fog
        } else if (id === 800) {
            weatherIcon.src = "assets/sun.png"
            //sun
        } else if (id >= 801 && id <= 804) {
            weatherIcon.src = "assets/sunCloud.png"
            //partly cloudly 
        }
        const newDate = new Date(json.dt * 1000)
        const todayDate = newDate.toDateString()
        document.getElementById("date").innerHTML = `${todayDate}`

        const description = json.weather[0].description
        document.getElementById("description").innerHTML += `<h3>${description}</h3>`


    });

// 5 day forcast, stockholm

fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f48cb7911f220b235e97074a198afa46')
    .then((Response) => {
        return Response.json()

    })

    .then((json) => {

        //day 1 
        // Time interval One
        const hour1 = json.list[0].dt
        const time1 = new Date(hour1 * 1000).getHours()
        document.getElementById("hour1").innerHTML += `<p>${time1}.00</P>`
        document.getElementById("hour1").innerHTML += `<p class ="weatherDis">${json.list[0].weather[0].description}</p>`
        const minTempOne = json.list[0].main.temp_min
        const maxTempOne = json.list[0].main.temp_max
        const minTemp = minTempOne.toFixed(0.1)
        const maxTemp = maxTempOne.toFixed(0.1)
        document.getElementById("hour1").innerHTML += `<p>${minTemp} ° / ${maxTemp} °C</p>`



        //day 2
        const hour2 = json.list[1].dt
        const time2 = new Date(hour2 * 1000).getHours()
        document.getElementById("hour2").innerHTML += `<p>${time2}.00</p>`
        document.getElementById("hour2").innerHTML += `<p class ="weatherDis">${json.list[1].weather[0].description}</p>`
        const minTempTwo = json.list[1].main.temp_min
        const maxTempTwo = json.list[1].main.temp_max
        const minTemp2 = minTempTwo.toFixed(0.1)
        const maxTemp2 = maxTempTwo.toFixed(0.1)
        document.getElementById("hour2").innerHTML += `<p>${minTemp2} ° / ${maxTemp2} °C </p>`


        // //day 3
        const hour3 = json.list[2].dt
        const time3 = new Date(hour3 * 1000).getHours()
        document.getElementById("hour3").innerHTML += `<p>${time3}.00 </p>`
        document.getElementById("hour3").innerHTML += `<p class ="weatherDis">${json.list[2].weather[0].description} </p>`
        const minTempThree = json.list[2].main.temp_min
        const maxTempThree = json.list[2].main.temp_max
        const minTemp3 = minTempThree.toFixed(0.1)
        const maxTemp3 = maxTempThree.toFixed(0.1)
        document.getElementById("hour3").innerHTML += `<p>${minTemp3} ° / ${maxTemp3} °C </p>`
    })