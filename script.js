const header = document.getElementById("header")
const main = document.getElementById("main")
const container = document.getElementById("container")

header.innerHTML = `
<h1>Hej</h1>
`
fetch ("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8be7a87323d320c7bae11d84fa0a7c61")
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        main.innerHTML =
        `There is weather in ${json.name} today.`
    })



//API-key: 8be7a87323d320c7bae11d84fa0a7c61