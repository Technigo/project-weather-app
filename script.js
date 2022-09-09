//DOM selectors
const body = document.getElementById('body');
const header = document.getElementById('header');
const currentWeather = document.getElementById('currentWeather');
const temperature = document.getElementById('temperature');
const city = document.getElementById('city');
const clearOrClody = document.getElementById('clearOrCloudy');
const weatherWeek = document.getElementById('weatherWeek');
const weekday = document.getElementById('weekday');
/*const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');*/
const containerSunrise = document.getElementById("sunrise")
const containerSunset = document.getElementById("sunset")



fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=455f64f6a8511735296b1b7919c56f46')
    .then((response) => {
        return response.json()
    
    })
    .then ((json) => {
        console.log(json)
        city.innerHTML += json.name  
    })

    .then((json) => {
        console.log(json)
        
    })
    .catch((err) => {
        console.log('caught error', err)
    })

    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=455f64f6a8511735296b1b7919c56f46')
    .then((response) => {
        return response.json()
    })
    .then ((json) => {
        console.log(json)
       
        let sunrise = json.sys.sunrise;
        let sunriseDate = new Date(sunrise*1000);

        containerSunrise.innerHTML = `<h2> Sunrise: ${sunriseDate} </h2>`
    
        let sunset = json.sys.sunset;
        let sunsetDate = new Date(sunset*1000);

        containerSunset.innerHTML = `<h2> Sunset:${sunsetDate} </h2>`

      
    })
    
    