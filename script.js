'use strict';
//on sélectionne les scores 0 et 1
const  player0El = document.querySelector('.player--0')
const  player1El = document.querySelector('.player--1')
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const currentOEl = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');


//on initiale scrore 0 et 1
   let  scores, activePlayer,curentScore , playing;
const init = function(){
    
    scores = [0,0];
    activePlayer = 0;
    curentScore = 0;
    playing = true;
    score0.textContent = 0;
    score1.textContent = 0;
    currentOEl .textContent= 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
}

init();

const switchPlayer = function (){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    curentScore = 0;
    activePlayer = activePlayer === 0 ? 1: 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//rolling dice funtionality
btnRoll.addEventListener('click', function(){
    if(playing){

    
        //on genere un dee aleatoire
        const dice = Math.trunc(Math.random() * 6) + 1;
        

        //on affiche le dee
        diceEl.classList.remove('hidden');

        //on change de source
        diceEl.src=`dice-${dice}.png`;


        //Check for rolled 1: if true, on change de joueur
        if(dice != 1){
            //add dice to current score
            curentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = curentScore;
            //currentOEl.textContent = curentScore; // à changé plustart
        }else{
            //change de couleur et passe le score au playeur 2
            // passe au secong joueur
        switchPlayer();

        }
    }

    btnHold.addEventListener('click', function(){
        if(playing){

            //ajout du curent score au scrore de player
            scores[activePlayer] += curentScore;
            document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
            //check if player score is >=100
            if(scores[activePlayer] >= 20){
                playing = false;
                diceEl.classList.add('hidden');
               // console.log(activePlayer);
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
                //finish the game
            }else{
                //change de player
                switchPlayer();
            }
        }

    });

});


btnNew.addEventListener('click',init);