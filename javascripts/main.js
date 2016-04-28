/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/javascripts/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _domAble = __webpack_require__(1);
	
	var _keyboard = __webpack_require__(2);
	
	(0, _domAble.$d)(function () {
	  var docEl = (0, _domAble.$d)('html');
	  var keyBoardElement = (0, _domAble.$d)('#keyboard');
	  var keyboard = new _keyboard.Keyboard({
	    parentEl: keyBoardElement,
	    docEl: docEl
	  });
	  keyboard.setListeners();
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var $d = function $d(param) {
	  if (typeof param === "string") {
	    var list = document.querySelectorAll(param);
	    list = [].slice.call(list);
	    return new DOMNodeCollection(list);
	  } else if (param instanceof HTMLElement) {
	    return new DOMNodeCollection([param]);
	  } else if (typeof param === "function") {
	    document.addEventListener("DOMContentLoaded", param);
	  }
	};
	
	$d.isEmptyObject = function (obj) {
	  if (Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({})) {
	    return true;
	  }
	  return false;
	};
	
	$d.merge = function () {
	  for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
	    objects[_key] = arguments[_key];
	  }
	
	  if (objects.length <= 1) return objects;
	  var accum = objects[0];
	
	  for (var i = 1; i < objects.length; i++) {
	    if ($d.isEmptyObject(objects[i])) continue;
	
	    for (var j = 0; j < Object.keys(objects[i]).length; j++) {
	      var key = Object.keys(objects[i])[j];
	      accum[key] = objects[i][key];
	    }
	  }
	
	  return accum;
	};
	
	$d.isMatch = function (el, selector) {
	  var elProto = Element.prototype;
	  var func = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector;
	  return func.call(el, selector);
	};
	
	var DOMNodeCollection = function () {
	  function DOMNodeCollection(array) {
	    _classCallCheck(this, DOMNodeCollection);
	
	    for (var i = 0; i < array.length; i++) {
	      this[i] = array[i];
	    }this.length = array.length;
	  }
	
	  _createClass(DOMNodeCollection, [{
	    key: "each",
	    value: function each(callback) {
	      for (var i = 0; i < this.length; i++) {
	        callback(this[i]);
	      }
	    }
	  }, {
	    key: "getHTML",
	    value: function getHTML() {
	      var html = [];
	      this.each(function (el) {
	        return html.push(el.innerHTML);
	      });
	      return html;
	    }
	  }, {
	    key: "setHTML",
	    value: function setHTML(string) {
	      //DANGEROUS
	      this.each(function (el) {
	        return el.innerHTML = string;
	      });
	      return this;
	    }
	  }, {
	    key: "empty",
	    value: function empty() {
	      this.html("");
	    }
	  }, {
	    key: "append",
	    value: function append(item) {
	      var _this = this;
	
	      var _setInner = function _setInner(html) {
	        return _this.each(function (el) {
	          return el.innerHTML += html;
	        });
	      };
	
	      if (item instanceof DOMNodeCollection) {
	        item.each(function (innerEl) {
	          return _setInner(innerEl.outerHTML);
	        });
	      } else if (item instanceof HTMLElement) {
	        _setInner(item.outerHTML);
	      } else {
	        _setInner(item);
	      }
	    }
	  }, {
	    key: "addClass",
	    value: function addClass(string) {
	      function _addClasses(el, str) {
	        var classArr = string.split(" ");
	        classArr.forEach(function (klass) {
	          return el.classList.add(klass);
	        });
	      }
	
	      if (typeof string === "string") {
	        this.each(function (el) {
	          return _addClasses(el, string);
	        });
	      }
	
	      return this;
	    }
	  }, {
	    key: "id",
	    value: function id(string) {
	      if (typeof string === "string") {
	        this.each(function (el) {
	          return el.id = string;
	        });
	      }
	
	      return this;
	    }
	  }, {
	    key: "removeClass",
	    value: function removeClass(classes) {
	      var _remove = function _remove(el, classes) {
	        classes.forEach(function (klass) {
	          return el.classList.remove(klass);
	        });
	      };
	
	      if (typeof classes === "string") {
	        classes = classes.split(" ");
	        this.each(function (el) {
	          return _remove(el, classes);
	        });
	      } else if (classes === undefined) {
	        this.each(function (el) {
	          return _remove(el, el.classList);
	        });
	      }
	    }
	  }, {
	    key: "children",
	    value: function children() {
	      var allChildren = [];
	
	      this.each(function (el) {
	        var elChildren = [].slice.call(el.children);
	        allChildren.push(elChildren);
	      });
	
	      return new DOMNodeCollection(allChildren);
	    }
	  }, {
	    key: "parent",
	    value: function parent() {
	      var allParents = [];
	
	      this.each(function (el) {
	        var elParent = el.parentNode;
	        allParents.push(elParent);
	      });
	
	      return new DOMNodeCollection(allParents);
	    }
	  }, {
	    key: "find",
	    value: function find(selector) {
	      if (!(typeof selector === "string")) return null;
	      var list = [];
	
	      this.each(function (el) {
	        var elFound = [].slice.call(el.querySelectorAll(selector));
	        list.push(elFound);
	      });
	
	      list.reduce(function (a, b) {
	        return a.concat(b);
	      });
	      return new DOMNodeCollection(list);
	    }
	  }, {
	    key: "on",
	    value: function on(eventType) {
	      for (var _len2 = arguments.length, targetListener = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        targetListener[_key2 - 1] = arguments[_key2];
	      }
	
	      var delegatedListener = targetListener[0];
	
	
	      if (targetListener.length > 1) {
	        (function () {
	          var target = targetListener[0];
	          var listener = targetListener[1];
	
	
	          delegatedListener = function delegatedListener(e, nodeEl) {
	            if ($d.isMatch(e.target, target)) listener(e);
	          };
	        })();
	      }
	
	      this.each(function (el) {
	        return el.addEventListener(eventType, delegatedListener);
	      });
	    }
	  }, {
	    key: "off",
	    value: function off(eventType, listener) {
	      this.each(function (el) {
	        return el.removeEventListener(eventType, listener);
	      });
	    }
	  }, {
	    key: "convertAll",
	    value: function convertAll() {
	      for (var i = 0; i < Object.keys(this).length - 1; i++) {
	        var key = Object.keys(this)[i];
	        this[key] = $d(this[key]);
	      }
	      return this;
	    }
	    // end Class DOMNodeCollection
	
	  }]);
	
	  return DOMNodeCollection;
	}();
	
	exports.$d = $d;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Keyboard = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _note = __webpack_require__(3);
	
	var _domAble = __webpack_require__(1);
	
	var _constants = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Keyboard = function () {
	  function Keyboard(_ref) {
	    var parentEl = _ref.parentEl;
	    var docEl = _ref.docEl;
	    var _ref$noteRange = _ref.noteRange;
	    var noteRange = _ref$noteRange === undefined ? _constants.OCTAVE.second : _ref$noteRange;
	
	    _classCallCheck(this, Keyboard);
	
	    var keys = _createKeys(parentEl, noteRange);
	    this.keys = keys;
	    this.range = noteRange;
	    this.el = parentEl;
	    this.ctx = docEl;
	    this.active = {};
	  }
	
	  _createClass(Keyboard, [{
	    key: 'setListeners',
	    value: function setListeners() {
	      var el = this.el;
	      var ctx = this.ctx;
	      el.on('mousedown', 'div.key', this.playNote.bind(this));
	      el.on('mouseup', 'div.key', this.stopNote.bind(this));
	      el.on('mouseout', 'div.key', this.stopNote.bind(this));
	      ctx.on('keydown', this.playNote.bind(this));
	      ctx.on('keyup', this.stopNote.bind(this));
	    }
	  }, {
	    key: 'removeListeners',
	    value: function removeListeners() {
	      el.off('mousedown', 'div', this.playNote);
	      el.off('mouseup', 'div', this.stopNote);
	      ctx.off('keydown', this.playNote);
	      ctx.off('keyup', this.stopNote);
	    }
	  }, {
	    key: 'playNote',
	    value: function playNote(e) {
	      var keyId = void 0;
	      if (e.type === "keydown") {
	        keyId = this.range[e.keyCode];
	      } else {
	        keyId = e.target.id;
	      }
	
	      if (!keyId) return;
	      if (this.active[keyId]) return;
	
	      this.active[keyId] = true;
	      var li = (0, _domAble.$d)('div#' + keyId);
	      li.addClass("pressed");
	      this.keys[keyId].togglePress();
	    }
	  }, {
	    key: 'stopNote',
	    value: function stopNote(e) {
	      var keyId = void 0;
	      if (e.type === "keyup") {
	        keyId = this.range[e.keyCode];
	      } else {
	        keyId = e.target.id;
	      }
	      if (!this.active[keyId]) return;
	
	      this.active[keyId] = false;
	      var li = (0, _domAble.$d)('div#' + keyId);
	      this.keys[keyId].togglePress();
	      li.removeClass("pressed");
	    }
	  }, {
	    key: 'setRange',
	    value: function setRange(noteRange) {
	      this.keys = _createKeys(this.el, noteRange);
	    }
	  }]);
	
	  return Keyboard;
	}();
	
	function _createKeys(domAbleElement, noteRange) {
	  var keys = _note.Note.createNoteRange(noteRange);
	  var keyObj = {};
	
	  keys.forEach(function (key) {
	    var li = document.createElement("li");
	    var name = key.name;
	    var klass = "key";
	
	    keyObj[name] = key;
	    if (name.includes("s")) {
	      klass += " sharp";
	      (0, _domAble.$d)(li).addClass("hidden");
	    }
	    var keyEl = (0, _domAble.$d)(li).setHTML('<div class="' + klass + '" id=' + name + '></div>');
	
	    domAbleElement.append(keyEl);
	  });
	
	  return keyObj;
	};
	
	exports.Keyboard = Keyboard;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Note = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ctx = new (window.AudioContext || window.webkitAudioContext)();
	
	var Note = function () {
	  function Note(noteName) {
	    _classCallCheck(this, Note);
	
	    this.name = noteName;
	    this.freq = _constants.TONES[noteName];
	    this.oscillatorNode = _createOscillator(this.freq);
	    this.gainNode = _createGainNode();
	    this.oscillatorNode.connect(this.gainNode);
	    this.isPressed = false;
	  }
	
	  _createClass(Note, [{
	    key: "togglePress",
	    value: function togglePress() {
	      this.isPressed = !this.isPressed;
	      if (this.isPressed) {
	        this.gainNode.gain.value = 0.3;
	      } else {
	        this.gainNode.gain.value = 0;
	      }
	    }
	  }], [{
	    key: "createNoteRange",
	    value: function createNoteRange(noteRange) {
	      var range = Object.keys(noteRange).map(function (key) {
	        var noteName = noteRange[key];
	        return new Note(noteName);
	      });
	      range = range.sort(function (a, b) {
	        return a.freq - b.freq;
	      });
	      return range;
	    }
	  }]);
	
	  return Note;
	}();
	
	;
	
	function _createGainNode() {
	  var gainNode = ctx.createGain();
	  gainNode.gain.value = 0;
	  gainNode.connect(ctx.destination);
	  return gainNode;
	};
	
	function _createOscillator(freq) {
	  var osc = ctx.createOscillator();
	  osc.type = "sine";
	  osc.frequency.value = freq;
	  osc.detune.value = 0;
	  osc.start(ctx.currentTime);
	  return osc;
	};
	
	exports.Note = Note;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NOTES_LOW = {
	  65: 'aaC2',
	  87: 'aaC2s',
	  83: 'aaD2',
	  69: 'aaD2s',
	  68: 'aaE2',
	  70: 'aaF2',
	  84: 'aaF2s',
	  71: 'aaG2',
	  89: 'aaG2s',
	  72: 'aaH2',
	  85: 'aaH2s',
	  74: 'aaI2',
	  75: 'aC3',
	  79: 'aC3s',
	  76: 'aD3',
	  80: 'aD3s',
	  186: 'aE3'
	};
	
	var NOTES_MIDDLE = {
	  65: 'aC3',
	  87: 'aC3s',
	  83: 'aD3',
	  69: 'aD3s',
	  68: 'aE3',
	  70: 'aF3',
	  84: 'aF3s',
	  71: 'aG3',
	  89: 'aG3s',
	  72: 'aH3',
	  85: 'aH3s',
	  74: 'aI3',
	  75: 'bC4',
	  79: 'bC4s',
	  76: 'bD4',
	  80: 'bD4s',
	  186: 'bE4'
	};
	
	var NOTES_HIGH = {
	  65: 'bC4',
	  87: 'bC4s',
	  83: 'bD4',
	  69: 'bD4s',
	  68: 'bE4',
	  70: 'bF4',
	  84: 'bF4s',
	  71: 'bG4',
	  89: 'bG4s',
	  72: 'bH4',
	  85: 'bH4s',
	  74: 'bI4',
	  75: 'cC5',
	  79: 'cC5s',
	  76: 'cD5',
	  80: 'cD5s',
	  186: 'cE5'
	};
	
	var OCTAVE = {
	  first: NOTES_LOW,
	  second: NOTES_MIDDLE,
	  third: NOTES_HIGH
	};
	
	var KEY_MAP = {
	  a: 65,
	  b: 66,
	  c: 67,
	  d: 68,
	  e: 69,
	  f: 70,
	  g: 71,
	  h: 72,
	  i: 73,
	  j: 74,
	  k: 75,
	  l: 76,
	  m: 77,
	  n: 78,
	  o: 79,
	  p: 80,
	  q: 81,
	  r: 82,
	  s: 83,
	  t: 84,
	  u: 85,
	  v: 86,
	  w: 87,
	  x: 88,
	  y: 89,
	  z: 90,
	  semicolon: 186
	};
	
	var TONES = {
	  aaC2: 65.41,
	  aaC2s: 69.3,
	  aaD2: 73.42,
	  aaD2s: 77.78,
	  aaE2: 82.41,
	  aaF2: 87.31,
	  aaF2s: 92.5,
	  aaG2: 98,
	  aaG2s: 103.83,
	  aaH2: 110,
	  aaH2s: 116.54,
	  aaI2: 123.47,
	  aC3: 130.81,
	  aC3s: 138.59,
	  aD3: 146.83,
	  aD3s: 155.56,
	  aE3: 164.81,
	  aF3: 174.61,
	  aF3s: 185,
	  aG3: 196,
	  aG3s: 207.65,
	  aH3: 220,
	  aH3s: 233.08,
	  aI3: 246.94,
	  bC4: 261.63,
	  bC4s: 277.18,
	  bD4: 293.66,
	  bD4s: 311.13,
	  bE4: 329.63,
	  bF4: 349.23,
	  bF4s: 369.99,
	  bG4: 392,
	  bG4s: 415.3,
	  bH4: 440,
	  bH4s: 466.16,
	  bI4: 493.88,
	  cC5: 523.25,
	  cC5s: 554.37,
	  cD5: 587.33,
	  cD5s: 622.25,
	  cE5: 659.25,
	  F5: 698.46,
	  F5s: 739.99,
	  G5: 783.99,
	  G5s: 830.61,
	  H5: 880,
	  H5s: 932.33,
	  I5: 987.77,
	  C6: 1046.5,
	  C6s: 1108.73,
	  D6: 1174.66,
	  D6s: 1244.51,
	  E6: 1318.51,
	  F6: 1396.91,
	  F6s: 1479.98,
	  G6: 1567.98,
	  G6s: 1661.22,
	  H6: 1760,
	  H6s: 1864.66,
	  I6: 1975.53
	};
	
	exports.KEY_MAP = KEY_MAP;
	exports.TONES = TONES;
	exports.OCTAVE = OCTAVE;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map