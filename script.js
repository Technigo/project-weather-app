const testy = document.getElementById('testy');
const weatherForecast = document.getElementById('weatherForecast')
const forecastWeekdays = document.getElementById('forecastWeekdays')
const forecastDescription = document.getElementById('forecastDescription')
const forecastTemp = document.getElementById('forecastTemp')
const forecastFeelsLike = document.getElementById('forecastFeelsLike')



fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=c480de5f69ca98d1993a4dae3213642e')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(`json:`, json)

        let round = Math.round(json.main.temp * 10 ) / 10;
        console.log(round)

        console.log(json.weather[0].description)
        
        testy.innerHTML = `<p>City: ${json.name}</p>`;
        testy.innerHTML += `<p>Temperature: ${round} °C</p>`;
        testy.innerHTML += `<p>Weather: ${json.weather[0].description}</p>`;
    })
    .catch((err) => {
        console.log(`error caught:`, err)
    })


const weatherForecastData = () => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=c480de5f69ca98d1993a4dae3213642e')
        .then((forecastResponse) => {
            return forecastResponse.json();
        })
        .then((result) => {
            const todaysDate = new Date().toString().split(' ')[0]; //Todays date ine text form
            console.log(todaysDate)
            
            const filterData = result.list.filter(weatherDay => weatherDay.dt_txt.includes('12:00')); //Filters out the data at 12:00 every day
            console.log(filterData)
            
            filterData.forEach(date => { 
            const weekDay = new Date(date.dt * 1000).toString().split(' ')[0]; //All the five days dates' convertet from numbers to text
                if (weekDay !== todaysDate) {
                    forecastWeekdays.innerHTML += `<p>${weekDay}</p>`
                    forecastDescription.innerHTML += `<p>${date.weather[0].description}</p>`
                    forecastTemp.innerHTML += `<p>${date.main.temp.toFixed(0)}°</p>`
                    forecastFeelsLike.innerHTML += `<p>${date.main.feels_like.toFixed(0)}°</p>`
                }
            }); 
        })
}

weatherForecastData();
 


