const summary = document.getElementById('summary');
const mainSection = document.getElementById('mainSection');
const forecast = document.getElementById('forecast');
const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const mainSearchbar = document.getElementById('main-searchbar');
const changeColor = document.getElementById('change');
const Btn = document.getElementById('button');

// Global variables
let weather;

// Function that gets and displays all the weather info for a city:
const getWeather = (city) => {
    // Clear the previous city's forecast:
    forecast.innerHTML = '';

    // Get weather for the city that is requested by user:
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=a8803210b888f640e92f889b4be6e93f`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {

        // API sunrise and sunset times are given as UNIX time: the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970
        let sunrise = new Date(json.sys.sunrise * 1000); //multiply by 1000 to get milliseconds, as Unix timestamp in in seconds while JS Date() uses milliseconds
        let sunset = new Date(json.sys.sunset * 1000);
        let currentTime;

        // Function to add a 0 before any single digit hour or minute
        const formatTime = (sunEvent) => {
            let hours = sunEvent.getHours();
            let minutes = sunEvent.getMinutes();
            
            // Object that stores the hour and minutes 
            currentTime = {
                hours: hours,
                minutes: minutes
            }

            // If needed, a 0 is added infront of the hours and minutes
            if (hours < 10){
                currentTime.hours = '0' + hours;
            }
            if (minutes < 10){
                currentTime.minutes = '0' + minutes;
            }
            
            return currentTime
        }
        // Display summary of city, weather, sunrise and sunset:
        weather = json.weather[0].main;
        summary.innerHTML = `
            <h1>${json.name}</h1>
            ${json.weather[0].main} |
            ${Math.round(json.main.temp)}°C
            <p>Sunrise ${formatTime(sunrise).hours}.${formatTime(sunrise).minutes}</p>  
            <p>Sunset ${formatTime(sunset).hours}.${formatTime(sunset).minutes}</p>
        `; 
    })
 
    // Get forecast for the city that is requested by user:
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=a8803210b888f640e92f889b4be6e93f`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('15:00'));
        
            filteredForecast.forEach((day) => {
                const date = new Date(day.dt * 1000);
            
                // Getting todays date:
                const now = new Date();
            
                // This is comparing the forecast day with the current day:
                const isTodaysForecast = date.getDay() === now.getDay();
            
                let dayName = week[date.getDay()]
            
                // Since we don't want to include today in the forcast if the fetched time is later on, we do this:
                if(!isTodaysForecast){
                    forecast.innerHTML += `
                        <p><span class='left'>${dayName}</span> <span class='right'>${Math.round(day.main.temp)}°C</span></p>
                    `;
                }
            })

            if (weather === 'Clear') {
                changeColor.classList = 'clear';
                Btn.classList = 'clearButton';
                mainSearchbar.classList = 'clearInput';
                mainSection.innerHTML = `
                    <img src='./icons/noun_Sunglasses_2055147.svg'>
                    <p>Get your sunnies on. ${json.city.name} is looking rather great today.</p>
                `; 
            }
            else if (weather === 'Rain') {
                changeColor.classList = 'rain';
                Btn.classList = 'rainButton';
                mainSearchbar.classList = 'rainInput';
                mainSection.innerHTML = `
                    <img src='./icons/noun_Umbrella_2030530.svg'>   
                    <p>Don't forget your umbrella. It's wet in ${json.city.name} today.</p>
                `;
                }
                
                /*else if (weather === 'Snow') {
                    document.body.style.backgroundColor = '#A3DEF7';
                    document.body.style.color = '#164A68'; 
                }
                */ //this option could be added later on
                
            else {
                changeColor.classList = 'clouds';
                Btn.classList = 'cloudsButton';
                mainSearchbar.classList = 'cloudsInput';
                mainSection.innerHTML = `
                    <img src='./icons/noun_Cloud_1188486.svg'>
                    <p>Light a fire and get cosy. ${json.city.name} is looking grey today.</p>
                `;
            }
    })
}
// Start program by displaying Stockholm weather, then listen for searches of other cities:
getWeather('Stockholm');
mainSearchbar.addEventListener('change', (event) => getWeather(event.target.value, mainSearchbar.value=''));


    
