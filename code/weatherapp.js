//External location for the api links
const apiLinkWeatherInfo = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1aa12a879150a3460a48993824ba1347";

const apiLinkFiveDayForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=1aa12a879150a3460a48993824ba1347";


const fetchedApiInfo = () => {
    fetch(apiLinkWeatherInfo)
    .then((response) => {
        return response.json()
    })
    .then((weatherInfo) => {
        
        //Get Stockholm weather info
        document.getElementById("city").innerText = weatherInfo.name.toUpperCase(); 

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
        //new Date is creating a copy of a new object for us to fill
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
    fetch(apiLinkFiveDayForecast)
    .then((response) => {
        return response.json()
    })
    .then((fiveDayForecastInfo) => {
        //Get forecast in Stockholm for next 5 days
        //Filtering the next 5 day's with the list info at 12:00 that day
        const filteredList = fiveDayForecastInfo.list.filter(item => item.dt_txt.includes('12:00'));

        /* ------ DAY 1 FORECAST ---- */
        //Taking the first array from the filteredList and accessing the date for that day. Passing that as an argument in the new Date so it can convert it into today's date and time.
        const dayOneDate = new Date(filteredList[0].dt * 1000);  
        //Created an array with weekday names.Then used the dayOneDate together with the getDay() method to select from the array which day it is. The getDay method tells you this is number format e.g. 1 = Sunday. Which I think then selects that from the array of days.     
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const finalDayOneDate = days[dayOneDate.getDay()];
        //Taking the first array index from the filteredList and accessing the temperature for that day whilst rounding the temperature to one decimal place.
        const dayOneTemp = filteredList[0].main.temp.toFixed(1);  
        //Getting description and icon for the next five days
        const dayOneDescription = filteredList[0].weather[0].description;
        const dayOneDescpIcon = filteredList[0].weather[0].icon;

        document.getElementById("day1Day").innerHTML = `${finalDayOneDate}`;
        document.getElementById("day1Type").innerHTML = `${dayOneDescription}`;
        document.getElementById("day1Icon").src = `./images/${dayOneDescpIcon}.png`;
        document.getElementById("day1Temp").innerHTML = `${dayOneTemp}&#176`;


        /* ------ DAY 2 FORECAST ---- */
        const dayTwoDate = new Date(filteredList[1].dt * 1000);
        const finalDayTwoDate = days[dayTwoDate.getDay()];
        const dayTwoDescription = filteredList[1].weather[0].description;
        const dayTwoDescpIcon = filteredList[1].weather[0].icon;
        const dayTwoTemp = filteredList[1].main.temp.toFixed(1);

        document.getElementById("day2Day").innerHTML = `${finalDayTwoDate}`;
        document.getElementById("day2Type").innerHTML = `${dayTwoDescription}`;
        document.getElementById("day2Icon").src = `./images/${dayTwoDescpIcon}.png`;
        document.getElementById("day2Temp").innerHTML = `${dayTwoTemp}&#176`;

        /* ------ DAY 3 FORECAST ---- */
        const dayThreeDate = new Date(filteredList[2].dt * 1000);
        const finalDayThreeDate = days[dayThreeDate.getDay()];
        const dayThreeDescription = filteredList[2].weather[0].description;
        const dayThreeDescpIcon = filteredList[2].weather[0].icon;
        const dayThreeTemp = filteredList[2].main.temp.toFixed(1);

        document.getElementById("day3Day").innerHTML = `${finalDayThreeDate}`;
        document.getElementById("day3Type").innerHTML = `${dayThreeDescription}`;
        document.getElementById("day3Icon").src = `./images/${dayThreeDescpIcon}.png`;
        document.getElementById("day3Temp").innerHTML = `${dayThreeTemp}&#176`;

        /* ------ DAY 4 FORECAST ---- */
        const dayFourDate = new Date(filteredList[3].dt * 1000);
        const finalDayFourDate = days[dayFourDate.getDay()];
        const dayFourDescription = filteredList[3].weather[0].description;
        const dayFourDescpIcon = filteredList[3].weather[0].icon;
        const dayFourTemp = filteredList[3].main.temp.toFixed(1);

        document.getElementById("day4Day").innerHTML = `${finalDayFourDate}`;
        document.getElementById("day4Type").innerHTML = `${dayFourDescription}`;
        document.getElementById("day4Icon").src = `./images/${dayFourDescpIcon}.png`;
        document.getElementById("day4Temp").innerHTML = `${dayFourTemp}&#176`;

        /* ------ DAY 5 FORECAST ---- */
        const dayFiveDate = new Date(filteredList[4].dt * 1000);
        const finalDayFiveDate = days[dayFiveDate.getDay()];
        const dayFiveDescription = filteredList[4].weather[0].description;
        const dayFiveDescpIcon = filteredList[4].weather[0].icon;
        const dayFiveTemp = filteredList[4].main.temp.toFixed(1);  
    
        document.getElementById("day5Day").innerHTML = `${finalDayFiveDate}`;
        document.getElementById("day5Type").innerHTML = `${dayFiveDescription}`;
        document.getElementById("day5Icon").src = `./images/${dayFiveDescpIcon}.png`;
        document.getElementById("day5Temp").innerHTML = `${dayFiveTemp}&#176`;
    });
};

fetchedApiInfo();

