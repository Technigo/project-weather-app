fetch("https://taco-randomizer.herokuapp.com/random/?full-taco=true").then((response)=> {
    return response.json()
}).then((json) => { console.log(json)
})//.catch((err) => { 
    //console.log("caught error", err)
//})  We can catch our error if we have any while our code is running by adding a .catch to our fetch as promise. 
// .catch will handle all our error that happen in any of our promises. Lets say we added the url wrong, or the server is down.
// if that the case as above, the error will pop up 