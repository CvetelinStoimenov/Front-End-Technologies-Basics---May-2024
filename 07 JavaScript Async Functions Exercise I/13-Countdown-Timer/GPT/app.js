document.getElementById('startButton').addEventListener('click', function () {
    const inputElement = document.getElementById('timeInput');
    let countdownTime = parseInt(inputElement.value);

    if (isNaN(countdownTime) || countdownTime <= 0) {
        console.error('Please enter a valid number of seconds.');
        return;
    }

    console.log(`Countdown started: ${countdownTime} seconds`);

    const intervalId = setInterval(() => {
        countdownTime--;

        if (countdownTime > 0) {
            console.log(`Time remaining: ${countdownTime} seconds`);
        } else {
            console.log('Countdown finished');
            clearInterval(intervalId);
            saveRemainingTime().then(() => {
                console.log('Remaining time saved asynchronously.');
            }).catch(error => {
                console.error('Failed to save remaining time:', error);
            });
        }
    }, 1000);
});

function saveRemainingTime() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulating async save operation
            resolve();
        }, 1000);
    });
}