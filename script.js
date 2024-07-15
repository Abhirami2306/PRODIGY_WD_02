const initialCountDownDate = new Date().getTime(); // Start counting from now
let countDownDate = initialCountDownDate;
let countdownInterval;

function updateCountdown() {
  const now = new Date().getTime();
  const distance = now - countDownDate; // Calculate the elapsed time

  const hours = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((distance % 1000) / 10);

  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
  document.getElementById("milliseconds").innerText = milliseconds;

  setCircleProgress("hours-circle", hours / 24); // White dot
  setCircleProgress("minutes-circle", minutes / 60); // White dot
  setCircleProgress("seconds-circle", seconds / 60); // White dot
  setCircleProgress("milliseconds-circle", milliseconds / 100); // White dot
}

function setCircleProgress(circleId, ratio) {
  const circle = document.getElementById(circleId);
  const circumference = circle.r.baseVal.value * 2 * Math.PI;
  const offset = circumference * (1 - ratio);
  circle.style.strokeDashoffset = offset;

  const dotId = `${circleId}-dot`;
  let dot = document.getElementById(dotId);
  if (!dot) {
    dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("id", dotId);
    dot.setAttribute("r", "5"); // Adjust radius of the moving dot
    dot.setAttribute("fill", "#ffffff"); // Set dot color to white
    dot.setAttribute("class", "glowing-dot");
    circle.parentNode.appendChild(dot);
  }

  const dotAngle = ratio * 360; // Calculate angle in degrees
  const dotX =
    50 + Math.cos(degreesToRadians(dotAngle - 90)) * circle.r.baseVal.value;
  const dotY =
    50 + Math.sin(degreesToRadians(dotAngle - 90)) * circle.r.baseVal.value;
  dot.setAttribute("cx", dotX);
  dot.setAttribute("cy", dotY);
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

document.getElementById("start").addEventListener("click", function () {
  if (!countdownInterval) {
    countDownDate = new Date().getTime(); // Start fresh from current time
    countdownInterval = setInterval(updateCountdown, 10);
  }
});

document.getElementById("stop").addEventListener("click", function () {
  clearInterval(countdownInterval);
  countdownInterval = null;
});

document.getElementById("reset").addEventListener("click", function () {
  clearInterval(countdownInterval);
  countdownInterval = null;
  countDownDate = new Date().getTime(); // Reset countDownDate to current time

  document.getElementById("hours").innerText = "0";
  document.getElementById("minutes").innerText = "0";
  document.getElementById("seconds").innerText = "0";
  document.getElementById("milliseconds").innerText = "0";

  setCircleProgress("hours-circle", 0); // White dot
  setCircleProgress("minutes-circle", 0); // White dot
  setCircleProgress("seconds-circle", 0); // White dot
  setCircleProgress("milliseconds-circle", 0); // White dot

  document.getElementById("laps").innerHTML = "";
});

document.getElementById("lap").addEventListener("click", function () {
  const hours = document.getElementById("hours").innerText;
  const minutes = document.getElementById("minutes").innerText;
  const seconds = document.getElementById("seconds").innerText;
  const milliseconds = document.getElementById("milliseconds").innerText;
  const lapTime = `${hours} Hours ${minutes} Minutes ${seconds} Seconds ${milliseconds} Milliseconds`;
  const lapList = document.getElementById("laps");
  const lapItem = document.createElement("li");
  lapItem.textContent = lapTime;
  lapList.appendChild(lapItem);
});

// Initial call to display the countdown without waiting for 1 second
updateCountdown();
