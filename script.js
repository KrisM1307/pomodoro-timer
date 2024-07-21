const pomodoroTime = document.querySelector('#pomodoro-time');
const startButton = document.querySelector('#start');
const breakButton = document.querySelector('#break');
const resetButton = document.querySelector('#reset');
const pomodoroButton = document.querySelector('#pomodoro');

let timeLeft = 1500;
let pomodoroInitialTime = 1500;
let breakInitialTime = 300;
let initialTime = pomodoroInitialTime;
let timerId;

function formatTime(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function toggleTimer() {
    if (startButton.textContent === 'start') {
        timerId = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timerId);
                if (initialTime === pomodoroInitialTime) {
                    timeLeft = pomodoroInitialTime;
                    pomodoroTime.textContent = '25:00';
                } else {
                    timeLeft = breakInitialTime;
                    pomodoroTime.textContent = '05:00';
                }
                startButton.textContent = 'start';
                timeLeft = initialTime;
            } else {
                pomodoroTime.textContent = formatTime(timeLeft);
            }
        }, 5);
        startButton.textContent = 'stop';
    } else {
        clearInterval(timerId);
        startButton.textContent = 'start';
    }
}

startButton.addEventListener('click', toggleTimer);

breakButton.addEventListener('click', function() {
    breakButton.classList.add('active');
    pomodoroButton.classList.remove('active');
    clearInterval(timerId);
    initialTime = breakInitialTime;
    timeLeft = breakInitialTime;
    pomodoroTime.textContent = '05:00';
    startButton.textContent = 'start';
})

pomodoroButton.addEventListener('click', function() {
    pomodoroButton.classList.add('active');
    breakButton.classList.remove('active');
    clearInterval(timerId);
    initialTime = pomodoroInitialTime;
    timeLeft = pomodoroInitialTime;
    pomodoroTime.textContent = '25:00';
    startButton.textContent = 'start';
})

resetButton.addEventListener('click', function() {
    clearInterval(timerId);
    timeLeft = initialTime;
    pomodoroTime.textContent = formatTime(timeLeft);
    startButton.textContent = 'start';
});