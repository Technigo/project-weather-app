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
navigator.geolocation.getCurrentPosition(position => {
fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=06edb4af2e0738583f1bc67674449140`)
    .then ((response) => {
        if(!response.ok) {
            throw Error("Weather data is not available right now.")
        }
        return response.json()
    })
    .then(data => {
        getWeather(data)
        //container.innerHTML = `<h1>Light a candle and get cosy. ${json.name} is looking grey today.</h1>`
        filterWeather(data)
        
    })
.catch(err => console.error(err))
})

const getWeather = (data) => {

    todayWeather = data.list[0].weather[0].main 

    const todayTemp = data.list[0].main.temp 
    /*new Date() constructor:

    When called as a constructor, returns a new Date object.
    Link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    */
    const getSunRise = new Date ((data.city.sunrise + data.city.timezone + new Date().getTimezoneOffset()*60) * 1000)

    const getSunSet = new Date ((data.city.sunset + data.city.timezone + new Date().getTimezoneOffset()*60) * 1000)

    header.innerHTML = `
    <p>${todayWeather} | ${Math.round(todayTemp , 1)}°</p>
    <p> Sunrise ${getSunRise.getHours()}.${getSunRise.getMinutes()}</p>
    <p> Sunset ${getSunSet.getHours()}.${getSunSet.getMinutes()}</p>
    `
    //Five day forecast
    const filteredForecast = data.list.filter(item => item.dt_txt.includes('09:00'))
    //dt is time of data calculation
    
    filteredForecast.forEach((day) => {
        const weekDay = new Date(day.dt * 1000).toLocaleDateString('en', {weekday: 'short'})
        //'en' stands for english here
        const mainTemp = day.main.temp.toFixed(1)
        //Number.toFixed() Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
        date.innerHTML += `
        <li>
            <span>${weekDay}</span>
            <span>${mainTemp}</span>
        </li>
        `
        //Link: https://www.w3schools.com/tags/tag_span.asp
    })
}


/*json.weather.array.forEach((zz) => {
        container.innerHTML += `<p>${} is in ${}</p>`
    });*/


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




