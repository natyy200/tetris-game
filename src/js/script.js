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

    let isGameRunning = false;
    let timerId;
    let score = 0;

    window.addEventListener("keydown", (e) => {
        if(e.key == "" || e.code == "Space" || e.keyCode == "32") {
            newTetromino();
        };
    });

    function newTetromino() {
        const types = Object.keys(tetrominoes);
        const type = types[Math.floor(Math.random() * types.length)];
    };
});