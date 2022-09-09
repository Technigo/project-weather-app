// Api 
//const apiForeCast = 'https://api.openweathermap.org/data/2.5/forecast?q=Amsterdam,Netherlands&units=metric&appid=26500228b15aa40fc0617041c68bf843'

// Global DOM selectors

const container = document.getElementById('header')
const phrase = document.getElementById('phrase')
const icon = document.getElementById("icon")
const message = document.getElementById("message")
const forCast = document.getElementById('forCast')

// fetch the API for header section 
searchCity.addEventListener('change', (event) => {
    
    fetch ((`https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&units=metric&appid=26500228b15aa40fc0617041c68bf843`))
.then ((response) => {
    return response.json ()
})
.then ((json) => {
const temperature= json.main.temp.toFixed(0) //declare the API fetch for current temp.

const currentDescription = json.weather[0].main // new declare the API fetch for current descprition. 

const sunrise = new Date(json.sys.sunrise * 1000); // new declare the API fetch for sunrise and sunset. 
const sunset = new Date(json.sys.sunset *1000);
    const sunriseShort = sunrise.toLocaleTimeString([], {timeStyle: 'short'}) // declare new variable to show only hh:mm
    const sunsetShort = sunset.toLocaleTimeString([], {timeStyle: 'short'})

const nameCity = json.name

console.log (temperature,currentDescription,sunriseShort,sunsetShort,nameCity) // test for console that the function is working. 

 //print out the API fetch for header
container.innerHTML=`${currentDescription} | ${temperature}°<br>sunrise ${sunriseShort}<br>sunset ${sunsetShort}`

// const cloudIcon = ".Designs/Design-2/icons/noun_Cloud_1188486.svg"
// const sunglasses = "Designs/Design-2/icons/noun_Sunglasses_2055147.svg"
// const umbrella = "Designs/Design-2/icons/noun_Umbrella_2030530.svg"


if (currentDescription === "Clear") {
    icon.src = "./Designs/Design-2/icons/noun_Sunglasses_2055147.svg"
    message.innerHTML = `<h1>Get your sunnies on. ${nameCity} is looking rather great today.</h1>`
    document.body.style.backgroundColor = "#F7E9B9";
    document.body.style.color = "#2A5510";

} else if (currentDescription === "Rain") {
    icon.src = "./Designs/Design-2/icons/noun_Umbrella_2030530.svg"
    message.innerHTML = `<h1>Don't forget your umbrella! It's wet in ${nameCity} today.</h1>`
    document.body.style.backgroundColor = "#A3DEF7";
    document.body.style.color = "#164A68";

} else if (currentDescription === "Clouds") {
    icon.src = "./Designs/Design-2/icons/noun_Cloud_1188486.svg"
    message.innerHTML = `<h1>Light a fire and get cosy. ${nameCity} is looking cloudy today.</h1>`
    document.body.style.backgroundColor = "#F4F7F8";
    document.body.style.color = "#F47775";
}
}
)
})

// turning the date to a string short weekday. 
const weekDay = (data) => {
    const currentDate = new Date (data * 1000); // set to millisec. 
    return currentDate.toLocaleDateString('en-GB', {
        weekday:'short',
    });
};


    
//ForeCast table for 5 days - fetch API from new api URL 
//fetch('https://api.openweathermap.org/data/2.5/forecast?q=${event.target.value}=metric&appid=26500228b15aa40fc0617041c68bf843')
searchCity.addEventListener('change', (event) => {
function foreCastTable(){
//fetch(apiForeCast)
const apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${event.target.value}&units=metric&appid=26500228b15aa40fc0617041c68bf843`
fetch(apiForecast)
.then((response) => response.json())
.then((json) => {

// new variable for filter the table and choose the same time everyday. 
    const filterTable = json.list.filter((item) =>
    item.dt_txt.includes('12:00')
  );
  
  // printed out forcast. filterTable [x] changes depends of which day. 
  forCast.innerHTML = `
<div class="dayAndTemp">
    <div class="day">${weekDay(filterTable[0].dt)}</div>
    <div class="temp"> ${filterTable[0].main.temp.toFixed(0)}°</div>
</div>

<div class="dayAndTemp">
    <div class="day">${weekDay(filterTable[1].dt)}</div>
    <div class="temp"> ${filterTable[1].main.temp.toFixed(0)}°</div>
</div>

<div class="dayAndTemp">
    <div class="day">${weekDay(filterTable[2].dt)}</div>
    <div class="temp"> ${filterTable[2].main.temp.toFixed(0)}°</div>
</div>

<div class="dayAndTemp">
  <div class="day">${weekDay(filterTable[3].dt)}</div>
  <div class="temp"> ${filterTable[3].main.temp.toFixed(0)}°</div>
</div>

<div class="dayAndTemp">
  <div class="day">${weekDay(filterTable[4].dt)}</div>
  <div class="temp"> ${filterTable[4].main.temp.toFixed(0)}°</div>
</div>
  `
})

}
foreCastTable();
})


//GEOLOCATION 
// first it will be shown the set location we have given and when you press "test button" it will change to the current location.


function getLocation(){
    
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) =>{
    var lat = position.coords.latitude; // set lat for api url 
    var long = position.coords.longitude; // set long for api url 
     const apiGeo = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=26500228b15aa40fc0617041c68bf843`
        // add ${} to fetch the lat/long for the user geolocation in url.
     fetch(apiGeo)
        .then((response) => {
        return response.json();
        })
        .then((json) => {
                //const temp= json.main.temp.toFixed(0)
                //const nameGeoCity = json.name
                
               // console.log(temp, nameGeoCity)
               // x.innerHTML =`
               // Your location is ${nameGeoCity} and its ${temp}°`
const temperature= json.main.temp.toFixed(0) //declare the API fetch for current temp.

const currentDescription = json.weather[0].main // new declare the API fetch for current descprition. 

const sunrise = new Date(json.sys.sunrise * 1000); // new declare the API fetch for sunrise and sunset. 
const sunset = new Date(json.sys.sunset *1000);
    const sunriseShort = sunrise.toLocaleTimeString([], {timeStyle: 'short'}) // declare new variable to show only hh:mm
    const sunsetShort = sunset.toLocaleTimeString([], {timeStyle: 'short'})

const nameCity = json.name

console.log (temperature,currentDescription,sunriseShort,sunsetShort,nameCity) // test for console that the function is working. 

 //print out the API fetch for header
container.innerHTML=`${currentDescription} | ${temperature}°<br>sunrise ${sunriseShort}<br>sunset ${sunsetShort}`
if (currentDescription === "Clear") {
    icon.src = "./Designs/Design-2/icons/noun_Sunglasses_2055147.svg"
    message.innerHTML = `<h1>Sunny in ${nameCity} today!</h1>`
    document.body.style.backgroundColor = "#F7E9B9";
    document.body.style.color = "#2A5510";

} else if (currentDescription === "Rain") {
    icon.src = "./Designs/Design-2/icons/noun_Umbrella_2030530.svg"
    message.innerHTML = `<h1>Rainy in ${nameCity} today!</h1>`
    document.body.style.backgroundColor = "#A3DEF7";
    document.body.style.color = "#164A68";

} else if (currentDescription === "Clouds") {
    icon.src = "./Designs/Design-2/icons/noun_Cloud_1188486.svg"
    message.innerHTML = `<h1>Cloudy in ${nameCity} today!</h1>`
    document.body.style.backgroundColor = "#F4F7F8";
    document.body.style.color = "#F47775";
}
}
)
            })
            
            
    };
  } 


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
 // test