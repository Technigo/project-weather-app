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
        const todayDay = new Date(json.dt * 1000); // Todays date
        const todayDayNames = todayDay.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'short'}); // Todays date in short string version
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

        const weatherImage = () => {
            if (weather === "Clouds") {
                imageContainer.innerHTML = `
                <img src="./noun_Cloud_1188486.svg">
                `;
            } else if (weather === "Rain") {
                imageContainer.innerHTML = `
                <img src="./noun_Umbrella_2030530.svg">
                `;
            } else if (weather === "Sun") {
                imageContainer.innerHTML = `
                <img src="./noun_Sunglasses_2055147.svg">
                `;
            } else {
                imageContainer.innerHTML = `
                <img class = "rainbow" src="./rainbow.png">
                `;
            }
    
        }

        weatherImage();

        city.innerHTML = `
        <h1>${json.name}</h1>
        `;
    });

 // <div class = "summary-right-side">
                //     <p class = "summary-text">${json.main.humidity} Humidity</p>
                //     <p class = "summary-text">${json.wind.speed} Wind</p>
                // </div>


    

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`)
    .then((response) => {
        return response.json();
        })
        .then((json) => {
                // A variable that saves information each day at 12.00
            const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));
            console.log(filteredForecast)
            console.log(filteredForecast[0].weather[0].description)

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
                console.log(weatherDescription);

                

            // INNER HTML
            fiveDaysForecast.innerHTML += `
            <article class = "five-days-container">
                <div class = "accordion-header" id = "accordionHeader">
                    <div class = "weekday-left">
                        <p>${weekDayNames}</p>
                    </div>
                    <div class = "temp-right">
                        <p> ${temperature}°C</p>
                    </div>
                </div>
                <div class = "accordion-content" id = "accordionContent">
                    <p>${weatherDescription}</p>
                </div>
            </article>
            `;   

            // ACCORDION
            function toggle() {
                this.classList.toggle("open")
            }

            document.getElementById("accordionHeader").onclick = toggle
            const accordionContent = document.getElementById("accordionContent");
        });

    });

    // function toggle() {
    //     this.classList.toggle("open")
    //   }
      
    //   document.getElementById("question-1").onclick = toggle
    //   document.getElementById("question-2").onclick = toggle
      
    //   const answer1 = document.getElementById('answer-1');
    //   const answer2 = document.getElementById('answer-2');


    // <section class="accordion">
     
    //   <h2 class="h2-headline">FAQ</h2>

    //   <div class="question" id="question-1">Itinerary</div>
    //   <div class="answer" id="answer-1">
    //     <p>Lorem ipsum...</p>
    //   </div>
    // </section>



   




