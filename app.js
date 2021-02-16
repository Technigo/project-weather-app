// Global variables
const API_KEY = '4b089f476bd9961f1c727a0625472b1f'
// let city = “Stockholm”;
const weather = document.getElementById('weather');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const city = document.getElementById('city');
const fiveDaysForecast = document.getElementById('5-days-forecast');

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        const sunriseTime = new Date(json.sys.sunrise * 1000);
        const sunsetTime = new Date(json.sys.sunset * 1000);
        const sunriseReadableTime = sunriseTime.toLocaleTimeString([], { timeStyle: 'short'})
        const sunsetReadableTime = sunsetTime.toLocaleTimeString([], { timeStyle: 'short'})

        console.log(json);
        city.innerHTML = `${json.name}`;
        weather.innerHTML = `${json.weather[0].main} | ${Math.floor(json.main.temp)}°C`;
        sunrise.innerHTML = `Sun Up: ${sunriseReadableTime}`;
        sunset.innerHTML = ` Sun Down: ${sunsetReadableTime}`;
    })

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)

            

.then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json)
        console.log(json.list[0].main)
        console.log(json.list.filter(item => item.dt_txt.includes('12:00')))
;
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));
        
        // let d = new Date();
        // let weekday = new Array(7);
        // weekday[0] = "Sunday";
        // weekday[1] = "Monday";
        // weekday[2] = "Tuesday";
        // weekday[3] = "Wednesday";
        // weekday[4] = "Thursday";
        // weekday[5] = "Friday";
        // weekday[6] = "Saturday";

        // let n = weekday[d.getDay()];

        filteredForecast.forEach((item) => {
            const weekDays = new Date(item.dt_txt);
            const day = weekDays.getDay();
            console.log(`Hello ${day}`);

            // console.log(weekDay)
            console.log(item.main.temp);
            //fiveDaysForecast.innerHTML += `${item.main.temp}`;

            // fiveDaysForecast.innerHTML += `<section class="5-days-forecast"`;
            fiveDaysForecast.innerHTML += `<p>${item.main.temp}, ${item.dt_txt}</p>`;
            // fiveDaysForecast.innerHTML += `</section>`;
        });


        //day1.innerHTML = filteredForecast.forEach((item) => {
          //  console.log(item.main.temp);
       // });

        

    })