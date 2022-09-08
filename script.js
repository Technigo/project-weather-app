
const cityName = document.getElementById('city-placeholder');
const cityTemp = document.getElementById('temp-placeholder');
const cityWeather = document.getElementById('weather-placeholder');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const weeklyTemp = document.getElementById('weekly-temperature-placeholder'); 
const body = document.querySelector('body'); 
const todaysIcon = document.getElementById('todays-icon'); 
let weeklyWeather;
let dailyIcon;


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
        sunriseTime.innerHTML = sunriseStart.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'});
        sunsetTime.innerHTML = sunsetStart.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'});
        //Actual weather & background picture
        //clouds
        if (json.list[0].weather[0].main.includes('Clouds')) {
            body.style.backgroundImage= `url('images/rain.jpeg')`; 
            todaysIcon.innerHTML=
                `<img src=\'./images/clouds.png'>
                <h3>It is rather gray today in ${json.city.name}.</h3>`
        // rain
        } else if (json.list[0].weather[0].main.includes('Rain')) {
            body.style.backgroundImage= `url('images/rain.jpeg')`;
            todaysIcon.innerHTML=
                `<img src=\'images/umbrella.png'>
                <h3>Don't forget you umbrella. It's raining in ${json.city.name}.</h3>` 
        //clear
        } else if (json.list[0].weather[0].main.includes('Clear')) {
            body.style.backgroundImage= `url('images/rain.jpeg')`;
            todaysIcon.innerHTML=
                `<img src=\'./images/sun.png'>
                <p>Clear skies in ${json.city.name}.</p>`
        //snow
        } else if (json.list[0].weather[0].main.includes('Snow')) {
            body.style.backgroundImage= `url('images/rain.jpeg')`;
            todaysIcon.innerHTML=
                `<img src=\'images/snow.png'>
                <h3>It is snowing in ${json.city.name}.</h3>` 
        // other
        } else {
            body.style.backgroundImage= `url('images/rain.jpeg')`;
            todaysIcon.innerHTML=
                `<img src=\'images/sun-cloud.png'>
                <h3>It is a cloudy ${json.city.name} now.<h3>` //Vi måste kolla det här ordentligt. utifrån alla conditions som finns.
        }
        weeklyWeather = json.list.filter(item => item.dt_txt.includes('12:00'))        
        console.log (weeklyWeather)
        weeklyWeather = weeklyWeather.map((day) => {
           let date = new Date(day.dt * 1000);
           let nameOfDay = date.toLocaleDateString('en-Us', {weekday: 'long'})
           let dailyTemperature = day.main.temp.toFixed(1);
            if (day.weather[0].main.includes('Clouds')) {
                dailyIcon = `<img src=\'images/cloud-icon.png'>`
            } else if (day.weather[0].main.includes('Rain')) {
                dailyIcon = `<img src=\'images/rain-icon.png'>`
            } else if (day.weather[0].main.includes('Clear')) {
                dailyIcon = `<img src=\'images/sun-icon.png'>`
            } else if (day.weather[0].main.includes('Snow')) {
            } else {dailyIcon = `<img src=\'images/snow-icon.png'>`
            }
            
            console.log(weeklyTemp)
            return weeklyTemp.innerHTML +=`
                <li>
                    <span>${nameOfDay}</span>
                    <span>${dailyIcon}</span>
                    <span>${dailyTemperature}°C</span>
                </li>
            `   
          }) 
/*         weeklyTemp = weeklyWeather.map((day) => {
            let date = new Date(day.dt * 1000);
            let nameOfDay = date.toLocaleDateString('en-Us', {weekday: 'long'});
            let dailyTemperature = day.main.temp.toFixed(1);
            dailyIcon = `<img src=\'images/${day.weather[0].main}.png'>`;
            return (
                weeklyTemp.innerHTML +=`
                <li>
                    <span>${nameOfDay}</span>
                    <span>${dailyIcon}</span>
                    <span>${dailyTemperature}°C</span>
                </li>
           `)   
        }) */
           }) 
        .catch((error) => {
        console.log('caught error', error);  
        })
        
    
