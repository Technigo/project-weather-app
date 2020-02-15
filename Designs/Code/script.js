const container = document.getElementById('wetherService')


fetch('https://samples.openweathermap.org/data/2.5/find?q=London&units=metric&appid=bb2b0bb45cd18a1f48ff2ac55b77750a', {mode: 'no-cors'})
.then((Response) => {
    return Response.json()
})
.then((json) => {
    console.log(json)
})
