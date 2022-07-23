const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText= document.querySelector("#scoreText");
const resetBtn= document.querySelector("#resetBtn");

const gameWidth= gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground= "white";
const snakeColor = "darkgreen";
const snakeBorder= "black";
const foodColor = "red";
const unitSize = 25;

let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let running = false;


let snake = [

    {x: unitSize * 4, y:0},
    {x: unitSize * 3, y:0},
    {x: unitSize * 2, y:0},
    {x: unitSize, y:0},
    {x:0, y:0}  
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();
createFood();
drawFood();

function gameStart(){ 
    running = true;
    scoreText.TextContent = score;
    createFood();
    drawFood()
    nextTick()
};
function  nextTick(){ 
    if(running){
        setTimeOut(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    } else {
        displayGameOver()
    }
};
function clearBoard(){ 
    ctx.fillstyle = boardBackground;
    ctx.fillRect(0,0, gameWidth, gameHeight)
 };
function createFood(){ 
    
    function randomFood(min, max){
        const randNum = Math.round(Math.random() * (max-min) + min / unitSize) * unitSize
        return randNum
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
    console.log(foodX);
};

function drawFood(){ 
    ctx.fillstyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
};
function moveSnake(){ 
  
};
function drawSnake(){ 
    ctx.fillstyle = snakeColor;
    ctx.strokestyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);

    })
};
function changeDirection(){ };
function checkGameOver(){ };
function displayGameOver(){ };
function resetGame(){ };

