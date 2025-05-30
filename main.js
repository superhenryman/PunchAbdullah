const punchingbag = document.getElementById("abdullah");
const abdullahHPDisplay = document.getElementById("abdullah-hp");
let abdullahHP = 3000;
let normalpunch = 50;
const dead_sound = new Audio("assets/abdullah_dead.mp3");
const hit_sound = new Audio("assets/abdullah_hit.mp3");
const taunt_sound = new Audio("assets/abdullah_taunt.mp3");
const critcal_hit = new Audio("assets/critical_hit.mp3");
const hp_gain_hp_lose = document.getElementById("number"); // either add "positive" class when the punching bag gains HP, or add the "negative" class when abdullah loses HP


function flashScreen() {
    const flash = document.getElementById("screen-flash");
    flash.style.opacity = "1";
    setTimeout(() => {
        flash.style.opacity = "0";
    }, 100);
}

function shakeScreen() {
  const body = document.body;
  body.classList.add("shake");

  setTimeout(() => {
    body.classList.remove("shake");
  }, 300);  // CRITICAL HIT!
}


function checkForLetters(text) {
    return /[a-zA-Z]/.test(text);
}

punchingbag.addEventListener("click", () => {
    if (Math.floor(Math.random() * 100) >=80) {
        abdullahHP += 5000;
        hp_gain_hp_lose.className = "number positive";
        hp_gain_hp_lose.innerText = "Abdullah gained 5000 HP!"
        taunt_sound.play(); // get taunted
        return;
    }  
    if (Math.floor(Math.random() * 100) >= 70) {
        const critHit = Math.floor(Math.random() * 10000)
        abdullahHP -= critHit;
        hp_gain_hp_lose.className = "number negative";
        hp_gain_hp_lose.innerText = `-${critHit} damage!`;
        hit_sound.play();
        flashScreen();
        shakeScreen();
        critcal_hit.play(); // ness bat slam
        hit_sound.play();
        return;
    }
    abdullahHP -= normalpunch; 
    hp_gain_hp_lose.className = "number negative";
    hp_gain_hp_lose.innerText = `-${normalpunch} damage!`;
    hit_sound.play(); // so fucking goofy

    flashScreen();             
});

// code for people who think they're smart (they aren't)
setInterval(() => {
    if (abdullahHP >= 0) {
        try {
            const currentText = abdullahHPDisplay.innerText;

            if (checkForLetters(currentText)) {
                throw new Error("Not sneaky.");
            }
            if (parseInt(currentText) !== abdullahHP) {
                abdullahHPDisplay.innerText = abdullahHP.toString();
            }

        } catch (ex) {
            alert("Did you try changing the content of Abdullah's HP? You sly cheater. That isn't gonna work.");
            console.error(ex);
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        }
    } else {
        dead_sound.play();
        document.getElementById("abdullah").src = "assets/abdullahdead.png";
        abdullahHP = 0;
        
    }
}, 10);

setInterval(() => {
    if (abdullahHP <= 0) {
        document.getElementById("send").click();
    }
}, 1000)

