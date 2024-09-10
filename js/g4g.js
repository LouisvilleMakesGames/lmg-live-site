document.addEventListener("DOMContentLoaded", function() {
    // Donation data
    const donationGoal = 5000;
    const currentDonation = 545;  
    const donors = 21;

    // HTML Elements
    const donationAmountElement = document.getElementById("current-donation-amount");
    const progressBarElement = document.getElementById("progress-bar");
    const donorCountElement = document.getElementById("donor-count-message");
    const percentOfGoalElement = document.getElementById("percent-of-goal");

    // Count up animation for donation amount and progress bar
    let startAmount = 0;
    let startPercentage = 0;
    const duration = 2000; // Total duration for the animation in milliseconds
    const frameRate = 60; // Number of frames per second (60fps)
    const totalFrames = Math.round((duration / 1000) * frameRate);
    const incrementAmount = currentDonation / totalFrames;
    const incrementPercentage = Math.floor((currentDonation / donationGoal) * 100) / totalFrames;

    let frame = 0;

    const animate = setInterval(function() {
        frame++;

        // Increment donation amount and update text
        startAmount += incrementAmount;
        donationAmountElement.textContent = Math.floor(startAmount);

        // Increment progress bar percentage and update width
        startPercentage += incrementPercentage;
        progressBarElement.style.width = `${Math.floor(startPercentage)}%`;
        progressBarElement.setAttribute('aria-valuenow', Math.floor(startPercentage));

        // End the animation when reaching the final donation amount
        if (frame >= totalFrames) {
            clearInterval(animate);
            donationAmountElement.textContent = currentDonation;  // Set to the exact donation amount
            progressBarElement.style.width = `${Math.floor((currentDonation / donationGoal) * 100)}%`;  // Set exact percentage
        }
    }, 1000 / frameRate);

    // Display donor thank you message
    donorCountElement.textContent = `Thank you so much to our ${donors} donors so far!`;

    // Display percent of the goal reached
    const donationPercentage = Math.floor((currentDonation / donationGoal) * 100);
    percentOfGoalElement.textContent = `(${donationPercentage}% of our goal)`;
});
