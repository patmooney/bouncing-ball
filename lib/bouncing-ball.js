/******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _bouncingBall = __webpack_require__(1);

	var _bouncingBall2 = _interopRequireDefault(_bouncingBall);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.BouncingBall = _bouncingBall2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	*/

	var _defaults = {
	    maxTop: 50,
	    numberOfBalls: 3,
	    ballColour: 'black',
	    ballRadius: 10
	};

	var BouncingBall = function () {
	    function BouncingBall() {
	        var _this2 = this;

	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, BouncingBall);

	        Object.keys(_defaults).forEach(function (attr) {
	            _this2[attr] = options[attr] || _defaults[attr];
	        });
	    }

	    _createClass(BouncingBall, [{
	        key: 'bounce',
	        value: function bounce(container) {
	            var innerDiv = document.createElement('div');
	            innerDiv.style.position = 'relative';
	            container.appendChild(innerDiv);
	            this.container = innerDiv;

	            for (var i = 0; i < this.numberOfBalls; i++) {
	                this.addBall(i);
	            }
	        }
	    }, {
	        key: 'animate',
	        value: function animate(ball) {
	            // reposition
	            ball.btop += ball.dir * ((ball.btop - 19) / ball.speedFactor || 1) * 3;
	            if (ball.btop > this.maxTop) {
	                ball.btop = this.maxTop;
	            }
	            ball.ball.style['top'] = ball.btop + "px";

	            // shadow
	            var spread = Math.round(ball.btop / this.maxTop * 100) / 10 - 10;
	            ball.ball.style['box-shadow'] = '0px ' + (15 + this.maxTop - ball.btop) + 'px 5px ' + spread + 'px #888888';

	            // calculate next move
	            if (ball.btop >= this.maxTop) {
	                ball.dir = -1;
	            } else if (ball.btop <= 20) {
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
	            var left = 30 + i * 15;
	            var startTime = i * 100;
	            var speedFactor = 10 - i;

	            // use colour and rotate if array
	            var colour = this.ballColour;
	            if (Array.isArray(this.ballColour)) {
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
	            setTimeout(function () {
	                _this.animate({ btop: 20, dir: 1, ball: ballObj, speedFactor: speedFactor });
	            }, startTime);
	        }
	    }]);

	    return BouncingBall;
	}();

	;

	exports.default = BouncingBall;

/***/ }
/******/ ]);
