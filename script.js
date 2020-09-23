const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Kaxholmen,Sweden&units=metric&appid=aac4bb6aff926b7baee4aa5fc6f5e50e';
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=aac4bb6aff926b7baee4aa5fc6f5e50e';
const city = document.getElementById('name');
const date = document.getElementById('day')
const temperature = document.getElementById('degrees');
const description = document.getElementById('weatherType');
const sunrise = document.getElementById('rise');

fetch(weatherUrl)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        city.innerHTML = json.name;
        temperature.innerHTML = `${json.main.temp} °C`;
        description.innerHTML = json.weather[0].description;

        console.log(json);
    })

const weekDays = () => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var dayName = days[d.getDay()];
    return dayName;

}

date.innerHTML = weekDays();

const today = () => {
    const months = ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const current_datetime = new Date()
    const formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
    return ` ${formatted_date}`;

}

date.innerHTML += today();