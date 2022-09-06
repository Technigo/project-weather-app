const API_URL = `
https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7dee0e5a05b2c9d92a37a397279281ca
`;
fetch(API_URL).then(response => response.json()).then(data => {
    console.log (data)
})
