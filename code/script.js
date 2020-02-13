const container = document.getElementById("weather")

fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=44527f8be39feab9d034d48604c6b81d')
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      // console.log(json)
      container.innerHTML = `<h1>Country: ${json.sys.country} City: ${json.name} and the Temp is: ${json.main.temp}</h1>`

      json.people.forEach((person) => {
        container.innerHTML += `<p>${person.name} is on the ${person.craft}</p>`
      });
    })