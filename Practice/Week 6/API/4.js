/*fetch("https://taco-randomizer.herokuapp.com/random/?full-taco=true").then((response)=> {
    return response.json()
}).then((json) => { console.log(json)
}) */

const container = document.getElementById("container")


fetch("https://taco-randomizer.herokuapp.com/random/?full-taco=true").then((response) =>{
    return response.json()
}).then((json) => {
    console.log(json)

    container.innerHTML = `<h2> ${json.name} </h2>`
    container.innerHTML += `<p> ${json.base_layer["recipe"]} </p>`
})


//${json.people[0].craft}