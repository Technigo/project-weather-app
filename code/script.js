//DOMs
const WEATHER_API = ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5000cd66a9090b2b62f53ce8a59ebd9e')

// const fiveDays = ('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=5000cd66a9090b2b62f53ce8a59ebd9e')

const weatherContainer = document.getElementById('weather-container')
const todaysWeather = document.getElementById('today')



fetch(WEATHER_API)
    .then((res) => res.json())
    .then((data) => {
        today.innerHTML += `
        <h1>${data.name}</h1>
        <h2>${Math.round(data.main.temp * 10) / 10} °C</h2>
        <h3>${data.weather.map(item => item.description)}</h3>
    `
    })
    .catch((error) => console.error('AAAAAAH!', error))
    .finally(() => console.log('YAY!'))

// const convertMiliSeconds = (time) => {
//     let sec = Math.floor((time / 1000) % 60);
//     let hrs = Math.floor(sec / (1000 * 60 * 60)) % 24;
//     sec -= hrs * 3600;
//     let min = Math.floor((sec / (1000 * 60)) % 60);
//     sec -= min * 60;

//     sec = '' + sec;
//     sec = ('00' + sec).substring(sec.length);

//     if (hrs > 0) {
//         min = '' + min;
//         min = ('00' + min).substring(min.length);
//         return hrs + ":" + min;

//     } else {
//         return min + ":";
//     }
// }

fetch(WEATHER_API)
    .then((res) => res.json())
    .then((data) => {
        console.log(convertMiliSeconds(data.sys.sunrise), "HELLO")
    })


//  <h3>${Date.setHours(data.sys.sunrise)}Sunrise:</h3>
//Variables to prevent choosing past dates.
//const currentDate = new Date()
//const formattedDate = currentDate.toISOString().split('T')[0]


function millisToMinutesAndSeconds(millis) {
    const hours = Math.floor(millis / 6000);
    const minutes = ((millis % 60000) / 1000).toFixed(0);
    return hours + ":" + (minutes < 10 ? '0' : '') + minutes;
}

