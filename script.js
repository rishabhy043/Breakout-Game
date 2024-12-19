const canvas = document.querySelector("canvas");
const breakout = document.querySelector("#breakout");
const ctx = canvas.getContext("2d");
console.log(ctx);
console.log(canvas.width);
console.log(canvas.height);
let score = 0;

// ctx.beginPath();   //  STARTING FROM HERE
// ctx.moveTo(0,0);       // MOVE TO FROM
// ctx.lineTo(100,200);   // QUARDINATES OF LINE
// ctx.stroke();    // TO REPRESENT LINE
// ctx.closePath()     // END OF THE LINE

// making of ball

let ballX = canvas.width / 2 ;
let ballY = canvas.height / 2 ;
let ballRadius = 10;
let ballSpeedX = 2;
let ballSpeedY = 2;

function drawball(){
 ctx.beginPath();
 ctx.fillStyle = "blue";
 ctx.arc(ballX , ballY , ballRadius , 0 , Math.PI * 2);
 ctx.fill();
 ctx.strokeStyle = "blue";
 ctx.closePath();
}
// drawball();

// making of paddle

let paddlewidth = 100 ;
let paddleheight = 20;
let paddleX = canvas.width/2 - paddlewidth/2;
let paddleY = canvas.height - paddleheight - 10;
let paddleSpeed = 10;

function drawpaddle(){
    ctx.beginPath();
    ctx.rect(paddleX , paddleY , paddlewidth , paddleheight );
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.strokeStyle = "blue"
    ctx.stroke();
    ctx.closePath();
}
// drawpaddle();

// making of bricks

let brickRowCount = 6;
let brickColoumnCount = 10;
let brickWidth = 75;
let brickHeight = 20;
let marginFromTop = 30;
let marginFromleft = 30;
let brickpadding = 10;
let bricks = [];

for(let c = 0; c < brickColoumnCount; c++){
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x: 0 , y:0 , alive:1};
    }
}
// console.log(bricks);

function drawnbricks(){
    for(let c=0 ; c < brickColoumnCount ; c++){
        for(let r=0 ; r < brickRowCount ; r++){
            if(bricks[c][r].alive == 1){
                let brickx =(c *(brickWidth + brickpadding)) + marginFromleft;
                let bricky = (r *(brickHeight + brickpadding)) + marginFromTop;
                console.log(brickx , bricky);
                bricks[c][r].x = brickx;
                bricks[c][r].y = bricky; 
                ctx.beginPath();
                ctx.rect(brickx , bricky , brickWidth , brickHeight);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.strokeStyle = "blue"
            }
        }
    }
}

function detectcollision(){
    for(let c = 0 ; c < brickColoumnCount ; c++){
        for(let r = 0 ; r < brickRowCount ; r++){
            let b = bricks[c][r];
            if(b.alive == 1){
                if(ballX > b.x && ballY > b.y && ballX  < b.x + brickWidth && ballY < b.y + brickHeight){
                  bricks[c][r].alive = 0; 
                  ballSpeedY = -ballSpeedY;
                  score++;
                }
            }
        }
    }
}
// drawnbricks();

function drawScore(){
    ctx.font = "16px arial";
    ctx.fillStyle = "Blue";
    ctx.fillText("Score: " + score , 800 , 20);
}
// drawScore();

document.addEventListener("keydown" , handlekey);
document.addEventListener("keyup" , handlekey);

function handlekey(e){
    console.log(e);
    console.log(e.key);

    if(e.key == "ArrowLeft" && paddleX > 0){
        console.log("left");
        paddleX -= paddleSpeed;
    }else if(e.key == "ArrowRight" && paddleX + paddlewidth < canvas.width){
        console.log("Right");
        paddleX += paddleSpeed;
    }
}
function gameStart(){
    ctx.clearRect(0,0,canvas.width , canvas.height);
    drawball();
    drawpaddle();
    drawnbricks();
    detectcollision();
    drawScore();

    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if(ballY - ballRadius < 0){
        ballspeedY = - ballSpeedY;
    }
    if(ballY + ballRadius > canvas.height){
        document.location.reload();
    }
    if(ballX + ballRadius > canvas.width || ballX - ballRadius < 0){
        ballSpeedX = - ballSpeedX;
    }
    if(ballX + ballRadius > paddleX && ballY + ballRadius > paddleY && ballX + ballRadius < paddleX +  paddlewidth){
     ballSpeedY = -ballSpeedY;
    }
    requestAnimationFrame(gameStart);
}
gameStart()