let footer = document.getElementById("footer");
let header = document.getElementById("header");
let gameHolder = document.getElementById("game-holder");
let holst = document.getElementById("canvas");
let gameProcess = document.getElementById("game-process");
let controls = document.getElementById("controls");

if (gameProcess.offsetWidth > gameProcess.offsetHeight) {
    holst.width = gameProcess.offsetHeight * 0.9 + 15 - (gameProcess.offsetHeight * 0.9 + 15) % 15;
    holst.height = gameProcess.offsetHeight * 0.9 + 15 - (gameProcess.offsetHeight * 0.9 + 15) % 15;
}
else {
    holst.width = gameProcess.offsetWidth * 0.9 + 15 - (gameProcess.offsetWidth * 0.9 + 15) % 15;
    holst.height = gameProcess.offsetWidth * 0.9 + 15 - (gameProcess.offsetWidth * 0.9 + 15) % 15;
}

let size = holst.width;
let cellSize = size / 15;

function resizing(e) {
    if (window.innerHeight <= 500) {
        footer.style.display = "none";
        header.style.display = "none";
        gameHolder.style.margin = "10px auto";
    }
    else {
        footer.style.display = "flex";
        header.style.display = "flex";
        gameHolder.style.margin = "50px auto 0 auto";
    }

    if (gameProcess.offsetWidth > gameProcess.offsetHeight) {
        holst.width = gameProcess.offsetHeight * 0.9 + 15 - (gameProcess.offsetHeight * 0.9 + 15) % 15;
        holst.height = gameProcess.offsetHeight * 0.9 + 15 - (gameProcess.offsetHeight * 0.9 + 15) % 15;
    }
    else {
        holst.width = gameProcess.offsetWidth * 0.9 + 15 - (gameProcess.offsetWidth * 0.9 + 15) % 15;
        holst.height = gameProcess.offsetWidth * 0.9 + 15 - (gameProcess.offsetWidth * 0.9 + 15) % 15;
    }

    if (window.innerHeight <= 600) {
        controls.style.display = "none";
    }
    else {
        controls.style.display = "flex";
    }

}

window.onresize = resizing;