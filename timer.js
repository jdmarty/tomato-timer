var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");
var totalSeconds = 0;
var restSeconds = 0;
var secondsElapsed = 0;
var interval;

function updateMin (time) {
  let currentMin = Math.floor(time / 60);
  if (currentMin < 1) {
    minutesDisplay.innerHTML = '0' + currentMin;
  }
  minutesDisplay.innerHTML = currentMin;
}

function updateSeconds (time) {
  let currentSeconds = (time % 60);
  if (currentSeconds < 10) {
    secondsDisplay.innerHTML = '0' + currentSeconds;
  } else {
    secondsDisplay.innerHTML = currentSeconds;
  }
}

function updateTime() {
  let type = statusToggle.checked;
  if (type) {
    console.log(totalSeconds);
    if (totalSeconds == 0) {
      clearInterval(interval);
      alert('All done!');
    }
    updateMin(totalSeconds);
    updateSeconds(totalSeconds);

    totalSeconds--;
  } else {
    if (restSeconds == 0) {
      clearInterval(interval);
    }
    console.log(restSeconds);
    updateMin(restSeconds);
    updateSeconds(restSeconds);

    restSeconds--;
  }
}

function startTimer() {
  clearInterval(interval);
  let type = statusToggle.checked;
  if (type) {
    if (totalSeconds == 0) {
      totalSeconds = workMinutesInput.value * 60;
    } else {
      //We were paused
    }
  } else {
    if (restSeconds == 0) {
      restSeconds = restMinutesInput.value * 60;
    } else {
      //We were paused
    }
  }
  interval = setInterval(updateTime, 1000);
}

function pauseTimer() {
  clearInterval(interval);
}

function stopTimer() {
  clearInterval(interval);
  totalSeconds = 0;
  secondsDisplay.innerHTML = '00';
  minutesDisplay.innerHTML = workMinutesInput.value;
}

function updateTimerDisplay () {
  secondsDisplay.innerHTML = '00';
  minutesDisplay.innerHTML = workMinutesInput.value;
}

function updateStatus() {
if (statusToggle.checked) {
    statusSpan.innerHTML = 'Working';
  }
  else {
    statusSpan.innerHTML = 'Resting';
  }
}


statusToggle.addEventListener("change", updateStatus);
workMinutesInput.addEventListener("change", updateTimerDisplay);
pauseButton.addEventListener("click", pauseTimer);
playButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
