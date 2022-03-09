const cards = document.querySelectorAll('.memory-card');
const ModalConcepto = new bootstrap.Modal(document.getElementById('modalconcepto'))

const info = {
    "uno": {
        title: "Universal",
        concept: "Es el derecho que tienen todas las personas mayores, a poder elegir a las personas que los representarán. No importa si la persona que vota es hombre o mujer, si tiene o no tiene dinero o si vive en una casa pobre o rica, todos tienen el derecho y la obligación de ir a votar."
    },
    "dos": {
        title: "Secreto",
        concept: "Es el derecho de que nadie sepa por quien votaron. Sería muy triste que alguien le reclamara a una persona por que no le dio su voto."
    },
    "tres": {
        title: "Directo",
        concept: "Una persona que vota, puede estar segura que ese voto se sumará a la candidatura que eligió. En otros países la gente elige a un grupo de personas para que vayan y voten por los candidatos. En México no es así."
    },
    "cuatro": {
        title: "Personal",
        concept: "Nadie puede mandar a otra persona para que vote en su nombre. Las personas que tengan derecho a votar, deberán presentarse ellas mismas a la casilla el día de la elección."
    },
    "cinco": {
        title: "Intransferible",
        concept: "Es la seguridad que me da la ley de no darle mi voto a otra persona que yo no haya elegido. Es la garantía de que si voté por María, no le van a dar el voto a Juan."
    },
    "seis": {
        title: "Libre",
        concept: "Es la garantía que otorga la ley a votar sin que haya presión de votar por alguien. Cuando las personas vayan a votar, deben hacerlo por quien hayan decidido, sin que deban sentir miedo o temor."
    }
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }



    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.number === secondCard.dataset.number;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    let key = secondCard.getAttribute("data-number");
    document.getElementById("title").innerText = info[key]["title"];
    document.getElementById("concept").innerText = info[key]["concept"];

    ModalConcepto.show()

    resetBoard();

}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function check(e) {
    if (e.key === "Enter") {
        ModalConcepto.hide()
    }
}