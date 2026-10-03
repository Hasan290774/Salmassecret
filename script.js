const entrance = document.getElementById("entrance");
const main = document.getElementById("main");
const letter = document.getElementById("letter");

const enterButton = document.getElementById("enterButton");
const backButton = document.getElementById("backButton");

const message = document.getElementById("message");

let secretClicks = 0;
let robotClicks = 0;


// =========================
// ROBOT VOICE
// =========================

function playTone(frequency, duration, type = "sine", volume = 0.08) {

    const audioContext =
        new (window.AudioContext || window.webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(volume, audioContext.currentTime);

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + duration
    );
}


function robotBoop() {

    playTone(520, 0.12, "sine", 0.06);

    setTimeout(function () {
        playTone(680, 0.16, "sine", 0.05);
    }, 90);

}


function magicSound() {

    playTone(660, 0.15, "sine", 0.05);

    setTimeout(function () {
        playTone(880, 0.2, "sine", 0.05);
    }, 120);

}


function robotTalk(text) {

    speechSynthesis.cancel();

    robotBoop();

    const voice = new SpeechSynthesisUtterance(text);

    voice.rate = 0.78;
    voice.pitch = 1.35;
    voice.volume = 0.75;

    const voices = speechSynthesis.getVoices();

    const softVoice = voices.find(function (v) {

        return v.lang.startsWith("en") &&
            (
                v.name.toLowerCase().includes("samantha") ||
                v.name.toLowerCase().includes("ava") ||
                v.name.toLowerCase().includes("google")
            );

    });

    if (softVoice) {
        voice.voice = softVoice;
    }

    speechSynthesis.speak(voice);

    message.textContent = text;
}


// =========================
// ENTER
// =========================

enterButton.addEventListener("click", function () {

    entrance.style.opacity = "0";

    setTimeout(function () {

        entrance.classList.add("hidden");

        main.classList.remove("hidden");

        robotTalk("Hey... you found me.");

    }, 800);

});


// =========================
// ROBOT CLICK
// =========================

document.querySelector(".robot.small").addEventListener("click", function () {

    robotClicks++;

    if (robotClicks === 1) {

        robotTalk("Oh! You found me.");

    }

    else if (robotClicks === 2) {

        robotTalk("I know a secret...");

    }

    else if (robotClicks === 3) {

        robotTalk("I'm not telling you yet.");

    }

    else if (robotClicks === 4) {

        robotTalk("Okay okay... you're persistent.");

    }

    else {

        const randomMessages = [

            "Why do you keep clicking me?",

            "Psst... look around.",

            "I definitely didn't hide anything.",

            "You're making me nervous.",

            "Maybe the shiny button is important.",

            "I saw nothing. Absolutely nothing."

        ];

        const randomIndex =
            Math.floor(Math.random() * randomMessages.length);

        robotTalk(randomMessages[randomIndex]);

    }

});


// =========================
// HEART
// =========================

document.getElementById("heart").addEventListener("click", function () {

    robotTalk("A tiny reminder that someone thought of you today.");

});


// =========================
// SECRET
// =========================

document.getElementById("secret").addEventListener("click", function () {

    secretClicks++;

    if (secretClicks === 1) {

        robotTalk("Hmm... you found something.");

    }

    else if (secretClicks === 2) {

        robotTalk("You clicked it again... interesting.");

    }

    else if (secretClicks === 3) {

        robotTalk("Okay... you're getting closer.");

    }

    else if (secretClicks >= 4) {

        robotTalk("Fine. You found the secret.");

        document.getElementById("secret").textContent = "💌";

        document.getElementById("secret").onclick = function () {

            speechSynthesis.cancel();

            main.classList.add("hidden");

            letter.classList.remove("hidden");

        };

    }

});


// =========================
// SLEEP
// =========================

document.getElementById("sleep").addEventListener("click", function () {

    robotTalk(
        "The little robot says goodnight... even though it's not bedtime."
    );

});


// =========================
// BACK
// =========================

backButton.addEventListener("click", function () {

    letter.classList.add("hidden");

    main.classList.remove("hidden");

});