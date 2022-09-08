const cityName = document.getElementById('city-placeholder');
const cityTemp = document.getElementById('temp-placeholder');
const cityWeather = document.getElementById('weather-placeholder');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const weeklyTemp = document.getElementById('weekly-temperature-placeholder'); 
const body = document.querySelector('body'); 

let weeklyWeather;


fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae&?')
    .then(response => {
        return response.json()
    }) 
    .then((json) => {
        console.log(json);
        cityName.innerHTML = json.city.name;
        cityTemp.innerHTML = json.list[0].main.temp.toFixed(1);
        cityWeather.innerHTML = json.list[0].weather[0].description;
        const sunriseStart = new Date(json.city.sunrise);
        const sunsetStart = new Date(json.city.sunset);
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
        sunriseTime.innerHTML = sunriseStart.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'});
        sunsetTime.innerHTML = sunsetStart.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'});
        
if (json.list[0].weather[0].main.includes('Clouds')) {
            body.style.backgroundImage= `url('images/rain.jpeg')`; 
        } else if (json.list[0].weather[0].main.includes('Rain')) {
            body.style.backgroundImage= `url('images/rain.jpeg')`;
        } else if (json.list[0].weather[0].main.includes('Sun')) {
            body.style.backgroundImage= `url('images/rain.jpeg')`;
        } else if (json.list[0].weather[0].main.includes('Snow')) {
            body.style.backgroundImage= `url('images/rain.jpeg')`;
        } else {
            body.style.backgroundImage= `url('images/rain.jpeg')`;
        }


        weeklyWeather= json.list.filter(item => item.dt_txt.includes('12:00'))        

         weeklyTemp = weeklyWeather.map((day) => {
            let date = new Date(day.dt * 1000);
            let nameOfDay = date.toLocaleDateString('en-Us', {weekday: 'long'})
            let dailyTemperature = day.main.temp.toFixed(1)
           
             
            console.log(weeklyTemp)
            return weeklyTemp.innerHTML +=`
            <li>
            <span>${nameOfDay}</span>
            <span>${dailyTemperature}°C</span>
            </li>
            `   
           }) 

        })  
        .catch((error) => {
        console.log('caught error', error);  
        })
        

    

