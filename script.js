const apiUrlToday = 'http://api.openweathermap.org/data/2.5/weather?q=Kil,Sweden&units=metric&APPID=a0a9672a941bc58ae811a05987143dd5'
const apiUrlForcast = 'https://api.openweathermap.org/data/2.5/forecast?q=Kil,Sweden&units=metric&APPID=a0a9672a941bc58ae811a05987143dd5'
const containerToday = document.getElementById("weatherToday"); //change to location? 
const descriptionToday = document.getElementById("text");
const containerForecast = document.getElementById("forecastWrapper");


//Function for temp rounded to one decimal 
const calculatedTemperature = (number) => {
    const roundedTemp = Math.round(number*10)/10; //By adding *10 AND adding /10 the number is rounded up to nearest integer with one decimal. If only using round() the number is rounded up to nearest integer.
    return roundedTemp;
};




//function for sunrise and suntime that only includes hours and minutes 
const calculatingSun = (time) => {
    const sunTime = new Date(time * 1000);
    const sunTimeString = sunTime.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    //console.log(sunTimeString);
    return sunTimeString;
    //to be able to get this info when we invoke the function 
};




//functions to print a short day of our 5 day weather forcast 
const printDay = (day) => {
    const forcastDays = new Date(day);
    const forcastDaysString = forcastDays.ToLocalDateString('en-US', {
        weekday: 'short',
    });
    console.log(forcastDaysString);
    return forcastDaysString; 
};




//Functions to invoke already created functions and manipulate the DOM
const generatedHTMLForWeatherToday = (weatherToday) => {
    const temperature = calculatedTemperature(weatherToday.main.temp); //argument to get info about temperature inside our API
    
    //console.log(weatherToday.sys.sunrise)
    const sunrise = calculatingSun(weatherToday.sys.sunrise); //resue already created function an adds in argument about API sunsrise time
    const sunset = calculatingSun(weatherToday.sys.sunset);


    //containerToday.innerHTML = `<h1>Location: ${weatherToday.name}</h1>`;
    //descriptionToday.innerHTML = `The temperature today is: ${temperature} degrees, ${weatherToday.weather[0].description} outside.
    //Sun rises at ${sunrise} sun sets at ${sunset}`;
    //Weather is an array in the API, need to access the index of 0, and then locate the object keyvalues i.e .description. 
    //This has to be done even if there is only one array, as in this case.
    //descriptionToday.innerHTML = `Sun rises at ${sunrise} sun sets at ${sunset}`;

    
    //separate everyting instead of return in one row! 
    let weatherTodayHTML = '';
    weatherTodayHTML += `<section class="weatherToday">`;
    weatherTodayHTML += `<p> Location: ${weatherToday.name}: Weather Today: ${weatherToday.weather[0].description}: 
    ${temperature} \xB0: Sunrise at: ${sunrise}: Sunset at ${sunset} </p>`
    weatherTodayHTML += `</section>`; 
    return weatherTodayHTML; 
};


const generatedHTMLForWeatherForcast = (filteredForcast) => {
    //printDay(filteredForcast.dt_txt) //Tell what day it concerns, does not work ATM 
    console.log(filteredForcast.main.temp); //can console.log this, but cant make it work when invoking the printDay()

    const dailyTemp = calculatedTemperature(filteredForcast.main.temp);
    return dailyTemp
    //Other information to take in. 
    //description for next five days "partly clody, sun".... changed with an image using if statments....?? 
    //min and max temp for the day. 

    //separate and build up the section tree VANS example
    //let launchHTML = '';
    //launchHTML += `<section class="launch">`;
    //launchHTML += ` <img src='${launchOutcomeImageUrl}'>`;
    //launchHTML += ` <p>${launch.flight_number}: ${launch.mission_name} - ${launchDateString} ${launchTimeString}</p>`;
    //launchHTML += `</section>`;
    //return launchHTML;*/ //This is code from Van to use in forecast HTML
};


//Function to fetch API regarding todays weather 
const fetchWeatherToday = () => {
    fetch(apiUrlToday).then((response) => {
        return response.json();
    }).then((weatherToday) => {
        descriptionToday.innerHTML += generatedHTMLForWeatherToday(weatherToday); 
        //added descriptionToday.innerHTML +=  on row 95
        //this prins everyting as a p tag (text id in html)
        //but I have specified weatherTodayHTML and assigned it to class weatherToday styled in css...
    });
}
fetchWeatherToday();



//function to fetch forcast API 
const fetchWeatherForcast = () => {
    fetch(apiUrlForcast).then((response) => {
        return response.json();
    }).then((weatherForcast) => {
        //console.log(weatherForcast)
        const filteredForcast = weatherForcast.list.filter((item) => 
        item.dt_txt.includes('12:00')
        );
        console.log(filteredForcast);

        filteredForcast.forEach((forcast) => {
            containerForecast.innerHTML += generatedHTMLForWeatherForcast(forcast)
        });
    });
};
fetchWeatherForcast();
//filteredForcast();

