// const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b875a4e82ea7797a6ff76c50f02a0b8b'
let cityName = "Stockholm" 

const city = document.getElementById('city')


fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=b875a4e82ea7797a6ff76c50f02a0b8b`)
    .then((response) => {
        return response.json();
    }).then ((data) => {
        
        let cityTemp = data.main.temp.toFixed(1)
        let sunRise = new Date(data.sys.sunrise * 1000)

        const hourAndMinutes = (i) =>{
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        
        let hour = hourAndMinutes(sunRise.getHours())
        let minutes = hourAndMinutes(sunRise.getMinutes())
        console.log(hour, minutes)


        city.innerHTML += `<p> ${data.name}</p>`
        city.innerHTML += `<p> ${cityTemp}</p>`
        city.innerHTML += `<p> ${data.weather[0].description}</p>`
        // console.log(data.weather[0].description)
        city.innerHTML += `<p> ${sunRise}</p>`
        city.innerHTML += `<p>${hour}:${minutes}</p>`
        // console.log(sunRise[0])
        // console.log(sunRise.getHours())
        // console.log(sunRise.getMinutes())
        // console.log(hour, minutes)
        // console.log(hourAndMinutes(hour))
        // console.log(hourAndMinutes(minutes))
    })

    //city name
    //temprature (rounded 1 decimal)
    //type of weather
    
    //sunrise and sunset
    //time

    //forcast 5 days
