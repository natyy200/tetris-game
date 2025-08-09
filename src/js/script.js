document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const displayMessage = (param) => {
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.75;
        ctx.fillRect(0, canvas.height/2-30, canvas.width, 60);

        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";
        ctx.font = "36px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(param, canvas.width / 2, canvas.height / 2);
    };

    displayMessage("START GAME!");

    const tetrominoes = {
        I: [
            [1, 1, 1, 1],
        ],
        J: [
            [0, 0, 1],
            [1, 1, 1],
        ],
        L: [
            [1, 0, 0],
            [1, 1, 1],
        ],
        O: [
            [1, 1],
            [1, 1],
        ],
        S: [
            [0, 1, 1],
            [1, 1, 0],
        ],
        T: [
            [0, 1, 0],
            [1, 1, 1],
        ],
        Z: [
            [1, 1, 0],
            [0, 1, 1],
        ],
    };

    const colors = {
        I:"cyan",
        J:"pink",
        L:"orange",
        O:"yellow",
        S:"red",
        T:"purple",
        Z:"green",
    }

    const grid = 30;
    const rows = canvas.height / grid;
    const columns = canvas.width / grid; 

    const board = Array.from({length: rows}, ()=>Array(columns).fill(0));

    let isGameRunning = false;
    let timerId;
    let score = 0;

    window.addEventListener("keydown", (e) => {
        if((e.key == "" || e.code == "Space" || e.keyCode == "32") && !isGameRunning) {
            isGameRunning = true;
            newTetromino();
            
            timerId = setInterval(gameLoop, 500);
        };
    });

    function newTetromino() {
        const types = Object.keys(tetrominoes);
        const type = types[Math.floor(Math.random() * types.length)];

        currentTetromino = {
            shape: tetrominoes[type],
            x: Math.floor(columns / 2) - Math.floor(tetrominoes[type][0].length / 2),
            y: 0,
            type,
        };
        console.log(columns, currentTetromino);
    };

    function gameLoop() {
        if(isGameRunning) {
            draw();
        }
    };

    function draw() {
        if(isGameRunning) {
            drawBoard();
            drawTetromino(
                currentTetromino.shape, 
                currentTetromino.x, 
                currentTetromino.y
            );
        };
    };

    function drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    function drawSquare(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x*grid, y*grid, grid, grid);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(x*grid, y*grid, grid, grid);
    };

    function drawTetromino(tetromino, offSetX, offSetY){
        tetromino.forEach((row, y) => {
            row.forEach((value, x)=>{
                if(value){
                    drawSquare(x+offSetX, y+offSetY, colors[currentTetromino.type]);
                }
            });
        });
    };

    document.addEventListener("keydown", (e)=>{
        if(isGameRunning){
            if(e.key === "ArrowLeft"){
                moveLeft();
            }else if(e.key === "ArrowRight"){
                moveRight();
            }else if(e.key === "ArrowDown"){
                moveDown();
            }else if(e.key === "ArrowUp"){
                rotateTetromino();
            }
        }
    });

    function collisionDetection(tetromino, offSetX, offSetY){
        return tetromino.some((row, y) => {
            return row.some((value, x)=> {
                if(value) {
                    const newX = x + offSetX;
                    const newY = y + offSetY;
                    return(newX<0 || newX>=columns || newY>=rows || board[newX][newY]);
                }
                return false;
            })
        })
    }

    function moveLeft(){
        if(!collisionDetection(currentTetromino.shape, currentTetromino.x - 1, currentTetromino.y)) {
            currentTetromino.x--;
        }
    }
    function moveRight(){
        if(!collisionDetection(currentTetromino.shape, currentTetromino.x + 1, currentTetromino.y)) {
            currentTetromino.x++;
        }
    }
    function moveDown(){
        if(!collisionDetection(currentTetromino.shape, currentTetromino.x, currentTetromino.y + 1)) {
            currentTetromino.y++;
        }
    }
    function rotateTetromino(){

    }
});