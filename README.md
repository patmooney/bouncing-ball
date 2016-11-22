### BouncingBall
A pure JS loading animation

``` javascript
    var myBalls = new BouncingBall(
        {
            numberOfBalls: 3,
            ballColour: ["pink","green","#00ffee"], // scalar or array of n
            ballRadius: 10
        }
    );
    myBalls.bounce( $('.container') );
```

![Example](https://github.com/patmooney/bouncing-ball/master/example.gif)

# build

    npm install
    webpack
