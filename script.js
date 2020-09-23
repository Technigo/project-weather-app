let citySearched = 'Kil';
//const apiUrlToday = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=metric&APPID=a0a9672a941bc58ae811a05987143dd5`
//const apiUrlForcast = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearched}&units=metric&APPID=a0a9672a941bc58ae811a05987143dd5`
//const apiUrlToday = 'https://api.openweathermap.org/data/2.5/weather?q=Kil,Sweden&units=metric&APPID=a0a9672a941bc58ae811a05987143dd5'
//const apiUrlForcast = 'https://api.openweathermap.org/data/2.5/forecast?q=Kil,Sweden&units=metric&APPID=a0a9672a941bc58ae811a05987143dd5'
//const container = document.getElementById('wrapper');
const containerToday = document.getElementById("weatherToday"); //change to location? 
//const descriptionToday = document.getElementById("text");
const containerForecast = document.getElementById("weatherForecast");


//Function for temp rounded to one decimal 
const calculatedTemperature = (number) => {
    const roundedTemp = Math.round(number*10)/10; //By adding *10 AND adding /10 the number is rounded up to nearest integer with one decimal. If only using round() the number is rounded up to nearest integer.
    return roundedTemp;
};

/*
const localeTime = (time) => {
    const clock = new Date(time * 1000);   
    const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        timeStyle: 'short',
        hour12: false,
      }
    const intlTime = new Intl.DateTimeFormat('en', options).format(clock)
    //const clockToString = clock.toLocaleTimeString('en-US', {
    //console.log(clock)
    //const clockToString = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' });
    console.log(intlTime)
    //return clockToString;
}
*/

const localeTime = (time) => {
    const clock = new Date (time * 1000);
    const clockToString = clock.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })
    console.log(clockToString)
    return clockToString;
}


//function for sunrise and suntime that only includes hours and minutes 
const calculatingSun = (time) => {
    const sunTime = new Date(time * 1000);
    const sunTimeString = sunTime.toLocaleTimeString('en-US', {
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
    //console.log(forcastDays)
    const forcastDaysString = forcastDays.toLocaleDateString('en-SE', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    //console.log(forcastDaysString);
    return forcastDaysString; 
};

//Function to limit amount of description to be able to link them to an icon 
const iconDependingOnWeather = (item) => {
    const iconMainDescription = item
    //console.log(iconMainDescription)

    //const iconMainDescriptionForcast = weatherForcast.weather[0].main
    //console.log(iconMainDescriptionForcast)
    if (iconMainDescription === 'Clouds') {
        return 'http://openweathermap.org/img/wn/03d@2x.png'
    } else if (iconMainDescription === 'Clear'){
        return 'http://openweathermap.org/img/wn/01d@2x.png'
    } else if (iconMainDescription === 'Rain') {
        return 'http://openweathermap.org/img/wn/10d@2x.png'
    } else if (iconMainDescription === 'Thunderstorm') {
        return 'http://openweathermap.org/img/wn/11d@2x.png'
    } else if (iconMainDescription === 'Drizzle') {
        return 'http://openweathermap.org/img/wn/09d@2x.png'
    } else if (iconMainDescription === 'Snow') {
        return 'http://openweathermap.org/img/wn/13d@2x.png'
    } else 
        return 'http://openweathermap.org/img/wn/50d@2x.png'

    //return iconMainDescription
}

//Is it correct to have a , sep??
const weatherTodayBackgroundColor = (temp) => {
    const containerColor = document.querySelector('.class-color')
    console.log(containerColor)
//const img = document.getElementById('weatherToday') //added
    if (temp < 0, temp <= 6) {  
        containerColor.style.backgroundColor = 'blue';
        //containerToday.style.filter = "brightness(30%)";
        //containerToday.style.backgroundColor = '#e5f5f9';
    } else if (temp > 6, temp <= 20) {
        containerColor.style.backgroundColor = 'orange';
        //containerToday.style.filter = "brightness(70%)";
       //containerToday.style.backgroundColor = '#fdae6b';
       //console.log(temp) 
    } else 
        containerColor.style.backgroundColor = 'red'

        //containerToday.style.filter = "brightness(100%)";
        //containerToday.style.backgroundColor = '#e6550d'; 
}


//function invoked when search button is clicked
const citySelected = () => {
    containerToday.innerHTML = ''; //to clear default city today value
    containerForecast.innerHTML = ''; //to clear default city forcast value
    citySearched = document.getElementById("cityNamePicked").value;
    //console.log(citySearched)
    fetchWeatherForcast(citySearched);
    fetchWeatherToday(citySearched);
    document.getElementById("cityNamePicked").value = ''; //to clear input value after search
}



//Functions to invoke already created functions and manipulate the DOM
const generatedHTMLForWeatherToday = (weatherToday) => {
    const temperature = calculatedTemperature(weatherToday.main.temp); //argument to get info about temperature inside our API
    
    //console.log(weatherToday.sys.sunrise)
    const timeInCity = localeTime(weatherToday.dt)
    const sunrise = calculatingSun(weatherToday.sys.sunrise); //resue already created function an adds in argument about API sunsrise time
    const sunset = calculatingSun(weatherToday.sys.sunset);
    const iconToday = iconDependingOnWeather(weatherToday.weather[0].main)
    const description = weatherToday.weather[0].description
    
    weatherTodayBackgroundColor(weatherToday.main.temp);
    //containerToday.innerHTML = `<h1>Location: ${weatherToday.name}</h1>`;
    
     //separate and build up the HTML tree
     let weatherTodayHTML = '';
     //moved img from here
     weatherTodayHTML += `<div class="location-information">`;
     weatherTodayHTML += `<div class="temp"> ${temperature} \xB0c </div>`
     weatherTodayHTML += `<div class="location"> ${weatherToday.name} </div>` 
     weatherTodayHTML += `<div class="description"> ${description} </div>` 
     weatherTodayHTML += `<div class="local-time"> ${timeInCity} </div>` 
     
     weatherTodayHTML += `</div>`
     //weatherTodayHTML += ` <img src='${iconToday}'/>`;
     weatherTodayHTML += `<div class="sun-information">`
     weatherTodayHTML += `<div class="sunrise"> Sunrise ${sunrise}</div>`
     weatherTodayHTML += `<div class="sunset"> Sunset ${sunset}</div>`
     weatherTodayHTML += `</div>`
     return weatherTodayHTML; 
};


const generatedHTMLForWeatherForcast = (filteredForcast) => {
    const weekday = printDay(filteredForcast.dt_txt); //Tell what day it concerns,
        //console.log(filteredForcast.main.temp); //can console.log this, but cant make it work when invoking the printDay()

    const dailyTemp = calculatedTemperature(filteredForcast.main.temp);
    const humidity = calculatedTemperature(filteredForcast.main.humidity); 
    const iconForcast = iconDependingOnWeather(filteredForcast.weather[0].main);

    //separate and build up the HTML tree
    let weatherForcast = '';
    weatherForcast += `<div class="weather-forcast">`;
    weatherForcast += `<div class="day">${weekday}</div>`;
    weatherForcast += `<img src='${iconForcast}'/>`;
    weatherForcast += `<p>${dailyTemp} \xB0c/ ${humidity} %</p>`;
    weatherForcast += `</div>`; 
    return weatherForcast; //This is code from Van to use in forecast HTML
};


//Function to fetch API regarding todays weather 
/*
const fetchWeatherToday = () => {
    fetch(apiUrlToday).then((response) => {
        return response.json();
    }).then((weatherToday) => {
        //container.innerHTML += generatedHTMLForWeatherToday(weatherToday)
        containerToday.innerHTML += generatedHTMLForWeatherToday(weatherToday); 
        //added descriptionToday.innerHTML +=  on row 95
        //this prins everyting as a p tag (text id in html)
        //but I have specified weatherTodayHTML and assigned it to class weatherToday styled in css...
    });
}
fetchWeatherToday(citySearched);
*/


const fetchWeatherToday = (citySearched) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=metric&APPID=a0a9672a941bc58ae811a05987143dd5`)
    .then((response) => {
        return response.json();
    }).then((weatherToday) => {
        //container.innerHTML += generatedHTMLForWeatherToday(weatherToday)
        containerToday.innerHTML += generatedHTMLForWeatherToday(weatherToday); 
        console.log('in fetch weather today')
        //added descriptionToday.innerHTML +=  on row 95
        //this prins everyting as a p tag (text id in html)
        //but I have specified weatherTodayHTML and assigned it to class weatherToday styled in css...
    });
}
fetchWeatherToday(citySearched);



const fetchWeatherForcast = (citySearched) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${citySearched}&units=metric&APPID=a0a9672a941bc58ae811a05987143dd5`)
    .then((response) => {
        return response.json();
    }).then((weatherForcast) => {
        //console.log(weatherForcast)
        const filteredForcast = weatherForcast.list.filter((item) => 
        item.dt_txt.includes('12:00')
        );
        //console.log(filteredForcast);

        filteredForcast.map((forcast) => {
            //container.innerHTML += generatedHTMLForWeatherForcast(forcast) //if we only have one wrapper
            containerForecast.innerHTML += generatedHTMLForWeatherForcast(forcast)
            console.log('forcast test')
        });
    });
};
fetchWeatherForcast(citySearched);
