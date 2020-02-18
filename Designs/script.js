
fetch('https://api.openweathermap.org/data/2.5/weather?q=York,uk&units=metric&appid=d38c8d249211767107a91f311ddf4268')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
        document.getElementById('temperature').innerHTML = `${Math.round(json.main.temp)} &#8451`
        document.getElementById('city').innerHTML = `${json.name}`
        document.getElementById('description').innerHTML = `${json.weather[0].description}`
        const sunrise = new Date((json.sys.sunrise) * 1000)
        const sunset = new Date((json.sys.sunset) * 1000)
        const sunriseShort = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'GMT', hour12: false })
        const sunsetShort = sunset.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', timeZone: 'GMT' })
        document.getElementById('suntimes').innerHTML = `<span>sunrise:</span> <span>${sunriseShort}</span>
        <span>sunset:</span> <span>${sunsetShort}</span>`

    });

fetch('https://api.openweathermap.org/data/2.5/forecast?q=York,uk&units=metric&APPID=d38c8d249211767107a91f311ddf4268')
    .then((response) => {
        return response.json()
    })
    .then((forecast) => {
        console.log(forecast)

        const editedForecast = forecast.list.map(function (val, i, arr) {
            const newVal = { ...val }
            newVal.day = new Date(newVal.dt_txt).toLocaleDateString([], { weekday: 'short' })
            newVal.dayNumber = new Date(newVal.dt_txt).getDay()
            newVal.weatherType = newVal.weather[0].main
            return newVal
        })
        //^^adds weekday names and numbers that I can use to create new filtered arrays. A weatherType 
        // to switch below to an Image.

        editedForecast.forEach(val => {
            val.icon = val.weatherType
            switch (val.icon) {
                case "Rain":
                    val.icon = "🌧";
                    break;
                case "Clouds":
                    val.icon = "🌥";
                    break
                case "Clear":
                    val.icon = "🌞";
                    break
                default:
                    val.icon = ''
            }
        })

        const mondays = editedForecast.filter(item => item.day.includes('Mon'))
        const tuesdays = editedForecast.filter(item => item.day.includes('Tue'))
        const wednesdays = editedForecast.filter(item => item.day.includes('Wed'))
        const thursdays = editedForecast.filter(item => item.day.includes('Thu'))
        const fridays = editedForecast.filter(item => item.day.includes('Fri'))
        const saturdays = editedForecast.filter(item => item.day.includes('Sat'))
        const sundays = editedForecast.filter(item => item.day.includes('Sun'))

        //^^^Groups the array items according to their weekday so that I can search them for the min/max temperatures.

        const maxTemperature = (weekday) => {
            let i;
            let maxTemp = '';
            for (i = 0; i < weekday.length; i++) {
                if (maxTemp < weekday[i].main.temp_max) {
                    maxTemp = weekday[i].main.temp_max
                }
            }
            return (maxTemp)
        }

        const minTemperature = (weekday) => {
            let i;
            let minTemp = 100
            for (i = 0; i < weekday.length; i++) {
                if (minTemp > weekday[i].main.temp_min) {
                    minTemp = weekday[i].main.temp_min
                }
            }
            return minTemp

        }

        //^^^Functions for finding min/max Temperatures. Called with the weekday arrays created above. Setting
        // minTemp to empty gives it a value of 0 so that it always appears lower, thus I had to pre-set it to a 
        // high number.



        const temperatures = [
            {
                name: 'sunday',

                tempMax: maxTemperature(sundays),

                tempMin: minTemperature(sundays)
            },

            {
                name: 'monday',
                tempMax: maxTemperature(mondays),
                tempMin: minTemperature(mondays)
            },

            {
                name: 'tuesday',
                tempMax: maxTemperature(tuesdays),
                tempMin: minTemperature(tuesdays)
            },

            {
                name: 'wednesday',
                tempMax: maxTemperature(wednesdays),
                tempMin: minTemperature(wednesdays)
            },
            {
                name: 'thursday',
                tempMax: maxTemperature(thursdays),
                tempMin: minTemperature(thursdays)
            },

            {
                name: 'friday',
                tempMax: maxTemperature(fridays),
                tempMin: minTemperature(fridays)
            },
            {
                name: 'saturday',
                tempMax: maxTemperature(saturdays),
                tempMin: minTemperature(saturdays)
            }




        ]

        // ^^This array lets me match the min/max Temps taken from my weekday arrays and displays them with the
        //relevant day. The index number of object matches the dayNumber given for each day by .getDay(). 

        const uniqueDays = editedForecast.filter(item => item.dt_txt.includes("12:00"))

        //^^^Gives one array item of each day so that I can display them in HTML




        const today = new Date().getDay()
        const future = document.getElementById('weather-future')
        const printForecast = (weekday) => { //check this without if statement and i = 1 after noon!!!
            let i;
            for (i = 0; i < weekday.length; i++) {
                if (weekday[i].dayNumber !== today) {
                    future.innerHTML += `<p><span>${weekday[i].day}</span> <span>${weekday[1].icon}</span>
                    <span> ${Math.round(temperatures[weekday[i].dayNumber].tempMax)} /
                    ${Math.round(temperatures[weekday[i].dayNumber].tempMin)} ℃</span> </p>`
                }
            }
        }

        //^^^Makes sure it isn't displaying information for today, then displays information to HTML. 

        printForecast(uniqueDays)




    })