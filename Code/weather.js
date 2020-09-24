const header = document.getElementById('header')
const current = document.getElementById('current')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Nanaimo,CA&units=metric&APPID=1c52265fbcb1b6630b1b484fdf314634')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        header.innerHTML = `${json.name}, ${json.sys.country}`;
        current.innerHTML = `${json.main.temp} ${json.main.description}`;
    })

    