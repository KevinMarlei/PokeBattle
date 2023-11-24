const ataque1 = document.getElementById('ataque1');
const ataque2 = document.getElementById('ataque2');
const ataque3 = document.getElementById('ataque3');
const ataque4 = document.getElementById('ataque4');
const ataque5 = document.getElementById('ataque5');
const ataque6 = document.getElementById('ataque6');
const ataque7 = document.getElementById('ataque7');
const ataque8 = document.getElementById('ataque8');
const missAttack = document.getElementById('missAttack');

const playerDefeat = document.getElementById('playerDefeat');
const victory = document.getElementById('victory');
let player1PokemonChosen = false;
let player2PokemonChosen = false;
const musicaBattle = document.getElementById('musicaBattle');
const musicaAbertura = document.getElementById('musicaAbertura');
const startButton = document.querySelector('.start');
startButton.addEventListener('click', startGame);

// missAttack
const pokemonPlayerMiss = document.querySelector('.pokemonPlayerMiss');
// css para efeito de dano no pokémon
const pokemonPlayerDamage = document.querySelector('.pokemonPlayerDamage');

const player1PokemonImage = document.querySelector('.pokemonPlayer1');
const player2PokemonImage = document.querySelector('.pokemonPlayer2');

const habilidades1 = document.querySelectorAll('.hability1');
const habilidades2 = document.querySelectorAll('.hability2');
const ataque1Player1 = document.querySelectorAll('.AB1');
const ataque2Player1 = document.querySelectorAll('.AB2');
const ataque3Player1 = document.querySelectorAll('.AB3');
const ataque4Player1 = document.querySelectorAll('.AB4');

const ataque1Player2 = document.querySelectorAll('.HB1');
const ataque2Player2 = document.querySelectorAll('.HB2');
const ataque3Player2 = document.querySelectorAll('.HB3');
const ataque4Player2 = document.querySelectorAll('.HB4');


const listPlayer1 = document.querySelector('.list-player1');
const listPlayer2 = document.querySelector('.list-player2');

const pokemonName1 = document.querySelector('.pokemon-name-player1');
const pokemonName2 = document.querySelector('.pokemon-name-player2');
const pokemonID1 = document.querySelector('.pokemon-id-player1');
const pokemonID2 = document.querySelector('.pokemon-id-player2');

const life2 = document.querySelector('.life-player2');

// mensagem de batalha 
const msg = document.querySelector('.msg');
const msgAttack = document.querySelector('.msgAttack');

let hpAtual1 = 100;
const hpMax1 = 100;
let hpAtual2 = 100;
const hpMax2 = 100;
let playerAtual = 'player1';
//Variaveis objeto para armazenar os pokémons escolhidos pelos jogadores
let player1Pokemon = {};
let player2Pokemon = {};

// Listagem dos pokémons para escolher//
const fetchtPokemon = async () => {
    const apiResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

    try {
        if (apiResponse.ok) {
            const firstGenerationPokemon = await apiResponse.json();
            const data = firstGenerationPokemon.results;
            return data;
        } else {
            throw new Error('Erro na resposta da pokeAPI');
        }
    } catch (error) {
        console.log('Erro ao acessar dados da pokeAPI', error);
    }
}

// Função para carregar a imagem, tipos e habilidades de um Pokémon
async function loadPokemonImageTypesAndAbilities(pokemonName, isPlayer1) {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    try {
        if (apiResponse.ok) {
            const pokemonData = await apiResponse.json();
            const imageUrl = pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default;
            const abilities = pokemonData.abilities.slice(0, 4); // Pega até 4 habilidades
            const types = (pokemonData.types || []).map((type) => type.type.name); // Verifique se types está definido
            const pokemonID = pokemonData.id;
            if (isPlayer1) {
                player1Pokemon.name = pokemonName;
                player1Pokemon.types = types;
                player1Pokemon.abilities = abilities;
                player1PokemonImage.src = imageUrl;
                renderAbilities(player1Pokemon.abilities, isPlayer1);
                renderTypes(player1Pokemon.types, isPlayer1);
            } else {
                player2Pokemon.name = pokemonName;
                player2Pokemon.types = types;
                player2Pokemon.abilities = abilities;
                player2PokemonImage.src = imageUrl;
                renderAbilities(player2Pokemon.abilities, isPlayer1);
                renderTypes(player2Pokemon.types, isPlayer1);
            }
            if (player1Pokemon.name) {
                pokemonID1.innerHTML = pokemonID;
                pokemonName1.innerHTML = player1Pokemon.name;
                listPlayer1.style.display = 'none';
            }
            if (player2Pokemon.name) {
                pokemonID2.innerHTML = pokemonID;
                pokemonName2.innerHTML = player2Pokemon.name;
                listPlayer2.style.display = 'none';
            }
        } else {
            throw new Error('Erro ao carregar dados do Pokémon');
        }
    } catch (error) {
        console.error('Erro ao carregar a imagem do Pokémon', error);
    }
}


function renderTypes(types, isPlayer1) {
    const typeContainer1 = isPlayer1 ? document.querySelector('.tipo1') : document.querySelector('.type1');
    const typeContainer2 = isPlayer1 ? document.querySelector('.tipo2') : document.querySelector('.type2');

    if (types.length >= 1) {
        typeContainer1.textContent = types[0].charAt(0).toUpperCase() + types[0].slice(1);
        applyTypeColor(types[0], typeContainer1);
    } else {
        typeContainer1.textContent = '';
        typeContainer1.style.backgroundColor = 'transparent';
    }

    if (types.length >= 2) {
        typeContainer2.textContent = types[1].charAt(0).toUpperCase() + types[1].slice(1);
        applyTypeColor(types[1], typeContainer2);
    } else {
        typeContainer2.textContent = '';
        typeContainer2.style.backgroundColor = 'transparent';
    }
}

// Função para aplicar as cores dos tipos de Pokémon
function applyTypeColor(type, element) {
    switch (type) {
        case "normal":
            element.style.backgroundColor = '#a6a877';
            break;
        case "grass":
            element.style.backgroundColor = '#77c850';
            break;
        case "fire":
            element.style.backgroundColor = '#ee7f30';
            break;
        case "water":
            element.style.backgroundColor = '#678fee';
            break;
        case "electric":
            element.style.backgroundColor = '#eabf12';
            break;
        case "ice":
            element.style.backgroundColor = '#98d5d7';
            break;
        case "ground":
            element.style.backgroundColor = '#dfbf69';
            break;
        case "flying":
            element.style.backgroundColor = '#a98ff0';
            break;
        case "poison":
            element.style.backgroundColor = '#a040a0';
            break;
        case "fighting":
            element.style.backgroundColor = '#bf3029';
            break;
        case "psychic":
            element.style.backgroundColor = '#f65687';
            break;
        case "dark":
            element.style.backgroundColor = '#725847';
            break;
        case "rock":
            element.style.backgroundColor = '#b8a137';
            break;
        case "bug":
            element.style.backgroundColor = '#a8b720';
            break;
        case "ghost":
            element.style.backgroundColor = '#6e5896';
            break;
        case "steel":
            element.style.backgroundColor = '#b9b7cf';
            break;
        case "dragon":
            element.style.backgroundColor = '#6f38f6';
            break;
        case "fairy":
            element.style.backgroundColor = '#f9aec7';
            break;
        // Adicione mais casos para outros tipos
        default:
            element.style.backgroundColor = 'transparent'; // Plano de fundo vazio
            break;
    }
}

// Função para renderizar as habilidades do Pokémon
function renderAbilities(abilities, isPlayer1) {
    const habilidadesContainer = isPlayer1 ? document.querySelectorAll('.hability1') : document.querySelectorAll('.hability2');

    habilidadesContainer.forEach((button, index) => {
        if (abilities[index]) {
            const abilityName = abilities[index].ability.name;
            button.textContent = `${abilityName.charAt(0).toUpperCase()}${abilityName.slice(1)}`; // Capitaliza a primeira letra
        } else {
            button.textContent = 'N/A';
        }
    });
}


// Evento de clique em um Pokémon da lista do jogador 1
listPlayer1.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI' && !player1Pokemon.name) {
        const selectedPokemonName = event.target.textContent;
        loadPokemonImageTypesAndAbilities(selectedPokemonName, true);
    }
});

// Evento de clique em um Pokémon da lista do jogador 2
listPlayer2.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI' && !player2Pokemon.name) {
        const selectedPokemonName = event.target.textContent;
        loadPokemonImageTypesAndAbilities(selectedPokemonName, false);
    }
});

//função trocar jogador
function trocarJogador() {
    playerAtual = playerAtual === 'player1' ? 'player2' : 'player1';
}

// Função para desabilitar os botões de ataque do jogador atual
function desabilitarBotoesAtaque() {
    if (playerAtual === 'player1') {
        ataquesPlayer1.forEach(function (botaoAtaque) {
            botaoAtaque.disabled = true;
        });
    } else {
        ataquesPlayer2.forEach(function (botaoAtaque) {
            botaoAtaque.disabled = true;
        });
    }
}

// Função para habilitar os botões de ataque do jogador atual
function habilitarBotoesAtaque() {
    if (playerAtual === 'player1') {
        ataquesPlayer1.forEach(function (botaoAtaque) {
            botaoAtaque.disabled = false;
        });
    } else {
        ataquesPlayer2.forEach(function (botaoAtaque) {
            botaoAtaque.disabled = false;
        });
    }
}
// Seleciona todos os botões de ataque do jogador 1
const ataquesPlayer1 = document.querySelectorAll('.AB1, .AB2, .AB3, .AB4');

// Adiciona o evento de clique a cada botão de ataque do jogador 1
ataquesPlayer1.forEach(function (botaoAtaque) {
    botaoAtaque.addEventListener('click', function () {
        if (botaoAtaque.textContent === 'N/A') {
            botaoAtaque.disable = 'true';
            return;
        }
        if (hpAtual2 > 0) { // Verifica se o jogador 2 ainda tem vida
            const miss = Math.floor((Math.random() * 10) + 1);
            if (miss == 1) {
                msgAttack.innerHTML = ' ';
                msg.innerHTML = `${player1Pokemon.name} errou o ataque`;
                console.log(`${player1Pokemon.name} errou o ataque`);
                desabilitarBotoesAtaque();
                trocarJogador();
                habilitarBotoesAtaque();
                if(missAttack){
                    missAttack.play();
                    player2PokemonImage.classList.add('pokemonPlayerMiss2');
                }
            } else {
                if(botaoAtaque.classList.contains('AB1')){
                    ataque8.play();
                 
                }
                if(botaoAtaque.classList.contains('AB2')){
                    ataque1.play();
                }
                if(botaoAtaque.classList.contains('AB3')){
                    ataque2.play();
                }
                if(botaoAtaque.classList.contains('AB4')){
                    ataque3.play();
                }
                const nomeAtaque = botaoAtaque.textContent;
                msgAttack.innerHTML = `${player1Pokemon.name} utilizou ${nomeAtaque}`;
                console.log(`${player1Pokemon.name} utilizou ${nomeAtaque}`); // Nome do ataque
                // efeito de dano no pokémon adversário
                const critico = Math.floor((Math.random() * 10) + 1);
                let dano = 0; // Inicializa o dano como 0

                if (critico == 4) {
                    // Caso crítico: Dano dobrado
                    dano = Math.floor(Math.random() * (35 - 20 + 1)) + 20; // Dano entre 20 e 35
                } else {
                    // Caso normal: Dano padrão
                    dano = Math.floor(Math.random() * (15 - 5 + 1)) + 5; // Dano entre 5 e 15
                }

                if(dano){
                    player2PokemonImage.classList.add('pokemonPlayerDamage');
                    setTimeout(function(){
                        player2PokemonImage.classList.remove('pokemonPlayerDamage');
                    }, 1000)

                }
                msg.innerHTML = `${player1Pokemon.name} causou ${dano} de dano ao ${player2Pokemon.name}`;
                console.log(`${player1Pokemon.name} causou ${dano} de dano ao ${player2Pokemon.name}`);
                hpAtual2 -= dano; // Reduz a vida do jogador 2 com base no dano

                if (hpAtual2 <= 0) {
                    msgAttack.innerHTML = ' ';
                    msg.innerHTML = `${player2Pokemon.name} está fora de combate. O jogador 1 é o vencedor!`
                    console.log('O jogador 1 é o vencedor.');
                    musicaBattle.pause();
                    playerDefeat.play();
                    player1PokemonImage.classList.add('fogos');
                    setTimeout(function () {
                        victory.play();
                    }, 5000);
                }

                // Atualize a largura da barra de vida do jogador 2
                const life2 = document.querySelector('.life-player2');
                const novaLargura = (hpAtual2 / hpMax2) * 100 + '%';
                life2.style.width = novaLargura;
                if (hpAtual2 <= 0 && hpAtual1 != 0) {
                    life2.style.width = '0%';
                    return;
                }
                desabilitarBotoesAtaque();
                trocarJogador();
                habilitarBotoesAtaque();
            }
        }
    });
});

const ataquesPlayer2 = document.querySelectorAll('.HB1, .HB2, .HB3, .HB4');

// Adiciona o evento de clique a cada botão de ataque do jogador 1
ataquesPlayer2.forEach(function (botaoAtaque) {
    botaoAtaque.addEventListener('click', function () {
        if (botaoAtaque.textContent === 'N/A') {
            botaoAtaque.disable = 'true';
            return;
        }
        if (hpAtual1 > 0) { // Verifica se o jogador 2 ainda tem vida
            const miss = Math.floor((Math.random() * 10) + 1);
            if (miss == 1) {
                msgAttack.innerHTML = ' ';
                msg.innerHTML = `${player2Pokemon.name} errou o ataque`;
                console.log(`${player2Pokemon.name} errou o ataque`);
                desabilitarBotoesAtaque();
                trocarJogador();
                habilitarBotoesAtaque();
                if(missAttack){
                    missAttack.play();
                    player1PokemonImage.classList.add('pokemonPlayerMiss1');
                }

            } else {
                if(botaoAtaque.classList.contains('HB1')){
                    ataque7.play();
                }
                if (botaoAtaque.classList.contains('HB2')) {
                    ataque4.play();
                }
                if(botaoAtaque.classList.contains('HB3')){
                    ataque5.play();
                }
                if(botaoAtaque.classList.contains('HB4')){
                    ataque6.play();
                }
                const nomeAtaque = botaoAtaque.textContent;
                msgAttack.innerHTML = `${player2Pokemon.name} utilizou ${nomeAtaque}`;
                console.log(`${player2Pokemon.name} utilizou: ${nomeAtaque}`); // Nome do ataque
                const critico = Math.floor((Math.random() * 10) + 1);
                let dano = 0; // Inicializa o dano como 0

                if (critico == 4) {
                    // Caso crítico: Dano dobrado
                    dano = Math.floor(Math.random() * (35 - 20 + 1)) + 20; // Dano entre 20 e 35
                } else {
                    // Caso normal: Dano padrão
                    dano = Math.floor(Math.random() * (15 - 5 + 1)) + 5; // Dano entre 5 e 15
                }

                if(dano){
                    player1PokemonImage.classList.add('pokemonPlayerDamage');
                    setTimeout(function(){
                        player1PokemonImage.classList.remove('pokemonPlayerDamage');
                    }, 1000)

                }
                msg.innerHTML = `${player2Pokemon.name} causou ${dano} de dano ao ${player1Pokemon.name}`;
                console.log(`${player2Pokemon.name} causou ${dano} de dano ao ${player1Pokemon.name}`);
                hpAtual1 -= dano; // Reduz a vida do jogador 2 com base no dano

                if (hpAtual1 <= 0) {
                    msgAttack.innerHTML = ' ';
                    msg.innerHTML = `${player1Pokemon.name} está fora de combate. O jogador 2 venceu!`;
                    console.log('O jogador 2 venceu.');
                    musicaBattle.pause();
                    playerDefeat.play();
                    setTimeout(function () {
                        victory.play();
                    }, 5000);
                }

                // Atualize a largura da barra de vida do jogador 2
                const life1 = document.querySelector('.life-player1');
                const novaLargura = (hpAtual1 / hpMax1) * 100 + '%';
                life1.style.width = novaLargura;
                if (hpAtual1 <= 0 && hpAtual2 != 0) {
                    life1.style.width = '0%';
                    player1PokemonImage.classList.add('pokemon-derrotado');
                    return;
                }
                desabilitarBotoesAtaque();
                trocarJogador();
                habilitarBotoesAtaque();
                
            }
        }
    });
});



function startGame() {
    const hiddenList = document.querySelectorAll('.hidden');
    hiddenList.forEach(element => {
        element.style.display = 'block';
    });

    const startButton = document.querySelector('.start');
    startButton.style.display = 'none';
}
startButton.addEventListener('click', function () {
    musicaAbertura.play();
})
listPlayer1.addEventListener('click', function () {
    player1PokemonChosen = true;
    checkStartMusic();
})
listPlayer2.addEventListener('click', function () {
    player2PokemonChosen = true;
    checkStartMusic();
});
function checkStartMusic() {
    if (player1PokemonChosen && player2PokemonChosen) {
        musicaAbertura.pause();
        musicaBattle.play();

        ataquesPlayer2.forEach(function (botaoAtaque){
            botaoAtaque.disabled = 'true';
        });
    }
}
musicaBattle.addEventListener('ended', function () {
    // Reinicie a música de batalha
    this.currentTime = 0;
    this.play();
});
// lista dos pokemons elegíveis para o player 1
async function renderPokeList1() {
    const listOfPokemons = await fetchtPokemon();
    if (listOfPokemons && listOfPokemons.length > 0) {
        const pokeList = document.querySelector('.list-player1');
        const ul = document.createElement('ul');

        listOfPokemons.forEach(function (pokemon, index) {
            const li = document.createElement('li');
            li.textContent = pokemon.name;
            ul.appendChild(li);
        });
        pokeList.appendChild(ul);
    }
}

// lista dos pokémons elegíveis para o player 2

async function renderPokeList2() {
    const listOfPokemons = await fetchtPokemon();
    if (listOfPokemons && listOfPokemons.length > 0) {
        const pokeList2 = document.querySelector('.list-player2');
        const ul = document.createElement('ul');

        listOfPokemons.forEach(function (pokemon2, index2) {
            const li = document.createElement('li');
            li.textContent = pokemon2.name;
            ul.appendChild(li);
        });
        pokeList2.appendChild(ul);
    }
}
renderPokeList1();
renderPokeList2();
