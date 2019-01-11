class App {
    constructor() {
        console.log("Flight Started");

        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext('2d');

        this.terrain = new terrain(256, 256);

        this.keys = [];
        
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
        let left = this.keys[37];
        let up = this.keys[38];
        let right = this.keys[39];
        let down = this.keys[40];

        this.ctx.canvas.width  = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        
        requestAnimationFrame(() => {
            this.render();
        });
    }

    keyup(keyCode) {
        this.keys[keyCode] = false;
    }

    keydown(keyCode) {
        this.keys[keyCode] = true;
    }
}