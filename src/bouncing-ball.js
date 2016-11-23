
/* bouncing-ball.js
    import bouncingBall from 'bouncing-ball';
    var myBalls = new BouncingBall(
        {
            numberOfBalls: 3,
            ballColour: "pink",
            ballRadius: 10
        }
    );
    myBalls.bounce( document.getElementById('container') );

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
    constructor ( options={} ) {
        Object.keys(_defaults).forEach( (attr) => {
            this[attr] = options[attr] || _defaults[attr];
        });
    }

    /* start a-bouncing */
    bounce ( container ) {
        this.stop = false;
        var innerDiv = document.createElement('div');
        innerDiv.style.position = 'relative';
        container.appendChild( innerDiv );
        this.container = innerDiv;

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
        ball.ball.style['box-shadow'] = '0px ' + ( 15 + this.maxTop - ball.btop ) + 'px 5px ' + spread + 'px #888888';

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
        var left = ( 30 + ( i * 15 ) );
        var startTime = i * 100;
        var speedFactor = 10 - i;

        // use colour and rotate if array
        var colour = this.ballColour;
        if ( Array.isArray( this.ballColour ) ){
            colour = this.ballColour[0];
            this.ballColour.push(this.ballColour.shift());
        }

        var ballObj = document.createElement('div');
        ballObj.style.borderRadius = "50px";
        ballObj.style.height = this.ballRadius + "px";
        ballObj.style.width = this.ballRadius + "px";
        ballObj.style.backgroundColor = colour;
        ballObj.style.position = "absolute";
        ballObj.style.top = "20px";
        ballObj.style.left = left + "px";
        ballObj.style.boxShadow = "0px 80px 0px 0px #888888;";

        this.container.appendChild(ballObj);
        var _this = this;
        setTimeout( function () { _this.animate( { btop: 20, dir: 1, ball: ballObj, speedFactor: speedFactor } ) }, startTime );
    }
};

export default BouncingBall;
