// Carousel Functionality 
const images = [
  { src: "product launch.jpeg", title: "Product Launch" },
  { src: "Fashionshow.jpg", title: "Fashion Show" },
  { src: "tech.jpg", title: "Tech Conference" }
];


let currentIndex = 0;

function showImage(index) {
  const imageElement = document.getElementById("carousel-image");
  const titleElement = document.getElementById("carousel-title");

  imageElement.src = images[index].src;
  titleElement.textContent = images[index].title;
}


function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

// Quiz Functionality 
const quizData = [
  {
    question: "Which month hosts the most music festivals?",
    options: ["January", "June", "December"],
    answer: "June"
  },
  {
    question: "What is the best time to book event tickets?",
    options: ["Last minute", "One month ahead", "On the day"],
    answer: "One month ahead"
  },
  {
    question: "Which of these is NOT a type of event?",
    options: ["Workshop", "Hackathon", "Elevator"],
    answer: "Elevator"
  },
  {
    question: "Which platform is often used for virtual events?",
    options: ["Zoom", "Google Maps", "Photoshop"],
    answer: "Zoom"
  },
  {
    question: "Which event is focused on learning new skills?",
    options: ["Workshop", "Concert", "Picnic"],
    answer: "Workshop"
  }
];


function loadQuiz() {
  const quizDiv = document.getElementById("quiz");
  quizData.forEach((item, index) => {
    const questionBlock = document.createElement("div");
    questionBlock.innerHTML = `
      <p><strong>Q${index + 1}:</strong> ${item.question}</p>
      <select id="q${index}">
        <option value="">Select</option>
        ${item.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
      </select>
    `;
    quizDiv.appendChild(questionBlock);
  });
}

function submitQuiz() {
  let score = 0;
  quizData.forEach((item, index) => {
    const selected = document.getElementById(`q${index}`).value;
    if (selected === item.answer) {
      score++;
    }
  });
  document.getElementById("quiz-result").textContent = `You scored ${score} out of ${quizData.length}`;
}

// Weather Functionality
const apiKey = "2cd0abec2d77b8be0db10136a77d4d3b"; // Replace with your actual OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p style='color:red;'>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  resultDiv.innerHTML = "Loading...";

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const cityName = data.name;
      resultDiv.innerHTML = `
        <h4>🌦️ Weather in ${cityName}</h4>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Condition:</strong> ${description}</p>
      `;
    })
    .catch(error => {
      console.error("Error:", error);
      resultDiv.innerHTML = `<p style="color:red;">Failed to fetch weather. Please check the city name or try again later.</p>`;
    });
}

//  DOM Initialization 
document.addEventListener("DOMContentLoaded", () => {
  showImage(currentIndex); // Show initial image
  loadQuiz();              // Load quiz questions
});
