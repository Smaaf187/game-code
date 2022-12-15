let spieler = document.querySelector(".player");
let timer = new Timer(40);
let timer2 = new Timer(60);
let spielfeld = document.querySelector(".playground");
let backgroundPosition = 0;
let punkteAnzeige = document.querySelector(".punkte");
let score = 0;
let gameover = document.querySelector(".endscreen");
let tryagain = document.querySelector(".retry");

spieler.style.top = "350px";
spieler.style.left = "100px";
function loop() {
  backgroundPosition = backgroundPosition + 5;
  spielfeld.style.backgroundPosition = `-${backgroundPosition}px 0`;

  if (timer.ready()) {
    let ranndom$Value = Math.random() * (640 - 0) + 0;
    let h = document.createElement("div");
    h.classList.add("enemy1");
    h.style.top = ranndom$Value + "px";
    h.style.left = "1450px";
    spielfeld.appendChild(h);
  }

  let gegner = document.querySelectorAll(".enemy1");

  if (timer2.ready()) {
    score = score + 1;
    console.log(score);
    punkteAnzeige.textContent = score;
  }

  if (anyCollision(spieler, gegner)) {
    gameover.style.display = "unset";
    spielfeld.style.display = "none";
    return;
  }

  /* Diesen Teil haben wir nicht gebraucht
  var collisions = allCollisions(spieler, []);
  // Kommentar: wir gehen durch alle Kollisionsobjekte durch und löschen sie
  for (var collision of collisions) {
    collision.parentNode.removeChild(collision);
  }
  */

  if (keyboard(40)) {
    spieler.style.top = parseInt(spieler.style.top) + 5 + "px";
  }
  if (keyboard(38)) {
    spieler.style.top = parseInt(spieler.style.top) - 5 + "px";
  }

  for (let einzelnerGegner of gegner) {
    einzelnerGegner.style.left =
      parseInt(einzelnerGegner.style.left) - 7 + "px";
    if (parseInt(einzelnerGegner.style.left) < 0) {
      einzelnerGegner.parentNode.removeChild(einzelnerGegner);
    }
  }

  window.requestAnimationFrame(loop);
}

function restartGame() {
  location.reload();
}
tryagain.addEventListener("click", restartGame);

window.requestAnimationFrame(loop);
