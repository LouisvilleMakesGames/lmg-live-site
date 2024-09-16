document.addEventListener("DOMContentLoaded", function() {
    const donationGoal = 5000;

    function fetchDonationData() {
        fetch("https://g4g.lmg.giving/donation-data")
            .then(response => response.json())
            .then(data => {
                const currentDonation = data.raised;
                const donors = data.donors;

                const donationAmountElement = document.getElementById("current-donation-amount");
                const progressBarElement = document.getElementById("progress-bar");
                const donorCountElement = document.getElementById("donor-count-message");
                const percentOfGoalElement = document.getElementById("percent-of-goal");

                let startAmount = 0;
                let startPercentage = 0;
                const duration = 2000;
                const frameRate = 60;
                const totalFrames = Math.round((duration / 1000) * frameRate);
                const incrementAmount = currentDonation / totalFrames;
                const incrementPercentage = Math.floor((currentDonation / donationGoal) * 100) / totalFrames;

                let frame = 0;
                const animate = setInterval(function() {
                    frame++;
                    startAmount += incrementAmount;
                    donationAmountElement.textContent = Math.floor(startAmount);
                    startPercentage += incrementPercentage;
                    progressBarElement.style.width = `${Math.floor(startPercentage)}%`;
                    progressBarElement.setAttribute('aria-valuenow', Math.floor(startPercentage));

                    if (frame >= totalFrames) {
                        clearInterval(animate);
                        donationAmountElement.textContent = currentDonation;
                        progressBarElement.style.width = `${Math.floor((currentDonation / donationGoal) * 100)}%`;
                    }
                }, 1000 / frameRate);

                donorCountElement.textContent = donors;
                const donationPercentage = Math.floor((currentDonation / donationGoal) * 100);
                percentOfGoalElement.textContent = `(${donationPercentage}% of our goal)`;
            });
    }

    fetchDonationData();
    setInterval(fetchDonationData, 60000);
});
