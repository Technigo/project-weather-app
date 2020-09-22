// const apiKey = "c2889b12ee617ea787319a19a98a5906"

fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1b8f5ef70f56d3c197524d5c84ecb9d0")
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
    })