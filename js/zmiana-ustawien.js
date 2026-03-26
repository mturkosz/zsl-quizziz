ZakresBut = document.querySelector("#zakres-button");
CzasBut = document.querySelector("#czas-button");
IloscBut = document.querySelector("#ilosc-button");
PowrotBut = document.querySelector("#powrot-button");
StartButton = document.querySelector("#start-button");
ToggleButton = document.querySelector(".toggle-button");
PowrotBut = document.querySelector("#powrot-button");
ZakresPanstwaBut = document.querySelector("#zakres-panstwa");
ZakresTerytoriaBut = document.querySelector("#zakres-terytoria");
ZakresAllBut = document.querySelector("#zakres-all");

UstWlsBut = document.querySelector("#ust-wlasne");
UstKonBut = document.querySelector("#ust-konkurs");
PrzyciskiUst = document.querySelector("#przyciski-ustawien2");

const ustIlosc = document.querySelector(".ilosc label");


let quizSettings = {
    zakres: null,
    czasNaFlage: null,
    ilosc: null,
    maxIlosc: null      // NOWE
};


UstWlsBut.addEventListener("click", () =>{
    PrzyciskiUst.classList.toggle("on");
    SlajdyUstawien.scrollLeft += remToPx(60);
    ToggleButton.classList.remove("on");  // dodane
    ToggleCircle.classList.remove("on");  //
});



ToggleCircle = document.querySelector("#circle");

CzasNaFlage = document.querySelector("#czas-na-flage-inp");

UstawieniaKonkursoweBut = document.querySelector("#ust-konkurs");

SlajdyUstawien = document.querySelector("#slajdy-ustawien");
slide1 = document.querySelector("#slide1");

function getRemValue() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
}
function remToPx(rem) {
  return rem * getRemValue();
}

PowrotBut.addEventListener("click", () =>{
    scrollposition = SlajdyUstawien.scrollLeft;
    if(scrollposition == remToPx(60)){
        SlajdyUstawien.scrollLeft -= remToPx(60);
    } else if(scrollposition == remToPx(120)){
        SlajdyUstawien.scrollLeft -= remToPx(120);
    } else if(scrollposition == remToPx(180)){
        SlajdyUstawien.scrollLeft -= remToPx(180);
    }
    PrzyciskiUst.classList.toggle("on");

    StartButton.classList.remove("active");

    quizSettings.zakres = null;                   // dodane
    quizSettings.ilosc = null;                    //
    quizSettings.czasNaFlage = null;              //
                                                  //
    iloscInput.value = "";                        //
    czasInput.value = "";                         //
    ZakresPanstwaBut.classList.remove("active");  //
    ZakresTerytoriaBut.classList.remove("active");//
    ZakresAllBut.classList.remove("active");      //
    ToggleButton.classList.remove("on");          //
    ToggleCircle.classList.remove("on");          //
    CzasNaFlage.classList.remove("active");       //

})

ZakresBut.addEventListener("click", () =>{
    scrollposition = SlajdyUstawien.scrollLeft;
    if(scrollposition == 0){
        SlajdyUstawien.scrollLeft += remToPx(60);
    } else if(scrollposition == remToPx(120)){
        SlajdyUstawien.scrollLeft -= remToPx(60);
    } else if(scrollposition == remToPx(180)){
        SlajdyUstawien.scrollLeft -= remToPx(120);
    }
})

const czasInput = document.querySelector("#czas-na-flage-inp input");         // dodane
czasInput.addEventListener("input", () => {                                   //
    const temp = parseInt(czasInput.value, 10);                               //
    quizSettings.czasNaFlage = (!isNaN(temp) && temp > 0) ? temp : undefined; //
    CheckStart();                                                             //
});                                                                           //

CzasBut.addEventListener("click", () =>{
    scrollposition = SlajdyUstawien.scrollLeft;
    if(scrollposition == 0){
        SlajdyUstawien.scrollLeft += remToPx(120);
    } else if(scrollposition == remToPx(60)){
        SlajdyUstawien.scrollLeft += remToPx(60);
    } else if(scrollposition == remToPx(180)){
        SlajdyUstawien.scrollLeft -= remToPx(60);
    }
})
IloscBut.addEventListener("click", () =>{
    scrollposition = SlajdyUstawien.scrollLeft;
    if(scrollposition == 0){
        SlajdyUstawien.scrollLeft += remToPx(180);
    } else if(scrollposition == remToPx(60)){
        SlajdyUstawien.scrollLeft += remToPx(120);
    } else if(scrollposition == remToPx(120)){
        SlajdyUstawien.scrollLeft += remToPx(60);
    }
})


ToggleButton.addEventListener("click", () =>{
    ToggleButton.classList.toggle("on");
    ToggleCircle.classList.toggle("on");
    CzasNaFlage.classList.toggle("active");

    if (ToggleButton.classList.contains("on")) {                                         // dodane
        const czas = parseInt(document.querySelector("#czas-na-flage-inp input").value); //
        quizSettings.czasNaFlage = (!isNaN(temp) && temp > 0) ? temp : undefined;        //
    } else {                                                                             //
        quizSettings.czasNaFlage = undefined;                                            //
    }                                                                                    //
    CheckStart();                                                                        //
})


const iloscInput = document.querySelector(".ilosc input");
iloscInput.addEventListener("input", () => {
    let val = parseInt(iloscInput.value, 10);

    if (isNaN(val) || val < 1) {
        quizSettings.ilosc = null;
    } else {
        // jeśli znamy max dla zakresu – przytnij i zablokuj start
        if (quizSettings.maxIlosc && val > quizSettings.maxIlosc) {
            val = quizSettings.maxIlosc;
            iloscInput.value = quizSettings.maxIlosc;
            // Ewentualnie komunikat np. pod inputem:
            // alert(`Maksymalna ilość dla wybranego zakresu to ${quizSettings.maxIlosc}.`);
        }
        quizSettings.ilosc = val;
    }

    CheckStart();
});                                                       //


document.querySelectorAll('.zakres button').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.zakres button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        ustIlosc.innerText = this.dataset.text;
        
        quizSettings.zakres = this.name;
        quizSettings.ilosc = parseInt(this.dataset.ilosc);
        quizSettings.maxIlosc = parseInt(this.dataset.ilosc);   // NOWE

        // ustaw też label z maxem (żeby zgadzało się z zakresem)
        const iloscLabel = document.querySelector(".ilosc label");
        if (iloscLabel) {
            iloscLabel.textContent = `Ilość (max. ${this.dataset.ilosc}): `;
        }

        CheckStart();
    });
});


document.querySelectorAll('#slide1 button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = e.target.id;
        sessionStorage.setItem("WyborUstawienQuizu", btn.dataset.text);
        if(id === "ust-konkurs"){
            quizSettings.zakres = "panstwa";                // dodane
            quizSettings.czasNaFlage = 6;                     // 
            quizSettings.ilosc = 40;                          // 
                                                              //
            if (CzasNaFlage.classList.contains("active")) {   //
                czasInput.value = 6;                          //
            }                                                 //
            iloscInput.value = 40;                            //
                               
            StartButton.classList.add("active");
        } else if(id === "ust-wlasne"){
            quizSettings.zakres = null;       // dodane
            quizSettings.czasNaFlage = null;  //
            quizSettings.ilosc = null;        //
                                              //
            czasInput.value = "";             //
            iloscInput.value = "";            //

            StartButton.classList.remove("active");
        }
    });
});

function CheckStart() {
    const iloscVal = parseInt(iloscInput.value, 10);

    const zakresOk = !!quizSettings.zakres;
    const iloscOk = !isNaN(iloscVal) && iloscVal >= 1 &&
        (!quizSettings.maxIlosc || iloscVal <= quizSettings.maxIlosc);

    if (zakresOk && iloscOk) {
        StartButton.classList.add("active");
    } else {
        StartButton.classList.remove("active");
    }
}                                                  //

let czasNaFlage = null;                          // dodane
if(czasInput && czasInput.value.trim() !== "") { //
    const temp = parseInt(czasInput.value);      //
    if(!isNaN(temp) && temp > 0) {               //
        czasNaFlage = temp;                      //
    }                                            //
}                                                //

StartButton.addEventListener("click", () => {                         // dodane
    sessionStorage.setItem("quizZakres", quizSettings.zakres);        // 
    sessionStorage.setItem("quizIlosc", quizSettings.ilosc);          //
    if (typeof quizSettings.czasNaFlage === "number") {               //
        sessionStorage.setItem("quizCzas", quizSettings.czasNaFlage); //
    } else {                                                          //
        sessionStorage.setItem("quizCzas", "");                       //
    }                                                                 //
                                                                      //
    window.location.href = "konkursFlagi1-quizz.html";                //
});                                                                   //


SlajdyUstawien.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

saved = sessionStorage.getItem('selectedButton');
