const container = document.getElementById('weather')

fetch ('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=3927ba6963ab68cfceebff54c1ee693f')

.then((response) => {

    return response.json()
})
.then((json) => {
  
 
 console.log(json)
   
 container.innerHTML = `<h2>The daily temperature in stockholm is ${json.main.temp} degrees with a daily min of ${json.main.temp_min} and daily max of
   ${json.main.temp_max} </h2>`

   

})
    

//  let sunset

// let sunrise = new Date();
// document.getElementById('weather')
