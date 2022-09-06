const city = document.getElementById('city')
const temperature = document.getElementById('temperature')
const description = document.getElementById('description')


fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=abebf12bf91dc9d039d1075966f84a6d')
    .then((response) => {
        return response.json()
    })
    .then((json) =>{
        city.innerHTML= (`City: ${json.name}`);
        temperature.innerHTML= (`Temperature: ${Math.round(json.main.temp)}`); /*made the rounded decimal works*/
        description.innerHTML= (`${json.weather[0].description}`) /*made it work by targeting the weather index zero, and the description within that index zero GREAT JOB!!!*/
    });

    


/*;*/