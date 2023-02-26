
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
const sunriseText = document.getElementById('sunriseText');
const sunsetText = document.getElementById('sunsetText');

const tempToday = document.getElementById('tempToday')
const cityName = document.getElementById('cityName')
const weatherDescription = document.getElementById('weatherDescription')
const mainIcon = document.getElementById('mainIcon')
const weatherFeature = document.getElementById('weatherFeature')


//Variables we can use later to automate API-fethcing:
const apiKey = 'c480de5f69ca98d1993a4dae3213642e';
let city = 'Stockholm';
// Use: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`


const getMainWeather = (city) => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(`json:`, json)
        let { icon } = json.weather[0];
    
        console.log(json.main.temp.toFixed(0))
        cityName.innerText = `${json.name}`;
        tempToday.innerText = `${json.main.temp.toFixed(0)}`;
        weatherDescription.innerText = `${json.weather[0].description}`;
        mainIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="main-icon">`
    })

    //MATILDA! HÄR SKA JAG LÄGGA MIN FUNKTION OCH EVENTLISTERNER FÖR ATT KUNDA SKIFTA MELLAN 3 OLIKA STÄDER! JAG ÄR INTE KLAR OCH VÅGAR INTE MERGA DET!
    .catch((err) => {
        console.log(`error caught:`, err)
    })
}

const getNextCity = () => {
    if (city === 'Stockholm') {
        getMainWeather('Madrid')
        todaysWeatherFeature('Madrid')
        city = 'Madrid'
    } else if (city === 'Madrid') {
        getMainWeather('Singapore')
        todaysWeatherFeature('Singapore')
        city = 'Singapore'
    } else if (city === 'Singapore') {
        getMainWeather('San Francisco')
        todaysWeatherFeature('San Francisco')
        city = 'San Francisco'
    } else {
        getMainWeather('Stockholm')
        todaysWeatherFeature('Stockholm')
        city = 'Stockholm'
    }
}


        
const weatherForecastData = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=c480de5f69ca98d1993a4dae3213642e`)
        .then((forecastResponse) => {
            return forecastResponse.json();
        })
        .then((result) => {
            const todaysDate = new Date().toString().split(' ')[0]; //Today's date in text form
            console.log(todaysDate)
            
            const filterData = result.list.filter(weatherDay => weatherDay.dt_txt.includes('12:00')); //Filters out the data at 12:00 every day
            console.log(filterData)
            
            filterData.forEach(date => { 
            const weekDay = new Date(date.dt * 1000).toString().split(' ')[0]; //All the five days dates' convertet from numbers to text
                if (weekDay !== todaysDate) {
                    let {icon} = date.weather[0];
                    forecastWeekdays.innerHTML += `<p>${weekDay}</p>`
                    forecastIcon.innerHTML += `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="weather-icons">`
                    forecastWind.innerHTML += `<p>${date.wind.speed}m/s</p>`
                    forecastTemp.innerHTML += `<p>${date.main.temp.toFixed(0)}°C</p>`
                }
            }); 
        })
}
 
//Learn how to get symbols from the api
//Learn how to get a search word to show an image from unsplash
   
const toggleSearchField = () => {
    //This just controls the toggling between opening and closing the search field
    const searchToggler = document.getElementById('search-toggler');
    searchToggler.classList.toggle('hidden');
    closeSearchMenu.classList.toggle('hidden');
    searchMenuBtn.classList.toggle('hidden');
}

const searchFunction = () => {
    //This is for storing the user input from the search and pushing it into our fetching weather function later on
    
    let searchedCity = inputField.value
    console.log(`searchedCity: ${searchedCity}`)

        //Use the city searched and inject into ""fetchWeather""" function:
        //weather.fetchWeather(searchedCity); //Skriv om till den vi använder
        todaysWeatherFeature(searchedCity);
        getMainWeather(searchedCity);
        //weatherForecastData(searchedCity);      //Uncomment när allt är fixat
        todaysWeatherFeature(searchedCity);

        //Clears field & hides the input field:
        inputField.value = "";
}

/* const getSunriseSunsetData = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            const sunriseTime = new Date(json.sys.sunrise * 1000);       //Gives us the time in "human" form (as a date), mult. by 1000 to get it in ms.
            const sunriseShort = sunriseTime.toLocaleTimeString(['en-GB'], { timeStyle: 'short' });        //Transforms it into just the Hour/minutes. Select the short variant to get the time with minutes and not seconds.
            const sunsetTime = new Date(json.sys.sunset * 1000);
            const sunsetShort = sunsetTime.toLocaleTimeString(['en-GB'], { timeStyle: 'short' });
            console.log(sunriseTime)
            console.log(sunsetTime)
            //Modifying the HTML based on our input:
            sunriseText.innerHTML = `<p>sunrise</p>
                                        <p class="time-data">${sunriseShort}</p>`;
            sunsetText.innerHTML = `<p>sunset</p>
                                    <p class="time-data">${sunsetShort}</p>`;
        })
        .catch((err) => {
            console.log(`error caught:`, err)
        })
} */

const todaysWeatherFeature = (city) => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {

        // Get sunrise and sunset time
        console.log(`sunrise:`, json.sys.sunrise)
        console.log(`timezone:`, json.timezone)

      /*   const getTimeZone = (json.timezone).toLocaleTimeString(['en-GB'], { timeStyle: 'short' });
        console.log(getTimeZone) */
        const sunriseTime = new Date((json.sys.sunrise+json.timezone) * 1000);       //Gives us the time in "human" form (as a date), mult. by 1000 to get it in ms.
        sunriseTime.setMinutes(sunriseTime.getMinutes() + sunriseTime.getTimezoneOffset())
        const sunriseShort = sunriseTime.toLocaleTimeString(['en-GB'], { timeStyle: 'short' });        //Transforms it into just the Hour/minutes. Select the short variant to get the time with minutes and not seconds.
        const sunsetTime = new Date ((json.sys.sunset+json.timezone) * 1000);
        sunsetTime.setMinutes(sunsetTime.getMinutes() + sunsetTime.getTimezoneOffset())
        const sunsetShort = sunsetTime.toLocaleTimeString(['en-GB'], { timeStyle: 'short' }); 
        console.log(sunriseTime)
        console.log(sunsetTime)
        //Modifying the HTML based on our input:
        sunriseText.innerHTML = `<p>sunrise</p>
                                        <p class="time-data">${sunriseShort}</p>`;
        sunsetText.innerHTML = `<p>sunset</p>
                                    <p class="time-data">${sunsetShort}</p>`;

        const featureImage = document.querySelector('.feature-image');
       

        const todaysWeather = json.weather[0].main
        
        const getTime = new Date()
        getTime.setMinutes(getTime.getMinutes() + getTime.getTimezoneOffset())
        getTime.setSeconds(getTime.getSeconds() + json.timezone)
        
        const currentTime = getTime.getHours();
        
        const sunriseTimeHour = sunriseTime.getHours();       
        const sunsetTimeHour = sunsetTime.getHours();
        console.log(`currentTime:`, currentTime)
     

        console.log(sunriseTimeHour)
        console.log(sunsetTimeHour)
        if (currentTime >= sunriseTimeHour && currentTime <= sunsetTimeHour) {
            //During daytime
            // OBS! Lägg eventuellt in fler olika typer av väder
            if (todaysWeather === 'Clear') {
                featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1617800809985-a4f937ede1b1?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcyNjMzNTI&ixlib=rb-4.0.3&q=80')"
            } else if (todaysWeather === 'Snow') {
                featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1548777123-e216912df7d8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcyNTcyNjE&ixlib=rb-4.0.3&q=80')"
            } else if (todaysWeather === 'Rain') {
                featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1541679842955-ff256fc8774e?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcyNjMxNjI&ixlib=rb-4.0.3&q=80')"
            } else {
                featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1424111113808-b7be56a9f3d6?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcyNTczNTA&ixlib=rb-4.0.3&q=80')"
            }
        } else {
            //During nighttime
            if (todaysWeather === 'Clear') {
                featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1516571748831-5d81767b788d?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcxNjg0NTk&ixlib=rb-4.0.3&q=80')"
            } else if (todaysWeather === 'Snow') {
                featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1514579683945-ff322fc53bb1?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcyNjI4MzA&ixlib=rb-4.0.3&q=80')"
            } else if (todaysWeather === 'Rain') {
                featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1511294952778-165d813e9eeb?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcyNTc1MDA&ixlib=rb-4.0.3&q=80')"
            } else {
                featureImage.style.backgroundImage = "url('https://images.unsplash.com/photo-1499578124509-1611b77778c8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzcyNjAxOTY&ixlib=rb-4.0.3&q=80')"
            };
        }
        // ALLA OLIKA GRADIENTS ÄR INTE KLARA ÄN MEN SKA JOBBA PÅ DET IMORGON. FUNKTIONEN FUNKAR DOCK (TROR JAG)
        const gradientDayNight = () => {
            console.log(`banan:`, currentTime)
                const backgroundTopGradient = document.getElementById('backgroundTopGradient');

                const gradientStyle = ['morning','midday','afternoon','duskSunset','evening','midnight','dawnSunrise']
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
}

todaysWeatherFeature('Stockholm');
getMainWeather('Stockholm');
/* getSunriseSunsetData('Stockholm'); */
weatherForecastData('Stockholm');


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