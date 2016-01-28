window.BouncingBall = function ( container ){
    var innerDiv = document.createElement('div');
    innerDiv.style.position = 'relative';
    container.appendChild( innerDiv );
    this.container = innerDiv;
};
window.BouncingBall.prototype = {
    maxTop: 50,
    numberOfBalls: 3,
    ballColour: 'black',
    ballRadius: 10,
    /* begin
        var myBalls = new BouncingBall(
            document.getElementById('container'),
            {
                numberOfBalls: 3,
                ballColour: "pink",
                ballRadius: 10
            }
        );
    */
    begin: function () {
        for ( var i = 0; i < this.numberOfBalls; i++ ){
            this.addBall( i );
        }
    },
    animate: function ( ball ) {
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
    },
    addBall: function ( i ) {
        var left = ( 30 + ( i * 15 ) );
        var startTime = i * 100;
        var speedFactor = 10 - i;

        var ballObj = document.createElement('div');
        ballObj.style.borderRadius = "50px";
        ballObj.style.height = this.ballRadius + "px";
        ballObj.style.width = this.ballRadius + "px";
        ballObj.style.backgroundColor = this.ballColour;
        ballObj.style.position = "absolute";
        ballObj.style.top = "20px";
        ballObj.style.left = left + "px";
        ballObj.style.boxShadow = "0px 80px 0px 0px #888888;";

        this.container.appendChild(ballObj);
        var _this = this;
        setTimeout( function () { _this.animate( { btop: 20, dir: 1, ball: ballObj, speedFactor: speedFactor } ) }, startTime );
    }
};
