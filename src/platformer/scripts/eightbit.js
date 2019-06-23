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
    constructor(width) {
        this.width = width;

        this.tiles = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        this.groundcolor = "#6f7b8e";

        this.stonetile = new Image();
        this.stonetile.src = 'content/img/stone-tile.png';
    }

    draw(ctx, width, height) {
        // Chunk Size
        let chunkWidthSize = width / (this.tiles[0].length - 1);

        let chunkHeightSize = height / (this.tiles.length - 1);

        // Draw Tiles
        for (var i = 0; i < this.tiles.length; i++) {
            var innerArrayLength = this.tiles[i].length;

            for (var j = 0; j < innerArrayLength; j++) {
                if(this.tiles[i][j] == 1) {
                    ctx.drawImage(this.stonetile, i * chunkWidthSize, j * chunkHeightSize, chunkWidthSize, chunkHeightSize);
                }
            }
        }
    }
}

class background {
    
    constructor() {
        this.image = new Image();
        this.image.src = 'content/img/pixel-background.png';
    }

    draw(ctx, width, height) {
        ctx.drawImage(this.image, 0, 0, width, height, 0, 0, width, height);
    }
}

class Game {
    constructor() {
        console.log("Game Started");

        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext('2d');

        this.keys = [];

        this.paused = false;

        this.chunks = 64;

        this.debug = false;

        this.background = new background();

        this.map = new map(this.chunks);

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
        this.ctx.fillStyle = "black";
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