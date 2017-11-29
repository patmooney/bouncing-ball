(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BouncingBall", [], factory);
	else if(typeof exports === 'object')
		exports["BouncingBall"] = factory();
	else
		root["BouncingBall"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	    paddingLeft: 30,
	    paddingTop: 20,
	    ballSpacing: 5
	};

	var BouncingBall = function () {
	    function BouncingBall(container) {
	        var _this2 = this;

	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        _classCallCheck(this, BouncingBall);

	        Object.keys(_defaults).forEach(function (attr) {
	            _this2[attr] = options[attr] || _defaults[attr];
	        });

	        var innerDiv = document.createElement('div');
	        Object.assign(innerDiv.style, {
	            position: 'relative',
	            height: this.paddingTop + this.maxTop + 'px',
	            width: 2 * this.paddingLeft + this.numberOfBalls * (this.ballRadius + this.ballSpacing) + 'px'
	        });
	        container.appendChild(innerDiv);
	        this.container = innerDiv;
	        this.balls = [];
	    }

	    /* start a-bouncing */


	    _createClass(BouncingBall, [{
	        key: 'bounce',
	        value: function bounce() {
	            this.stop = false;

	            if (!this.balls.length) {
	                this._generateBalls();
	            }

	            var _this = this;
	            this.balls.forEach(function (ballObj, i) {
	                var speedFactor = _this.numberOfBalls + 10 - i;
	                setTimeout(function () {
	                    _this.animate({
	                        btop: _this.paddingTop,
	                        dir: 1,
	                        ball: ballObj,
	                        speedFactor: speedFactor
	                    });
	                }, 0);
	            });
	        }
	    }, {
	        key: '_generateBalls',
	        value: function _generateBalls() {
	            for (var i = 0; i < this.numberOfBalls; i++) {
	                this.addBall(i);
	            }
	        }

	        /* aka stop bouncing */

	    }, {
	        key: 'unbounce',
	        value: function unbounce() {
	            this.stop = true;
	        }
	    }, {
	        key: 'animate',
	        value: function animate(ball) {

	            if (this.stop) {
	                return;
	            }

	            // reposition
	            ball.btop += ball.dir * ((ball.btop - 19) / ball.speedFactor || 1) * 3;
	            if (ball.btop > this.maxTop) {
	                ball.btop = this.maxTop;
	            }
	            ball.ball.style['top'] = ball.btop + "px";

	            // shadow
	            var spread = Math.round(ball.btop / this.maxTop * 100) / 10 - 10;
	            ball.ball.style['box-shadow'] = '0px ' + (5 + this.maxTop - ball.btop) + 'px 5px ' + spread + 'px #888888';

	            // calculate next move
	            if (ball.btop >= this.maxTop) {
	                ball.dir = -1;
	            } else if (ball.btop <= this.paddingTop) {
	                ball.dir = 1;
	            }

	            // schedule next move
	            var _this = this;
	            setTimeout(function () {
	                _this.animate(ball);
	            }, 30);
	        }
	    }, {
	        key: 'addBall',
	        value: function addBall(i) {
	            // use colour and rotate if array
	            var colour = this.ballColour;
	            if (Array.isArray(this.ballColour)) {
	                colour = this.ballColour[0];
	                this.ballColour.push(this.ballColour.shift());
	            }

	            var css = {
	                borderRadius: "50px",
	                height: this.ballRadius + "px",
	                width: this.ballRadius + "px",
	                backgroundColor: colour,
	                position: "absolute",
	                top: this.paddingTop + 'px',
	                left: this.paddingLeft + i * (this.ballRadius + this.ballSpacing) + "px",
	                boxShaddow: "0px 80px 0px 0px #888888;"
	            };
	            var ballObj = document.createElement('div');
	            Object.keys(css).forEach(function (key) {
	                ballObj.style[key] = css[key];
	            });

	            this.balls.push(ballObj);
	            this.container.appendChild(ballObj);
	        }
	    }]);

	    return BouncingBall;
	}();

	;

	exports.default = BouncingBall;
	module.exports = exports['default'];

/***/ })
/******/ ])
});
;