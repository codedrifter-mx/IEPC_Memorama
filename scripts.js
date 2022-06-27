var isblind = false;
var isJuvMode = false;
var soundmaster = new Audio();

let cards = document.querySelectorAll('.memory-card');
let cards_juv = document.querySelectorAll('.memory');
let cards_ext = document.querySelectorAll('.memory-ext');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const ModalConcepto = new bootstrap.Modal(document.getElementById('modalconcepto'))
const ModalVictoria = new bootstrap.Modal(document.getElementById('modalvictoria'))
const ModalDerrota = new bootstrap.Modal(document.getElementById('modalderrota'))
const ModalFormato = new bootstrap.Modal(document.getElementById('modalformato'))

cards_juv.forEach(card => {
    card.addEventListener('mouseover', tssHoverCard);
});

cards_juv.forEach(card => card.addEventListener('click', flipCard));

cards_ext.forEach(card => {
    card.style.visibility = "hidden";
});

document.getElementById("isblind").addEventListener("click", setBlind);
document.getElementById("intro").addEventListener("click", playintro);
document.getElementById("retry").addEventListener("click", retry);
document.getElementById("retrymodal").addEventListener("click", retry);
document.getElementById("retrymodallose").addEventListener("click", retry);
document.getElementById("juv").addEventListener("click", setJuvMode);
document.getElementById("juv").addEventListener("click", ttsPlayIntro);
document.getElementById("infant").addEventListener("click", ttsPlayIntro);
document.getElementById("infant").addEventListener("click", setKidMode);
document.getElementById("labelisblind").addEventListener("mouseover", ttsIsBlind);
document.getElementById("retry").addEventListener("mouseover", ttsRetry);
document.getElementById("retrymodal").addEventListener("mouseover", ttsRetry);
document.getElementById("closemodal").addEventListener("mouseover", ttsCloseModal);
document.getElementById("closemodal").addEventListener("click", onCloseModal);
document.getElementById("closewin").addEventListener("mouseover", ttsCloseModal);
let audioback = document.querySelector("audio");

var timer = startTimer(5 * 30 + 0.5, "timer", defeatEvent);
timer.pause();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

const info_juv = {
    "uno": {
        title: "Universal",
        concept: "Se refiere a que toda la ciudadanía tiene derecho a elegir a sus representantes, sin importar su sexo, identidad, color de piel, condición económica, región en la que vive, entre otras características. En México es un derecho que tenemos todos los ciudadanos y ciudadanas, es decir, todas las personas mayores de 18 años a las que un juez no les ha suspendido sus derechos políticos."
    },
    "dos": {
        title: "Secreto",
        concept: "Es la garantía que tiene la ciudadanía al elegir. Nadie podrá saber el sentido de su voto a menos de que la misma persona lo diga. Las autoridades electorales deben garantizar este derecho."
    },
    "tres": {
        title: "Directo",
        concept: "Se refiere a que la ciudadanía podrá votar directamente por el candidato o candidata que ejercerá el cargo de elección popular por el que se postula, es decir, no se puede elegir a una persona para que luego vaya y vote por un candidato."
    },
    "cuatro": {
        title: "Personal",
        concept: "La ley indica que el voto deberá ejercerse solo por una persona, sin que otra persona o grupo pueda hacerlo a su nombre."
    },
    "cinco": {
        title: "Intransferible",
        concept: "Es una característica del voto que protegen las leyes mexicanas y consiste en que nadie podrá darle los votos que obtuvo un candidato, a otro. Tampoco podrán transferirse los votos del candidato perdedor al candidato ganador."
    },
    "seis": {
        title: "Libre",
        concept: "Se refiere a que la ciudadanía ejerza este derecho sin presiones ni influencia de otras personas. Uno de los principales propósitos de las leyes mexicanas es defender esta característica del voto."
    },
    "siete": {
        title: "Voluntario",
        concept: "Es un tipo de voto que se pone a disposición de la ciudadanía con el propósito de que aquellos que quieran asistir, lo hagan motivados por el solo hecho de elegir. "
    },
    "ocho": {
        title: "Obligatorio",
        concept: "Se refiere a la obligación que tiene la ciudadanía de acudir a emitir su voto, ya que de no hacerlo, las autoridades podrían sancionarles. En las leyes mexicanas se establece que el voto es un derecho y también una obligación."
    },
    "nueve": {
        title: "Gratuito",
        concept: "Es una de las características principales del voto, ya que, si se eligen autoridades, el acceso al voto no debe estar condicionado a algún pago por parte de la ciudadanía. En este caso se refiere a que la persona electora no debe pagar por elegir a sus representantes."
    },
    "diez": {
        title: "Condicionado",
        concept: "Es un tipo de voto que va en contra de los valores democráticos y consiste en que la persona electora se compromete a votar por alguien a cambio de algo. Las leyes mexicanas castigan esta conducta y se considera un delito."
    },
    "once": {
        title: "Informado",
        concept: "Es una característica no incluida en las leyes, pero que invita a las personas electoras a votar conociendo el perfil de los candidatos o candidatas y conocer las cosas que haya hecho para merecer ganar."
    },
    "doce": {
        title: "Razonado",
        concept: "Es la invitación que se hace a la persona electora a reflexionar antes de votar. Se le invita a que piense si las personas que van como candidatos o candidatas tienen la capacidad y el conocimiento necesario para trabajar en el puesto que pretenden ganar. Razonar nuestro voto es evitar influenciar nuestra decisión por cosas como el regalo de diferentes artículos por parte de los candidatos y candidatas."
    }
}

function startTimer(seconds, container, oncomplete) {
    var startTime, timer, obj, ms = seconds * 1000,
        display = document.getElementById(container);
    obj = {};
    obj.resume = function() {
        startTime = new Date().getTime();
        timer = setInterval(obj.step, 250); // adjust this number to affect granularity
        // lower numbers are more accurate, but more CPU-expensive
    };
    obj.pause = function() {
        ms = obj.step();
        clearInterval(timer);
    };
    obj.step = function() {
        var now = Math.max(0, ms - (new Date().getTime() - startTime)),
            m = Math.floor(now / 60000),
            s = Math.floor(now / 1000) % 60;
        s = (s < 10 ? "0" : "") + s;
        display.innerHTML = m + ":" + s;
        if (now == 0) {
            clearInterval(timer);
            obj.resume = function() {};
            if (oncomplete) {
                oncomplete();
            }
            return null;
        }
        return now;
    };
    obj.resume();
    return obj;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        if (isblind) {
            let key = firstCard.getAttribute("data-number");

            if (isJuvMode) {
                tssReadCard(info_juv[key]["title"])
            } else {
                tssReadCard(info[key]["title"])
            }
        }

        firstCard.removeEventListener('mouseover', tssHoverCard);

        return;
    }

    secondCard = this;

    if (isblind) {
        let key = secondCard.getAttribute("data-number");

        if (isJuvMode) {
            tssReadCard(info_juv[key]["title"])
        } else {
            tssReadCard(info[key]["title"])
        }
    }

    secondCard.removeEventListener('mouseover', tssHoverCard);
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

    if (isJuvMode) {
        document.getElementById("title").innerText = info_juv[key]["title"];
        document.getElementById("concept").innerText = info_juv[key]["concept"];
    } else {
        document.getElementById("title").innerText = info[key]["title"];
        document.getElementById("concept").innerText = info[key]["concept"];
    }

    timer.pause()
    ModalConcepto.show()

    if (isblind) {
        if (isJuvMode) {
            tssReadModal(info_juv[key]["title"])
        } else {
            tssReadModal(info[key]["title"])
        }
    }

    resetBoard();
    checkCards();
}

function unflipCards() {
    lockBoard = true;

    firstCard.addEventListener('mouseover', tssHoverCard);
    secondCard.addEventListener('mouseover', tssHoverCard);

    tssFailCard()

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

function checkCards() {
    let isVictory = true
    if (isJuvMode) {
        cards_juv.forEach(card => {
            if (!isVictory) {
                return
            }

            isVictory = card.classList.contains('flip')
        });
    } else {
        cards.forEach(card => {
            if (!isVictory) {
                return
            }

            isVictory = card.classList.contains('flip')
        });
    }


    if (isVictory) {
        document.getElementById('modalconcepto').addEventListener('hidden.bs.modal', victoryEvent)
    }
}

function shuffle() {
    let ispair = false;
    cards_juv.forEach(card => {
        let randomPos;
        if (ispair) {
            randomPos = Math.floor(11 + Math.random() * 13);
        } else {
            randomPos = Math.floor(Math.random() * 12);
        }
        ispair = !ispair;
        card.style.order = randomPos;
    });
};

function check(e) {
    if (e.key === "Enter") {
        ModalConcepto.hide()
    }
}

function victoryEvent(event) {
    timer.pause()

    if (isblind) {
        soundmaster.pause()
        soundmaster = new Audio('./audio/win.mp3')
        soundmaster.play()
    }

    ModalVictoria.show()
}

function defeatEvent(event) {
    ModalDerrota.show()
}

function retry() {
    resetTimer()
    resetBoard()
    document.getElementById('modalconcepto').removeEventListener('hidden.bs.modal', victoryEvent)

    cards_juv.forEach(card => {
        card.addEventListener('mouseover', tssHoverCard);
        card.addEventListener('click', flipCard)
        card.classList.remove('flip')
    });
    shuffle()

    ModalFormato.show()
}

function setJuvMode() {
    audioback.volume = 0.2;
    audioback.play();

    cards_juv.forEach(card => {
        card.classList.add('memory-card-juv')
    });

    cards_ext.forEach(card => {
        card.style.visibility = "visible";
    });

    timer.pause()
    resetTimer()
    shuffle()
    timer = startTimer(10 * 30 + 0.5, "timer", defeatEvent);

    isJuvMode = true;
}

function setKidMode() {
    audioback.volume = 0.2;
    audioback.play();

    cards_juv.forEach(card => {
        card.classList.remove('memory-card-juv')
    });

    timer.pause()
    resetTimer()
    shuffle()
    timer = startTimer(5 * 30 + 0.5, "timer", defeatEvent);

    isJuvMode = false;
}

function resetTimer() {
    var oldcanv = document.getElementById('fatherTimer');

    let html = `<h2 id="timer">0:00</h2>`

    oldcanv.innerHTML = html
}

async function ttsPlayIntro() {
    soundmaster.pause()
    soundmaster = new Audio('./audio/intro_1.mp3')
    soundmaster.play()
    await sleep(2100);
    soundmaster.pause()
    soundmaster = new Audio('./audio/intro_2.mp3')
    soundmaster.play()
    await sleep(1500);

    timer.resume();
}

function ttsIsBlind() {
    if (isblind) {
        soundmaster.pause()
        soundmaster = new Audio('./audio/off.mp3')
        soundmaster.play()
    }
}

function ttsRetry() {
    if (isblind) {
        soundmaster.pause()
        soundmaster = new Audio('./audio/again.mp3')
        soundmaster.play()
    }
}

function ttsCloseModal() {
    if (isblind) {
        soundmaster.pause()
        soundmaster = new Audio('./audio/closemodal.mp3')
        soundmaster.play()
    }
}

function onCloseModal() {
    timer.resume();
}

function setBlind() {
    isblind = !isblind

    if (isblind) {
        playintro()
    }
}

function playintro() {
    resetTimer()

    soundmaster.pause()
    soundmaster = new Audio('./audio/tuto_juv.mp3')
    soundmaster.play()

    cards_juv.forEach(card => card.classList.add('mouse-disabled'))

    setTimeout(function() {
        cards_juv.forEach(card => card.classList.remove('mouse-disabled'))

        if (isJuvMode) {
            timer = startTimer(10 * 30 + 0.5, "timer", defeatEvent);
        } else {
            timer = startTimer(5 * 30 + 0.5, "timer", defeatEvent);
        }
    }, 33000);
}

function tssHoverCard() {
    if (isblind) {
        soundmaster.pause()
        soundmaster = new Audio('./audio/flip.mp3')
        soundmaster.play()
    }
}

function tssReadCard(word) {
    if (isblind) {
        soundmaster.pause()
        soundmaster = new Audio('./audio/' + word + '.mp3')
        soundmaster.play()
    }
}

function tssFailCard() {
    if (isblind) {
        setTimeout(() => {
            soundmaster.pause()
            soundmaster = new Audio('./audio/unflip.mp3')
            soundmaster.play()
        }, 1000);
    }
}

function tssReadModal(word) {

    if (isblind) {
        soundmaster.pause()
        if (isJuvMode) {
            soundmaster = new Audio('./audio/' + word + '_juv_concept.mp3')

        } else {
            soundmaster = new Audio('./audio/' + word + '_concept.mp3')
        }
        soundmaster.play()
    }
}

shuffle()
    // ModalFormato.show()
ModalVictoria.show()