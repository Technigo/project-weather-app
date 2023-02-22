//DOM-selectors
const cityName = document.getElementById('city-name')
const currentTemp = document.getElementById('current-temp')
const weatherDesc =document.getElementById('weather-description')



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



    //This is some code to get the first letter in description be Uppercase, we'll try to use it later
    /*const str = 'flexiple';
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    console.log(str2);*/

    console.log(json)
})

