//External location for the api links
const apiLinkWeatherInfo = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1aa12a879150a3460a48993824ba1347";

const apiLinkFiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=1aa12a879150a3460a48993824ba1347";

//Stockholm current weather info fetched from city weather API
const fetchedApiInfoCityWeather = () => {
    fetch(apiLinkWeatherInfo)
    .then((response) => {
        return response.json()
    })
    .then((weatherInfo) => {
        
        //Get Stockholm weather info
        document.getElementById("city").innerText = weatherInfo.name.toUpperCase(); 

        //Get today's date in day/month/year format
        const todaysDate = new Date(weatherInfo.dt * 1000);
        const options = {day: 'numeric', month: 'short', year: 'numeric'};
        const todaysDateFormat = todaysDate.toLocaleDateString('en-GB', options);
        document.getElementById("todaysDate").innerText = `${todaysDateFormat}`;

        //Get Stockholm temp
        const temperature = weatherInfo.main.temp.toFixed(1);
        //toFixed()rounds the number up or down
        document.getElementById("temperature").innerHTML = `${temperature}&#176`; 

        //Get Stockholm weather description
        document.getElementById("weatherType").innerText = weatherInfo.weather[0].description.toUpperCase();

        //Get weather icon based on description
        const iconId = weatherInfo.weather[0].icon;
        document.getElementById("iconImage").src = `./images/${iconId}.png`;

        //Get sunrise & sunset of Stockholm
        //new Date is creating a copy of the date object for us to fill
        //Converting from UNIX seconds to milliseconds as js uses millseconds
        //getHours and getMinutes will convert the UTC to local time according to your computer
        const sunrise = new Date(weatherInfo.sys.sunrise * 1000);
        const sunriseTimeHours = sunrise.getHours();
        const sunriseTimeMinutes = sunrise.getMinutes();

        const sunset = new Date(weatherInfo.sys.sunset * 1000);
        const sunsetTimeHours = sunset.getHours();
        const sunsetTimeMinutes = sunset.getMinutes();

        document.getElementById("sunrise").innerHTML = `Sunrise: ${sunriseTimeHours}:${sunriseTimeMinutes}`;
        document.getElementById("sunset").innerHTML = `Sunset: ${sunsetTimeHours}:${sunsetTimeMinutes}`;
    });
};

fetchedApiInfoCityWeather();

//Stockholm five day forescast info fetched from  5 day forecast API
const fiveDayForecastApiInfo = () => {
    fetch(apiLinkFiveDayForecast)
    .then((response) => {
        return response.json()
    })
    .then((fiveDayForecastInfo) => {

        //Filtering the temperature at midday for the next 5 days
        const filteredList = fiveDayForecastInfo.list.filter(item => item.dt_txt.includes('12:00'));

        //For loop that loops through each of the array elements (objects), accesses specific information from the objects and prints to HTML. In HTML getElementById have used the for loop to access each of the HTML elements by adding 1 each time to what the loop returns, as they are named differently e.g. day1Day, day2Day etc.
        for (let i=0; i < filteredList.length; i++) {
            const day = new Date(filteredList[i].dt * 1000);
            var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const finalDay = days[day.getDay()];
            document.getElementById(`day${i+1}Day`).innerHTML = `${finalDay}`;

            const temp = filteredList[i].main.temp.toFixed(1);
            document.getElementById(`day${i+1}Temp`).innerHTML = `${temp}&#176`;

            const description = filteredList[i].weather[0].description;
            document.getElementById(`day${i+1}Type`).innerHTML = `${description}`;

            const icon = filteredList[i].weather[0].icon;
            document.getElementById(`day${i+1}Icon`).src = `./images/${icon}.png`;
        };
    });
};

fiveDayForecastApiInfo();
