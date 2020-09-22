


const generateHTMLForDate = (stockholmWeather) => {
    const currentDate = new Date(stockholmWeather.dt);
    const dateToString = currentDate.toLocaleDateString('en-Us')
    return dateToString;
}

const url = (city, country = "Sweden") => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=1135d0ed8f3ffc61db744af9153b5e66`;
}

const decimals = (num, decimals = 1) => {
    const pow = Math.pow(10, decimals);
    return Math.round(num * pow) / pow;
}


const generateHTMLForWeather = (stockholmWeather) => {
    const cityName = stockholmWeather.name;
    const typeOfWeather = stockholmWeather.weather[0].description;
    const date = generateHTMLForDate(stockholmWeather);
    const currentTemp = decimals(stockholmWeather.main.temp);

    return `<p>${cityName} ${date} Current temperature: ${currentTemp} Type: ${typeOfWeather}</p>`
}

fetch(url('Stockholm')).then((response) => {
    return response.json();
})
.then((stockholmWeather) => {
  document.getElementById('weatherContainer').innerHTML += generateHTMLForWeather(stockholmWeather);
  
});
