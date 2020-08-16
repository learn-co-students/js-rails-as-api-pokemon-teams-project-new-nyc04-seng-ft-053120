const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.querySelector("main")

function trainers() {
    fetch(TRAINERS_URL).then(r => r.json())
    .then(trainersArr => trainersArr.forEach(trainerObj => {
        trainerToHtml(trainerObj)
    }))
};
trainers()

function trainerToHtml(trainerObj){
    let trainerDiv = document.createElement('div')
        trainerDiv.className = "card"
    let trainerName = document.createElement('p')
        trainerName.innerText = trainer.name 
    let addPokemonButton = document.createElement('button')
        addPokemonButton.dataset.trainerId = trainerObj.id
        addPokemonButton.innerText = "Add Pokemon"
    let pokemonsUl = document.createElement('ul')
        trainerObj.pokemons.forEach(pokeObj => {
            pokemonsUl.append(pokemonToHtml(pokeObj))
        });

    trainerDiv.append(trainerName, addPokemonButton, pokemonsUl)
    mainTag.append(trainerDiv)

    addPokemonButton.addEventListener('click', (evt) => {
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: this.dataset.trainerId
            })
        })
        .then(r => r.json()) 
        .then(newPokeObj => {
            trainerObj.pokemons.push(newPokeObj)
            pokemonsUl.append(pokemonToHtml(newPokeObj))
        })
    })  
};

function pokemonToHtml(pokemonObj) {
    let newPokeLi = document.createElement('li')
            newPokeLi.innerText = `${pokemonObj.nickname} (${pokemonObj.species})`

    let releasePokemonButton = document.createElement('button')
            releasePokemonButton.className = "release"
            releasePokemonButton.dataset.pokemonId = pokemonObj.id
            releasePokemonButton.innerText = 'Release'

    newPokeLi.append(releasePokemonButton)
    releasePokemon(newPokeLi)
    return newPokeLi
};

function releasePokemon(pokemonLi) {
    let releaseButton = pokemonLi.querySelector('button.release')

    releaseButton.addEventListener('click', function(e){
        fetch(`${POKEMONS_URL}/${this.dataset.pokemonId}`, {
            method: 'DELETE'
        })
        .then(r => r.json())
        .then(releasedPokemonObj => {
            alert(`${releasedPokemonObj.nickname} (${releasedPokemonObj.species}) was released!`)
            pokemonLi.remove()
        });
    });
};
{/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */}