const container = document.getElementById("astros")

fetch('http://api.open-notify.org/astros.json').then((response) => {
  return response.json()
})
.then((json) => {
  console.log(json)
  container.innerHTML = `<h1>There are ${json.number} people in space right now</h1>`

  json.people.forEach((person) => {
    container.innerHTML += `<p>${person.name} is on the ${person.craft}</p>`
  })
})