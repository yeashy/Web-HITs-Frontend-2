let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let up = document.getElementById('up-btn');
let down = document.getElementById('down-btn');
let left = document.getElementById('left-btn');
let right = document.getElementById('right-btn');

let snakeArr;
let direction;
let score;
let highscore;
let food;

let scoreBar = document.getElementById("score-p");
let highscoreBar = document.getElementById("highscore-p");
let speedBar = document.getElementById('current-speed');

let pokemonNext;

let headX, headY, headImg;

function initGame() {
    direction = "right";
    score = 0;
    highscore = 0;
    pokemonNext = 1;

    createSnake();
    createFood(snakeArr);

    if (typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(move, 200);
    speedBar.innerHTML = "5 cps";

}

function createSnake() {
    snakeArr = [];
    snakeArr.push({ x: 0, y: 0, img: document.getElementById('ash'), dir: direction });
}

function createFood(arr) {
    food = {
        x: Math.round(Math.random() * 14),
        y: Math.round(Math.random() * 14)
    };
    while (isHeadInTail(food.x, food.y, arr)) {
        food = {
            x: Math.round(Math.random() * 14),
            y: Math.round(Math.random() * 14)
        };
    }
    console.log("food is spawned at " + food.x + ' ' + food.y);

}



function move() {
    //обновление фона каждый шаг
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, size, size);

    //координаты головы
    headX = snakeArr[0].x;
    headY = snakeArr[0].y;
    headImg = snakeArr[0].img;

    //направление змеи
    if (direction === "up") headY--;
    else if (direction === "down") headY++;
    else if (direction === "right") headX++;
    else headX--;

    //конец игры
    if (headX <= -1|| headY <= -1 || headX * cellSize >= size || headY * cellSize >= size || isHeadInTail(headX, headY, snakeArr)) {
        gameOver();
    }

    //поедание
    if (headX == food.x && headY == food.y) {
        var tail = { x: headX, y: headY, img: document.getElementById(`img${pokemonNext}`)};
        score++;
        scoreBar.innerHTML = score;
        createFood(snakeArr);
        pokemonNext++;
        if (pokemonNext > 13) pokemonNext = 1;
    }
    else {
        for (let i = 1; i < snakeArr.length - 1; i++) {
            snakeArr[i].img = snakeArr[i + 1].img;
        }
        var tail = snakeArr.pop();
        tail.x = headX; tail.y = headY; tail.img = headImg;
    }

    snakeArr.unshift(tail);

    if (score > 10) {
        if (typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(move, 143);
        speedBar.innerHTML = "7 cps";
    }

    if (score > 20) {
        if (typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(move, 100);
        speedBar.innerHTML = "10 cps";
    }

    //покраска
    paintHead(headX, headY);

    for (let i = 1; i < snakeArr.length; i++) {
        paintCell(snakeArr[i].x, snakeArr[i].y, i);
    }

    paintFood(food.x, food.y);
}

function paintHead(x, y) {
    let img = document.getElementById('ash');
    ctx.drawImage(img, x * cellSize, y * cellSize, cellSize, cellSize);
}

function paintFood(x, y) {
    let img = document.getElementById(`img${pokemonNext}`);
    ctx.drawImage(img, x * cellSize, y * cellSize, cellSize, cellSize);
}

function paintCell(x, y, i) {
    let img = snakeArr[i].img;
    ctx.drawImage(img, x * cellSize, y * cellSize, cellSize, cellSize);
}

function isFoodInSnake(x, y, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].x == x && arr[i].y == y) {
            console.log("food");
            return true;
        }
    }
    return false;
}

function isHeadInTail(x, y, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].x == x && arr[i].y == y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    alert("Game over! Your final score is " + score);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, size, size);

    if (score > highscore) {
        highscore = score;
    }
    scoreBar.innerHTML = score;
    highscoreBar.innerHTML = highscore;
    score = 0;
    speedBar.innerHTML = "0 cps";
    pokemonNext = 1;

    snakeArr = [];
    food = null;
    if (typeof game_loop != "undefined") clearInterval(game_loop)
}

function upf() {
    if (direction != "down" && direction != "up") {
        direction = "up";
    }
}

function downf() {
    if (direction != "up" && direction != "down") {
        direction = "down";

    }
}

function rightf() {
    if (direction != "left" && direction != "right") {
        direction = "right";
    }
}

function leftf() {
    if (direction != "right" && direction != "left") {
        direction = "left";
    }
}

up.onclick = upf;
down.onclick = downf;
left.onclick = leftf;
right.onclick = rightf;

document.addEventListener('keydown', function (e) {
    if (e.code == 'KeyW') upf();
    else if (e.code == 'KeyS') downf();
    else if (e.code == 'KeyD') rightf();
    else if (e.code == 'KeyA') leftf();
});