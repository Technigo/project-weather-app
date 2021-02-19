// Global variables
const API_KEY = '4b089f476bd9961f1c727a0625472b1f'
const summaryContainer = document.getElementById('summary-container');
const fiveDaysForecast = document.getElementById('5-days-forecast');
const imageContainer = document.getElementById('image-container');

fetch(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        const sunriseTime = new Date(json.sys.sunrise * 1000);
        const sunsetTime = new Date(json.sys.sunset * 1000);
        const sunriseReadableTime = sunriseTime.toLocaleTimeString([], { timeStyle: 'short'})
        const sunsetReadableTime = sunsetTime.toLocaleTimeString([], { timeStyle: 'short'})
        const todayDay = new Date(json.dt * 1000); 
        const todayDayNames = todayDay.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'short'});
        const weather = json.weather[0].main;

        city.innerHTML = `${json.name}`;

        summaryContainer.innerHTML += `
            <section class = "summary-container">
                <div class = "summary-left-side">
                    <p class = "summary-text">${todayDayNames}</p>
                    <p class = "summary-text">${weather} | ${Math.floor(json.main.temp)}°C</p>
                    <p class = "summary-text">Sun Up: ${sunriseReadableTime}</p>
                    <p class = "summary-text">Sun Down: ${sunsetReadableTime}</p>
                </div>
            </section>
        `;

        console.log('hellohello');

        //Weather Icon
        const weatherImage = () => {
            if (weather === "Clouds") {
                imageContainer.innerHTML = `
                <img src="./noun_Cloud_1188486.svg">
                `;
            } else if (weather === "Rain") {
                imageContainer.innerHTML = `
                <img src="./noun_Umbrella_2030530.svg">
                `;
            } else if (weather === "Clear sky") {
                imageContainer.innerHTML = `
                <img src="./noun_Sunglasses_2055147.svg">
                `;
            } else if (weather === "Snow") {
                imageContainer.innerHTML = `
                <img class = "icon" src="./snowflake.svg">
                `; 
             } else if (weather === "Mist") {
                imageContainer.innerHTML = `
                <img class = "icon" src="./haze.png">
                `;        
            } else {
                imageContainer.innerHTML = `
                <img class = "icon" src="./rainbow.png">
                `;
            }
        }
        weatherImage();

        city.innerHTML = `
        <h1>${json.name}</h1>
        `;
    });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
        })
        .then((json) => {
                // A variable that saves information each day at 12.00
            const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));

            // A loop for the filteredForecast variable
            filteredForecast.forEach((item) => {
                //A variable that saves the date and time each day
                const weekDays = new Date(item.dt_txt);
                // A variable that svaes a shorter version of the date each day
                const weekDayNames = weekDays.toLocaleDateString('en-US', {weekday: 'short'});
                // A variable that saves the temperature each day
                const temperature = Math.floor(item.main.temp);
                 // A variable accordion answer: weather description
                const weatherDescription = item.weather[0].description;
            
                const feelsLike= item.main.feels_like;
    

            // INNER HTML
            fiveDaysForecast.innerHTML += `
                <div class = "accordion-header">
                    <div class = "weekday-left">
                        <p>${weekDayNames}</p>
                    </div>
                    <div class = "temp-right">
                        <p> ${temperature}°C</p>
                    </div>
                </div>
                <div class = "accordion-content">
                        <p>${weatherDescription}, feels like ${feelsLike} </p>
                </div>
            `;   

        //     ACCORDION
            function toggle() {
                this.classList.toggle('open')
            }
            const accordionContent = document.querySelectorAll(".accordion-header");
            accordionContent.forEach(item =>{
                item.onclick = toggle
            })
        });

    });

    





