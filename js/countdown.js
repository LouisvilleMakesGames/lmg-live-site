function updateCountdown() {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), 8, 12, 24, 0, 0); // September 12th, 24:00 (midnight)
    
    const diff = targetDate - now;
  
    if (diff <= 0) {
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      return;
    }
  
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
  }
  
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Initial call to update immediately
  