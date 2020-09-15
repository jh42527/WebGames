class sprite {
    constructor(x, y, imagesrc, framewidth, frameheight, jumpmax, framemax = 4, frameratio = 5) {
        // Image
        this.image = new Image();
        this.image.src = imagesrc;

        // Animation Frames
        this.framewidth = framewidth;
        this.frameheight = frameheight;
        this.framemax = framemax;
        this.frameratio = frameratio;
        this.framecurrent = 0;

        // Location
        this.xcoordinate = x;
        this.ycoordinate = y;
        this.faceenum = 0; // 0=down, 1=right, 2=left,3=up

        // Jump
        this.jumpheight = 0;
        this.jumpmax = jumpmax;
        this.jumpfalling = false;
    }

    move(left, right, up, down) {
        // Check for motion
        if(left || right || up || down) {
            if(this.framecurrent + 1 == (this.framemax * this.frameratio)) {
                this.framecurrent = 1;
            } else {
                this.framecurrent = this.framecurrent + 1;
            }

            if(up) {
                this.faceenum = 3;

                this.ycoordinate--;
            }

            if(down) {
                this.faceenum = 0;

                this.ycoordinate++;
            }

            if(left) {
                this.faceenum = 2;

                this.xcoordinate--;
            }

            if(right) {
                this.faceenum = 1;

                this.xcoordinate++;
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, Math.floor(this.framecurrent / this.frameratio) * 460, this.faceenum * 600, 460, 600, this.xcoordinate, this.ycoordinate - this.jumpheight, 69, 90)
    }
}

/*
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
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        this.groundcolor = "#4BA83B";
    }

    draw(ctx, width, height, xoffset) {
        // Chunk Size
        let chunkWidthSize = width / 18;
        let chunkHeightSize = height / this.tiles.length;

        // Draw Tiles
        for (var i = 0; i < this.tiles.length; i++) {
            for (var j = xoffset; j < (xoffset + 18); j++) {
                if(this.tiles[i][j] == 1) {
                    let relativeX = (j - xoffset) * chunkWidthSize;
                    let relativeY = i * chunkHeightSize;

                    ctx.fillStyle = this.groundcolor;
                    ctx.fillRect(relativeX, relativeY, chunkWidthSize, chunkHeightSize);
                }
            }
        }
    }
}
*/

class Game {
    constructor() {
        console.log("Game Started");

        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext('2d');

        this.audio = document.getElementById("audio")
        this.audio.loop = true;

        this.canvas.width = 960;

        this.canvas.height = 640;

        this.keys = [];

        this.paused = false;

        this.chunks = 64;

        this.debug = false;

        // this.background = new background();

        // this.map = new map(this.chunks);

        this.maincharacter = new sprite(this.canvas.width / 2, this.canvas.height / 2, "content/img/joe-jr.png", 460, 600, 10);

        let requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame;

        window.requestAnimationFrame = requestAnimationFrame;
    }

    render() {
        if(this.debug) {
            console.log("Render Frame")
        }

        // Get Arrow Key Inputs
        let left = this.keys[37];
        let right = this.keys[39];
        let up = this.keys[38];
        let down = this.keys[40];

        // Reset Frame    
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Perform Actions
        this.maincharacter.move(left, right, up, down);

        // Draw Map
        // this.map.draw(this.ctx, this.canvas.width, this.canvas.height, 4);

        // Draw Sprites
        this.maincharacter.draw(this.ctx);

        // Draw Health Bar
        this.ctx.font = "small-caps 10px 'Press Start 2P'";
        this.ctx.fillStyle = "black";
        this.ctx.textBaseline = "top";
        this.ctx.fillText("HEALTH", 10, 9);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(78, 11, 40, 5);

        // If Not Paused Next Frame
        if (!this.paused) {
          requestAnimationFrame(() => this.render());
        }
    }
    
    reset() {
        this.maincharacter.xcoordinate = this.canvas.width / 2;
        this.maincharacter.ycoordinate = this.canvas.height / 2;

        var promise = this.audio.load();

        if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
        }
    }

    start() {
        var promise = this.audio.play();

        if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
        }

        window.addEventListener("keyup", (e) => {
            this.keyup(e.keyCode);
        });

        window.addEventListener("keydown", (e) => {
            this.keydown(e.keyCode);
        });

        this.paused = false;

        // Start rendering
        requestAnimationFrame(() => this.render());
    }

    stop() {
        var promise = this.audio.pause();

        if (promise !== undefined) {
            promise.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
            });
        }

        window.addEventListener("keyup", (e) => {
            this.keyup(e.keyCode);
        });

        window.addEventListener("keydown", (e) => {
            this.keydown(e.keyCode);
        });

        this.paused = true
    }

    keyup(keyCode) {
        this.keys[keyCode] = false;
    }

    keydown(keyCode) {
        this.keys[keyCode] = true;
    }
}

const game = new Game();