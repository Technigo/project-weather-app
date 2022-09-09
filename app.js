//5 day forecast 
//const cityInput = document.getElementById("city-input");
const searchDisplay = document.getElementById("search-display");
const cityInput = document.getElementById("city-input");
const forecastMessage = document.getElementById("id");
const cityName = document.getElementById("city-name");
const weeklyForecast = document.getElementById("weather-forecast");

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
            cityName.innerHTML = `${readableResponse.name}`;
        });

}); 


//test - fetching Stockholm's min + max temp each day for 5 days 
//for improvement later, change Stockholm,Sweden to ${selected variable}

//attempt1
/* fetch ('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=399ae731e6b36c8272a3566b6ed57e5c')
    .then(response => response.json())
    .then(data => {
        for (i=0; i<7; i++){
            weeklyForecast.innerHTML = `Number(data.list[i].main.temp.toFixed(1)`;
        }
    }); */

   
   


   //display week forecast for the chosen city, in this case Stockholm
    const forecast =(city) => {
        let city = "Stockholm";
        //here fetching forecast 
        fetch ('https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=399ae731e6b36c8272a3566b6ed57e5c')
            .then(response => response.json())
            .then(forecastData=> {
                console.log(forecastData);
                filterForecast = forecastData.list.filter(daily=> 
                    daily.dt_txt.includes("12:00:00"));
                    weeklyForecast.innerHTML=""; // display "" in default

                    filterForecast.forEach(daily =>{
                        const weeklyTemp = daily.list.main.temp.toFixed(0);
                        const weekInShort= ["Mon", "Tue", "Wed", "Thur", "Fri","Sat", "Sun"];
                    })

                    let day = new Date();
                    let currentDay = day.getDate();
                    theNextDay = currentDay+1;

                   /*  for (i=0; i<7; i++){
                        weeklyForecast.innerHTML = `Number(data.list[i].main.temp.toFixed(1)`;
                    } */
                    
                    weeklyForecast.innerHTML = `
                    <div id="forecast-display">
                        <p> days display</p>
                        <p> ${weeklyTemp}ºC</p> 
                    </div>
                    `
            }); 
    }

    weather(city);

    
