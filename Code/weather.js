const div1 = document.getElementById('header')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Nanaimo,CA&units=metric&APPID=1c52265fbcb1b6630b1b484fdf314634')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        div1.innerHTML = `<h2>Today's weather in</h2><h1>${json.name}, Canada</h1>`
    })



