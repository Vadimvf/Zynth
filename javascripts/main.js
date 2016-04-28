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
	  var keyboard = new _keyboard.Keyboard(keyBoardElement, docEl);
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
	  function Keyboard(domAbleElement, domAbleDoc) {
	    _classCallCheck(this, Keyboard);
	
	    var noteObjs = _createKeys(domAbleElement);
	    // this.keys = domKeys;
	    this.notes = noteObjs;
	    this.el = domAbleElement;
	    this.ctx = domAbleDoc;
	  }
	
	  _createClass(Keyboard, [{
	    key: 'setListeners',
	    value: function setListeners() {
	      var el = this.el;
	      var ctx = this.ctx;
	      el.on('mousedown', 'div', this.playNote);
	      el.on('mouseup', 'div', this.stopNote);
	      ctx.on('keydown', this.playNote.bind(this));
	      ctx.on('keyup', this.stopNote);
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
	      // Keyboard.playNote.call(this, e);
	      console.log(this.notes);
	      debugger;
	      // debugger;
	      // if (e.type === "keydown") _pressRightKey(e);
	      // $d(e.target).addClass("pressed");
	      // _findKey(e);
	      // function _findKey(e){
	      //     if (e.type === "keydown"){
	      //
	      //     }else{
	      //       console.log("playing " + e.target + " " + e.currentTarget);
	      //     }
	      // }
	    }
	  }, {
	    key: 'stopNote',
	    value: function stopNote(e) {
	      // debugger;
	      console.log("stopped");
	      (0, _domAble.$d)(e.target).removeClass("pressed");
	    }
	  }]);
	
	  return Keyboard;
	}();
	
	function _createKeys(domAbleElement) {
	  var noteRange = _note.Note.createNoteRange();
	
	  noteRange.forEach(function (note) {
	    var li = document.createElement("li");
	    var name = note.name;
	    var klass = "key";
	    if (name.includes("s")) klass += " sharp";
	    var key = (0, _domAble.$d)(li).setHTML('<div class="' + klass + '" id=' + name + '></div>');
	
	    domAbleElement.append(key);
	  });
	
	  return noteRange;
	};
	
	function _pressListener(domAbleElement, keyboard) {
	  domAbleElement.on('mousedown', 'li', keyboard.playNote(e));
	  domAbleElement.on('mouseup', 'li', keyboard.stopNote(e));
	}
	
	function _keyListener(domAbleDoc) {
	  domAbleDoc.on('keyup', this.playNote(e));
	  domAbleDoc.on('keydown', this.stopNote(e));
	}
	
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
	    value: function createNoteRange() {
	      var noteRange = arguments.length <= 0 || arguments[0] === undefined ? _constants.OCTAVE.second : arguments[0];
	
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
	
	var _NOTES_HIGH;
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var NOTES_LOW = {
	  65: 'aaC2',
	  87: 'aaC2s',
	  82: 'aaD2',
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
	
	var NOTES_HIGH = (_NOTES_HIGH = {
	  65: 'bC4',
	  87: 'bC4s',
	  84: 'bD4',
	  69: 'bD4s',
	  68: 'bE4',
	  70: 'bF4'
	}, _defineProperty(_NOTES_HIGH, '84', 'bF4s'), _defineProperty(_NOTES_HIGH, 71, 'bG4'), _defineProperty(_NOTES_HIGH, 89, 'bG4s'), _defineProperty(_NOTES_HIGH, 72, 'bH4'), _defineProperty(_NOTES_HIGH, 85, 'bH4s'), _defineProperty(_NOTES_HIGH, 74, 'bI4'), _defineProperty(_NOTES_HIGH, 75, 'cC5'), _defineProperty(_NOTES_HIGH, 79, 'cC5s'), _defineProperty(_NOTES_HIGH, 76, 'cD5'), _defineProperty(_NOTES_HIGH, 80, 'cD5s'), _defineProperty(_NOTES_HIGH, 186, 'cE5'), _NOTES_HIGH);
	
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
	  aaC2: 16.35 * 4,
	  aaC2s: 17.32 * 4,
	  aaD2: 18.35 * 4,
	  aaD2s: 19.45 * 4,
	  aaE2: 20.60 * 4,
	  aaF2: 21.83 * 4,
	  aaF2s: 23.12 * 4,
	  aaG2: 24.50 * 4,
	  aaG2s: 25.96 * 4,
	  aaH2: 27.50 * 4,
	  aaH2s: 29.14 * 4,
	  aaI2: 30.87 * 4,
	  aC3: 16.35 * 8,
	  aC3s: 17.32 * 8,
	  aD3: 18.35 * 8,
	  aD3s: 19.45 * 8,
	  aE3: 20.60 * 8,
	  aF3: 21.83 * 8,
	  aF3s: 23.12 * 8,
	  aG3: 24.50 * 8,
	  aG3s: 25.96 * 8,
	  aH3: 27.50 * 8,
	  aH3s: 29.14 * 8,
	  aI3: 30.87 * 8,
	  bC4: 16.35 * 16,
	  bC4s: 17.32 * 16,
	  bD4: 18.35 * 16,
	  bD4s: 19.45 * 16,
	  bE4: 20.60 * 16,
	  bF4: 21.83 * 16,
	  bF4s: 23.12 * 16,
	  bG4: 24.50 * 16,
	  bG4s: 25.96 * 16,
	  bH4: 27.50 * 16,
	  bH4s: 29.14 * 16,
	  bI4: 30.87 * 16,
	  cC5: 16.35 * 32,
	  cC5s: 17.32 * 32,
	  cD5: 18.35 * 32,
	  cD5s: 19.45 * 32,
	  cE5: 20.60 * 32,
	  F5: 21.83 * 32,
	  F5s: 23.12 * 32,
	  G5: 24.50 * 32,
	  G5s: 25.96 * 32,
	  H5: 27.50 * 32,
	  H5s: 29.14 * 32,
	  I5: 30.87 * 32,
	  C6: 16.35 * 64,
	  C6s: 17.32 * 64,
	  D6: 18.35 * 64,
	  D6s: 19.45 * 64,
	  E6: 20.60 * 64,
	  F6: 21.83 * 64,
	  F6s: 23.12 * 64,
	  G6: 24.50 * 64,
	  G6s: 25.96 * 64,
	  H6: 27.50 * 64,
	  H6s: 29.14 * 64,
	  I6: 30.87 * 64
	};
	
	exports.KEY_MAP = KEY_MAP;
	exports.TONES = TONES;
	exports.OCTAVE = OCTAVE;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map