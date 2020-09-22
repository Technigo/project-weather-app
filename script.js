// APP ID FOR OPEN WEATHER MAP
let appId = '38d8ead396b75510c605134ba40b95f7';
// CHOICE OF UNITS
let units = 'metric';
// TO SEARCH FOR A CITY
let searchMethod = 'q';

// FETCH API
function searchWeather(searchTerm) {
    // getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then(result => {
            return result.json();
        }).then(result => {
            init(result);
        })
}