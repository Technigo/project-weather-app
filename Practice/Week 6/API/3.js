/*fetch("https://taco-randomizer.herokuapp.com/random/?full-taco=true").then((response)=> {
    return response.json()
}).then((json) => { console.log(json)
}) */

const container = document.getElementById("container")


fetch("http://api.open-notify.org/astros.json").then((response) => {
    return response.json()
}).then((json) => {
    console.log(json)
    container.innerHTML = `<h4>There are ${json.number} of people onboard on the ${json.people[0].craft} craft</h4> `

    json.people.forEach((person) => {
        container.innerHTML += `<p>${person.name} is on the aircraft 
        </p> `
    })
})