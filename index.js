const city = document.getElementById("city");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weekdays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
];

fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm&appid=f1afe35ff2a681810282738ff9c140b9")
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json);
        let sunRise = new Date (json.city.sunrise *1000);
        let sunSet = new Date (json.city.sunset *1000);
        city.innerHTML = json.city.name;
        
        const options = {
            weekdays:"short",
            month: "short",
            day: "numeric"
        }
        const newDate = new Date(json.list[0].dt_txt)
        const todayDate = newDate.toLocaleDateString("en-US",options)

        document.getElementById("date").innerHTML = `${todayDate}`

        temperature.innerHTML = `${getNumber(Math.round(json.list[0].main.temperature))}&deg;C`;

        sunrise.innerHTML = `${("0" + sunRise.getHours()).slice(-2)}:${("0" + sunRise.getMinutes()).slice(-2)}`;
        sunset.innerHTML = `${("0" + sunSet.getHours()).slice(-2)}:${("0" + sunRise.getMinutes()).slice(-2)}`;

        let dayArray = []
        json.list.forEach(day => {
          let date = new Date(day.dt_txt);
          if (date.getHours() == "12"){
              dayArray.push(day)
          }   
        });

        displayDays(dayArray)
    })

    const displayDays = (dayArray) => {
        const weekdaysDiv = document.getElementById("weekdays");
        for (i=0; i < dayArray.length; i++) {
            console.log(dayArray[i])
            let currentDate = new Date (dayArray [i].dt_txt)
            let currentDay = currentDate.getDay()
            weekdaysDiv.innerHTML += `<div class="weekDays">
                                        <div>${weekdays[currentDay]}</div>
                                        <div>${getNumber(Math.round(dayArray[i].main.temperature))}&deg;C</div>
                                        </div>`
        }
    }

    const getNumber = (theNumber) => {
        if (theNumber > 0) {
            return "+" + theNumber;
        } else {
            return theNumber.toString();
        }
    }