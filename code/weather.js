const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=038843ef5b6fc0faa93abadfa0f18663'
const container = document.getElementById('weather');
 

    fetch (apiUrl)
        .then((response) => {
            return response.json();
         })
        .then((json) => {
        console.log(json);
        });
