//Variables that point to selected DOM elements
const container = document.getElementById('weather')


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

//Add a promise?    
    
//Display weather.main, weather.description (type of weather) 
//Display main.temp (current temperature in city XX)
//Display sys.sunrise (time of sunrise)
//Display sys.sunset (time of sunset)

//Display img (type depending on weather)
//Display text (type depending on weather)

//Five day forecast


//Add eventlisteners