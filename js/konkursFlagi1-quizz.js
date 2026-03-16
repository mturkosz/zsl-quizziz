const zakres = sessionStorage.getItem("quizZakres") || "wszystkie";
const ilosc = parseInt(sessionStorage.getItem("quizIlosc")) || 15;
const czasNaFlage = parseInt(sessionStorage.getItem("quizCzas"), 10);

console.log("Zakres:", zakres);
console.log("Ilość:", ilosc);
console.log("Czas na flagę:", czasNaFlage);

sessionStorage.removeItem("quizZakres");
sessionStorage.removeItem("quizIlosc");
sessionStorage.removeItem("quizCzas");

function normalize(str) {
    return str.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ł/g, "l");
}

const countries = {
    "ad":"Andora","ae":"Zjednoczone Emiraty Arabskie","af":"Afganistan","ag":"Antigua i Barbuda",
    "al":"Albania","am":"Armenia","ao":"Angola","ar":"Argentyna","at":"Austria","au":"Australia",
    "az":"Azerbejdżan","ba":"Bośnia i Hercegowina","bb":"Barbados","bd":"Bangladesz","be":"Belgia",
    "bf":"Burkina Faso","bg":"Bułgaria","bh":"Bahrajn","bi":"Burundi","bj":"Benin","bn":"Brunei",
    "bo":"Boliwia","br":"Brazylia","bs":"Bahamy","bt":"Bhutan","bw":"Botswana","by":"Białoruś",
    "bz":"Belize","ca":"Kanada","cd":"Demokratyczna Republika Konga","cf":"Republika Środkowoafrykańska",
    "cg":"Kongo","ch":"Szwajcaria","ci":"Wybrzeże Kości Słoniowej","cl":"Chile","cm":"Kamerun","cn":"Chiny",
    "co":"Kolumbia","cr":"Kostaryka","cu":"Kuba","cv":"Republika Zielonego Przylądka","cy":"Cypr",
    "cz":"Czechy","de":"Niemcy","dj":"Dżibuti","dk":"Dania","dm":"Dominika","do":"Dominikana",
    "dz":"Algieria","ec":"Ekwador","ee":"Estonia","eg":"Egipt","er":"Erytrea","es":"Hiszpania",
    "et":"Etiopia","fi":"Finlandia","fj":"Fidżi","fm":"Mikronezja","fr":"Francja","ga":"Gabon",
    "gb":"Wielka Brytania","gd":"Grenada","ge":"Gruzja","gh":"Ghana","gm":"Gambia","gn":"Gwinea",
    "gq":"Gwinea Równikowa","gr":"Grecja","gt":"Gwatemala","gw":"Gwinea Bissau","gy":"Gujana",
    "hn":"Honduras","hr":"Chorwacja","ht":"Haiti","hu":"Węgry","id":"Indonezja","ie":"Irlandia",
    "il":"Izrael","in":"Indie","iq":"Irak","ir":"Iran","is":"Islandia","it":"Włochy",
    "jm":"Jamajka","jo":"Jordania","jp":"Japonia","ke":"Kenia","kg":"Kirgistan","kh":"Kambodża",
    "ki":"Kiribati","km":"Komory","kn":"Saint Kitts i Nevis","kp":"Korea Północna","kr":"Korea Południowa",
    "kw":"Kuwejt","kz":"Kazachstan","la":"Laos","lb":"Liban","lc":"Saint Lucia","li":"Liechtenstein",
    "lk":"Sri Lanka","lr":"Liberia","ls":"Lesotho","lt":"Litwa","lu":"Luksemburg","lv":"Łotwa",
    "ly":"Libia","ma":"Maroko","mc":"Monako","md":"Mołdawia","me":"Czarnogóra","mg":"Madagaskar",
    "mh":"Wyspy Marshalla","mk":"Macedonia Północna","ml":"Mali","mm":"Mjanma","mn":"Mongolia",
    "mr":"Mauretania","mt":"Malta","mu":"Mauritius","mv":"Malediwy","mw":"Malawi","mx":"Meksyk",
    "my":"Malezja","mz":"Mozambik","na":"Namibia","ne":"Niger","ng":"Nigeria","ni":"Nikaragua",
    "nl":"Holandia","no":"Norwegia","np":"Nepal","nr":"Nauru","nz":"Nowa Zelandia","om":"Oman",
    "pa":"Panama","pe":"Peru","pg":"Papua-Nowa Gwinea","ph":"Filipiny","pk":"Pakistan","pl":"Polska",
    "ps":"Palestyna","pt":"Portugalia","pw":"Palau","py":"Paragwaj","qa":"Katar","ro":"Rumunia",
    "rs":"Serbia","ru":"Rosja","rw":"Rwanda","sa":"Arabia Saudyjska","sb":"Wyspy Salomona",
    "sc":"Seszele","sd":"Sudan","se":"Szwecja","sg":"Singapur","si":"Słowenia","sk":"Słowacja",
    "sl":"Sierra Leone","sm":"San Marino","sn":"Senegal","so":"Somalia","sr":"Surinam",
    "st":"Wyspy Świętego Tomasza i Książęca","sv":"Salwador","sy":"Syria","sz":"Eswatini",
    "td":"Czad","tg":"Togo","th":"Tajlandia","tj":"Tadżykistan","tl":"Timor Wschodni","tm":"Turkmenistan",
    "tn":"Tunezja","to":"Tonga","tr":"Turcja","tt":"Trynidad i Tobago","tv":"Tuvalu","tw":"Tajwan",
    "tz":"Tanzania","ua":"Ukraina","ug":"Uganda","us":"Stany Zjednoczone","uy":"Urugwaj",
    "uz":"Uzbekistan","va":"Watykan","vc":"Saint Vincent i Grenadyny","ve":"Wenezuela","vn":"Wietnam",
    "vu":"Vanuatu","ws":"Samoa","xk":"Kosowo","ye":"Jemen","za":"Republika Południowej Afryki",
    "zm":"Zambia","zw":"Zimbabwe"
};

const dependentTerritories = {
  "ai": "Anguilla","as": "Samoa Amerykańskie","aw": "Aruba","ax": "Wyspy Alandzkie",
  "bl": "Saint-Barthélemy","bm": "Bermudy","bq": "Holandia Karaibska","cc": "Wyspy Kokosowe",
  "ck": "Wyspy Cooka","cw": "Curaçao","cx": "Wyspa Bożego Narodzenia","eh": "Sahara Zachodnia",
  "fk": "Falklandy","fo": "Wyspy Owcze","gf": "Gujana Francuska","gg": "Guernsey","gi": "Gibraltar",
  "gl": "Grenlandia","gp": "Gwadelupa","gs": "Georgia Południowa i Sandwich Południowy",
  "gu": "Guam","hk": "Hongkong","im": "Wyspa Man","io": "Brytyjskie Terytorium Oceanu Indyjskiego",
  "je": "Jersey","ky": "Kajmany","mf": "Saint-Martin","mo": "Makau","mp": "Mariany Północne",
  "mq": "Martynika","ms": "Montserrat","nc": "Nowa Kaledonia","nf": "Wyspa Norfolk","nu": "Niue",
  "pf": "Polinezja Francuska","pm": "Saint-Pierre i Miquelon","pn": "Pitcairn","pr": "Portoryko",
  "re": "Reunion","sh": "Wyspa Świętej Heleny, Wyspa Wniebowstąpienia i Tristan da Cunha",
  "sj": "Svalbard i Jan Mayen","sx": "Sint Maarten","tc": "Turks i Caicos",
  "tf": "Francuskie Terytoria Południowe i Antarktyczne","tk": "Tokelau",
  "um": "Dalekie Wyspy Mniejsze Stanów Zjednoczonych","vg": "Brytyjskie Wyspy Dziewicze",
  "vi": "Wyspy Dziewicze Stanów Zjednoczonych","wf": "Wallis i Futuna","yt": "Majotta"
};

const konkursowy = sessionStorage.getItem("WyborUstawienQuizu") === "ust-konkurs";
sessionStorage.removeItem("WyborUstawienQuizu");

const allCodes = Object.keys(countries);
const territoryCodes = Object.keys(dependentTerritories);

const questionNumberEl = document.getElementById("question-number");
const flagImg = document.getElementById("flag-img");
const answerInput = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-answer");
const resultMessage = document.getElementById("result-message");

let selectedFlags = [];
let currentIndex = 0;
let correctCount = 0;

let timer;
let timeLeft;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateFlags() {

    let pool = [];

    if (zakres === "panstwa") pool = allCodes;
    else if (zakres === "terytoria") pool = territoryCodes;
    else pool = allCodes.concat(territoryCodes);

    pool = shuffle(pool);
    selectedFlags = pool.slice(0, ilosc);
}

function startTimer() {

    if (!czasNaFlage) return;

    clearInterval(timer);

    timeLeft = czasNaFlage;

    const timerEl = document.getElementById("timer");

    if (timerEl) timerEl.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        if (timerEl) timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            resultMessage.textContent = konkursowy ? "✖" : "✖ Brak odpowiedzi";

            currentIndex++;

            setTimeout(showNextFlag, 800);
        }

    }, 1000);
}

function showNextFlag() {

    clearInterval(timer);

    if (currentIndex >= selectedFlags.length) {
        showSummary();
        return;
    }

    const code = selectedFlags[currentIndex];

    flagImg.style.display = "block";
    flagImg.src = `../../img/${code}.png`;
    flagImg.alt = countries[code] || dependentTerritories[code];

    questionNumberEl.textContent = `Pytanie ${currentIndex + 1}`;

    answerInput.value = "";
    resultMessage.textContent = "";
    answerInput.focus();

    startTimer();
}

function checkAnswer() {

    clearInterval(timer);

    const code = selectedFlags[currentIndex];
    const correctAnswer = countries[code] || dependentTerritories[code];

    const userAnswer = normalize(answerInput.value.trim());

    if (!userAnswer) return;

    if (userAnswer === normalize(correctAnswer)) {

        correctCount++;

        resultMessage.textContent = konkursowy ? "✔" : "✔ Poprawnie!";

    } else {

        resultMessage.textContent = konkursowy
            ? "✖"
            : `✖ Błędnie! Poprawna odpowiedź: ${correctAnswer}`;
    }

    currentIndex++;

    setTimeout(showNextFlag, 1000);
}

function showSummary() {

    clearInterval(timer);

    document.getElementById("quiz-container").style.display = "none";

    const summary = document.getElementById("quiz-summary");

    const totalQuestions = selectedFlags.length;
    const percent = totalQuestions === 0 
        ? 0 
        : Math.round((correctCount / totalQuestions) * 100);

    const circle = document.querySelector(".summary-circle");
    const scoreText = document.getElementById("summary-score");

    let progress = 0;
    const animation = setInterval(() => {
    if (progress >= percent) {
        clearInterval(animation);
        scoreText.textContent = progress + "%";
        return;
    }
    progress++;
    scoreText.textContent = progress + "%";
    const deg = progress * 3.6;
    circle.style.background = `conic-gradient(#1d61af ${deg}deg, #444 ${deg}deg)`;

}, 20);

    summary.style.display = "flex";

    document.getElementById("restart-btn").addEventListener("click", () => {

        window.location.href = "konkursFlagi1.html";

    });

    document.getElementById("back-to-main-page-btn").addEventListener("click", () => {

        window.location.href = "../../index.html";

    });
}

generateFlags();
showNextFlag();

submitBtn.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", e => {
    if (e.key === "Enter") checkAnswer();
});