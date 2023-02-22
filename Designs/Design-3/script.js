//DOM-selectors
const cityName = document.getElementById('city-name')
const currentTemp = document.getElementById('current-temp')
const weatherDesc =document.getElementById('weather-description')
const weekDays = document.getElementById('weekdays')
const weekTemp = document.getElementById('week-temp')


fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=26c922535e2ba939d3ff0d8af53d90a2')
.then((response) => {
    return response.json()
})
.then((json) => {
    //this variable contains the temperature and with the math.round the decimals where removed
    let temp = json.main.temp.toFixed(1)

    //Variables for getting the first word in the description capitalized
    const description = json.weather[0].description
    const firstLetter = description.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = description.slice(1)
    const capitalizeWord = firstLetterCap + remainingLetters //This variable is displaying the weather description

    //--------------DISPLAY---------------
    //displays the city name
    cityName.innerHTML = `${json.name}`
    //displays the current temperature using the temp variable 
    currentTemp.innerHTML = `${temp}°`
    weatherDesc.innerHTML = `${capitalizeWord}`

    //hej hej


    //This is some code to get the first letter in description be Uppercase, we'll try to use it later
    /*const str = 'flexiple';
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    console.log(str2);*/
})


//------------------------2ND FETCH FOR FORECAST---------------------------------------------------
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=26c922535e2ba939d3ff0d8af53d90a2')
.then((response) => {
    return response.json()
})
.then((json) => {
    console.log(json)

    //Filtered forcast for weekdays + foreach-loop that displays the weekdays of the dates
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00')) 
    console.log(filteredForecast)
    filteredForecast.forEach((day) => {
        const date = new Date(day.dt * 1000)
        let dayName = date.toLocaleDateString("en-US", {weekday: "short"})
        weekDays.innerHTML += `<p>${dayName}</p>`
        })
//Solution to above was found here: https://stackoverflowteams.com/c/technigo/questions/786 

//forEach-loop for getting the temperatures of each day. Here the array variable is a let because we want to modify it later
    let forecastTemp = filteredForecast.map((temp) => {
        return temp.main.temp.toFixed(0)
        //the above returns the temperature at 12:00 but with only one decimal
    })
    forecastTemp = forecastTemp.join('° ')
    //the above removes the commas for the forecastTemp-array and adds the Celsius sign. not for the last one though, this is added in the innerHTML below

    weekTemp.innerHTML += `<p>${forecastTemp}°</p>`
    //This displays the temperatures, adding the Celsius sign to the last one.
        
})

