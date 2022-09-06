

const container = document.getElementById('todaySummary')

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=e7b3f1559413c473c7155cc145c88519')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch((err) =>{ //ERROR function. We pass in a function as a parameter in the function, just like the then function.
      console.log(err)
    })


    //https://api.openweathermap.org/data/2.5/weather?lat={LAT}&lon={LON}&appid={API KEY}

    //https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=
    //Petras API :98b6cfababcb8aa6d64ecb9698b0bc9c
    //Charlottes API: 64d2a624607147029ae4574d21f5c6d9