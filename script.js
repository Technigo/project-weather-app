
/* //trying fetch to see if connection between HTML is working, we can choose another API later
fetch ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=399ae731e6b36c8272a3566b6ed57e5c')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
    })
 */

// search bar value + display 
const searchDisplay = document.getElementById("search-display");
const cityInput = document.getElementById("city-input");
const forecastMessage = document.getElementById("id");
const cityName = document.getElementById("city-name");
const weeklyForecast = document.getElementById("weather-forecast");


let weeklyTemp;


//the city name + error display when input a city name 
cityInput.addEventListener("change", (event)=> {
    console.log(event);
    fetch("https://api.openweathermap.org/data/2.5/weather?q=${event.cityInput.value}&units=metric&APPID=399ae731e6b36c8272a3566b6ed57e5c")
    .then(response => {
        if(response.status == 200) {
            return response.json();
        } else {
            alert("please enter a solid city name");
        }
    })
        .then(readableResponse=> {
            cityName.innerHTML = `City: ${readableResponse.city.name}`;   
            //here can add the main information, make it dynamic
        });

});  




   //display week forecast for the chosen city, in this case Stockholm
    const forecast =(cityInput) => {
        //here fetching forecast 
        fetch ("https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}S&units=metric&APPID=399ae731e6b36c8272a3566b6ed57e5c")
        .then(response => response.json())
        .then(data => {
            //filter out object only with updates at 12:00
            const filteredForecast = data.list.filer(item => item.dt_txt.includes("12:00"));
            console.log(filteredForecast);

            weeklyTemp = filteredForecast.map((day) => {      
                let date = new Date(day.dt * 1000);
                let nameOfDay = date.toLocaleDateString({weekday: 'short'});
                let dailyTemperature = date.main.temp.toFixed(0);

                dailyIcon = `<img src=\'images/${day.weather[0].main}.png'>`; 
                                        
                weeklyForecast.innerHTML +=`
                    <li>
                        <p>${nameOfDay}</p>
                        <p class="daily-icon">${dailyIcon}</p>
                        <p class="daily-temperature">${dailyTemperature}°C</p>
                    </li>
                `;
               });
        }
    }

    

 /*    const getDayName = (weekInShort) => {
        const weekInShort= ["Mon", "Tue", "Wed", "Thur", "Fri","Sat", "Sun"];
        return weekInShort[date];
     } */