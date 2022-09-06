// Api 
const API = 'https://api.openweathermap.org/data/2.5/weather?q=Amsterdam,Netherlands&units=metric&appid=26500228b15aa40fc0617041c68bf843'

// Global DOM selectors

const container = document.getElementById('header')
const phrase = document.getElementById('phrase')
const icon = document.getElementById("icon")
const message = document.getElementById("message")
const forCast = document.getElementById('forCast')

// fetch the API for header section 
fetch (API)
.then ((response) => {
    return response.json ()
})
.then ((json) => {
const temperature= json.main.temp.toFixed(0) //declare the API fetch for current temp.

const currentDescription = json.weather[0].description // new declare the API fetch for current descprition. 

const sunrise = new Date(json.sys.sunrise * 1000); // new declare the API fetch for sunrise and sunset. 
const sunset = new Date(json.sys.sunset *1000);
    const sunriseShort = sunrise.toLocaleTimeString([], {timeStyle: 'short'}) // declare new variable to show only hh:mm
    const sunsetShort = sunset.toLocaleTimeString([], {timeStyle: 'short'})

const nameCity = json.name

console.log (temperature,currentDescription,sunriseShort,sunsetShort,nameCity) // test for console that the function is working. 

 //print out the API fetch for header
container.innerHTML=`<h1> ${currentDescription} | ${temperature}<br>sunrise ${sunriseShort}<br>sunset ${sunsetShort}</h1>`

const cloudIcon = ".Designs/Design-2/icons/noun_Cloud_1188486.svg"
const sunglasses = "Designs/Design-2/icons/noun_Sunglasses_2055147.svg"
const umbrella = "Designs/Design-2/icons/noun_Umbrella_2030530.svg"


if (currentDescription === "clear sky") {
    container.style.backgroundColor = "#F7E9B9";
    container.style.color = "#2A5510";

} else if (currentDescription === "rain") {
    container.style.backgroundColor = "#A3DEF7";
    container.style.color = "#164A68";

} else if (currentDescription === "clouds" || "few clouds") {
    container.style.backgroundColor = "#F4F7F8";
    container.style.color = "#F47775";
}
}
)

 //THIS IS DANIEL SEARCH BAD
 //mainSearchbar.addEventListener('change', (event) => {
    //fetch(`https://api.openweathermap.org/data/2.5/weather?q={event.target.value}&units=metric&appid=26500228b15aa40fc0617041c68bf843`)
    //.then(response => {
        //if(response.status ==200) {
            //return response.json();
        //} else {
            //throw(new Error('bad response'));
        //})
        //.then(readableResponse =. {
            //xxx.innerHTML = readableResponse.xxx
            //xxx.innerHTML = readableResponse.xxx
        //})
 