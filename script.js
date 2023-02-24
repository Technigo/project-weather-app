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
const forecastWind = document.getElementById('forecastWind')
const sunriseText = document.getElementById('sunriseText');
const sunsetText = document.getElementById('sunsetText');
const freezing = document.getElementById('freezing-cold') 
const cold = document.getElementById('cold')
const mediumCold = document.getElementById('medium-cold')
const warm = document.getElementById('warm')
const hot = document.getElementById('hot')
const tempToday = document.getElementById('tempToday')
const cityName = document.getElementById('cityName')
const weatherDescription = document.getElementById('weatherDescription')
const mainIcon = document.getElementById('mainIcon')
const weatherFeature = document.getElementById('weatherFeature')


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
       /*  let round = Math.round(json.main.temp * 10 ) / 10; */
        console.log(json.main.temp.toFixed(0))
        cityName.innerText = `${json.name}`;
        tempToday.innerText += `${json.main.temp.toFixed(0)}`;
        weatherDescription.innerText += `${json.weather[0].description}`;
        mainIcon.innerHTML += `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="main-icon">`
    })
    .catch((err) => {
        console.log(`error caught:`, err)
    })


const getSunriseSunsetData = (city) => {
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
                    forecastTemp.innerHTML += `<p>${date.main.temp.toFixed(0)}°</p>`
                }
            }); 
        })
}

weatherForecastData();
 
//Learn how to get symbols from the api
//Learn how to get a search word to show an image from unsplash
   
const toggleSearchField = () => {
    //This just controls the toggling between opening and closing the search field
    const searchToggler = document.getElementById('search-toggler');
    searchToggler.classList.toggle('hidden');
    closeSearchMenu.classList.toggle('hidden');
    searchMenuBtn.classList.toggle('hidden');

    //Goes back to default after toggling
    getSunriseSunsetData(city);
}

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

const gardientWarmCold = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data.main.temp.toFixed(0))
            const value = (data.main.temp.toFixed(0))
            //GET TIME 
            if (value >= -20 && value <= -10) {
                freezing.media = '';
            } else if (value > -10 && value <= 0) {
                cold.media = '';
            } else if (value > 0.00 && value <= 10.00) {
                mediumCold.media = '';
            } else if (value > 10.00 && value <= 25.00) {
                warm.media = '';
            } else {
                hot.media = '';
            }
        })
}

gardientWarmCold();

const todaysWeatherStyle = () => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        const todaysWeather = data.weather[0].main
        const getTime = new Date().getHours();
        let sunriseTime = new Date(data.sys.sunrise).getHours();       
        let sunsetTime = new Date(data.sys.sunset).getHours();
        console.log(getTime)
        console.log(sunriseTime)
        console.log(sunsetTime)
        console.log(todaysWeather)
        if (getTime >= sunriseTime && getTime <= sunsetTime) {
            if (todaysWeather === 'Clear') {
                weatherFeature.innerHTML = `<img src="./images/peyman-farmani-pnoCjpuc_As-unsplash.jpeg" alt="image of sunny day" class="feature-image">`
            } else if (todaysWeather === 'Snow') {
                weatherFeature.innerHTML = `<img src="./images/gabriel-alenius-USXfF_ONUGo-unsplash.jpeg" alt="image of snowy landscape" class="feature-image">`
            } else if (todaysWeather === 'Rain') {
                weatherFeature.innerHTML = `<img scr="./images/jan-willem-FobwhDUgdrk-unsplash.jpeg" alt="image of rainy street" class="feature-image">`
            } else {
                weatherFeature.innerHTML = `<img scr="./images/daoudi-aissa-Pe1Ol9oLc4o-unsplash.jpeg" alt="image of cloudy sky" class="feature-image">`
            }
        } else {
            if (todaysWeather === 'Clear') {
                weatherFeature.innerHTML = `<img src="./images/peyman-farmani-pnoCjpuc_As-unsplash.jpeg" alt="image of sunny day" class="feature-image">`
            } else if (todaysWeather === 'Snow') {
                weatherFeature.innerHTML = `<img src="./images/gabriel-alenius-USXfF_ONUGo-unsplash.jpeg" alt="image of snowy landscape" class="feature-image">`
            } else if (todaysWeather === 'Rain') {
                weatherFeature.innerHTML = `<img scr="./images/jan-willem-FobwhDUgdrk-unsplash.jpeg" alt="image of rainy street" class="feature-image">`
            } else {
                weatherFeature.innerHTML = `<img scr="./images/daoudi-aissa-Pe1Ol9oLc4o-unsplash.jpeg" alt="image of cloudy sky" class="feature-image">`
            }
        }  
    })
}
  
        // DURING DAYTIME
/*         if (weatherOfTheDay === 'Clear') {
            icon.innerHTML += `<img src="icons/clear.svg"/>`
            weatherInStockholm.innerHTML += `Get your sunnies on. ${data.name} is looking rather great today.`
            console.log('clear')
        } else if (weatherOfTheDay === 'Rain') {
            icon.innerHTML += `<img src="icons/rain.svg">`
            weatherInStockholm.innerHTML = `Don't forget your umbrella. It's wet in ${data.name} today.`
            console.log('rain')
        } else {
            icon.innerHTML += `<img src="icons/cloud.svg">`
            weatherInStockholm.innerHTML = `Light a fire and get cosy. ${data.name} is looking grey today.`
            console.log('cloud')
        } */
//DURING NIGHT TIME

/* })} */

/* function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000)
}

console.log(getTimestampInSeconds)

todaysWeatherStyle() */

// Jag måste fråga min pojkvän om den här, vet inte hur jag ska få den att fungera




// Image based on time of the day
/* var d = new Date();
var time = d.getHours();
var div = document.getElementById('time');
if (time < 12) {
    div.style.backgroundImage = "url('morning image')";
}
if (time >= 12 && time < 3) {
    div.style.backgroundImage = "url('afternoon image')";
}
if (time > 3) {
    div.style.backgroundImage = "url('http://a1.dspncdn.com/media/692x/da/dc/4e/dadc4ed5117d4a8cc582199bb3ac9c68.jpg')";
} */

todaysWeatherStyle ()