class Game {
    constructor() {
        console.log("Game Started");

        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext('2d');

        this.keys = [];

        this.paused = false;

        this.chunks = 64;

        this.background1 = [];
        this.background1chunks = this.chunks / 5;

        for(let x = 0; x < this.background1chunks; x++) {
            this.background1[x] = Utils.getRandomInt(40, 50) / 100;
        }

        this.background2 = [];
        this.background2chunks = this.chunks / 6;

        for(let x = 0; x < this.background2chunks; x++) {
            this.background2[x] = Utils.getRandomInt(20, 40) / 100;
        }

        this.ground1 = randomColor({
            luminosity: 'dark'
        });
        this.ground2 = Utils.shadeBlendConvert(0.3, this.ground1);
        this.ground3 = randomColor();
        this.ground3 = Utils.shadeBlendConvert(0.7, this.ground3);
        this.groundbase = Utils.shadeBlendConvert(-0.25, this.ground1);

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

        // Draw Sky
        let skygradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height * 0.85);
        skygradient.addColorStop(0, this.ground3);
        skygradient.addColorStop(1, this.ground1);

        this.ctx.fillStyle = skygradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Background2
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height * this.background2[0]);

        let chunkSize = this.canvas.width / (this.background2.length - 1);

        for (var b2 = 1; b2 < this.background2.length; b2++) {
            this.ctx.lineTo(b2 * chunkSize, this.canvas.height * this.background2[b2]);
        }
        
        // Create the rect so we can fill it
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.closePath();
        this.ctx.fillStyle = this.ground2;
        this.ctx.fill();

        // Draw Background1
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height * this.background1[0]);

        chunkSize = this.canvas.width / (this.background1.length - 1);

        for (var b1 = 1; b1 < this.background1.length; b1++) {
            this.ctx.lineTo(b1 * chunkSize, this.canvas.height * this.background1[b1]);
        }
        
        // Create the rect so we can fill it
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.closePath();
        this.ctx.fillStyle = this.ground1;
        this.ctx.fill();

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

    move(up, down, left, right) {
        
    }

    keyup(keyCode) {
        this.keys[keyCode] = false;
    }

    keydown(keyCode) {
        this.keys[keyCode] = true;
    }
}

const game = new Game();