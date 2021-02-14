// First here do we have a Object
let dog = {
    name: "Alfons",
    furColor: "black",
    size: "small"
}

// Now we convert our Object to a JSON
let dogAsJSON = JSON.stringify(dog)

console.log(dog) // When you print this you see that our Object is printed
console.log(dogAsJSON) // When you print this you see that our Object is converted to strings(String version of an object)


// We turn it back to an object by doing .parse. console log and see the result. 
let jsonBackToObject = JSON.parse(dogAsJSON)

console.log(jsonBackToObject)

// The logic behind is that when we are fetching data from an API, it always gives us the data in JSON(String format)
// Then, we are taking that JSON data and turning it to an object. 
// We turned JSON to Object by doing JSON.parse above, but in reality we use another version called request.JSON.
//