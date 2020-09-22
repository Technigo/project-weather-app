const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Kaxholmen,Sweden&units=metric&appid=aac4bb6aff926b7baee4aa5fc6f5e50e';
const city = document.getElementById('name');
const temperature = document.getElementById('degrees');
const description = document.getElementById('weatherType');

fetch(apiUrl)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        city.innerHTML = json.name;
        temperature.innerHTML = `${json.main.temp} °C`;
        description.innerHTML += json.weather[0].description;
        console.log(json);
    })