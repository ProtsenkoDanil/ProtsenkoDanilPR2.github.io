const Pokemon = function(name) {
    this.name = name;
    this.health = 100;
    
    this.attack = function(opponent) {
        const damage = Math.floor(Math.random() * 10) + 5;
        opponent.health -= damage;
        if (opponent.health < 0) opponent.health = 0;
        this.updateHealthBar(opponent);
        return damage;
    };

    this.specialAttack = function(opponent) {
        const damage = Math.floor(Math.random() * 20) + 10;
        opponent.health -= damage;
        if (opponent.health < 0) opponent.health = 0;
        this.updateHealthBar(opponent);
        return damage;
    };

    this.updateHealthBar = function(pokemon) {
        const healthElement = document.getElementById('health' + (pokemon === pikachu ? '1' : '2'));
        healthElement.style.width = pokemon.health + '%';
        if (pokemon.health <= 0) {
            alert(pokemon.name + ' has fainted!');
        }
    };
};

const pikachu = new Pokemon('Pikachu');
const charmander = new Pokemon('Charmander');

function battle(attacker, defender, attackerId, targetId) {
    if (isAttacking) return;
    isAttacking = true;
    showPokeball(attackerId, targetId);
    attacker.attack(defender);
}

function specialBattle(attacker, defender, attackerId, targetId) {
    if (isAttacking) return;
    isAttacking = true;
    showPokeball(attackerId, targetId);
    attacker.specialAttack(defender);
}

function showPokeball(attackerId, targetId) {
    const pokeball = document.getElementById('pokeball');
    pokeball.style.visibility = 'visible';

    const attacker = document.getElementById(attackerId);
    const target = document.getElementById(targetId);
    const attackerPos = attacker.getBoundingClientRect();
    const targetPos = target.getBoundingClientRect();

    pokeball.style.top = attackerPos.top + 'px';
    pokeball.style.left = attackerPos.left + 'px';

    setTimeout(() => {
        pokeball.style.top = targetPos.top + 'px';
        pokeball.style.left = targetPos.left + 'px';
    }, 50);

    setTimeout(() => {
        pokeball.style.visibility = 'hidden';
        showExplosion(targetPos);
        resetPokeball();
        isAttacking = false;
    }, 800);
}

function showExplosion(position) {
    const explosion = document.getElementById('explosion');
    explosion.style.visibility = 'visible';
    explosion.style.top = position.top + 'px';
    explosion.style.left = position.left + 'px';

    setTimeout(() => {
        explosion.style.visibility = 'hidden';
    }, 300);
}

function resetPokeball() {
    const pokeball = document.getElementById('pokeball');
    pokeball.style.visibility = 'hidden';
    pokeball.style.top = '50%';
    pokeball.style.left = '50%';
}

let isAttacking = false;

document.getElementById('attack1').addEventListener('click', function() {
    battle(pikachu, charmander, 'pokemon1', 'pokemon2');
});

document.getElementById('special1').addEventListener('click', function() {
    specialBattle(pikachu, charmander, 'pokemon1', 'pokemon2');
});

document.getElementById('attack2').addEventListener('click', function() {
    battle(charmander, pikachu, 'pokemon2', 'pokemon1');
});

document.getElementById('special2').addEventListener('click', function() {
    specialBattle(charmander, pikachu, 'pokemon2', 'pokemon1');
});
