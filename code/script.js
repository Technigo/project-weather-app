const weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723';

fetch(weatherAPI).then((respons) => {
    return respons.json();
}) .then ((weather) => {
    console.log(weather);
    console.log(weather.name)

}

)


