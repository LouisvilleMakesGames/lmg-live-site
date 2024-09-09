document.addEventListener("DOMContentLoaded", function() {
    // Donation data
    const donationGoal = 5000;
    const currentDonation = 265;  
    const donors = 12;

    // HTML Elements
    const donationAmountElement = document.getElementById("current-donation-amount");
    const progressBarElement = document.getElementById("progress-bar");
    const donorCountElement = document.getElementById("donor-count-message");
    const percentOfGoalElement = document.getElementById("percent-of-goal");

    // Count up animation for donation amount
    let startAmount = 0;
    const countUpSpeed = 50;  // Speed for counting up

    const countUp = setInterval(function() {
        if (startAmount >= currentDonation) {
            clearInterval(countUp);
        } else {
            startAmount += 50;  // Increment
            donationAmountElement.textContent = startAmount;
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
