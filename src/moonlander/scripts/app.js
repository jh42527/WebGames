class App {
    constructor() {
        console.log("Moonlander Started");

        // this.sprite = new Image(63, 91);
        // this.sprite.src = 'content/img/sprite2.jpg';

        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext('2d');

        this.terrain = new terrain(16);
        this.lander = new lander(200, 25);

        this.canvas.style.display = 'block';

        this.skytop = randomColor({
            luminosity: 'dark'
        });
        this.skybottom = randomColor({
            luminosity: 'light'
        });

        this.cycle = 0;

        this.keys = [];

        this.gameover = false;
        this.paused = false;

        let requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
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
        // Get Movement Input
        let left = this.keys[37];
        let up = this.keys[38];
        let right = this.keys[39];
        let down = this.keys[40];

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Move Lander
        this.lander.move(up, down, left, right);

        // Check For Ground Collision
        let currentChunk = ((this.canvas.width - this.lander.xcoordinate) / this.terrain.chunkSize).toFixed(0);

        if (this.lander.ycoordinate + (this.lander.imagelander.height / 2) > this.terrain.map[(this.terrain.map.length - 1) - currentChunk]) {
            console.log(`Ground Impact At Y-Coordinate: ${this.lander.ycoordinate} Ground: ${this.terrain.map[0]} Momentum: ${this.lander.ymomentum}`);

            // Check Impact Speed For Crash
            if (this.lander.ymomentum > 1) {
                this.lander.crashed = true;
            }

            this.gameover = true;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Sky
        let skygradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height * 0.75);
        skygradient.addColorStop(0, this.skytop);
        skygradient.addColorStop(1, this.skybottom);

        this.ctx.fillStyle = skygradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Terrain
        this.terrain.draw(this.ctx, this.canvas.width, this.canvas.height);

        // Draw Lander
        this.lander.draw(this.ctx);

        if (this.gameover === false) {
            this.ctx.font = "small-caps 10px 'Press Start 2P'";
            this.ctx.fillStyle = "white";
            this.ctx.textBaseline = "top";
            this.ctx.fillText("FUEL", 8, 5);
            this.ctx.fillRect(52, 3, 100, 10);
        } else {
            this.paused = true;

            let x = this.canvas.width / 2;
            let y = this.canvas.height / 2.75;

            this.ctx.font = "small-caps bold 32px 'Press Start 2P'";
            this.ctx.textAlign = 'center';

            if (this.lander.crashed === true) {
                this.ctx.fillStyle = "red";
                this.ctx.fillText("CRASH", x, y);
            } else {
                this.ctx.fillStyle = "yellow";
                this.ctx.fillText("SUCCESS", x, y);
            }
        }

        /*
        // Draw Sprite
        this.ctx.clearRect(0, 0, this.sprite.width, this.sprite.height);
        this.ctx.drawImage(this.sprite,
            // source rectangle
            this.cycle * this.sprite.width, 546, this.sprite.width, this.sprite.height,
            // destination rectangle
            0, 0, this.sprite.width, this.sprite.height);
        
        this.cycle = (this.cycle + 1) % 10;
        */
       
        if (this.paused === false) {
            requestAnimationFrame(() => this.render());
        }
    }

    keyup(keyCode) {
        this.keys[keyCode] = false;
    }

    keydown(keyCode) {
        this.keys[keyCode] = true;
    }
}