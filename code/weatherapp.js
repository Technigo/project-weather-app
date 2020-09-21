//Putting the api link into a so we can access it through that
const apiLink = ("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1aa12a879150a3460a48993824ba1347");

//Using a function to fetch the data from the apilink variable
const fetchedApiInfo = () => {
    fetch(apiLink)
    .then((response) => {
        return response.json()
    })
    .then((weatherInfo) => {
        //Accesing the data from the api via json and putting it into specified html elements
        city.innerText = weatherInfo.name;
        //toFixed()rounds the number up or down
        temperature.innerText = weatherInfo.main.temp.toFixed(1); 
        weatherType.innerText = weatherInfo.weather[0].description;
    });
};

fetchedApiInfo();