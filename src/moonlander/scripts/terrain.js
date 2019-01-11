class terrain {
    constructor(chunks) {
        this.chunks = chunks;

        this.map = [];

        for(let x = 0; x < chunks; x++) {
            this.map[x] = this.getRandomInt(100, 110);
        }

        this.color = randomColor({luminosity: 'dark', hue: 'brown'});
    }

    draw(ctx, width, height) {
        ctx.beginPath();
        ctx.moveTo(0, height - this.map[0]);

        let chunkSize = width / (this.map.length - 1);

        // Move Along Map Points
        for (var t = 1; t < this.map.length; t++) {
            ctx.lineTo(t * chunkSize, height - this.map[t]);
        }
        
        // Create the rect so we can fill it
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}