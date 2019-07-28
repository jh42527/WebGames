class sprite {
    constructor(x, y) {
        this.framemax = 8;
        this.framecurrent = 0;

        this.image = new Image();
        this.image.src = 'content/img/sprite.png';

        this.frameheight = 325;
        this.framewidth = 184;

        // Location
        this.xcoordinate = x;
        this.ycoordinate = y;
    }

    draw(ctx, up, down, left, right) {
        if(this.framecurrent + 1 == this.framemax) {
            this.framecurrent = 1;
        } else {
            this.framecurrent = this.framecurrent + 1;
        }

        ctx.drawImage(this.image, this.framecurrent * this.framewidth, 0, this.framewidth, this.frameheight, this.xcoordinate - (this.framewidth / 2), this.ycoordinate - (this.frameheight / 2), this.framewidth, this.frameheight);
    }
}

class map {
    constructor(color) {
        this.maze =  [ 
            [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0],
            [0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,1],
            [0,0,1,1,1,0,0,1,1,0,0,1,0,0,0,0,1,0,0,1],
            [0,0,1,0,1,0,0,1,1,0,0,1,0,0,0,0,1,0,0,1],
            [0,0,1,0,1,1,0,1,0,0,0,1,1,1,0,0,1,0,0,0],
            [0,0,1,1,0,1,1,0,0,0,0,0,0,1,0,0,1,1,1,1],
            [0,0,0,1,1,0,1,1,1,1,1,1,0,0,0,0,0,1,0,1],
            [0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1]
        ];        

        this.color = color;
    }

    draw(ctx, width, height) {
        // Maze Size
        let mazeWidth = this.maze[0].length;
        let mazeHeight = this.maze.length;

        // Chunk Size
        let chunkWidth = width / mazeWidth;
        let chunkHeight = height / mazeHeight;

        // Draw maze
        for (var x = 0; x < mazeWidth; x++) {
            for (var y = 0; y < mazeHeight; y++) {
                if(this.maze[x][y] == 1) {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(x * chunkWidth, y * chunkHeight, chunkWidth, chunkHeight);
                }
            }
        }
    }
}

class background {    
    constructor(color) {
        this.color = color;
    }

    draw(ctx, width, height) {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, width, height);
    }
}

class Game {
    constructor() {
        console.log("Game Started");

        this.canvas = document.getElementById("canvas");
        
        this.ctx = canvas.getContext('2d');

        this.keys = [];

        this.paused = false;

        this.debug = false;

        this.background = new background("black");

        this.map = new map("blue");

        this.sprite = new sprite(256, 256);

        let requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame;

        window.requestAnimationFrame = requestAnimationFrame;

        window.addEventListener("keyup", (e) => {
            this.keyup(e.keyCode);
        });

        window.addEventListener("keydown", (e) => {
            this.keydown(e.keyCode);
        });

        window.addEventListener("load", () => {
            this.render();
        });
    }

    render() {
        // Get Arrow Key Inputs
        let left = this.keys[37];
        let up = this.keys[38];
        let right = this.keys[39];
        let down = this.keys[40];

        // Resize Frame
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Reset Frame    
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Background
        this.background.draw(this.ctx, this.canvas.width, this.canvas.height);

        // Draw Map
        this.map.draw(this.ctx, this.canvas.width, this.canvas.height);

        // Draw Sprite
        this.sprite.draw(this.ctx, left, up, right, down);

        // TO DO:  Detect Collision

        // Draw Health Bar
        this.ctx.font = "small-caps 10px 'Press Start 2P'";
        this.ctx.fillStyle = "white";
        this.ctx.textBaseline = "top";
        this.ctx.fillText("HEALTH", 10, 9);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(78, 8, 160, 10);

        // If Not Paused Next Frame
        if (!this.paused) {
            requestAnimationFrame(() => this.render());
        }
    }
    
    start() {
        this.render();
    }

    pause() {
        this.paused = true;
    }

    keyup(keyCode) {
        this.keys[keyCode] = false;
    }

    keydown(keyCode) {
        this.keys[keyCode] = true;
    }
}

const game = new Game();