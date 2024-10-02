const pikachu = {
    name: 'Pikachu',
    health: 100,
    attack: function() {
        return Math.floor(Math.random() * 10) + 5;
    },
    specialAttack: function() {
        return Math.floor(Math.random() * 20) + 10;
    }
};

const charmander = {
    name: 'Charmander',
    health: 100,
    attack: function() {
        return Math.floor(Math.random() * 10) + 5;
    },
    specialAttack: function() {
        return Math.floor(Math.random() * 20) + 10;
    }
};

let isAttacking = false;

function updateHealthBar(pokemon, healthElement) {
    healthElement.style.width = pokemon.health + '%';
    if (pokemon.health <= 0) {
        pokemon.health = 0;
        alert(pokemon.name + ' has fainted!');
    }
}

function resetPokeball() {
    const pokeball = document.getElementById('pokeball');
    pokeball.style.visibility = 'hidden';
    pokeball.style.top = '50%';
    pokeball.style.left = '50%';
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

function battle(attacker, defender, healthBarDefender, attackerId, targetId) {
    if (isAttacking) return;
    isAttacking = true;
    showPokeball(attackerId, targetId);
    const damage = attacker.attack();
    defender.health -= damage;
    updateHealthBar(defender, healthBarDefender);
}

const health1 = document.getElementById('health1');
const health2 = document.getElementById('health2');

document.getElementById('attack1').addEventListener('click', function() {
    battle(pikachu, charmander, health2, 'pokemon1', 'pokemon2');
});

document.getElementById('special1').addEventListener('click', function() {
    battle(pikachu, charmander, health2, 'pokemon1', 'pokemon2');
});

document.getElementById('attack2').addEventListener('click', function() {
    battle(charmander, pikachu, health1, 'pokemon2', 'pokemon1');
});

document.getElementById('special2').addEventListener('click', function() {
    battle(charmander, pikachu, health1, 'pokemon2', 'pokemon1');
});
