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

        const temperature = weatherInfo.main.temp.toFixed(1);
        //toFixed()rounds the number up or down
        document.getElementById("temperature").innerText = `${temperature} c`; 
        document.getElementById("weatherType").innerText = weatherInfo.weather[0].description;

        //new Date is creating a copy of a new object for us to fill
        const sunrise = new Date(weatherInfo.sys.sunrise * 1000);
        //Time specified is in seconds, not milliseconds? So we have to convert it to milliseconds because seconds would take longer to convert?
        const sunriseTimeHours = sunrise.getHours();
        const sunriseTimeMinutes = sunrise.getMinutes();
        //getHours and getMinutes will convert the UTC to local time according to your computer
        document.getElementById("sunrise").innerHTML = `Sunrise: ${sunriseTimeHours}:${sunriseTimeMinutes}`;

        const sunset = new Date(weatherInfo.sys.sunset * 1000);
        const sunsetTimeHours = sunset.getHours();
        const sunsetTimeMinutes = sunset.getMinutes();
        document.getElementById("sunset").innerHTML = `Sunset: ${sunsetTimeHours}:${sunsetTimeMinutes}`;
    });
};

fetchedApiInfo();