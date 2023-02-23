const testy = document.getElementById('testy');
const searchMenuBtn = document.getElementById('searchMenuBtn');
const closeSearchMenu = document.getElementById('closeSearchMenu');
const searchBtn = document.getElementById('searchBtn');
const inputField = document.getElementById('inputField');

const weatherForecast = document.getElementById('weatherForecast')
const forecastWeekdays = document.getElementById('forecastWeekdays')
const forecastDescription = document.getElementById('forecastDescription')
const forecastTemp = document.getElementById('forecastTemp')
const forecastFeelsLike = document.getElementById('forecastFeelsLike')
const sunriseText = document.getElementById('sunriseText');
const sunsetText = document.getElementById('sunsetText');


//Variables we can use later to automate API-fethcing:
const apiKey = 'c480de5f69ca98d1993a4dae3213642e';
let city = 'Stockholm';
// Use: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`

//Our testing fetch:
fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm&units=metric&APPID=c480de5f69ca98d1993a4dae3213642e')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(`json:`, json)

        // Store the rounded number in a variable called "round"
        let round = Math.round(json.main.temp * 10 ) / 10;

        testy.innerHTML = `<p>City: ${json.name}</p>`;
        testy.innerHTML += `<p>Temperature: ${round} °C</p>`;
        testy.innerHTML += `<p>Weather: ${json.weather[0].description}</p>`;
    })
    .catch((err) => {
        console.log(`error caught:`, err)
    })


const getSunriseSunsetData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            //console.log(`json:`, json)

            //const sunriseUnix = json.sys.sunrise;                   // Unix timestamp
            const sunriseTime = new Date(json.sys.sunrise * 1000);       //Gives us the time in "human" form (as a date), mult. by 1000 to get it in ms.
            const sunriseShort = sunriseTime.toLocaleTimeString([], { timeStyle: 'short' }).replace("AM", "").replace("PM", "");        //Transforms it into just the Hour/minutes and AM/PM. Select the short variant to get the time with minutes and not seconds.
            const sunsetTime = new Date(json.sys.sunset * 1000);
            const sunsetShort = sunsetTime.toLocaleTimeString([], { timeStyle: 'short' }).replace("AM", "").replace("PM", "");          //Tar bort AM och PM, kolla om det finns bättre sätt.

            //Modifying the HTML based on our input:
            sunriseText.innerHTML += `<p>sunrise</p>
                                        <p class="time-data">${sunriseShort}</p>`;
            sunsetText.innerHTML += `<p>sunset</p>
                                    <p class="time-data">${sunsetShort}</p>`;
        })
        .catch((err) => {
            console.log(`error caught:`, err)
        })
}

getSunriseSunsetData();


const weatherForecastData = () => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=c480de5f69ca98d1993a4dae3213642e')
        .then((forecastResponse) => {
            return forecastResponse.json();
        })
        .then((result) => {
            const todaysDate = new Date().toString().split(' ')[0]; //Todays date ine text form
            console.log(todaysDate)
            
            const filterData = result.list.filter(weatherDay => weatherDay.dt_txt.includes('12:00')); //Filters out the data at 12:00 every day
            console.log(filterData)
            
            filterData.forEach(date => { 
            const weekDay = new Date(date.dt * 1000).toString().split(' ')[0]; //All the five days dates' convertet from numbers to text
                if (weekDay !== todaysDate) {
                    forecastWeekdays.innerHTML += `<p>${weekDay}</p>`
                    forecastDescription.innerHTML += `<p>${date.weather[0].description}</p>`
                    forecastTemp.innerHTML += `<p>${date.main.temp.toFixed(0)}°</p>`
                    forecastFeelsLike.innerHTML += `<p>${date.main.feels_like.toFixed(0)}°</p>`
                }
            }); 
        })
}

weatherForecastData();
 
//Learn how to get symbols from the api
//Learn how to get a search word to show an image from unsplash
   
const toggleSearchField = () => {
    console.log('Matilda testar toggle')

    const searchToggler = document.getElementById('search-toggler');
    searchToggler.classList.toggle('hidden');
    closeSearchMenu.classList.toggle('hidden');
    searchMenuBtn.classList.toggle('hidden');
    //closeSearchMenu.classList.add('hidden');

}

const searchFunction = () => {
    console.log('Matilda testar search')
    
    let searchedCity = inputField.value
    console.log(`searchedCity: ${searchedCity}`)

        //Use the city searched and inject into ""fetchWeather""" function:
        //weather.fetchWeather(searchedCity); //Skriv om till den vi använder

        //Clears field & hides the input field:
        inputField.value = "";
}

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
