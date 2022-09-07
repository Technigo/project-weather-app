

const container = document.getElementById('todaySummary')
const mainWeather = document.getElementById('mainWeather') 
const weeklyWeather = document.getElementById('weeklyForcastWrapper')
const dailyForcast = document.getElementById('dailyForcastRow')
const day = document.getElementById('day')
const temp = document.getElementById('temp')


fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=64d2a624607147029ae4574d21f5c6d9')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
      
        container.innerHTML = `<h1>The weather in ${data.name}</h1>` //Changed container to be able to style - OK???
        console.log(data)    

        //weather descpription and temperature with one decimal
        mainWeather.innerHTML += `<p>${data.weather[0].description} | ${data.main.temp.toFixed(1)} &#8451</p>` //&#8451 is the formal for celsius, changed conatiner to main

        //Sunrise
        const unixTimestampSunrise = data.sys.sunrise
        //To get sunrise/sunset time in hours:minutes:seconds
        let sunrise = new Date(unixTimestampSunrise * 1000)
        //Declare new variable to show only hh:mm
        let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: "short"})
        mainWeather.innerHTML += `<p>Sunrise: ${sunriseTime}</p>`;
        //Sunset
        const unixTimestampSunset = data.sys.sunset
        let sunset = new Date(unixTimestampSunset * 1000)
        let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: "short"})
        mainWeather.innerHTML += `<p>Sunset: ${sunsetTime}</p>`;

      })
        .catch((err) =>{ //ERROR function. We pass in a function as a parameter in the function, just like the then function.
        console.log(err)
    })




    

    //https://api.openweathermap.org/data/2.5/weather?lat={LAT}&lon={LON}&appid={API KEY}

    //https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=
    //Petras API :98b6cfababcb8aa6d64ecb9698b0bc9c
    //Charlottes API: 64d2a624607147029ae4574d21f5c6d9