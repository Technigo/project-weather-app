const container = document.getElementById('weather-today');
const bodyContainer = document.querySelector(".body-container");
const message = document.getElementById("message")


// fetch ('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d023daa35568a6fdd2a5f549145a0497')
//     .then((response) => {
//         return response.json();
//     })
//     .then((json) => {
//         console.log("it is working",json);
//     })
    

//fetch ('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d023daa35568a6fdd2a5f549145a0497')
//.then((response) => {
  // response.json();
//})
//.then((data) => {
  // console.log("data", data);
  //})

fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=cc7a2bf72a818c2078266faf4fe15d7b")
 .then ((response) => {
    return response.json()
})
 .then((json) => {
   console.log(json); 
   container.innerHTML = `
   <p>Sunrise: ${new Date(json.sys.sunrise * 1000)
    .toLocaleTimeString()}</p>
   <p>Sunset: ${new Date(json.sys.sunset * 1000)
    .toLocaleTimeString()}</p>
    `
})

const weather = (json.weather[0].main) //If we declare weather here we can
//use it under at the todaysWeather-function. 
console.log("weather", weather) //Just to see if it's works(it's not)


const todaysWeather = () => {
if (weather === 'Rain') {
    icon.src = "./Designs/Design-2/icons/noun_Umbrella_2030530.svg"
    message.innerHTML = `<h1>Don't forget your umbrella! ${json.name} is rainy today! </h1>`
    bodyContainer.classList.add('rain');
} 
else if (weather === "Clear") {
    icon.src = "./Designs/Design-2/icons/noun_Sunglasses_2055147.svg"
    message.innerHTML = `<h1>Get your sunnies on, the sun is shining in ${json.name}! `
    bodyContainer.classList.add('clear');
}
else {
    icon.src = "./Designs/Design-2/icons/noun_Cloud_1188486.svg"
    message.innerHTML = `<h1>Something something ${json.name} is grey today.</h1>`
    bodyContainer.classList.add('clouds')
}
}


// .catch((err) =>{ //ERROR function. We pass in a function as a parameter in the function, just like the then function.
//     console.log(err)
//   })

//console.log("hello")



//Function för att få igång dagens väder? const weatherToday = () => tex? 
//temp just nu, sunrise, sunset


//Img/logga som ändras beroende på vilken temp det är
//Text som ändras beroende på vilket väder det är
//if, else. If weather === cloud -> then show this text, logo and colors
//if else weather === sun -> then show this... 
///Colors to use
//#F47775 - "Font color if it's grey"
//#F4F7F8 - "Background if it's grey"

//#164A68 - "Font color if it's rainy"
//#A3DEF7 - "Background if it's rainy"

//#2A5510 - "Font color if it's sunny"
//#F7E9B9 - "Background if it's sunny"


//5 dagars prognos som ändras