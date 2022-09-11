const region = document.getElementById('region')

fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=fb125bc213d8ee5c4a432b3a2b24aecf")
    .then((response) => {
        return response.json()
    })

    .then((json) => {
        console.log(json)

        const sunRise = new Date (json.sys.sunrise);
        let sunRiseHoursAndMinuits = sunRise.getHours() + ':' + sunRise.getMinutes();
        console.log(sunRiseHoursAndMinuits); 

        const sunSet = new Date (json.sys.sunset * 1000);
        let sunSetHoursAndMinuits = sunSet.getHours() + ':' + sunSet.getMinutes();
        console.log(sunSetHoursAndMinuits);

        const weathers = json.weather
        weathers.map((weather) => {
            console.log(weather.description)

        region.innerHTML = `
        <h3> Temperature ${(json.main.temp).toFixed(1)}, feels like ${json.main.feels_like.toFixed(1)}, min temp ${json.main.temp_min.toFixed(1)}, max temp
         ${json.main.temp_max.toFixed(1)} </h3>
        <h3>${weather.description}</h3>
        <h3> Sunrise ${sunRiseHoursAndMinuits}</h3>
        <h3> Sunset ${sunSetHoursAndMinuits}</h3>
        `
       

        //const setUTCHours1 = json.sys
          //  ((sunrise) => {
          //      console.log(sunrise)
          //  })
          
        
        
        //const sunSet = new Date (json.sys.sunset * 1000)

        //const setUTCHours = json.sys
        //setUTCHours((sunset) => {
          //  console.log(sunset)
       // })

        //let ... = sunRise.getUTCHOurs().toLocaleString()

    })

})

      
        //setUTCHours(hoursValue, minutesValue) Hur definerar jag variablerna?
        //An integer between 0 and 23, representing the hour. 
        //An integer between 0 and 59, representing the minutes.
        