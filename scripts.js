var isBlind = false;
var isHardMode = false;
var SoundEfects = new Audio();

let BackgroundMusic = document.querySelector("audio");
let cards_easy = document.querySelectorAll('.memory-card');
let cards_hard = document.querySelectorAll('.memory-ext');
let cards_all = document.querySelectorAll('.memory');
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;

const ModalConcepto = new bootstrap.Modal(document.getElementById('modalconcepto'))
const ModalVictoria = new bootstrap.Modal(document.getElementById('modalvictoria'))
const ModalDerrota = new bootstrap.Modal(document.getElementById('modalderrota'))
const ModalFormato = new bootstrap.Modal(document.getElementById('modalformato'))

const timer = startTimer(5 * 30 + .5, "timer", defeatEvent);
timer.pause();

cards_all.forEach(card => {
    card.addEventListener('mouseover', tssHoverCard);
});
cards_all.forEach(card => card.addEventListener('click', flipCard));
cards_hard.forEach(card => {
    card.style.visibility = "hidden";
});
document.getElementById("infant").classList.add('mouse-disabled')
document.getElementById("juv").classList.add('mouse-disabled')

document.getElementById("name").addEventListener("keyup", validateData);
document.getElementById("school").addEventListener("keyup", validateData);
document.getElementById("grade").addEventListener("keyup", validateData);
document.getElementById("isblind").addEventListener("click", setBlind);
document.getElementById("intro").addEventListener("click", playTutorial);
document.getElementById("retry").addEventListener("click", retryGame);
document.getElementById("retrymodal").addEventListener("click", retryGame);
document.getElementById("retrymodallose").addEventListener("click", retryGame);
document.getElementById("juv").addEventListener("click", setHardMode);
document.getElementById("juv").addEventListener("click", playGreetings);
document.getElementById("infant").addEventListener("click", playGreetings);
document.getElementById("infant").addEventListener("click", setEasyMode);
document.getElementById("intro").addEventListener("mouseover", function() { tssByWord("instrucciones", true) });
document.getElementById("labelisblind").addEventListener("mouseover", function() { tssByWord("off", true) });
document.getElementById("retry").addEventListener("mouseover", function() { tssByWord("again", true) });
document.getElementById("retrymodallose").addEventListener("mouseover", function() { tssByWord("again", true) });
document.getElementById("retrymodal").addEventListener("mouseover", function() { tssByWord("again", true) });
document.getElementById("closemodal").addEventListener("mouseover", tssClose);
document.getElementById("closewin").addEventListener("mouseover", tssClose);
document.getElementById("closemodal").addEventListener("click", restartTimer);

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
        timer = setInterval(obj.step, 250);
    };
    obj.pause = function() {
        clearInterval(timer);
        ms = obj.step();
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
    obj.set_seconds = function(sec) {
        clearInterval(timer);

        seconds = sec;
        ms = seconds * 1000;

        obj.resume = function() {
            startTime = new Date().getTime();
            timer = setInterval(obj.step, 250);
        };

        obj.resume();
    }

    obj.resume();
    return obj;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    tssPaper()

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        if (isBlind) {
            let key = firstCard.getAttribute("data-number");

            if (isHardMode) {
                tssByWord(info_juv[key]["title"])
            } else {
                tssByWord(info[key]["title"])
            }
        }

        firstCard.removeEventListener('mouseover', tssHoverCard);

        return;
    }

    secondCard = this;

    if (isBlind) {
        let key = secondCard.getAttribute("data-number");

        if (isHardMode) {
            tssByWord(info_juv[key]["title"])
        } else {
            tssByWord(info[key]["title"])
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
    timer.pause()
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    let key = secondCard.getAttribute("data-number");

    if (isHardMode) {
        document.getElementById("title").innerText = info_juv[key]["title"];
        document.getElementById("concept").innerText = info_juv[key]["concept"];
    } else {
        document.getElementById("title").innerText = info[key]["title"];
        document.getElementById("concept").innerText = info[key]["concept"];
    }

    ModalConcepto.show()

    if (isBlind) {
        if (isHardMode) {
            tssConceptByWord(info_juv[key]["title"])
        } else {
            tssConceptByWord(info[key]["title"])
        }
    }

    resetBoard();
    checkCards();
}

function unflipCards() {
    lockBoard = true;

    try {
        setTimeout(() => {

            var isMobile = false; //initiate as false
            // device detection
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
                isMobile = true;
            }


            if (!isMobile) {
                tssByWord("unflip", true)
            }


            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            tssPaper()


            hasFlippedCard = false;
        }, 1200);

        setTimeout(() => {
            firstCard.addEventListener('mouseover', tssHoverCard);
            secondCard.addEventListener('mouseover', tssHoverCard);

            [firstCard, secondCard, lockBoard] = [null, null, false];
        }, 2000);
    } catch (error) {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard()
    }

}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkCards() {
    let isVictory = true
    if (isHardMode) {
        cards_all.forEach(card => {
            if (!isVictory) {
                return
            }

            isVictory = card.classList.contains('flip')
        });
    } else {
        cards_easy.forEach(card => {
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
    cards_all.forEach(card => {
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

function victoryEvent(event) {
    timer.pause()

    if (isBlind) {
        SoundEfects.pause()
        SoundEfects = new Audio('./audio/win.mp3')
        SoundEfects.play()
    }

    ModalVictoria.show()
}

function defeatEvent(event) {
    ModalDerrota.show()
}

function validateData() {
    let fullname = document.getElementById('name').value
    let school = document.getElementById('school').value
    let grade = document.getElementById('grade').value

    if (fullname.length !== 0 && school.length !== 0 && grade.length !== 0) {
        document.getElementById("infant").classList.add('mouse-disabled')
        document.getElementById("juv").classList.add('mouse-disabled')
        document.getElementById("infant").classList.remove('mouse-disabled')
        document.getElementById("juv").classList.remove('mouse-disabled')
    } else {
        document.getElementById("infant").classList.remove('mouse-disabled')
        document.getElementById("juv").classList.remove('mouse-disabled')
        document.getElementById("infant").classList.add('mouse-disabled')
        document.getElementById("juv").classList.add('mouse-disabled')
    }
}

function retryGame() {
    timer.pause()
    resetBoard()
    document.getElementById('modalconcepto').removeEventListener('hidden.bs.modal', victoryEvent)

    cards_all.forEach(card => {
        card.addEventListener('mouseover', tssHoverCard);
        card.addEventListener('click', flipCard)
        card.classList.remove('flip')
    });
    shuffle()

    ModalFormato.show()
}

function setHardMode() {
    cards_all.forEach(card => {
        card.classList.add('memory-card-juv')
    });

    cards_hard.forEach(card => {
        card.style.visibility = "visible";
    });

    shuffle()

    isHardMode = true;
}

function setEasyMode() {
    cards_all.forEach(card => {
        card.classList.remove('memory-card-juv')
    });

    shuffle()

    isHardMode = false;
}

function playTutorial() {
    timer.pause()
    SoundEfects.pause()
    SoundEfects = new Audio('./audio/tutorial.mp3')
    SoundEfects.play()

    cards_all.forEach(card => card.classList.add('mouse-disabled'))

    document.getElementById("labelisblind").classList.add('mouse-disabled')
    document.getElementById("retry").classList.add('mouse-disabled')
    document.getElementById("intro").classList.add('mouse-disabled')

    setTimeout(function() {
        cards_all.forEach(card => card.classList.remove('mouse-disabled'))
        document.getElementById("labelisblind").classList.remove('mouse-disabled')
        document.getElementById("retry").classList.remove('mouse-disabled')
        document.getElementById("intro").classList.remove('mouse-disabled')

        if (isHardMode) {
            timer.set_seconds(10 * 30 + .5, "timer", defeatEvent);
        } else {
            timer.set_seconds(5 * 30 + .5, "timer", defeatEvent);
        }

    }, 33000);
}

async function playGreetings() {
    BackgroundMusic.volume = 0.1;
    BackgroundMusic.play();

    if (isHardMode) {
        timer.set_seconds(10 * 30 + .5, "timer", defeatEvent);
    } else {
        timer.set_seconds(5 * 30 + .5, "timer", defeatEvent);
    }
    timer.pause()

    SoundEfects.pause()
    SoundEfects = new Audio('./audio/greetings.mp3')
    SoundEfects.play()

    cards_all.forEach(card => card.classList.add('mouse-disabled'))

    document.getElementById("labelisblind").classList.add('mouse-disabled')
    document.getElementById("retry").classList.add('mouse-disabled')
    document.getElementById("intro").classList.add('mouse-disabled')

    let fullname = document.getElementById('name').value
    let school = document.getElementById('school').value
    let grade = document.getElementById('grade').value

    axios({
            method: 'post',
            url: 'https://codedrifter.ddns.net:5000/insert',
            data: { fullname: fullname, school: school, grade: grade, },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => console.error(error));


    setTimeout(function() {
        cards_all.forEach(card => card.classList.remove('mouse-disabled'))
        document.getElementById("labelisblind").classList.remove('mouse-disabled')
        document.getElementById("retry").classList.remove('mouse-disabled')
        document.getElementById("intro").classList.remove('mouse-disabled')

        timer.resume()
    }, 4000);

}

function restartTimer() {
    SoundEfects.pause()

    timer.resume()
}

function setBlind() {
    isBlind = !isBlind

    if (isBlind) {
        playTutorial()
    }
}

function tssHoverCard() {
    if (isBlind) {
        SoundEfects = new Audio('./audio/flip.mp3')
        SoundEfects.play()
    }
}

function tssClose() {
    if (isBlind) {
        new Audio('./audio/close.mp3').play()
    }
}

function tssPaper() {
    new Audio('./audio/paper.mp3').play()
}

function tssByWord(word, paused = false) {
    if (isBlind) {
        if (paused) SoundEfects.pause()
        SoundEfects = new Audio('./audio/' + word + '.mp3')
        SoundEfects.play()
    }
}

function tssConceptByWord(word) {
    if (isBlind) {
        SoundEfects.pause()
        if (isHardMode) {
            SoundEfects = new Audio('./audio/' + word + '_juv_concept.mp3')

        } else {
            SoundEfects = new Audio('./audio/' + word + '_concept.mp3')
        }
        SoundEfects.play()
        console.log(SoundEfects)
    }
}

shuffle()
ModalFormato.show()