

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
      
        mainWeather.innerHTML = `<h1>Todays temperature in ${data.name} is ${data.main.temp} and it's ${data.weather[0].description} today. Sunrise ${data.sys.sunrise}</h1>`
        console.log(data)    
      })
    .catch((err) =>{ //ERROR function. We pass in a function as a parameter in the function, just like the then function.
      console.log(err)
    })

    //the city name
    //the temperature (rounded to 1 decimal place)
    //and what type of weather it is (the "description" in the JSON)




    

    //https://api.openweathermap.org/data/2.5/weather?lat={LAT}&lon={LON}&appid={API KEY}

    //https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=
    //Petras API :98b6cfababcb8aa6d64ecb9698b0bc9c
    //Charlottes API: 64d2a624607147029ae4574d21f5c6d9