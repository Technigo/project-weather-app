// 1
const fetchPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/").then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json)
    })
  };
  
  //console.log(fetchPokemons())
  fetchPokemons()


//2

// 2. A
const fetchPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/").then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json.results)

        json.results.forEach((names) => {
            console.log(names)
        })
    })
  };

  fetchPokemons()



// 2. B
const fetchPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/").then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json.results[0].name)
    })
  };

  fetchPokemons()


// 2. C
const fetchPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/").then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json.results)

        json.results.forEach((names) => {
            console.log(names.name)
        })
    })
  };

  fetchPokemons()


  // 3
  const fetchPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=91").then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json.results)

        /*json.results.forEach((names) => {
            console.log(names)
        })*/
    })
  };

  fetchPokemons()


  // 4
  const fetchCharizardData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/6/").then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json)

        /*json.results.forEach((names) => {
            console.log(names)
        })*/
    })
 
}

fetchCharizardData()


// 4 5 och 6 tillsammans
const fetchCharizardData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/6/")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        image.src = json.sprites.front_default;
        name.innerHTML = `${json.name}`;
        element.innerHTML = `${json.base_experience}`;
        weight.innerHTML = `${json.weight}`;
        height.innerHTML = `${json.height}`;
        types.innerHTML = `${json.order}`;
      });
  };
  
  fetchCharizardData();
