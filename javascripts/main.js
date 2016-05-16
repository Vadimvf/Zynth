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
	
	var _controls = __webpack_require__(5);
	
	var _tuna = __webpack_require__(6);
	
	(0, _domAble.$d)(function () {
	  var docEl = (0, _domAble.$d)('html');
	  var keyBoardElement = (0, _domAble.$d)('#keys');
	  var keyboard = new _keyboard.Keyboard({
	    parentEl: keyBoardElement,
	    docEl: docEl
	  });
	  keyboard.setListeners();
	  var controller = new _controls.Controller(keyboard);
	  window.$d = _domAble.$d;
	  window.controller = controller;
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
	      this.setHTML("");
	      return this;
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
	
	      return this;
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
	
	      return this;
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
	
	      return delegatedListener;
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
	
	var _controls = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Keyboard = function () {
	  function Keyboard(_ref) {
	    var parentEl = _ref.parentEl;
	    var docEl = _ref.docEl;
	    var _ref$noteRange = _ref.noteRange;
	    var noteRange = _ref$noteRange === undefined ? _constants.OCTAVE.second : _ref$noteRange;
	
	    _classCallCheck(this, Keyboard);
	
	    var keys = _createKeys(parentEl, noteRange, {});
	    this.keys = keys;
	    this.range = noteRange;
	    this.el = parentEl;
	    this.ctx = docEl;
	    this.active = {};
	    this.slideListener = null;
	  }
	
	  _createClass(Keyboard, [{
	    key: 'setListeners',
	    value: function setListeners() {
	      var el = this.el;
	      var ctx = this.ctx;
	      el.on('mousedown', 'div.key', this.playNote.bind(this));
	      el.on('mouseout', 'div.key', this.stopNote.bind(this));
	      ctx.on('mouseup', this.stopNote.bind(this));
	
	      el.on('touchstart', 'div.key', this.playNote.bind(this));
	      el.on('touchend', 'div.key', this.stopNote.bind(this));
	
	      ctx.on('keydown', this.playNote.bind(this));
	      ctx.on('keyup', this.stopNote.bind(this));
	    }
	  }, {
	    key: 'playNote',
	    value: function playNote(e) {
	      var keyId = void 0;
	      e.preventDefault();
	      if (e.type === "keydown") {
	        keyId = this.range[e.keyCode];
	      } else if (e.type === "mousedown") {
	        this.slideListener = this.el.on('mouseover', 'div.key', this.playNote.bind(this));
	        keyId = e.target.id;
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
	      } else if (e.type === "mouseup") {
	        this.el.off('mouseover', this.slideListener);
	        this.slideListener = null;
	        keyId = e.target.id;
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
	    value: function setRange(noteRange, paramObj) {
	      for (var note in this.active) {
	        this.keys[note].gainNode1.gain.value = 0;
	        this.keys[note].gainNode2.gain.value = 0;
	      }
	      this.el.setHTML("");
	      this.keys = _createKeys(this.el, noteRange, paramObj);
	      this.range = noteRange;
	      this.active = {};
	    }
	  }]);
	
	  return Keyboard;
	}();
	
	function _createKeys(domAbleElement, noteRange, paramObj) {
	  var keys = _note.Note.createNoteRange(noteRange, paramObj);
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
	exports.ctx = exports.Note = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ctx = new (window.AudioContext || window.webkitAudioContext)();
	
	var Note = function () {
	  function Note(noteName, _ref) {
	    var _ref$oscType = _ref.oscType1;
	    var oscType1 = _ref$oscType === undefined ? "sine" : _ref$oscType;
	    var _ref$oscType2 = _ref.oscType2;
	    var oscType2 = _ref$oscType2 === undefined ? "sine" : _ref$oscType2;
	
	    _classCallCheck(this, Note);
	
	    this.name = noteName;
	    this.freq = _constants.TONES[noteName];
	    this.oscillatorNode1 = _createOscillator(this.freq, oscType1);
	    this.oscillatorNode2 = _createOscillator(this.freq, oscType2);
	    this.gainNode1 = _createGainNode();
	    this.gainNode2 = _createGainNode();
	    this.oscillatorNode1.connect(this.gainNode1);
	    this.oscillatorNode2.connect(this.gainNode2);
	    this.isPressed = false;
	  }
	
	  _createClass(Note, [{
	    key: "togglePress",
	    value: function togglePress() {
	      this.isPressed = !this.isPressed;
	      if (this.isPressed) {
	        this.gainNode1.gain.value = 0.3;
	        this.gainNode2.gain.value = 0.3;
	      } else {
	        this.gainNode1.gain.value = 0;
	        this.gainNode2.gain.value = 0;
	      }
	    }
	  }], [{
	    key: "createNoteRange",
	    value: function createNoteRange(noteRange, paramsObj) {
	      var range = Object.keys(noteRange).map(function (key) {
	        var noteName = noteRange[key];
	        return new Note(noteName, paramsObj);
	      });
	      range = range.sort(function (a, b) {
	        return b.freq - a.freq;
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
	
	function _createOscillator(freq, type) {
	  var osc = ctx.createOscillator();
	  osc.type = type;
	  osc.frequency.value = freq;
	  osc.detune.value = 0;
	  osc.start(ctx.currentTime);
	  return osc;
	};
	
	exports.Note = Note;
	exports.ctx = ctx;

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Controller = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(4);
	
	var _note = __webpack_require__(3);
	
	var _domAble = __webpack_require__(1);
	
	var _tuna = __webpack_require__(6);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var tuna = new _tuna.Tuna(_note.ctx);
	
	var Controller = function () {
	  function Controller(keyboardObj) {
	    _classCallCheck(this, Controller);
	
	    var controls = _createControls();
	    this.keyboard = keyboardObj;
	    this.notes = keyboardObj.keys;
	    this.settings = {
	      oscType1: "sine",
	      oscType2: "sine"
	    };
	    this.oscType1 = "sine";
	    this.oscType2 = "sine";
	    this.setEffects();
	    this.setListeners();
	  }
	
	  _createClass(Controller, [{
	    key: 'setRange',
	    value: function setRange(rangeId) {
	      var range = void 0;
	      if (rangeId === "1") {
	        range = _constants.OCTAVE.first;
	      } else if (rangeId === "2") {
	        range = _constants.OCTAVE.second;
	      } else {
	        range = _constants.OCTAVE.third;
	      }
	      var noteNames = [];
	      this.keyboard.setRange(range, this.settings);
	      this.notes = this.keyboard.keys;
	      this.connectEffects();
	    }
	  }, {
	    key: 'setWaveTypeOsc1',
	    value: function setWaveTypeOsc1(type) {
	      this.eachNote(function (note) {
	        return note.oscillatorNode1.type = type;
	      });
	      this.settings.oscType1 = type;
	    }
	  }, {
	    key: 'setWaveTypeOsc2',
	    value: function setWaveTypeOsc2(type) {
	      this.eachNote(function (note) {
	        return note.oscillatorNode2.type = type;
	      });
	      this.settings.oscType2 = type;
	    }
	  }, {
	    key: 'setEffects',
	    value: function setEffects() {
	      var _ref;
	
	      this.chorus = new tuna.Chorus({
	        rate: 1.5,
	        feedback: 0.2,
	        delay: 0.0045,
	        bypass: 0
	      });
	
	      this.delay = new tuna.PingPongDelay({
	        wetLevel: 1, //0 to 1
	        feedback: 0.6, //0 to 1
	        delayTimeLeft: 150, //1 to 10000 (milliseconds)
	        delayTimeRight: 200 //1 to 10000 (milliseconds)
	      });
	
	      this.phaser = new tuna.Phaser({
	        rate: 1.2, //0.01 to 8 is a decent range, but higher values are possible
	        depth: 0.3, //0 to 1
	        feedback: 0.2, //0 to 1+
	        stereoPhase: 30, //0 to 180
	        baseModulationFrequency: 700, //500 to 1500
	        bypass: 0
	      });
	
	      this.bitcrusher = new tuna.Bitcrusher({
	        bits: 4, //1 to 16
	        normfreq: 0.1, //0 to 1
	        bufferSize: 4096 //256 to 16384
	      });
	
	      this.overdrive = new tuna.Overdrive((_ref = {
	        outputGain: 1, //0 to 1+
	        drive: 1, //0 to 1
	        curveAmount: 1, //0 to 1
	        algorithmIndex: 5 }, _defineProperty(_ref, 'outputGain', 0.4), _defineProperty(_ref, 'drive', 1), _defineProperty(_ref, 'curveAmount', 1), _defineProperty(_ref, 'algorithmIndex', 3), _defineProperty(_ref, 'bypass', 0), _ref));
	
	      this.tremolo = new tuna.Tremolo({
	        intensity: 0.8, //0 to 1
	        rate: 5, //0.001 to 8
	        stereoPhase: 0, //0 to 180
	        bypass: 0
	      });
	
	      this.connectEffects();
	    }
	  }, {
	    key: 'connectEffects',
	    value: function connectEffects() {
	      var effects = [this.chorus, this.delay, this.phaser, this.tremolo, this.bitcrusher, this.compressor, this.overdrive];
	
	      this.eachNote(function (note) {
	        var gainNode1 = note.gainNode1;
	        var gainNode2 = note.gainNode2;
	        effects.forEach(function (effect) {
	          gainNode1.connect(effect);
	          gainNode2.connect(_note.ctx.destination);
	        });
	      });
	    }
	  }, {
	    key: 'addEffect',
	    value: function addEffect(effect) {
	      effect.connect(_note.ctx.destination);
	    }
	  }, {
	    key: 'removeEffect',
	    value: function removeEffect(effect) {
	      effect.disconnect(_note.ctx.destination);
	    }
	  }, {
	    key: 'setListeners',
	    value: function setListeners() {
	      (0, _domAble.$d)('#controller').on('mouseup', 'p', this.handle.bind(this));
	      (0, _domAble.$d)('#controller').on('touchend', 'p', this.handle.bind(this));
	    }
	  }, {
	    key: 'handle',
	    value: function handle(e) {
	      e.preventDefault();
	      var button = (0, _domAble.$d)(e.target).parent()[0];
	      switch (button.classList[0]) {
	        case "osc1":
	          (0, _domAble.$d)('.osc1').removeClass('selected');
	          (0, _domAble.$d)(button).addClass('selected');
	          this.setWaveTypeOsc1(button.id);
	          break;
	        case "osc2":
	          (0, _domAble.$d)('.osc2').removeClass('selected');
	          (0, _domAble.$d)(button).addClass('selected');
	          this.setWaveTypeOsc2(button.id);
	          break;
	        case "range":
	          (0, _domAble.$d)('.range').removeClass('selected');
	          (0, _domAble.$d)(button).addClass('selected');
	          this.setRange(button.id);
	          break;
	        case "effect":
	          if (button.classList.contains("selected")) {
	            (0, _domAble.$d)(button).removeClass('selected');
	            this.removeEffect(this[button.id]);
	          } else {
	            (0, _domAble.$d)(button).addClass('selected');
	            this.addEffect(this[button.id]);
	          }
	          break;
	      }
	    }
	  }, {
	    key: 'eachNote',
	    value: function eachNote(callback) {
	      var keys = Object.keys(this.notes);
	      for (var i = 0; i < keys.length; i++) {
	        callback(this.notes[keys[i]], i);
	      }
	
	      return this.keys;
	    }
	  }]);
	
	  return Controller;
	}();
	
	function _createControls() {
	  var controlEl = (0, _domAble.$d)(controller);
	}
	
	exports.Controller = Controller;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/*
	    Copyright (c) 2012 DinahMoe AB & Oskar Eriksson
	
	    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
	    files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
	    modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
	    is furnished to do so, subject to the following conditions:
	
	    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	
	    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
	var userContext,
	    userInstance,
	    pipe = function pipe(param, val) {
	    param.value = val;
	},
	    Super = Object.create(null, {
	    activate: {
	        writable: true,
	        value: function value(doActivate) {
	            if (doActivate) {
	                this.input.disconnect();
	                this.input.connect(this.activateNode);
	                if (this.activateCallback) {
	                    this.activateCallback(doActivate);
	                }
	            } else {
	                this.input.disconnect();
	                this.input.connect(this.output);
	            }
	        }
	    },
	    bypass: {
	        get: function get() {
	            return this._bypass;
	        },
	        set: function set(value) {
	            if (this._lastBypassValue === value) {
	                return;
	            }
	            this._bypass = value;
	            this.activate(!value);
	            this._lastBypassValue = value;
	        }
	    },
	    connect: {
	        value: function value(target) {
	            this.output.connect(target);
	        }
	    },
	    disconnect: {
	        value: function value(target) {
	            this.output.disconnect(target);
	        }
	    },
	    connectInOrder: {
	        value: function value(nodeArray) {
	            var i = nodeArray.length - 1;
	            while (i--) {
	                if (!nodeArray[i].connect) {
	                    return console.error("AudioNode.connectInOrder: TypeError: Not an AudioNode.", nodeArray[i]);
	                }
	                if (nodeArray[i + 1].input) {
	                    nodeArray[i].connect(nodeArray[i + 1].input);
	                } else {
	                    nodeArray[i].connect(nodeArray[i + 1]);
	                }
	            }
	        }
	    },
	    getDefaults: {
	        value: function value() {
	            var result = {};
	            for (var key in this.defaults) {
	                result[key] = this.defaults[key].value;
	            }
	            return result;
	        }
	    },
	    automate: {
	        value: function value(property, _value, duration, startTime) {
	            var start = startTime ? ~ ~(startTime / 1000) : userContext.currentTime,
	                dur = duration ? ~ ~(duration / 1000) : 0,
	                _is = this.defaults[property],
	                param = this[property],
	                method;
	
	            if (param) {
	                if (_is.automatable) {
	                    if (!duration) {
	                        method = "setValueAtTime";
	                    } else {
	                        method = "linearRampToValueAtTime";
	                        param.cancelScheduledValues(start);
	                        param.setValueAtTime(param.value, start);
	                    }
	                    param[method](_value, dur + start);
	                } else {
	                    param = _value;
	                }
	            } else {
	                console.error("Invalid Property for " + this.name);
	            }
	        }
	    }
	}),
	    FLOAT = "float",
	    BOOLEAN = "boolean",
	    STRING = "string",
	    INT = "int";
	
	function Tuna(context) {
	    if (!(this instanceof Tuna)) {
	        return new Tuna(context);
	    }
	    if (!window.AudioContext) {
	        window.AudioContext = window.webkitAudioContext;
	    }
	    if (!context) {
	        console.log("tuna.js: Missing audio context! Creating a new context for you.");
	        context = window.AudioContext && new window.AudioContext();
	    }
	    if (!context) {
	        throw new Error("Tuna cannot initialize because this environment does not support web audio.");
	    }
	    connectify(context);
	    userContext = context;
	    userInstance = this;
	}
	
	function connectify(context) {
	    if (context.__connectified__ === true) return;
	
	    var gain = context.createGain(),
	        proto = Object.getPrototypeOf(Object.getPrototypeOf(gain)),
	        oconnect = proto.connect;
	
	    proto.connect = shimConnect;
	    context.__connectified__ = true; // Prevent overriding connect more than once
	
	    function shimConnect() {
	        var node = arguments[0];
	        if (node === undefined) return;
	        arguments[0] = Super.isPrototypeOf ? Super.isPrototypeOf(node) ? node.input : node : node.input || node;
	        oconnect.apply(this, arguments);
	        return node;
	    }
	}
	
	function dbToWAVolume(db) {
	    return Math.max(0, Math.round(100 * Math.pow(2, db / 6)) / 100);
	}
	
	function fmod(x, y) {
	    // http://kevin.vanzonneveld.net
	    // *     example 1: fmod(5.7, 1.3);
	    // *     returns 1: 0.5
	    var tmp,
	        tmp2,
	        p = 0,
	        pY = 0,
	        l = 0.0,
	        l2 = 0.0;
	
	    tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/);
	    p = parseInt(tmp[2], 10) - (tmp[1] + "").length;
	    tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/);
	    pY = parseInt(tmp[2], 10) - (tmp[1] + "").length;
	
	    if (pY > p) {
	        p = pY;
	    }
	
	    tmp2 = x % y;
	
	    if (p < -100 || p > 20) {
	        // toFixed will give an out of bound error so we fix it like this:
	        l = Math.round(Math.log(tmp2) / Math.log(10));
	        l2 = Math.pow(10, l);
	
	        return (tmp2 / l2).toFixed(l - p) * l2;
	    } else {
	        return parseFloat(tmp2.toFixed(-p));
	    }
	}
	
	function sign(x) {
	    if (x === 0) {
	        return 1;
	    } else {
	        return Math.abs(x) / x;
	    }
	}
	
	function tanh(n) {
	    return (Math.exp(n) - Math.exp(-n)) / (Math.exp(n) + Math.exp(-n));
	}
	
	function initValue(userVal, defaultVal) {
	    return userVal === undefined ? defaultVal : userVal;
	}
	
	Tuna.prototype.Bitcrusher = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.bufferSize = properties.bufferSize || this.defaults.bufferSize.value;
	
	    this.input = userContext.createGain();
	    this.activateNode = userContext.createGain();
	    this.processor = userContext.createScriptProcessor(this.bufferSize, 1, 1);
	    this.output = userContext.createGain();
	
	    this.activateNode.connect(this.processor);
	    this.processor.connect(this.output);
	
	    var phaser = 0,
	        last = 0,
	        input,
	        output,
	        step,
	        i,
	        length;
	    this.processor.onaudioprocess = function (e) {
	        input = e.inputBuffer.getChannelData(0), output = e.outputBuffer.getChannelData(0), step = Math.pow(1 / 2, this.bits);
	        length = input.length;
	        for (i = 0; i < length; i++) {
	            phaser += this.normfreq;
	            if (phaser >= 1.0) {
	                phaser -= 1.0;
	                last = step * Math.floor(input[i] / step + 0.5);
	            }
	            output[i] = last;
	        }
	    };
	
	    this.bits = properties.bits || this.defaults.bits.value;
	    this.normfreq = initValue(properties.normfreq, this.defaults.normfreq.value);
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.Bitcrusher.prototype = Object.create(Super, {
	    name: {
	        value: "Bitcrusher"
	    },
	    defaults: {
	        writable: true,
	        value: {
	            bits: {
	                value: 4,
	                min: 1,
	                max: 16,
	                automatable: false,
	                type: INT
	            },
	            bufferSize: {
	                value: 4096,
	                min: 256,
	                max: 16384,
	                automatable: false,
	                type: INT
	            },
	            bypass: {
	                value: false,
	                automatable: false,
	                type: BOOLEAN
	            },
	            normfreq: {
	                value: 0.1,
	                min: 0.0001,
	                max: 1.0,
	                automatable: false,
	                type: FLOAT
	            }
	        }
	    },
	    bits: {
	        enumerable: true,
	        get: function get() {
	            return this.processor.bits;
	        },
	        set: function set(value) {
	            this.processor.bits = value;
	        }
	    },
	    normfreq: {
	        enumerable: true,
	        get: function get() {
	            return this.processor.normfreq;
	        },
	        set: function set(value) {
	            this.processor.normfreq = value;
	        }
	    }
	});
	
	Tuna.prototype.Cabinet = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.input = userContext.createGain();
	    this.activateNode = userContext.createGain();
	    this.convolver = this.newConvolver(properties.impulsePath || "../impulses/impulse_guitar.wav");
	    this.makeupNode = userContext.createGain();
	    this.output = userContext.createGain();
	
	    this.activateNode.connect(this.convolver.input);
	    this.convolver.output.connect(this.makeupNode);
	    this.makeupNode.connect(this.output);
	
	    this.makeupGain = initValue(properties.makeupGain, this.defaults.makeupGain);
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.Cabinet.prototype = Object.create(Super, {
	    name: {
	        value: "Cabinet"
	    },
	    defaults: {
	        writable: true,
	        value: {
	            makeupGain: {
	                value: 1,
	                min: 0,
	                max: 20,
	                automatable: true,
	                type: FLOAT
	            },
	            bypass: {
	                value: false,
	                automatable: false,
	                type: BOOLEAN
	            }
	        }
	    },
	    makeupGain: {
	        enumerable: true,
	        get: function get() {
	            return this.makeupNode.gain;
	        },
	        set: function set(value) {
	            this.makeupNode.gain.value = value;
	        }
	    },
	    newConvolver: {
	        value: function value(impulsePath) {
	            return new userInstance.Convolver({
	                impulse: impulsePath,
	                dryLevel: 0,
	                wetLevel: 1
	            });
	        }
	    }
	});
	
	Tuna.prototype.Chorus = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.input = userContext.createGain();
	    this.attenuator = this.activateNode = userContext.createGain();
	    this.splitter = userContext.createChannelSplitter(2);
	    this.delayL = userContext.createDelay();
	    this.delayR = userContext.createDelay();
	    this.feedbackGainNodeLR = userContext.createGain();
	    this.feedbackGainNodeRL = userContext.createGain();
	    this.merger = userContext.createChannelMerger(2);
	    this.output = userContext.createGain();
	
	    this.lfoL = new userInstance.LFO({
	        target: this.delayL.delayTime,
	        callback: pipe
	    });
	    this.lfoR = new userInstance.LFO({
	        target: this.delayR.delayTime,
	        callback: pipe
	    });
	
	    this.input.connect(this.attenuator);
	    this.attenuator.connect(this.output);
	    this.attenuator.connect(this.splitter);
	    this.splitter.connect(this.delayL, 0);
	    this.splitter.connect(this.delayR, 1);
	    this.delayL.connect(this.feedbackGainNodeLR);
	    this.delayR.connect(this.feedbackGainNodeRL);
	    this.feedbackGainNodeLR.connect(this.delayR);
	    this.feedbackGainNodeRL.connect(this.delayL);
	    this.delayL.connect(this.merger, 0, 0);
	    this.delayR.connect(this.merger, 0, 1);
	    this.merger.connect(this.output);
	
	    this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
	    this.rate = initValue(properties.rate, this.defaults.rate.value);
	    this.delay = initValue(properties.delay, this.defaults.delay.value);
	    this.depth = initValue(properties.depth, this.defaults.depth.value);
	    this.lfoR.phase = Math.PI / 2;
	    this.attenuator.gain.value = 0.6934; // 1 / (10 ^ (((20 * log10(3)) / 3) / 20))
	    this.lfoL.activate(true);
	    this.lfoR.activate(true);
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.Chorus.prototype = Object.create(Super, {
	    name: {
	        value: "Chorus"
	    },
	    defaults: {
	        writable: true,
	        value: {
	            feedback: {
	                value: 0.4,
	                min: 0,
	                max: 0.95,
	                automatable: false,
	                type: FLOAT
	            },
	            delay: {
	                value: 0.0045,
	                min: 0,
	                max: 1,
	                automatable: false,
	                type: FLOAT
	            },
	            depth: {
	                value: 0.7,
	                min: 0,
	                max: 1,
	                automatable: false,
	                type: FLOAT
	            },
	            rate: {
	                value: 1.5,
	                min: 0,
	                max: 8,
	                automatable: false,
	                type: FLOAT
	            },
	            bypass: {
	                value: false,
	                automatable: false,
	                type: BOOLEAN
	            }
	        }
	    },
	    delay: {
	        enumerable: true,
	        get: function get() {
	            return this._delay;
	        },
	        set: function set(value) {
	            this._delay = 0.0002 * (Math.pow(10, value) * 2);
	            this.lfoL.offset = this._delay;
	            this.lfoR.offset = this._delay;
	            this._depth = this._depth;
	        }
	    },
	    depth: {
	        enumerable: true,
	        get: function get() {
	            return this._depth;
	        },
	        set: function set(value) {
	            this._depth = value;
	            this.lfoL.oscillation = this._depth * this._delay;
	            this.lfoR.oscillation = this._depth * this._delay;
	        }
	    },
	    feedback: {
	        enumerable: true,
	        get: function get() {
	            return this._feedback;
	        },
	        set: function set(value) {
	            this._feedback = value;
	            this.feedbackGainNodeLR.gain.value = this._feedback;
	            this.feedbackGainNodeRL.gain.value = this._feedback;
	        }
	    },
	    rate: {
	        enumerable: true,
	        get: function get() {
	            return this._rate;
	        },
	        set: function set(value) {
	            this._rate = value;
	            this.lfoL.frequency = this._rate;
	            this.lfoR.frequency = this._rate;
	        }
	    }
	});
	
	Tuna.prototype.Compressor = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.input = userContext.createGain();
	    this.compNode = this.activateNode = userContext.createDynamicsCompressor();
	    this.makeupNode = userContext.createGain();
	    this.output = userContext.createGain();
	
	    this.compNode.connect(this.makeupNode);
	    this.makeupNode.connect(this.output);
	
	    this.automakeup = initValue(properties.automakeup, this.defaults.automakeup.value);
	    this.makeupGain = properties.makeupGain || this.defaults.makeupGain.value;
	    this.threshold = initValue(properties.threshold, this.defaults.threshold.value);
	    this.release = properties.release || this.defaults.release.value;
	    this.attack = initValue(properties.attack, this.defaults.attack.value);
	    this.ratio = properties.ratio || this.defaults.ratio.value;
	    this.knee = initValue(properties.knee, this.defaults.knee.value);
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.Compressor.prototype = Object.create(Super, {
	    name: {
	        value: "Compressor"
	    },
	    defaults: {
	        writable: true,
	        value: {
	            threshold: {
	                value: -20,
	                min: -60,
	                max: 0,
	                automatable: true,
	                type: FLOAT
	            },
	            release: {
	                value: 250,
	                min: 10,
	                max: 2000,
	                automatable: true,
	                type: FLOAT
	            },
	            makeupGain: {
	                value: 1,
	                min: 1,
	                max: 100,
	                automatable: true,
	                type: FLOAT
	            },
	            attack: {
	                value: 1,
	                min: 0,
	                max: 1000,
	                automatable: true,
	                type: FLOAT
	            },
	            ratio: {
	                value: 4,
	                min: 1,
	                max: 50,
	                automatable: true,
	                type: FLOAT
	            },
	            knee: {
	                value: 5,
	                min: 0,
	                max: 40,
	                automatable: true,
	                type: FLOAT
	            },
	            automakeup: {
	                value: false,
	                automatable: false,
	                type: BOOLEAN
	            },
	            bypass: {
	                value: false,
	                automatable: false,
	                type: BOOLEAN
	            }
	        }
	    },
	    computeMakeup: {
	        value: function value() {
	            var magicCoefficient = 4,
	                // raise me if the output is too hot
	            c = this.compNode;
	            return -(c.threshold.value - c.threshold.value / c.ratio.value) / magicCoefficient;
	        }
	    },
	    automakeup: {
	        enumerable: true,
	        get: function get() {
	            return this._automakeup;
	        },
	        set: function set(value) {
	            this._automakeup = value;
	            if (this._automakeup) this.makeupGain = this.computeMakeup();
	        }
	    },
	    threshold: {
	        enumerable: true,
	        get: function get() {
	            return this.compNode.threshold;
	        },
	        set: function set(value) {
	            this.compNode.threshold.value = value;
	            if (this._automakeup) this.makeupGain = this.computeMakeup();
	        }
	    },
	    ratio: {
	        enumerable: true,
	        get: function get() {
	            return this.compNode.ratio;
	        },
	        set: function set(value) {
	            this.compNode.ratio.value = value;
	            if (this._automakeup) this.makeupGain = this.computeMakeup();
	        }
	    },
	    knee: {
	        enumerable: true,
	        get: function get() {
	            return this.compNode.knee;
	        },
	        set: function set(value) {
	            this.compNode.knee.value = value;
	            if (this._automakeup) this.makeupGain = this.computeMakeup();
	        }
	    },
	    attack: {
	        enumerable: true,
	        get: function get() {
	            return this.compNode.attack;
	        },
	        set: function set(value) {
	            this.compNode.attack.value = value / 1000;
	        }
	    },
	    release: {
	        enumerable: true,
	        get: function get() {
	            return this.compNode.release;
	        },
	        set: function set(value) {
	            this.compNode.release.value = value / 1000;
	        }
	    },
	    makeupGain: {
	        enumerable: true,
	        get: function get() {
	            return this.makeupNode.gain;
	        },
	        set: function set(value) {
	            this.makeupNode.gain.value = dbToWAVolume(value);
	        }
	    }
	});
	
	Tuna.prototype.Convolver = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.input = userContext.createGain();
	    this.activateNode = userContext.createGain();
	    this.convolver = userContext.createConvolver();
	    this.dry = userContext.createGain();
	    this.filterLow = userContext.createBiquadFilter();
	    this.filterHigh = userContext.createBiquadFilter();
	    this.wet = userContext.createGain();
	    this.output = userContext.createGain();
	
	    this.activateNode.connect(this.filterLow);
	    this.activateNode.connect(this.dry);
	    this.filterLow.connect(this.filterHigh);
	    this.filterHigh.connect(this.convolver);
	    this.convolver.connect(this.wet);
	    this.wet.connect(this.output);
	    this.dry.connect(this.output);
	
	    this.dryLevel = initValue(properties.dryLevel, this.defaults.dryLevel.value);
	    this.wetLevel = initValue(properties.wetLevel, this.defaults.wetLevel.value);
	    this.highCut = properties.highCut || this.defaults.highCut.value;
	    this.buffer = properties.impulse || "../impulses/ir_rev_short.wav";
	    this.lowCut = properties.lowCut || this.defaults.lowCut.value;
	    this.level = initValue(properties.level, this.defaults.level.value);
	    this.filterHigh.type = "lowpass";
	    this.filterLow.type = "highpass";
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.Convolver.prototype = Object.create(Super, {
	    name: {
	        value: "Convolver"
	    },
	    defaults: {
	        writable: true,
	        value: {
	            highCut: {
	                value: 22050,
	                min: 20,
	                max: 22050,
	                automatable: true,
	                type: FLOAT
	            },
	            lowCut: {
	                value: 20,
	                min: 20,
	                max: 22050,
	                automatable: true,
	                type: FLOAT
	            },
	            dryLevel: {
	                value: 1,
	                min: 0,
	                max: 1,
	                automatable: true,
	                type: FLOAT
	            },
	            wetLevel: {
	                value: 1,
	                min: 0,
	                max: 1,
	                automatable: true,
	                type: FLOAT
	            },
	            level: {
	                value: 1,
	                min: 0,
	                max: 1,
	                automatable: true,
	                type: FLOAT
	            }
	        }
	    },
	    lowCut: {
	        get: function get() {
	            return this.filterLow.frequency;
	        },
	        set: function set(value) {
	            this.filterLow.frequency.value = value;
	        }
	    },
	    highCut: {
	        get: function get() {
	            return this.filterHigh.frequency;
	        },
	        set: function set(value) {
	            this.filterHigh.frequency.value = value;
	        }
	    },
	    level: {
	        get: function get() {
	            return this.output.gain;
	        },
	        set: function set(value) {
	            this.output.gain.value = value;
	        }
	    },
	    dryLevel: {
	        get: function get() {
	            return this.dry.gain;
	        },
	        set: function set(value) {
	            this.dry.gain.value = value;
	        }
	    },
	    wetLevel: {
	        get: function get() {
	            return this.wet.gain;
	        },
	        set: function set(value) {
	            this.wet.gain.value = value;
	        }
	    },
	    buffer: {
	        enumerable: false,
	        get: function get() {
	            return this.convolver.buffer;
	        },
	        set: function set(impulse) {
	            var convolver = this.convolver,
	                xhr = new XMLHttpRequest();
	            if (!impulse) {
	                console.log("Tuna.Convolver.setBuffer: Missing impulse path!");
	                return;
	            }
	            xhr.open("GET", impulse, true);
	            xhr.responseType = "arraybuffer";
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState === 4) {
	                    if (xhr.status < 300 && xhr.status > 199 || xhr.status === 302) {
	                        userContext.decodeAudioData(xhr.response, function (buffer) {
	                            convolver.buffer = buffer;
	                        }, function (e) {
	                            if (e) console.log("Tuna.Convolver.setBuffer: Error decoding data" + e);
	                        });
	                    }
	                }
	            };
	            xhr.send(null);
	        }
	    }
	});
	
	Tuna.prototype.Delay = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.input = userContext.createGain();
	    this.activateNode = userContext.createGain();
	    this.dry = userContext.createGain();
	    this.wet = userContext.createGain();
	    this.filter = userContext.createBiquadFilter();
	    this.delay = userContext.createDelay();
	    this.feedbackNode = userContext.createGain();
	    this.output = userContext.createGain();
	
	    this.activateNode.connect(this.delay);
	    this.activateNode.connect(this.dry);
	    this.delay.connect(this.filter);
	    this.filter.connect(this.feedbackNode);
	    this.feedbackNode.connect(this.delay);
	    this.feedbackNode.connect(this.wet);
	    this.wet.connect(this.output);
	    this.dry.connect(this.output);
	
	    this.delayTime = properties.delayTime || this.defaults.delayTime.value;
	    this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
	    this.wetLevel = initValue(properties.wetLevel, this.defaults.wetLevel.value);
	    this.dryLevel = initValue(properties.dryLevel, this.defaults.dryLevel.value);
	    this.cutoff = properties.cutoff || this.defaults.cutoff.value;
	    this.filter.type = "lowpass";
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.Delay.prototype = Object.create(Super, {
	    name: {
	        value: "Delay"
	    },
	    defaults: {
	        writable: true,
	        value: {
	            delayTime: {
	                value: 100,
	                min: 20,
	                max: 1000,
	                automatable: false,
	                type: FLOAT
	            },
	            feedback: {
	                value: 0.45,
	                min: 0,
	                max: 0.9,
	                automatable: true,
	                type: FLOAT
	            },
	            cutoff: {
	                value: 20000,
	                min: 20,
	                max: 20000,
	                automatable: true,
	                type: FLOAT
	            },
	            wetLevel: {
	                value: 0.5,
	                min: 0,
	                max: 1,
	                automatable: true,
	                type: FLOAT
	            },
	            dryLevel: {
	                value: 1,
	                min: 0,
	                max: 1,
	                automatable: true,
	                type: FLOAT
	            }
	        }
	    },
	    delayTime: {
	        enumerable: true,
	        get: function get() {
	            return this.delay.delayTime;
	        },
	        set: function set(value) {
	            this.delay.delayTime.value = value / 1000;
	        }
	    },
	    wetLevel: {
	        enumerable: true,
	        get: function get() {
	            return this.wet.gain;
	        },
	        set: function set(value) {
	            this.wet.gain.value = value;
	        }
	    },
	    dryLevel: {
	        enumerable: true,
	        get: function get() {
	            return this.dry.gain;
	        },
	        set: function set(value) {
	            this.dry.gain.value = value;
	        }
	    },
	    feedback: {
	        enumerable: true,
	        get: function get() {
	            return this.feedbackNode.gain;
	        },
	        set: function set(value) {
	            this.feedbackNode.gain.value = value;
	        }
	    },
	    cutoff: {
	        enumerable: true,
	        get: function get() {
	            return this.filter.frequency;
	        },
	        set: function set(value) {
	            this.filter.frequency.value = value;
	        }
	    }
	});
	
	Tuna.prototype.Filter = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.input = userContext.createGain();
	    this.activateNode = userContext.createGain();
	    this.filter = userContext.createBiquadFilter();
	    this.output = userContext.createGain();
	
	    this.activateNode.connect(this.filter);
	    this.filter.connect(this.output);
	
	    this.frequency = properties.frequency || this.defaults.frequency.value;
	    this.Q = properties.resonance || this.defaults.Q.value;
	    this.filterType = initValue(properties.filterType, this.defaults.filterType.value);
	    this.gain = initValue(properties.gain, this.defaults.gain.value);
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.Filter.prototype = Object.create(Super, {
	    name: {
	        value: "Filter"
	    },
	    defaults: {
	        writable: true,
	        value: {
	            frequency: {
	                value: 800,
	                min: 20,
	                max: 22050,
	                automatable: true,
	                type: FLOAT
	            },
	            Q: {
	                value: 1,
	                min: 0.001,
	                max: 100,
	                automatable: true,
	                type: FLOAT
	            },
	            gain: {
	                value: 0,
	                min: -40,
	                max: 40,
	                automatable: true,
	                type: FLOAT
	            },
	            bypass: {
	                value: false,
	                automatable: false,
	                type: BOOLEAN
	            },
	            filterType: {
	                value: "lowpass",
	                automatable: false,
	                type: STRING
	            }
	        }
	    },
	    filterType: {
	        enumerable: true,
	        get: function get() {
	            return this.filter.type;
	        },
	        set: function set(value) {
	            this.filter.type = value;
	        }
	    },
	    Q: {
	        enumerable: true,
	        get: function get() {
	            return this.filter.Q;
	        },
	        set: function set(value) {
	            this.filter.Q.value = value;
	        }
	    },
	    gain: {
	        enumerable: true,
	        get: function get() {
	            return this.filter.gain;
	        },
	        set: function set(value) {
	            this.filter.gain.value = value;
	        }
	    },
	    frequency: {
	        enumerable: true,
	        get: function get() {
	            return this.filter.frequency;
	        },
	        set: function set(value) {
	            this.filter.frequency.value = value;
	        }
	    }
	});
	
	Tuna.prototype.MoogFilter = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.bufferSize = properties.bufferSize || this.defaults.bufferSize.value;
	
	    this.input = userContext.createGain();
	    this.activateNode = userContext.createGain();
	    this.processor = userContext.createScriptProcessor(this.bufferSize, 1, 1);
	    this.output = userContext.createGain();
	
	    this.activateNode.connect(this.processor);
	    this.processor.connect(this.output);
	
	    var in1, in2, in3, in4, out1, out2, out3, out4;
	    in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0.0;
	    var input, output, f, fb, i, length, inputFactor;
	    this.processor.onaudioprocess = function (e) {
	        input = e.inputBuffer.getChannelData(0), output = e.outputBuffer.getChannelData(0), f = this.cutoff * 1.16, inputFactor = 0.35013 * (f * f) * (f * f);
	        fb = this.resonance * (1.0 - 0.15 * f * f);
	        length = input.length;
	        for (i = 0; i < length; i++) {
	            input[i] -= out4 * fb;
	            input[i] *= inputFactor;
	            out1 = input[i] + 0.3 * in1 + (1 - f) * out1; // Pole 1
	            in1 = input[i];
	            out2 = out1 + 0.3 * in2 + (1 - f) * out2; // Pole 2
	            in2 = out1;
	            out3 = out2 + 0.3 * in3 + (1 - f) * out3; // Pole 3
	            in3 = out2;
	            out4 = out3 + 0.3 * in4 + (1 - f) * out4; // Pole 4
	            in4 = out3;
	            output[i] = out4;
	        }
	    };
	
	    this.cutoff = initValue(properties.cutoff, this.defaults.cutoff.value);
	    this.resonance = initValue(properties.resonance, this.defaults.resonance.value);
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.MoogFilter.prototype = Object.create(Super, {
	    name: {
	        value: "MoogFilter"
	    },
	    defaults: {
	        writable: true,
	        value: {
	            bufferSize: {
	                value: 4096,
	                min: 256,
	                max: 16384,
	                automatable: false,
	                type: INT
	            },
	            bypass: {
	                value: false,
	                automatable: false,
	                type: BOOLEAN
	            },
	            cutoff: {
	                value: 0.065,
	                min: 0.0001,
	                max: 1.0,
	                automatable: false,
	                type: FLOAT
	            },
	            resonance: {
	                value: 3.5,
	                min: 0.0,
	                max: 4.0,
	                automatable: false,
	                type: FLOAT
	            }
	        }
	    },
	    cutoff: {
	        enumerable: true,
	        get: function get() {
	            return this.processor.cutoff;
	        },
	        set: function set(value) {
	            this.processor.cutoff = value;
	        }
	    },
	    resonance: {
	        enumerable: true,
	        get: function get() {
	            return this.processor.resonance;
	        },
	        set: function set(value) {
	            this.processor.resonance = value;
	        }
	    }
	});
	
	Tuna.prototype.Overdrive = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.input = userContext.createGain();
	    this.activateNode = userContext.createGain();
	    this.inputDrive = userContext.createGain();
	    this.waveshaper = userContext.createWaveShaper();
	    this.outputDrive = userContext.createGain();
	    this.output = userContext.createGain();
	
	    this.activateNode.connect(this.inputDrive);
	    this.inputDrive.connect(this.waveshaper);
	    this.waveshaper.connect(this.outputDrive);
	    this.outputDrive.connect(this.output);
	
	    this.ws_table = new Float32Array(this.k_nSamples);
	    this.drive = initValue(properties.drive, this.defaults.drive.value);
	    this.outputGain = initValue(properties.outputGain, this.defaults.outputGain.value);
	    this.curveAmount = initValue(properties.curveAmount, this.defaults.curveAmount.value);
	    this.algorithmIndex = initValue(properties.algorithmIndex, this.defaults.algorithmIndex.value);
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.Overdrive.prototype = Object.create(Super, {
	    name: {
	        value: "Overdrive"
	    },
	    defaults: {
	        writable: true,
	        value: {
	            drive: {
	                value: 1,
	                min: 0,
	                max: 1,
	                automatable: true,
	                type: FLOAT,
	                scaled: true
	            },
	            outputGain: {
	                value: 1,
	                min: 0,
	                max: 1,
	                automatable: true,
	                type: FLOAT,
	                scaled: true
	            },
	            curveAmount: {
	                value: 0.725,
	                min: 0,
	                max: 1,
	                automatable: false,
	                type: FLOAT
	            },
	            algorithmIndex: {
	                value: 0,
	                min: 0,
	                max: 5,
	                automatable: false,
	                type: INT
	            }
	        }
	    },
	    k_nSamples: {
	        value: 8192
	    },
	    drive: {
	        get: function get() {
	            return this.inputDrive.gain;
	        },
	        set: function set(value) {
	            this._drive = value;
	        }
	    },
	    curveAmount: {
	        get: function get() {
	            return this._curveAmount;
	        },
	        set: function set(value) {
	            this._curveAmount = value;
	            if (this._algorithmIndex === undefined) {
	                this._algorithmIndex = 0;
	            }
	            this.waveshaperAlgorithms[this._algorithmIndex](this._curveAmount, this.k_nSamples, this.ws_table);
	            this.waveshaper.curve = this.ws_table;
	        }
	    },
	    outputGain: {
	        get: function get() {
	            return this.outputDrive.gain;
	        },
	        set: function set(value) {
	            this._outputGain = dbToWAVolume(value);
	        }
	    },
	    algorithmIndex: {
	        get: function get() {
	            return this._algorithmIndex;
	        },
	        set: function set(value) {
	            this._algorithmIndex = value;
	            this.curveAmount = this._curveAmount;
	        }
	    },
	    waveshaperAlgorithms: {
	        value: [function (amount, n_samples, ws_table) {
	            amount = Math.min(amount, 0.9999);
	            var k = 2 * amount / (1 - amount),
	                i,
	                x;
	            for (i = 0; i < n_samples; i++) {
	                x = i * 2 / n_samples - 1;
	                ws_table[i] = (1 + k) * x / (1 + k * Math.abs(x));
	            }
	        }, function (amount, n_samples, ws_table) {
	            var i, x, y;
	            for (i = 0; i < n_samples; i++) {
	                x = i * 2 / n_samples - 1;
	                y = (0.5 * Math.pow(x + 1.4, 2) - 1) * y >= 0 ? 5.8 : 1.2;
	                ws_table[i] = tanh(y);
	            }
	        }, function (amount, n_samples, ws_table) {
	            var i,
	                x,
	                y,
	                a = 1 - amount;
	            for (i = 0; i < n_samples; i++) {
	                x = i * 2 / n_samples - 1;
	                y = x < 0 ? -Math.pow(Math.abs(x), a + 0.04) : Math.pow(x, a);
	                ws_table[i] = tanh(y * 2);
	            }
	        }, function (amount, n_samples, ws_table) {
	            var i,
	                x,
	                y,
	                abx,
	                a = 1 - amount > 0.99 ? 0.99 : 1 - amount;
	            for (i = 0; i < n_samples; i++) {
	                x = i * 2 / n_samples - 1;
	                abx = Math.abs(x);
	                if (abx < a) y = abx;else if (abx > a) y = a + (abx - a) / (1 + Math.pow((abx - a) / (1 - a), 2));else if (abx > 1) y = abx;
	                ws_table[i] = sign(x) * y * (1 / ((a + 1) / 2));
	            }
	        }, function (amount, n_samples, ws_table) {
	            // fixed curve, amount doesn't do anything, the distortion is just from the drive
	            var i, x;
	            for (i = 0; i < n_samples; i++) {
	                x = i * 2 / n_samples - 1;
	                if (x < -0.08905) {
	                    ws_table[i] = -3 / 4 * (1 - Math.pow(1 - (Math.abs(x) - 0.032857), 12) + 1 / 3 * (Math.abs(x) - 0.032847)) + 0.01;
	                } else if (x >= -0.08905 && x < 0.320018) {
	                    ws_table[i] = -6.153 * (x * x) + 3.9375 * x;
	                } else {
	                    ws_table[i] = 0.630035;
	                }
	            }
	        }, function (amount, n_samples, ws_table) {
	            var a = 2 + Math.round(amount * 14),
	
	            // we go from 2 to 16 bits, keep in mind for the UI
	            bits = Math.round(Math.pow(2, a - 1)),
	
	            // real number of quantization steps divided by 2
	            i,
	                x;
	            for (i = 0; i < n_samples; i++) {
	                x = i * 2 / n_samples - 1;
	                ws_table[i] = Math.round(x * bits) / bits;
	            }
	        }]
	    }
	});
	
	Tuna.prototype.Phaser = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.input = userContext.createGain();
	    this.splitter = this.activateNode = userContext.createChannelSplitter(2);
	    this.filtersL = [];
	    this.filtersR = [];
	    this.feedbackGainNodeL = userContext.createGain();
	    this.feedbackGainNodeR = userContext.createGain();
	    this.merger = userContext.createChannelMerger(2);
	    this.filteredSignal = userContext.createGain();
	    this.output = userContext.createGain();
	    this.lfoL = new userInstance.LFO({
	        target: this.filtersL,
	        callback: this.callback
	    });
	    this.lfoR = new userInstance.LFO({
	        target: this.filtersR,
	        callback: this.callback
	    });
	
	    var i = this.stage;
	    while (i--) {
	        this.filtersL[i] = userContext.createBiquadFilter();
	        this.filtersR[i] = userContext.createBiquadFilter();
	        this.filtersL[i].type = "allpass";
	        this.filtersR[i].type = "allpass";
	    }
	    this.input.connect(this.splitter);
	    this.input.connect(this.output);
	    this.splitter.connect(this.filtersL[0], 0, 0);
	    this.splitter.connect(this.filtersR[0], 1, 0);
	    this.connectInOrder(this.filtersL);
	    this.connectInOrder(this.filtersR);
	    this.filtersL[this.stage - 1].connect(this.feedbackGainNodeL);
	    this.filtersL[this.stage - 1].connect(this.merger, 0, 0);
	    this.filtersR[this.stage - 1].connect(this.feedbackGainNodeR);
	    this.filtersR[this.stage - 1].connect(this.merger, 0, 1);
	    this.feedbackGainNodeL.connect(this.filtersL[0]);
	    this.feedbackGainNodeR.connect(this.filtersR[0]);
	    this.merger.connect(this.output);
	
	    this.rate = initValue(properties.rate, this.defaults.rate.value);
	    this.baseModulationFrequency = properties.baseModulationFrequency || this.defaults.baseModulationFrequency.value;
	    this.depth = initValue(properties.depth, this.defaults.depth.value);
	    this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
	    this.stereoPhase = initValue(properties.stereoPhase, this.defaults.stereoPhase.value);
	
	    this.lfoL.activate(true);
	    this.lfoR.activate(true);
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.Phaser.prototype = Object.create(Super, {
	    name: {
	        value: "Phaser"
	    },
	    stage: {
	        value: 4
	    },
	    defaults: {
	        writable: true,
	        value: {
	            rate: {
	                value: 0.1,
	                min: 0,
	                max: 8,
	                automatable: false,
	                type: FLOAT
	            },
	            depth: {
	                value: 0.6,
	                min: 0,
	                max: 1,
	                automatable: false,
	                type: FLOAT
	            },
	            feedback: {
	                value: 0.7,
	                min: 0,
	                max: 1,
	                automatable: false,
	                type: FLOAT
	            },
	            stereoPhase: {
	                value: 40,
	                min: 0,
	                max: 180,
	                automatable: false,
	                type: FLOAT
	            },
	            baseModulationFrequency: {
	                value: 700,
	                min: 500,
	                max: 1500,
	                automatable: false,
	                type: FLOAT
	            }
	        }
	    },
	    callback: {
	        value: function value(filters, _value2) {
	            for (var stage = 0; stage < 4; stage++) {
	                filters[stage].frequency.value = _value2;
	            }
	        }
	    },
	    depth: {
	        get: function get() {
	            return this._depth;
	        },
	        set: function set(value) {
	            this._depth = value;
	            this.lfoL.oscillation = this._baseModulationFrequency * this._depth;
	            this.lfoR.oscillation = this._baseModulationFrequency * this._depth;
	        }
	    },
	    rate: {
	        get: function get() {
	            return this._rate;
	        },
	        set: function set(value) {
	            this._rate = value;
	            this.lfoL.frequency = this._rate;
	            this.lfoR.frequency = this._rate;
	        }
	    },
	    baseModulationFrequency: {
	        enumerable: true,
	        get: function get() {
	            return this._baseModulationFrequency;
	        },
	        set: function set(value) {
	            this._baseModulationFrequency = value;
	            this.lfoL.offset = this._baseModulationFrequency;
	            this.lfoR.offset = this._baseModulationFrequency;
	            this._depth = this._depth;
	        }
	    },
	    feedback: {
	        get: function get() {
	            return this._feedback;
	        },
	        set: function set(value) {
	            this._feedback = value;
	            this.feedbackGainNodeL.gain.value = this._feedback;
	            this.feedbackGainNodeR.gain.value = this._feedback;
	        }
	    },
	    stereoPhase: {
	        get: function get() {
	            return this._stereoPhase;
	        },
	        set: function set(value) {
	            this._stereoPhase = value;
	            var newPhase = this.lfoL._phase + this._stereoPhase * Math.PI / 180;
	            newPhase = fmod(newPhase, 2 * Math.PI);
	            this.lfoR._phase = newPhase;
	        }
	    }
	});
	
	Tuna.prototype.PingPongDelay = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.input = userContext.createGain();
	    this.wetLevel = userContext.createGain();
	    this.stereoToMonoMix = userContext.createGain();
	    this.feedbackLevel = userContext.createGain();
	    this.output = userContext.createGain();
	    this.delayLeft = userContext.createDelay();
	    this.delayRight = userContext.createDelay();
	
	    this.activateNode = userContext.createGain();
	    this.splitter = userContext.createChannelSplitter(2);
	    this.merger = userContext.createChannelMerger(2);
	
	    this.activateNode.connect(this.splitter);
	    this.splitter.connect(this.stereoToMonoMix, 0, 0);
	    this.splitter.connect(this.stereoToMonoMix, 1, 0);
	    this.stereoToMonoMix.gain.value = .5;
	    this.stereoToMonoMix.connect(this.wetLevel);
	    this.wetLevel.connect(this.delayLeft);
	    this.feedbackLevel.connect(this.delayLeft);
	    this.delayLeft.connect(this.delayRight);
	    this.delayRight.connect(this.feedbackLevel);
	    this.delayLeft.connect(this.merger, 0, 0);
	    this.delayRight.connect(this.merger, 0, 1);
	    this.merger.connect(this.output);
	    this.activateNode.connect(this.output);
	
	    this.delayTimeLeft = properties.delayTimeLeft !== undefined ? properties.delayTimeLeft : this.defaults.delayTimeLeft.value;
	    this.delayTimeRight = properties.delayTimeRight !== undefined ? properties.delayTimeRight : this.defaults.delayTimeRight.value;
	    this.feedbackLevel.gain.value = properties.feedback !== undefined ? properties.feedback : this.defaults.feedback.value;
	    this.wetLevel.gain.value = properties.wetLevel !== undefined ? properties.wetLevel : this.defaults.wetLevel.value;
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.PingPongDelay.prototype = Object.create(Super, {
	    name: {
	        value: "PingPongDelay"
	    },
	    delayTimeLeft: {
	        enumerable: true,
	        get: function get() {
	            return this._delayTimeLeft;
	        },
	        set: function set(value) {
	            this._delayTimeLeft = value;
	            this.delayLeft.delayTime.value = value / 1000;
	        }
	    },
	    delayTimeRight: {
	        enumerable: true,
	        get: function get() {
	            return this._delayTimeRight;
	        },
	        set: function set(value) {
	            this._delayTimeRight = value;
	            this.delayRight.delayTime.value = value / 1000;
	        }
	    },
	    defaults: {
	        writable: true,
	        value: {
	            delayTimeLeft: {
	                value: 200,
	                min: 1,
	                max: 10000,
	                automatable: false,
	                type: INT
	            },
	            delayTimeRight: {
	                value: 400,
	                min: 1,
	                max: 10000,
	                automatable: false,
	                type: INT
	            },
	            feedback: {
	                value: 0.3,
	                min: 0,
	                max: 1,
	                automatable: false,
	                type: FLOAT
	            },
	            wetLevel: {
	                value: 0.5,
	                min: 0,
	                max: 1,
	                automatable: false,
	                type: FLOAT
	            }
	        }
	    }
	});
	
	Tuna.prototype.Tremolo = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.input = userContext.createGain();
	    this.splitter = this.activateNode = userContext.createChannelSplitter(2), this.amplitudeL = userContext.createGain(), this.amplitudeR = userContext.createGain(), this.merger = userContext.createChannelMerger(2), this.output = userContext.createGain();
	    this.lfoL = new userInstance.LFO({
	        target: this.amplitudeL.gain,
	        callback: pipe
	    });
	    this.lfoR = new userInstance.LFO({
	        target: this.amplitudeR.gain,
	        callback: pipe
	    });
	
	    this.input.connect(this.splitter);
	    this.splitter.connect(this.amplitudeL, 0);
	    this.splitter.connect(this.amplitudeR, 1);
	    this.amplitudeL.connect(this.merger, 0, 0);
	    this.amplitudeR.connect(this.merger, 0, 1);
	    this.merger.connect(this.output);
	
	    this.rate = properties.rate || this.defaults.rate.value;
	    this.intensity = initValue(properties.intensity, this.defaults.intensity.value);
	    this.stereoPhase = initValue(properties.stereoPhase, this.defaults.stereoPhase.value);
	
	    this.lfoL.offset = 1 - this.intensity / 2;
	    this.lfoR.offset = 1 - this.intensity / 2;
	    this.lfoL.phase = this.stereoPhase * Math.PI / 180;
	
	    this.lfoL.activate(true);
	    this.lfoR.activate(true);
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.Tremolo.prototype = Object.create(Super, {
	    name: {
	        value: "Tremolo"
	    },
	    defaults: {
	        writable: true,
	        value: {
	            intensity: {
	                value: 0.3,
	                min: 0,
	                max: 1,
	                automatable: false,
	                type: FLOAT
	            },
	            stereoPhase: {
	                value: 0,
	                min: 0,
	                max: 180,
	                automatable: false,
	                type: FLOAT
	            },
	            rate: {
	                value: 5,
	                min: 0.1,
	                max: 11,
	                automatable: false,
	                type: FLOAT
	            }
	        }
	    },
	    intensity: {
	        enumerable: true,
	        get: function get() {
	            return this._intensity;
	        },
	        set: function set(value) {
	            this._intensity = value;
	            this.lfoL.offset = 1 - this._intensity / 2;
	            this.lfoR.offset = 1 - this._intensity / 2;
	            this.lfoL.oscillation = this._intensity;
	            this.lfoR.oscillation = this._intensity;
	        }
	    },
	    rate: {
	        enumerable: true,
	        get: function get() {
	            return this._rate;
	        },
	        set: function set(value) {
	            this._rate = value;
	            this.lfoL.frequency = this._rate;
	            this.lfoR.frequency = this._rate;
	        }
	    },
	    stereoPhase: {
	        enumerable: true,
	        get: function get() {
	            return this._rate;
	        },
	        set: function set(value) {
	            this._stereoPhase = value;
	            var newPhase = this.lfoL._phase + this._stereoPhase * Math.PI / 180;
	            newPhase = fmod(newPhase, 2 * Math.PI);
	            this.lfoR.phase = newPhase;
	        }
	    }
	});
	
	Tuna.prototype.WahWah = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.input = userContext.createGain();
	    this.activateNode = userContext.createGain();
	    this.envelopeFollower = new userInstance.EnvelopeFollower({
	        target: this,
	        callback: function callback(context, value) {
	            context.sweep = value;
	        }
	    });
	    this.filterBp = userContext.createBiquadFilter();
	    this.filterPeaking = userContext.createBiquadFilter();
	    this.output = userContext.createGain();
	
	    //Connect AudioNodes
	    this.activateNode.connect(this.filterBp);
	    this.filterBp.connect(this.filterPeaking);
	    this.filterPeaking.connect(this.output);
	
	    //Set Properties
	    this.init();
	    this.automode = initValue(properties.enableAutoMode, this.defaults.automode.value);
	    this.resonance = properties.resonance || this.defaults.resonance.value;
	    this.sensitivity = initValue(properties.sensitivity, this.defaults.sensitivity.value);
	    this.baseFrequency = initValue(properties.baseFrequency, this.defaults.baseFrequency.value);
	    this.excursionOctaves = properties.excursionOctaves || this.defaults.excursionOctaves.value;
	    this.sweep = initValue(properties.sweep, this.defaults.sweep.value);
	
	    this.activateNode.gain.value = 2;
	    this.envelopeFollower.activate(true);
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.WahWah.prototype = Object.create(Super, {
	    name: {
	        value: "WahWah"
	    },
	    defaults: {
	        writable: true,
	        value: {
	            automode: {
	                value: true,
	                automatable: false,
	                type: BOOLEAN
	            },
	            baseFrequency: {
	                value: 0.5,
	                min: 0,
	                max: 1,
	                automatable: false,
	                type: FLOAT
	            },
	            excursionOctaves: {
	                value: 2,
	                min: 1,
	                max: 6,
	                automatable: false,
	                type: FLOAT
	            },
	            sweep: {
	                value: 0.2,
	                min: 0,
	                max: 1,
	                automatable: false,
	                type: FLOAT
	            },
	            resonance: {
	                value: 10,
	                min: 1,
	                max: 100,
	                automatable: false,
	                type: FLOAT
	            },
	            sensitivity: {
	                value: 0.5,
	                min: -1,
	                max: 1,
	                automatable: false,
	                type: FLOAT
	            }
	        }
	    },
	    activateCallback: {
	        value: function value(_value3) {
	            this.automode = _value3;
	        }
	    },
	    automode: {
	        get: function get() {
	            return this._automode;
	        },
	        set: function set(value) {
	            this._automode = value;
	            if (value) {
	                this.activateNode.connect(this.envelopeFollower.input);
	                this.envelopeFollower.activate(true);
	            } else {
	                this.envelopeFollower.activate(false);
	                this.activateNode.disconnect();
	                this.activateNode.connect(this.filterBp);
	            }
	        }
	    },
	    filterFreqTimeout: {
	        value: 0
	    },
	    setFilterFreq: {
	        value: function value() {
	            try {
	                this.filterBp.frequency.value = this._baseFrequency + this._excursionFrequency * this._sweep;
	                this.filterPeaking.frequency.value = this._baseFrequency + this._excursionFrequency * this._sweep;
	            } catch (e) {
	                clearTimeout(this.filterFreqTimeout);
	                //put on the next cycle to let all init properties be set
	                this.filterFreqTimeout = setTimeout(function () {
	                    this.setFilterFreq();
	                }.bind(this), 0);
	            }
	        }
	    },
	    sweep: {
	        enumerable: true,
	        get: function get() {
	            return this._sweep.value;
	        },
	        set: function set(value) {
	            this._sweep = Math.pow(value > 1 ? 1 : value < 0 ? 0 : value, this._sensitivity);
	            this.setFilterFreq();
	        }
	    },
	    baseFrequency: {
	        enumerable: true,
	        get: function get() {
	            return this._baseFrequency;
	        },
	        set: function set(value) {
	            this._baseFrequency = 50 * Math.pow(10, value * 2);
	            this._excursionFrequency = Math.min(userContext.sampleRate / 2, this.baseFrequency * Math.pow(2, this._excursionOctaves));
	            this.setFilterFreq();
	        }
	    },
	    excursionOctaves: {
	        enumerable: true,
	        get: function get() {
	            return this._excursionOctaves;
	        },
	        set: function set(value) {
	            this._excursionOctaves = value;
	            this._excursionFrequency = Math.min(userContext.sampleRate / 2, this.baseFrequency * Math.pow(2, this._excursionOctaves));
	            this.setFilterFreq();
	        }
	    },
	    sensitivity: {
	        enumerable: true,
	        get: function get() {
	            return this._sensitivity;
	        },
	        set: function set(value) {
	            this._sensitivity = Math.pow(10, value);
	        }
	    },
	    resonance: {
	        enumerable: true,
	        get: function get() {
	            return this._resonance;
	        },
	        set: function set(value) {
	            this._resonance = value;
	            this.filterPeaking.Q = this._resonance;
	        }
	    },
	    init: {
	        value: function value() {
	            this.output.gain.value = 1;
	            this.filterPeaking.type = "peaking";
	            this.filterBp.type = "bandpass";
	            this.filterPeaking.frequency.value = 100;
	            this.filterPeaking.gain.value = 20;
	            this.filterPeaking.Q.value = 5;
	            this.filterBp.frequency.value = 100;
	            this.filterBp.Q.value = 1;
	        }
	    }
	});
	
	Tuna.prototype.EnvelopeFollower = function (properties) {
	    if (!properties) {
	        properties = this.getDefaults();
	    }
	    this.input = userContext.createGain();
	    this.jsNode = this.output = userContext.createScriptProcessor(this.buffersize, 1, 1);
	
	    this.input.connect(this.output);
	
	    this.attackTime = initValue(properties.attackTime, this.defaults.attackTime.value);
	    this.releaseTime = initValue(properties.releaseTime, this.defaults.releaseTime.value);
	    this._envelope = 0;
	    this.target = properties.target || {};
	    this.callback = properties.callback || function () {};
	};
	Tuna.prototype.EnvelopeFollower.prototype = Object.create(Super, {
	    name: {
	        value: "EnvelopeFollower"
	    },
	    defaults: {
	        value: {
	            attackTime: {
	                value: 0.003,
	                min: 0,
	                max: 0.5,
	                automatable: false,
	                type: FLOAT
	            },
	            releaseTime: {
	                value: 0.5,
	                min: 0,
	                max: 0.5,
	                automatable: false,
	                type: FLOAT
	            }
	        }
	    },
	    buffersize: {
	        value: 256
	    },
	    envelope: {
	        value: 0
	    },
	    sampleRate: {
	        value: 44100
	    },
	    attackTime: {
	        enumerable: true,
	        get: function get() {
	            return this._attackTime;
	        },
	        set: function set(value) {
	            this._attackTime = value;
	            this._attackC = Math.exp(-1 / this._attackTime * this.sampleRate / this.buffersize);
	        }
	    },
	    releaseTime: {
	        enumerable: true,
	        get: function get() {
	            return this._releaseTime;
	        },
	        set: function set(value) {
	            this._releaseTime = value;
	            this._releaseC = Math.exp(-1 / this._releaseTime * this.sampleRate / this.buffersize);
	        }
	    },
	    callback: {
	        get: function get() {
	            return this._callback;
	        },
	        set: function set(value) {
	            if (typeof value === "function") {
	                this._callback = value;
	            } else {
	                console.error("tuna.js: " + this.name + ": Callback must be a function!");
	            }
	        }
	    },
	    target: {
	        get: function get() {
	            return this._target;
	        },
	        set: function set(value) {
	            this._target = value;
	        }
	    },
	    activate: {
	        value: function value(doActivate) {
	            this.activated = doActivate;
	            if (doActivate) {
	                this.jsNode.connect(userContext.destination);
	                this.jsNode.onaudioprocess = this.returnCompute(this);
	            } else {
	                this.jsNode.disconnect();
	                this.jsNode.onaudioprocess = null;
	            }
	        }
	    },
	    returnCompute: {
	        value: function value(instance) {
	            return function (event) {
	                instance.compute(event);
	            };
	        }
	    },
	    compute: {
	        value: function value(event) {
	            var count = event.inputBuffer.getChannelData(0).length,
	                channels = event.inputBuffer.numberOfChannels,
	                current,
	                chan,
	                rms,
	                i;
	            chan = rms = i = 0;
	            if (channels > 1) {
	                //need to mixdown
	                for (i = 0; i < count; ++i) {
	                    for (; chan < channels; ++chan) {
	                        current = event.inputBuffer.getChannelData(chan)[i];
	                        rms += current * current / channels;
	                    }
	                }
	            } else {
	                for (i = 0; i < count; ++i) {
	                    current = event.inputBuffer.getChannelData(0)[i];
	                    rms += current * current;
	                }
	            }
	            rms = Math.sqrt(rms);
	
	            if (this._envelope < rms) {
	                this._envelope *= this._attackC;
	                this._envelope += (1 - this._attackC) * rms;
	            } else {
	                this._envelope *= this._releaseC;
	                this._envelope += (1 - this._releaseC) * rms;
	            }
	            this._callback(this._target, this._envelope);
	        }
	    }
	});
	
	Tuna.prototype.LFO = function (properties) {
	    //Instantiate AudioNode
	    this.output = userContext.createScriptProcessor(256, 1, 1);
	    this.activateNode = userContext.destination;
	
	    //Set Properties
	    this.frequency = initValue(properties.frequency, this.defaults.frequency.value);
	    this.offset = initValue(properties.offset, this.defaults.offset.value);
	    this.oscillation = initValue(properties.oscillation, this.defaults.oscillation.value);
	    this.phase = initValue(properties.phase, this.defaults.phase.value);
	    this.target = properties.target || {};
	    this.output.onaudioprocess = this.callback(properties.callback || function () {});
	    this.bypass = properties.bypass || false;
	};
	Tuna.prototype.LFO.prototype = Object.create(Super, {
	    name: {
	        value: "LFO"
	    },
	    bufferSize: {
	        value: 256
	    },
	    sampleRate: {
	        value: 44100
	    },
	    defaults: {
	        value: {
	            frequency: {
	                value: 1,
	                min: 0,
	                max: 20,
	                automatable: false,
	                type: FLOAT
	            },
	            offset: {
	                value: 0.85,
	                min: 0,
	                max: 22049,
	                automatable: false,
	                type: FLOAT
	            },
	            oscillation: {
	                value: 0.3,
	                min: -22050,
	                max: 22050,
	                automatable: false,
	                type: FLOAT
	            },
	            phase: {
	                value: 0,
	                min: 0,
	                max: 2 * Math.PI,
	                automatable: false,
	                type: FLOAT
	            }
	        }
	    },
	    frequency: {
	        get: function get() {
	            return this._frequency;
	        },
	        set: function set(value) {
	            this._frequency = value;
	            this._phaseInc = 2 * Math.PI * this._frequency * this.bufferSize / this.sampleRate;
	        }
	    },
	    offset: {
	        get: function get() {
	            return this._offset;
	        },
	        set: function set(value) {
	            this._offset = value;
	        }
	    },
	    oscillation: {
	        get: function get() {
	            return this._oscillation;
	        },
	        set: function set(value) {
	            this._oscillation = value;
	        }
	    },
	    phase: {
	        get: function get() {
	            return this._phase;
	        },
	        set: function set(value) {
	            this._phase = value;
	        }
	    },
	    target: {
	        get: function get() {
	            return this._target;
	        },
	        set: function set(value) {
	            this._target = value;
	        }
	    },
	    activate: {
	        value: function value(doActivate) {
	            if (!doActivate) {
	                this.output.disconnect(userContext.destination);
	            } else {
	                this.output.connect(userContext.destination);
	            }
	        }
	    },
	    callback: {
	        value: function value(callback) {
	            var that = this;
	            return function () {
	                that._phase += that._phaseInc;
	                if (that._phase > 2 * Math.PI) {
	                    that._phase = 0;
	                }
	                callback(that._target, that._offset + that._oscillation * Math.sin(that._phase));
	            };
	        }
	    }
	});
	
	Tuna.toString = Tuna.prototype.toString = function () {
	    return "Please visit https://github.com/Theodeus/tuna/wiki for instructions on how to use Tuna.js";
	};
	
	exports.Tuna = Tuna;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map