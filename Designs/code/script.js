const weatherTable = document.getElementById('weatherTable');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const description = document.getElementById('description');



const weatherInfo = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7899d890f36cbd5ef29eba2a205b5409')
        .then(response => {
            return response.json() //This always looks like this.

        })
        .then((json) => {
            console.log(json.name);
            console.log(json.main.temp);
            console.log(json.weather[0].description);
            console.log(json);

            const cityValue = json.name;
            console.log(cityValue);
            cityName.innerHTML += ` <td id="cityName2">${json.name}</td>`;
            temp.innerHTML += ` <td id="temp">${json.main.temp}</td>`;
            description.innerHTML += ` <td id="description">${json.weather[0].description}</td>`;
        })
}


weatherInfo();

const fillWatherTable = () => {
    cityName.innerHTML += `<td id="cityName2">${json.name}</td>`;
    /*         temp.innerHTML;
            description.innerHTML; */

}


fillWatherTable();

//City name
//temperature
//Type of weather