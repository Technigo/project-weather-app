const weatherTable = document.getElementById('weatherTable');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const sunriseTime = document.getElementById('sunriseTime');
const sunsetTime = document.getElementById('sunsetTime');




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

const sunInfo = () =>{
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7899d890f36cbd5ef29eba2a205b5409')
.then(response => {
    return response.json() //This always looks like this.

})
.then((json) => {
    let unixTimeSunrise = json.sys.sunrise;
    let sunriseValue = new Date(unixTimeSunrise * 1000);
    const sunriseConvertedTime = sunriseValue.toLocaleTimeString();
    sunriseTime.innerHTML += `<td id="sunriseTime">${sunriseConvertedTime}</td>`;
     //This saves the sunrise data into a variable called sunriseValue and make it a Date.
    //console.log(sunriseValue.toLocaleTimeString());//This invokes the method toLocaleTimeString which converts the UCT time to local time and as astring.
    
    //This invokes the method toLocalTimeString which converts the unix UCT time to local time and as a string. 
    //It also puts the value inside the HTML table in a new table cell. 
 /*    sunriseTime.innerHTML += 
    ` <td id="sunriseTime">${sunriseValue.toLocaleTimeString()}</td>`; 
 */

    let unixTimeSunset = json.sys.sunset; //This saves the sunset sata into a variable called sunsetTime
    let sunsetValue = new Date(unixTimeSunset * 1000);
    const sunsetConvertedTime = sunsetValue.toLocaleTimeString();
    sunsetTime.innerHTML += `<td id="sunsetTime">${sunsetConvertedTime}</td>`;
    })
}

sunInfo();

//City name
//temperature
//Type of weather