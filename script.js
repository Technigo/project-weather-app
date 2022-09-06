const location = document.getElementById('location')


fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=fb125bc213d8ee5c4a432b3a2b24aecf")
    .then((response) => {
        return response.json()
    })

    .then((json) => {
        location.innerHTML=`<h1> ${json.name} </h1>`
        console.log(json.name)
    })

    
