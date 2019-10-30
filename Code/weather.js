fetch('http://api.openweathermap.org/data/2.5/forecast?q=Kalmar,Sweden&units=metric&cnt=3&APPID=996158b88361cd2c1991a7aee0bf6883')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
    })
    .catch((err) => {
        console.log('caught error', err)
    })

/*
.then((json) => {
return request.json()
})
.then((json) => {
console.log(json)
})*/
