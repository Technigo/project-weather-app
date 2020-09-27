
//API fo Weather made to constant for easy re-use 
const weatherUrl ='https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f03e81d089081eb6bc8048a2ff0048e8'
const forecastURL ='https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=f03e81d089081eb6bc8048a2ff0048e8'

//constants variables for weather temp/ description/ main
const container = document.getElementById('container')
const temperature = document.getElementById('temperature')
// const weather = document.getElementById('weather')

const sunRise = document.getElementById('sunRise')
const sunSet = document.getElementById('sunSet')


// So you can read the time in HH:MM
const formatTime = (timestamp) => {
    let readableTime = new Date(timestamp * 1000);

    readableTime = readableTime.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    return readableTime;
}


//fetch - "stop trying to make fetch happen ;)" KOLLA HUR DETTA SKA VARA INDENTERAT 
fetch(weatherUrl)
    .then((response) => {
    return response.json()
})
    .then((json) => {
        
        container.innerHTML = `<h1> The weather in ${json.name} is ${json.weather[0].main} with ${json.weather[0].description}. </h1>`;

        temperature.innerHTML = Math.round(json.main.temp) + "°";

        sunRise.innerHTML = `sun up picture? ${formatTime(json.sys.sunrise)}`;
        sunSet.innerHTML = `sun up picture? ${formatTime(json.sys.sunset)}`;
    
}); 

// OK 5 day forecast.. 
  
const fiveDayForecast = () => {
    fetch(forecastURL)
    .then((response) => {
        return response.json()
    })
    .then((fiveDayForecastInfo) => {
        const filteredList = fiveDayForecastInfo.list.filter(item => item.dt_txt.includes('12:00'));
        //Filtering the next 5 day's with the list info at 12:00 that day
        
        //One
        const dayOneDate = new Date(filteredList[1].dt * 1000);  
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const finalDayOneDate = days[dayOneDate.getDay()];
        const dayOneTemp = filteredList[1].main.temp.toFixed(1);  

        document.getElementById("dayOne").innerHTML = `${finalDayOneDate}`;
        document.getElementById("dayOneTemp").innerHTML = `${dayOneTemp}&#176`;
        
        //TWO
        const dayTwoDate = new Date(filteredList[2].dt * 1000); 
        const finalDayTwoDate = days[dayTwoDate.getDay()];
        const dayTwoTemp = filteredList[2].main.temp.toFixed(2);

        document.getElementById("dayTwo").innerHTML = `${finalDayTwoDate}`;
        document.getElementById("dayTwoTemp").innerHTML = `${dayTwoTemp}&#176`;

        //THREE
        const dayThreeDate = new Date(filteredList[3].dt * 1000); 
        const finalDayThreeDate = days[dayThreeDate.getDay()];
        const dayThreeTemp = filteredList[3].main.temp.toFixed(3);

        document.getElementById("dayThree").innerHTML = `${finalDayThreeDate}`;
        document.getElementById("dayThreeTemp").innerHTML = `${dayThreeTemp}&#176`;

        //FOUR
        const dayFourDate = new Date(filteredList[4].dt * 1000); 
        const finalDayFourDate = days[dayFourDate.getDay()];
        const dayFourTemp = filteredList[4].main.temp.toFixed(4);

        document.getElementById("dayFour").innerHTML = `${finalDayFourDate}`;
        document.getElementById("dayFourTemp").innerHTML = `${dayFourTemp}&#176`;

        //FIVE
        const dayFiveDate = new Date(filteredList[5].dt * 1000); 
        const finalDayFiveDate = days[dayFiveDate.getDay()];
        const dayFiveTemp = filteredList[5].main.temp.toFixed(5);

        document.getElementById("dayFive").innerHTML = `${finalDayFiveDate}`;
        document.getElementById("dayFiveTemp").innerHTML = `${dayFiveTemp}&#176`;



    });
};

fiveDayForecast();

