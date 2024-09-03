const QUIZ_TIME = 90;
const QUIZ_QUESTION_POINTS = 1;
const PASS_PERCENT = 50;

let setIntervalID;
let quiz = [];
let timer = 0;
let timerAudio = document.getElementById("timerAudio");
let cheerAudio = document.getElementById("cheerAudio");
let booAudio = document.getElementById("booAudio");

const questions = [
  {
    question: "What is the fav food of nepali",
    answers: [
      { text: "momo", correct: true },
      { text: "Dal-bhat", correct: false },
      { text: "pani-puri", correct: false },
      { text: "samosa", correct: false },
    ],
  },
  {
    question: "What is the capital of Nepal",
    answers: [
      { text: "Kathmandu", correct: true },
      { text: "Chitiwan", correct: false },
      { text: "Pokhara", correct: false },
      { text: "Lumbini", correct: false },
    ],
  },
  {
    question: "Where was Gautam buddha born",
    answers: [
      { text: "Nepal", correct: true },
      { text: "China", correct: false },
      { text: "Bhutan", correct: false },
      { text: "Korea", correct: false },
    ],
  },
  {
    question: "Where is your Name",
    answers: [
      { text: "Potato", correct: false },
      { text: "Monkey", correct: false },
      { text: "Danger", correct: false },
      { text: "Hero", correct: true },
    ],
  },
];
const questionElements = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElements.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.map((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedbtn = e.target;
  const iscorrect = selectedbtn.dataset.correct === "true";
  if (iscorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).map((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElements.innerHTML = `You Scored ${score} out of ${questions.length} now dance 🥳🥳🥳🥳🥳🥳🥳🥳🥳`;
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
