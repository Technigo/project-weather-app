//All global varibles
const tempToday = document.getElementById('tempToday')
const cityName = document.getElementById('cityName')
const weatherDescription = document.getElementById('weatherDescription')
const mainIcon = document.getElementById('mainIcon')

const sunriseText = document.getElementById('sunriseText');
const sunsetText = document.getElementById('sunsetText');

const weatherFeature = document.getElementById('weatherFeature')
const featureImage = document.querySelector('.feature-image');
const backgroundTopGradient = document.getElementById('backgroundTopGradient');

const searchMenuBtn = document.getElementById('searchMenuBtn');
const closeSearchMenu = document.getElementById('closeSearchMenu');
const searchBtn = document.getElementById('searchBtn');
const inputField = document.getElementById('inputField');
const switchFavoriteCity = document.getElementById('switchBtn')

const weatherForecast = document.getElementById('weatherForecast')
const forecastWeekdays = document.getElementById('forecastWeekdays')
const forecastIcon = document.getElementById('forecastIcon')
const forecastDescription = document.getElementById('forecastDescription')
const forecastTemp = document.getElementById('forecastTemp')
const forecastWind = document.getElementById('forecastWind')

const cityText = document.querySelector('.cityText');
const tempText = document.querySelector('.tempText');
const describeText = document.querySelector('.describeText');


//Variables we can use later to automate API-fethcing:
const apiKey = 'c480de5f69ca98d1993a4dae3213642e';
let city = 'Stockholm';


const todaysWeatherFeature = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {

                //Get today's weather
                let { icon } = json.weather[0];
                cityName.innerText = `${json.name}`;
                tempToday.innerText = `${json.main.temp.toFixed(0)}`;
                weatherDescription.innerText = `${json.weather[0].description}`;
                mainIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="main-icon">`

                // Get sunrise and sunset time with the city's timezone
                const sunriseTime = new Date((json.sys.sunrise + json.timezone) * 1000);       //Gives us the time in "human" form (as a date), mult. by 1000 to get it in ms.
                sunriseTime.setMinutes(sunriseTime.getMinutes() + sunriseTime.getTimezoneOffset())
                const sunriseShort = sunriseTime.toLocaleTimeString(['en-GB'], { timeStyle: 'short' });        //Transforms it into just the Hour/minutes. Select the short variant to get the time with minutes and not seconds.
                const sunsetTime = new Date((json.sys.sunset + json.timezone) * 1000);
                sunsetTime.setMinutes(sunsetTime.getMinutes() + sunsetTime.getTimezoneOffset())
                const sunsetShort = sunsetTime.toLocaleTimeString(['en-GB'], { timeStyle: 'short' });

                //Modifying the HTML based on our input:
                sunriseText.innerHTML = `<p>sunrise</p>
                                            <p class="time-data">${sunriseShort}</p>`;
                sunsetText.innerHTML = `<p>sunset</p>
                                        <p class="time-data">${sunsetShort}</p>`;

                //Today's weather varible
                const todaysWeather = json.weather[0].main

                //Get current local time with timezone
                const getTime = new Date()
                getTime.setMinutes(getTime.getMinutes() + getTime.getTimezoneOffset())
                getTime.setSeconds(getTime.getSeconds() + json.timezone)
                
                //Get time in hours to compare
                const currentTime = getTime.getHours();
                const sunriseTimeHour = sunriseTime.getHours();
                const sunsetTimeHour = sunsetTime.getHours();

                    //Image feature
                    if (currentTime >= sunriseTimeHour && currentTime <= sunsetTimeHour) {
                        //During daytime => show image depending on weather
                        if (todaysWeather === 'Clear') {
                            featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1613931189161-1f4d2660bd1e?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc0MDczNDI&ixlib=rb-4.0.3&q=80')"
                        } else if (todaysWeather === 'Clouds') {
                            featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1424111113808-b7be56a9f3d6?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcyNTczNTA&ixlib=rb-4.0.3&q=80')"
                        } else if (todaysWeather === 'Rain') {
                            featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1424111113808-b7be56a9f3d6?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcyNTczNTA&ixlib=rb-4.0.3&q=80')"
                        } else if (todaysWeather === 'Snow') {
                            featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1610486549369-585a0e6d8cc4?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc0MDc4NDE&ixlib=rb-4.0.3&q=80')"
                        } else if (todaysWeather === 'Thunderstorm') {
                            featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1602088501827-7912e1b4a7bd?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc0MDc5ODI&ixlib=rb-4.0.3&q=80')"
                        } else if (todaysWeather === 'Drizzle') {
                            featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1554039362-6daf559ddb63?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc0MDgyNDk&ixlib=rb-4.0.3&q=80')"
                        } else if (todaysWeather === 'Atmosphere' || todaysWeather === 'Haze') {
                            featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1543226549-10d29b2cfaf0?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc0MDg0MTI&ixlib=rb-4.0.3&q=80')"
                        } else {
                            featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1424111113808-b7be56a9f3d6?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcyNTczNTA&ixlib=rb-4.0.3&q=80')"
                        }

                    } else {
                        //During nighttime => show image depending on weather
                        if (todaysWeather === 'Clear') {
                            featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1620055374842-145f66ec4652?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc0MDkxMTY&ixlib=rb-4.0.3&q=80')"
                        } else if (todaysWeather === 'Snow') {
                            featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1602857731804-80e82120ff27?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc0MDkzNzQ&ixlib=rb-4.0.3&q=80')"
                        } else if (todaysWeather === 'Rain') {
                            featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1505144992585-d281c0e2cff8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc0MDk1OTA&ixlib=rb-4.0.3&q=80')"
                        } else if (todaysWeather === 'Clouds') {
                            featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1518352724948-729151797553?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc0MDk1OTA&ixlib=rb-4.0.3&q=80')"
                        } else {
                            featureImage.style.backgroundImage = "url(' https://images.unsplash.com/photo-1604083142449-79b1babd12d4?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc0MTIwOTM&ixlib=rb-4.0.3&q=80')"
                        };
                    }

                const gradientDayNight = () => {
                    //Remove all classes to be added later
                    const gradientStyle = ['morning', 'midday', 'afternoon', 'duskSunset', 'evening', 'midnight', 'dawnSunrise']
                    backgroundTopGradient.classList.remove(...gradientStyle)

                        if (currentTime > 7 && currentTime <= 11) {
                            backgroundTopGradient.classList.add('morning');
                        } else if (currentTime > 11 && currentTime <= 14) {
                            backgroundTopGradient.classList.add('midday');
                        } else if (currentTime > 14 && currentTime < 17) {
                            backgroundTopGradient.classList.add('afternoon');
                        } else if (currentTime >= 17 && currentTime <= 19) {
                            backgroundTopGradient.classList.add('duskSunset');
                        } else if (currentTime > 19 && currentTime <= 23) {
                            backgroundTopGradient.classList.add('evening');
                        } else if (currentTime > 23 || currentTime < 5) {
                            backgroundTopGradient.classList.add('midnight');
                        } else {
                            backgroundTopGradient.classList.add('dawnSunrise');
                        }
                }
                gradientDayNight()
            })
};


const weatherForecastData = (city) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`
        )
            .then((forecastResponse) => {
                return forecastResponse.json();
            })
            .then((result) => {
                if (result.cod !== '404') {     //If the user did NOT search for a city that does not exist

                const todaysDate = new Date().toString().split(' ')[0]; //Today's date in text form
                const filterData = result.list.filter(weatherDay => weatherDay.dt_txt.includes('12:00')); //Filters out the data at 12:00 every day
                
                filterData.forEach(date => { 
                const weekDay = new Date(date.dt * 1000).toString().split(' ')[0]; //All the five days dates' convertet from numbers to text
                    if (weekDay !== todaysDate) {
                        let {icon} = date.weather[0];
                        forecastWeekdays.innerHTML += `<p>${weekDay}</p>`
                        forecastIcon.innerHTML += `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="weather-icons">`
                        forecastTemp.innerHTML += `<p>${date.main.temp.toFixed(0)}°C</p>`
                        forecastWind.innerHTML += `<p>${date.wind.speed}m/s</p>`
                    }
                }); 


            } else {        //If the user DID search for a city that does not exist. Alerts user that the city cant be found. Then runs Stockholm again.
                alert('Oops, city not found! Check your spelling please.');
                todaysWeatherFeature('Stockholm');
                weatherForecastData('Stockholm');
            }
        })
};


const toggleSearchField = () => {
    //This just controls the toggling between opening and closing the search field
    const searchToggler = document.getElementById('search-toggler');
    searchToggler.classList.toggle('hidden');
    closeSearchMenu.classList.toggle('hidden');
    searchMenuBtn.classList.toggle('hidden');
};


const searchFunction = () => {
    //This is for storing the user input from the search and pushing it into our fetching weather function later on
    
    let searchedCity = inputField.value

        //Use the city searched and inject into ""fetchWeather""" function:
        //weather.fetchWeather(searchedCity); //Skriv om till den vi använder
        todaysWeatherFeature(searchedCity);
        weatherForecastData(searchedCity);

        //Clears field & hides the input field:
        inputField.value = "";

        //Reset the weather forecast:
        forecastWeekdays.innerHTML = "";
        forecastIcon.innerHTML = "";
        forecastWind.innerHTML = "";
        forecastTemp.innerHTML = "";
};


const getNextCity = () => {
    //Change default favorite city
    //Reset the weather forecast:
    forecastWeekdays.innerHTML = "";
    forecastIcon.innerHTML = "";
    forecastTemp.innerHTML = ""; 
    forecastWind.innerHTML = "";
    
        if (city === 'Stockholm') {
            todaysWeatherFeature('Madrid')
            weatherForecastData('Madrid');
            city = 'Madrid'
        } else if (city === 'Madrid') {
            todaysWeatherFeature('Singapore')
            weatherForecastData('Singapore');
            city = 'Singapore'
        } else if (city === 'Singapore') {
            todaysWeatherFeature('San Francisco')
            weatherForecastData('San Francisco');
            city = 'San Francisco'
        } else if (city === 'San Francisco') {
            todaysWeatherFeature('Cairo')
            weatherForecastData('Cairo');
            city = 'Cairo'
        } else if (city === 'Cairo') {
            todaysWeatherFeature('Sidney')
            weatherForecastData('Sidney');
            city = 'Sidney'
        } else if (city === 'Sidney') {
            todaysWeatherFeature('Bogota')
            weatherForecastData('Bogota');
            city = 'Bogota'
        } else {
            todaysWeatherFeature('Stockholm')
            weatherForecastData('Stockholm');
            city = 'Stockholm'
        }
};


// Start:
todaysWeatherFeature('Stockholm');
weatherForecastData('Stockholm');

//All global eventListeners
//Eventlistener to invoke getNextCity function
switchBtn.addEventListener('click', getNextCity) 
//Eventlistener to toggle search field:
searchMenuBtn.addEventListener('click', toggleSearchField)
closeSearchMenu.addEventListener('click', toggleSearchField)
//Eventlistener to search through enter key also
searchBtn.addEventListener('click', searchFunction)
//Eventlistener to search through enter key also
inputField.addEventListener('keyup', function (event) {
    if (event.key == "Enter") {
        searchFunction();
      }
    }
);