// Pixel Pledge Countdown Timer
function startCountdown() {
   const deadline = new Date("September 21, 2024 23:59:59").getTime();
   const countdownElement = document.getElementById("countdown");

   setInterval(function() {
      const now = new Date().getTime();
      const timeLeft = deadline - now;

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      if (timeLeft < 0) {
         clearInterval();
         countdownElement.innerHTML = "EXPIRED";
      }
   }, 1000);
}

document.addEventListener("DOMContentLoaded", startCountdown);
