### BouncingBall

A pure JS loading animation

``` javascript

    var BouncingBall = require('bouncing-ball');
    
    var myBalls = new BouncingBall(
        document.getElementById('container'),
        {
            maxTop: 80, // max height in px
            numberOfBalls: 3,
            ballColour: ["pink","green","#00ffee"], // scalar or array
            ballRadius: 10 // px
        }
    );
    
    myBalls.bounce(); // start animation

    // ... some time later ...

    myBalls.unbounce(); // stop animation

```

![Example](https://github.com/patmooney/bouncing-ball/raw/master/example.gif)

# Developers

## To build

    npm install
    webpack
