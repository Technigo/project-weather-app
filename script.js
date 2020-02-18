// funtion reacts to button

const myFunc = () => {

    cityApi = document.getElementById('europe').value
    const today = document.getElementById('currentWeather')
    const orginalApi = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=2b9468766d0e54560c7e599762d2e80b'
    const weatherapi = 'https://api.openweathermap.org/data/2.5/weather?q='
    const apiId = '&appid=2b9468766d0e54560c7e599762d2e80b'
    const newApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityApi}&appid=2b9468766d0e54560c7e599762d2e80b`

    //fetch today
    fetch(newApi).then((response) => {
        return response.json()
    }).then((json) => {
        // dealing with json
        const times = (new Date(json.dt * 1000)).toUTCString().split(' ') // dealing with date
        const suny = [json.sys.sunrise, json.sys.sunset]
        console.log("sun", suny)
        const sunyNew = suny.map((item) => {
            return (new Date(item * 1000)).toUTCString().split(' ')
        })
        const sunyList = sunyNew.map((item) => {
            const clock = item[4].split(':')
            return `${clock[0]}:${clock[1]}`  // removing seconds
        })
        const noSecond = times[4].split(':')
        // my weather object contains and sort relevant information
        let weatherObject = {
            city: json.name,
            name: json.weather[0].main,
            description: json.weather[0].description,
            temp: `${(json.main.temp - 273.15).toFixed(1)}&#8451;`,
            weekDay: times[0].replace(',', ''),
            date: `${times[1]} ${times[2]} ${times[3]}`,
            time: `${noSecond[0]}:${noSecond[1]}`,
            rise: sunyList[0],
            set: sunyList[1]
        }


        // changing color, text, and image based on weather
        const icons = {
            clouds: { image: "media/clouds.svg", bgColor: '#F4F7F8', fontColor: '#F47775', head: `Light a fire and get cozy. ${weatherObject.city} is looking gray today` },
            rain: { image: "media/rain.svg", bgColor: '#A3DEF7', fontColor: '#164A68', head: `Don't forget your umbrella Its wet in ${weatherObject.city} today`, },
            clear: { image: "media/clear.svg", bgColor: '#F7E9B9', fontColor: '#2A5510', head: `Get your sunnies on. ${weatherObject.city} is looking rather great today` }
        }

        const pictures = () => {
            console.log("inside function", weatherObject.name)
            let choice = "blank"
            if (weatherObject.name === "Clouds" || weatherObject.name === "Mist") {
                choice = icons.clouds
            }
            else if (weatherObject.name === "Rain" || weatherObject.name === "Snow") {
                choice = icons.rain
            }
            else if (weatherObject.name === "Clear") {
                choice = icons.clear
            }

            return choice
        }

        const myChoice = pictures()

        //const todayWeather = [json.main.temp, json.main.feels_like, json.main.temp_min, json.main.temp_max]
        document.getElementById('todayIcon').src = myChoice.image
        const myToday = document.getElementById('weatherToday')
        myToday.innerHTML = `<p>${weatherObject.description} | ${weatherObject.temp}</p>`
        const myTotal = document.getElementById('container')
        myTotal.style.backgroundColor = myChoice.bgColor
        myTotal.style.color = myChoice.fontColor
        myToday.innerHTML += `<p>sunrise ${weatherObject.rise}</p>`
        myToday.innerHTML += `<p>sunset ${weatherObject.set}</p>`
        document.getElementById('headline').innerHTML = myChoice.head

    })

    const secondApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityApi}&appid=2b9468766d0e54560c7e599762d2e80b`

    // fetch 5 -days
    fetch(secondApi).then((response) => {
        return response.json()
    }).then((jsonweek) => {
        // dealing with json object
        const weatherWeek = () => {
            // collecting relevant information
            let dayListWeather = []
            jsonweek.list.forEach((item) => {
                const weekTime = (new Date(item.dt * 1000)).toUTCString().split(' ')
                console.log(weekTime)
                const y = item.dt_txt.split(' ')
                dayListWeather.push({ name: item.weather[0].main, description: item.weather[0].description, temp: ((item.main.temp - 273.15).toFixed(1)), weekDay: weekTime[0], month: weekTime[2], date: weekTime[1], time: y[1], wind: item.wind.speed })

            })
            return dayListWeather

        }
        const newArr = weatherWeek()
        // getting one temp per day
        const weatherShow = newArr.filter((item) => {
            return (item.time === "12:00:00")
        })
        // Showing icon for days to come

        const fontCol = document.getElementById('headline').style.color
        const symbol = (weather) => {
            let img = 'X'
            if (weather === 'Clouds' || weather === 'Mist') {
                img = '&#9729;'
            }
            else if (weather === 'Rain' || weather === 'Snow') {
                img = '&#9730;'
            }
            else if (weather === 'Clear') {
                img = '&#9728;'
            }
            else {
                img = '&#9733;'
            }

            return img
        }
        // reseting week everytime a new city is choosen
        const myDiv = document.getElementById('forecast')
        myDiv.innerHTML = ""
        weatherShow.forEach((day, index, arr) => {
            const myIndex = index.toString()


            myDiv.innerHTML += `<div class = "align" id = ${myIndex}><p>${day.weekDay} ${day.month} ${day.date}</p><p>${symbol(day.name)} ${day.temp}&#8451;</p> </div>`
            const myString = document.getElementById(myIndex)
            myString.style.borderTopColor = fontCol
            myString.style.borderTopStyle = 'dotted'
            myString.style.borderWidth = 'thin'

        })

    })

}
document.getElementById('buttonCity').onclick = myFunc

