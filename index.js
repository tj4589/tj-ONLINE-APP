function quizstarted() {
  const mins = parseInt(document.getElementById("minutes").value) || 0;
  const secs = parseInt(document.getElementById("seconds").value) || 0;

  let timeLeft = mins * 60 + secs;

  timer = setInterval(() => {
    let displayMins = Math.floor(timeLeft / 60);
    let displaySecs = timeLeft % 60;
    let formattedTime = `${String(displayMins).padStart(2, "0")}:${String(
      displaySecs
    ).padStart(2, "0")}`;
    timediv.innerHTML = formattedTime;

    timeLeft--;
    if (timeLeft === 10) {
      let blinkCount = 0;
      const blinkInterval = setInterval(() => {
        timediv.classList.toggle("beeping");
        blinkCount++;

        if (blinkCount >= 20) {
          // 10 toggles = 5 blinks
          clearInterval(blinkInterval);
          timediv.classList.remove("beeping"); // make sure it's off
        }
      }, 500); // toggle every 0.5 sec
    }
    if (timeLeft < 0) {
      clearInterval(timer);
      timediv.innerHTML = "Time's up!";
        const total = Object.keys(userAnswers).length;
        let finalscore = calculateScore();
        alert(`Your score: ${finalscore}\nYou missed: ${total - finalscore}`);
        document.querySelector(".quizContainer-start").style.display = "none";
        document.querySelector(".mainQuiz").style.display = "none";
    }
  }, 1000);
}
let timer;
const startbtn = document.querySelector(".startBTN");
const subbtn = document.querySelector(".subBtn");
const timediv = document.querySelector(".time");
const numberquestion = document.querySelector(".number");
subbtn.addEventListener("click", () => {
  const total = Object.keys(userAnswers).length;
  let finalscore = calculateScore();
  alert(`Your score: ${finalscore}\nYou missed: ${total - finalscore}`);
  document.querySelector(".quizContainer-start").style.display = "none";
  document.querySelector(".mainQuiz").style.display = "none";
});
startbtn.addEventListener("click", function () {
  startbtn.classList.add("startBTNpressed");
  setTimeout(() => {
    startbtn.classList.remove("startBTNpressed");
  }, 100);
  document.querySelector(".quizContainer-start").style.display = "none";
  document.querySelector(".mainQuiz").style.display = "flex";
  quizstarted();
});

var swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  speed: 500,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  keyboard: {
    enabled: true,
  },
  navigation: {
    nextEl: ".next",
    prevEl: ".previous",
  },
  mousewheel: {
    thresholdDelta: 70,
  },
  loop: false,
  slidesPerView: 1,
  on: {
    slideChange: function () {
      updateNumberHighlight(this.realIndex);
    },
  },
});
const indicators = document.querySelectorAll(".numbersIndicators li");
indicators.forEach((li, index) => {
  li.addEventListener("click", () => {
    swiper.slideTo(index);
  });
});
const numberDisplay = document.querySelector(".number");
function updateNumberHighlight(activeIndex) {
  indicators.forEach((li, index) => {
    li.classList.toggle("active", index === activeIndex);
  });

  if (numberDisplay) {
    const textNode = [...numberDisplay.childNodes].find(
      (node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ""
    );

    if (textNode) {
      textNode.nodeValue = `${activeIndex + 1}/20`;
    }
  }
}
const slides = document.querySelectorAll(".swiper-slide");
// const userAnswers = {}; // store answers
const liveScoreDisplay = document.getElementById("Livescore");

let userAnswers = new Array(slides.length).fill(null);

function calculateScore() {
  let score = 0;

  slides.forEach((slide, index) => {
    const correct = slide.getAttribute("data-answer");
    const picked = userAnswers[index];

    if (picked === correct) {
      score++;
    }
  });

  return score;
}

function updateLiveScore() {
  const score = calculateScore();
  liveScoreDisplay.textContent = `Score: ${score}/${slides.length}`;
}
slides.forEach((slide, index) => {
  const radios = slide.querySelectorAll('input[type="radio"]');
  const correctAnswer = slide.getAttribute("data-answer");

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      userAnswers[index] = radio.value;
      console.log(userAnswers);
      console.log(radio.value);
      console.log(correctAnswer);

      radios.forEach((r) => {
        r.parentElement.classList.remove("correct", "wrong");
      });

      if (radio.value === correctAnswer) {
        radio.parentElement.classList.add("correct");
      } else {
        radio.parentElement.classList.add("wrong");
      }
      updateLiveScore();
    });
  });
});
