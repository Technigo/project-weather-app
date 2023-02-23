//Variables that point to selected DOM elements
const container = document.getElementById("loading")
const header = document.getElementById("header")
const body = document.body
const text = document.getElementById("#text")
const img = document.getElementById(".img")
const date = document.getElementById("date")

//Global variable
let todayWeather

//Fetching data from API
fetch('http://api.openweathermap.org/data/2.5/weather?q=Gothenburg,Sweden&units=metric&APPID=06edb4af2e0738583f1bc67674449140')
    .then ((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        container.innerHTML = `<h1>The weather in ${json.name} is ${json.timezone} today.</h1>`
        /*Change from timezone*/

        /*json.weather.array.forEach((zz) => {
            container.innerHTML += `<p>${} is in ${}</p>`
        });*/
    })

    
//Display weather.main, weather.description (type of weather) 
//Display main.temp (current temperature in city XX)
//Display sys.sunrise (time of sunrise)
//Display sys.sunset (time of sunset)

//Display img (type depending on weather)
//Display text (type depending on weather)

/*If weather === "clear", "sunny" ....
	show <p> "Get your sunnies on. ${json.city} is looking rather great today."</p>
	show img. "noun_Sunglasses..."

  else if weather === "rain",....
	show <p> "Don't forget your umbrella. It's wet in ${json.city} today."</p>
	show img. "noun_Umbrella..."

  else weather === "cloudy",...
      show <p> "Light a candle and get cosy. ${json.city} is looking grey today."</p>
	show img. "noun_Cloud...*/

//Five day forecast


//Add eventlisteners