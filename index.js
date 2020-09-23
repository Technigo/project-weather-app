fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=25b3459d6eea6c3844f60f68deed9511")
    .then(response => {
        return response.json();
    })
    .then(json => {
        console.log(json);
    })