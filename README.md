### BouncingBall
A pure JS loading animation

``` javascript
    var myBalls = new BouncingBall(
        documeent.getElementById('container'),
        {
            maxTop: 80, //px
            numberOfBalls: 3,
            ballColour: ["pink","green","#00ffee"], // scalar or array of n
            ballRadius: 10 //px
        }
    );
    myBalls.bounce();
```

![Example](https://github.com/patmooney/bouncing-ball/raw/master/example.gif)

# build

    npm install
    webpack
