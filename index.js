const gameBoard = document.querySelector("#gameBoard");
const ctx = gameboard.getContext("2d");
const scoreText= document.querySelector("#scoreText");
const resetBtn= document.querySelector("#resetBtn");

const gameWidth= gameBoard.Width;
const gameHeight = gameBoard.height;
const boardBackground= "white";
const snakeColor = "dakrgreen";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    //code
]