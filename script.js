// Getting all the elements
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");
const resetButton = document.getElementById("reset");
const timeInput = document.getElementById("input-time");
const inputDiv = document.getElementById("input-div");

// Setting the time global variables
let sec;
let min;
let timer;
let time;
let isRunning = false;

// Function to hide the input field
function hideField(inputDivObject) {
	inputDivObject.classList.add("hidden");
}
function viewField(inputDivObject) {
	inputDivObject.classList.remove("hidden");
}
// Functions to view/hide the buttons
function viewButton(buttonObject) {
	buttonObject.classList.remove("hidden");
}
function hideButton(buttonObject) {
	buttonObject.classList.add("hidden");
}

// Countdown logic
function startCountdown(){
	// Checking to decrement minutes
	if (sec === 0) {
		min--;
		sec = 59;
	}
	// Formatting seconds to be, eg: 08 instead of 8
	if (sec < 10) {
		timerElement.innerHTML=min+':0'+sec;
	} else {
    	timerElement.innerHTML=min+':'+sec;
	}
	// Decrementing the timer
    sec--;
    // Checking for the end condition
    if (min < 0) {
    	isRunning = false;
    	timerElement.innerHTML='00'+':'+'00';
        clearInterval(timer);
        // Hide the pause button
		hideButton(pauseButton);
        // Hide the resume button (edge case)
		hideButton(resumeButton);
        alert("Time's up! 😃"); // Gets stuck on 00:01 and the above commands don't work, how to fix?
    }
}

// Buttons Logic
function startTimer(){
	if (!isRunning) {
		sec = 0;
		time = timeInput.value;
		min = time;
		if (time<1) {
			alert("Time can't be less than one. Setting time to 1.");
			min = 1;
		}
		if (isNaN(min)) {
			alert("Value entered is not a number. Please try again");
			timeInput.value = 1;
			timerElement.innerHTML = timeInput.value+':00';
			return;
		}
	    isRunning = true;
	    // Hiding the input field
	    hideField(inputDiv);
	    // Hiding the start button
	    hideButton(startButton);
	    // Introducing the reset button
	    viewButton(resetButton);
	    // Introducing the pause button
	    pauseButton.classList.remove("hidden");
	    timer = setInterval(startCountdown, 100);
	}
}

function pauseTimer() {
	isRunning = false;
	clearInterval(timer);
	// Hiding the pause button
	hideButton(pauseButton)
	// Introducing the resume button
	viewButton(resumeButton);
}


function resumeTimer() {
	// Hiding the resume button
	hideButton(resumeButton);
	// Reintroducing the pause button
	viewButton(pauseButton);
	// Resuming the timer
	// Note: We can't use startTimer() here since it will reset the timer
	if (!isRunning) {
	    isRunning = true;
	    timer = setInterval(startCountdown, 100);
	}
}

function resetTimer() {
	isRunning = false;
	clearInterval(timer);
	sec = 0;
	min = timeInput.value;
	if (sec < 10) {
		timerElement.innerHTML=min+':0'+sec;
	} else {
    	timerElement.innerHTML=min+':'+sec;
	}
	// Hide the pause button
	hideButton(pauseButton);
	// Hide the reset button
	hideButton(resetButton);
	// Hide the resume button (edge case)
	hideButton(resumeButton);
	// Show the start button
	viewButton(startButton);
	// Showing the input field
	viewField(inputDiv);
}


function updateTimer() {
	timerElement.innerHTML = timeInput.value+':00';
}

// Adding all the button's event listeners
startButton.addEventListener("click",startTimer);
pauseButton.addEventListener("click",pauseTimer);
resumeButton.addEventListener("click",resumeTimer);
resetButton.addEventListener("click",resetTimer);
timeInput.addEventListener("input",updateTimer);


