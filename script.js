
const container = document.getElementById('weather')

fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=30497ceff63316bea65ec674ac0ba4c7')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        container.innerHTML = `<h1> ${json.name} is the base</h1>`
        //weather description
        const weatherDescription = json.weather[0].description;
        container.innerHTML += `<p>Weather is: ${weatherDescription}</p>`

        container.innerHTML += `<p>Temperature: ${json.main.temp} K</p>`

        container.innerHTML += `<p>Feels Like: ${json.main.feels_like} K</p>`;

        container.innerHTML += `<p>Max temp: ${json.main.temp_max} K</p>`;
        container.innerHTML += `<p>Min temp: ${json.main.temp_min} K</p>`;



        const windSpeed = json.wind.speed;
        const windDeg = json.wind.deg;

        container.innerHTML += `<p>Wind speed: ${windSpeed} m/s</p>`
        container.innerHTML += `<p>Wind direction: ${windDeg} degrees</p>`
    });




