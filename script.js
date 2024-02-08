
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const highScoreText = document.getElementById('highScore');

const gridSize = 20;
let snake = [{ x: 10, y:10 }];
let food = generateFood();
let highScore = 0;
let direction =  'up';
let gameInterval;
let gameSpeedDealy = 200;
let gameStarted = false;
const score = document.getElementById('score');



function draw(){
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

function drawSnake(){
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

function createGameElement(tag, className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}


// draw();


function drawFood(){
    if(gameStarted){
    const foodElement =  createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
    }
}

function generateFood(){
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return {x , y};
}


function move(){
    const oldHead = snake[0];
    let newHead = Object.assign({}, oldHead); // Создаем новый объект head

    switch (direction){
        case 'right':
            newHead.x++;
        break;

        case 'left':
            newHead.x--;
        break;

        case 'up':
            newHead.y--;
        break;

        case 'down':
            newHead.y++;
        break;
    }

    
    checkColision(newHead);

    snake.unshift(newHead);

    if(newHead.x === food.x && newHead.y === food.y)
    {
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval );
        gameInterval = setInterval(() => {
            move();
            checkColision();
            draw();
        }, gameSpeedDealy)
    }else{
         snake.pop();
    }
}


// setInterval(() =>{
//     move();
//     draw(); 
// }, 200); 


function startGame(){
    gameStarted = true;
    instructionText.style.display = 'none';
    logo.style.display = "none";
    gameInterval = setInterval(()=>{
        move();
        checkColision();
        draw();
    }, gameSpeedDealy);
}

function handleKeyPress(event){
    if( (!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.key === ' ')
    ){
        startGame();
    }else{
        switch(event.key){
            case 'ArrowUp':
                direction = 'up';
                break;

            case 'ArrowDown':
                direction = 'down';
                break;

            case 'ArrowRight':
                direction = 'right';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed(){
    if(gameSpeedDealy > 150){
        gameSpeedDealy -= 5;
    }else if(gameSpeedDealy > 100 ){
        gameSpeedDealy -=3;
    }else if(gameSpeedDealy > 50 ){
        gameSpeedDealy -=2;
    }else if(gameSpeedDealy > 25 ){
        gameSpeedDealy -=1;
    }
}


function checkColision(newHead){
    if(newHead.x < 1 || newHead.x > gridSize || newHead.y < 1 || newHead.y > gridSize){
        resetGame();
    }

    for(let i= 0; i< snake.length; i++){
        if(newHead.x === snake[i].x && newHead.y === snake[i].y){
            resetGame();
        }
    }
}


function resetGame(){
    UpdateHighScore();
    StopGame();
    snake = [{x: 10, y: 10}];
    food = generateFood();
    direction = 'right';
    gameSpeedDealy = 200;
    updateScore();
}

function updateScore(){
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(2,'0');
}

function stopGame(){
  clearInterval(gameInterval);
  gameStarted = false;
  instructionText.style.display = "block";
  logo.style.display = 'block';
}

function UpdateHighScore(){
  const currentScore = snake.length - 1;
  if(currentScore > highScore){
    highScore = currentScore;
    highScoreText.textContent = highScore.toString();
    padStart(3,'0');
  }
  highScore.style.display = 'block';
}

