console.log('working?')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=20216c09e09f267ccc58282554c77ecf')
.then((response) => {
    return response.json()
})

.then((json) => {
    console.log(json)
})