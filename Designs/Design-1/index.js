const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=742fe8feec76d1ec7cd8207fdf08fb30';
const container = document.getElementById('main');
const weatherCity = document.getElementById('city')


fetch(weatherUrl)
.then((response) => {
    return response.json()
})
.then((weatherArray) => {
    weatherCity.innerHTML = weatherArray.name;

});


