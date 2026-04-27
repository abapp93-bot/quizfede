
const questions = [
  {
    "type": "choice",
    "title": "Chi, secondo te, tra questi è stato (o sarebbe stato) un ottimo Presidente del Consiglio?",
    "options": [
      "Silvio Berlusconi",
      "Giorgia Meloni",
      "Romano Prodi",
      "Enrico Berlinguer"
    ]
  },
  {
    "type": "choice",
    "title": "Chi, tra questi, è stato secondo te il miglior Presidente della Repubblica?",
    "options": [
      "Giorgio Napolitano",
      "Giovanni Leone",
      "Carlo Azeglio Ciampi",
      "Giuseppe Saragat"
    ]
  },
  {
    "type": "choice",
    "title": "Chi, tra questi “esponenti del marxismo ortodosso”, è stato il più bravino?",
    "options": [
      "Stalin",
      "Lenin",
      "Mao Zedong",
      "Che Guevara"
    ]
  },
  {
    "type": "choice",
    "title": "Chi, tra i seguenti, è meno di destra?",
    "options": [
      "Federico Tonin",
      "Giulia Barrese",
      "Enrico Caprara",
      "Benito Mussolini"
    ]
  },
  {
    "type": "choice",
    "title": "Sesso, baci, uccidi — scegli la combinazione",
    "options": [
      "Sesso: Ilaria Salis · Baci: Elly Schlein · Uccidi: Benito Mussolini",
      "Sesso: Benito Mussolini · Baci: Elly Schlein · Uccidi: Ilaria Salis",
      "Sesso: Elly Schlein · Baci: Benito Mussolini · Uccidi: Ilaria Salis",
      "Sesso: Ilaria Salis · Baci: Benito Mussolini · Uccidi: Elly Schlein"
    ]
  },
  {
    "type": "choice",
    "title": "Quale tra questi leader politici ammiri di più?",
    "options": [
      "Donald Trump",
      "Benjamin Netanyahu",
      "Vladimir Putin",
      "Mohamed Hamdan Dagalo"
    ]
  },
  {
    "type": "choice",
    "title": "Quale tra questi leader politici ammiri di meno?",
    "options": [
      "Iosif Stalin",
      "Mao Zedong",
      "Kim Jong-un",
      "Pol Pot"
    ]
  },
  {
    "type": "slider",
    "title": "Il tasso di disoccupazione in Italia si attesta al 5,3%, con sempre più persone in difficoltà ad arrivare a fine mese. A tal proposito: quanto è importante per te mostrare vicinanza al popolo palestinese?",
    "note": "Motiva la risposta"
  },
  {
    "type": "choice",
    "title": "Avete sempre criticato aspramente l’operato delle forze dell’ordine, preferendo — in caso di pericolo — l’intervento di Superman e della Fatina dei denti. Chi tra questi due ha saputo offrirti miglior supporto?",
    "options": [
      "Superman",
      "La fatina dei denti"
    ]
  },
  {
    "type": "choice",
    "title": "Per vincere le elezioni a Vigevano avete deciso di presentarvi con il classico “campo largo”. Mi confermi che sono vere le voci del lungo corteggiamento nei confronti di Luca Battista? L’accordo è poi svanito per volontà di quest’ultimo?",
    "options": [
      "Sì, e purtroppo sì :(",
      "No, purtroppo sì :(",
      "Sì, ma ci stiamo ancora lavorando",
      "Non posso rispondere: ci sono indagini in corso"
    ]
  },
  {
    "type": "text",
    "title": "Ho letto attentamente il vostro programma elettorale. Mi piace molto l’idea delle selezioni per poter diventare un “bimbo di Rossella”. Mi puoi spoilerare le prove che dovrò sostenere? PS: sono già munito di buzza e gobba del bisonte.",
    "placeholder": "Scrivi qui la risposta istituzionale..."
  },
  {
    "type": "text",
    "title": "Come ultima domanda vorrei che analizzassi una situazione ben precisa e, perché no, facessi anche un po’ di autocritica. In un confronto politico con Santa, cosa ti manca per riuscire a tenergli testa?",
    "placeholder": "Momento autocritica..."
  }
];

let current = 0;
const answers = [];

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const counter = document.getElementById("counter");
const progressFill = document.getElementById("progressFill");
const questionTitle = document.getElementById("questionTitle");
const answerArea = document.getElementById("answerArea");

function imagePath(questionIndex, optionIndex) {
  // Quando hai le foto, mettile nella cartella images con nomi tipo:
  // q1-a.jpg, q1-b.jpg, q1-c.jpg, q1-d.jpg
  const letters = ["a", "b", "c", "d"];
  return `images/q${questionIndex + 1}-${letters[optionIndex]}.jpg`;
}

function fallbackImage(img) {
  img.onerror = null;
  img.src = "images/placeholder.svg";
}

function renderQuestion() {
  const q = questions[current];
  nextBtn.disabled = true;
  nextBtn.textContent = current === questions.length - 1 ? "Vedi risultato" : "Prossima domanda";

  counter.textContent = `Domanda ${current + 1} di ${questions.length}`;
  progressFill.style.width = `${(current / questions.length) * 100}%`;
  questionTitle.textContent = q.title;
  answerArea.innerHTML = "";

  if (q.type === "choice") {
    const grid = document.createElement("div");
    grid.className = "answers";

    q.options.forEach((option, index) => {
      const card = document.createElement("article");
      card.className = "answer-card";
      card.innerHTML = `
        <img src="${imagePath(current, index)}" alt="${option}" onerror="fallbackImage(this)">
        <div class="label">${option}</div>
      `;
      card.addEventListener("click", () => {
        document.querySelectorAll(".answer-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        answers[current] = option;
        nextBtn.disabled = false;
      });
      grid.appendChild(card);
    });

    answerArea.appendChild(grid);
  }

  if (q.type === "slider") {
    answerArea.innerHTML = `
      <div class="slider-wrap">
        <div>Valore selezionato:</div>
        <div class="slider-value" id="sliderValue">5</div>
        <input id="slider" type="range" min="1" max="10" value="5">
        <p class="small-note">${q.note || ""}</p>
        <textarea id="motivation" placeholder="Motiva la risposta, possibilmente senza convocare una conferenza stampa."></textarea>
      </div>
    `;
    const slider = document.getElementById("slider");
    const sliderValue = document.getElementById("sliderValue");
    slider.addEventListener("input", () => sliderValue.textContent = slider.value);
    answers[current] = { value: slider.value, motivation: "" };
    nextBtn.disabled = false;
  }

  if (q.type === "text") {
    answerArea.innerHTML = `
      <div class="text-wrap">
        <textarea id="openAnswer" placeholder="${q.placeholder || "Scrivi qui..."}"></textarea>
        <p class="small-note">Risposta aperta. Il comitato valuterà con assoluta imparzialità.</p>
      </div>
    `;
    answers[current] = "";
    nextBtn.disabled = false;
  }
}

startBtn.addEventListener("click", () => {
  start.classList.add("hidden");
  quiz.classList.remove("hidden");
  renderQuestion();
});

nextBtn.addEventListener("click", () => {
  const q = questions[current];

  if (q.type === "slider") {
    answers[current] = {
      value: document.getElementById("slider").value,
      motivation: document.getElementById("motivation").value
    };
  }

  if (q.type === "text") {
    answers[current] = document.getElementById("openAnswer").value;
  }

  current++;

  if (current >= questions.length) {
    quiz.classList.add("hidden");
    result.classList.remove("hidden");
    progressFill.style.width = "100%";
  } else {
    renderQuestion();
  }
});

restartBtn.addEventListener("click", () => {
  current = 0;
  answers.length = 0;
  result.classList.add("hidden");
  start.classList.remove("hidden");
});
