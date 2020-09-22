//Todays weather api
const apiLysekilToday = "https://api.openweathermap.org/data/2.5/weather?q=Lysekil,Sweden&units=metric&APPID=de78a234a90e490fde95f979d2491105";
console.log(apiLysekilToday);

//Forecast api
  const apiLysekilForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Lysekil&appid=de78a234a90e490fde95f979d2491105";
  console.log(apiLysekilForecast);
 
//Todays weather api  
fetch(apiLysekilToday).then((response) => {
    return response.json()
}).then((json) => {
    console.log(json)
    todaysLysekil.innerHTML = `<h2>In ${json.name} there are ${json.main.temp}° and ${json.weather[0].description} today.</h2>`;
let sunrise = (new Date(json.sys.sunrise * 1000).toLocaleTimeString("en-US", {timeStyle: "short"}));
let sunset = (new Date(json.sys.sunset * 1000).toLocaleString("en-US", {timeStyle: "short"}));
daytime.innerHTML = `Sunset ${sunrise} Sunset ${sunset}`;
})

//Forecast api
  fetch(apiLysekilForecast).then((response) => {
    return response.json()
})
    .then((forecast) => {
    console.log(forecast)
    const filteredForecast = forecast.list.filter (item => item.dt_txt.includes('12:00'))
    
    console.log(filteredForecast)
    filteredForecast.forEach(item => {
        let temperature = (item.main.temp - 273.15).toFixed(1);
        var icon = item.weather[0].id;
        let weekday = (new Date(item.dt * 1000)).toLocaleDateString("en-US", {weekday: "short"})

        //let figure = weatherImage(icon);
        forecastLysekil.innerHTML += `<p>${weekday} ${temperature}&#8451;</p>`;
    });
}) 



