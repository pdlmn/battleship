/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./factories/gameboard.js":
/*!********************************!*\
  !*** ./factories/gameboard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard),
/* harmony export */   "_createGameboard": () => (/* binding */ _createGameboard)
/* harmony export */ });
/* harmony import */ var _utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/func_helpers */ "./utils/func_helpers.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./factories/ship.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var _WATER = 'w';
var _SHIP = 's';
var _MISSED = 'm';
var _HIT = 'h';

var _createRow = function _createRow() {
  return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.repeat)(function () {
    return _WATER;
  }, 10);
};

var _createGameboard = function _createGameboard() {
  return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.repeat)(_createRow, 10);
};

var _fillRow = function _fillRow(y, xStart, xFinish, value, board) {
  var result = _toConsumableArray(board);

  for (var i = xStart - 1; i < xFinish - 1; i++) {
    result[y - 1][i] = value;
  }

  return result;
};

var _fillColumn = function _fillColumn(yStart, yFinish, x, value, board) {
  var result = _toConsumableArray(board);

  for (var i = yStart - 1; i < yFinish - 1; i++) {
    result[i][x - 1] = value;
  }

  return result;
};

var Gameboard = function Gameboard() {
  var fleet = [];
  var missed = [];
  var hit = [];
  var plane = 'horizontally';

  var board = _createGameboard();

  var _findShip = function _findShip(y, x) {
    return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.find)(function (ship) {
      return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.find)(function (segment) {
        return segment.y === y && segment.x === x;
      }, ship.segments);
    }, fleet);
  };

  var _shipPlacer = {
    horizontally: function horizontally(size, y, x) {
      var shipTail = x + size;
      var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_1__.Ship)(size, y, x, 'horizontally');
      fleet.push(ship);
      board = _fillRow(y, x, shipTail, _SHIP, board);
    },
    vertically: function vertically(size, y, x) {
      var shipTail = y + size;
      var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_1__.Ship)(size, y, x, 'vertically');
      fleet.push(ship);
      board = _fillColumn(y, shipTail, x, _SHIP, board);
    }
  }; //possibly public methods

  var isOccupied = function isOccupied(y, x) {
    return Boolean(_findShip(y, x));
  };

  var isEnoughRoom = function isEnoughRoom(size, y, x) {
    if (plane === 'horizontally' && x + (size - 1) > 10 || plane === 'vertically' && y + (size - 1) > 10) {
      return true;
    }

    return false;
  };

  var _isHorzinotallyAdjacent = function _isHorzinotallyAdjacent(size, y, x) {
    var tail = x + size;
    var i = x;

    while (i < tail) {
      if (_findShip(y + 1, i) || _findShip(y - 1, i)) {
        return true;
      }

      i++;
    }

    return false;
  };

  var isAdjacentToShips = function isAdjacentToShips(size, y, x) {
    if (plane === 'horizontally') {
      return _isHorzinotallyAdjacent(size, y, x);
    }

    if (plane === 'vertically') {
      return;
    }
  };

  var place = function place(size, y, x) {
    if (isOccupied(y, x)) return 'This spot is occupied';
    if (isEnoughRoom(size, y, x, plane)) return 'Ship is too big';
    if (isAdjacentToShips(size, y, x, plane)) return 'Ship is adjacent to other ship';

    _shipPlacer[plane](size, y, x);

    return 'Ship was placed successfully';
  };

  var receiveAttack = function receiveAttack(y, x) {
    var hitShip = _findShip(y, x);

    if (!hitShip) {
      missed.push({
        y: y,
        x: x
      });
      board = _fillRow(y, x, x + 1, _MISSED, board);
      return false;
    }

    (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.findIndex)(function (segment) {
      return segment.y === y && segment.x === x;
    }), hitShip.hit)(hitShip.segments);
    hit.push({
      y: y,
      x: x
    });
    board = _fillRow(y, x, x + 1, _HIT, board);
    return true;
  };

  var isFleetSunk = function isFleetSunk() {
    return fleet.every(function (ship) {
      return ship.isSunk();
    });
  };

  var setPlane = function setPlane(newPlane) {
    plane = newPlane;
  };

  return {
    get board() {
      return board;
    },

    get fleet() {
      return fleet;
    },

    get missed() {
      return missed;
    },

    place: place,
    receiveAttack: receiveAttack,
    isFleetSunk: isFleetSunk,
    setPlane: setPlane
  };
};


/***/ }),

/***/ "./factories/player.js":
/*!*****************************!*\
  !*** ./factories/player.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
var Player = function Player(name, isFirst) {
  var eventName = isFirst ? 'Player one attacked' : 'Player two attacked';
  var turn = isFirst;

  var changeTurn = function changeTurn() {
    turn = !turn;
  };

  var attack = function attack(enemyBoard, y, x) {
    enemyBoard.recieveAttack(y, x);
  };

  return {
    get name() {
      return name;
    },

    get turn() {
      return turn;
    },

    set turn(val) {
      turn = val;
    },

    attack: attack
  };
};



/***/ }),

/***/ "./factories/ship.js":
/*!***************************!*\
  !*** ./factories/ship.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
var _types = {
  2: 'Patrol boat',
  3: 'Destroyer',
  4: 'Battleship',
  5: 'Carrier'
};
var _segmentsCreator = {
  horizontally: function horizontally(size, y, x) {
    var segments = [];

    for (var i = 0; i < size; i++) {
      segments[i] = {
        y: y,
        x: x + i,
        intact: true
      };
    }

    return segments;
  },
  vertically: function vertically(size, y, x) {
    var segments = [];

    for (var i = 0; i < size; i++) {
      segments[i] = {
        y: y + i,
        x: x,
        intact: true
      };
    }

    return segments;
  }
};

var Ship = function Ship(size, y, x, position) {
  var type = _types[size];
  if (type === undefined) throw new Error('Improper ship size');

  var segments = _segmentsCreator[position](size, y, x);

  return {
    get size() {
      return size;
    },

    get type() {
      return type;
    },

    get segments() {
      return segments;
    },

    hit: function hit(segment) {
      segments[segment].intact = false;
    },
    isSunk: function isSunk() {
      return segments.every(function (segment) {
        return segment.intact === false;
      });
    }
  };
};



/***/ }),

/***/ "./logic/event_types.js":
/*!******************************!*\
  !*** ./logic/event_types.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventTypes": () => (/* binding */ eventTypes)
/* harmony export */ });
var eventTypes = Object.freeze({
  GAME_STARTED: 'Game started',
  SHIP_ROTATED: 'Ship rotated',
  PLAYERS_CREATED: 'Players created'
});

/***/ }),

/***/ "./logic/game_handler.js":
/*!*******************************!*\
  !*** ./logic/game_handler.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _event_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event_types */ "./logic/event_types.js");
/* harmony import */ var _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/events_handler */ "./utils/events_handler.js");
/* harmony import */ var _ui_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/menu */ "./ui/menu.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../factories/player */ "./factories/player.js");
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../factories/gameboard */ "./factories/gameboard.js");
/* harmony import */ var _ui_dom_board__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui/dom_board */ "./ui/dom_board.js");







(function menuLogic() {
  var startGame = document.querySelector('#start-game');
  var playerName = document.querySelector('#player-name');
  var rotate = document.querySelector('#rotate');
  var nameInputed = false;
  var allShipsPlaced = false;
  startGame.addEventListener('click', function () {
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_0__.eventTypes.GAME_STARTED, playerName.value);
    _ui_menu__WEBPACK_IMPORTED_MODULE_2__.menuController.disableElement(startGame);
    _ui_menu__WEBPACK_IMPORTED_MODULE_2__.menuController.disableElement(playerName);
  });
  rotate.addEventListener('click', function () {
    if (rotate.dataset.plane === 'vertically') {
      rotate.dataset.plane = 'horizontally';
      rotate.innerText = 'Horizontal';
    } else if (rotate.dataset.plane === 'horizontally') {
      rotate.dataset.plane = 'vertically';
      rotate.innerText = 'Vertical';
    }

    _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_0__.eventTypes.SHIP_ROTATED, rotate.dataset.plane);
  });
})();

(function boardLogic() {
  var playerBoard = document.querySelector('#player-board');
  var computerBoard = document.querySelector('#computer-board');
  playerBoard.addEventListener('mousemove', function (e) {
    if (e.target.classList.contains('cell')) {
      _ui_dom_board__WEBPACK_IMPORTED_MODULE_5__.boardHandler.highlightFutureShip(e.target);
    }
  });
  _ui_dom_board__WEBPACK_IMPORTED_MODULE_5__.boardHandler.renderBoard(false, playerBoard);
  _ui_dom_board__WEBPACK_IMPORTED_MODULE_5__.boardHandler.renderBoard(true, computerBoard);
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_0__.eventTypes.SHIP_ROTATED, function (plane) {
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_5__.boardHandler.setPlane(plane);
  });
})();

/***/ }),

/***/ "./ui/dom_board.js":
/*!*************************!*\
  !*** ./ui/dom_board.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boardHandler": () => (/* binding */ boardHandler)
/* harmony export */ });
/* harmony import */ var _utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/func_helpers */ "./utils/func_helpers.js");


var _createCell = function _createCell(isHidden, y, x) {
  var cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.y = y;
  cell.dataset.x = x;
  if (isHidden) cell.classList.add('fog-of-war');
  return cell;
};

var _shipPlacer = {
  horizontally: function horizontally() {}
};
var boardHandler = function () {
  var shipsToPlace = [5, 4, 3, 2];
  var cells = [];
  var plane = 'horizontally';

  var renderBoard = function renderBoard(isHidden, board) {
    var cell;

    for (var y = 1; y < 11; y++) {
      for (var x = 1; x < 11; x++) {
        cell = _createCell(isHidden, y, x);
        board.append(cell);
        cells.push(cell);
      }
    }
  };

  var clearHighlights = function clearHighlights() {
    return document.querySelectorAll('.cell').forEach(function (el) {
      return el.classList.remove('future-ship', 'wrong-placement');
    });
  };

  var highlightFutureShip = function highlightFutureShip(cell) {
    if (!shipsToPlace[0]) return;
    clearHighlights();
    var nextShip = shipsToPlace[0];
    var y = Number(cell.dataset.y);
    var x = Number(cell.dataset.x);

    if (plane === 'horizontally') {
      var tail = x + nextShip;
      var segments = [];

      for (var i = x; i < tail; i++) {
        segments.push(document.querySelector(":not([data-enemy])[data-y='".concat(y, "'][data-x='").concat(i, "']")));
      }

      if ((0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.hasFalsyValues)(segments)) {
        segments = segments.filter(function (el) {
          return Boolean(el);
        });
        segments.forEach(function (el) {
          return el.classList.add('wrong-placement');
        });
      } else segments.forEach(function (el) {
        return el.classList.add('future-ship');
      });
    }

    if (plane === 'vertically') {
      var _tail = y + nextShip;

      var _segments = [];

      for (var _i = y; _i < _tail; _i++) {
        _segments.push(document.querySelector(":not([data-enemy])[data-y='".concat(_i, "'][data-x='").concat(x, "']")));
      }

      if ((0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.hasFalsyValues)(_segments)) {
        _segments = _segments.filter(function (el) {
          return Boolean(el);
        });

        _segments.forEach(function (el) {
          return el.classList.add('wrong-placement');
        });
      } else _segments.forEach(function (el) {
        return el.classList.add('future-ship');
      });
    }
  };

  var place = function place(size, y, x) {};

  var setPlane = function setPlane(newPlane) {
    plane = newPlane;
  };

  return {
    renderBoard: renderBoard,
    setPlane: setPlane,
    highlightFutureShip: highlightFutureShip
  };
}();

/***/ }),

/***/ "./ui/menu.js":
/*!********************!*\
  !*** ./ui/menu.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menuController": () => (/* binding */ menuController)
/* harmony export */ });
var menuController = function () {
  var canStart = false;

  var disableElement = function disableElement(el) {
    el.disabled = true;
  };

  var enableElement = function enableElement(el) {
    el.disabled = false;
  };

  var setStart = function setStart(val) {
    canStart = val;
  };

  return {
    disableElement: disableElement,
    enableElement: enableElement,
    setStart: setStart
  };
}();

/***/ }),

/***/ "./utils/events_handler.js":
/*!*********************************!*\
  !*** ./utils/events_handler.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventsHandler": () => (/* binding */ eventsHandler)
/* harmony export */ });
var eventsHandler = function () {
  var events = {};
  return {
    on: function on(eventName, fn) {
      events[eventName] = events[eventName] || [];
      events[eventName].push(fn);
    },
    off: function off(eventName, removedFn) {
      if (events[eventName]) {
        events[eventName] = events[eventName].filter(function (fn) {
          return fn !== removedFn;
        });
      }
    },
    trigger: function trigger(eventName, data) {
      if (events[eventName]) {
        events[eventName].forEach(function (fn) {
          return fn(data);
        });
      }
    }
  };
}();

/***/ }),

/***/ "./utils/func_helpers.js":
/*!*******************************!*\
  !*** ./utils/func_helpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasTruthyValues": () => (/* binding */ hasTruthyValues),
/* harmony export */   "replaceEveryNth": () => (/* binding */ replaceEveryNth),
/* harmony export */   "replaceAt": () => (/* binding */ replaceAt),
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "curry": () => (/* binding */ curry),
/* harmony export */   "decrement": () => (/* binding */ decrement),
/* harmony export */   "repeat": () => (/* binding */ repeat),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "forEach": () => (/* binding */ forEach),
/* harmony export */   "hasFalsyValues": () => (/* binding */ hasFalsyValues)
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var curry = function curry(fn) {
  return function curried() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (fn.length !== args.length) {
      return curried.bind.apply(curried, [null].concat(args));
    }

    return fn.apply(void 0, args);
  };
};

var checkTruthiness = function checkTruthiness(el) {
  return Boolean(el);
};

var checkFalsiness = function checkFalsiness(el) {
  return !el;
};

var hasTruthyValues = function hasTruthyValues(arr) {
  return arr.some(checkTruthiness);
};

var hasFalsyValues = function hasFalsyValues(arr) {
  return arr.some(checkFalsiness);
};

var replaceEveryNth = curry(function (nth, start, until, value, arr) {
  var result = _toConsumableArray(arr);

  var s = typeof start === 'number' ? start : nth - 1;
  var len = until || arr.length;

  for (var i = s; i < len; i += nth) {
    result[i] = value;
  }

  return result;
});
var replaceAt = curry(function (index, value, arr) {
  var result = _toConsumableArray(arr);

  result[index] = value;
  return result;
});
var map = curry(function (fn, functor) {
  var result;

  switch (Object.prototype.toString.call(functor)) {
    case '[object Array]':
      result = [];

      var _iterator = _createForOfIteratorHelper(functor),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          result.push(fn(item));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return result;

    case '[object Object]':
      result = {};

      for (var _i = 0, _Object$keys = Object.keys(functor); _i < _Object$keys.length; _i++) {
        var prop = _Object$keys[_i];
        result[prop] = fn(functor[prop]);
      }

      return result;
  }
});

var pipe = function pipe() {
  for (var _len2 = arguments.length, functions = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    functions[_key2] = arguments[_key2];
  }

  return function (value) {
    return functions.reduce(function (acc, fn) {
      return fn(acc);
    }, value);
  };
};

var decrement = map(function (n) {
  return n - 1;
});
var repeat = curry(function (fn, num) {
  var result = [];
  var i = 0;

  while (i < num) {
    result[i] = fn(i);
    i++;
  }

  return result;
});
var find = curry(function (fn, arr) {
  var len = arr.length;
  var i = 0;

  while (i < len) {
    if (fn(arr[i])) {
      return arr[i];
    }

    i++;
  }
});
var findIndex = curry(function (fn, arr) {
  var len = arr.length;
  var i = 0;

  while (i < len) {
    if (fn(arr[i])) {
      return i;
    }

    i++;
  }
});
var forEach = curry(function (fn, arr) {
  var len = arr.length;
  var i = 0;

  while (i < len) {
    fn(arr[i]);
    i++;
  }

  return arr;
});


/***/ }),

/***/ "./styles/style.css":
/*!**************************!*\
  !*** ./styles/style.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.css */ "./styles/style.css");
/* harmony import */ var _factories_ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/ship */ "./factories/ship.js");
/* harmony import */ var _ui_dom_board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/dom_board */ "./ui/dom_board.js");
/* harmony import */ var _logic_game_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logic/game_handler */ "./logic/game_handler.js");




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPQSxDQUFQO0FBQ0Q7O0FBQ0RBLElBQUFBLENBQUM7QUFDRjtBQUNGLENBVHNCLENBQXZCO0FBV0EsSUFBTThGLE9BQU8sR0FBR2UsS0FBSyxDQUFDLFVBQUNKLEVBQUQsRUFBS1ksR0FBTCxFQUFhO0FBQ2pDLE1BQU1PLEdBQUcsR0FBR1AsR0FBRyxDQUFDTCxNQUFoQjtBQUNBLE1BQUloSCxDQUFDLEdBQUcsQ0FBUjs7QUFDQSxTQUFPQSxDQUFDLEdBQUc0SCxHQUFYLEVBQWdCO0FBQ2RuQixJQUFBQSxFQUFFLENBQUNZLEdBQUcsQ0FBQ3JILENBQUQsQ0FBSixDQUFGO0FBQ0FBLElBQUFBLENBQUM7QUFDRjs7QUFDRCxTQUFPcUgsR0FBUDtBQUNELENBUm9CLENBQXJCOzs7Ozs7Ozs7Ozs7QUN4RkE7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovLy8uL2xvZ2ljL2V2ZW50X3R5cGVzLmpzIiwid2VicGFjazovLy8uL2xvZ2ljL2dhbWVfaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi91aS9kb21fYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vdWkvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9ldmVudHNfaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9mdW5jX2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL3N0eWxlLmNzcz9kZjA2Iiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlcGVhdCwgZmluZCwgZmluZEluZGV4LCBwaXBlIH0gZnJvbSAnLi4vdXRpbHMvZnVuY19oZWxwZXJzJ1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCdcblxuY29uc3QgX1dBVEVSID0gJ3cnXG5jb25zdCBfU0hJUCA9ICdzJ1xuY29uc3QgX01JU1NFRCA9ICdtJ1xuY29uc3QgX0hJVCA9ICdoJ1xuXG5jb25zdCBfY3JlYXRlUm93ID0gKCkgPT4gcmVwZWF0KCgpID0+IF9XQVRFUiwgMTApXG5jb25zdCBfY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4gcmVwZWF0KF9jcmVhdGVSb3csIDEwKVxuXG5jb25zdCBfZmlsbFJvdyA9ICh5LCB4U3RhcnQsIHhGaW5pc2gsIHZhbHVlLCBib2FyZCkgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbLi4uYm9hcmRdXG4gIGZvciAobGV0IGkgPSB4U3RhcnQgLSAxOyBpIDwgeEZpbmlzaCAtIDE7IGkrKykge1xuICAgIHJlc3VsdFt5IC0gMV1baV0gPSB2YWx1ZVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QgX2ZpbGxDb2x1bW4gPSAoeVN0YXJ0LCB5RmluaXNoLCB4LCB2YWx1ZSwgYm9hcmQpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gWy4uLmJvYXJkXVxuICBmb3IgKGxldCBpID0geVN0YXJ0IC0gMTsgaSA8IHlGaW5pc2ggLSAxOyBpKyspIHtcbiAgICByZXN1bHRbaV1beCAtIDFdID0gdmFsdWVcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBjb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGZsZWV0ID0gW11cbiAgY29uc3QgbWlzc2VkID0gW11cbiAgY29uc3QgaGl0ID0gW11cbiAgbGV0IHBsYW5lID0gJ2hvcml6b250YWxseSdcbiAgbGV0IGJvYXJkID0gX2NyZWF0ZUdhbWVib2FyZCgpXG5cbiAgY29uc3QgX2ZpbmRTaGlwID0gKHksIHgpID0+IFxuICAgIGZpbmQoKHNoaXApID0+IFxuICAgICAgZmluZCgoc2VnbWVudCkgPT4gc2VnbWVudC55ID09PSB5ICYmIHNlZ21lbnQueCA9PT0geCwgc2hpcC5zZWdtZW50cylcbiAgICAgICwgZmxlZXQpXG5cbiAgY29uc3QgX3NoaXBQbGFjZXIgPSB7XG4gICAgaG9yaXpvbnRhbGx5IChzaXplLCB5LCB4KSB7XG4gICAgICBjb25zdCBzaGlwVGFpbCA9IHggKyBzaXplXG4gICAgICBjb25zdCBzaGlwID0gU2hpcChzaXplLCB5LCB4LCAnaG9yaXpvbnRhbGx5JylcbiAgICAgIGZsZWV0LnB1c2goc2hpcClcbiAgICAgIGJvYXJkID0gX2ZpbGxSb3coeSwgeCwgc2hpcFRhaWwsIF9TSElQLCBib2FyZClcbiAgICB9LFxuXG4gICAgdmVydGljYWxseSAoc2l6ZSwgeSwgeCkge1xuICAgICAgY29uc3Qgc2hpcFRhaWwgPSB5ICsgc2l6ZVxuICAgICAgY29uc3Qgc2hpcCA9IFNoaXAoc2l6ZSwgeSwgeCwgJ3ZlcnRpY2FsbHknKVxuICAgICAgZmxlZXQucHVzaChzaGlwKVxuICAgICAgYm9hcmQgPSBfZmlsbENvbHVtbih5LCBzaGlwVGFpbCwgeCwgX1NISVAsIGJvYXJkKVxuICAgIH1cbiAgfVxuXG4gIC8vcG9zc2libHkgcHVibGljIG1ldGhvZHNcbiAgY29uc3QgaXNPY2N1cGllZCA9ICh5LCB4KSA9PiBCb29sZWFuKF9maW5kU2hpcCh5LCB4KSlcblxuICBjb25zdCBpc0Vub3VnaFJvb20gPSAoc2l6ZSwgeSwgeCkgPT4ge1xuICAgIGlmIChwbGFuZSA9PT0gJ2hvcml6b250YWxseScgJiYgeCArIChzaXplIC0gMSkgPiAxMCB8fFxuICAgICAgICBwbGFuZSA9PT0gJ3ZlcnRpY2FsbHknICYmIHkgKyAoc2l6ZSAtIDEpID4gMTApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIFxuICBjb25zdCBfaXNIb3J6aW5vdGFsbHlBZGphY2VudCA9IChzaXplLCB5LCB4KSA9PiB7XG4gICAgbGV0IHRhaWwgPSB4ICsgc2l6ZVxuICAgIGxldCBpID0geFxuICAgIHdoaWxlIChpIDwgdGFpbCkge1xuICAgICAgaWYgKF9maW5kU2hpcCh5ICsgMSwgaSkgfHwgX2ZpbmRTaGlwKHkgLSAxLCBpKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgaSsrXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgaXNBZGphY2VudFRvU2hpcHMgPSAoc2l6ZSwgeSwgeCkgPT4ge1xuICAgIGlmIChwbGFuZSA9PT0gJ2hvcml6b250YWxseScpIHtcbiAgICAgIHJldHVybiBfaXNIb3J6aW5vdGFsbHlBZGphY2VudChzaXplLCB5LCB4KVxuICAgIH1cbiAgICBpZiAocGxhbmUgPT09ICd2ZXJ0aWNhbGx5Jykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxhY2UgPSAoc2l6ZSwgeSwgeCkgPT4ge1xuICAgIGlmIChpc09jY3VwaWVkKHksIHgpKSByZXR1cm4gJ1RoaXMgc3BvdCBpcyBvY2N1cGllZCdcbiAgICBpZiAoaXNFbm91Z2hSb29tKHNpemUsIHksIHgsIHBsYW5lKSkgcmV0dXJuICdTaGlwIGlzIHRvbyBiaWcnXG4gICAgaWYgKGlzQWRqYWNlbnRUb1NoaXBzKHNpemUsIHksIHgsIHBsYW5lKSkgcmV0dXJuICdTaGlwIGlzIGFkamFjZW50IHRvIG90aGVyIHNoaXAnXG5cbiAgICBfc2hpcFBsYWNlcltwbGFuZV0oc2l6ZSwgeSwgeClcbiAgICByZXR1cm4gJ1NoaXAgd2FzIHBsYWNlZCBzdWNjZXNzZnVsbHknXG4gIH1cblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHksIHgpID0+IHtcbiAgICBjb25zdCBoaXRTaGlwID0gX2ZpbmRTaGlwKHksIHgpXG4gICAgaWYgKCFoaXRTaGlwKSB7XG4gICAgICBtaXNzZWQucHVzaCh7IHksIHggfSlcbiAgICAgIGJvYXJkID0gX2ZpbGxSb3coeSwgeCwgKHggKyAxKSwgX01JU1NFRCwgYm9hcmQpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcGlwZShcbiAgICAgIGZpbmRJbmRleChzZWdtZW50ID0+IHNlZ21lbnQueSA9PT0geSAmJiBzZWdtZW50LnggPT09IHgpLFxuICAgICAgaGl0U2hpcC5oaXRcbiAgICApKGhpdFNoaXAuc2VnbWVudHMpXG4gICAgaGl0LnB1c2goeyB5LCB4IH0pXG4gICAgYm9hcmQgPSBfZmlsbFJvdyh5LCB4LCAoeCArIDEpLCBfSElULCBib2FyZClcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgY29uc3QgaXNGbGVldFN1bmsgPSAoKSA9PiBmbGVldC5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSlcblxuICBjb25zdCBzZXRQbGFuZSA9IChuZXdQbGFuZSkgPT4geyBwbGFuZSA9IG5ld1BsYW5lIH1cblxuICByZXR1cm4ge1xuICAgIGdldCBib2FyZCAoKSB7IHJldHVybiBib2FyZCB9LFxuICAgIGdldCBmbGVldCAoKSB7IHJldHVybiBmbGVldCB9LFxuICAgIGdldCBtaXNzZWQgKCkgeyByZXR1cm4gbWlzc2VkIH0sXG4gICAgcGxhY2UsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBpc0ZsZWV0U3VuayxcbiAgICBzZXRQbGFuZSxcbiAgfVxufVxuXG5leHBvcnQgeyBfY3JlYXRlR2FtZWJvYXJkIH1cbiIsImNvbnN0IFBsYXllciA9IChuYW1lLCBpc0ZpcnN0KSA9PiB7XG4gIGNvbnN0IGV2ZW50TmFtZSA9IChpc0ZpcnN0KSA/ICdQbGF5ZXIgb25lIGF0dGFja2VkJyA6ICdQbGF5ZXIgdHdvIGF0dGFja2VkJ1xuICBsZXQgdHVybiA9IGlzRmlyc3RcblxuICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4geyB0dXJuID0gIXR1cm4gfVxuXG4gIGNvbnN0IGF0dGFjayA9IChlbmVteUJvYXJkLCB5LCB4KSA9PiB7IGVuZW15Qm9hcmQucmVjaWV2ZUF0dGFjayh5LCB4KSB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXQgbmFtZSAoKSB7IHJldHVybiBuYW1lIH0sXG4gICAgZ2V0IHR1cm4gKCkgeyByZXR1cm4gdHVybiB9LFxuICAgIHNldCB0dXJuICh2YWwpIHsgdHVybiA9IHZhbCB9LFxuICAgIGF0dGFja1xuICB9XG59XG5cbmV4cG9ydCB7IFBsYXllciB9XG4iLCJjb25zdCBfdHlwZXMgPSB7XG4gIDI6ICdQYXRyb2wgYm9hdCcsXG4gIDM6ICdEZXN0cm95ZXInLFxuICA0OiAnQmF0dGxlc2hpcCcsXG4gIDU6ICdDYXJyaWVyJ1xufVxuXG5jb25zdCBfc2VnbWVudHNDcmVhdG9yID0ge1xuICBob3Jpem9udGFsbHkgKHNpemUsIHksIHgpIHtcbiAgICBjb25zdCBzZWdtZW50cyA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIHNlZ21lbnRzW2ldID0geyB5LCB4OiAoeCArIGkpLCBpbnRhY3Q6IHRydWUgfVxuICAgIH1cbiAgICByZXR1cm4gc2VnbWVudHNcbiAgfSxcbiAgdmVydGljYWxseSAoc2l6ZSwgeSwgeCkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgc2VnbWVudHNbaV0gPSB7IHk6ICh5ICsgaSksIHgsIGludGFjdDogdHJ1ZSB9XG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50c1xuICB9XG59XG5cbmNvbnN0IFNoaXAgPSAoc2l6ZSwgeSwgeCwgcG9zaXRpb24pID0+IHtcbiAgY29uc3QgdHlwZSA9IF90eXBlc1tzaXplXVxuICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoJ0ltcHJvcGVyIHNoaXAgc2l6ZScpXG5cbiAgY29uc3Qgc2VnbWVudHMgPSBfc2VnbWVudHNDcmVhdG9yW3Bvc2l0aW9uXShzaXplLCB5LCB4KVxuXG4gIHJldHVybiB7XG4gICAgZ2V0IHNpemUgKCkgeyByZXR1cm4gc2l6ZSB9LFxuICAgIGdldCB0eXBlICgpIHsgcmV0dXJuIHR5cGUgfSxcbiAgICBnZXQgc2VnbWVudHMgKCkgeyByZXR1cm4gc2VnbWVudHMgfSxcbiAgICBoaXQgKHNlZ21lbnQpIHsgc2VnbWVudHNbc2VnbWVudF0uaW50YWN0ID0gZmFsc2UgfSxcbiAgICBpc1N1bmsgKCkgeyByZXR1cm4gc2VnbWVudHMuZXZlcnkoKHNlZ21lbnQpID0+IHNlZ21lbnQuaW50YWN0ID09PSBmYWxzZSkgfVxuICB9XG59XG5cbmV4cG9ydCB7IFNoaXAgfVxuIiwiZXhwb3J0IGNvbnN0IGV2ZW50VHlwZXMgPSBPYmplY3QuZnJlZXplKHtcbiAgR0FNRV9TVEFSVEVEOiAnR2FtZSBzdGFydGVkJyxcbiAgU0hJUF9ST1RBVEVEOiAnU2hpcCByb3RhdGVkJyxcbiAgUExBWUVSU19DUkVBVEVEOiAnUGxheWVycyBjcmVhdGVkJyxcbn0pXG4iLCJpbXBvcnQgeyBldmVudFR5cGVzIH0gZnJvbSAnLi9ldmVudF90eXBlcydcbmltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tICcuLi91dGlscy9ldmVudHNfaGFuZGxlcidcbmltcG9ydCB7IG1lbnVDb250cm9sbGVyIH0gZnJvbSAnLi4vdWkvbWVudSdcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4uL2ZhY3Rvcmllcy9wbGF5ZXInXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuLi9mYWN0b3JpZXMvZ2FtZWJvYXJkJ1xuaW1wb3J0IHsgYm9hcmRIYW5kbGVyIH0gZnJvbSAnLi4vdWkvZG9tX2JvYXJkJ1xuXG47KGZ1bmN0aW9uIG1lbnVMb2dpYygpIHtcbiAgY29uc3Qgc3RhcnRHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0LWdhbWUnKSBcbiAgY29uc3QgcGxheWVyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItbmFtZScpXG4gIGNvbnN0IHJvdGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyb3RhdGUnKVxuICBsZXQgbmFtZUlucHV0ZWQgPSBmYWxzZVxuICBsZXQgYWxsU2hpcHNQbGFjZWQgPSBmYWxzZVxuXG4gIHN0YXJ0R2FtZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRUeXBlcy5HQU1FX1NUQVJURUQsIHBsYXllck5hbWUudmFsdWUpXG4gICAgbWVudUNvbnRyb2xsZXIuZGlzYWJsZUVsZW1lbnQoc3RhcnRHYW1lKVxuICAgIG1lbnVDb250cm9sbGVyLmRpc2FibGVFbGVtZW50KHBsYXllck5hbWUpXG4gIH0pXG5cbiAgcm90YXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChyb3RhdGUuZGF0YXNldC5wbGFuZSA9PT0gJ3ZlcnRpY2FsbHknKSB7XG4gICAgICByb3RhdGUuZGF0YXNldC5wbGFuZSA9ICdob3Jpem9udGFsbHknXG4gICAgICByb3RhdGUuaW5uZXJUZXh0ID0gJ0hvcml6b250YWwnXG4gICAgfVxuICAgIGVsc2UgaWYgKHJvdGF0ZS5kYXRhc2V0LnBsYW5lID09PSAnaG9yaXpvbnRhbGx5Jykge1xuICAgICAgcm90YXRlLmRhdGFzZXQucGxhbmUgPSAndmVydGljYWxseSdcbiAgICAgIHJvdGF0ZS5pbm5lclRleHQgPSAnVmVydGljYWwnXG4gICAgfVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudFR5cGVzLlNISVBfUk9UQVRFRCwgcm90YXRlLmRhdGFzZXQucGxhbmUpXG4gIH0pXG59KSgpXG5cbjsoZnVuY3Rpb24gYm9hcmRMb2dpYygpIHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWJvYXJkJylcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlci1ib2FyZCcpIFxuXG4gIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICBib2FyZEhhbmRsZXIuaGlnaGxpZ2h0RnV0dXJlU2hpcChlLnRhcmdldClcbiAgICB9XG4gIH0pXG5cbiAgYm9hcmRIYW5kbGVyLnJlbmRlckJvYXJkKGZhbHNlLCBwbGF5ZXJCb2FyZClcbiAgYm9hcmRIYW5kbGVyLnJlbmRlckJvYXJkKHRydWUsIGNvbXB1dGVyQm9hcmQpXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudFR5cGVzLlNISVBfUk9UQVRFRCwgKHBsYW5lKSA9PiB7XG4gICAgYm9hcmRIYW5kbGVyLnNldFBsYW5lKHBsYW5lKVxuICB9KVxufSkoKVxuXG4iLCJpbXBvcnQgeyBoYXNGYWxzeVZhbHVlcywgcGlwZSwgcmVwZWF0IH0gZnJvbSAnLi4vdXRpbHMvZnVuY19oZWxwZXJzJ1xuXG5jb25zdCBfY3JlYXRlQ2VsbCA9IChpc0hpZGRlbiwgeSwgeCkgPT4ge1xuICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJylcbiAgY2VsbC5kYXRhc2V0LnkgPSB5XG4gIGNlbGwuZGF0YXNldC54ID0geFxuICBpZiAoaXNIaWRkZW4pIGNlbGwuY2xhc3NMaXN0LmFkZCgnZm9nLW9mLXdhcicpXG4gIHJldHVybiBjZWxsXG59XG5cbmNvbnN0IF9zaGlwUGxhY2VyID0ge1xuICBob3Jpem9udGFsbHkgKCkge31cbn1cblxuZXhwb3J0IGNvbnN0IGJvYXJkSGFuZGxlciA9ICgoKSA9PiB7XG4gIGNvbnN0IHNoaXBzVG9QbGFjZSA9IFs1LCA0LCAzLCAyXVxuICBjb25zdCBjZWxscyA9IFtdXG4gIGxldCBwbGFuZSA9ICdob3Jpem9udGFsbHknXG5cbiAgY29uc3QgcmVuZGVyQm9hcmQgPSAoaXNIaWRkZW4sIGJvYXJkKSA9PiB7XG4gICAgbGV0IGNlbGxcbiAgICBmb3IgKGxldCB5ID0gMTsgeSA8IDExOyB5KyspIHtcbiAgICAgIGZvciAobGV0IHggPSAxOyB4IDwgMTE7IHgrKykge1xuICAgICAgICBjZWxsID0gX2NyZWF0ZUNlbGwoaXNIaWRkZW4sIHksIHgpXG4gICAgICAgIGJvYXJkLmFwcGVuZChjZWxsKVxuICAgICAgICBjZWxscy5wdXNoKGNlbGwpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY2xlYXJIaWdobGlnaHRzID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKVxuICAgIC5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnZnV0dXJlLXNoaXAnLCAnd3JvbmctcGxhY2VtZW50JykpXG5cbiAgY29uc3QgaGlnaGxpZ2h0RnV0dXJlU2hpcCA9IChjZWxsKSA9PiB7XG4gICAgaWYgKCFzaGlwc1RvUGxhY2VbMF0pIHJldHVyblxuICAgIGNsZWFySGlnaGxpZ2h0cygpXG4gICAgY29uc3QgbmV4dFNoaXAgPSBzaGlwc1RvUGxhY2VbMF1cbiAgICBjb25zdCB5ID0gTnVtYmVyKGNlbGwuZGF0YXNldC55KVxuICAgIGNvbnN0IHggPSBOdW1iZXIoY2VsbC5kYXRhc2V0LngpXG4gICAgaWYgKHBsYW5lID09PSAnaG9yaXpvbnRhbGx5Jykge1xuICAgICAgY29uc3QgdGFpbCA9IHggKyBuZXh0U2hpcFxuICAgICAgbGV0IHNlZ21lbnRzID0gW11cbiAgICAgIGZvciAobGV0IGkgPSB4OyBpIDwgdGFpbDsgaSsrKSB7XG4gICAgICAgIHNlZ21lbnRzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgOm5vdChbZGF0YS1lbmVteV0pW2RhdGEteT0nJHt5fSddW2RhdGEteD0nJHtpfSddYCkpXG4gICAgICB9XG4gICAgICBpZiAoaGFzRmFsc3lWYWx1ZXMoc2VnbWVudHMpKSB7XG4gICAgICAgIHNlZ21lbnRzID0gc2VnbWVudHMuZmlsdGVyKChlbCkgPT4gQm9vbGVhbihlbCkpXG4gICAgICAgIHNlZ21lbnRzLmZvckVhY2goKGVsKSA9PiBlbC5jbGFzc0xpc3QuYWRkKCd3cm9uZy1wbGFjZW1lbnQnKSlcbiAgICAgIH0gZWxzZSBzZWdtZW50cy5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LmFkZCgnZnV0dXJlLXNoaXAnKSlcbiAgICB9XG4gICAgaWYgKHBsYW5lID09PSAndmVydGljYWxseScpIHtcbiAgICAgIGNvbnN0IHRhaWwgPSB5ICsgbmV4dFNoaXBcbiAgICAgIGxldCBzZWdtZW50cyA9IFtdXG4gICAgICBmb3IgKGxldCBpID0geTsgaSA8IHRhaWw7IGkrKykge1xuICAgICAgICBzZWdtZW50cy5wdXNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYDpub3QoW2RhdGEtZW5lbXldKVtkYXRhLXk9JyR7aX0nXVtkYXRhLXg9JyR7eH0nXWApKVxuICAgICAgfVxuICAgICAgaWYgKGhhc0ZhbHN5VmFsdWVzKHNlZ21lbnRzKSkge1xuICAgICAgICBzZWdtZW50cyA9IHNlZ21lbnRzLmZpbHRlcigoZWwpID0+IEJvb2xlYW4oZWwpKVxuICAgICAgICBzZWdtZW50cy5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LmFkZCgnd3JvbmctcGxhY2VtZW50JykpXG4gICAgICB9IGVsc2Ugc2VnbWVudHMuZm9yRWFjaCgoZWwpID0+IGVsLmNsYXNzTGlzdC5hZGQoJ2Z1dHVyZS1zaGlwJykpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxhY2UgPSAoc2l6ZSwgeSwgeCkgPT4ge31cblxuICBjb25zdCBzZXRQbGFuZSA9IChuZXdQbGFuZSkgPT4geyBwbGFuZSA9IG5ld1BsYW5lIH1cblxuICByZXR1cm4ge1xuICAgIHJlbmRlckJvYXJkLFxuICAgIHNldFBsYW5lLFxuICAgIGhpZ2hsaWdodEZ1dHVyZVNoaXBcbiAgfVxufSkoKVxuIiwiZXhwb3J0IGNvbnN0IG1lbnVDb250cm9sbGVyID0gKCgpID0+IHtcbiAgbGV0IGNhblN0YXJ0ID0gZmFsc2VcblxuICBjb25zdCBkaXNhYmxlRWxlbWVudCA9IChlbCkgPT4geyBlbC5kaXNhYmxlZCA9IHRydWUgfVxuICBjb25zdCBlbmFibGVFbGVtZW50ID0gKGVsKSA9PiB7IGVsLmRpc2FibGVkID0gZmFsc2UgfVxuXG4gIGNvbnN0IHNldFN0YXJ0ID0gKHZhbCkgPT4geyBjYW5TdGFydCA9IHZhbCB9XG5cbiAgcmV0dXJuIHtcbiAgICBkaXNhYmxlRWxlbWVudCxcbiAgICBlbmFibGVFbGVtZW50LFxuICAgIHNldFN0YXJ0XG4gIH1cbn0pKClcbiIsImV4cG9ydCBjb25zdCBldmVudHNIYW5kbGVyID0gKCgpID0+IHtcbiAgY29uc3QgZXZlbnRzID0ge31cblxuICByZXR1cm4ge1xuICAgIG9uIChldmVudE5hbWUsIGZuKSB7XG4gICAgICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdIHx8IFtdXG4gICAgICBldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKVxuICAgIH0sXG5cbiAgICBvZmYgKGV2ZW50TmFtZSwgcmVtb3ZlZEZuKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoKGZuKSA9PiBmbiAhPT0gcmVtb3ZlZEZuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0cmlnZ2VyIChldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4gZm4oZGF0YSkpXG4gICAgICB9XG4gICAgfVxuICB9XG59KSgpXG4iLCJjb25zdCBjdXJyeSA9IChmbikgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gY3VycmllZCAoLi4uYXJncykge1xuICAgIGlmIChmbi5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY3VycmllZC5iaW5kKG51bGwsIC4uLmFyZ3MpXG4gICAgfVxuICAgIHJldHVybiBmbiguLi5hcmdzKVxuICB9XG59XG5cbmNvbnN0IGNoZWNrVHJ1dGhpbmVzcyA9IChlbCkgPT4gQm9vbGVhbihlbClcblxuY29uc3QgY2hlY2tGYWxzaW5lc3MgPSAoZWwpID0+ICFlbFxuXG5jb25zdCBoYXNUcnV0aHlWYWx1ZXMgPSAoYXJyKSA9PiBhcnIuc29tZShjaGVja1RydXRoaW5lc3MpXG5cbmNvbnN0IGhhc0ZhbHN5VmFsdWVzID0gKGFycikgPT4gYXJyLnNvbWUoY2hlY2tGYWxzaW5lc3MpXG5cbmNvbnN0IHJlcGxhY2VFdmVyeU50aCA9IGN1cnJ5KChudGgsIHN0YXJ0LCB1bnRpbCwgdmFsdWUsIGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbLi4uYXJyXVxuICBjb25zdCBzID0gKHR5cGVvZiBzdGFydCA9PT0gJ251bWJlcicpID8gc3RhcnQgOiBudGggLSAxXG4gIGNvbnN0IGxlbiA9IHVudGlsIHx8IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IHM7IGkgPCBsZW47IGkgKz0gbnRoKSB7XG4gICAgcmVzdWx0W2ldID0gdmFsdWVcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCByZXBsYWNlQXQgPSBjdXJyeSgoaW5kZXgsIHZhbHVlLCBhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gWy4uLmFycl1cbiAgcmVzdWx0W2luZGV4XSA9IHZhbHVlXG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IG1hcCA9IGN1cnJ5KChmbiwgZnVuY3RvcikgPT4ge1xuICBsZXQgcmVzdWx0XG4gIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0b3IpKSB7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOlxuICAgICAgcmVzdWx0ID0gW11cbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBmdW5jdG9yKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGZuKGl0ZW0pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG4gICAgICByZXN1bHQgPSB7fVxuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKGZ1bmN0b3IpKSB7XG4gICAgICAgIHJlc3VsdFtwcm9wXSA9IGZuKGZ1bmN0b3JbcHJvcF0pXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn0pXG5cbmNvbnN0IHBpcGUgPSAoLi4uZnVuY3Rpb25zKSA9PlxuICAodmFsdWUpID0+IGZ1bmN0aW9ucy5yZWR1Y2UoKGFjYywgZm4pID0+IGZuKGFjYyksIHZhbHVlKVxuXG5jb25zdCBkZWNyZW1lbnQgPSBtYXAoKG4pID0+IG4gLSAxKVxuXG5jb25zdCByZXBlYXQgPSBjdXJyeSgoZm4sIG51bSkgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBudW0pIHtcbiAgICByZXN1bHRbaV0gPSBmbihpKVxuICAgIGkrK1xuICB9XG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IGZpbmQgPSBjdXJyeSgoZm4sIGFycikgPT4ge1xuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIGlmIChmbihhcnJbaV0pKSB7XG4gICAgICByZXR1cm4gYXJyW2ldXG4gICAgfVxuICAgIGkrK1xuICB9XG59KVxuXG5jb25zdCBmaW5kSW5kZXggPSBjdXJyeSgoZm4sIGFycikgPT4ge1xuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIGlmIChmbihhcnJbaV0pKSB7XG4gICAgICByZXR1cm4gaVxuICAgIH1cbiAgICBpKytcbiAgfVxufSlcblxuY29uc3QgZm9yRWFjaCA9IGN1cnJ5KChmbiwgYXJyKSA9PiB7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgZm4oYXJyW2ldKVxuICAgIGkrK1xuICB9XG4gIHJldHVybiBhcnJcbn0pXG5cbmV4cG9ydCB7IGhhc1RydXRoeVZhbHVlcywgcmVwbGFjZUV2ZXJ5TnRoLCByZXBsYWNlQXQsIHBpcGUsIG1hcCwgY3VycnksIGRlY3JlbWVudCwgcmVwZWF0LCBmaW5kLCBmaW5kSW5kZXgsIGZvckVhY2gsIGhhc0ZhbHN5VmFsdWVzIH1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlcy9zdHlsZS5jc3MnXG5pbXBvcnQgJy4vZmFjdG9yaWVzL3NoaXAnXG5pbXBvcnQgJy4vdWkvZG9tX2JvYXJkJ1xuaW1wb3J0ICcuL2xvZ2ljL2dhbWVfaGFuZGxlcidcbiJdLCJuYW1lcyI6WyJyZXBlYXQiLCJmaW5kIiwiZmluZEluZGV4IiwicGlwZSIsIlNoaXAiLCJfV0FURVIiLCJfU0hJUCIsIl9NSVNTRUQiLCJfSElUIiwiX2NyZWF0ZVJvdyIsIl9jcmVhdGVHYW1lYm9hcmQiLCJfZmlsbFJvdyIsInkiLCJ4U3RhcnQiLCJ4RmluaXNoIiwidmFsdWUiLCJib2FyZCIsInJlc3VsdCIsImkiLCJfZmlsbENvbHVtbiIsInlTdGFydCIsInlGaW5pc2giLCJ4IiwiR2FtZWJvYXJkIiwiZmxlZXQiLCJtaXNzZWQiLCJoaXQiLCJwbGFuZSIsIl9maW5kU2hpcCIsInNoaXAiLCJzZWdtZW50Iiwic2VnbWVudHMiLCJfc2hpcFBsYWNlciIsImhvcml6b250YWxseSIsInNpemUiLCJzaGlwVGFpbCIsInB1c2giLCJ2ZXJ0aWNhbGx5IiwiaXNPY2N1cGllZCIsIkJvb2xlYW4iLCJpc0Vub3VnaFJvb20iLCJfaXNIb3J6aW5vdGFsbHlBZGphY2VudCIsInRhaWwiLCJpc0FkamFjZW50VG9TaGlwcyIsInBsYWNlIiwicmVjZWl2ZUF0dGFjayIsImhpdFNoaXAiLCJpc0ZsZWV0U3VuayIsImV2ZXJ5IiwiaXNTdW5rIiwic2V0UGxhbmUiLCJuZXdQbGFuZSIsIlBsYXllciIsIm5hbWUiLCJpc0ZpcnN0IiwiZXZlbnROYW1lIiwidHVybiIsImNoYW5nZVR1cm4iLCJhdHRhY2siLCJlbmVteUJvYXJkIiwicmVjaWV2ZUF0dGFjayIsInZhbCIsIl90eXBlcyIsIl9zZWdtZW50c0NyZWF0b3IiLCJpbnRhY3QiLCJwb3NpdGlvbiIsInR5cGUiLCJ1bmRlZmluZWQiLCJFcnJvciIsImV2ZW50VHlwZXMiLCJPYmplY3QiLCJmcmVlemUiLCJHQU1FX1NUQVJURUQiLCJTSElQX1JPVEFURUQiLCJQTEFZRVJTX0NSRUFURUQiLCJldmVudHNIYW5kbGVyIiwibWVudUNvbnRyb2xsZXIiLCJib2FyZEhhbmRsZXIiLCJtZW51TG9naWMiLCJzdGFydEdhbWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJwbGF5ZXJOYW1lIiwicm90YXRlIiwibmFtZUlucHV0ZWQiLCJhbGxTaGlwc1BsYWNlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0cmlnZ2VyIiwiZGlzYWJsZUVsZW1lbnQiLCJkYXRhc2V0IiwiaW5uZXJUZXh0IiwiYm9hcmRMb2dpYyIsInBsYXllckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsImUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImhpZ2hsaWdodEZ1dHVyZVNoaXAiLCJyZW5kZXJCb2FyZCIsIm9uIiwiaGFzRmFsc3lWYWx1ZXMiLCJfY3JlYXRlQ2VsbCIsImlzSGlkZGVuIiwiY2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJzaGlwc1RvUGxhY2UiLCJjZWxscyIsImFwcGVuZCIsImNsZWFySGlnaGxpZ2h0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWwiLCJyZW1vdmUiLCJuZXh0U2hpcCIsIk51bWJlciIsImZpbHRlciIsImNhblN0YXJ0IiwiZGlzYWJsZWQiLCJlbmFibGVFbGVtZW50Iiwic2V0U3RhcnQiLCJldmVudHMiLCJmbiIsIm9mZiIsInJlbW92ZWRGbiIsImRhdGEiLCJjdXJyeSIsImN1cnJpZWQiLCJhcmdzIiwibGVuZ3RoIiwiYmluZCIsImNoZWNrVHJ1dGhpbmVzcyIsImNoZWNrRmFsc2luZXNzIiwiaGFzVHJ1dGh5VmFsdWVzIiwiYXJyIiwic29tZSIsInJlcGxhY2VFdmVyeU50aCIsIm50aCIsInN0YXJ0IiwidW50aWwiLCJzIiwibGVuIiwicmVwbGFjZUF0IiwiaW5kZXgiLCJtYXAiLCJmdW5jdG9yIiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiaXRlbSIsImtleXMiLCJwcm9wIiwiZnVuY3Rpb25zIiwicmVkdWNlIiwiYWNjIiwiZGVjcmVtZW50IiwibiIsIm51bSJdLCJzb3VyY2VSb290IjoiIn0=