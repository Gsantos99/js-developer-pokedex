// Flags de estado - serão mudadas no clique do usuário
const listPokemon = document.getElementById('pokedexContainer')
let pokemonSelectedActive = false
let selectedPokemonBg
let selectedPokemon

function convertPokemonDescriptionToHtml(pokemon) {
  ;`
  <div class="pokemon-description-bg ${
    pokemon.type
  } light-bg" id="descriptionBg">
    </div>
    <div class="pokemon-description ${pokemon.type}" id="pokemonDescription">
        <div class="description-header">
            <span class="description-name">${pokemon.name}</span>
            <ol class="types description-types">
                ${pokemon.types
                  .map(
                    type => `<li class="description-type ${type}">${type}</li>`
                  )
                  .join('')}
            </ol>
            <span class="description-number"># ${pokemon.number}</span>
        </div>
        <img class="description-sprite" src="${pokemon.sprite}" alt="${
    pokemon.name
  }">
        
        <div class="description-details-bg">
            <div class="description-details">
                <div class="detail-row">
                    <div class="detail-topic">Egg Group : </div>
                    <ol class="detail-egg-group">
                        ${pokemon.egg_group
                          .map(
                            egg_type => `<li class="egg-type">${egg_type}</li>`
                          )
                          .join(',')}
                    </ol>
                </div>
                <div class="detail-row">
                    <span class="detail-topic">Habitat : </span>
                    <span class="detail-result habitat">${
                      pokemon.habitat
                    }</span>
                </div>
                <div class="detail-row">
                    <span class="detail-topic">Height : </span>
                    <span class="detail-result">${pokemon.height} dm</span>
                </div>
                <div class="detail-row">
                    <span class="detail-topic">Weight : </span>
                    <span class="detail-result">${pokemon.weight} hg</span>
                </div>
                <div class="detail-row">
                    <span class="detail-topic">Abilities : </span>
                    <ol class="abilities-list">
                        ${pokemon.abilities
                          .map(
                            ability =>
                              `<li class="ability ${ability}">${ability}</li>`
                          )
                          .join('')}
                    </ol>
                </div>
            </div>
        </div>
    </div>
    `
}

pokemonList.addEventListener('click', e => {
  if (!pokemonSelectedActive) {
    const pokemonSelectedActive = e.target.id

    pokeApi
      .getPokemonDescription(pokemonSelectedActive)
      .then(pokemon => {
        const newHtml = convertPokemonDescriptionToHtml(pokemon)
        pokemonList.innerHTML += newHtml

        selectedPokemonBg = document.getElementById('descriptionBg')
        selectedPokemon = document.getElementById('pokemonDescription')

        pokemonSelectedActive = true
      })
      .catch(error => console.log(error))
  } else {
    if (e.target.id === 'descriptionBg') {
      selectedPokemon.parentElement.removeChild(selectedPokemon)
      selectedPokemonBg.parentElement.removeChild(selectedPokemonBg)
      pokemonSelectedActive = false
    }
  }
})
