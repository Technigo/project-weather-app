const header = document.getElementById('header')
const weatherDescription = document.getElementById('weatherDescription')
const fiveDaysForecast = document.getElementById('fiveDaysForecast')
const weatherImg = document.getElementById('weatherImg')
const container = document.getElementById('container')
const weekdays = ["sun","mon","tue","wed","thu","fri","sat"];

let containerToggle = document.querySelector('.container')

fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=fb125bc213d8ee5c4a432b3a2b24aecf")
    .then((response) => {
        return response.json()
    })

    .then((json) => {

        const sunRise = new Date (json.sys.sunrise);
        let sunRiseHoursAndMinuits = sunRise.getHours() + ':' + sunRise.getMinutes();
        console.log(sunRiseHoursAndMinuits); 

        const sunSet = new Date (json.sys.sunset * 1000);
        let sunSetHoursAndMinuits = sunSet.getHours() + ':' + sunSet.getMinutes();
        console.log(sunSetHoursAndMinuits);

        const weathers = json.weather
        weathers.map((weather) => {

        header.innerHTML = `
        <h3>${weather.description} | ${(json.main.temp).toFixed(0)}°</h3>
        <h3> Sunrise ${sunRiseHoursAndMinuits}</h3>
        <h3> Sunset ${sunSetHoursAndMinuits}</h3>
        `

        //different actions depending on weather
        switch(weather.main) {
            case 'Clouds':  // if (x === 'value1')
                console.log('cloudy');
                weatherImg.innerHTML += `
                <img src="./Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="">`
                weatherDescription.innerHTML += `
                <h1>The sky is 50 shades of grey in ${json.name}.  </h1>
                `;
                containerToggle.classList.toggle('container-cloudy');
                console.log(weatherToggle)
            break;
        
            case 'Rain':  // if (x === 'value2')
                console.log('rainy')
                console.log(weather.description)
                weatherImg.innerHTML += `
                <img src="./Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="">`       
                weatherDescription.innerHTML += `
                <h1>Drip drop. It's raining in ${json.name}. Don't forget your umbrella.  </h1>
                `
                containerToggle.classList.toggle('container-rainy');
                console.log(containerToggle)
            break;
        
            default:
                console.log('sunny')
                weatherImg.innerHTML += `
                <img src="./Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="">`
                weatherDescription.innerHTML += `
                <h1>The sky is clear as "korvspad" in ${json.name}. </h1>
                </div>
                `
                containerToggle.classList.toggle('container-clear');
                console.log(containerToggle)
            break;
        }

    })
 })

//WEATHER-FORECAST FEATURE 


fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=fb125bc213d8ee5c4a432b3a2b24aecf")
    .then((response) => {
        return response.json()
    })

    .then((json) => {
        console.log(json)
        
        //Filters the json to an array with only the data from 12:00 each day (5 days in total).
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        console.log(filteredForecast)

        //weather description of each day
       filteredForecast.map((day)=>{
            console.log(day.weather[0].description)

                let weekday = new Date(day.dt_txt).getDay();
                console.log(weekdays[weekday]);


                fiveDaysForecast.innerHTML += `
                <div id="forecastSection" class="forecast-section">
                
                    <div id="weekdaysection" class="weekday-section">
                         <h3> ${weekdays[weekday]} </h3>
                    </div>
                    
                    <div id="temperature" class="temperature">
                    <h3>${(day.main.temp).toFixed(0)}°</h3>
                    </div>

                </div>
                `   
            })
        })
