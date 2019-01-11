class lander {
    constructor(x, y) {
        this.imagelander = new Image();
        this.imagelander.src = 'content/img/lander.png';

        this.imageexplosion = new Image();
        this.imageexplosion.src = 'content/img/explosion.png';

        // Location
        this.xcoordinate = x;
        this.ycoordinate = y;

        // Movement
        this.gravity = 0.0098;
        this.xmomentum = 0;
        this.ymomentum = 0;

        // Fuel
        this.fuel = 100;
        this.propulsion = 0.02;

        this.crashed = false;
    }

    draw(ctx) {
        if(this.crashed === false) {
            ctx.drawImage(this.imagelander, this.xcoordinate - (this.imagelander.width / 2), this.ycoordinate - (this.imagelander.height / 2));
        } else {
            ctx.drawImage(this.imageexplosion, this.xcoordinate - (this.imageexplosion.width / 2), this.ycoordinate - (this.imageexplosion.height / 2));
        }
    }

    move(up, down, left, right) {
        if (this.crashed === false) {
            // Apply Gravity
            this.ymomentum += this.gravity;

            // Apply Right Thrust 
            if (right) {
                this.xmomentum += this.propulsion;
            }

            // Apply Left Thrust 
            if (left) {
                this.xmomentum -= this.propulsion;
            }

            // Apply Down Thrust 
            if (down) {
                this.ymomentum += this.propulsion;
            }

            // Apply Up Thrust 
            if (up) {
                this.ymomentum -= this.propulsion;
            }

            // Move Location
            this.xcoordinate = this.xcoordinate + this.xmomentum;
            this.ycoordinate = this.ycoordinate + this.ymomentum;
        }
    }
}