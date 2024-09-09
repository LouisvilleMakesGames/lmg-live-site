document.addEventListener("DOMContentLoaded", function() {
    // Donation data
    const donationGoal = 5000;
    const currentDonation = 290;  
    const donors = 13;

    // HTML Elements
    const donationAmountElement = document.getElementById("current-donation-amount");
    const progressBarElement = document.getElementById("progress-bar");
    const donorCountElement = document.getElementById("donor-count-message");
    const percentOfGoalElement = document.getElementById("percent-of-goal");

    // Count up animation for donation amount
    let startAmount = 0;
    const countUpSpeed = 20;  // Speed for counting up in smaller increments
    const increment = currentDonation / 100;  // Small increments for the animation

    const countUp = setInterval(function() {
        // Ensure we don't go over the current donation amount
        if (startAmount + increment >= currentDonation) {
            clearInterval(countUp);
            donationAmountElement.textContent = currentDonation;  // Set to the exact donation amount
        } else {
            startAmount += increment;  // Increment by a small value
            donationAmountElement.textContent = Math.floor(startAmount);  // Update with integer value
        }
    }, countUpSpeed);

    // Calculate percentage of the goal reached and round it down to the nearest whole number
    const donationPercentage = Math.floor((currentDonation / donationGoal) * 100);
    progressBarElement.style.width = `${donationPercentage}%`;
    progressBarElement.setAttribute('aria-valuenow', donationPercentage);

    // Display donor thank you message
    donorCountElement.textContent = `Thank you so much to our ${donors} donors so far!`;

    // Display percent of the goal reached
    percentOfGoalElement.textContent = `(${donationPercentage}% of our goal)`;
});
