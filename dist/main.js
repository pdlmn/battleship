/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@babel/runtime/regenerator/index.js":
/*!***********************************************************!*\
  !*** ../node_modules/@babel/runtime/regenerator/index.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "../node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./factories/ai_gameboard.js":
/*!***********************************!*\
  !*** ./factories/ai_gameboard.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AiGameboard": () => (/* binding */ AiGameboard)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./factories/gameboard.js");
/* harmony import */ var _utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/helper_funcs */ "./utils/helper_funcs.js");




var _getRandomPlane = function _getRandomPlane() {
  return (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__.getRandomInteger)(1, 2) === 1 ? 'horizontally' : 'vertically';
};

var AiGameboard = function AiGameboard() {
  var gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();

  var _placeShipAtRandom = function _placeShipAtRandom(size) {
    var plane = _getRandomPlane();

    var _getRandomCoords = (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__.getRandomCoords)(),
        _getRandomCoords2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_getRandomCoords, 2),
        y = _getRandomCoords2[0],
        x = _getRandomCoords2[1];

    gameboard.setPlane(plane);

    while (!gameboard.isValidForPlace(y, x, size)) {
      var _getRandomCoords3 = (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__.getRandomCoords)();

      var _getRandomCoords4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_getRandomCoords3, 2);

      y = _getRandomCoords4[0];
      x = _getRandomCoords4[1];
    }

    gameboard.place(y, x, size);
  };

  var placeFleet = function placeFleet() {
    var size = 5;

    while (size > 0) {
      _placeShipAtRandom(size);

      size--;
    }
  };

  return Object.assign(gameboard, {
    placeFleet: placeFleet
  });
};

/***/ }),

/***/ "./factories/ai_player.js":
/*!********************************!*\
  !*** ./factories/ai_player.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AiPlayer": () => (/* binding */ AiPlayer)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./factories/player.js");
/* harmony import */ var _utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/helper_funcs */ "./utils/helper_funcs.js");
/* harmony import */ var _utils_func_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/func_helpers */ "./utils/func_helpers.js");




var _potentialAttackDirections = {
  left: function left(y, x) {
    return {
      y: y,
      x: x - 1
    };
  },
  right: function right(y, x) {
    return {
      y: y,
      x: x + 1
    };
  },
  top: function top(y, x) {
    return {
      y: y - 1,
      x: x
    };
  },
  bottom: function bottom(y, x) {
    return {
      y: y + 1,
      x: x
    };
  }
};

var _getOppositeDirection = function _getOppositeDirection(direction) {
  switch (direction) {
    case 'left':
      return 'right';

    case 'right':
      return 'left';

    case 'top':
      return 'bottom';

    case 'bottom':
      return 'top';

    default:
      return '';
  }
};

var _isShipHorizontal = function _isShipHorizontal(hitCells) {
  return hitCells.length >= 1 ? hitCells[0].y === hitCells[1].y : false;
};

var _firstOnAxis = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_3__.curry)(function (axis, hitCells) {
  return hitCells.reduce(function (prev, next) {
    return prev[axis] < next[axis] ? prev : next;
  });
});

var _lastOnAxis = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_3__.curry)(function (axis, hitCells) {
  return hitCells.reduce(function (prev, next) {
    return prev[axis] < next[axis] ? next : prev;
  });
});

var _leftmostCell = _firstOnAxis('x');

var _rightmostCell = _lastOnAxis('x');

var _topmostCell = _firstOnAxis('y');

var _bottommostCell = _lastOnAxis('y');

var AiPlayer = function AiPlayer() {
  var computer = (0,_player__WEBPACK_IMPORTED_MODULE_1__.Player)('Computer', false);
  var hit = [];
  var hitCells = [];
  var lastHit = {};
  var direction = '';

  var findRandomSpotToAttack = function findRandomSpotToAttack(board) {
    var _getRandomCoords = (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__.getRandomCoords)(),
        _getRandomCoords2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_getRandomCoords, 2),
        y = _getRandomCoords2[0],
        x = _getRandomCoords2[1];

    while (board.state[y - 1][x - 1] === 'h' || board.state[y - 1][x - 1] === 'm') {
      var _getRandomCoords3 = (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__.getRandomCoords)();

      var _getRandomCoords4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_getRandomCoords3, 2);

      y = _getRandomCoords4[0];
      x = _getRandomCoords4[1];
    }

    return {
      y: y,
      x: x
    };
  };

  var _findSpotAfterHit = function _findSpotAfterHit(board, y, x) {
    var directions = Object.keys(_potentialAttackDirections);
    var randomDirection = directions[(0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__.getRandomInteger)(0, 3)];

    var _potentialAttackDirec = _potentialAttackDirections[randomDirection](y, x),
        ry = _potentialAttackDirec.y,
        rx = _potentialAttackDirec.x;

    while (!board.isValidAttackTarget(ry, rx) && directions.length > 1) {
      directions = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_3__.remove)(randomDirection, directions);
      randomDirection = directions[(0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__.getRandomInteger)(0, directions.length - 1)];

      var randomCoords = _potentialAttackDirections[randomDirection](y, x);

      ry = randomCoords.y;
      rx = randomCoords.x;
    }

    if (!board.isValidAttackTarget(ry, rx)) {
      return {
        validity: false
      };
    }

    return {
      validity: true,
      direction: randomDirection,
      y: ry,
      x: rx
    };
  };

  var _gainOppositeEnd = function _gainOppositeEnd() {
    switch (_isShipHorizontal(hitCells)) {
      case true:
        var leftmost = _leftmostCell(hitCells);

        var rightmost = _rightmostCell(hitCells);

        return lastHit.x === leftmost.x ? rightmost : leftmost;

      case false:
        var topmost = _topmostCell(hitCells);

        var bottommost = _bottommostCell(hitCells);

        return lastHit.y === topmost.y ? bottommost : topmost;

      default:
        return {};
    }
  };

  var attackPlayer = function attackPlayer(board, y, x) {
    if (y && x) {
      computer.attack(board, y, x);
      var status = board.getAttackStatus(y, x);

      if (status.shipStatus === 'damaged') {
        lastHit = {
          y: y,
          x: x
        };
        hitCells.push(lastHit);
      }

      return status;
    } else if (lastHit.y && lastHit.x && direction !== '') {
      var _lastHit = lastHit,
          hy = _lastHit.y,
          hx = _lastHit.x;

      var coordsForAttack = _potentialAttackDirections[direction](hy, hx);

      var ay = coordsForAttack.y,
          ax = coordsForAttack.x;

      if (!board.isValidAttackTarget(ay, ax)) {
        direction = _getOppositeDirection(direction);
        lastHit = _gainOppositeEnd();

        if (!board.isValidAttackTarget(_potentialAttackDirections[direction](lastHit))) {
          direction = '';
          lastHit = {};
          hitCells = [];
        }

        return attackPlayer(board);
      }

      computer.attack(board, ay, ax);

      var _status = board.getAttackStatus(ay, ax);

      if (_status.value !== 'hit') {
        direction = _getOppositeDirection(direction);
        lastHit = _gainOppositeEnd();
      }

      if (_status.shipStatus === 'destroyed') {
        direction = '';
        lastHit = {};
        hitCells = [];
      }

      if (_status.shipStatus === 'damaged') {
        lastHit = {
          y: ay,
          x: ax
        };
        hitCells.push(lastHit);
      }

      return _status;
    } else if (lastHit.y && lastHit.x) {
      var _lastHit2 = lastHit,
          _hy = _lastHit2.y,
          _hx = _lastHit2.x;

      var coords = _findSpotAfterHit(board, _hy, _hx);

      if (!coords.validity) {
        lastHit = {};
        hitCells = [];
        return attackPlayer(board);
      }

      var _ay = coords.y,
          _ax = coords.x;
      direction = coords.direction;
      computer.attack(board, _ay, _ax);

      var _status2 = board.getAttackStatus(_ay, _ax);

      if (_status2.value !== 'hit') {
        return _status2;
      }

      lastHit = {
        y: _ay,
        x: _ax
      };
      hitCells.push(lastHit);
      return _status2;
    } else if (!(lastHit.y && lastHit.x)) {
      var randomCoords = findRandomSpotToAttack(board);
      var _y = randomCoords.y,
          _x = randomCoords.x;
      computer.attack(board, _y, _x);

      var _status3 = board.getAttackStatus(_y, _x);

      if (_status3.value === 'hit' && _status3.shipStatus === 'damaged') {
        lastHit = {
          y: _y,
          x: _x
        };
        hitCells.push(lastHit);
      }

      return _status3;
    }
  };

  var setDirection = function setDirection(val) {
    direction = val;
  };

  return Object.assign({
    findRandomSpotToAttack: findRandomSpotToAttack,
    attackPlayer: attackPlayer,
    setDirection: setDirection,

    get direction() {
      return direction;
    }

  }, computer);
};

/***/ }),

/***/ "./factories/gameboard.js":
/*!********************************!*\
  !*** ./factories/gameboard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard),
/* harmony export */   "_createGameboard": () => (/* binding */ _createGameboard)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/func_helpers */ "./utils/func_helpers.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship */ "./factories/ship.js");




var _WATER = 'w';
var _SHIP = 's';
var _MISSED = 'm';
var _HIT = 'h';

var _createRow = function _createRow() {
  return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.repeat)(function () {
    return _WATER;
  }, 10);
};

var _createGameboard = function _createGameboard() {
  return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.repeat)(_createRow, 10);
};

var _mapCoords = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.curry)(function (board, value, coords) {
  var result = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(board);

  for (var i = 0; i < coords.length; i++) {
    var _decrement = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.decrement)(coords[i]),
        y = _decrement.y,
        x = _decrement.x;

    result[y][x] = value;
  }

  return result;
});

var Gameboard = function Gameboard() {
  var fleet = [];
  var missed = [];
  var hit = [];
  var plane = 'horizontally';

  var state = _createGameboard();

  var _mapBoard = _mapCoords(state);

  var _mapShip = _mapBoard(_SHIP);

  var _mapMissed = _mapBoard(_MISSED);

  var _mapHit = _mapBoard(_HIT);

  var _findShip = function _findShip(y, x) {
    return fleet.find(function (ship) {
      return ship.segments.find(function (segment) {
        return segment.y === y && segment.x === x;
      });
    });
  };

  var _getOccupiedCells = function _getOccupiedCells() {
    return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.pipe)((0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.map)(function (ship) {
      return ship.segments;
    }), _utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.flatten)(fleet);
  };

  var _isOverlaps = function _isOverlaps(y, x, size) {
    var occupiedCells = _getOccupiedCells();

    if (plane === 'horizontally' && occupiedCells.length > 0) {
      var tail = x + size;

      for (var i = 0; i < occupiedCells.length; i++) {
        for (var j = x; j < tail; j++) {
          if (occupiedCells[i].y === y && occupiedCells[i].x === j) {
            return true;
          }
        }
      }
    }

    if (plane === 'vertically' && occupiedCells.length > 0) {
      var _tail = y + size;

      for (var _i = 0; _i < occupiedCells.length; _i++) {
        for (var _j = y; _j < _tail; _j++) {
          if (occupiedCells[_i].y === _j && occupiedCells[_i].x === x) {
            return true;
          }
        }
      }
    }

    return false;
  };

  var _isOverflows = function _isOverflows(y, x, size) {
    if (plane === 'horizontally' && x + --size > 10 || plane === 'vertically' && y + --size > 10) {
      return true;
    }

    return false;
  };

  var _isAdjacentToShips = function _isAdjacentToShips(y, x, size) {
    var _decrement2 = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.decrement)([y, x]),
        _decrement3 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_decrement2, 2),
        dy = _decrement3[0],
        dx = _decrement3[1];

    if (plane === 'horizontally') {
      var tail = dx + size;

      for (var i = dx; i < tail; i++) {
        var topCell = state[dy - 1] ? state[dy - 1][i] : null;
        var bottomCell = state[dy + 1] ? state[dy + 1][i] : null;

        if (topCell === _SHIP || bottomCell === _SHIP) {
          return true;
        }
      }

      var leftCell = state[dy][dx - 1];
      var rightCell = state[dy][tail];

      if (leftCell === _SHIP || rightCell === _SHIP) {
        return true;
      }

      var topLeft = state[dy - 1] ? state[dy - 1][dx - 1] : null;
      var bottomLeft = state[dy + 1] ? state[dy + 1][dx - 1] : null;
      var topRight = state[dy - 1] ? state[dy - 1][tail] : null;
      var bottomRight = state[dy + 1] ? state[dy + 1][tail] : null;

      if (topLeft === _SHIP || bottomLeft === _SHIP || topRight === _SHIP || bottomRight === _SHIP) {
        return true;
      }
    }

    if (plane === 'vertically') {
      var _tail2 = dy + size;

      var _topCell = state[dy - 1] ? state[dy - 1][dx] : null;

      var _bottomCell = state[_tail2] ? state[_tail2][dx] : null;

      if (_topCell === _SHIP || _bottomCell === _SHIP) {
        return true;
      }

      for (var _i2 = dy; _i2 < _tail2; _i2++) {
        var _leftCell = state[_i2][dx - 1];
        var _rightCell = state[_i2][dx + 1];

        if (_leftCell === _SHIP || _rightCell === _SHIP) {
          return true;
        }
      }

      var _topLeft = state[dy - 1] ? state[dy - 1][dx - 1] : null;

      var _topRight = state[dy - 1] ? state[dy - 1][dx + 1] : null;

      var _bottomLeft = state[_tail2] ? state[_tail2][dx - 1] : null;

      var _bottomRight = state[_tail2] ? state[_tail2][dx + 1] : null;

      if (_topLeft === _SHIP || _bottomLeft === _SHIP || _topRight === _SHIP || _bottomRight === _SHIP) {
        return true;
      }
    }

    return false;
  };

  var isValidForPlace = function isValidForPlace(y, x, size) {
    return !_isOverlaps(y, x, size) && !_isOverflows(y, x, size) && !_isAdjacentToShips(y, x, size);
  };

  var place = function place(y, x, size) {
    if (!isValidForPlace(y, x, size)) return;
    var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_3__.Ship)(y, x, size, plane);
    fleet.push(ship);
    state = _mapShip(ship.segments);
    return ship;
  };

  var isValidAttackTarget = function isValidAttackTarget(y, x) {
    var _decrement4 = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.decrement)([y, x]),
        _decrement5 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_decrement4, 2),
        dy = _decrement5[0],
        dx = _decrement5[1];

    var row = state[dy];

    if (row) {
      switch (state[dy][dx]) {
        case 's':
        case 'w':
          return true;

        case 'm':
        case 'h':
          return false;
      }
    }

    return false;
  };

  var receiveAttack = function receiveAttack(y, x) {
    var hitShip = _findShip(y, x);

    if (!hitShip) {
      missed.push({
        y: y,
        x: x
      });
      state = _mapMissed([{
        y: y,
        x: x
      }]);
      return;
    }

    (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.pipe)((0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.findIndex)(function (segment) {
      return segment.y === y && segment.x === x;
    }), hitShip.hit)(hitShip.segments);
    hit.push({
      y: y,
      x: x
    });
    state = _mapHit([{
      y: y,
      x: x
    }]);
  };

  var getAttackStatus = function getAttackStatus(y, x) {
    var coords = {
      y: y,
      x: x
    };
    var attackedCell = state[y - 1][x - 1];

    switch (attackedCell) {
      case _MISSED:
        return Object.assign({
          value: 'missed'
        }, coords);

      case _HIT:
        var ship = _findShip(y, x);

        var status = {
          value: 'hit',
          ship: ship.type
        };
        return ship.isSunk() ? Object.assign(status, coords, {
          shipStatus: 'destroyed'
        }) : Object.assign(status, coords, {
          shipStatus: 'damaged'
        });
    }

    return Object.assign({
      value: attackedCell
    }, coords);
  };

  var isShipSunk = function isShipSunk(y, x) {
    var ship = _findShip(y, x);

    return ship ? ship.isSunk() : false;
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
    get state() {
      return state;
    },

    get fleet() {
      return fleet;
    },

    get missed() {
      return missed;
    },

    get hit() {
      return hit;
    },

    isValidForPlace: isValidForPlace,
    place: place,
    isValidAttackTarget: isValidAttackTarget,
    receiveAttack: receiveAttack,
    getAttackStatus: getAttackStatus,
    isShipSunk: isShipSunk,
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/func_helpers */ "./utils/func_helpers.js");

var Player = function Player(name, isFirst) {
  var turn = isFirst;

  var changeTurn = function changeTurn() {
    turn = !turn;
  };

  var attack = function attack(board, y, x) {
    board.receiveAttack(y, x);
    var status = board.getAttackStatus(y, x);

    if (status.value !== 'hit') {
      changeTurn();
    }
  };

  return {
    get name() {
      return name;
    },

    get turn() {
      return turn;
    },

    attack: attack,
    changeTurn: changeTurn
  };
};

/***/ }),

/***/ "./factories/ship.js":
/*!***************************!*\
  !*** ./factories/ship.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
var _types = {
  1: 'Patrol boat',
  2: 'Destroyer',
  3: 'Cruiser',
  4: 'Battleship',
  5: 'Carrier'
};
var _segmentsCreator = {
  horizontally: function horizontally(y, x, size) {
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
  vertically: function vertically(y, x, size) {
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
var Ship = function Ship(y, x, size, plane) {
  var type = _types[size];
  if (type === undefined) throw new Error('Improper ship size');

  var segments = _segmentsCreator[plane](y, x, size);

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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eventTypes": () => (/* binding */ eventTypes)
/* harmony export */ });
var eventTypes = Object.freeze({
  BOARD_HOVERED: 'Board hovered',
  BOARD_CLICKED: 'Board clicked',
  SHIP_VALIDATED: 'Ship validated',
  SHIP_ROTATED: 'Ship rotated',
  SHIP_PLACED: 'Ship placed',
  PLAYERS_CREATED: 'Players created',
  GAME_STARTED: 'Game started',
  COMPUTER_PLACED_SHIPS: 'Computer placed ships',
  COMPUTER_BOARD_CLICKED: 'Computer board clicked',
  COMPUTER_BOARD_ATTACKED: 'Computer board attacked',
  PLAYER_FINISHED_TURN: 'Player made move',
  COMPUTER_FINISHED_TURN: 'Computer made move',
  GAME_ENDED: 'Game ended'
});

/***/ }),

/***/ "./logic/game_handler.js":
/*!*******************************!*\
  !*** ./logic/game_handler.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _event_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./event_types */ "./logic/event_types.js");
/* harmony import */ var _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/events_handler */ "./utils/events_handler.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../factories/player */ "./factories/player.js");
/* harmony import */ var _factories_ai_player__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../factories/ai_player */ "./factories/ai_player.js");
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../factories/gameboard */ "./factories/gameboard.js");
/* harmony import */ var _factories_ai_gameboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../factories/ai_gameboard */ "./factories/ai_gameboard.js");
/* harmony import */ var _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../ui/dom_board */ "./ui/dom_board.js");
/* harmony import */ var _ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ui/dom_funcs */ "./ui/dom_funcs.js");













(function uiLogic() {
  var startBtn = document.querySelector('#start-game');
  var nameInp = document.querySelector('#player-name');
  var rotateBtn = document.querySelector('#rotate');
  var logDiv = document.querySelector('#log');
  var hintsDiv = document.querySelector('#hints');
  var nameInputed = Boolean(nameInp.value);
  var shipsPlaced = false;
  startBtn.addEventListener('click', function () {
    [startBtn, nameInp, rotateBtn].forEach(function (el) {
      el.disabled = true;
    });
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.GAME_STARTED, nameInp.value);
    hintsDiv.innerText = 'Good luck, Admiral!';
  });
  rotateBtn.addEventListener('click', function () {
    if (rotateBtn.dataset.plane === 'vertically') {
      rotateBtn.dataset.plane = 'horizontally';
      rotateBtn.innerText = 'Horizontal';
    } else if (rotateBtn.dataset.plane === 'horizontally') {
      rotateBtn.dataset.plane = 'vertically';
      rotateBtn.innerText = 'Vertical';
    }

    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.SHIP_ROTATED, rotateBtn.dataset.plane);
  });
  nameInp.addEventListener('input', function (e) {
    e.currentTarget.value.length > 0 ? nameInputed = true : nameInputed = false;
    nameInputed && shipsPlaced ? startBtn.disabled = false : startBtn.disabled = true;
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.SHIP_PLACED, function (_ref) {
    var areShipsPlaced = _ref.areShipsPlaced,
        shipType = _ref.shipType;
    ;
    areShipsPlaced() ? shipsPlaced = true : shipsPlaced = false;
    nameInputed && shipsPlaced ? startBtn.disabled = false : startBtn.disabled = true;
    hintsDiv.innerText = "".concat(shipType, " has been placed.");
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.COMPUTER_FINISHED_TURN, function (_ref2) {
    var status = _ref2.status;

    if (status.value === 'missed') {
      var div = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.wrapInDiv)('Computer missed...', 'log-computer-missed');
      logDiv.prepend(div);
    }

    if (status.value === 'hit') {
      var _div = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.wrapInDiv)("Computer ".concat(status.shipStatus, " your ").concat(status.ship, "!"), 'log-computer-hit');

      logDiv.prepend(_div);
    }
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.COMPUTER_BOARD_ATTACKED, function (_ref3) {
    var status = _ref3.status,
        name = _ref3.name;

    if (status.value === 'missed') {
      var div = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.wrapInDiv)("".concat(name, " missed..."), 'log-player-missed');
      logDiv.prepend(div);
    }

    if (status.value === 'hit') {
      var _div2 = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.wrapInDiv)("".concat(name, " ").concat(status.shipStatus, " ").concat(status.ship, "!"), 'log-player-hit');

      logDiv.prepend(_div2);
    }
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.GAME_ENDED, function (name) {
    hintsDiv.innerText = "".concat(name, " won!");
  });
})();

(function boardViewLogic() {
  var playerBoard = document.querySelector('#player-board');
  var computerBoard = document.querySelector('#computer-board');
  _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.createBoard(false, playerBoard);
  _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.createBoard(true, computerBoard);
  var renderPlayer = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.renderBoard(playerBoard);
  var renderComputer = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.renderBoard(computerBoard);
  playerBoard.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('cell')) {
      var coords = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.extractCoords(e.target);
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.BOARD_HOVERED, coords);
    }
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.SHIP_VALIDATED, function (data) {
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.highlightFutureShip.apply(_ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(data));
  });
  playerBoard.addEventListener('click', function (e) {
    if (e.target.classList.contains('cell')) {
      var coords = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.extractCoords(e.target);
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.BOARD_CLICKED, coords);
    }
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.SHIP_PLACED, function (_ref4) {
    var ship = _ref4.ship;
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.place.apply(_ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(ship));
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.GAME_STARTED, function () {});
  playerBoard.addEventListener('mouseleave', _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.clearHighlights);
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.onEach([_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.COMPUTER_PLACED_SHIPS, _event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.COMPUTER_BOARD_ATTACKED], function (_ref5) {
    var state = _ref5.state;
    renderComputer(state);
  });
  computerBoard.addEventListener('click', function (e) {
    if (e.target.classList.contains('cell')) {
      var coords = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.extractCoords(e.target);
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.COMPUTER_BOARD_CLICKED, coords);
    }
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.COMPUTER_FINISHED_TURN, function (_ref6) {
    var state = _ref6.state;
    renderPlayer(state);
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.SHIP_ROTATED, _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.setPlane);
})();

(function gameLogic() {
  var shipsToPlace = [5, 4, 3, 2, 1];
  var playerBoard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_8__.Gameboard)();
  var computerBoard = (0,_factories_ai_gameboard__WEBPACK_IMPORTED_MODULE_9__.AiGameboard)(); // temporary

  var player;
  var computer;
  var gameStarted = false;
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.BOARD_HOVERED, function (coords) {
    if (gameStarted) return;

    var _coords = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(coords, 2),
        y = _coords[0],
        x = _coords[1];

    var nextShipSize = shipsToPlace[0];
    var isValid = playerBoard.isValidForPlace(y, x, nextShipSize);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.SHIP_VALIDATED, [y, x, nextShipSize, isValid]);
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.BOARD_CLICKED, function (coords) {
    if (gameStarted) return;

    var _coords2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(coords, 2),
        y = _coords2[0],
        x = _coords2[1];

    var nextShipSize = shipsToPlace[0];
    var isValid = playerBoard.isValidForPlace(y, x, nextShipSize);
    if (!isValid) return;
    var ship = playerBoard.place(y, x, nextShipSize);
    shipsToPlace.shift();
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.SHIP_PLACED, {
      ship: [y, x, nextShipSize],
      shipType: ship.type,
      areShipsPlaced: function areShipsPlaced() {
        return shipsToPlace.length === 0;
      }
    });
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.SHIP_ROTATED, playerBoard.setPlane);
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.GAME_STARTED, function (name) {
    gameStarted = true;
    player = (0,_factories_player__WEBPACK_IMPORTED_MODULE_6__.Player)(name, true);
    computer = (0,_factories_ai_player__WEBPACK_IMPORTED_MODULE_7__.AiPlayer)();
    computerBoard.placeFleet(5);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.COMPUTER_PLACED_SHIPS, {
      state: computerBoard.state
    });
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.COMPUTER_BOARD_CLICKED, function (coords) {
    var _player;

    if (!gameStarted || !player.turn || !computerBoard.isValidAttackTarget.apply(computerBoard, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(coords))) return;

    (_player = player).attack.apply(_player, [computerBoard].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(coords)));

    var status = computerBoard.getAttackStatus.apply(computerBoard, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(coords));
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.COMPUTER_BOARD_ATTACKED, {
      state: computerBoard.state,
      status: status,
      name: player.name
    });

    if (!player.turn) {
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.PLAYER_FINISHED_TURN, null);
    }

    if (computerBoard.isFleetSunk()) {
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.GAME_ENDED, player.name);
    }
  });

  var delay = /*#__PURE__*/function () {
    var _ref7 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(ms) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve) {
                setTimeout(resolve, ms);
              }));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function delay(_x) {
      return _ref7.apply(this, arguments);
    };
  }();

  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.PLAYER_FINISHED_TURN, /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
    var status;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return delay(250);

          case 2:
            status = computer.attackPlayer(playerBoard);
            _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.COMPUTER_FINISHED_TURN, {
              state: playerBoard.state,
              status: status
            });

            if (!(status.value === 'hit')) {
              _context2.next = 7;
              break;
            }

            _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.PLAYER_FINISHED_TURN, null);
            return _context2.abrupt("return");

          case 7:
            player.changeTurn();

            if (playerBoard.isFleetSunk()) {
              _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_event_types__WEBPACK_IMPORTED_MODULE_4__.eventTypes.GAME_ENDED, computer.name);
            }

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
})();

/***/ }),

/***/ "./ui/dom_board.js":
/*!*************************!*\
  !*** ./ui/dom_board.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boardHandler": () => (/* binding */ boardHandler)
/* harmony export */ });
/* harmony import */ var _utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/func_helpers */ "./utils/func_helpers.js");

var _cellClasses = {
  s: 'ship',
  w: 'water',
  h: 'hit',
  m: 'miss'
};

var _createCell = function _createCell(isHidden, y, x) {
  var cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.y = y;
  cell.dataset.x = x;
  cell.classList.add('water');
  if (isHidden) cell.classList.add('fog-of-war');
  return cell;
};

var _cellsFinder = {
  horizontally: function horizontally(y, x, size) {
    var segments = [];
    var tail = x + size;

    for (var i = x; i < tail; i++) {
      segments.push(document.querySelector("[data-y='".concat(y, "'][data-x='").concat(i, "']")));
    }

    return segments;
  },
  vertically: function vertically(y, x, size) {
    var segments = [];
    var tail = y + size;

    for (var i = y; i < tail; i++) {
      segments.push(document.querySelector("[data-y='".concat(i, "'][data-x='").concat(x, "']")));
    }

    return segments;
  }
};

var extractCoords = function extractCoords(cell) {
  return [cell.dataset.y, cell.dataset.x].map(function (coord) {
    return Number(coord);
  });
};

var boardHandler = function () {
  var plane = 'horizontally';

  var createBoard = function createBoard(isHidden, domBoard) {
    for (var y = 1; y < 11; y++) {
      for (var x = 1; x < 11; x++) {
        domBoard.append(_createCell(isHidden, y, x));
      }
    }
  };

  var renderBoard = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.curry)(function (domBoard, boardState) {
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var cellState = boardState[i][j];
        var cellView = domBoard.querySelector("[data-y='".concat(i + 1, "'][data-x='").concat(j + 1, "']"));

        if (!cellView.classList.contains(_cellClasses[cellState])) {
          cellView.classList.add(_cellClasses[cellState]);
        }
      }
    }
  });

  var clearHighlights = function clearHighlights() {
    return document.querySelectorAll('.cell').forEach(function (el) {
      return el.classList.remove('future-ship', 'wrong-placement');
    });
  };

  var highlightFutureShip = function highlightFutureShip(y, x, size, isValid) {
    var className = isValid ? 'future-ship' : 'wrong-placement';

    var segments = _cellsFinder[plane](y, x, size);

    clearHighlights();
    (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.pipe)((0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.filter)(function (el) {
      return Boolean(el);
    }), (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.forEach)(function (el) {
      return el.classList.add(className);
    }))(segments);
  };

  var place = function place(y, x, size) {
    var shipSegments = _cellsFinder[plane](y, x, size);

    shipSegments.forEach(function (el) {
      return el.classList.add('ship');
    });
  };

  var setPlane = function setPlane(newPlane) {
    plane = newPlane;
  };

  return {
    createBoard: createBoard,
    renderBoard: renderBoard,
    setPlane: setPlane,
    extractCoords: extractCoords,
    highlightFutureShip: highlightFutureShip,
    clearHighlights: clearHighlights,
    place: place
  };
}();

/***/ }),

/***/ "./ui/dom_funcs.js":
/*!*************************!*\
  !*** ./ui/dom_funcs.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wrapInDiv": () => (/* binding */ wrapInDiv)
/* harmony export */ });
var wrapInDiv = function wrapInDiv(str) {
  var div = document.createElement('div');
  div.innerText = str;

  for (var _len = arguments.length, classes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classes[_key - 1] = arguments[_key];
  }

  classes.forEach(function (cssClass) {
    return div.classList.add(cssClass);
  });
  return div;
};



/***/ }),

/***/ "./utils/events_handler.js":
/*!*********************************!*\
  !*** ./utils/events_handler.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    onEach: function onEach(arrOfEvents, fn) {
      arrOfEvents.forEach(function (event) {
        events[event] = events[event] || [];
        events[event].push(fn);
      });
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasTruthyValues": () => (/* binding */ hasTruthyValues),
/* harmony export */   "replaceEveryNth": () => (/* binding */ replaceEveryNth),
/* harmony export */   "replaceAt": () => (/* binding */ replaceAt),
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "curry": () => (/* binding */ curry),
/* harmony export */   "decrement": () => (/* binding */ decrement),
/* harmony export */   "decrementEach": () => (/* binding */ decrementEach),
/* harmony export */   "increment": () => (/* binding */ increment),
/* harmony export */   "incrementEach": () => (/* binding */ incrementEach),
/* harmony export */   "repeat": () => (/* binding */ repeat),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "forEach": () => (/* binding */ forEach),
/* harmony export */   "hasFalsyValues": () => (/* binding */ hasFalsyValues),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "objEqual": () => (/* binding */ objEqual),
/* harmony export */   "objectInArray": () => (/* binding */ objectInArray),
/* harmony export */   "remove": () => (/* binding */ remove)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

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
  var result = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);

  var s = typeof start === 'number' ? start : nth - 1;
  var len = until || arr.length;

  for (var i = s; i < len; i += nth) {
    result[i] = value;
  }

  return result;
});
var replaceAt = curry(function (index, value, arr) {
  var result = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);

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
  return typeof n === 'number' ? n - 1 : n;
});
var decrementEach = map(decrement);
var increment = map(function (n) {
  return typeof n === 'number' ? n + 1 : n;
});
var incrementEach = map(increment);
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
var flatten = curry(function (arr) {
  var result = [];
  var ilen = arr.length;
  var i = 0;

  while (i < ilen) {
    if (Object.prototype.toString.call(arr[i]) === '[object Array]') {
      var jarr = flatten(arr[i]);
      var jlen = jarr.length;
      var j = 0;

      while (j < jlen) {
        result.push(jarr[j]);
        j++;
      }
    } else {
      result.push(arr[i]);
    }

    i++;
  }

  return result;
});
var filter = curry(function (fn, arr) {
  var result = [];
  var len = arr.length;
  var i = 0;

  while (i < len) {
    if (fn(arr[i])) {
      result.push(arr[i]);
    }

    i++;
  }

  return result;
});
var objEqual = curry(function (obj1, obj2) {
  for (var _i2 = 0, _Object$keys2 = Object.keys(obj1); _i2 < _Object$keys2.length; _i2++) {
    var prop = _Object$keys2[_i2];

    if (obj1[prop] !== obj2[prop]) {
      return false;
    }
  }

  return true;
});
var objectInArray = curry(function (obj, arr) {
  var _iterator2 = _createForOfIteratorHelper(arr),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var currentObj = _step2.value;

      if (objEqual(currentObj, obj)) {
        return true;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return false;
});
var remove = curry(function (item, arr) {
  var result = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);

  var len = arr.length;

  for (var i = 0; i < len; i++) {
    if (arr[i] === item) {
      result.splice(i, 1);
      return result;
    }
  }

  return result;
});


/***/ }),

/***/ "./utils/helper_funcs.js":
/*!*******************************!*\
  !*** ./utils/helper_funcs.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomInteger": () => (/* binding */ getRandomInteger),
/* harmony export */   "getRandomCoords": () => (/* binding */ getRandomCoords)
/* harmony export */ });
var getRandomInteger = function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomCoords = function getRandomCoords() {
  var y = getRandomInteger(1, 10);
  var x = getRandomInteger(1, 10);
  return [y, x];
};



/***/ }),

/***/ "./styles/style.css":
/*!**************************!*\
  !*** ./styles/style.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../node_modules/regenerator-runtime/runtime.js":
/*!******************************************************!*\
  !*** ../node_modules/regenerator-runtime/runtime.js ***!
  \******************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!**********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!**************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!*********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "../node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "../node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "../node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "../node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "../node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "../node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!********************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBMEIsb0JBQW9CLENBQUU7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDanZCZTtBQUNmOztBQUVBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDUmU7QUFDZjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDRnFEO0FBQ3RDO0FBQ2YsaUNBQWlDLGdFQUFnQjtBQUNqRDs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xDZTtBQUNmO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0ZlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw0QkFBNEIsK0JBQStCO0FBQzNEOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1QmU7QUFDZjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNGZTtBQUNmO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGaUQ7QUFDWTtBQUNZO0FBQ3RCO0FBQ3BDO0FBQ2YsU0FBUyw4REFBYyxTQUFTLG9FQUFvQixZQUFZLDBFQUEwQixZQUFZLCtEQUFlO0FBQ3JIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnVEO0FBQ0o7QUFDc0I7QUFDbEI7QUFDeEM7QUFDZixTQUFTLGlFQUFpQixTQUFTLCtEQUFlLFNBQVMsMEVBQTBCLFNBQVMsaUVBQWlCO0FBQy9HOzs7Ozs7Ozs7Ozs7Ozs7O0FDTnFEO0FBQ3RDO0FBQ2Y7QUFDQSxvQ0FBb0MsZ0VBQWdCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLHNGQUFzRixnRUFBZ0I7QUFDdEc7Ozs7OztVQ1JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9mYWN0b3JpZXMvYWlfZ2FtZWJvYXJkLmpzIiwid2VicGFjazovLy8uL2ZhY3Rvcmllcy9haV9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovLy8uL2xvZ2ljL2V2ZW50X3R5cGVzLmpzIiwid2VicGFjazovLy8uL2xvZ2ljL2dhbWVfaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi91aS9kb21fYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vdWkvZG9tX2Z1bmNzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2V2ZW50c19oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2Z1bmNfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9oZWxwZXJfZnVuY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL3N0eWxlLmNzcz9kZjA2Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnXG5pbXBvcnQgeyBnZXRSYW5kb21JbnRlZ2VyLCBnZXRSYW5kb21Db29yZHMgfSBmcm9tICcuLi91dGlscy9oZWxwZXJfZnVuY3MnXG5cbmNvbnN0IF9nZXRSYW5kb21QbGFuZSA9ICgpID0+IHtcbiAgcmV0dXJuIGdldFJhbmRvbUludGVnZXIoMSwgMikgPT09IDEgPyAnaG9yaXpvbnRhbGx5JyA6ICd2ZXJ0aWNhbGx5J1xufVxuXG5leHBvcnQgY29uc3QgQWlHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCgpXG5cbiAgY29uc3QgX3BsYWNlU2hpcEF0UmFuZG9tID0gKHNpemUpID0+IHtcbiAgICBjb25zdCBwbGFuZSA9IF9nZXRSYW5kb21QbGFuZSgpXG4gICAgbGV0IFt5LCB4XSA9IGdldFJhbmRvbUNvb3JkcygpXG4gICAgZ2FtZWJvYXJkLnNldFBsYW5lKHBsYW5lKVxuICAgIHdoaWxlICghZ2FtZWJvYXJkLmlzVmFsaWRGb3JQbGFjZSh5LCB4LCBzaXplKSkge1xuICAgICAgW3ksIHhdID0gZ2V0UmFuZG9tQ29vcmRzKClcbiAgICB9XG4gICAgZ2FtZWJvYXJkLnBsYWNlKHksIHgsIHNpemUpXG4gIH1cblxuICBjb25zdCBwbGFjZUZsZWV0ID0gKCkgPT4ge1xuICAgIGxldCBzaXplID0gNVxuICAgIHdoaWxlIChzaXplID4gMCkge1xuICAgICAgX3BsYWNlU2hpcEF0UmFuZG9tKHNpemUpXG4gICAgICBzaXplLS1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihnYW1lYm9hcmQsIHtcbiAgICBwbGFjZUZsZWV0XG4gIH0pXG59XG4iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcidcbmltcG9ydCB7IGdldFJhbmRvbUludGVnZXIsIGdldFJhbmRvbUNvb3JkcyB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcl9mdW5jcydcbmltcG9ydCB7IGN1cnJ5LCByZW1vdmUgfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5cbmNvbnN0IF9wb3RlbnRpYWxBdHRhY2tEaXJlY3Rpb25zID0ge1xuICBsZWZ0OiAoeSwgeCkgPT4gKHsgeSwgeDogeCAtIDEgfSksXG4gIHJpZ2h0OiAoeSwgeCkgPT4gKHsgeSwgeDogeCArIDEgfSksXG4gIHRvcDogKHksIHgpID0+ICh7IHk6IHkgLSAxLCB4IH0pLFxuICBib3R0b206ICh5LCB4KSA9PiAoeyB5OiB5ICsgMSwgeCB9KVxufVxuXG5jb25zdCBfZ2V0T3Bwb3NpdGVEaXJlY3Rpb24gPSAoZGlyZWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gJ3JpZ2h0J1xuICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgIHJldHVybiAnbGVmdCdcbiAgICBjYXNlICd0b3AnOlxuICAgICAgcmV0dXJuICdib3R0b20nXG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIHJldHVybiAndG9wJ1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJydcbiAgfVxufVxuXG5jb25zdCBfaXNTaGlwSG9yaXpvbnRhbCA9IChoaXRDZWxscykgPT4gXG4gIGhpdENlbGxzLmxlbmd0aCA+PSAxXG4gID8gaGl0Q2VsbHNbMF0ueSA9PT0gaGl0Q2VsbHNbMV0ueVxuICA6IGZhbHNlXG5cbmNvbnN0IF9maXJzdE9uQXhpcyA9IGN1cnJ5KChheGlzLCBoaXRDZWxscykgPT4gaGl0Q2VsbHMucmVkdWNlKChwcmV2LCBuZXh0KSA9PlxuICAgICAgICBwcmV2W2F4aXNdIDwgbmV4dFtheGlzXVxuICAgICAgICA/IHByZXZcbiAgICAgICAgOiBuZXh0XG4gICAgICApKVxuXG5jb25zdCBfbGFzdE9uQXhpcyA9IGN1cnJ5KChheGlzLCBoaXRDZWxscykgPT4gaGl0Q2VsbHMucmVkdWNlKChwcmV2LCBuZXh0KSA9PlxuICAgICAgICBwcmV2W2F4aXNdIDwgbmV4dFtheGlzXVxuICAgICAgICA/IG5leHRcbiAgICAgICAgOiBwcmV2XG4gICAgICApKVxuXG5jb25zdCBfbGVmdG1vc3RDZWxsID0gX2ZpcnN0T25BeGlzKCd4JylcbmNvbnN0IF9yaWdodG1vc3RDZWxsID0gX2xhc3RPbkF4aXMoJ3gnKVxuY29uc3QgX3RvcG1vc3RDZWxsID0gX2ZpcnN0T25BeGlzKCd5JylcbmNvbnN0IF9ib3R0b21tb3N0Q2VsbCA9IF9sYXN0T25BeGlzKCd5JylcblxuZXhwb3J0IGNvbnN0IEFpUGxheWVyID0gKCkgPT4ge1xuICBjb25zdCBjb21wdXRlciA9IFBsYXllcignQ29tcHV0ZXInLCBmYWxzZSlcbiAgY29uc3QgaGl0ID0gW11cbiAgbGV0IGhpdENlbGxzID0gW11cbiAgbGV0IGxhc3RIaXQgPSB7fVxuICBsZXQgZGlyZWN0aW9uID0gJydcblxuICBjb25zdCBmaW5kUmFuZG9tU3BvdFRvQXR0YWNrID0gKGJvYXJkKSA9PiB7XG4gICAgbGV0IFt5LCB4XSA9IGdldFJhbmRvbUNvb3JkcygpXG4gICAgd2hpbGUgKGJvYXJkLnN0YXRlW3kgLSAxXVt4IC0gMV0gPT09ICdoJyB8fCBib2FyZC5zdGF0ZVt5IC0gMV1beCAtIDFdID09PSAnbScpIHtcbiAgICAgIFt5LCB4XSA9IGdldFJhbmRvbUNvb3JkcygpXG4gICAgfVxuICAgIHJldHVybiB7IHksIHggfVxuICB9XG5cbiAgY29uc3QgX2ZpbmRTcG90QWZ0ZXJIaXQgPSAoYm9hcmQsIHksIHgpID0+IHtcbiAgICBsZXQgZGlyZWN0aW9ucyA9IE9iamVjdC5rZXlzKF9wb3RlbnRpYWxBdHRhY2tEaXJlY3Rpb25zKVxuICAgIGxldCByYW5kb21EaXJlY3Rpb24gPSBkaXJlY3Rpb25zW2dldFJhbmRvbUludGVnZXIoMCwgMyldXG4gICAgbGV0IHsgeTogcnksIHg6IHJ4IH0gPSBfcG90ZW50aWFsQXR0YWNrRGlyZWN0aW9uc1tyYW5kb21EaXJlY3Rpb25dKHksIHgpXG5cbiAgICB3aGlsZSAoIWJvYXJkLmlzVmFsaWRBdHRhY2tUYXJnZXQocnksIHJ4KSAmJiBkaXJlY3Rpb25zLmxlbmd0aCA+IDEpIHtcbiAgICAgIGRpcmVjdGlvbnMgPSByZW1vdmUocmFuZG9tRGlyZWN0aW9uLCBkaXJlY3Rpb25zKVxuICAgICAgcmFuZG9tRGlyZWN0aW9uID0gZGlyZWN0aW9uc1tnZXRSYW5kb21JbnRlZ2VyKDAsIGRpcmVjdGlvbnMubGVuZ3RoIC0gMSldXG4gICAgICBjb25zdCByYW5kb21Db29yZHMgPSBfcG90ZW50aWFsQXR0YWNrRGlyZWN0aW9uc1tyYW5kb21EaXJlY3Rpb25dKHksIHgpXG4gICAgICByeSA9IHJhbmRvbUNvb3Jkcy55XG4gICAgICByeCA9IHJhbmRvbUNvb3Jkcy54XG4gICAgfVxuICAgIGlmICghYm9hcmQuaXNWYWxpZEF0dGFja1RhcmdldChyeSwgcngpKSB7XG4gICAgICByZXR1cm4geyB2YWxpZGl0eTogZmFsc2UgfVxuICAgIH1cbiAgICByZXR1cm4geyB2YWxpZGl0eTogdHJ1ZSwgZGlyZWN0aW9uOiByYW5kb21EaXJlY3Rpb24sIHk6IHJ5LCB4OiByeCB9XG4gIH1cblxuICBjb25zdCBfZ2Fpbk9wcG9zaXRlRW5kID0gKCkgPT4ge1xuICAgIHN3aXRjaCAoX2lzU2hpcEhvcml6b250YWwoaGl0Q2VsbHMpKSB7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIGNvbnN0IGxlZnRtb3N0ID0gX2xlZnRtb3N0Q2VsbChoaXRDZWxscylcbiAgICAgICAgY29uc3QgcmlnaHRtb3N0ID0gX3JpZ2h0bW9zdENlbGwoaGl0Q2VsbHMpXG4gICAgICAgIHJldHVybiBsYXN0SGl0LnggPT09IGxlZnRtb3N0LnhcbiAgICAgICAgICA/IHJpZ2h0bW9zdFxuICAgICAgICAgIDogbGVmdG1vc3RcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGNvbnN0IHRvcG1vc3QgPSBfdG9wbW9zdENlbGwoaGl0Q2VsbHMpXG4gICAgICAgIGNvbnN0IGJvdHRvbW1vc3QgPSBfYm90dG9tbW9zdENlbGwoaGl0Q2VsbHMpXG4gICAgICAgIHJldHVybiBsYXN0SGl0LnkgPT09IHRvcG1vc3QueVxuICAgICAgICAgID8gYm90dG9tbW9zdFxuICAgICAgICAgIDogdG9wbW9zdFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYXR0YWNrUGxheWVyID0gKGJvYXJkLCB5LCB4KSA9PiB7XG4gICAgaWYgKHkgJiYgeCkge1xuICAgICAgY29tcHV0ZXIuYXR0YWNrKGJvYXJkLCB5LCB4KVxuICAgICAgY29uc3Qgc3RhdHVzID0gYm9hcmQuZ2V0QXR0YWNrU3RhdHVzKHksIHgpXG4gICAgICBpZiAoc3RhdHVzLnNoaXBTdGF0dXMgPT09ICdkYW1hZ2VkJykge1xuICAgICAgICBsYXN0SGl0ID0geyB5LCB4IH1cbiAgICAgICAgaGl0Q2VsbHMucHVzaChsYXN0SGl0KVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXR1c1xuICAgIH0gZWxzZSBpZiAobGFzdEhpdC55ICYmIGxhc3RIaXQueCAmJiBkaXJlY3Rpb24gIT09ICcnKSB7XG4gICAgICBjb25zdCB7IHk6IGh5LCB4OiBoeCB9ID0gbGFzdEhpdFxuICAgICAgY29uc3QgY29vcmRzRm9yQXR0YWNrID0gX3BvdGVudGlhbEF0dGFja0RpcmVjdGlvbnNbZGlyZWN0aW9uXShoeSwgaHgpXG4gICAgICBjb25zdCB7IHk6IGF5LCB4OiBheCB9ID0gY29vcmRzRm9yQXR0YWNrXG4gICAgICBpZiAoIWJvYXJkLmlzVmFsaWRBdHRhY2tUYXJnZXQoYXksIGF4KSkge1xuICAgICAgICBkaXJlY3Rpb24gPSBfZ2V0T3Bwb3NpdGVEaXJlY3Rpb24oZGlyZWN0aW9uKVxuICAgICAgICBsYXN0SGl0ID0gX2dhaW5PcHBvc2l0ZUVuZCgpXG4gICAgICAgIGlmICghYm9hcmQuaXNWYWxpZEF0dGFja1RhcmdldChfcG90ZW50aWFsQXR0YWNrRGlyZWN0aW9uc1tkaXJlY3Rpb25dKGxhc3RIaXQpKSkge1xuICAgICAgICAgIGRpcmVjdGlvbiA9ICcnXG4gICAgICAgICAgbGFzdEhpdCA9IHt9XG4gICAgICAgICAgaGl0Q2VsbHMgPSBbXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRhY2tQbGF5ZXIoYm9hcmQpXG4gICAgICB9XG4gICAgICBjb21wdXRlci5hdHRhY2soYm9hcmQsIGF5LCBheClcbiAgICAgIGNvbnN0IHN0YXR1cyA9IGJvYXJkLmdldEF0dGFja1N0YXR1cyhheSwgYXgpXG4gICAgICBpZiAoc3RhdHVzLnZhbHVlICE9PSAnaGl0Jykge1xuICAgICAgICBkaXJlY3Rpb24gPSBfZ2V0T3Bwb3NpdGVEaXJlY3Rpb24oZGlyZWN0aW9uKVxuICAgICAgICBsYXN0SGl0ID0gX2dhaW5PcHBvc2l0ZUVuZCgpXG4gICAgICB9XG4gICAgICBpZiAoc3RhdHVzLnNoaXBTdGF0dXMgPT09ICdkZXN0cm95ZWQnKSB7XG4gICAgICAgIGRpcmVjdGlvbiA9ICcnXG4gICAgICAgIGxhc3RIaXQgPSB7fVxuICAgICAgICBoaXRDZWxscyA9IFtdXG4gICAgICB9XG4gICAgICBpZiAoc3RhdHVzLnNoaXBTdGF0dXMgPT09ICdkYW1hZ2VkJykge1xuICAgICAgICBsYXN0SGl0ID0geyB5OiBheSwgeDogYXggfVxuICAgICAgICBoaXRDZWxscy5wdXNoKGxhc3RIaXQpXG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdHVzXG4gICAgfSBlbHNlIGlmIChsYXN0SGl0LnkgJiYgbGFzdEhpdC54KSB7XG4gICAgICBjb25zdCB7IHk6IGh5LCB4OiBoeCB9ID0gbGFzdEhpdFxuICAgICAgY29uc3QgY29vcmRzID0gX2ZpbmRTcG90QWZ0ZXJIaXQoYm9hcmQsIGh5LCBoeClcbiAgICAgIGlmICghY29vcmRzLnZhbGlkaXR5KSB7XG4gICAgICAgIGxhc3RIaXQgPSB7fVxuICAgICAgICBoaXRDZWxscyA9IFtdXG4gICAgICAgIHJldHVybiBhdHRhY2tQbGF5ZXIoYm9hcmQpXG4gICAgICB9XG4gICAgICBjb25zdCB7IHk6IGF5LCB4OiBheCB9ID0gY29vcmRzXG4gICAgICBkaXJlY3Rpb24gPSBjb29yZHMuZGlyZWN0aW9uXG4gICAgICBjb21wdXRlci5hdHRhY2soYm9hcmQsIGF5LCBheClcbiAgICAgIGNvbnN0IHN0YXR1cyA9IGJvYXJkLmdldEF0dGFja1N0YXR1cyhheSwgYXgpXG4gICAgICBpZiAoc3RhdHVzLnZhbHVlICE9PSAnaGl0Jykge1xuICAgICAgICByZXR1cm4gc3RhdHVzXG4gICAgICB9XG4gICAgICBsYXN0SGl0ID0geyB5OiBheSwgeDogYXggfVxuICAgICAgaGl0Q2VsbHMucHVzaChsYXN0SGl0KVxuICAgICAgcmV0dXJuIHN0YXR1c1xuICAgIH0gZWxzZSBpZiAoIShsYXN0SGl0LnkgJiYgbGFzdEhpdC54KSkge1xuICAgICAgY29uc3QgcmFuZG9tQ29vcmRzID0gZmluZFJhbmRvbVNwb3RUb0F0dGFjayhib2FyZClcbiAgICAgIGNvbnN0IHsgeSwgeCB9ID0gcmFuZG9tQ29vcmRzXG4gICAgICBjb21wdXRlci5hdHRhY2soYm9hcmQsIHksIHgpXG4gICAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMoeSwgeClcbiAgICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdoaXQnICYmIHN0YXR1cy5zaGlwU3RhdHVzID09PSAnZGFtYWdlZCcpIHtcbiAgICAgICAgbGFzdEhpdCA9IHsgeSwgeCB9XG4gICAgICAgIGhpdENlbGxzLnB1c2gobGFzdEhpdClcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0dXNcbiAgICB9XG4gIH1cblxuICBjb25zdCBzZXREaXJlY3Rpb24gPSAodmFsKSA9PiB7IGRpcmVjdGlvbiA9IHZhbCB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe1xuICAgIGZpbmRSYW5kb21TcG90VG9BdHRhY2ssXG4gICAgYXR0YWNrUGxheWVyLFxuICAgIHNldERpcmVjdGlvbixcbiAgICBnZXQgZGlyZWN0aW9uICgpIHsgcmV0dXJuIGRpcmVjdGlvbiB9LFxuICB9LCBjb21wdXRlcilcbn1cbiIsImltcG9ydCB7IHJlcGVhdCwgZmluZEluZGV4LCBwaXBlLCBtYXAsIGZsYXR0ZW4sIGRlY3JlbWVudCwgaW5jcmVtZW50LCBjdXJyeSB9IGZyb20gJy4uL3V0aWxzL2Z1bmNfaGVscGVycydcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnXG5cbmNvbnN0IF9XQVRFUiA9ICd3J1xuY29uc3QgX1NISVAgPSAncydcbmNvbnN0IF9NSVNTRUQgPSAnbSdcbmNvbnN0IF9ISVQgPSAnaCdcblxuY29uc3QgX2NyZWF0ZVJvdyA9ICgpID0+IHJlcGVhdCgoKSA9PiBfV0FURVIsIDEwKVxuY29uc3QgX2NyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHJlcGVhdChfY3JlYXRlUm93LCAxMClcblxuY29uc3QgX21hcENvb3JkcyA9IGN1cnJ5KChib2FyZCwgdmFsdWUsIGNvb3JkcykgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbLi4uYm9hcmRdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgeyB5LCB4IH0gPSBkZWNyZW1lbnQoY29vcmRzW2ldKVxuICAgIHJlc3VsdFt5XVt4XSA9IHZhbHVlXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuZXhwb3J0IGNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZmxlZXQgPSBbXVxuICBjb25zdCBtaXNzZWQgPSBbXVxuICBjb25zdCBoaXQgPSBbXVxuICBsZXQgcGxhbmUgPSAnaG9yaXpvbnRhbGx5J1xuICBsZXQgc3RhdGUgPSBfY3JlYXRlR2FtZWJvYXJkKClcblxuICBjb25zdCBfbWFwQm9hcmQgPSBfbWFwQ29vcmRzKHN0YXRlKVxuICBjb25zdCBfbWFwU2hpcCA9IF9tYXBCb2FyZChfU0hJUClcbiAgY29uc3QgX21hcE1pc3NlZCA9IF9tYXBCb2FyZChfTUlTU0VEKVxuICBjb25zdCBfbWFwSGl0ID0gX21hcEJvYXJkKF9ISVQpXG5cbiAgY29uc3QgX2ZpbmRTaGlwID0gKHksIHgpID0+XG4gICAgZmxlZXQuZmluZCgoc2hpcCkgPT4gc2hpcC5zZWdtZW50cy5maW5kKChzZWdtZW50KSA9PiBzZWdtZW50LnkgPT09IHkgJiYgc2VnbWVudC54ID09PSB4KSlcblxuICBjb25zdCBfZ2V0T2NjdXBpZWRDZWxscyA9ICgpID0+IHBpcGUoXG4gICAgbWFwKChzaGlwKSA9PiBzaGlwLnNlZ21lbnRzKSxcbiAgICBmbGF0dGVuXG4gICkoZmxlZXQpXG5cbiAgY29uc3QgX2lzT3ZlcmxhcHMgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGNvbnN0IG9jY3VwaWVkQ2VsbHMgPSBfZ2V0T2NjdXBpZWRDZWxscygpXG4gICAgaWYgKHBsYW5lID09PSAnaG9yaXpvbnRhbGx5JyAmJiBvY2N1cGllZENlbGxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHRhaWwgPSB4ICsgc2l6ZVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvY2N1cGllZENlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSB4OyBqIDwgdGFpbDsgaisrKSB7XG4gICAgICAgICAgaWYgKG9jY3VwaWVkQ2VsbHNbaV0ueSA9PT0geSAmJiBvY2N1cGllZENlbGxzW2ldLnggPT09IGopIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwbGFuZSA9PT0gJ3ZlcnRpY2FsbHknICYmIG9jY3VwaWVkQ2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdGFpbCA9IHkgKyBzaXplXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9jY3VwaWVkQ2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IHk7IGogPCB0YWlsOyBqKyspIHtcbiAgICAgICAgICBpZiAob2NjdXBpZWRDZWxsc1tpXS55ID09PSBqICYmIG9jY3VwaWVkQ2VsbHNbaV0ueCA9PT0geCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBfaXNPdmVyZmxvd3MgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGlmICgocGxhbmUgPT09ICdob3Jpem9udGFsbHknICYmIHggKyAtLXNpemUgPiAxMCkgfHxcbiAgICAgICAgKHBsYW5lID09PSAndmVydGljYWxseScgJiYgeSArIC0tc2l6ZSA+IDEwKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBfaXNBZGphY2VudFRvU2hpcHMgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGNvbnN0IFtkeSwgZHhdID0gZGVjcmVtZW50KFt5LCB4XSlcblxuICAgIGlmIChwbGFuZSA9PT0gJ2hvcml6b250YWxseScpIHtcbiAgICAgIGNvbnN0IHRhaWwgPSBkeCArIHNpemVcblxuICAgICAgZm9yIChsZXQgaSA9IGR4OyBpIDwgdGFpbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRvcENlbGwgPSBzdGF0ZVtkeSAtIDFdID8gc3RhdGVbZHkgLSAxXVtpXSA6IG51bGxcbiAgICAgICAgY29uc3QgYm90dG9tQ2VsbCA9IHN0YXRlW2R5ICsgMV0gPyBzdGF0ZVtkeSArIDFdW2ldIDogbnVsbFxuICAgICAgICBpZiAodG9wQ2VsbCA9PT0gX1NISVAgfHwgYm90dG9tQ2VsbCA9PT0gX1NISVApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxlZnRDZWxsID0gc3RhdGVbZHldW2R4IC0gMV1cbiAgICAgIGNvbnN0IHJpZ2h0Q2VsbCA9IHN0YXRlW2R5XVt0YWlsXVxuICAgICAgaWYgKGxlZnRDZWxsID09PSBfU0hJUCB8fCByaWdodENlbGwgPT09IF9TSElQKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRvcExlZnQgPSBzdGF0ZVtkeSAtIDFdID8gc3RhdGVbZHkgLSAxXVtkeCAtIDFdIDogbnVsbFxuICAgICAgY29uc3QgYm90dG9tTGVmdCA9IHN0YXRlW2R5ICsgMV0gPyBzdGF0ZVtkeSArIDFdW2R4IC0gMV0gOiBudWxsXG4gICAgICBjb25zdCB0b3BSaWdodCA9IHN0YXRlW2R5IC0gMV0gPyBzdGF0ZVtkeSAtIDFdW3RhaWxdIDogbnVsbFxuICAgICAgY29uc3QgYm90dG9tUmlnaHQgPSBzdGF0ZVtkeSArIDFdID8gc3RhdGVbZHkgKyAxXVt0YWlsXSA6IG51bGxcbiAgICAgIGlmICh0b3BMZWZ0ID09PSBfU0hJUCB8fCBib3R0b21MZWZ0ID09PSBfU0hJUCB8fCB0b3BSaWdodCA9PT0gX1NISVAgfHwgYm90dG9tUmlnaHQgPT09IF9TSElQKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwbGFuZSA9PT0gJ3ZlcnRpY2FsbHknKSB7XG4gICAgICBjb25zdCB0YWlsID0gZHkgKyBzaXplXG5cbiAgICAgIGNvbnN0IHRvcENlbGwgPSBzdGF0ZVtkeSAtIDFdID8gc3RhdGVbZHkgLSAxXVtkeF0gOiBudWxsXG4gICAgICBjb25zdCBib3R0b21DZWxsID0gc3RhdGVbdGFpbF0gPyBzdGF0ZVt0YWlsXVtkeF0gOiBudWxsXG4gICAgICBpZiAodG9wQ2VsbCA9PT0gX1NISVAgfHwgYm90dG9tQ2VsbCA9PT0gX1NISVApIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IGR5OyBpIDwgdGFpbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGxlZnRDZWxsID0gc3RhdGVbaV1bZHggLSAxXVxuICAgICAgICBjb25zdCByaWdodENlbGwgPSBzdGF0ZVtpXVtkeCArIDFdXG4gICAgICAgIGlmIChsZWZ0Q2VsbCA9PT0gX1NISVAgfHwgcmlnaHRDZWxsID09PSBfU0hJUCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgdG9wTGVmdCA9IHN0YXRlW2R5IC0gMV0gPyBzdGF0ZVtkeSAtIDFdW2R4IC0gMV0gOiBudWxsXG4gICAgICBjb25zdCB0b3BSaWdodCA9IHN0YXRlW2R5IC0gMV0gPyBzdGF0ZVtkeSAtIDFdW2R4ICsgMV0gOiBudWxsXG4gICAgICBjb25zdCBib3R0b21MZWZ0ID0gc3RhdGVbdGFpbF0gPyBzdGF0ZVt0YWlsXVtkeCAtIDFdIDogbnVsbFxuICAgICAgY29uc3QgYm90dG9tUmlnaHQgPSBzdGF0ZVt0YWlsXSA/IHN0YXRlW3RhaWxdW2R4ICsgMV0gOiBudWxsXG4gICAgICBpZiAodG9wTGVmdCA9PT0gX1NISVAgfHwgYm90dG9tTGVmdCA9PT0gX1NISVAgfHwgdG9wUmlnaHQgPT09IF9TSElQIHx8IGJvdHRvbVJpZ2h0ID09PSBfU0hJUCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IGlzVmFsaWRGb3JQbGFjZSA9ICh5LCB4LCBzaXplKSA9PiAoXG4gICAgIV9pc092ZXJsYXBzKHksIHgsIHNpemUpICYmXG4gICAgIV9pc092ZXJmbG93cyh5LCB4LCBzaXplKSAmJlxuICAgICFfaXNBZGphY2VudFRvU2hpcHMoeSwgeCwgc2l6ZSlcbiAgKVxuXG4gIGNvbnN0IHBsYWNlID0gKHksIHgsIHNpemUpID0+IHtcbiAgICBpZiAoIWlzVmFsaWRGb3JQbGFjZSh5LCB4LCBzaXplKSkgcmV0dXJuXG5cbiAgICBjb25zdCBzaGlwID0gU2hpcCh5LCB4LCBzaXplLCBwbGFuZSlcbiAgICBmbGVldC5wdXNoKHNoaXApXG4gICAgc3RhdGUgPSBfbWFwU2hpcChzaGlwLnNlZ21lbnRzKVxuICAgIHJldHVybiBzaGlwXG4gIH1cblxuICBjb25zdCBpc1ZhbGlkQXR0YWNrVGFyZ2V0ID0gKHksIHgpID0+IHtcbiAgICBjb25zdCBbZHksIGR4XSA9IGRlY3JlbWVudChbeSwgeF0pXG4gICAgY29uc3Qgcm93ID0gc3RhdGVbZHldXG4gICAgaWYgKHJvdykge1xuICAgICAgc3dpdGNoIChzdGF0ZVtkeV1bZHhdKSB7XG4gICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICBjYXNlICd3JzpcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh5LCB4KSA9PiB7XG4gICAgY29uc3QgaGl0U2hpcCA9IF9maW5kU2hpcCh5LCB4KVxuICAgIGlmICghaGl0U2hpcCkge1xuICAgICAgbWlzc2VkLnB1c2goeyB5LCB4IH0pXG4gICAgICBzdGF0ZSA9IF9tYXBNaXNzZWQoW3sgeSwgeCB9XSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBwaXBlKFxuICAgICAgZmluZEluZGV4KHNlZ21lbnQgPT4gc2VnbWVudC55ID09PSB5ICYmIHNlZ21lbnQueCA9PT0geCksXG4gICAgICBoaXRTaGlwLmhpdFxuICAgICkoaGl0U2hpcC5zZWdtZW50cylcbiAgICBoaXQucHVzaCh7IHksIHggfSlcbiAgICBzdGF0ZSA9IF9tYXBIaXQoW3sgeSwgeCB9XSlcbiAgfVxuXG4gIGNvbnN0IGdldEF0dGFja1N0YXR1cyA9ICh5LCB4KSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0geyB5LCB4IH1cbiAgICBjb25zdCBhdHRhY2tlZENlbGwgPSBzdGF0ZVt5IC0gMV1beCAtIDFdXG4gICAgc3dpdGNoIChhdHRhY2tlZENlbGwpIHtcbiAgICAgIGNhc2UgX01JU1NFRDpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyB2YWx1ZTogJ21pc3NlZCcgfSwgY29vcmRzKVxuICAgICAgY2FzZSBfSElUOlxuICAgICAgICBjb25zdCBzaGlwID0gX2ZpbmRTaGlwKHksIHgpXG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHsgdmFsdWU6ICdoaXQnLCBzaGlwOiBzaGlwLnR5cGUgfVxuICAgICAgICByZXR1cm4gc2hpcC5pc1N1bmsoKVxuICAgICAgICAgID8gT2JqZWN0LmFzc2lnbihzdGF0dXMsIGNvb3JkcywgeyBzaGlwU3RhdHVzOiAnZGVzdHJveWVkJyB9KVxuICAgICAgICAgIDogT2JqZWN0LmFzc2lnbihzdGF0dXMsIGNvb3JkcywgeyBzaGlwU3RhdHVzOiAnZGFtYWdlZCcgfSlcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyB2YWx1ZTogYXR0YWNrZWRDZWxsIH0sIGNvb3JkcylcbiAgfVxuXG4gIGNvbnN0IGlzU2hpcFN1bmsgPSAoeSwgeCkgPT4ge1xuICAgIGNvbnN0IHNoaXAgPSBfZmluZFNoaXAoeSwgeClcbiAgICByZXR1cm4gc2hpcCA/IHNoaXAuaXNTdW5rKCkgOiBmYWxzZVxuICB9XG5cbiAgY29uc3QgaXNGbGVldFN1bmsgPSAoKSA9PiBmbGVldC5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSlcblxuICBjb25zdCBzZXRQbGFuZSA9IChuZXdQbGFuZSkgPT4geyBwbGFuZSA9IG5ld1BsYW5lIH1cblxuICByZXR1cm4ge1xuICAgIGdldCBzdGF0ZSAoKSB7IHJldHVybiBzdGF0ZSB9LFxuICAgIGdldCBmbGVldCAoKSB7IHJldHVybiBmbGVldCB9LFxuICAgIGdldCBtaXNzZWQgKCkgeyByZXR1cm4gbWlzc2VkIH0sXG4gICAgZ2V0IGhpdCAoKSB7IHJldHVybiBoaXQgfSxcbiAgICBpc1ZhbGlkRm9yUGxhY2UsXG4gICAgcGxhY2UsXG4gICAgaXNWYWxpZEF0dGFja1RhcmdldCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldEF0dGFja1N0YXR1cyxcbiAgICBpc1NoaXBTdW5rLFxuICAgIGlzRmxlZXRTdW5rLFxuICAgIHNldFBsYW5lXG4gIH1cbn1cblxuZXhwb3J0IHsgX2NyZWF0ZUdhbWVib2FyZCB9XG4iLCJpbXBvcnQgeyBkZWNyZW1lbnQgfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5cbmV4cG9ydCBjb25zdCBQbGF5ZXIgPSAobmFtZSwgaXNGaXJzdCkgPT4ge1xuICBsZXQgdHVybiA9IGlzRmlyc3RcblxuICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4geyB0dXJuID0gIXR1cm4gfVxuXG4gIGNvbnN0IGF0dGFjayA9IChib2FyZCwgeSwgeCkgPT4ge1xuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soeSwgeClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMoeSwgeClcbiAgICBpZiAoc3RhdHVzLnZhbHVlICE9PSAnaGl0Jykge1xuICAgICAgY2hhbmdlVHVybigpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXQgbmFtZSAoKSB7IHJldHVybiBuYW1lIH0sXG4gICAgZ2V0IHR1cm4gKCkgeyByZXR1cm4gdHVybiB9LFxuICAgIGF0dGFjayxcbiAgICBjaGFuZ2VUdXJuXG4gIH1cbn1cbiIsImNvbnN0IF90eXBlcyA9IHtcbiAgMTogJ1BhdHJvbCBib2F0JyxcbiAgMjogJ0Rlc3Ryb3llcicsXG4gIDM6ICdDcnVpc2VyJyxcbiAgNDogJ0JhdHRsZXNoaXAnLFxuICA1OiAnQ2Fycmllcidcbn1cblxuY29uc3QgX3NlZ21lbnRzQ3JlYXRvciA9IHtcbiAgaG9yaXpvbnRhbGx5ICh5LCB4LCBzaXplKSB7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBzZWdtZW50c1tpXSA9IHsgeSwgeDogKHggKyBpKSwgaW50YWN0OiB0cnVlIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlZ21lbnRzXG4gIH0sXG4gIHZlcnRpY2FsbHkgKHksIHgsIHNpemUpIHtcbiAgICBjb25zdCBzZWdtZW50cyA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIHNlZ21lbnRzW2ldID0geyB5OiAoeSArIGkpLCB4LCBpbnRhY3Q6IHRydWUgfVxuICAgIH1cbiAgICByZXR1cm4gc2VnbWVudHNcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgU2hpcCA9ICh5LCB4LCBzaXplLCBwbGFuZSkgPT4ge1xuICBjb25zdCB0eXBlID0gX3R5cGVzW3NpemVdXG4gIGlmICh0eXBlID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignSW1wcm9wZXIgc2hpcCBzaXplJylcblxuICBjb25zdCBzZWdtZW50cyA9IF9zZWdtZW50c0NyZWF0b3JbcGxhbmVdKHksIHgsIHNpemUpXG5cbiAgcmV0dXJuIHtcbiAgICBnZXQgc2l6ZSAoKSB7IHJldHVybiBzaXplIH0sXG4gICAgZ2V0IHR5cGUgKCkgeyByZXR1cm4gdHlwZSB9LFxuICAgIGdldCBzZWdtZW50cyAoKSB7IHJldHVybiBzZWdtZW50cyB9LFxuICAgIGhpdCAoc2VnbWVudCkgeyBzZWdtZW50c1tzZWdtZW50XS5pbnRhY3QgPSBmYWxzZSB9LFxuICAgIGlzU3VuayAoKSB7IHJldHVybiBzZWdtZW50cy5ldmVyeSgoc2VnbWVudCkgPT4gc2VnbWVudC5pbnRhY3QgPT09IGZhbHNlKSB9XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBldmVudFR5cGVzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEJPQVJEX0hPVkVSRUQ6ICdCb2FyZCBob3ZlcmVkJyxcbiAgQk9BUkRfQ0xJQ0tFRDogJ0JvYXJkIGNsaWNrZWQnLFxuICBTSElQX1ZBTElEQVRFRDogJ1NoaXAgdmFsaWRhdGVkJyxcbiAgU0hJUF9ST1RBVEVEOiAnU2hpcCByb3RhdGVkJyxcbiAgU0hJUF9QTEFDRUQ6ICdTaGlwIHBsYWNlZCcsXG4gIFBMQVlFUlNfQ1JFQVRFRDogJ1BsYXllcnMgY3JlYXRlZCcsXG4gIEdBTUVfU1RBUlRFRDogJ0dhbWUgc3RhcnRlZCcsXG4gIENPTVBVVEVSX1BMQUNFRF9TSElQUzogJ0NvbXB1dGVyIHBsYWNlZCBzaGlwcycsXG4gIENPTVBVVEVSX0JPQVJEX0NMSUNLRUQ6ICdDb21wdXRlciBib2FyZCBjbGlja2VkJyxcbiAgQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQ6ICdDb21wdXRlciBib2FyZCBhdHRhY2tlZCcsXG4gIFBMQVlFUl9GSU5JU0hFRF9UVVJOOiAnUGxheWVyIG1hZGUgbW92ZScsXG4gIENPTVBVVEVSX0ZJTklTSEVEX1RVUk46ICdDb21wdXRlciBtYWRlIG1vdmUnLFxuICBHQU1FX0VOREVEOiAnR2FtZSBlbmRlZCdcbn0pXG4iLCJpbXBvcnQgeyBldmVudFR5cGVzIH0gZnJvbSAnLi9ldmVudF90eXBlcydcbmltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tICcuLi91dGlscy9ldmVudHNfaGFuZGxlcidcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4uL2ZhY3Rvcmllcy9wbGF5ZXInXG5pbXBvcnQgeyBBaVBsYXllciB9IGZyb20gJy4uL2ZhY3Rvcmllcy9haV9wbGF5ZXInXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuLi9mYWN0b3JpZXMvZ2FtZWJvYXJkJ1xuaW1wb3J0IHsgQWlHYW1lYm9hcmQgfSBmcm9tICcuLi9mYWN0b3JpZXMvYWlfZ2FtZWJvYXJkJ1xuaW1wb3J0IHsgYm9hcmRIYW5kbGVyIH0gZnJvbSAnLi4vdWkvZG9tX2JvYXJkJ1xuaW1wb3J0IHsgd3JhcEluRGl2IH0gZnJvbSAnLi4vdWkvZG9tX2Z1bmNzJ1xuXG47KGZ1bmN0aW9uIHVpTG9naWMgKCkge1xuICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydC1nYW1lJylcbiAgY29uc3QgbmFtZUlucCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItbmFtZScpXG4gIGNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyb3RhdGUnKVxuICBjb25zdCBsb2dEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9nJylcbiAgY29uc3QgaGludHNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGludHMnKVxuXG4gIGxldCBuYW1lSW5wdXRlZCA9IEJvb2xlYW4obmFtZUlucC52YWx1ZSlcbiAgbGV0IHNoaXBzUGxhY2VkID0gZmFsc2VcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBbc3RhcnRCdG4sIG5hbWVJbnAsIHJvdGF0ZUJ0bl0uZm9yRWFjaCgoZWwpID0+IHsgZWwuZGlzYWJsZWQgPSB0cnVlIH0pXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50VHlwZXMuR0FNRV9TVEFSVEVELCBuYW1lSW5wLnZhbHVlKVxuICAgIGhpbnRzRGl2LmlubmVyVGV4dCA9ICdHb29kIGx1Y2ssIEFkbWlyYWwhJ1xuICB9KVxuXG4gIHJvdGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZiAocm90YXRlQnRuLmRhdGFzZXQucGxhbmUgPT09ICd2ZXJ0aWNhbGx5Jykge1xuICAgICAgcm90YXRlQnRuLmRhdGFzZXQucGxhbmUgPSAnaG9yaXpvbnRhbGx5J1xuICAgICAgcm90YXRlQnRuLmlubmVyVGV4dCA9ICdIb3Jpem9udGFsJ1xuICAgIH0gZWxzZSBpZiAocm90YXRlQnRuLmRhdGFzZXQucGxhbmUgPT09ICdob3Jpem9udGFsbHknKSB7XG4gICAgICByb3RhdGVCdG4uZGF0YXNldC5wbGFuZSA9ICd2ZXJ0aWNhbGx5J1xuICAgICAgcm90YXRlQnRuLmlubmVyVGV4dCA9ICdWZXJ0aWNhbCdcbiAgICB9XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50VHlwZXMuU0hJUF9ST1RBVEVELCByb3RhdGVCdG4uZGF0YXNldC5wbGFuZSlcbiAgfSlcblxuICBuYW1lSW5wLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcbiAgICAoZS5jdXJyZW50VGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDApXG4gICAgICA/IG5hbWVJbnB1dGVkID0gdHJ1ZVxuICAgICAgOiBuYW1lSW5wdXRlZCA9IGZhbHNlXG4gICAgOyhuYW1lSW5wdXRlZCAmJiBzaGlwc1BsYWNlZClcbiAgICAgID8gc3RhcnRCdG4uZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgOiBzdGFydEJ0bi5kaXNhYmxlZCA9IHRydWVcbiAgfSlcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50VHlwZXMuU0hJUF9QTEFDRUQsICh7IGFyZVNoaXBzUGxhY2VkLCBzaGlwVHlwZSB9KSA9PiB7XG4gICAgOyhhcmVTaGlwc1BsYWNlZCgpKVxuICAgICAgPyBzaGlwc1BsYWNlZCA9IHRydWVcbiAgICAgIDogc2hpcHNQbGFjZWQgPSBmYWxzZVxuICAgIDsobmFtZUlucHV0ZWQgJiYgc2hpcHNQbGFjZWQpXG4gICAgICA/IHN0YXJ0QnRuLmRpc2FibGVkID0gZmFsc2VcbiAgICAgIDogc3RhcnRCdG4uZGlzYWJsZWQgPSB0cnVlXG4gICAgaGludHNEaXYuaW5uZXJUZXh0ID0gYCR7c2hpcFR5cGV9IGhhcyBiZWVuIHBsYWNlZC5gXG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudFR5cGVzLkNPTVBVVEVSX0ZJTklTSEVEX1RVUk4sICh7IHN0YXR1cyB9KSA9PiB7XG4gICAgaWYgKHN0YXR1cy52YWx1ZSA9PT0gJ21pc3NlZCcpIHtcbiAgICAgIGNvbnN0IGRpdiA9IHdyYXBJbkRpdignQ29tcHV0ZXIgbWlzc2VkLi4uJywgJ2xvZy1jb21wdXRlci1taXNzZWQnKVxuICAgICAgbG9nRGl2LnByZXBlbmQoZGl2KVxuICAgIH1cbiAgICBpZiAoc3RhdHVzLnZhbHVlID09PSAnaGl0Jykge1xuICAgICAgY29uc3QgZGl2ID0gd3JhcEluRGl2KGBDb21wdXRlciAke3N0YXR1cy5zaGlwU3RhdHVzfSB5b3VyICR7c3RhdHVzLnNoaXB9IWAsICdsb2ctY29tcHV0ZXItaGl0JylcbiAgICAgIGxvZ0Rpdi5wcmVwZW5kKGRpdilcbiAgICB9XG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudFR5cGVzLkNPTVBVVEVSX0JPQVJEX0FUVEFDS0VELCAoeyBzdGF0dXMsIG5hbWUgfSkgPT4ge1xuICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdtaXNzZWQnKSB7XG4gICAgICBjb25zdCBkaXYgPSB3cmFwSW5EaXYoYCR7bmFtZX0gbWlzc2VkLi4uYCwgJ2xvZy1wbGF5ZXItbWlzc2VkJylcbiAgICAgIGxvZ0Rpdi5wcmVwZW5kKGRpdilcbiAgICB9XG4gICAgaWYgKHN0YXR1cy52YWx1ZSA9PT0gJ2hpdCcpIHtcbiAgICAgIGNvbnN0IGRpdiA9IHdyYXBJbkRpdihgJHtuYW1lfSAke3N0YXR1cy5zaGlwU3RhdHVzfSAke3N0YXR1cy5zaGlwfSFgLCAnbG9nLXBsYXllci1oaXQnKVxuICAgICAgbG9nRGl2LnByZXBlbmQoZGl2KVxuICAgIH1cbiAgfSlcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50VHlwZXMuR0FNRV9FTkRFRCwgKG5hbWUpID0+IHtcbiAgICBoaW50c0Rpdi5pbm5lclRleHQgPSBgJHtuYW1lfSB3b24hYFxuICB9KVxufSkoKVxuXG47KGZ1bmN0aW9uIGJvYXJkVmlld0xvZ2ljICgpIHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWJvYXJkJylcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlci1ib2FyZCcpXG5cbiAgYm9hcmRIYW5kbGVyLmNyZWF0ZUJvYXJkKGZhbHNlLCBwbGF5ZXJCb2FyZClcbiAgYm9hcmRIYW5kbGVyLmNyZWF0ZUJvYXJkKHRydWUsIGNvbXB1dGVyQm9hcmQpXG5cbiAgY29uc3QgcmVuZGVyUGxheWVyID0gYm9hcmRIYW5kbGVyLnJlbmRlckJvYXJkKHBsYXllckJvYXJkKVxuICBjb25zdCByZW5kZXJDb21wdXRlciA9IGJvYXJkSGFuZGxlci5yZW5kZXJCb2FyZChjb21wdXRlckJvYXJkKVxuXG4gIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICBjb25zdCBjb29yZHMgPSBib2FyZEhhbmRsZXIuZXh0cmFjdENvb3JkcyhlLnRhcmdldClcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudFR5cGVzLkJPQVJEX0hPVkVSRUQsIGNvb3JkcylcbiAgICB9XG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudFR5cGVzLlNISVBfVkFMSURBVEVELCAoZGF0YSkgPT4ge1xuICAgIGJvYXJkSGFuZGxlci5oaWdobGlnaHRGdXR1cmVTaGlwKC4uLmRhdGEpXG4gIH0pXG5cbiAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSkge1xuICAgICAgY29uc3QgY29vcmRzID0gYm9hcmRIYW5kbGVyLmV4dHJhY3RDb29yZHMoZS50YXJnZXQpXG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRUeXBlcy5CT0FSRF9DTElDS0VELCBjb29yZHMpXG4gICAgfVxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub24oZXZlbnRUeXBlcy5TSElQX1BMQUNFRCwgKHsgc2hpcCB9KSA9PiB7XG4gICAgYm9hcmRIYW5kbGVyLnBsYWNlKC4uLnNoaXApXG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudFR5cGVzLkdBTUVfU1RBUlRFRCwgKCkgPT4ge1xuXG4gIH0pXG5cbiAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGJvYXJkSGFuZGxlci5jbGVhckhpZ2hsaWdodHMpXG5cbiAgZXZlbnRzSGFuZGxlci5vbkVhY2goW1xuICAgIGV2ZW50VHlwZXMuQ09NUFVURVJfUExBQ0VEX1NISVBTLFxuICAgIGV2ZW50VHlwZXMuQ09NUFVURVJfQk9BUkRfQVRUQUNLRURcbiAgXSwgKHsgc3RhdGUgfSkgPT4ge1xuICAgIHJlbmRlckNvbXB1dGVyKHN0YXRlKVxuICB9KVxuXG4gIGNvbXB1dGVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSkge1xuICAgICAgY29uc3QgY29vcmRzID0gYm9hcmRIYW5kbGVyLmV4dHJhY3RDb29yZHMoZS50YXJnZXQpXG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRUeXBlcy5DT01QVVRFUl9CT0FSRF9DTElDS0VELCBjb29yZHMpXG4gICAgfVxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub24oZXZlbnRUeXBlcy5DT01QVVRFUl9GSU5JU0hFRF9UVVJOLCAoeyBzdGF0ZSB9KSA9PiB7XG4gICAgcmVuZGVyUGxheWVyKHN0YXRlKVxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub24oZXZlbnRUeXBlcy5TSElQX1JPVEFURUQsIGJvYXJkSGFuZGxlci5zZXRQbGFuZSlcbn0pKClcblxuOyhmdW5jdGlvbiBnYW1lTG9naWMgKCkge1xuICBjb25zdCBzaGlwc1RvUGxhY2UgPSBbNSwgNCwgMywgMiwgMV1cbiAgY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKVxuICBjb25zdCBjb21wdXRlckJvYXJkID0gQWlHYW1lYm9hcmQoKVxuICAvLyB0ZW1wb3JhcnlcbiAgbGV0IHBsYXllclxuICBsZXQgY29tcHV0ZXJcbiAgbGV0IGdhbWVTdGFydGVkID0gZmFsc2VcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50VHlwZXMuQk9BUkRfSE9WRVJFRCwgKGNvb3JkcykgPT4ge1xuICAgIGlmIChnYW1lU3RhcnRlZCkgcmV0dXJuXG4gICAgY29uc3QgW3ksIHhdID0gY29vcmRzXG4gICAgY29uc3QgbmV4dFNoaXBTaXplID0gc2hpcHNUb1BsYWNlWzBdXG4gICAgY29uc3QgaXNWYWxpZCA9IHBsYXllckJvYXJkLmlzVmFsaWRGb3JQbGFjZSh5LCB4LCBuZXh0U2hpcFNpemUpXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50VHlwZXMuU0hJUF9WQUxJREFURUQsIFt5LCB4LCBuZXh0U2hpcFNpemUsIGlzVmFsaWRdKVxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub24oZXZlbnRUeXBlcy5CT0FSRF9DTElDS0VELCAoY29vcmRzKSA9PiB7XG4gICAgaWYgKGdhbWVTdGFydGVkKSByZXR1cm5cbiAgICBjb25zdCBbeSwgeF0gPSBjb29yZHNcbiAgICBjb25zdCBuZXh0U2hpcFNpemUgPSBzaGlwc1RvUGxhY2VbMF1cbiAgICBjb25zdCBpc1ZhbGlkID0gcGxheWVyQm9hcmQuaXNWYWxpZEZvclBsYWNlKHksIHgsIG5leHRTaGlwU2l6ZSlcbiAgICBpZiAoIWlzVmFsaWQpIHJldHVyblxuICAgIGNvbnN0IHNoaXAgPSBwbGF5ZXJCb2FyZC5wbGFjZSh5LCB4LCBuZXh0U2hpcFNpemUpXG4gICAgc2hpcHNUb1BsYWNlLnNoaWZ0KClcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRUeXBlcy5TSElQX1BMQUNFRCwge1xuICAgICAgc2hpcDogW3ksIHgsIG5leHRTaGlwU2l6ZV0sXG4gICAgICBzaGlwVHlwZTogc2hpcC50eXBlLFxuICAgICAgYXJlU2hpcHNQbGFjZWQgKCkgeyByZXR1cm4gc2hpcHNUb1BsYWNlLmxlbmd0aCA9PT0gMCB9XG4gICAgfSlcbiAgfSlcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50VHlwZXMuU0hJUF9ST1RBVEVELCBwbGF5ZXJCb2FyZC5zZXRQbGFuZSlcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50VHlwZXMuR0FNRV9TVEFSVEVELCAobmFtZSkgPT4ge1xuICAgIGdhbWVTdGFydGVkID0gdHJ1ZVxuICAgIHBsYXllciA9IFBsYXllcihuYW1lLCB0cnVlKVxuICAgIGNvbXB1dGVyID0gQWlQbGF5ZXIoKVxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VGbGVldCg1KVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudFR5cGVzLkNPTVBVVEVSX1BMQUNFRF9TSElQUywgeyBzdGF0ZTogY29tcHV0ZXJCb2FyZC5zdGF0ZSB9KVxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub24oZXZlbnRUeXBlcy5DT01QVVRFUl9CT0FSRF9DTElDS0VELCAoY29vcmRzKSA9PiB7XG4gICAgaWYgKCFnYW1lU3RhcnRlZCB8fCAhcGxheWVyLnR1cm4gfHwgIWNvbXB1dGVyQm9hcmQuaXNWYWxpZEF0dGFja1RhcmdldCguLi5jb29yZHMpKSByZXR1cm5cbiAgICBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyQm9hcmQsIC4uLmNvb3JkcylcbiAgICBjb25zdCBzdGF0dXMgPSBjb21wdXRlckJvYXJkLmdldEF0dGFja1N0YXR1cyguLi5jb29yZHMpXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50VHlwZXMuQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQsIHsgc3RhdGU6IGNvbXB1dGVyQm9hcmQuc3RhdGUsIHN0YXR1cywgbmFtZTogcGxheWVyLm5hbWUgfSlcbiAgICBpZiAoIXBsYXllci50dXJuKSB7XG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRUeXBlcy5QTEFZRVJfRklOSVNIRURfVFVSTiwgbnVsbClcbiAgICB9XG4gICAgaWYgKGNvbXB1dGVyQm9hcmQuaXNGbGVldFN1bmsoKSkge1xuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50VHlwZXMuR0FNRV9FTkRFRCwgcGxheWVyLm5hbWUpXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IGRlbGF5ID0gYXN5bmMgKG1zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKVxuICAgIH0pXG4gIH1cblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50VHlwZXMuUExBWUVSX0ZJTklTSEVEX1RVUk4sIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkZWxheSgyNTApXG4gICAgY29uc3Qgc3RhdHVzID0gY29tcHV0ZXIuYXR0YWNrUGxheWVyKHBsYXllckJvYXJkKVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudFR5cGVzLkNPTVBVVEVSX0ZJTklTSEVEX1RVUk4sIHsgc3RhdGU6IHBsYXllckJvYXJkLnN0YXRlLCBzdGF0dXMgfSlcbiAgICBpZiAoc3RhdHVzLnZhbHVlID09PSAnaGl0Jykge1xuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50VHlwZXMuUExBWUVSX0ZJTklTSEVEX1RVUk4sIG51bGwpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgcGxheWVyLmNoYW5nZVR1cm4oKVxuXG4gICAgaWYgKHBsYXllckJvYXJkLmlzRmxlZXRTdW5rKCkpIHtcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudFR5cGVzLkdBTUVfRU5ERUQsIGNvbXB1dGVyLm5hbWUpXG4gICAgfVxuICB9KVxufSkoKVxuIiwiaW1wb3J0IHsgZm9yRWFjaCwgcGlwZSwgZmlsdGVyLCBjdXJyeSB9IGZyb20gJy4uL3V0aWxzL2Z1bmNfaGVscGVycydcblxuY29uc3QgX2NlbGxDbGFzc2VzID0ge1xuICBzOiAnc2hpcCcsXG4gIHc6ICd3YXRlcicsXG4gIGg6ICdoaXQnLFxuICBtOiAnbWlzcydcbn1cblxuY29uc3QgX2NyZWF0ZUNlbGwgPSAoaXNIaWRkZW4sIHksIHgpID0+IHtcbiAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpXG4gIGNlbGwuZGF0YXNldC55ID0geVxuICBjZWxsLmRhdGFzZXQueCA9IHhcbiAgY2VsbC5jbGFzc0xpc3QuYWRkKCd3YXRlcicpXG4gIGlmIChpc0hpZGRlbikgY2VsbC5jbGFzc0xpc3QuYWRkKCdmb2ctb2Ytd2FyJylcbiAgcmV0dXJuIGNlbGxcbn1cblxuY29uc3QgX2NlbGxzRmluZGVyID0ge1xuICBob3Jpem9udGFsbHkgKHksIHgsIHNpemUpIHtcbiAgICBjb25zdCBzZWdtZW50cyA9IFtdXG4gICAgY29uc3QgdGFpbCA9IHggKyBzaXplXG4gICAgZm9yIChsZXQgaSA9IHg7IGkgPCB0YWlsOyBpKyspIHtcbiAgICAgIHNlZ21lbnRzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteT0nJHt5fSddW2RhdGEteD0nJHtpfSddYCkpXG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50c1xuICB9LFxuICB2ZXJ0aWNhbGx5ICh5LCB4LCBzaXplKSB7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBbXVxuICAgIGNvbnN0IHRhaWwgPSB5ICsgc2l6ZVxuICAgIGZvciAobGV0IGkgPSB5OyBpIDwgdGFpbDsgaSsrKSB7XG4gICAgICBzZWdtZW50cy5wdXNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXk9JyR7aX0nXVtkYXRhLXg9JyR7eH0nXWApKVxuICAgIH1cbiAgICByZXR1cm4gc2VnbWVudHNcbiAgfVxufVxuXG5jb25zdCBleHRyYWN0Q29vcmRzID0gKGNlbGwpID0+XG4gIFtjZWxsLmRhdGFzZXQueSwgY2VsbC5kYXRhc2V0LnhdLm1hcChjb29yZCA9PiBOdW1iZXIoY29vcmQpKVxuXG5leHBvcnQgY29uc3QgYm9hcmRIYW5kbGVyID0gKCgpID0+IHtcbiAgbGV0IHBsYW5lID0gJ2hvcml6b250YWxseSdcblxuICBjb25zdCBjcmVhdGVCb2FyZCA9IChpc0hpZGRlbiwgZG9tQm9hcmQpID0+IHtcbiAgICBmb3IgKGxldCB5ID0gMTsgeSA8IDExOyB5KyspIHtcbiAgICAgIGZvciAobGV0IHggPSAxOyB4IDwgMTE7IHgrKykge1xuICAgICAgICBkb21Cb2FyZC5hcHBlbmQoX2NyZWF0ZUNlbGwoaXNIaWRkZW4sIHksIHgpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlbmRlckJvYXJkID0gY3VycnkoKGRvbUJvYXJkLCBib2FyZFN0YXRlKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2VsbFN0YXRlID0gYm9hcmRTdGF0ZVtpXVtqXVxuICAgICAgICBjb25zdCBjZWxsVmlldyA9IGRvbUJvYXJkLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXk9JyR7aSArIDF9J11bZGF0YS14PScke2ogKyAxfSddYClcbiAgICAgICAgaWYgKCFjZWxsVmlldy5jbGFzc0xpc3QuY29udGFpbnMoX2NlbGxDbGFzc2VzW2NlbGxTdGF0ZV0pKSB7XG4gICAgICAgICAgY2VsbFZpZXcuY2xhc3NMaXN0LmFkZChfY2VsbENsYXNzZXNbY2VsbFN0YXRlXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBjb25zdCBjbGVhckhpZ2hsaWdodHMgPSAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpXG4gICAgLmZvckVhY2goKGVsKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdmdXR1cmUtc2hpcCcsICd3cm9uZy1wbGFjZW1lbnQnKSlcblxuICBjb25zdCBoaWdobGlnaHRGdXR1cmVTaGlwID0gKHksIHgsIHNpemUsIGlzVmFsaWQpID0+IHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSAoaXNWYWxpZCkgPyAnZnV0dXJlLXNoaXAnIDogJ3dyb25nLXBsYWNlbWVudCdcbiAgICBjb25zdCBzZWdtZW50cyA9IF9jZWxsc0ZpbmRlcltwbGFuZV0oeSwgeCwgc2l6ZSlcbiAgICBjbGVhckhpZ2hsaWdodHMoKVxuICAgIHBpcGUoXG4gICAgICBmaWx0ZXIoKGVsKSA9PiBCb29sZWFuKGVsKSksXG4gICAgICBmb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKVxuICAgICkoc2VnbWVudHMpXG4gIH1cblxuICBjb25zdCBwbGFjZSA9ICh5LCB4LCBzaXplKSA9PiB7XG4gICAgY29uc3Qgc2hpcFNlZ21lbnRzID0gX2NlbGxzRmluZGVyW3BsYW5lXSh5LCB4LCBzaXplKVxuICAgIHNoaXBTZWdtZW50cy5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpKVxuICB9XG5cbiAgY29uc3Qgc2V0UGxhbmUgPSAobmV3UGxhbmUpID0+IHsgcGxhbmUgPSBuZXdQbGFuZSB9XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVCb2FyZCxcbiAgICByZW5kZXJCb2FyZCxcbiAgICBzZXRQbGFuZSxcbiAgICBleHRyYWN0Q29vcmRzLFxuICAgIGhpZ2hsaWdodEZ1dHVyZVNoaXAsXG4gICAgY2xlYXJIaWdobGlnaHRzLFxuICAgIHBsYWNlXG4gIH1cbn0pKClcbiIsImNvbnN0IHdyYXBJbkRpdiA9IChzdHIsIC4uLmNsYXNzZXMpID0+IHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZGl2LmlubmVyVGV4dCA9IHN0clxuICBjbGFzc2VzLmZvckVhY2goKGNzc0NsYXNzKSA9PiBkaXYuY2xhc3NMaXN0LmFkZChjc3NDbGFzcykpXG4gIHJldHVybiBkaXZcbn1cblxuZXhwb3J0IHtcbiAgd3JhcEluRGl2XG59XG4iLCJleHBvcnQgY29uc3QgZXZlbnRzSGFuZGxlciA9ICgoKSA9PiB7XG4gIGNvbnN0IGV2ZW50cyA9IHt9XG5cbiAgcmV0dXJuIHtcbiAgICBvbiAoZXZlbnROYW1lLCBmbikge1xuICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXVxuICAgICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbilcbiAgICB9LFxuXG4gICAgb25FYWNoIChhcnJPZkV2ZW50cywgZm4pIHtcbiAgICAgIGFyck9mRXZlbnRzLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50c1tldmVudF0gPSBldmVudHNbZXZlbnRdIHx8IFtdXG4gICAgICAgIGV2ZW50c1tldmVudF0ucHVzaChmbilcbiAgICAgIH0pXG4gICAgfSxcblxuICAgIG9mZiAoZXZlbnROYW1lLCByZW1vdmVkRm4pIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdLmZpbHRlcigoZm4pID0+IGZuICE9PSByZW1vdmVkRm4pXG4gICAgICB9XG4gICAgfSxcblxuICAgIHRyaWdnZXIgKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goKGZuKSA9PiBmbihkYXRhKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pKClcbiIsImNvbnN0IGN1cnJ5ID0gKGZuKSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbiBjdXJyaWVkICguLi5hcmdzKSB7XG4gICAgaWYgKGZuLmxlbmd0aCAhPT0gYXJncy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBjdXJyaWVkLmJpbmQobnVsbCwgLi4uYXJncylcbiAgICB9XG4gICAgcmV0dXJuIGZuKC4uLmFyZ3MpXG4gIH1cbn1cblxuY29uc3QgY2hlY2tUcnV0aGluZXNzID0gKGVsKSA9PiBCb29sZWFuKGVsKVxuXG5jb25zdCBjaGVja0ZhbHNpbmVzcyA9IChlbCkgPT4gIWVsXG5cbmNvbnN0IGhhc1RydXRoeVZhbHVlcyA9IChhcnIpID0+IGFyci5zb21lKGNoZWNrVHJ1dGhpbmVzcylcblxuY29uc3QgaGFzRmFsc3lWYWx1ZXMgPSAoYXJyKSA9PiBhcnIuc29tZShjaGVja0ZhbHNpbmVzcylcblxuY29uc3QgcmVwbGFjZUV2ZXJ5TnRoID0gY3VycnkoKG50aCwgc3RhcnQsIHVudGlsLCB2YWx1ZSwgYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFsuLi5hcnJdXG4gIGNvbnN0IHMgPSAodHlwZW9mIHN0YXJ0ID09PSAnbnVtYmVyJykgPyBzdGFydCA6IG50aCAtIDFcbiAgY29uc3QgbGVuID0gdW50aWwgfHwgYXJyLmxlbmd0aFxuICBmb3IgKGxldCBpID0gczsgaSA8IGxlbjsgaSArPSBudGgpIHtcbiAgICByZXN1bHRbaV0gPSB2YWx1ZVxuICB9XG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IHJlcGxhY2VBdCA9IGN1cnJ5KChpbmRleCwgdmFsdWUsIGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbLi4uYXJyXVxuICByZXN1bHRbaW5kZXhdID0gdmFsdWVcbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuY29uc3QgbWFwID0gY3VycnkoKGZuLCBmdW5jdG9yKSA9PiB7XG4gIGxldCByZXN1bHRcbiAgc3dpdGNoIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZnVuY3RvcikpIHtcbiAgICBjYXNlICdbb2JqZWN0IEFycmF5XSc6XG4gICAgICByZXN1bHQgPSBbXVxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGZ1bmN0b3IpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goZm4oaXRlbSkpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgY2FzZSAnW29iamVjdCBPYmplY3RdJzpcbiAgICAgIHJlc3VsdCA9IHt9XG4gICAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMoZnVuY3RvcikpIHtcbiAgICAgICAgcmVzdWx0W3Byb3BdID0gZm4oZnVuY3Rvcltwcm9wXSlcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRcbiAgfVxufSlcblxuY29uc3QgcGlwZSA9ICguLi5mdW5jdGlvbnMpID0+XG4gICh2YWx1ZSkgPT4gZnVuY3Rpb25zLnJlZHVjZSgoYWNjLCBmbikgPT4gZm4oYWNjKSwgdmFsdWUpXG5cbmNvbnN0IGRlY3JlbWVudCA9IG1hcCgobikgPT4gKHR5cGVvZiBuID09PSAnbnVtYmVyJykgPyBuIC0gMSA6IG4pXG5cbmNvbnN0IGRlY3JlbWVudEVhY2ggPSBtYXAoZGVjcmVtZW50KVxuXG5jb25zdCBpbmNyZW1lbnQgPSBtYXAoKG4pID0+ICh0eXBlb2YgbiA9PT0gJ251bWJlcicpID8gbiArIDEgOiBuKVxuXG5jb25zdCBpbmNyZW1lbnRFYWNoID0gbWFwKGluY3JlbWVudClcblxuY29uc3QgcmVwZWF0ID0gY3VycnkoKGZuLCBudW0pID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbnVtKSB7XG4gICAgcmVzdWx0W2ldID0gZm4oaSlcbiAgICBpKytcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCBmaW5kID0gY3VycnkoKGZuLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBpZiAoZm4oYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIGFycltpXVxuICAgIH1cbiAgICBpKytcbiAgfVxufSlcblxuY29uc3QgZmluZEluZGV4ID0gY3VycnkoKGZuLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBpZiAoZm4oYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIGlcbiAgICB9XG4gICAgaSsrXG4gIH1cbn0pXG5cbmNvbnN0IGZvckVhY2ggPSBjdXJyeSgoZm4sIGFycikgPT4ge1xuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIGZuKGFycltpXSlcbiAgICBpKytcbiAgfVxuICByZXR1cm4gYXJyXG59KVxuXG5jb25zdCBmbGF0dGVuID0gY3VycnkoKGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBjb25zdCBpbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBpbGVuKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnJbaV0pID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICBjb25zdCBqYXJyID0gZmxhdHRlbihhcnJbaV0pXG4gICAgICBjb25zdCBqbGVuID0gamFyci5sZW5ndGhcbiAgICAgIGxldCBqID0gMFxuICAgICAgd2hpbGUgKGogPCBqbGVuKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGphcnJbal0pXG4gICAgICAgIGorK1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChhcnJbaV0pXG4gICAgfVxuICAgIGkrK1xuICB9XG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IGZpbHRlciA9IGN1cnJ5KChmbiwgYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgaWYgKGZuKGFycltpXSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGFycltpXSlcbiAgICB9XG4gICAgaSsrXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuY29uc3Qgb2JqRXF1YWwgPSBjdXJyeSgob2JqMSwgb2JqMikgPT4ge1xuICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMob2JqMSkpIHtcbiAgICBpZiAob2JqMVtwcm9wXSAhPT0gb2JqMltwcm9wXSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59KVxuXG5jb25zdCBvYmplY3RJbkFycmF5ID0gY3VycnkoKG9iaiwgYXJyKSA9PiB7XG4gIGZvciAoY29uc3QgY3VycmVudE9iaiBvZiBhcnIpIHtcbiAgICBpZiAob2JqRXF1YWwoY3VycmVudE9iaiwgb2JqKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59KVxuXG5jb25zdCByZW1vdmUgPSBjdXJyeSgoaXRlbSwgYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFsuLi5hcnJdXG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChhcnJbaV0gPT09IGl0ZW0pIHtcbiAgICAgIHJlc3VsdC5zcGxpY2UoaSwgMSlcbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuZXhwb3J0IHsgaGFzVHJ1dGh5VmFsdWVzLCByZXBsYWNlRXZlcnlOdGgsIHJlcGxhY2VBdCwgcGlwZSwgbWFwLCBjdXJyeSwgZGVjcmVtZW50LCBkZWNyZW1lbnRFYWNoLCBpbmNyZW1lbnQsIGluY3JlbWVudEVhY2gsIHJlcGVhdCwgZmluZCwgZmluZEluZGV4LCBmb3JFYWNoLCBoYXNGYWxzeVZhbHVlcywgZmxhdHRlbiwgZmlsdGVyLCBvYmpFcXVhbCwgb2JqZWN0SW5BcnJheSwgcmVtb3ZlIH1cbiIsImNvbnN0IGdldFJhbmRvbUludGVnZXIgPSAobWluLCBtYXgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW5cblxuY29uc3QgZ2V0UmFuZG9tQ29vcmRzID0gKCkgPT4ge1xuICBjb25zdCB5ID0gZ2V0UmFuZG9tSW50ZWdlcigxLCAxMClcbiAgY29uc3QgeCA9IGdldFJhbmRvbUludGVnZXIoMSwgMTApXG4gIHJldHVybiBbeSwgeF1cbn1cblxuZXhwb3J0IHsgZ2V0UmFuZG9tSW50ZWdlciwgZ2V0UmFuZG9tQ29vcmRzIH1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lKEdwLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufSIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcblxuICBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcblxuICB2YXIgX3MsIF9lO1xuXG4gIHRyeSB7XG4gICAgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheVdpdGhvdXRIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhvdXRIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlU3ByZWFkIGZyb20gXCIuL25vbkl0ZXJhYmxlU3ByZWFkLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGVzL3N0eWxlLmNzcydcbmltcG9ydCAnLi9mYWN0b3JpZXMvc2hpcCdcbmltcG9ydCAnLi91aS9kb21fYm9hcmQnXG5pbXBvcnQgJy4vbG9naWMvZ2FtZV9oYW5kbGVyJ1xuIl0sIm5hbWVzIjpbIkdhbWVib2FyZCIsImdldFJhbmRvbUludGVnZXIiLCJnZXRSYW5kb21Db29yZHMiLCJfZ2V0UmFuZG9tUGxhbmUiLCJBaUdhbWVib2FyZCIsImdhbWVib2FyZCIsIl9wbGFjZVNoaXBBdFJhbmRvbSIsInNpemUiLCJwbGFuZSIsInkiLCJ4Iiwic2V0UGxhbmUiLCJpc1ZhbGlkRm9yUGxhY2UiLCJwbGFjZSIsInBsYWNlRmxlZXQiLCJPYmplY3QiLCJhc3NpZ24iLCJQbGF5ZXIiLCJjdXJyeSIsInJlbW92ZSIsIl9wb3RlbnRpYWxBdHRhY2tEaXJlY3Rpb25zIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiX2dldE9wcG9zaXRlRGlyZWN0aW9uIiwiZGlyZWN0aW9uIiwiX2lzU2hpcEhvcml6b250YWwiLCJoaXRDZWxscyIsImxlbmd0aCIsIl9maXJzdE9uQXhpcyIsImF4aXMiLCJyZWR1Y2UiLCJwcmV2IiwibmV4dCIsIl9sYXN0T25BeGlzIiwiX2xlZnRtb3N0Q2VsbCIsIl9yaWdodG1vc3RDZWxsIiwiX3RvcG1vc3RDZWxsIiwiX2JvdHRvbW1vc3RDZWxsIiwiQWlQbGF5ZXIiLCJjb21wdXRlciIsImhpdCIsImxhc3RIaXQiLCJmaW5kUmFuZG9tU3BvdFRvQXR0YWNrIiwiYm9hcmQiLCJzdGF0ZSIsIl9maW5kU3BvdEFmdGVySGl0IiwiZGlyZWN0aW9ucyIsImtleXMiLCJyYW5kb21EaXJlY3Rpb24iLCJyeSIsInJ4IiwiaXNWYWxpZEF0dGFja1RhcmdldCIsInJhbmRvbUNvb3JkcyIsInZhbGlkaXR5IiwiX2dhaW5PcHBvc2l0ZUVuZCIsImxlZnRtb3N0IiwicmlnaHRtb3N0IiwidG9wbW9zdCIsImJvdHRvbW1vc3QiLCJhdHRhY2tQbGF5ZXIiLCJhdHRhY2siLCJzdGF0dXMiLCJnZXRBdHRhY2tTdGF0dXMiLCJzaGlwU3RhdHVzIiwicHVzaCIsImh5IiwiaHgiLCJjb29yZHNGb3JBdHRhY2siLCJheSIsImF4IiwidmFsdWUiLCJjb29yZHMiLCJzZXREaXJlY3Rpb24iLCJ2YWwiLCJyZXBlYXQiLCJmaW5kSW5kZXgiLCJwaXBlIiwibWFwIiwiZmxhdHRlbiIsImRlY3JlbWVudCIsImluY3JlbWVudCIsIlNoaXAiLCJfV0FURVIiLCJfU0hJUCIsIl9NSVNTRUQiLCJfSElUIiwiX2NyZWF0ZVJvdyIsIl9jcmVhdGVHYW1lYm9hcmQiLCJfbWFwQ29vcmRzIiwicmVzdWx0IiwiaSIsImZsZWV0IiwibWlzc2VkIiwiX21hcEJvYXJkIiwiX21hcFNoaXAiLCJfbWFwTWlzc2VkIiwiX21hcEhpdCIsIl9maW5kU2hpcCIsImZpbmQiLCJzaGlwIiwic2VnbWVudHMiLCJzZWdtZW50IiwiX2dldE9jY3VwaWVkQ2VsbHMiLCJfaXNPdmVybGFwcyIsIm9jY3VwaWVkQ2VsbHMiLCJ0YWlsIiwiaiIsIl9pc092ZXJmbG93cyIsIl9pc0FkamFjZW50VG9TaGlwcyIsImR5IiwiZHgiLCJ0b3BDZWxsIiwiYm90dG9tQ2VsbCIsImxlZnRDZWxsIiwicmlnaHRDZWxsIiwidG9wTGVmdCIsImJvdHRvbUxlZnQiLCJ0b3BSaWdodCIsImJvdHRvbVJpZ2h0Iiwicm93IiwicmVjZWl2ZUF0dGFjayIsImhpdFNoaXAiLCJhdHRhY2tlZENlbGwiLCJ0eXBlIiwiaXNTdW5rIiwiaXNTaGlwU3VuayIsImlzRmxlZXRTdW5rIiwiZXZlcnkiLCJuZXdQbGFuZSIsIm5hbWUiLCJpc0ZpcnN0IiwidHVybiIsImNoYW5nZVR1cm4iLCJfdHlwZXMiLCJfc2VnbWVudHNDcmVhdG9yIiwiaG9yaXpvbnRhbGx5IiwiaW50YWN0IiwidmVydGljYWxseSIsInVuZGVmaW5lZCIsIkVycm9yIiwiZXZlbnRUeXBlcyIsImZyZWV6ZSIsIkJPQVJEX0hPVkVSRUQiLCJCT0FSRF9DTElDS0VEIiwiU0hJUF9WQUxJREFURUQiLCJTSElQX1JPVEFURUQiLCJTSElQX1BMQUNFRCIsIlBMQVlFUlNfQ1JFQVRFRCIsIkdBTUVfU1RBUlRFRCIsIkNPTVBVVEVSX1BMQUNFRF9TSElQUyIsIkNPTVBVVEVSX0JPQVJEX0NMSUNLRUQiLCJDT01QVVRFUl9CT0FSRF9BVFRBQ0tFRCIsIlBMQVlFUl9GSU5JU0hFRF9UVVJOIiwiQ09NUFVURVJfRklOSVNIRURfVFVSTiIsIkdBTUVfRU5ERUQiLCJldmVudHNIYW5kbGVyIiwiYm9hcmRIYW5kbGVyIiwid3JhcEluRGl2IiwidWlMb2dpYyIsInN0YXJ0QnRuIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibmFtZUlucCIsInJvdGF0ZUJ0biIsImxvZ0RpdiIsImhpbnRzRGl2IiwibmFtZUlucHV0ZWQiLCJCb29sZWFuIiwic2hpcHNQbGFjZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZm9yRWFjaCIsImVsIiwiZGlzYWJsZWQiLCJ0cmlnZ2VyIiwiaW5uZXJUZXh0IiwiZGF0YXNldCIsImUiLCJjdXJyZW50VGFyZ2V0Iiwib24iLCJhcmVTaGlwc1BsYWNlZCIsInNoaXBUeXBlIiwiZGl2IiwicHJlcGVuZCIsImJvYXJkVmlld0xvZ2ljIiwicGxheWVyQm9hcmQiLCJjb21wdXRlckJvYXJkIiwiY3JlYXRlQm9hcmQiLCJyZW5kZXJQbGF5ZXIiLCJyZW5kZXJCb2FyZCIsInJlbmRlckNvbXB1dGVyIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJleHRyYWN0Q29vcmRzIiwiZGF0YSIsImhpZ2hsaWdodEZ1dHVyZVNoaXAiLCJjbGVhckhpZ2hsaWdodHMiLCJvbkVhY2giLCJnYW1lTG9naWMiLCJzaGlwc1RvUGxhY2UiLCJwbGF5ZXIiLCJnYW1lU3RhcnRlZCIsIm5leHRTaGlwU2l6ZSIsImlzVmFsaWQiLCJzaGlmdCIsImRlbGF5IiwibXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJmaWx0ZXIiLCJfY2VsbENsYXNzZXMiLCJzIiwidyIsImgiLCJtIiwiX2NyZWF0ZUNlbGwiLCJpc0hpZGRlbiIsImNlbGwiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwiX2NlbGxzRmluZGVyIiwiY29vcmQiLCJOdW1iZXIiLCJkb21Cb2FyZCIsImFwcGVuZCIsImJvYXJkU3RhdGUiLCJjZWxsU3RhdGUiLCJjZWxsVmlldyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjbGFzc05hbWUiLCJzaGlwU2VnbWVudHMiLCJzdHIiLCJjbGFzc2VzIiwiY3NzQ2xhc3MiLCJldmVudHMiLCJldmVudE5hbWUiLCJmbiIsImFyck9mRXZlbnRzIiwiZXZlbnQiLCJvZmYiLCJyZW1vdmVkRm4iLCJjdXJyaWVkIiwiYXJncyIsImJpbmQiLCJjaGVja1RydXRoaW5lc3MiLCJjaGVja0ZhbHNpbmVzcyIsImhhc1RydXRoeVZhbHVlcyIsImFyciIsInNvbWUiLCJoYXNGYWxzeVZhbHVlcyIsInJlcGxhY2VFdmVyeU50aCIsIm50aCIsInN0YXJ0IiwidW50aWwiLCJsZW4iLCJyZXBsYWNlQXQiLCJpbmRleCIsImZ1bmN0b3IiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJpdGVtIiwicHJvcCIsImZ1bmN0aW9ucyIsImFjYyIsIm4iLCJkZWNyZW1lbnRFYWNoIiwiaW5jcmVtZW50RWFjaCIsIm51bSIsImlsZW4iLCJqYXJyIiwiamxlbiIsIm9iakVxdWFsIiwib2JqMSIsIm9iajIiLCJvYmplY3RJbkFycmF5Iiwib2JqIiwiY3VycmVudE9iaiIsInNwbGljZSIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSJdLCJzb3VyY2VSb290IjoiIn0=