const canvas = document.querySelector("canvas");
const breakout = document.querySelector("#breakout");
const ctx = canvas.getContext("2d");
console.log(ctx);


// ctx.beginPath();   //  STARTING FROM HERE
// ctx.moveTo(0,0);       // MOVE TO FROM
// ctx.lineTo(100,200);   // QUARDINATES OF LINE
// ctx.stroke();    // TO REPRESENT LINE
// ctx.closePath()     // END OF THE LINE

// making of ball

let ballX = canvas.width / 2 ;
let ballY = canvas.height / 2 ;
let ballRadius = 10;
let ballSpeedX = 5;
let balllspeedY = 5;

function drawball(){
 ctx.beginPath();
 ctx.fillStyle = "blue";
 ctx.arc(ballX , ballY , ballRadius , 0 , Math.PI * 2);
 ctx.fill();
 ctx.strokeStyle = "black";
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
        bricks[c][r] = {x: 0 , y:0};
    }
}
// console.log(bricks);

function drawnbricks(){
    for(let c=0 ; c < brickColoumnCount ; c++){
        for(let r=0 ; r < brickRowCount ; r++){
            let brickX =(c *(brickWidth + brickpadding)) + marginFromleft;
            let bricky = (r *(brickHeight + brickpadding)) + marginFromTop;
            console.log(brickX , bricky);
            bricks[c][r].x = brickX;
            bricks[c][r].y = bricky; 
            ctx.beginPath();
            ctx.rect(brickX , bricky , brickWidth , brickHeight);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.strokeStyle = "blue"
        }
    }
}
// drawnbricks();

function drawScore(){
    ctx.font = "16px arial";
    ctx.fillStyle = "Blue";
    ctx.fillText("score : 0", 800 , 20);
}
// drawScore();

document.addEventListener("keydown" , handlekey);
document.addEventListener("keyup" , handlekey);

function handlekey(e){
    console.log(e);
    console.log(e.key);

    if(e.key == "ArrowLeft"){
        console.log("left");
        paddleX -= paddleSpeed;
    }else if(e.key == "ArrowRight"){
        console.log("Right");
        paddleX += paddleSpeed;
    }
}
function gameStart(){
    drawball();
    drawpaddle();
    drawnbricks();
    drawScore();
    requestAnimationFrame(gameStart);
}
gameStart()