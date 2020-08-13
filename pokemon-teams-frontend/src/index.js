const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main')

getTrainers()

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainerObjsArray => trainerObjsArray.forEach(trainerObj => {
        displayTrainer(trainerObj)
    }))
};

function displayTrainer(trainerObj) {
    let trainerDiv = document.createElement('div')
        trainerDiv.className = "card"

    let trainerName = document.createElement('p')
        trainerName.innerText = trainerObj.name
    
    let addPokemonButton = document.createElement('button')
        addPokemonButton.dataset.trainerId = trainerObj.id
        addPokemonButton.innerText = 'Add Pokemon'

    let pokemonPartyUl = document.createElement('ul')
        trainerObj.pokemons.forEach(pokemonObj => {
            pokemonPartyUl.append(displayPokemon(pokemonObj))
        });
        
    trainerDiv.append(trainerName, addPokemonButton, pokemonPartyUl)
    main.append(trainerDiv)
        
    addPokemonButton.addEventListener('click', function(e) {
        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: this.dataset.trainerId
            })
        })
        .then(response => response.json())
        .then(newPokemonObj => {
            trainerObj.pokemons.push(newPokemonObj)
            pokemonPartyUl.append(displayPokemon(newPokemonObj))
        })
    })
    
    
};

function displayPokemon(pokemonObj) {
    let newPokemonLi = document.createElement('li')
            newPokemonLi.innerText = `${pokemonObj.nickname} (${pokemonObj.species})`

    let releasePokemonButton = document.createElement('button')
            releasePokemonButton.className = "release"
            releasePokemonButton.dataset.pokemonId = pokemonObj.id
            releasePokemonButton.innerText = 'Release'

    newPokemonLi.append(releasePokemonButton)
    releasePokemonHandler(newPokemonLi)
    return newPokemonLi
};

function releasePokemonHandler(pokemonLi) {
    let releaseButton = pokemonLi.querySelector('button.release')

    releaseButton.addEventListener('click', function(e){
        fetch(`${POKEMONS_URL}/${this.dataset.pokemonId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(releasedPokemonObj => {
            alert(`${releasedPokemonObj.nickname} (${releasedPokemonObj.species}) was released!`)
            pokemonLi.remove()
        });
    });
};