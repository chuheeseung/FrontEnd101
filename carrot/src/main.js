'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

/*
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
*/
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

/*
const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');
*/

let started = false;
let score = 0;
let timer = undefined;

/*
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');
*/

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    startGame(); // 클릭이 되면 startGame()을 호출하라
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClicklistener(onItemClick);

function onItemClick(event) {
    if (!started) { // 게임이 시작하지 않을 때 작동하는 것 막음
        return;
    }

    const target = event.target;
    if (item === 'carrrot') {
        score++;
        updateScoreBoard();

        if (score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (item === 'bug') {
        finishGame(false);
    }
}

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
    started = !started;
})

/*
popUpRefresh.addEventListener('click', () => {
    startGame();
    hidePopUp(); 
})
*/

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    //playSound(bgSound);
    sound.playBackground();
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    // showPopUdWithText('REPLAY?');
    gameFinishBanner.showWithText('REPLAY?');
    // playSound(alertSound);
    sound.playAlert();
    // stopSound(bgSound);
    sound.stopBackground();
}

function finishGame(win) {
    started = false;
    hideGameButton();

    if (win) {
        // playSound(winSound);
        sound.playWin();
    } else {
        // playSound(bugSound);
        sound.playBug();
    }

    stopGameTimer();
    stopSound(bgSound);
    //showPopUdWithText(win? 'YOU WON 🎆': 'YOU LOST 😫');
    gameFinishBanner.showWithText(win ? 'YOU WON 🎆' : 'YOU LOST 😫');
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remaingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remaingTimeSec);
    timer = setInterval(() => {
        if (remaingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remaingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    gameTimer.innerText = `${minutes}:${seconds}`;
}

/*
function showPopUdWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up__hide');
}

function hidePopUp() {
    popUp.classList.add('pop-up__hide');
}
*/

function initGame() {
    score = 0;
    // field.innerHTML = ''; //새로 시작할 때마다 다시 리셋
    gameScore.innerText = CARROT_COUNT;
    gameField.init();

    // 벌레와 당근을 생성한 뒤 field에 추가

    // addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    // addItem('bug', BUG_COUNT, 'img/bug.png');

}

/*
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound() {
    sound.pause();
}
*/

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

/*
function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
*/