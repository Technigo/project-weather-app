const testy = document.getElementById('testy');
const searchMenuBtn = document.getElementById('searchMenuBtn');
const closeSearchMenu = document.getElementById('closeSearchMenu');
const searchBtn = document.getElementById('searchBtn');
const inputField = document.getElementById('inputField');

const weatherForecast = document.getElementById('weatherForecast')
const forecastWeekdays = document.getElementById('forecastWeekdays')
const forecastIcon = document.getElementById('forecastIcon')
const forecastDescription = document.getElementById('forecastDescription')
const forecastTemp = document.getElementById('forecastTemp')
const forecastFeelsLike = document.getElementById('forecastFeelsLike')
const sunriseText = document.getElementById('sunriseText');
const sunsetText = document.getElementById('sunsetText');
const freezing = document.getElementById('freezing-cold') 
const cold = document.getElementById('cold')
const mediumCold = document.getElementById('medium-cold')
const warm = document.getElementById('warm')
const hot = document.getElementById('hot')
const mainIcon = document.getElementById('mainIcon')

//Variables we can use later to automate API-fethcing:
const apiKey = 'c480de5f69ca98d1993a4dae3213642e';
let city = 'Stockholm';
// Use: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`


fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=c480de5f69ca98d1993a4dae3213642e')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(`json:`, json)
        let { icon } = json.weather[0];
        // Store the rounded number in a variable called "round"
        let round = Math.round(json.main.temp * 10 ) / 10;

        testy.innerHTML = `<p>City: ${json.name}</p>`;
        testy.innerHTML += `<p>Temperature: ${round} °C</p>`;
        testy.innerHTML += `<p>Weather: ${json.weather[0].description}</p>`;
        mainIcon.innerHTML += `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="weather-icons">`
    })
    .catch((err) => {
        console.log(`error caught:`, err)
    })

<<<<<<< HEAD
const getSunriseSunsetData = () => {
=======

const getSunriseSunsetData = (city) => {
>>>>>>> f7b9199ebf8250fc63f55767531af1cc2748b7a9
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            //console.log(`json:`, json)

            const sunriseTime = new Date(json.sys.sunrise * 1000);       //Gives us the time in "human" form (as a date), mult. by 1000 to get it in ms.
            const sunriseShort = sunriseTime.toLocaleTimeString([], { timeStyle: 'short' }).replace("AM", "").replace("PM", "");        //Transforms it into just the Hour/minutes and AM/PM. Select the short variant to get the time with minutes and not seconds.
            const sunsetTime = new Date(json.sys.sunset * 1000);
            const sunsetShort = sunsetTime.toLocaleTimeString([], { timeStyle: 'short' }).replace("AM", "").replace("PM", "");          //Tar bort AM och PM, kolla om det finns bättre sätt.

            //Modifying the HTML based on our input:
            sunriseText.innerHTML = `<p>sunrise</p>
                                        <p class="time-data">${sunriseShort}</p>`;
            sunsetText.innerHTML = `<p>sunset</p>
                                    <p class="time-data">${sunsetShort}</p>`;
        })
        .catch((err) => {
            console.log(`error caught:`, err)
        })
}



const weatherForecastData = () => {
<<<<<<< HEAD
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${apiKey}`)
=======
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=c480de5f69ca98d1993a4dae3213642e`)
>>>>>>> f7b9199ebf8250fc63f55767531af1cc2748b7a9
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
                    forecastTemp.innerHTML += `<p>${date.main.temp.toFixed(0)}°</p>`
                    forecastFeelsLike.innerHTML += `<p>${date.main.feels_like.toFixed(0)}°</p>`
                }
            }); 
        })
}

weatherForecastData();
 
//Learn how to get symbols from the api
//Learn how to get a search word to show an image from unsplash
<<<<<<< HEAD
=======
   
const toggleSearchField = () => {
    //This just controls the toggling between opening and closing the search field
    const searchToggler = document.getElementById('search-toggler');
    searchToggler.classList.toggle('hidden');
    closeSearchMenu.classList.toggle('hidden');
    searchMenuBtn.classList.toggle('hidden');
>>>>>>> f7b9199ebf8250fc63f55767531af1cc2748b7a9

    //Goes back to default after toggling
    getSunriseSunsetData(city);
}

<<<<<<< HEAD

const gardientWarmCold = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then((response) => {
        return response.json();
        })
        .then((data) => {
        console.log(data.main.temp.toFixed(0))
            const value = (data.main.temp.toFixed(0))
            if (value >= -20 && value <= -10 ) {
                cold.media = '';   
            } if (value > -10 && value <= 0) {
                cold.media = ''; 
            } if (value > 0.00 && value <= 10.00) {
                cold.media = '';    
            } if (value > 10.00 && value <= 25.00) {
                cold.media = ''; 
            } else {
                cold.media = ''; 
            }         
})
}

gardientWarmCold()
=======
const searchFunction = () => {
    //This is for storing the user input from the search and pushing it into our fetching weather function later on
    
    let searchedCity = inputField.value
    console.log(`searchedCity: ${searchedCity}`)

        //Use the city searched and inject into ""fetchWeather""" function:
        //weather.fetchWeather(searchedCity); //Skriv om till den vi använder
        getSunriseSunsetData(searchedCity);
        //weatherForecastData(searchedCity);

        //Clears field & hides the input field:
        inputField.value = "";
}

getSunriseSunsetData(city);


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
>>>>>>> f7b9199ebf8250fc63f55767531af1cc2748b7a9
