
/* bouncing-ball.js
    import bouncingBall from 'bouncing-ball';
    var myBalls = new BouncingBall(
        document.getElementById('container'),
        {
            numberOfBalls: 3,
            ballColour: "pink", // or an array of colours
            ballRadius: 10
        }
    );
    myBalls.bounce();

    ...

    myBalls.unbounce();
*/

var _defaults = {
    maxTop: 50,
    numberOfBalls: 3,
    ballColour: 'black',
    ballRadius: 10,
};

class BouncingBall {
    constructor ( container, options={} ) {
        Object.keys(_defaults).forEach( (attr) => {
            this[attr] = options[attr] || _defaults[attr];
        });

        var innerDiv = document.createElement('div');
        innerDiv.style.position = 'relative';
        container.appendChild( innerDiv );
        this.container = innerDiv;
        this.balls = [];
    }

    /* start a-bouncing */
    bounce () {
        this.stop = false;

        if ( ! this.balls.length ) {
            this._generateBalls();
        }

        var _this = this;
        this.balls.forEach( ( ballObj, i ) => {
            var speedFactor = (_this.numberOfBalls + 10) - i;
            setTimeout(
                function () {
                    _this.animate({
                        btop: 20,
                        dir: 1,
                        ball: ballObj,
                        speedFactor: speedFactor
                    })
                },
                0
            );
        });
    }

    _generateBalls () {
        for ( var i = 0; i < this.numberOfBalls; i++ ){
            this.addBall( i );
        }
    }

    /* aka stop bouncing */
    unbounce () {
        this.stop = true;
    }

    animate ( ball ) {

        if ( this.stop ) {
            return;
        }

        // reposition
        ball.btop += ( ( ball.dir * ( ( ( ball.btop - 19 ) / ball.speedFactor  ) || 1 ) ) ) * 3;
        if ( ball.btop > this.maxTop ) { ball.btop = this.maxTop; }
        ball.ball.style['top'] = ball.btop + "px";

        // shadow
        var spread = ( Math.round( ( ball.btop / this.maxTop ) * 100 ) / 10 ) - 10;
        ball.ball.style['box-shadow'] = '0px ' + ( 5 + this.maxTop - ball.btop ) + 'px 5px ' + spread + 'px #888888';

        // calculate next move
        if ( ball.btop >= this.maxTop ){
            ball.dir = -1;
        }
        else if ( ball.btop <= 20 ){
            ball.dir = 1;
        }

        // schedule next move
        var _this = this;
        setTimeout( function () { _this.animate( ball ) }, 30 );
    }

    addBall ( i ) {
        // use colour and rotate if array
        var colour = this.ballColour;
        if ( Array.isArray( this.ballColour ) ){
            colour = this.ballColour[0];
            this.ballColour.push(this.ballColour.shift());
        }

        var css = {
            borderRadius: "50px",
            height: this.ballRadius + "px",
            width: this.ballRadius + "px",
            backgroundColor: colour,
            position: "absolute",
            top: "20px",
            left: ( 30 + ( i * (this.ballRadius+5) ) ) + "px",
            boxShaddow: "0px 80px 0px 0px #888888;"
        };
        var ballObj = document.createElement('div');
        Object.keys(css).forEach( (key) => { ballObj.style[key] = css[key] } );

        this.balls.push( ballObj );
        this.container.appendChild(ballObj);
    }
};

export default BouncingBall;
