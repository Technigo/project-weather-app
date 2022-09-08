const header = document.getElementById('header')
const weekdays = document.getElementById('weekdays')


fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=fed8be257d06e9a0aa60731701ed1473')
    .then ((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        

        getWeather(json);

       // header.innerHTML = `<h1>The citys name is ${json.name}</h1>`

       /* const shortSunrise = json.sys.sunrise;
        const shortSunset = json.sys.sunset;

        let sunrise = new Date (shortSunrise * 1000);

        let sunset = new Date (shortSunset * 1000);

        let sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        let sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        let number = json.main.temp;
        let rounded = Math.round(number * 10) / 10;

        // var number = 12.3456789
        //var rounded = Math.round(number * 10) / 10

        header.innerHTML +=`<p>${json.weather[0].main} | ${rounded}°C</p>`
        header.innerHTML +=`<p>sunrise ${sunriseTime}</p>`
        header.innerHTML +=`<p>sunset ${sunsetTime}</p>` */


    })

    
    
    const getWeather = (json) => {       

        console.log(json)

        const shortSunrise = json.city.sunrise;
        const shortSunset = json.city.sunset;

        const sunrise = new Date (shortSunrise * 1000);

        const sunset = new Date (shortSunset * 1000);

        const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
        const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })

        const number = json.list[0].main.temp;
        const rounded = Math.round(number * 10) / 10;

        header.innerHTML +=`<p>${json.list[0].weather[0].main} | ${rounded}°C</p>`
        header.innerHTML +=`<p>sunrise ${sunriseTime}</p>`
        header.innerHTML +=`<p>sunset ${sunsetTime}</p>` 
        
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        //We use forEach() to loop thorugh the array of the comming 5 days.
        console.log(filteredForecast)
 
        filteredForecast.forEach((day) => {
        console.log(day);
        //This gives us the comming 5 weekdays in short format.    
        const weekDay = new Date(day.dt * 1000).toLocaleDateString('en', {weekday: 'short'});
    
        //This gives us the temperature of the comming 5 days.
        const mainTemp = day.main.temp.toFixed(0)
    
        //This displays the comming 5 days forecast in the body.
        weekdays.innerHTML +=
        `<li>
        <span>${weekDay}</span>
        <span>${mainTemp}°</span>
        </li>`

    })
 }
    
    // var number = 12.3456789
    //var rounded = Math.round(number * 10) / 10
    /* .week-days ul li {
    display: flex;
    justify-content: space-between;
    padding: 0.2em;
    border-bottom: dashed 1px ;

    .week-days ul {
    list-style: none;
    padding-left: 0;
}

.week-days ul li {
    display: flex;
    justify-content: space-between;
    padding: 0.2em;
    border-bottom: dashed 1px ;
}
} 
       filteredForecast.forEach ((dag) => {
            console.log(day[1])
        })
*/

    // https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=fed8be257d06e9a0aa60731701ed1473 
