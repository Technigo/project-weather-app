const container = document.getElementById('weather')

// fetch ('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d023daa35568a6fdd2a5f549145a0497')
//     .then((response) => {
//         return response.json();
//     })
//     .then((json) => {
//         console.log("it is working",json);
//     })
    

fetch ('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d023daa35568a6fdd2a5f549145a0497')
   .then((response) => {
    response.json();
   })
   .then((data) => {
    console.log("data", data);
   })

 


// fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=cc7a2bf72a818c2078266faf4fe15d7b")
// .then ((response) => {
// return response.json()
// })
// .then((json) => {
//     console.log(json);
// })

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


//5 dagars prognos som ändras. 