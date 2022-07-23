const gameBoard = document.querySelector("#gameBoard");//canvas
const ctx = gameBoard.getContext("2d");//canvas paint
const gameWidth = gameBoard.width; 
const gameHeight = gameBoard.height; 

const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
//inside the canvas
const boardBackground = "black";
const snakeColor = "lime";
const snakeBorder = "white";
const foodColor = "red";
const unitSize = 25; //the size of everything in our game

let running = false; //if game is running
let xVelocity = unitSize; //how far we move on the x-axis
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

/*object in an array
each code block represents the body*/
let snake = [
    {x:unitSize * 4, y:0}, 
    {x:unitSize * 3, y:0}, 
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0}, 
    {x:0, y:0} 
]; 

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

function gameStart(){
    running= true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick(); //creates random food everytime the page refreshes
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 50);//speed
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }     
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
           //method(arrow function)
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    //console.log(keyPressed)
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
    /*move() {
    if(key("w") && this.vector.y - this.speed - this.radius > 0) {
      this.vector.y -= this.speed
    }
    if(key("s") && this.vector.y + this.speed + this.radius < height) {
      this.vector.y += this.speed
    }
    if(key("a") && this.vector.x - this.speed - this.radius > 0) {
      this.vector.x -= this.speed
    }
    if(key("d") && this.vector.x + this.speed + this.radius < width) {
      this.vector.x += this.speed
    }
  }*/

};
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth)://ends game
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight)://ends game
                running = false;
                break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};
gameStart();