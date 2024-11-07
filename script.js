let countDownDate;
let interval;

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

// Set the countdown based on user input
function setUserDate() {
    const userDateInput = document.getElementById("userDate").value;
    if (userDateInput) {
        countDownDate = new Date(userDateInput).getTime();
        if (interval) clearInterval(interval);
        startCountdown();
    } else {
        alert("Please select a valid date and time.");
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function updateProgressBar(duration) {
    const progressBar = document.getElementById("progressBar");
    const totalDuration = countDownDate - new Date().getTime();
    const percentage = 100 - (duration / totalDuration) * 100;
    progressBar.style.width = `${Math.max(0, percentage)}%`;
}

// Start the countdown 
function startCountdown() {
    interval = setInterval(() => {
        const now = new Date().getTime();
        const duration = countDownDate - now;

        if (duration < 0) {
            clearInterval(interval);
            updateDuration(0);
            notifyUser("The day has arrived!");
            return;
        }

        if (duration <= 24 * 60 * 60 * 1000 && duration > 23 * 60 * 60 * 1000) {
            notifyUser("The day is within 24 hours!");
        }

        updateDuration(duration);
    }, 1000);
}

// Update the countdown display
function updateDuration(duration) {
    const daysValue = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hoursValue = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesValue = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const secondsValue = Math.floor((duration % (1000 * 60)) / 1000);

    daysElement.innerHTML = daysValue;
    hoursElement.innerHTML = hoursValue;
    minutesElement.innerHTML = minutesValue;
    secondsElement.innerHTML = secondsValue;
}

// Notify the user 
function customNotify(message) {
    const notification = document.getElementById("notification");
    notification.innerText = message;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

function notifyUser(message) {
    if (Notification.permission === "granted") {
        new Notification(message);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(message);
            }
        });
    }
}



// Request notification permission on page load 
document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});
