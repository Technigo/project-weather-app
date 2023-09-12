const city = document.getElementById('city')
const temp = document.getElementById('temp')
const weatherType = document.getElementById('weather-type')
const mainWeatherSection = document.getElementById('main-weather')
const sunSection = document.getElementById('sun')
const forecastSection = document.getElementById('forecast')


fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=bc487ba1fa4b42fcfb85443237a7774e')
.then((response)=> {
    return response.json()
})
.then ((json) => {
    console.log (json)
    console.log(json.name)
    console.log(json.main.feels_like)
    city.innerHTML = ` ${json.name}`
    temp.innerHTML = `<p>Temperature:${json.main.temp}</p>`
    json.weather.forEach((element) => {
        weatherType.innerHTML = `<h2> Weather: ${element.main} </h2>`
    })

})

//Fetch for weather in London
// fetch ('https://api.openweathermap.org/data/2.5/weather?q=London,GB&units=metric&APPID=bc487ba1fa4b42fcfb85443237a7774e')
// .then((response)=> {
//     return response.json()
// })
// .then ((json) => {
//     console.log (json)
//     console.log(json.name)
//     console.log(json.main.feels_like)
// })

//Fetch for 5 days forecast in Stockholm
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=bc487ba1fa4b42fcfb85443237a7774e')
.then((response)=> {
    return response.json()
})
.then((json) => {
    console.log (json)
    console.log(json.city.name)

     // Filter the list for elements with a timestamp of 12:00:00
     const weatherAt12 = json.list.filter((el) => el.dt_txt.includes("12:00:00"));
    //elements12 är en array med 5 objekt. Innehåller all väderinfo kl 12, 5 olika dagar
     console.log(weatherAt12)

     const dates_text = weatherAt12.map((el) => el.dt_txt)
     // dates_text är en array med 5 strings: ex; '2023-09-12 12:00:00'
     console.log(dates_text)

     const DayNumber = dates_text.map((el)=>{
        return new Date(el).getDay()
     })
     // dayNumber är en string: [2, 3, 4, 5, 6], representerar dagarna i nummerform
     console.log(DayNumber)

     const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

     let day1 = weekday[DayNumber[0]];
     let day2 = weekday[DayNumber[1]];
     let day3 = weekday[DayNumber[2]];
     let day4 = weekday[DayNumber[3]];
     let day5 = weekday[DayNumber[4]];
     let day6 = weekday[DayNumber[5]];
     let day7 = weekday[DayNumber[6]];
     //Här skrivs day som ex Weekday[2] = Tuesday utifrån arrayn 'DayNumber'


     // Extract temperature values for the filtered elements
     const temperaturesAt12 = weatherAt12.map((el) => Math.round(el.main.temp))
    
     const feelsLike = weatherAt12.map((el) => Math.round(el.main.feels_like))
 
     console.log(`tempat12 ${temperaturesAt12}`);
     console.log(feelsLike)

     forecastSection.innerHTML += `
         ${day1}: ${temperaturesAt12[0]}°C, ${feelsLike[0]}°C
     <br>${day2}: ${temperaturesAt12[1]}°C, ${feelsLike[1]}°C
     <br>${day3}: ${temperaturesAt12[2]}°C, ${feelsLike[2]}°C
     <br>${day4}: ${temperaturesAt12[3]}°C, ${feelsLike[3]}°C
     <br>${day5}: ${temperaturesAt12[4]}°C, ${feelsLike[4]}°C `
   
     
    })
    