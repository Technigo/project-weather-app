
const container = document.getElementById('city')
const fiveDays = document.getElementById('weeklyDays')
const text = document.getElementById('warmCold')
const mainSearchbar = document.getElementById ('main-searchbar')
let sunriseUp = document.getElementById(`currentSunrise`)
let sunsetDown = document.getElementById(`currentSunset`)
const Weather = document.getElementById(`currentWeather`)


//Array of days
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

//fetch today weather
//fetch today weather
fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=021625534abeaac2039ba88d0c89b1ce')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        // container.innerHTML = `<h1>${json.name}</h1>`
        console.log(json)
        json.weather.map((type) => {
            container.innerHTML += `<div class="todayForecast">
            <p>${type.description} | ${json.main.temp.toFixed(0)}<sup>°</sup></p>
            </div>`
            // Warm/Cold Style
            console.log((type.main === "Clear"))
            // type.main = "Rainy"
            if (type.main === "Clear") {

                text.innerHTML +=
                    `<div class= "Clear">
                <img class= "sunny" src="./Designs/Design-2/icons/noun_Sunglasses_2055147.svg"/>
                <p> Get your sunnies on. Stockholm is looking rather great today.</p>
                </div>`
                document.body.style.backgroundColor = "#F7E9B9";
                document.body.style.color = "#2A5510";

            } else if (type.main === "Clouds") {
                text.innerHTML +=
                    `<div class= "Clouds">
                <img class= "cloud" src="./Designs/Design-2/icons/noun_Cloud_1188486.svg"/>
                <p> Light a fire and get cozy. Stockholm is grey today.</p>
                </div>`
                document.body.style.backgroundColor = "#f4f7f8";
                document.body.style.color = "#f47775";
            } else {
                text.innerHTML +=
                    `<div class= "Rainy">
                <img class= "umbrella"src="./Designs/Design-2/icons/noun_Umbrella_2030530.svg"/>
                <p> Don't forget your umbrella. It's wet in Stockholm today.</p>
                </div>`
                document.body.style.backgroundColor = "A3DEF7";
                document.body.style.color = "#164A68"
            }
        })
    })



//fetch 5 days weather

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=021625534abeaac2039ba88d0c89b1ce')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(JSON.stringify(json));
        if (json?.city?.sunrise && json?.city?.sunset) {
            let sunrise = new Date(json.city.sunrise * 1000); // converts unix timestamp to milliseconds
            let sunset = new Date(json.city.sunset * 1000); // converts unix timestamp to milliseconds
            sunrise = sunrise.toLocaleString("en-SE", { hour: "numeric", minute: "numeric" }); // displays HH:MM in the correct timezone
            sunset = sunset.toLocaleString("en-SE", { hour: "numeric", minute: "numeric"}); // displays HH:MM in the correct timezone
            // console.log(sunrise);
            // console.log(sunset);
            sunriseUp.innerHTML = `<p> Sunrise: ${sunrise} </p>`
            sunsetDown.innerHTML = `<p> Sunrise: ${sunset} </p>`

        }
        
        const filteredForecast = json.list.filter(Days => Days.dt_txt.includes('12:00'))
        filteredForecast.map((Days) => {
            let d = new Date(Days.dt_txt);
            let dayName = week[d.getDay()];
            fiveDays.innerHTML +=
                `<div class="weeky">
              <div class="days">
            <p>${dayName}</p>
            </div>
            <div class="temperature">
            <p>${Days.main.temp.toFixed(0)}<sup>°</sup></p>
            </div>
            </div>`
        })
    }).catch((error) => {
        console.log(error);
        throw error;
    })



// fetch the data from the API. Then if you console.log the json
// you'll see that we only care about the array called list.


// filteredForecast is now an array with only the data from 12:00 each day.
