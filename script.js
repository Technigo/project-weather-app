
let sunriseUp = document.getElementById(`currentSunrise`)
let sunsetDown = document.getElementById(`currentSunset`)

const Weather = document.getElementById(`currentWeather`)






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
    }).catch((error) => {
        // console.log(error);
        // throw error;
    })