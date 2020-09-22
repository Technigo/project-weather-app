//Putting the api link into a so we can access it through that
import { apiLinkWeatherInfo } from './api-keysecure.js';

import { apiLinkFiveDayForecast } from './api-keysecure.js';


//Using a function to fetch the data from the apilink variable
const fetchedApiInfo = () => {
    fetch(apiLinkWeatherInfo)
    .then((response) => {
        return response.json()
    })
    .then((weatherInfo) => {
        //Accesing the data from the api via json and putting it into specified html elements
        document.getElementById("city").innerText = weatherInfo.name;

        const temperature = weatherInfo.main.temp.toFixed(1);
        //toFixed()rounds the number up or down
        // const degreeSymbol = `<p>&#8451;</p>`;
        document.getElementById("temperature").innerHTML = `${temperature} &#176c`; 
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
    fetch(apiLinkFiveDayForecast)
    .then((response) => {
        return response.json()
    })
    .then((fiveDayForecastInfo) => {
        const filteredList = fiveDayForecastInfo.list.filter(item => item.dt_txt.includes('12:00'));
        //Filtering the next 5 day's with the list info at 12:00 that day
        console.log(filteredList);

        /* ------ DAY 1 FORECAST ---- */
        const dayOneDate = new Date(filteredList[0].dt * 1000);
        //Taking the first array from the filteredList and accessing the date for that day. Passing that as an argument in the new Date so it can convert it into today's date and time.
        var days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
        const finalDayOneDate = days[dayOneDate.getDay()];
        //Created an array with weekday names. Then used the dayOneDate together with the getDay() method to select from the array which day it is. The getDay method tells you this is number format e.g. 1 = Sunday. Which I think then selects that from the array of days.
        const dayOneTemp = filteredList[0].main.temp.toFixed(1); 
        //Taking the first array index from the filteredList and accessing the temperature for that day whilst rounding the temperature to one decimal place. 

        /* ------ DAY 2 FORECAST ---- */
        const dayTwoDate = new Date(filteredList[1].dt * 1000);
        const finalDayTwoDate = days[dayTwoDate.getDay()];
        const dayTwoTemp = filteredList[1].main.temp.toFixed(1);

        /* ------ DAY 3 FORECAST ---- */
        const dayThreeDate = new Date(filteredList[2].dt * 1000);
        const finalDayThreeDate = days[dayThreeDate.getDay()];
        const dayThreeTemp = filteredList[2].main.temp.toFixed(1);

        /* ------ DAY 4 FORECAST ---- */
        const dayFourDate = new Date(filteredList[3].dt * 1000);
        const finalDayFourDate = days[dayFourDate.getDay()];
        const dayFourTemp = filteredList[3].main.temp.toFixed(1);

        /* ------ DAY 5 FORECAST ---- */
        const dayFiveDate = new Date(filteredList[4].dt * 1000);
        const finalDayFiveDate = days[dayFiveDate.getDay()];
        const dayFiveTemp = filteredList[4].main.temp.toFixed(1);

        document.getElementById("day1").innerHTML = `${finalDayOneDate} ${dayOneTemp} &#176c`;
        document.getElementById("day2").innerHTML = `${finalDayTwoDate} ${dayTwoTemp} &#176c`;
        document.getElementById("day3").innerHTML = `${finalDayThreeDate} ${dayThreeTemp} &#176c`;
        document.getElementById("day4").innerHTML = `${finalDayFourDate} ${dayFourTemp} &#176c`;
        document.getElementById("day5").innerHTML = `${finalDayFiveDate} ${dayFiveTemp} &#176c`;
    });
};

fetchedApiInfo();

