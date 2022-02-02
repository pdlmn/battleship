/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@babel/runtime/regenerator/index.js":
/*!***********************************************************!*\
  !*** ../node_modules/@babel/runtime/regenerator/index.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "../node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./constants/cell_states.js":
/*!**********************************!*\
  !*** ./constants/cell_states.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "states": () => (/* binding */ states)
/* harmony export */ });
var states = Object.freeze({
  WATER: 'w',
  SHIP: 's',
  MISSED: 'm',
  HIT: 'h',
  SUNK: 'x',
  AROUND_SUNK: 'a'
});

/***/ }),

/***/ "./constants/event_types.js":
/*!**********************************!*\
  !*** ./constants/event_types.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "events": () => (/* binding */ events)
/* harmony export */ });
var events = Object.freeze({
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
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./factories/gameboard.js");
/* harmony import */ var _utils_helper_funcs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helper_funcs */ "./utils/helper_funcs.js");



var _getRandomPlane = function _getRandomPlane() {
  return (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(1, 2) === 1 ? 'horizontally' : 'vertically';
};

var AiGameboard = function AiGameboard() {
  var gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();

  var _placeShipAtRandom = function _placeShipAtRandom(size) {
    var plane = _getRandomPlane();

    var coords = (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_1__.getRandomCoords)();
    gameboard.setPlane(plane);

    while (!gameboard.isValidForPlace(coords.y, coords.x, size)) {
      coords = (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_1__.getRandomCoords)();
    }

    gameboard.place(coords.y, coords.x, size);
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
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./factories/player.js");
/* harmony import */ var _constants_cell_states__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/cell_states */ "./constants/cell_states.js");
/* harmony import */ var _utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/helper_funcs */ "./utils/helper_funcs.js");
/* harmony import */ var _utils_func_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/func_helpers */ "./utils/func_helpers.js");




var _attackDirections = {
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
  return hitCells.length > 1 ? hitCells[0].y === hitCells[1].y : false;
};

var _getEndOnAxis = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_3__.curry)(function (axis, getLast, hitCells) {
  var comparisonOp = getLast ? _utils_func_helpers__WEBPACK_IMPORTED_MODULE_3__.gt : _utils_func_helpers__WEBPACK_IMPORTED_MODULE_3__.lt;
  return hitCells.reduce(function (prev, next) {
    return comparisonOp(prev[axis], next[axis]) ? prev : next;
  });
});

var _getLeftmost = _getEndOnAxis('x', false);

var _getRightmost = _getEndOnAxis('x', true);

var _getTopmost = _getEndOnAxis('y', false);

var _getBottommost = _getEndOnAxis('y', true);

var AiPlayer = function AiPlayer() {
  var computer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)('Computer', false);
  var hitCells = [];
  var lastHit = {};
  var direction = '';

  var _findRandomSpotToAttack = function _findRandomSpotToAttack(board) {
    var coords = (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__.getRandomCoords)();

    while ([_constants_cell_states__WEBPACK_IMPORTED_MODULE_1__.states.HIT, _constants_cell_states__WEBPACK_IMPORTED_MODULE_1__.states.MISSED, _constants_cell_states__WEBPACK_IMPORTED_MODULE_1__.states.SUNK, _constants_cell_states__WEBPACK_IMPORTED_MODULE_1__.states.AROUND_SUNK].includes(board.state[coords.y - 1][coords.x - 1])) {
      coords = (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__.getRandomCoords)();
    }

    return {
      y: coords.y,
      x: coords.x
    };
  };

  var _findSpotAfterHit = function _findSpotAfterHit(board, y, x) {
    var directions = Object.keys(_attackDirections);
    var randomDirection = directions[(0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__.getRandomInteger)(0, 3)];

    var _attackDirections$ran = _attackDirections[randomDirection](y, x),
        ry = _attackDirections$ran.y,
        rx = _attackDirections$ran.x;

    while (!board.isValidTarget(ry, rx) && directions.length > 1) {
      directions = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_3__.remove)(randomDirection, directions);
      randomDirection = directions[(0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_2__.getRandomInteger)(0, directions.length - 1)];

      var randomCoords = _attackDirections[randomDirection](y, x);

      ry = randomCoords.y;
      rx = randomCoords.x;
    }

    if (!board.isValidTarget(ry, rx)) {
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
    var leftmost;
    var rightmost;
    var topmost;
    var bottommost;

    switch (_isShipHorizontal(hitCells)) {
      case true:
        leftmost = _getLeftmost(hitCells);
        rightmost = _getRightmost(hitCells);
        return lastHit.x === leftmost.x ? rightmost : leftmost;

      case false:
        topmost = _getTopmost(hitCells);
        bottommost = _getBottommost(hitCells);
        return lastHit.y === topmost.y ? bottommost : topmost;

      default:
        return {};
    }
  };

  var _attackSpecificSpot = function _attackSpecificSpot(board, y, x) {
    computer.attack(board, y, x);
    var status = board.getAttackStatus(y, x);
    return status;
  };

  var _attackInDirection = function _attackInDirection(board) {
    var coords = _attackDirections[direction](lastHit.y, lastHit.x);

    if (!board.isValidTarget(coords.y, coords.x)) {
      direction = _getOppositeDirection(direction);
      lastHit = _gainOppositeEnd();

      if (!board.isValidTarget(_attackDirections[direction](lastHit.y, lastHit.x))) {
        direction = '';
      }

      return attackPlayer(board);
    }

    computer.attack(board, coords.y, coords.x);
    var status = board.getAttackStatus(coords.y, coords.x);

    if (status.value !== 'hit') {
      direction = _getOppositeDirection(direction);
      lastHit = _gainOppositeEnd();
    }

    return status;
  };

  var _attackAfterHit = function _attackAfterHit(board) {
    var coords = _findSpotAfterHit(board, lastHit.y, lastHit.x);

    if (!coords.validity) {
      lastHit = {};
      hitCells = [];
      return attackPlayer(board);
    }

    direction = coords.direction;
    computer.attack(board, coords.y, coords.x);
    var status = board.getAttackStatus(coords.y, coords.x);

    if (status.value !== 'hit') {
      return status;
    }

    lastHit = {
      y: coords.y,
      x: coords.x
    };
    hitCells.push(lastHit);
    return status;
  };

  var _attackRandomCell = function _attackRandomCell(board) {
    var randomCoords = _findRandomSpotToAttack(board);

    computer.attack(board, randomCoords.y, randomCoords.x);
    var status = board.getAttackStatus(randomCoords.y, randomCoords.x);
    return status;
  };

  var attackPlayer = function attackPlayer(board, y, x) {
    var status;

    if (y && x) {
      status = _attackSpecificSpot(board, y, x);
    } else if (lastHit.y && lastHit.x && direction !== '') {
      status = _attackInDirection(board);
    } else if (lastHit.y && lastHit.x) {
      status = _attackAfterHit(board);
    } else if (!(lastHit.y && lastHit.x)) {
      status = _attackRandomCell(board);
    }

    if (status.shipStatus === 'damaged') {
      lastHit = {
        y: status.y,
        x: status.x
      };
      hitCells.push(lastHit);
    }

    if (status.shipStatus === 'destroyed') {
      direction = '';
      lastHit = {};
      hitCells = [];
    }

    return status;
  };

  var setDirection = function setDirection(val) {
    direction = val;
  };

  return {
    attackPlayer: attackPlayer,
    setDirection: setDirection,

    get direction() {
      return direction;
    },

    get name() {
      return computer.name;
    },

    get type() {
      return computer.type;
    }

  };
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
/* harmony import */ var _constants_cell_states__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/cell_states */ "./constants/cell_states.js");






var _createRow = function _createRow() {
  return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.repeat)(function () {
    return _constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.WATER;
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

var _coordsToIndexes = function _coordsToIndexes(y, x) {
  return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.decrement)([y, x]);
};

var Gameboard = function Gameboard() {
  var fleet = [];
  var missed = [];
  var plane = 'horizontally';

  var state = _createGameboard();

  var _mapBoard = _mapCoords(state);

  var _mapShip = _mapBoard(_constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.SHIP);

  var _mapMissed = _mapBoard(_constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.MISSED);

  var _mapHit = _mapBoard(_constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.HIT);

  var _mapSunk = _mapBoard(_constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.SUNK);

  var _mapAround = _mapBoard(_constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.AROUND_SUNK);

  var _findShip = function _findShip(y, x) {
    return fleet.find(function (ship) {
      return ship.segments.find(function (segment) {
        return segment.y === y && segment.x === x;
      });
    });
  };

  var _getSegments = function _getSegments(ship) {
    return ship.segments;
  };

  var _isShipSunk = function _isShipSunk(ship) {
    return ship.isSunk();
  };

  var _getShipCells = function _getShipCells() {
    return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.pipe)((0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.map)(_getSegments), _utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.flatten)(fleet);
  };

  var _getSunkCells = function _getSunkCells() {
    return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.pipe)((0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.filter)(_isShipSunk), (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.map)(_getSegments), _utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.flatten, (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.map)(function (cell) {
      return {
        y: cell.y,
        x: cell.x
      };
    }))(fleet);
  };

  var _anyShip = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.any)((0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.eq)(_constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.SHIP));

  var isFleetSunk = function isFleetSunk() {
    return fleet.every(_isShipSunk);
  };

  var _isOverlaps = function _isOverlaps(y, x, size) {
    var occupiedCells = _getShipCells();

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

  var _getCellState = function _getCellState(y, x) {
    var _coordsToIndexes2 = _coordsToIndexes(y, x),
        _coordsToIndexes3 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_coordsToIndexes2, 2),
        iy = _coordsToIndexes3[0],
        ix = _coordsToIndexes3[1];

    var row = state[iy];
    return row ? state[iy][ix] : null;
  };

  var _isAdjacentToShips = function _isAdjacentToShips(y, x, size) {
    if (plane === 'horizontally') {
      var tail = x + size;

      for (var i = x; i < tail; i++) {
        var topCell = _getCellState(y - 1, i);

        var bottomCell = _getCellState(y + 1, i);

        if (_anyShip([topCell, bottomCell])) {
          return true;
        }
      }

      var leftCell = _getCellState(y, x - 1);

      var rightCell = _getCellState(y, tail);

      if (_anyShip([leftCell, rightCell])) {
        return true;
      }

      var topLeft = _getCellState(y - 1, x - 1);

      var bottomLeft = _getCellState(y + 1, x - 1);

      var topRight = _getCellState(y - 1, tail);

      var bottomRight = _getCellState(y + 1, tail);

      if (_anyShip([topLeft, bottomLeft, topRight, bottomRight])) {
        return true;
      }
    }

    if (plane === 'vertically') {
      var _tail2 = y + size;

      var _topCell = _getCellState(y - 1, x);

      var _bottomCell = _getCellState(_tail2, x);

      if (_anyShip([_topCell, _bottomCell])) {
        return true;
      }

      for (var _i2 = y; _i2 < _tail2; _i2++) {
        var _leftCell = _getCellState(_i2, x - 1);

        var _rightCell = _getCellState(_i2, x + 1);

        if (_anyShip([_leftCell, _rightCell])) {
          return true;
        }
      }

      var _topLeft = _getCellState(y - 1, x - 1);

      var _topRight = _getCellState(y - 1, x + 1);

      var _bottomLeft = _getCellState(_tail2, x - 1);

      var _bottomRight = _getCellState(_tail2, x + 1);

      if (_anyShip([_topLeft, _bottomLeft, _topRight, _bottomRight])) {
        return true;
      }
    }

    return false;
  };

  var _getSurroundingCells = function _getSurroundingCells(_ref) {
    var y = _ref.y,
        x = _ref.x;
    return [{
      y: y - 1,
      x: x
    }, {
      y: y + 1,
      x: x
    }, {
      y: y,
      x: x - 1
    }, {
      y: y,
      x: x + 1
    }, {
      y: y - 1,
      x: x - 1
    }, {
      y: y + 1,
      x: x + 1
    }, {
      y: y - 1,
      x: x + 1
    }, {
      y: y + 1,
      x: x - 1
    }];
  };

  var _isCellValid = function _isCellValid(_ref2) {
    var y = _ref2.y,
        x = _ref2.x;
    return !(0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.any)(function (axis) {
      return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.gt)(axis, 10) || (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.lt)(axis, 1);
    }, [x, y]);
  };

  var getAreaAroundSunk = function getAreaAroundSunk() {
    var sunkCells = _getSunkCells();

    return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.pipe)((0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.map)(_getSurroundingCells), _utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.flatten, (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.filter)(function (cell) {
      return !(0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.objectInArray)(cell, sunkCells);
    }), (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.filter)(_isCellValid), _utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.removeDuplicateObj)(sunkCells);
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

  var isValidTarget = function isValidTarget(y, x) {
    var _coordsToIndexes4 = _coordsToIndexes(y, x),
        _coordsToIndexes5 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_coordsToIndexes4, 2),
        iy = _coordsToIndexes5[0],
        ix = _coordsToIndexes5[1];

    var row = state[iy];

    if (row) {
      switch (state[iy][ix]) {
        case _constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.SHIP:
        case _constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.WATER:
          return true;

        case _constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.MISSED:
        case _constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.HIT:
        case _constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.SUNK:
        case _constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.AROUND_SUNK:
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

    var hitSegmentIndex = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.findIndex)(function (segment) {
      return segment.y === y && segment.x === x;
    }, hitShip.segments);
    hitShip.hit(hitSegmentIndex);

    if (hitShip.isSunk()) {
      state = _mapSunk(hitShip.segments);
      state = _mapAround(getAreaAroundSunk());
    } else {
      state = _mapHit([{
        y: y,
        x: x
      }]);
    }
  };

  var getAttackStatus = function getAttackStatus(y, x) {
    var coords = {
      y: y,
      x: x
    };

    var attackedCell = _getCellState(y, x);

    var ship;
    var status;

    switch (attackedCell) {
      case _constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.MISSED:
        return Object.assign({
          value: 'missed'
        }, coords);

      case _constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.HIT:
      case _constants_cell_states__WEBPACK_IMPORTED_MODULE_4__.states.SUNK:
        ship = _findShip(y, x);
        status = {
          value: 'hit',
          ship: ship.type
        };
        return ship.isSunk() ? Object.assign(status, coords, {
          shipStatus: 'destroyed'
        }) : Object.assign(status, coords, {
          shipStatus: 'damaged'
        });

      default:
        return Object.assign({
          value: attackedCell
        }, coords);
    }
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

    isValidForPlace: isValidForPlace,
    place: place,
    isValidTarget: isValidTarget,
    receiveAttack: receiveAttack,
    getAttackStatus: getAttackStatus,
    getAreaAroundSunk: getAreaAroundSunk,
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
var Player = function Player(name, isFirst) {
  var type = isFirst ? 'player' : 'computer';
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

    get type() {
      return type;
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

  var hit = function hit(segment) {
    segments[segment].intact = false;
  };

  var isSunk = function isSunk() {
    return segments.every(function (segment) {
      return segment.intact === false;
    });
  };

  return {
    hit: hit,
    isSunk: isSunk,

    get size() {
      return size;
    },

    get type() {
      return type;
    },

    get segments() {
      return segments;
    }

  };
};

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
/* harmony import */ var _constants_event_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/event_types */ "./constants/event_types.js");
/* harmony import */ var _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/events_handler */ "./utils/events_handler.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../factories/player */ "./factories/player.js");
/* harmony import */ var _factories_ai_player__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../factories/ai_player */ "./factories/ai_player.js");
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../factories/gameboard */ "./factories/gameboard.js");
/* harmony import */ var _factories_ai_gameboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../factories/ai_gameboard */ "./factories/ai_gameboard.js");
/* harmony import */ var _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../ui/dom_board */ "./ui/dom_board.js");
/* harmony import */ var _ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ui/dom_funcs */ "./ui/dom_funcs.js");
/* harmony import */ var _utils_helper_funcs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/helper_funcs */ "./utils/helper_funcs.js");














(function uiLogic() {
  var startBtn = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.queryDocument)('#start-game');
  var restartBtn = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.queryDocument)('#restart-game');
  var nameInp = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.queryDocument)('#player-name');
  var nameInpDiv = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.queryDocument)('#input-name');
  var rotateBtn = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.queryDocument)('#rotate');
  var logDiv = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.queryDocument)('#log');
  var hintsDiv = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.queryDocument)('#hints');
  var nameInputed = Boolean(nameInp.value);
  var shipsPlaced = false;
  startBtn.disabled = true;
  startBtn.addEventListener('click', function () {
    ;
    [nameInp, nameInpDiv].forEach(function (el) {
      return (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.addClass)('hidden', el);
    });
    [startBtn, rotateBtn].forEach(function (el) {
      return (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.addClass)('display-none', el);
    });
    (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.removeClass)('display-none', logDiv.parentNode);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_STARTED, nameInp.value);
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

    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_ROTATED, rotateBtn.dataset.plane);
  });
  nameInp.addEventListener('input', function (e) {
    e.currentTarget.value.length > 0 ? nameInputed = true : nameInputed = false;
    nameInputed && shipsPlaced ? startBtn.disabled = false : startBtn.disabled = true;
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_PLACED, function (_ref) {
    var areShipsPlaced = _ref.areShipsPlaced,
        shipType = _ref.shipType;
    ;
    areShipsPlaced ? shipsPlaced = true : shipsPlaced = false;
    nameInputed && shipsPlaced ? startBtn.disabled = false : startBtn.disabled = true;
    hintsDiv.innerText = "".concat(shipType, " has been placed.");
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.onEach([_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_BOARD_ATTACKED, _constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_FINISHED_TURN], function (_ref2) {
    var status = _ref2.status,
        player = _ref2.player;
    var logClass = "log-".concat(player.type, "-").concat(status.shipStatus || status.value);
    var msg;

    if (status.value === 'missed') {
      msg = "".concat(status.y, " ").concat(status.x, ". ").concat(player.name, " missed...");
    }

    if (status.value === 'hit') {
      msg = "".concat(status.y, " ").concat(status.x, ". ").concat(player.name, " ").concat(status.shipStatus, " ").concat(status.ship, "!");
    }

    var div = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.wrapInDiv)(msg, [logClass]);
    logDiv.prepend(div);
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_ENDED, function (name) {
    hintsDiv.innerText = "".concat(name, " won!");
    (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.removeClass)('hidden', restartBtn);
  });
})();

(function boardViewLogic() {
  var playerBoard = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.queryDocument)('#player-board');
  var computerBoard = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_11__.queryDocument)('#computer-board');
  _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.createBoard(false, playerBoard);
  _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.createBoard(true, computerBoard);
  var renderPlayer = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.renderBoard(playerBoard);
  var renderComputer = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.renderBoard(computerBoard);
  playerBoard.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('cell')) {
      var coords = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.extractCoords(e.target);
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.BOARD_HOVERED, coords);
    }
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_VALIDATED, function (data) {
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.highlightFutureShip.apply(_ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(data));
  });
  playerBoard.addEventListener('click', function (e) {
    if (e.target.classList.contains('cell')) {
      var coords = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.extractCoords(e.target);
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.BOARD_CLICKED, coords);
    }
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_PLACED, function (_ref3) {
    var ship = _ref3.ship;
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.place.apply(_ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(ship));
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_STARTED, function () {
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.displayBoard(computerBoard);
  });
  playerBoard.addEventListener('mouseleave', _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.clearHighlights);
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.onEach([_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_PLACED_SHIPS, _constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_BOARD_ATTACKED], function (_ref4) {
    var state = _ref4.state;
    renderComputer(state);
  });
  computerBoard.addEventListener('click', function (e) {
    if (e.target.classList.contains('cell')) {
      var coords = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.extractCoords(e.target);
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_BOARD_CLICKED, coords);
    }
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_FINISHED_TURN, function (_ref5) {
    var state = _ref5.state;
    renderPlayer(state);
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_ROTATED, _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.setPlane);
})();

(function gameLogic() {
  var shipsToPlace = [5, 4, 3, 2, 1];
  var playerBoard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_8__.Gameboard)();
  var computerBoard = (0,_factories_ai_gameboard__WEBPACK_IMPORTED_MODULE_9__.AiGameboard)(); // temporary

  var player;
  var computer;
  var gameStarted = false;
  var gameEnded = false;
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.BOARD_HOVERED, function (coords) {
    if (shipsToPlace.length === 0) return;

    var _coords = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(coords, 2),
        y = _coords[0],
        x = _coords[1];

    var nextShipSize = shipsToPlace[0];
    var isValid = playerBoard.isValidForPlace(y, x, nextShipSize);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_VALIDATED, [y, x, nextShipSize, isValid]);
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.BOARD_CLICKED, function (coords) {
    if (shipsToPlace.length === 0) return;

    var _coords2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(coords, 2),
        y = _coords2[0],
        x = _coords2[1];

    var nextShipSize = shipsToPlace[0];
    var isValid = playerBoard.isValidForPlace(y, x, nextShipSize);
    if (!isValid) return;
    var ship = playerBoard.place(y, x, nextShipSize);
    shipsToPlace.shift();
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_PLACED, {
      ship: [y, x, nextShipSize],
      shipType: ship.type,
      areShipsPlaced: shipsToPlace.length === 0
    });
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_ROTATED, playerBoard.setPlane);
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_STARTED, function (name) {
    gameStarted = true;
    player = (0,_factories_player__WEBPACK_IMPORTED_MODULE_6__.Player)(name, true);
    computer = (0,_factories_ai_player__WEBPACK_IMPORTED_MODULE_7__.AiPlayer)();
    computerBoard.placeFleet(5);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_PLACED_SHIPS, {
      state: computerBoard.state
    });
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_BOARD_CLICKED, function (coords) {
    var _player;

    if (!gameStarted || gameEnded || !player.turn || !computerBoard.isValidTarget.apply(computerBoard, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(coords))) return;

    (_player = player).attack.apply(_player, [computerBoard].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(coords)));

    var status = computerBoard.getAttackStatus.apply(computerBoard, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(coords));
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_BOARD_ATTACKED, {
      state: computerBoard.state,
      status: status,
      player: player
    });

    if (!player.turn) {
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.PLAYER_FINISHED_TURN, null);
    }

    if (computerBoard.isFleetSunk()) {
      gameEnded = true;
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_ENDED, player.name);
    }
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.PLAYER_FINISHED_TURN, /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
    var status;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_12__.delay)(250);

          case 2:
            status = computer.attackPlayer(playerBoard);
            _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_FINISHED_TURN, {
              state: playerBoard.state,
              status: status,
              player: computer
            });

            if (!(status.value === 'hit')) {
              _context.next = 7;
              break;
            }

            _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.PLAYER_FINISHED_TURN, null);
            return _context.abrupt("return");

          case 7:
            player.changeTurn();

            if (playerBoard.isFleetSunk()) {
              gameEnded = true;
              _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_ENDED, computer.name);
            }

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
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
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/func_helpers */ "./utils/func_helpers.js");
/* harmony import */ var _dom_funcs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom_funcs */ "./ui/dom_funcs.js");



var _cellTable = {
  s: 'ship',
  w: 'water',
  h: 'hit',
  m: 'miss',
  x: 'sunk',
  a: 'around-sunk'
};

var _cellClasses = Object.values(_cellTable);

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
var boardHandler = function () {
  var plane = 'horizontally';

  var extractCoords = function extractCoords(cell) {
    return [cell.dataset.y, cell.dataset.x].map(function (coord) {
      return Number(coord);
    });
  };

  var createBoard = function createBoard(isHidden, domBoard) {
    for (var y = 1; y < 11; y++) {
      for (var x = 1; x < 11; x++) {
        domBoard.append(_createCell(isHidden, y, x));
      }
    }
  };

  var renderBoard = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (domBoard, boardState) {
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var cellState = boardState[i][j];
        var cellView = domBoard.querySelector("[data-y='".concat(i + 1, "'][data-x='").concat(j + 1, "']"));

        if (!cellView.classList.contains(_cellTable[cellState])) {
          var _cellView$classList;

          (_cellView$classList = cellView.classList).remove.apply(_cellView$classList, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_cellClasses));

          cellView.classList.add(_cellTable[cellState]);
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
    (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.pipe)((0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.filter)(function (el) {
      return Boolean(el);
    }), (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.forEach)(function (el) {
      return el.classList.add(className);
    }))(segments);
  };

  var displayBoard = function displayBoard(board) {
    (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_2__.removeClass)('display-none', board);
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
    displayBoard: displayBoard,
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
/* harmony export */   "wrapInDiv": () => (/* binding */ wrapInDiv),
/* harmony export */   "createEl": () => (/* binding */ createEl),
/* harmony export */   "addId": () => (/* binding */ addId),
/* harmony export */   "addClass": () => (/* binding */ addClass),
/* harmony export */   "removeClass": () => (/* binding */ removeClass),
/* harmony export */   "replaceClass": () => (/* binding */ replaceClass),
/* harmony export */   "addDataAttr": () => (/* binding */ addDataAttr),
/* harmony export */   "cssSelector": () => (/* binding */ cssSelector),
/* harmony export */   "queryDocument": () => (/* binding */ queryDocument)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/func_helpers */ "./utils/func_helpers.js");


var wrapInDiv = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (str, classes) {
  var _div$classList;

  var div = document.createElement('div');
  div.innerText = str;

  (_div$classList = div.classList).add.apply(_div$classList, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(classes));

  return div;
});
var createEl = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (classes, element) {
  var _el$classList;

  var el = document.createElement(element);

  (_el$classList = el.classList).add.apply(_el$classList, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(classes));

  return el;
});
var addId = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (id, element) {
  element.id = id;
  return element;
});
var addClass = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (newClass, element) {
  element.classList.add(newClass);
  return element;
});
var removeClass = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (removed, element) {
  element.classList.remove(removed);
  return element;
});
var replaceClass = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (oldClass, newClass, element) {
  element.classList.replace(oldClass, newClass);
  return element;
});
var addDataAttr = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (dataAttr, dataVal, element) {
  element[dataAttr] = dataVal;
  return element;
});
var cssSelector = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (element, query) {
  return element.querySelector(query);
});
var queryDocument = cssSelector(document);


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
/* harmony export */   "removeDuplicateObj": () => (/* binding */ removeDuplicateObj),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "gt": () => (/* binding */ gt),
/* harmony export */   "lt": () => (/* binding */ lt),
/* harmony export */   "gte": () => (/* binding */ gte),
/* harmony export */   "lte": () => (/* binding */ lte),
/* harmony export */   "eq": () => (/* binding */ eq),
/* harmony export */   "all": () => (/* binding */ all),
/* harmony export */   "any": () => (/* binding */ any),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "modify": () => (/* binding */ modify)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");



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
  var result = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(arr);

  var s = typeof start === 'number' ? start : nth - 1;
  var len = until || arr.length;

  for (var i = s; i < len; i += nth) {
    result[i] = value;
  }

  return result;
});
var replaceAt = curry(function (index, value, arr) {
  var result = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(arr);

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
var isArray = curry(function (val) {
  return val !== null && Object.prototype.toString.call(val) === '[object Array]';
});
var isObject = curry(function (val) {
  return Object.prototype.toString.call(val) === '[object Object]';
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

var decrement = curry(function (val) {
  return isArray(val) || isObject(val) ? map(function (n) {
    return typeof n === 'number' ? n - 1 : n;
  }, val) : val - 1;
});
var decrementEach = map(decrement);
var increment = curry(function (val) {
  return isArray(val) || isObject(val) ? map(function (n) {
    return typeof n === 'number' ? n + 1 : n;
  }, val) : val + 1;
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
var removeDuplicateObj = curry(function (arr) {
  var len = arr.length;
  if (len <= 1) return arr;
  var result = [];
  var occurances = 0;

  for (var i = 0; i < len; i++) {
    if (!objectInArray(arr[i], result)) {
      result.push(arr[i]);
    }
  }

  return result;
});
var remove = curry(function (item, arr) {
  var result = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(arr);

  var len = arr.length;

  for (var i = 0; i < len; i++) {
    if (arr[i] === item) {
      result.splice(i, 1);
      return result;
    }
  }

  return result;
});
var gt = curry(function (a, b) {
  return a > b;
});
var lt = curry(function (a, b) {
  return a < b;
});
var gte = curry(function (a, b) {
  return a >= b;
});
var lte = curry(function (a, b) {
  return a <= b;
});
var eq = curry(function (a, b) {
  return a === b;
});
var all = curry(function (pred, arr) {
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    if (!pred(arr[i])) {
      return false;
    }
  }

  return true;
});
var any = curry(function (pred, arr) {
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    if (pred(arr[i])) {
      return true;
    }
  }

  return false;
});
var modify = curry(function (prop, fn, obj) {
  return Object.assign({}, obj, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, prop, fn(obj[prop])));
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
/* harmony export */   "getRandomCoords": () => (/* binding */ getRandomCoords),
/* harmony export */   "delay": () => (/* binding */ delay)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);



var getRandomInteger = function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomCoords = function getRandomCoords() {
  var y = getRandomInteger(1, 10);
  var x = getRandomInteger(1, 10);
  return {
    y: y,
    x: x
  };
};

var delay = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(ms) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
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
    return _ref.apply(this, arguments);
  };
}();



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

/***/ "../node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
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
/* harmony import */ var _logic_game_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic/game_handler */ "./logic/game_handler.js");


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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QUNBOztBQUVBOztBQUVBO0FBQ0EsNEJBQTRCLCtCQUErQjtBQUMzRDs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDNUJlO0FBQ2Y7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRmU7QUFDZjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRmlEO0FBQ1k7QUFDWTtBQUN0QjtBQUNwQztBQUNmLFNBQVMsOERBQWMsU0FBUyxvRUFBb0IsWUFBWSwwRUFBMEIsWUFBWSwrREFBZTtBQUNySDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ051RDtBQUNKO0FBQ3NCO0FBQ2xCO0FBQ3hDO0FBQ2YsU0FBUyxpRUFBaUIsU0FBUywrREFBZSxTQUFTLDBFQUEwQixTQUFTLGlFQUFpQjtBQUMvRzs7Ozs7Ozs7Ozs7Ozs7OztBQ05xRDtBQUN0QztBQUNmO0FBQ0Esb0NBQW9DLGdFQUFnQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQSxzRkFBc0YsZ0VBQWdCO0FBQ3RHOzs7Ozs7VUNSQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29uc3RhbnRzL2NlbGxfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL2NvbnN0YW50cy9ldmVudF90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9mYWN0b3JpZXMvYWlfZ2FtZWJvYXJkLmpzIiwid2VicGFjazovLy8uL2ZhY3Rvcmllcy9haV9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovLy8uL2xvZ2ljL2dhbWVfaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi91aS9kb21fYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vdWkvZG9tX2Z1bmNzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2V2ZW50c19oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2Z1bmNfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9oZWxwZXJfZnVuY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL3N0eWxlLmNzcz9kZjA2Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJleHBvcnQgY29uc3Qgc3RhdGVzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIFdBVEVSOiAndycsXG4gIFNISVA6ICdzJyxcbiAgTUlTU0VEOiAnbScsXG4gIEhJVDogJ2gnLFxuICBTVU5LOiAneCcsXG4gIEFST1VORF9TVU5LOiAnYSdcbn0pXG4iLCJleHBvcnQgY29uc3QgZXZlbnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEJPQVJEX0hPVkVSRUQ6ICdCb2FyZCBob3ZlcmVkJyxcbiAgQk9BUkRfQ0xJQ0tFRDogJ0JvYXJkIGNsaWNrZWQnLFxuICBTSElQX1ZBTElEQVRFRDogJ1NoaXAgdmFsaWRhdGVkJyxcbiAgU0hJUF9ST1RBVEVEOiAnU2hpcCByb3RhdGVkJyxcbiAgU0hJUF9QTEFDRUQ6ICdTaGlwIHBsYWNlZCcsXG4gIFBMQVlFUlNfQ1JFQVRFRDogJ1BsYXllcnMgY3JlYXRlZCcsXG4gIEdBTUVfU1RBUlRFRDogJ0dhbWUgc3RhcnRlZCcsXG4gIENPTVBVVEVSX1BMQUNFRF9TSElQUzogJ0NvbXB1dGVyIHBsYWNlZCBzaGlwcycsXG4gIENPTVBVVEVSX0JPQVJEX0NMSUNLRUQ6ICdDb21wdXRlciBib2FyZCBjbGlja2VkJyxcbiAgQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQ6ICdDb21wdXRlciBib2FyZCBhdHRhY2tlZCcsXG4gIFBMQVlFUl9GSU5JU0hFRF9UVVJOOiAnUGxheWVyIG1hZGUgbW92ZScsXG4gIENPTVBVVEVSX0ZJTklTSEVEX1RVUk46ICdDb21wdXRlciBtYWRlIG1vdmUnLFxuICBHQU1FX0VOREVEOiAnR2FtZSBlbmRlZCdcbn0pXG4iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCdcbmltcG9ydCB7IGdldFJhbmRvbUludGVnZXIsIGdldFJhbmRvbUNvb3JkcyB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcl9mdW5jcydcblxuY29uc3QgX2dldFJhbmRvbVBsYW5lID0gKCkgPT4ge1xuICByZXR1cm4gZ2V0UmFuZG9tSW50ZWdlcigxLCAyKSA9PT0gMSA/ICdob3Jpem9udGFsbHknIDogJ3ZlcnRpY2FsbHknXG59XG5cbmV4cG9ydCBjb25zdCBBaUdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKClcblxuICBjb25zdCBfcGxhY2VTaGlwQXRSYW5kb20gPSAoc2l6ZSkgPT4ge1xuICAgIGNvbnN0IHBsYW5lID0gX2dldFJhbmRvbVBsYW5lKClcbiAgICBsZXQgY29vcmRzID0gZ2V0UmFuZG9tQ29vcmRzKClcbiAgICBnYW1lYm9hcmQuc2V0UGxhbmUocGxhbmUpXG4gICAgd2hpbGUgKCFnYW1lYm9hcmQuaXNWYWxpZEZvclBsYWNlKGNvb3Jkcy55LCBjb29yZHMueCwgc2l6ZSkpIHtcbiAgICAgIGNvb3JkcyA9IGdldFJhbmRvbUNvb3JkcygpXG4gICAgfVxuICAgIGdhbWVib2FyZC5wbGFjZShjb29yZHMueSwgY29vcmRzLngsIHNpemUpXG4gIH1cblxuICBjb25zdCBwbGFjZUZsZWV0ID0gKCkgPT4ge1xuICAgIGxldCBzaXplID0gNVxuICAgIHdoaWxlIChzaXplID4gMCkge1xuICAgICAgX3BsYWNlU2hpcEF0UmFuZG9tKHNpemUpXG4gICAgICBzaXplLS1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihnYW1lYm9hcmQsIHtcbiAgICBwbGFjZUZsZWV0XG4gIH0pXG59XG4iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcidcbmltcG9ydCB7IHN0YXRlcyB9IGZyb20gJy4uL2NvbnN0YW50cy9jZWxsX3N0YXRlcydcbmltcG9ydCB7IGdldFJhbmRvbUludGVnZXIsIGdldFJhbmRvbUNvb3JkcyB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcl9mdW5jcydcbmltcG9ydCB7IGN1cnJ5LCBndCwgbHQsIHJlbW92ZSB9IGZyb20gJy4uL3V0aWxzL2Z1bmNfaGVscGVycydcblxuY29uc3QgX2F0dGFja0RpcmVjdGlvbnMgPSB7XG4gIGxlZnQ6ICh5LCB4KSA9PiAoeyB5LCB4OiB4IC0gMSB9KSxcbiAgcmlnaHQ6ICh5LCB4KSA9PiAoeyB5LCB4OiB4ICsgMSB9KSxcbiAgdG9wOiAoeSwgeCkgPT4gKHsgeTogeSAtIDEsIHggfSksXG4gIGJvdHRvbTogKHksIHgpID0+ICh7IHk6IHkgKyAxLCB4IH0pXG59XG5cbmNvbnN0IF9nZXRPcHBvc2l0ZURpcmVjdGlvbiA9IChkaXJlY3Rpb24pID0+IHtcbiAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHJldHVybiAncmlnaHQnXG4gICAgY2FzZSAncmlnaHQnOlxuICAgICAgcmV0dXJuICdsZWZ0J1xuICAgIGNhc2UgJ3RvcCc6XG4gICAgICByZXR1cm4gJ2JvdHRvbSdcbiAgICBjYXNlICdib3R0b20nOlxuICAgICAgcmV0dXJuICd0b3AnXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJ1xuICB9XG59XG5cbmNvbnN0IF9pc1NoaXBIb3Jpem9udGFsID0gKGhpdENlbGxzKSA9PlxuICBoaXRDZWxscy5sZW5ndGggPiAxXG4gICAgPyBoaXRDZWxsc1swXS55ID09PSBoaXRDZWxsc1sxXS55XG4gICAgOiBmYWxzZVxuXG5jb25zdCBfZ2V0RW5kT25BeGlzID0gY3VycnkoKGF4aXMsIGdldExhc3QsIGhpdENlbGxzKSA9PiB7XG4gIGNvbnN0IGNvbXBhcmlzb25PcCA9IGdldExhc3QgPyBndCA6IGx0IFxuICByZXR1cm4gaGl0Q2VsbHMucmVkdWNlKChwcmV2LCBuZXh0KSA9PlxuICAgIGNvbXBhcmlzb25PcChwcmV2W2F4aXNdLCBuZXh0W2F4aXNdKVxuICAgID8gcHJldlxuICAgIDogbmV4dFxuICApfVxuKVxuXG5jb25zdCBfZ2V0TGVmdG1vc3QgPSBfZ2V0RW5kT25BeGlzKCd4JywgZmFsc2UpXG5jb25zdCBfZ2V0UmlnaHRtb3N0ID0gX2dldEVuZE9uQXhpcygneCcsIHRydWUpXG5jb25zdCBfZ2V0VG9wbW9zdCA9IF9nZXRFbmRPbkF4aXMoJ3knLCBmYWxzZSlcbmNvbnN0IF9nZXRCb3R0b21tb3N0ID0gX2dldEVuZE9uQXhpcygneScsIHRydWUpXG5cbmV4cG9ydCBjb25zdCBBaVBsYXllciA9ICgpID0+IHtcbiAgY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoJ0NvbXB1dGVyJywgZmFsc2UpXG4gIGxldCBoaXRDZWxscyA9IFtdXG4gIGxldCBsYXN0SGl0ID0ge31cbiAgbGV0IGRpcmVjdGlvbiA9ICcnXG5cbiAgY29uc3QgX2ZpbmRSYW5kb21TcG90VG9BdHRhY2sgPSAoYm9hcmQpID0+IHtcbiAgICBsZXQgY29vcmRzID0gZ2V0UmFuZG9tQ29vcmRzKClcbiAgICB3aGlsZSAoW3N0YXRlcy5ISVQsIHN0YXRlcy5NSVNTRUQsIHN0YXRlcy5TVU5LLCBzdGF0ZXMuQVJPVU5EX1NVTktdLmluY2x1ZGVzKGJvYXJkLnN0YXRlW2Nvb3Jkcy55IC0gMV1bY29vcmRzLnggLSAxXSkpIHtcbiAgICAgIGNvb3JkcyA9IGdldFJhbmRvbUNvb3JkcygpXG4gICAgfVxuICAgIHJldHVybiB7IHk6IGNvb3Jkcy55LCB4OiBjb29yZHMueCB9XG4gIH1cblxuICBjb25zdCBfZmluZFNwb3RBZnRlckhpdCA9IChib2FyZCwgeSwgeCkgPT4ge1xuICAgIGxldCBkaXJlY3Rpb25zID0gT2JqZWN0LmtleXMoX2F0dGFja0RpcmVjdGlvbnMpXG4gICAgbGV0IHJhbmRvbURpcmVjdGlvbiA9IGRpcmVjdGlvbnNbZ2V0UmFuZG9tSW50ZWdlcigwLCAzKV1cbiAgICBsZXQgeyB5OiByeSwgeDogcnggfSA9IF9hdHRhY2tEaXJlY3Rpb25zW3JhbmRvbURpcmVjdGlvbl0oeSwgeClcblxuICAgIHdoaWxlICghYm9hcmQuaXNWYWxpZFRhcmdldChyeSwgcngpICYmIGRpcmVjdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgZGlyZWN0aW9ucyA9IHJlbW92ZShyYW5kb21EaXJlY3Rpb24sIGRpcmVjdGlvbnMpXG4gICAgICByYW5kb21EaXJlY3Rpb24gPSBkaXJlY3Rpb25zW2dldFJhbmRvbUludGVnZXIoMCwgZGlyZWN0aW9ucy5sZW5ndGggLSAxKV1cbiAgICAgIGNvbnN0IHJhbmRvbUNvb3JkcyA9IF9hdHRhY2tEaXJlY3Rpb25zW3JhbmRvbURpcmVjdGlvbl0oeSwgeClcbiAgICAgIHJ5ID0gcmFuZG9tQ29vcmRzLnlcbiAgICAgIHJ4ID0gcmFuZG9tQ29vcmRzLnhcbiAgICB9XG4gICAgaWYgKCFib2FyZC5pc1ZhbGlkVGFyZ2V0KHJ5LCByeCkpIHtcbiAgICAgIHJldHVybiB7IHZhbGlkaXR5OiBmYWxzZSB9XG4gICAgfVxuICAgIHJldHVybiB7IHZhbGlkaXR5OiB0cnVlLCBkaXJlY3Rpb246IHJhbmRvbURpcmVjdGlvbiwgeTogcnksIHg6IHJ4IH1cbiAgfVxuXG4gIGNvbnN0IF9nYWluT3Bwb3NpdGVFbmQgPSAoKSA9PiB7XG4gICAgbGV0IGxlZnRtb3N0XG4gICAgbGV0IHJpZ2h0bW9zdFxuICAgIGxldCB0b3Btb3N0XG4gICAgbGV0IGJvdHRvbW1vc3RcbiAgICBzd2l0Y2ggKF9pc1NoaXBIb3Jpem9udGFsKGhpdENlbGxzKSkge1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBsZWZ0bW9zdCA9IF9nZXRMZWZ0bW9zdChoaXRDZWxscylcbiAgICAgICAgcmlnaHRtb3N0ID0gX2dldFJpZ2h0bW9zdChoaXRDZWxscylcbiAgICAgICAgcmV0dXJuIGxhc3RIaXQueCA9PT0gbGVmdG1vc3QueFxuICAgICAgICAgID8gcmlnaHRtb3N0XG4gICAgICAgICAgOiBsZWZ0bW9zdFxuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgdG9wbW9zdCA9IF9nZXRUb3Btb3N0KGhpdENlbGxzKVxuICAgICAgICBib3R0b21tb3N0ID0gX2dldEJvdHRvbW1vc3QoaGl0Q2VsbHMpXG4gICAgICAgIHJldHVybiBsYXN0SGl0LnkgPT09IHRvcG1vc3QueVxuICAgICAgICAgID8gYm90dG9tbW9zdFxuICAgICAgICAgIDogdG9wbW9zdFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgX2F0dGFja1NwZWNpZmljU3BvdCA9IChib2FyZCwgeSwgeCkgPT4ge1xuICAgIGNvbXB1dGVyLmF0dGFjayhib2FyZCwgeSwgeClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMoeSwgeClcbiAgICByZXR1cm4gc3RhdHVzXG4gIH1cblxuICBjb25zdCBfYXR0YWNrSW5EaXJlY3Rpb24gPSAoYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBfYXR0YWNrRGlyZWN0aW9uc1tkaXJlY3Rpb25dKGxhc3RIaXQueSwgbGFzdEhpdC54KVxuICAgIGlmICghYm9hcmQuaXNWYWxpZFRhcmdldChjb29yZHMueSwgY29vcmRzLngpKSB7XG4gICAgICBkaXJlY3Rpb24gPSBfZ2V0T3Bwb3NpdGVEaXJlY3Rpb24oZGlyZWN0aW9uKVxuICAgICAgbGFzdEhpdCA9IF9nYWluT3Bwb3NpdGVFbmQoKVxuICAgICAgaWYgKCFib2FyZC5pc1ZhbGlkVGFyZ2V0KF9hdHRhY2tEaXJlY3Rpb25zW2RpcmVjdGlvbl0obGFzdEhpdC55LCBsYXN0SGl0LngpKSkge1xuICAgICAgICBkaXJlY3Rpb24gPSAnJ1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF0dGFja1BsYXllcihib2FyZClcbiAgICB9XG4gICAgY29tcHV0ZXIuYXR0YWNrKGJvYXJkLCBjb29yZHMueSwgY29vcmRzLngpXG4gICAgY29uc3Qgc3RhdHVzID0gYm9hcmQuZ2V0QXR0YWNrU3RhdHVzKGNvb3Jkcy55LCBjb29yZHMueClcbiAgICBpZiAoc3RhdHVzLnZhbHVlICE9PSAnaGl0Jykge1xuICAgICAgZGlyZWN0aW9uID0gX2dldE9wcG9zaXRlRGlyZWN0aW9uKGRpcmVjdGlvbilcbiAgICAgIGxhc3RIaXQgPSBfZ2Fpbk9wcG9zaXRlRW5kKClcbiAgICB9XG4gICAgcmV0dXJuIHN0YXR1c1xuICB9XG5cbiAgY29uc3QgX2F0dGFja0FmdGVySGl0ID0gKGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gX2ZpbmRTcG90QWZ0ZXJIaXQoYm9hcmQsIGxhc3RIaXQueSwgbGFzdEhpdC54KVxuICAgIGlmICghY29vcmRzLnZhbGlkaXR5KSB7XG4gICAgICBsYXN0SGl0ID0ge31cbiAgICAgIGhpdENlbGxzID0gW11cbiAgICAgIHJldHVybiBhdHRhY2tQbGF5ZXIoYm9hcmQpXG4gICAgfVxuICAgIGRpcmVjdGlvbiA9IGNvb3Jkcy5kaXJlY3Rpb25cbiAgICBjb21wdXRlci5hdHRhY2soYm9hcmQsIGNvb3Jkcy55LCBjb29yZHMueClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMoY29vcmRzLnksIGNvb3Jkcy54KVxuICAgIGlmIChzdGF0dXMudmFsdWUgIT09ICdoaXQnKSB7XG4gICAgICByZXR1cm4gc3RhdHVzXG4gICAgfVxuICAgIGxhc3RIaXQgPSB7IHk6IGNvb3Jkcy55LCB4OiBjb29yZHMueCB9XG4gICAgaGl0Q2VsbHMucHVzaChsYXN0SGl0KVxuICAgIHJldHVybiBzdGF0dXNcbiAgfVxuXG4gIGNvbnN0IF9hdHRhY2tSYW5kb21DZWxsID0gKGJvYXJkKSA9PiB7XG4gICAgY29uc3QgcmFuZG9tQ29vcmRzID0gX2ZpbmRSYW5kb21TcG90VG9BdHRhY2soYm9hcmQpXG4gICAgY29tcHV0ZXIuYXR0YWNrKGJvYXJkLCByYW5kb21Db29yZHMueSwgcmFuZG9tQ29vcmRzLngpXG4gICAgY29uc3Qgc3RhdHVzID0gYm9hcmQuZ2V0QXR0YWNrU3RhdHVzKHJhbmRvbUNvb3Jkcy55LCByYW5kb21Db29yZHMueClcbiAgICByZXR1cm4gc3RhdHVzXG4gIH1cblxuICBjb25zdCBhdHRhY2tQbGF5ZXIgPSAoYm9hcmQsIHksIHgpID0+IHtcbiAgICBsZXQgc3RhdHVzXG4gICAgaWYgKHkgJiYgeCkge1xuICAgICAgc3RhdHVzID0gX2F0dGFja1NwZWNpZmljU3BvdChib2FyZCwgeSwgeClcbiAgICB9IGVsc2UgaWYgKGxhc3RIaXQueSAmJiBsYXN0SGl0LnggJiYgZGlyZWN0aW9uICE9PSAnJykge1xuICAgICAgc3RhdHVzID0gX2F0dGFja0luRGlyZWN0aW9uKGJvYXJkKVxuICAgIH0gZWxzZSBpZiAobGFzdEhpdC55ICYmIGxhc3RIaXQueCkge1xuICAgICAgc3RhdHVzID0gX2F0dGFja0FmdGVySGl0KGJvYXJkKVxuICAgIH0gZWxzZSBpZiAoIShsYXN0SGl0LnkgJiYgbGFzdEhpdC54KSkge1xuICAgICAgc3RhdHVzID0gX2F0dGFja1JhbmRvbUNlbGwoYm9hcmQpXG4gICAgfVxuICAgIGlmIChzdGF0dXMuc2hpcFN0YXR1cyA9PT0gJ2RhbWFnZWQnKSB7XG4gICAgICBsYXN0SGl0ID0geyB5OiBzdGF0dXMueSwgeDogc3RhdHVzLnggfSBcbiAgICAgIGhpdENlbGxzLnB1c2gobGFzdEhpdClcbiAgICB9XG4gICAgaWYgKHN0YXR1cy5zaGlwU3RhdHVzID09PSAnZGVzdHJveWVkJykge1xuICAgICAgZGlyZWN0aW9uID0gJydcbiAgICAgIGxhc3RIaXQgPSB7fVxuICAgICAgaGl0Q2VsbHMgPSBbXVxuICAgIH1cbiAgICByZXR1cm4gc3RhdHVzXG4gIH1cblxuICBjb25zdCBzZXREaXJlY3Rpb24gPSAodmFsKSA9PiB7IGRpcmVjdGlvbiA9IHZhbCB9XG5cbiAgcmV0dXJuIHtcbiAgICBhdHRhY2tQbGF5ZXIsXG4gICAgc2V0RGlyZWN0aW9uLFxuICAgIGdldCBkaXJlY3Rpb24gKCkgeyByZXR1cm4gZGlyZWN0aW9uIH0sXG4gICAgZ2V0IG5hbWUgKCkgeyByZXR1cm4gY29tcHV0ZXIubmFtZSB9LFxuICAgIGdldCB0eXBlICgpIHsgcmV0dXJuIGNvbXB1dGVyLnR5cGUgfVxuICB9XG59XG4iLCJpbXBvcnQgeyByZXBlYXQsIGZpbmRJbmRleCwgcGlwZSwgbWFwLCBmbGF0dGVuLCBkZWNyZW1lbnQsIGN1cnJ5LCBlcSwgYW55LCBmaWx0ZXIsIG9iamVjdEluQXJyYXksIGd0LCBsdCwgcmVtb3ZlRHVwbGljYXRlT2JqIH0gZnJvbSAnLi4vdXRpbHMvZnVuY19oZWxwZXJzJ1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCdcbmltcG9ydCB7IHN0YXRlcyB9IGZyb20gJy4uL2NvbnN0YW50cy9jZWxsX3N0YXRlcydcblxuY29uc3QgX2NyZWF0ZVJvdyA9ICgpID0+IHJlcGVhdCgoKSA9PiBzdGF0ZXMuV0FURVIsIDEwKVxuY29uc3QgX2NyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHJlcGVhdChfY3JlYXRlUm93LCAxMClcblxuY29uc3QgX21hcENvb3JkcyA9IGN1cnJ5KChib2FyZCwgdmFsdWUsIGNvb3JkcykgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbLi4uYm9hcmRdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgeyB5LCB4IH0gPSBkZWNyZW1lbnQoY29vcmRzW2ldKVxuICAgIHJlc3VsdFt5XVt4XSA9IHZhbHVlXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuY29uc3QgX2Nvb3Jkc1RvSW5kZXhlcyA9ICh5LCB4KSA9PiB7XG4gIHJldHVybiBkZWNyZW1lbnQoW3ksIHhdKVxufVxuXG5leHBvcnQgY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBmbGVldCA9IFtdXG4gIGNvbnN0IG1pc3NlZCA9IFtdXG4gIGxldCBwbGFuZSA9ICdob3Jpem9udGFsbHknXG4gIGxldCBzdGF0ZSA9IF9jcmVhdGVHYW1lYm9hcmQoKVxuXG4gIGNvbnN0IF9tYXBCb2FyZCA9IF9tYXBDb29yZHMoc3RhdGUpXG4gIGNvbnN0IF9tYXBTaGlwID0gX21hcEJvYXJkKHN0YXRlcy5TSElQKVxuICBjb25zdCBfbWFwTWlzc2VkID0gX21hcEJvYXJkKHN0YXRlcy5NSVNTRUQpXG4gIGNvbnN0IF9tYXBIaXQgPSBfbWFwQm9hcmQoc3RhdGVzLkhJVClcbiAgY29uc3QgX21hcFN1bmsgPSBfbWFwQm9hcmQoc3RhdGVzLlNVTkspXG4gIGNvbnN0IF9tYXBBcm91bmQgPSBfbWFwQm9hcmQoc3RhdGVzLkFST1VORF9TVU5LKVxuXG4gIGNvbnN0IF9maW5kU2hpcCA9ICh5LCB4KSA9PlxuICAgIGZsZWV0LmZpbmQoKHNoaXApID0+IHNoaXAuc2VnbWVudHMuZmluZCgoc2VnbWVudCkgPT4gc2VnbWVudC55ID09PSB5ICYmIHNlZ21lbnQueCA9PT0geCkpXG5cbiAgY29uc3QgX2dldFNlZ21lbnRzID0gKHNoaXApID0+IHNoaXAuc2VnbWVudHNcblxuICBjb25zdCBfaXNTaGlwU3VuayA9IChzaGlwKSA9PiBzaGlwLmlzU3VuaygpXG5cbiAgY29uc3QgX2dldFNoaXBDZWxscyA9ICgpID0+IHBpcGUoXG4gICAgbWFwKF9nZXRTZWdtZW50cyksXG4gICAgZmxhdHRlblxuICApKGZsZWV0KVxuXG4gIGNvbnN0IF9nZXRTdW5rQ2VsbHMgPSAoKSA9PiBwaXBlKFxuICAgIGZpbHRlcihfaXNTaGlwU3VuayksXG4gICAgbWFwKF9nZXRTZWdtZW50cyksXG4gICAgZmxhdHRlbixcbiAgICBtYXAoKGNlbGwpID0+ICh7IHk6IGNlbGwueSwgeDogY2VsbC54IH0pKVxuICApKGZsZWV0KVxuXG4gIGNvbnN0IF9hbnlTaGlwID0gYW55KGVxKHN0YXRlcy5TSElQKSlcblxuICBjb25zdCBpc0ZsZWV0U3VuayA9ICgpID0+IGZsZWV0LmV2ZXJ5KF9pc1NoaXBTdW5rKVxuXG4gIGNvbnN0IF9pc092ZXJsYXBzID0gKHksIHgsIHNpemUpID0+IHtcbiAgICBjb25zdCBvY2N1cGllZENlbGxzID0gX2dldFNoaXBDZWxscygpXG4gICAgaWYgKHBsYW5lID09PSAnaG9yaXpvbnRhbGx5JyAmJiBvY2N1cGllZENlbGxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHRhaWwgPSB4ICsgc2l6ZVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvY2N1cGllZENlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSB4OyBqIDwgdGFpbDsgaisrKSB7XG4gICAgICAgICAgaWYgKG9jY3VwaWVkQ2VsbHNbaV0ueSA9PT0geSAmJiBvY2N1cGllZENlbGxzW2ldLnggPT09IGopIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwbGFuZSA9PT0gJ3ZlcnRpY2FsbHknICYmIG9jY3VwaWVkQ2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdGFpbCA9IHkgKyBzaXplXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9jY3VwaWVkQ2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IHk7IGogPCB0YWlsOyBqKyspIHtcbiAgICAgICAgICBpZiAob2NjdXBpZWRDZWxsc1tpXS55ID09PSBqICYmIG9jY3VwaWVkQ2VsbHNbaV0ueCA9PT0geCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBfaXNPdmVyZmxvd3MgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGlmICgocGxhbmUgPT09ICdob3Jpem9udGFsbHknICYmIHggKyAtLXNpemUgPiAxMCkgfHxcbiAgICAgICAgKHBsYW5lID09PSAndmVydGljYWxseScgJiYgeSArIC0tc2l6ZSA+IDEwKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBfZ2V0Q2VsbFN0YXRlID0gKHksIHgpID0+IHtcbiAgICBjb25zdCBbaXksIGl4XSA9IF9jb29yZHNUb0luZGV4ZXMoeSwgeClcbiAgICBjb25zdCByb3cgPSBzdGF0ZVtpeV1cbiAgICByZXR1cm4gcm93XG4gICAgPyBzdGF0ZVtpeV1baXhdXG4gICAgOiBudWxsXG4gIH1cblxuICBjb25zdCBfaXNBZGphY2VudFRvU2hpcHMgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuXG4gICAgaWYgKHBsYW5lID09PSAnaG9yaXpvbnRhbGx5Jykge1xuICAgICAgY29uc3QgdGFpbCA9IHggKyBzaXplXG5cbiAgICAgIGZvciAobGV0IGkgPSB4OyBpIDwgdGFpbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRvcENlbGwgPSBfZ2V0Q2VsbFN0YXRlKHkgLSAxLCBpKVxuICAgICAgICBjb25zdCBib3R0b21DZWxsID0gX2dldENlbGxTdGF0ZSh5ICsgMSwgaSlcbiAgICAgICAgaWYgKF9hbnlTaGlwKFt0b3BDZWxsLCBib3R0b21DZWxsXSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxlZnRDZWxsID0gX2dldENlbGxTdGF0ZSh5LCB4IC0gMSlcbiAgICAgIGNvbnN0IHJpZ2h0Q2VsbCA9IF9nZXRDZWxsU3RhdGUoeSwgdGFpbClcbiAgICAgIGlmIChfYW55U2hpcChbbGVmdENlbGwsIHJpZ2h0Q2VsbF0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRvcExlZnQgPSBfZ2V0Q2VsbFN0YXRlKHkgLSAxLCB4IC0gMSlcbiAgICAgIGNvbnN0IGJvdHRvbUxlZnQgPSBfZ2V0Q2VsbFN0YXRlKHkgKyAxLCB4IC0gMSlcbiAgICAgIGNvbnN0IHRvcFJpZ2h0ID0gX2dldENlbGxTdGF0ZSh5IC0gMSwgdGFpbClcbiAgICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gX2dldENlbGxTdGF0ZSh5ICsgMSwgdGFpbClcbiAgICAgIGlmIChfYW55U2hpcChbdG9wTGVmdCwgYm90dG9tTGVmdCwgdG9wUmlnaHQsIGJvdHRvbVJpZ2h0XSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGxhbmUgPT09ICd2ZXJ0aWNhbGx5Jykge1xuICAgICAgY29uc3QgdGFpbCA9IHkgKyBzaXplXG5cbiAgICAgIGNvbnN0IHRvcENlbGwgPSBfZ2V0Q2VsbFN0YXRlKHkgLSAxLCB4KVxuICAgICAgY29uc3QgYm90dG9tQ2VsbCA9IF9nZXRDZWxsU3RhdGUodGFpbCwgeClcbiAgICAgIGlmIChfYW55U2hpcChbdG9wQ2VsbCwgYm90dG9tQ2VsbF0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSB5OyBpIDwgdGFpbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGxlZnRDZWxsID0gX2dldENlbGxTdGF0ZShpLCB4IC0gMSlcbiAgICAgICAgY29uc3QgcmlnaHRDZWxsID0gX2dldENlbGxTdGF0ZShpLCB4ICsgMSlcbiAgICAgICAgaWYgKF9hbnlTaGlwKFtsZWZ0Q2VsbCwgcmlnaHRDZWxsXSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRvcExlZnQgPSBfZ2V0Q2VsbFN0YXRlKHkgLSAxLCB4IC0gMSlcbiAgICAgIGNvbnN0IHRvcFJpZ2h0ID0gX2dldENlbGxTdGF0ZSh5IC0gMSwgeCArIDEpXG4gICAgICBjb25zdCBib3R0b21MZWZ0ID0gX2dldENlbGxTdGF0ZSh0YWlsLCB4IC0gMSlcbiAgICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gX2dldENlbGxTdGF0ZSh0YWlsLCB4ICsgMSlcbiAgICAgIGlmIChfYW55U2hpcChbdG9wTGVmdCwgYm90dG9tTGVmdCwgdG9wUmlnaHQsIGJvdHRvbVJpZ2h0XSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBfZ2V0U3Vycm91bmRpbmdDZWxscyA9ICh7IHksIHggfSkgPT4ge1xuICAgIHJldHVybiBbXG4gICAgICB7IHk6IHkgLSAxLCB4fSxcbiAgICAgIHsgeTogeSArIDEsIHh9LFxuICAgICAgeyB5LCB4OiB4IC0gMX0sXG4gICAgICB7IHksIHg6IHggKyAxfSxcbiAgICAgIHsgeTogeSAtIDEsIHg6IHggLSAxfSxcbiAgICAgIHsgeTogeSArIDEsIHg6IHggKyAxfSxcbiAgICAgIHsgeTogeSAtIDEsIHg6IHggKyAxfSxcbiAgICAgIHsgeTogeSArIDEsIHg6IHggLSAxfSxcbiAgICBdXG4gIH1cblxuICBjb25zdCBfaXNDZWxsVmFsaWQgPSAoeyB5LCB4IH0pID0+IFxuICAgICFhbnkoKGF4aXMpID0+IChndChheGlzLCAxMCkgfHwgbHQoYXhpcywgMSkpLCBbeCwgeV0pXG5cbiAgY29uc3QgZ2V0QXJlYUFyb3VuZFN1bmsgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3Vua0NlbGxzID0gX2dldFN1bmtDZWxscygpXG4gICAgcmV0dXJuIHBpcGUoXG4gICAgICBtYXAoX2dldFN1cnJvdW5kaW5nQ2VsbHMpLFxuICAgICAgZmxhdHRlbixcbiAgICAgIGZpbHRlcigoY2VsbCkgPT4gIW9iamVjdEluQXJyYXkoY2VsbCwgc3Vua0NlbGxzKSksXG4gICAgICBmaWx0ZXIoX2lzQ2VsbFZhbGlkKSxcbiAgICAgIHJlbW92ZUR1cGxpY2F0ZU9ialxuICAgICkoc3Vua0NlbGxzKVxuICB9XG5cbiAgY29uc3QgaXNWYWxpZEZvclBsYWNlID0gKHksIHgsIHNpemUpID0+IChcbiAgICAhX2lzT3ZlcmxhcHMoeSwgeCwgc2l6ZSkgJiZcbiAgICAhX2lzT3ZlcmZsb3dzKHksIHgsIHNpemUpICYmXG4gICAgIV9pc0FkamFjZW50VG9TaGlwcyh5LCB4LCBzaXplKVxuICApXG5cbiAgY29uc3QgcGxhY2UgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGlmICghaXNWYWxpZEZvclBsYWNlKHksIHgsIHNpemUpKSByZXR1cm5cblxuICAgIGNvbnN0IHNoaXAgPSBTaGlwKHksIHgsIHNpemUsIHBsYW5lKVxuICAgIGZsZWV0LnB1c2goc2hpcClcbiAgICBzdGF0ZSA9IF9tYXBTaGlwKHNoaXAuc2VnbWVudHMpXG4gICAgcmV0dXJuIHNoaXBcbiAgfVxuXG4gIGNvbnN0IGlzVmFsaWRUYXJnZXQgPSAoeSwgeCkgPT4ge1xuICAgIGNvbnN0IFtpeSwgaXhdID0gX2Nvb3Jkc1RvSW5kZXhlcyh5LCB4KVxuICAgIGNvbnN0IHJvdyA9IHN0YXRlW2l5XVxuICAgIGlmIChyb3cpIHtcbiAgICAgIHN3aXRjaCAoc3RhdGVbaXldW2l4XSkge1xuICAgICAgICBjYXNlIHN0YXRlcy5TSElQOlxuICAgICAgICBjYXNlIHN0YXRlcy5XQVRFUjpcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBjYXNlIHN0YXRlcy5NSVNTRUQ6XG4gICAgICAgIGNhc2Ugc3RhdGVzLkhJVDpcbiAgICAgICAgY2FzZSBzdGF0ZXMuU1VOSzpcbiAgICAgICAgY2FzZSBzdGF0ZXMuQVJPVU5EX1NVTks6XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh5LCB4KSA9PiB7XG4gICAgY29uc3QgaGl0U2hpcCA9IF9maW5kU2hpcCh5LCB4KVxuICAgIGlmICghaGl0U2hpcCkge1xuICAgICAgbWlzc2VkLnB1c2goeyB5LCB4IH0pXG4gICAgICBzdGF0ZSA9IF9tYXBNaXNzZWQoW3sgeSwgeCB9XSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBoaXRTZWdtZW50SW5kZXggPSBmaW5kSW5kZXgoc2VnbWVudCA9PiBzZWdtZW50LnkgPT09IHkgJiYgc2VnbWVudC54ID09PSB4LCBoaXRTaGlwLnNlZ21lbnRzKVxuICAgIGhpdFNoaXAuaGl0KGhpdFNlZ21lbnRJbmRleClcbiAgICBpZiAoaGl0U2hpcC5pc1N1bmsoKSkge1xuICAgICAgc3RhdGUgPSBfbWFwU3VuayhoaXRTaGlwLnNlZ21lbnRzKVxuICAgICAgc3RhdGUgPSBfbWFwQXJvdW5kKGdldEFyZWFBcm91bmRTdW5rKCkpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RhdGUgPSBfbWFwSGl0KFt7IHksIHggfV0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0QXR0YWNrU3RhdHVzID0gKHksIHgpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSB7IHksIHggfVxuICAgIGNvbnN0IGF0dGFja2VkQ2VsbCA9IF9nZXRDZWxsU3RhdGUoeSwgeClcbiAgICBsZXQgc2hpcFxuICAgIGxldCBzdGF0dXNcbiAgICBzd2l0Y2ggKGF0dGFja2VkQ2VsbCkge1xuICAgICAgY2FzZSBzdGF0ZXMuTUlTU0VEOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IHZhbHVlOiAnbWlzc2VkJyB9LCBjb29yZHMpXG4gICAgICBjYXNlIHN0YXRlcy5ISVQ6XG4gICAgICBjYXNlIHN0YXRlcy5TVU5LOlxuICAgICAgICBzaGlwID0gX2ZpbmRTaGlwKHksIHgpXG4gICAgICAgIHN0YXR1cyA9IHsgdmFsdWU6ICdoaXQnLCBzaGlwOiBzaGlwLnR5cGUgfVxuICAgICAgICByZXR1cm4gc2hpcC5pc1N1bmsoKVxuICAgICAgICAgID8gT2JqZWN0LmFzc2lnbihzdGF0dXMsIGNvb3JkcywgeyBzaGlwU3RhdHVzOiAnZGVzdHJveWVkJyB9KVxuICAgICAgICAgIDogT2JqZWN0LmFzc2lnbihzdGF0dXMsIGNvb3JkcywgeyBzaGlwU3RhdHVzOiAnZGFtYWdlZCcgfSlcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgdmFsdWU6IGF0dGFja2VkQ2VsbCB9LCBjb29yZHMpXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc2V0UGxhbmUgPSAobmV3UGxhbmUpID0+IHsgcGxhbmUgPSBuZXdQbGFuZSB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXQgc3RhdGUgKCkgeyByZXR1cm4gc3RhdGUgfSxcbiAgICBnZXQgZmxlZXQgKCkgeyByZXR1cm4gZmxlZXQgfSxcbiAgICBnZXQgbWlzc2VkICgpIHsgcmV0dXJuIG1pc3NlZCB9LFxuICAgIGlzVmFsaWRGb3JQbGFjZSxcbiAgICBwbGFjZSxcbiAgICBpc1ZhbGlkVGFyZ2V0LFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0QXR0YWNrU3RhdHVzLFxuICAgIGdldEFyZWFBcm91bmRTdW5rLFxuICAgIGlzRmxlZXRTdW5rLFxuICAgIHNldFBsYW5lXG4gIH1cbn1cblxuZXhwb3J0IHsgX2NyZWF0ZUdhbWVib2FyZCB9XG4iLCJleHBvcnQgY29uc3QgUGxheWVyID0gKG5hbWUsIGlzRmlyc3QpID0+IHtcbiAgY29uc3QgdHlwZSA9IGlzRmlyc3QgPyAncGxheWVyJyA6ICdjb21wdXRlcidcbiAgbGV0IHR1cm4gPSBpc0ZpcnN0XG5cbiAgY29uc3QgY2hhbmdlVHVybiA9ICgpID0+IHsgdHVybiA9ICF0dXJuIH1cblxuICBjb25zdCBhdHRhY2sgPSAoYm9hcmQsIHksIHgpID0+IHtcbiAgICBib2FyZC5yZWNlaXZlQXR0YWNrKHksIHgpXG4gICAgY29uc3Qgc3RhdHVzID0gYm9hcmQuZ2V0QXR0YWNrU3RhdHVzKHksIHgpXG4gICAgaWYgKHN0YXR1cy52YWx1ZSAhPT0gJ2hpdCcpIHtcbiAgICAgIGNoYW5nZVR1cm4oKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0IG5hbWUgKCkgeyByZXR1cm4gbmFtZSB9LFxuICAgIGdldCB0eXBlICgpIHsgcmV0dXJuIHR5cGUgfSxcbiAgICBnZXQgdHVybiAoKSB7IHJldHVybiB0dXJuIH0sXG4gICAgYXR0YWNrLFxuICAgIGNoYW5nZVR1cm5cbiAgfVxufVxuIiwiY29uc3QgX3R5cGVzID0ge1xuICAxOiAnUGF0cm9sIGJvYXQnLFxuICAyOiAnRGVzdHJveWVyJyxcbiAgMzogJ0NydWlzZXInLFxuICA0OiAnQmF0dGxlc2hpcCcsXG4gIDU6ICdDYXJyaWVyJ1xufVxuXG5jb25zdCBfc2VnbWVudHNDcmVhdG9yID0ge1xuICBob3Jpem9udGFsbHkgKHksIHgsIHNpemUpIHtcbiAgICBjb25zdCBzZWdtZW50cyA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIHNlZ21lbnRzW2ldID0geyB5LCB4OiAoeCArIGkpLCBpbnRhY3Q6IHRydWUgfVxuICAgIH1cbiAgICByZXR1cm4gc2VnbWVudHNcbiAgfSxcbiAgdmVydGljYWxseSAoeSwgeCwgc2l6ZSkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgc2VnbWVudHNbaV0gPSB7IHk6ICh5ICsgaSksIHgsIGludGFjdDogdHJ1ZSB9XG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50c1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBTaGlwID0gKHksIHgsIHNpemUsIHBsYW5lKSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBfdHlwZXNbc2l6ZV1cbiAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKCdJbXByb3BlciBzaGlwIHNpemUnKVxuXG4gIGNvbnN0IHNlZ21lbnRzID0gX3NlZ21lbnRzQ3JlYXRvcltwbGFuZV0oeSwgeCwgc2l6ZSlcblxuICBjb25zdCBoaXQgPSAoc2VnbWVudCkgPT4geyBzZWdtZW50c1tzZWdtZW50XS5pbnRhY3QgPSBmYWxzZSB9IFxuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHNlZ21lbnRzLmV2ZXJ5KChzZWdtZW50KSA9PiBzZWdtZW50LmludGFjdCA9PT0gZmFsc2UpXG5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGdldCBzaXplICgpIHsgcmV0dXJuIHNpemUgfSxcbiAgICBnZXQgdHlwZSAoKSB7IHJldHVybiB0eXBlIH0sXG4gICAgZ2V0IHNlZ21lbnRzICgpIHsgcmV0dXJuIHNlZ21lbnRzIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgZXZlbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50X3R5cGVzJ1xuaW1wb3J0IHsgZXZlbnRzSGFuZGxlciB9IGZyb20gJy4uL3V0aWxzL2V2ZW50c19oYW5kbGVyJ1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi4vZmFjdG9yaWVzL3BsYXllcidcbmltcG9ydCB7IEFpUGxheWVyIH0gZnJvbSAnLi4vZmFjdG9yaWVzL2FpX3BsYXllcidcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4uL2ZhY3Rvcmllcy9nYW1lYm9hcmQnXG5pbXBvcnQgeyBBaUdhbWVib2FyZCB9IGZyb20gJy4uL2ZhY3Rvcmllcy9haV9nYW1lYm9hcmQnXG5pbXBvcnQgeyBib2FyZEhhbmRsZXIgfSBmcm9tICcuLi91aS9kb21fYm9hcmQnXG5pbXBvcnQgeyB3cmFwSW5EaXYsIHF1ZXJ5RG9jdW1lbnQsIGFkZENsYXNzLCByZW1vdmVDbGFzcywgcmVwbGFjZUNsYXNzIH0gZnJvbSAnLi4vdWkvZG9tX2Z1bmNzJ1xuaW1wb3J0IHsgZGVsYXkgfSBmcm9tICcuLi91dGlscy9oZWxwZXJfZnVuY3MnXG5cbjsoZnVuY3Rpb24gdWlMb2dpYyAoKSB7XG4gIGNvbnN0IHN0YXJ0QnRuID0gcXVlcnlEb2N1bWVudCgnI3N0YXJ0LWdhbWUnKVxuICBjb25zdCByZXN0YXJ0QnRuID0gcXVlcnlEb2N1bWVudCgnI3Jlc3RhcnQtZ2FtZScpXG4gIGNvbnN0IG5hbWVJbnAgPSBxdWVyeURvY3VtZW50KCcjcGxheWVyLW5hbWUnKVxuICBjb25zdCBuYW1lSW5wRGl2ID0gcXVlcnlEb2N1bWVudCgnI2lucHV0LW5hbWUnKVxuICBjb25zdCByb3RhdGVCdG4gPSBxdWVyeURvY3VtZW50KCcjcm90YXRlJylcbiAgY29uc3QgbG9nRGl2ID0gcXVlcnlEb2N1bWVudCgnI2xvZycpXG4gIGNvbnN0IGhpbnRzRGl2ID0gcXVlcnlEb2N1bWVudCgnI2hpbnRzJylcblxuICBsZXQgbmFtZUlucHV0ZWQgPSBCb29sZWFuKG5hbWVJbnAudmFsdWUpXG4gIGxldCBzaGlwc1BsYWNlZCA9IGZhbHNlXG4gIHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZVxuXG4gIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIDtbbmFtZUlucCwgbmFtZUlucERpdl0uZm9yRWFjaCgoZWwpID0+IGFkZENsYXNzKCdoaWRkZW4nLCBlbCkpXG4gICAgO1tzdGFydEJ0biwgcm90YXRlQnRuXS5mb3JFYWNoKChlbCkgPT4gYWRkQ2xhc3MoJ2Rpc3BsYXktbm9uZScsIGVsKSlcbiAgICByZW1vdmVDbGFzcygnZGlzcGxheS1ub25lJywgbG9nRGl2LnBhcmVudE5vZGUpXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5HQU1FX1NUQVJURUQsIG5hbWVJbnAudmFsdWUpXG4gICAgaGludHNEaXYuaW5uZXJUZXh0ID0gJ0dvb2QgbHVjaywgQWRtaXJhbCEnXG4gIH0pXG5cbiAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChyb3RhdGVCdG4uZGF0YXNldC5wbGFuZSA9PT0gJ3ZlcnRpY2FsbHknKSB7XG4gICAgICByb3RhdGVCdG4uZGF0YXNldC5wbGFuZSA9ICdob3Jpem9udGFsbHknXG4gICAgICByb3RhdGVCdG4uaW5uZXJUZXh0ID0gJ0hvcml6b250YWwnXG4gICAgfSBlbHNlIGlmIChyb3RhdGVCdG4uZGF0YXNldC5wbGFuZSA9PT0gJ2hvcml6b250YWxseScpIHtcbiAgICAgIHJvdGF0ZUJ0bi5kYXRhc2V0LnBsYW5lID0gJ3ZlcnRpY2FsbHknXG4gICAgICByb3RhdGVCdG4uaW5uZXJUZXh0ID0gJ1ZlcnRpY2FsJ1xuICAgIH1cbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLlNISVBfUk9UQVRFRCwgcm90YXRlQnRuLmRhdGFzZXQucGxhbmUpXG4gIH0pXG5cbiAgbmFtZUlucC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgKGUuY3VycmVudFRhcmdldC52YWx1ZS5sZW5ndGggPiAwKVxuICAgICAgPyBuYW1lSW5wdXRlZCA9IHRydWVcbiAgICAgIDogbmFtZUlucHV0ZWQgPSBmYWxzZVxuICAgIDsobmFtZUlucHV0ZWQgJiYgc2hpcHNQbGFjZWQpXG4gICAgICA/IHN0YXJ0QnRuLmRpc2FibGVkID0gZmFsc2VcbiAgICAgIDogc3RhcnRCdG4uZGlzYWJsZWQgPSB0cnVlXG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuU0hJUF9QTEFDRUQsICh7IGFyZVNoaXBzUGxhY2VkLCBzaGlwVHlwZSB9KSA9PiB7XG4gICAgOyhhcmVTaGlwc1BsYWNlZClcbiAgICAgID8gc2hpcHNQbGFjZWQgPSB0cnVlXG4gICAgICA6IHNoaXBzUGxhY2VkID0gZmFsc2VcbiAgICA7KG5hbWVJbnB1dGVkICYmIHNoaXBzUGxhY2VkKVxuICAgICAgPyBzdGFydEJ0bi5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICA6IHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZVxuICAgIGhpbnRzRGl2LmlubmVyVGV4dCA9IGAke3NoaXBUeXBlfSBoYXMgYmVlbiBwbGFjZWQuYFxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub25FYWNoKFtcbiAgICBldmVudHMuQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQsXG4gICAgZXZlbnRzLkNPTVBVVEVSX0ZJTklTSEVEX1RVUk5cbiAgXSwgKHsgc3RhdHVzLCBwbGF5ZXIgfSkgPT4ge1xuICAgIGNvbnN0IGxvZ0NsYXNzID0gYGxvZy0ke3BsYXllci50eXBlfS0ke3N0YXR1cy5zaGlwU3RhdHVzIHx8IHN0YXR1cy52YWx1ZX1gXG4gICAgbGV0IG1zZ1xuICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdtaXNzZWQnKSB7XG4gICAgICBtc2cgPSBgJHtzdGF0dXMueX0gJHtzdGF0dXMueH0uICR7cGxheWVyLm5hbWV9IG1pc3NlZC4uLmBcbiAgICB9XG4gICAgaWYgKHN0YXR1cy52YWx1ZSA9PT0gJ2hpdCcpIHtcbiAgICAgIG1zZyA9IGAke3N0YXR1cy55fSAke3N0YXR1cy54fS4gJHtwbGF5ZXIubmFtZX0gJHtzdGF0dXMuc2hpcFN0YXR1c30gJHtzdGF0dXMuc2hpcH0hYFxuICAgIH1cbiAgICBjb25zdCBkaXYgPSB3cmFwSW5EaXYobXNnLCBbbG9nQ2xhc3NdKVxuICAgIGxvZ0Rpdi5wcmVwZW5kKGRpdilcbiAgfSlcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5HQU1FX0VOREVELCAobmFtZSkgPT4ge1xuICAgIGhpbnRzRGl2LmlubmVyVGV4dCA9IGAke25hbWV9IHdvbiFgXG4gICAgcmVtb3ZlQ2xhc3MoJ2hpZGRlbicsIHJlc3RhcnRCdG4pXG4gIH0pXG5cbn0pKClcblxuOyhmdW5jdGlvbiBib2FyZFZpZXdMb2dpYyAoKSB7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gcXVlcnlEb2N1bWVudCgnI3BsYXllci1ib2FyZCcpXG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBxdWVyeURvY3VtZW50KCcjY29tcHV0ZXItYm9hcmQnKVxuXG4gIGJvYXJkSGFuZGxlci5jcmVhdGVCb2FyZChmYWxzZSwgcGxheWVyQm9hcmQpXG4gIGJvYXJkSGFuZGxlci5jcmVhdGVCb2FyZCh0cnVlLCBjb21wdXRlckJvYXJkKVxuXG4gIGNvbnN0IHJlbmRlclBsYXllciA9IGJvYXJkSGFuZGxlci5yZW5kZXJCb2FyZChwbGF5ZXJCb2FyZClcbiAgY29uc3QgcmVuZGVyQ29tcHV0ZXIgPSBib2FyZEhhbmRsZXIucmVuZGVyQm9hcmQoY29tcHV0ZXJCb2FyZClcblxuICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSkge1xuICAgICAgY29uc3QgY29vcmRzID0gYm9hcmRIYW5kbGVyLmV4dHJhY3RDb29yZHMoZS50YXJnZXQpXG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkJPQVJEX0hPVkVSRUQsIGNvb3JkcylcbiAgICB9XG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuU0hJUF9WQUxJREFURUQsIChkYXRhKSA9PiB7XG4gICAgYm9hcmRIYW5kbGVyLmhpZ2hsaWdodEZ1dHVyZVNoaXAoLi4uZGF0YSlcbiAgfSlcblxuICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICBjb25zdCBjb29yZHMgPSBib2FyZEhhbmRsZXIuZXh0cmFjdENvb3JkcyhlLnRhcmdldClcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuQk9BUkRfQ0xJQ0tFRCwgY29vcmRzKVxuICAgIH1cbiAgfSlcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5TSElQX1BMQUNFRCwgKHsgc2hpcCB9KSA9PiB7XG4gICAgYm9hcmRIYW5kbGVyLnBsYWNlKC4uLnNoaXApXG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuR0FNRV9TVEFSVEVELCAoKSA9PiB7XG4gICAgYm9hcmRIYW5kbGVyLmRpc3BsYXlCb2FyZChjb21wdXRlckJvYXJkKVxuICB9KVxuXG4gIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBib2FyZEhhbmRsZXIuY2xlYXJIaWdobGlnaHRzKVxuXG4gIGV2ZW50c0hhbmRsZXIub25FYWNoKFtcbiAgICBldmVudHMuQ09NUFVURVJfUExBQ0VEX1NISVBTLFxuICAgIGV2ZW50cy5DT01QVVRFUl9CT0FSRF9BVFRBQ0tFRFxuICBdLCAoeyBzdGF0ZSB9KSA9PiB7XG4gICAgcmVuZGVyQ29tcHV0ZXIoc3RhdGUpXG4gIH0pXG5cbiAgY29tcHV0ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICBjb25zdCBjb29yZHMgPSBib2FyZEhhbmRsZXIuZXh0cmFjdENvb3JkcyhlLnRhcmdldClcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuQ09NUFVURVJfQk9BUkRfQ0xJQ0tFRCwgY29vcmRzKVxuICAgIH1cbiAgfSlcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5DT01QVVRFUl9GSU5JU0hFRF9UVVJOLCAoeyBzdGF0ZSB9KSA9PiB7XG4gICAgcmVuZGVyUGxheWVyKHN0YXRlKVxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLlNISVBfUk9UQVRFRCwgYm9hcmRIYW5kbGVyLnNldFBsYW5lKVxufSkoKVxuXG47KGZ1bmN0aW9uIGdhbWVMb2dpYyAoKSB7XG4gIGNvbnN0IHNoaXBzVG9QbGFjZSA9IFs1LCA0LCAzLCAyLCAxXVxuICBjb25zdCBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpXG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBBaUdhbWVib2FyZCgpXG4gIC8vIHRlbXBvcmFyeVxuICBsZXQgcGxheWVyXG4gIGxldCBjb21wdXRlclxuICBsZXQgZ2FtZVN0YXJ0ZWQgPSBmYWxzZVxuICBsZXQgZ2FtZUVuZGVkID0gZmFsc2VcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5CT0FSRF9IT1ZFUkVELCAoY29vcmRzKSA9PiB7XG4gICAgaWYgKHNoaXBzVG9QbGFjZS5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGNvbnN0IFt5LCB4XSA9IGNvb3Jkc1xuICAgIGNvbnN0IG5leHRTaGlwU2l6ZSA9IHNoaXBzVG9QbGFjZVswXVxuICAgIGNvbnN0IGlzVmFsaWQgPSBwbGF5ZXJCb2FyZC5pc1ZhbGlkRm9yUGxhY2UoeSwgeCwgbmV4dFNoaXBTaXplKVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuU0hJUF9WQUxJREFURUQsIFt5LCB4LCBuZXh0U2hpcFNpemUsIGlzVmFsaWRdKVxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLkJPQVJEX0NMSUNLRUQsIChjb29yZHMpID0+IHtcbiAgICBpZiAoc2hpcHNUb1BsYWNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgW3ksIHhdID0gY29vcmRzXG4gICAgY29uc3QgbmV4dFNoaXBTaXplID0gc2hpcHNUb1BsYWNlWzBdXG4gICAgY29uc3QgaXNWYWxpZCA9IHBsYXllckJvYXJkLmlzVmFsaWRGb3JQbGFjZSh5LCB4LCBuZXh0U2hpcFNpemUpXG4gICAgaWYgKCFpc1ZhbGlkKSByZXR1cm5cbiAgICBjb25zdCBzaGlwID0gcGxheWVyQm9hcmQucGxhY2UoeSwgeCwgbmV4dFNoaXBTaXplKVxuICAgIHNoaXBzVG9QbGFjZS5zaGlmdCgpXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKFxuICAgICAgZXZlbnRzLlNISVBfUExBQ0VELFxuICAgICAge1xuICAgICAgICBzaGlwOiBbeSwgeCwgbmV4dFNoaXBTaXplXSxcbiAgICAgICAgc2hpcFR5cGU6IHNoaXAudHlwZSxcbiAgICAgICAgYXJlU2hpcHNQbGFjZWQ6IHNoaXBzVG9QbGFjZS5sZW5ndGggPT09IDBcbiAgICAgIH1cbiAgICApXG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuU0hJUF9ST1RBVEVELCBwbGF5ZXJCb2FyZC5zZXRQbGFuZSlcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5HQU1FX1NUQVJURUQsIChuYW1lKSA9PiB7XG4gICAgZ2FtZVN0YXJ0ZWQgPSB0cnVlXG4gICAgcGxheWVyID0gUGxheWVyKG5hbWUsIHRydWUpXG4gICAgY29tcHV0ZXIgPSBBaVBsYXllcigpXG4gICAgY29tcHV0ZXJCb2FyZC5wbGFjZUZsZWV0KDUpXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKFxuICAgICAgZXZlbnRzLkNPTVBVVEVSX1BMQUNFRF9TSElQUyxcbiAgICAgIHsgc3RhdGU6IGNvbXB1dGVyQm9hcmQuc3RhdGUgfVxuICAgIClcbiAgfSlcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5DT01QVVRFUl9CT0FSRF9DTElDS0VELCAoY29vcmRzKSA9PiB7XG4gICAgaWYgKCFnYW1lU3RhcnRlZCB8fCBnYW1lRW5kZWQgfHwgIXBsYXllci50dXJuIHx8ICFjb21wdXRlckJvYXJkLmlzVmFsaWRUYXJnZXQoLi4uY29vcmRzKSkgcmV0dXJuXG4gICAgcGxheWVyLmF0dGFjayhjb21wdXRlckJvYXJkLCAuLi5jb29yZHMpXG4gICAgY29uc3Qgc3RhdHVzID0gY29tcHV0ZXJCb2FyZC5nZXRBdHRhY2tTdGF0dXMoLi4uY29vcmRzKVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcbiAgICAgIGV2ZW50cy5DT01QVVRFUl9CT0FSRF9BVFRBQ0tFRCxcbiAgICAgIHsgc3RhdGU6IGNvbXB1dGVyQm9hcmQuc3RhdGUsIHN0YXR1cywgcGxheWVyIH1cbiAgICApXG4gICAgaWYgKCFwbGF5ZXIudHVybikge1xuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5QTEFZRVJfRklOSVNIRURfVFVSTiwgbnVsbClcbiAgICB9XG4gICAgaWYgKGNvbXB1dGVyQm9hcmQuaXNGbGVldFN1bmsoKSkge1xuICAgICAgZ2FtZUVuZGVkID0gdHJ1ZVxuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5HQU1FX0VOREVELCBwbGF5ZXIubmFtZSlcbiAgICB9XG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuUExBWUVSX0ZJTklTSEVEX1RVUk4sIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkZWxheSgyNTApXG4gICAgY29uc3Qgc3RhdHVzID0gY29tcHV0ZXIuYXR0YWNrUGxheWVyKHBsYXllckJvYXJkKVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcbiAgICAgIGV2ZW50cy5DT01QVVRFUl9GSU5JU0hFRF9UVVJOLFxuICAgICAgeyBzdGF0ZTogcGxheWVyQm9hcmQuc3RhdGUsIHN0YXR1cywgcGxheWVyOiBjb21wdXRlciB9XG4gICAgKVxuICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdoaXQnKSB7XG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLlBMQVlFUl9GSU5JU0hFRF9UVVJOLCBudWxsKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHBsYXllci5jaGFuZ2VUdXJuKClcblxuICAgIGlmIChwbGF5ZXJCb2FyZC5pc0ZsZWV0U3VuaygpKSB7XG4gICAgICBnYW1lRW5kZWQgPSB0cnVlXG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkdBTUVfRU5ERUQsIGNvbXB1dGVyLm5hbWUpXG4gICAgfVxuICB9KVxufSkoKVxuIiwiaW1wb3J0IHsgZm9yRWFjaCwgcGlwZSwgZmlsdGVyLCBjdXJyeSB9IGZyb20gJy4uL3V0aWxzL2Z1bmNfaGVscGVycydcbmltcG9ydCB7IHJlbW92ZUNsYXNzIH0gZnJvbSAnLi9kb21fZnVuY3MnXG5cbmNvbnN0IF9jZWxsVGFibGUgPSB7XG4gIHM6ICdzaGlwJyxcbiAgdzogJ3dhdGVyJyxcbiAgaDogJ2hpdCcsXG4gIG06ICdtaXNzJyxcbiAgeDogJ3N1bmsnLFxuICBhOiAnYXJvdW5kLXN1bmsnXG59XG5cbmNvbnN0IF9jZWxsQ2xhc3NlcyA9IE9iamVjdC52YWx1ZXMoX2NlbGxUYWJsZSlcblxuY29uc3QgX2NyZWF0ZUNlbGwgPSAoaXNIaWRkZW4sIHksIHgpID0+IHtcbiAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpXG4gIGNlbGwuZGF0YXNldC55ID0geVxuICBjZWxsLmRhdGFzZXQueCA9IHhcbiAgY2VsbC5jbGFzc0xpc3QuYWRkKCd3YXRlcicpXG4gIGlmIChpc0hpZGRlbikgY2VsbC5jbGFzc0xpc3QuYWRkKCdmb2ctb2Ytd2FyJylcbiAgcmV0dXJuIGNlbGxcbn1cblxuY29uc3QgX2NlbGxzRmluZGVyID0ge1xuICBob3Jpem9udGFsbHkgKHksIHgsIHNpemUpIHtcbiAgICBjb25zdCBzZWdtZW50cyA9IFtdXG4gICAgY29uc3QgdGFpbCA9IHggKyBzaXplXG4gICAgZm9yIChsZXQgaSA9IHg7IGkgPCB0YWlsOyBpKyspIHtcbiAgICAgIHNlZ21lbnRzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteT0nJHt5fSddW2RhdGEteD0nJHtpfSddYCkpXG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50c1xuICB9LFxuICB2ZXJ0aWNhbGx5ICh5LCB4LCBzaXplKSB7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBbXVxuICAgIGNvbnN0IHRhaWwgPSB5ICsgc2l6ZVxuICAgIGZvciAobGV0IGkgPSB5OyBpIDwgdGFpbDsgaSsrKSB7XG4gICAgICBzZWdtZW50cy5wdXNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXk9JyR7aX0nXVtkYXRhLXg9JyR7eH0nXWApKVxuICAgIH1cbiAgICByZXR1cm4gc2VnbWVudHNcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYm9hcmRIYW5kbGVyID0gKCgpID0+IHtcbiAgbGV0IHBsYW5lID0gJ2hvcml6b250YWxseSdcblxuICBjb25zdCBleHRyYWN0Q29vcmRzID0gKGNlbGwpID0+XG4gICAgW2NlbGwuZGF0YXNldC55LCBjZWxsLmRhdGFzZXQueF0ubWFwKGNvb3JkID0+IE51bWJlcihjb29yZCkpXG5cbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoaXNIaWRkZW4sIGRvbUJvYXJkKSA9PiB7XG4gICAgZm9yIChsZXQgeSA9IDE7IHkgPCAxMTsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMTsgeCA8IDExOyB4KyspIHtcbiAgICAgICAgZG9tQm9hcmQuYXBwZW5kKF9jcmVhdGVDZWxsKGlzSGlkZGVuLCB5LCB4KSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCByZW5kZXJCb2FyZCA9IGN1cnJ5KChkb21Cb2FyZCwgYm9hcmRTdGF0ZSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGNlbGxTdGF0ZSA9IGJvYXJkU3RhdGVbaV1bal1cbiAgICAgICAgY29uc3QgY2VsbFZpZXcgPSBkb21Cb2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS15PScke2kgKyAxfSddW2RhdGEteD0nJHtqICsgMX0nXWApXG4gICAgICAgIGlmICghY2VsbFZpZXcuY2xhc3NMaXN0LmNvbnRhaW5zKF9jZWxsVGFibGVbY2VsbFN0YXRlXSkpIHtcbiAgICAgICAgICBjZWxsVmlldy5jbGFzc0xpc3QucmVtb3ZlKC4uLl9jZWxsQ2xhc3NlcylcbiAgICAgICAgICBjZWxsVmlldy5jbGFzc0xpc3QuYWRkKF9jZWxsVGFibGVbY2VsbFN0YXRlXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBjb25zdCBjbGVhckhpZ2hsaWdodHMgPSAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpXG4gICAgLmZvckVhY2goKGVsKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdmdXR1cmUtc2hpcCcsICd3cm9uZy1wbGFjZW1lbnQnKSlcblxuICBjb25zdCBoaWdobGlnaHRGdXR1cmVTaGlwID0gKHksIHgsIHNpemUsIGlzVmFsaWQpID0+IHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSAoaXNWYWxpZCkgPyAnZnV0dXJlLXNoaXAnIDogJ3dyb25nLXBsYWNlbWVudCdcbiAgICBjb25zdCBzZWdtZW50cyA9IF9jZWxsc0ZpbmRlcltwbGFuZV0oeSwgeCwgc2l6ZSlcbiAgICBjbGVhckhpZ2hsaWdodHMoKVxuICAgIHBpcGUoXG4gICAgICBmaWx0ZXIoKGVsKSA9PiBCb29sZWFuKGVsKSksXG4gICAgICBmb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpKVxuICAgICkoc2VnbWVudHMpXG4gIH1cblxuICBjb25zdCBkaXNwbGF5Qm9hcmQgPSAoYm9hcmQpID0+IHtcbiAgICByZW1vdmVDbGFzcygnZGlzcGxheS1ub25lJywgYm9hcmQpXG4gIH1cblxuICBjb25zdCBwbGFjZSA9ICh5LCB4LCBzaXplKSA9PiB7XG4gICAgY29uc3Qgc2hpcFNlZ21lbnRzID0gX2NlbGxzRmluZGVyW3BsYW5lXSh5LCB4LCBzaXplKVxuICAgIHNoaXBTZWdtZW50cy5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpKVxuICB9XG5cbiAgY29uc3Qgc2V0UGxhbmUgPSAobmV3UGxhbmUpID0+IHsgcGxhbmUgPSBuZXdQbGFuZSB9XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVCb2FyZCxcbiAgICByZW5kZXJCb2FyZCxcbiAgICBzZXRQbGFuZSxcbiAgICBleHRyYWN0Q29vcmRzLFxuICAgIGhpZ2hsaWdodEZ1dHVyZVNoaXAsXG4gICAgY2xlYXJIaWdobGlnaHRzLFxuICAgIGRpc3BsYXlCb2FyZCxcbiAgICBwbGFjZVxuICB9XG59KSgpXG4iLCJpbXBvcnQgeyBjdXJyeSB9IGZyb20gJy4uL3V0aWxzL2Z1bmNfaGVscGVycydcblxuY29uc3Qgd3JhcEluRGl2ID0gY3VycnkoKHN0ciwgY2xhc3NlcykgPT4ge1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBkaXYuaW5uZXJUZXh0ID0gc3RyXG4gIGRpdi5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpXG4gIHJldHVybiBkaXZcbn0pXG5cbmNvbnN0IGNyZWF0ZUVsID0gY3VycnkoKGNsYXNzZXMsIGVsZW1lbnQpID0+IHtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpXG4gIGVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NlcylcbiAgcmV0dXJuIGVsXG59KVxuXG5jb25zdCBhZGRJZCA9IGN1cnJ5KChpZCwgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmlkID0gaWRcbiAgcmV0dXJuIGVsZW1lbnRcbn0pXG5cbmNvbnN0IGFkZENsYXNzID0gY3VycnkoKG5ld0NsYXNzLCBlbGVtZW50KSA9PiB7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuZXdDbGFzcylcbiAgcmV0dXJuIGVsZW1lbnRcbn0pXG5cbmNvbnN0IHJlbW92ZUNsYXNzID0gY3VycnkoKHJlbW92ZWQsIGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHJlbW92ZWQpXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCByZXBsYWNlQ2xhc3MgPSBjdXJyeSgob2xkQ2xhc3MsIG5ld0NsYXNzLCBlbGVtZW50KSA9PiB7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LnJlcGxhY2Uob2xkQ2xhc3MsIG5ld0NsYXNzKVxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgYWRkRGF0YUF0dHIgPSBjdXJyeSgoZGF0YUF0dHIsIGRhdGFWYWwsIGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudFtkYXRhQXR0cl0gPSBkYXRhVmFsXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCBjc3NTZWxlY3RvciA9IGN1cnJ5KChlbGVtZW50LCBxdWVyeSkgPT4ge1xuICByZXR1cm4gZWxlbWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KVxufSlcblxuY29uc3QgcXVlcnlEb2N1bWVudCA9IGNzc1NlbGVjdG9yKGRvY3VtZW50KVxuXG5leHBvcnQge1xuICB3cmFwSW5EaXYsXG4gIGNyZWF0ZUVsLFxuICBhZGRJZCxcbiAgYWRkQ2xhc3MsXG4gIHJlbW92ZUNsYXNzLFxuICByZXBsYWNlQ2xhc3MsXG4gIGFkZERhdGFBdHRyLFxuICBjc3NTZWxlY3RvcixcbiAgcXVlcnlEb2N1bWVudFxufVxuIiwiZXhwb3J0IGNvbnN0IGV2ZW50c0hhbmRsZXIgPSAoKCkgPT4ge1xuICBjb25zdCBldmVudHMgPSB7fVxuXG4gIHJldHVybiB7XG4gICAgb24gKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0gfHwgW11cbiAgICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pXG4gICAgfSxcblxuICAgIG9uRWFjaCAoYXJyT2ZFdmVudHMsIGZuKSB7XG4gICAgICBhcnJPZkV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICBldmVudHNbZXZlbnRdID0gZXZlbnRzW2V2ZW50XSB8fCBbXVxuICAgICAgICBldmVudHNbZXZlbnRdLnB1c2goZm4pXG4gICAgICB9KVxuICAgIH0sXG5cbiAgICBvZmYgKGV2ZW50TmFtZSwgcmVtb3ZlZEZuKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoKGZuKSA9PiBmbiAhPT0gcmVtb3ZlZEZuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0cmlnZ2VyIChldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4gZm4oZGF0YSkpXG4gICAgICB9XG4gICAgfVxuICB9XG59KSgpXG4iLCJjb25zdCBjdXJyeSA9IChmbikgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gY3VycmllZCAoLi4uYXJncykge1xuICAgIGlmIChmbi5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY3VycmllZC5iaW5kKG51bGwsIC4uLmFyZ3MpXG4gICAgfVxuICAgIHJldHVybiBmbiguLi5hcmdzKVxuICB9XG59XG5cbmNvbnN0IGNoZWNrVHJ1dGhpbmVzcyA9IChlbCkgPT4gQm9vbGVhbihlbClcblxuY29uc3QgY2hlY2tGYWxzaW5lc3MgPSAoZWwpID0+ICFlbFxuXG5jb25zdCBoYXNUcnV0aHlWYWx1ZXMgPSAoYXJyKSA9PiBhcnIuc29tZShjaGVja1RydXRoaW5lc3MpXG5cbmNvbnN0IGhhc0ZhbHN5VmFsdWVzID0gKGFycikgPT4gYXJyLnNvbWUoY2hlY2tGYWxzaW5lc3MpXG5cbmNvbnN0IHJlcGxhY2VFdmVyeU50aCA9IGN1cnJ5KChudGgsIHN0YXJ0LCB1bnRpbCwgdmFsdWUsIGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbLi4uYXJyXVxuICBjb25zdCBzID0gKHR5cGVvZiBzdGFydCA9PT0gJ251bWJlcicpID8gc3RhcnQgOiBudGggLSAxXG4gIGNvbnN0IGxlbiA9IHVudGlsIHx8IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IHM7IGkgPCBsZW47IGkgKz0gbnRoKSB7XG4gICAgcmVzdWx0W2ldID0gdmFsdWVcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCByZXBsYWNlQXQgPSBjdXJyeSgoaW5kZXgsIHZhbHVlLCBhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gWy4uLmFycl1cbiAgcmVzdWx0W2luZGV4XSA9IHZhbHVlXG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IG1hcCA9IGN1cnJ5KChmbiwgZnVuY3RvcikgPT4ge1xuICBsZXQgcmVzdWx0XG4gIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0b3IpKSB7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOlxuICAgICAgcmVzdWx0ID0gW11cbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBmdW5jdG9yKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGZuKGl0ZW0pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG4gICAgICByZXN1bHQgPSB7fVxuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKGZ1bmN0b3IpKSB7XG4gICAgICAgIHJlc3VsdFtwcm9wXSA9IGZuKGZ1bmN0b3JbcHJvcF0pXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn0pXG5cbmNvbnN0IGlzQXJyYXkgPSBjdXJyeSgodmFsKSA9PiAoXG4gIHZhbCAhPT0gbnVsbCAmJlxuICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuKSlcblxuY29uc3QgaXNPYmplY3QgPSBjdXJyeSgodmFsKSA9PiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cbmNvbnN0IHBpcGUgPSAoLi4uZnVuY3Rpb25zKSA9PlxuICAodmFsdWUpID0+IGZ1bmN0aW9ucy5yZWR1Y2UoKGFjYywgZm4pID0+IGZuKGFjYyksIHZhbHVlKVxuXG5jb25zdCBkZWNyZW1lbnQgPSBjdXJyeSgodmFsKSA9PiAoaXNBcnJheSh2YWwpIHx8IGlzT2JqZWN0KHZhbCkpXG4gID8gbWFwKChuKSA9PiAodHlwZW9mIG4gPT09ICdudW1iZXInKSA/IG4gLSAxIDogbiwgdmFsKVxuICA6IHZhbCAtIDFcbilcblxuY29uc3QgZGVjcmVtZW50RWFjaCA9IG1hcChkZWNyZW1lbnQpXG5cbmNvbnN0IGluY3JlbWVudCA9IGN1cnJ5KCh2YWwpID0+IChpc0FycmF5KHZhbCkgfHwgaXNPYmplY3QodmFsKSlcbiAgPyBtYXAoKG4pID0+ICh0eXBlb2YgbiA9PT0gJ251bWJlcicpID8gbiArIDEgOiBuLCB2YWwpXG4gIDogdmFsICsgMVxuKVxuXG5jb25zdCBpbmNyZW1lbnRFYWNoID0gbWFwKGluY3JlbWVudClcblxuY29uc3QgcmVwZWF0ID0gY3VycnkoKGZuLCBudW0pID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbnVtKSB7XG4gICAgcmVzdWx0W2ldID0gZm4oaSlcbiAgICBpKytcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCBmaW5kID0gY3VycnkoKGZuLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBpZiAoZm4oYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIGFycltpXVxuICAgIH1cbiAgICBpKytcbiAgfVxufSlcblxuY29uc3QgZmluZEluZGV4ID0gY3VycnkoKGZuLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBpZiAoZm4oYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIGlcbiAgICB9XG4gICAgaSsrXG4gIH1cbn0pXG5cbmNvbnN0IGZvckVhY2ggPSBjdXJyeSgoZm4sIGFycikgPT4ge1xuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIGZuKGFycltpXSlcbiAgICBpKytcbiAgfVxuICByZXR1cm4gYXJyXG59KVxuXG5jb25zdCBmbGF0dGVuID0gY3VycnkoKGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBjb25zdCBpbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBpbGVuKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnJbaV0pID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICBjb25zdCBqYXJyID0gZmxhdHRlbihhcnJbaV0pXG4gICAgICBjb25zdCBqbGVuID0gamFyci5sZW5ndGhcbiAgICAgIGxldCBqID0gMFxuICAgICAgd2hpbGUgKGogPCBqbGVuKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGphcnJbal0pXG4gICAgICAgIGorK1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChhcnJbaV0pXG4gICAgfVxuICAgIGkrK1xuICB9XG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IGZpbHRlciA9IGN1cnJ5KChmbiwgYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgaWYgKGZuKGFycltpXSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGFycltpXSlcbiAgICB9XG4gICAgaSsrXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuY29uc3Qgb2JqRXF1YWwgPSBjdXJyeSgob2JqMSwgb2JqMikgPT4ge1xuICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMob2JqMSkpIHtcbiAgICBpZiAob2JqMVtwcm9wXSAhPT0gb2JqMltwcm9wXSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59KVxuXG5jb25zdCBvYmplY3RJbkFycmF5ID0gY3VycnkoKG9iaiwgYXJyKSA9PiB7XG4gIGZvciAoY29uc3QgY3VycmVudE9iaiBvZiBhcnIpIHtcbiAgICBpZiAob2JqRXF1YWwoY3VycmVudE9iaiwgb2JqKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59KVxuXG5jb25zdCByZW1vdmVEdXBsaWNhdGVPYmogPSBjdXJyeSgoYXJyKSA9PiB7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgaWYgKGxlbiA8PSAxKSByZXR1cm4gYXJyXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGxldCBvY2N1cmFuY2VzID0gMFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKCFvYmplY3RJbkFycmF5KGFycltpXSwgcmVzdWx0KSkge1xuICAgICAgcmVzdWx0LnB1c2goYXJyW2ldKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCByZW1vdmUgPSBjdXJyeSgoaXRlbSwgYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFsuLi5hcnJdXG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChhcnJbaV0gPT09IGl0ZW0pIHtcbiAgICAgIHJlc3VsdC5zcGxpY2UoaSwgMSlcbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuY29uc3QgZ3QgPSBjdXJyeSgoYSwgYikgPT4gYSA+IGIpXG5jb25zdCBsdCA9IGN1cnJ5KChhLCBiKSA9PiBhIDwgYilcbmNvbnN0IGd0ZSA9IGN1cnJ5KChhLCBiKSA9PiBhID49IGIpXG5jb25zdCBsdGUgPSBjdXJyeSgoYSwgYikgPT4gYSA8PSBiKVxuY29uc3QgZXEgPSBjdXJyeSgoYSwgYikgPT4gYSA9PT0gYilcblxuY29uc3QgYWxsID0gY3VycnkoKHByZWQsIGFycikgPT4ge1xuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXByZWQoYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59KVxuXG5jb25zdCBhbnkgPSBjdXJyeSgocHJlZCwgYXJyKSA9PiB7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChwcmVkKGFycltpXSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufSlcblxuY29uc3QgbW9kaWZ5ID0gY3VycnkoKHByb3AsIGZuLCBvYmopID0+IFxuICBPYmplY3QuYXNzaWduKFxuICAgIHt9LFxuICAgIG9iaixcbiAgICB7IFtwcm9wXTogZm4ob2JqW3Byb3BdKSB9XG4gICkpXG5cbmV4cG9ydCB7IGhhc1RydXRoeVZhbHVlcywgcmVwbGFjZUV2ZXJ5TnRoLCByZXBsYWNlQXQsIHBpcGUsIG1hcCwgY3VycnksIGRlY3JlbWVudCwgZGVjcmVtZW50RWFjaCwgaW5jcmVtZW50LCBpbmNyZW1lbnRFYWNoLCByZXBlYXQsIGZpbmQsIGZpbmRJbmRleCwgZm9yRWFjaCwgaGFzRmFsc3lWYWx1ZXMsIGZsYXR0ZW4sIGZpbHRlciwgb2JqRXF1YWwsIG9iamVjdEluQXJyYXksIHJlbW92ZUR1cGxpY2F0ZU9iaiwgcmVtb3ZlLCBndCwgbHQsIGd0ZSwgbHRlLCBlcSwgYWxsLCBhbnksIGlzQXJyYXksIGlzT2JqZWN0LCBtb2RpZnkgfVxuIiwiY29uc3QgZ2V0UmFuZG9tSW50ZWdlciA9IChtaW4sIG1heCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pblxuXG5jb25zdCBnZXRSYW5kb21Db29yZHMgPSAoKSA9PiB7XG4gIGNvbnN0IHkgPSBnZXRSYW5kb21JbnRlZ2VyKDEsIDEwKVxuICBjb25zdCB4ID0gZ2V0UmFuZG9tSW50ZWdlcigxLCAxMClcbiAgcmV0dXJuIHsgeSwgeCB9XG59XG5cbmNvbnN0IGRlbGF5ID0gYXN5bmMgKG1zKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpXG4gIH0pXG59XG5cbmV4cG9ydCB7IGdldFJhbmRvbUludGVnZXIsIGdldFJhbmRvbUNvb3JkcywgZGVsYXkgfVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIC8vIElFIDggaGFzIGEgYnJva2VuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB0aGF0IG9ubHkgd29ya3Mgb24gRE9NIG9iamVjdHMuXG4gICAgZGVmaW5lKHt9LCBcIlwiKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZGVmaW5lID0gZnVuY3Rpb24ob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBkZWZpbmUoR3AsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwgR2VuZXJhdG9yRnVuY3Rpb24pO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0LCBQcm9taXNlSW1wbCkge1xuICAgIGlmIChQcm9taXNlSW1wbCA9PT0gdm9pZCAwKSBQcm9taXNlSW1wbCA9IFByb21pc2U7XG5cbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksXG4gICAgICBQcm9taXNlSW1wbFxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgZGVmaW5lKEdwLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JcIik7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCBpbiBtb2Rlcm4gZW5naW5lc1xuICAvLyB3ZSBjYW4gZXhwbGljaXRseSBhY2Nlc3MgZ2xvYmFsVGhpcy4gSW4gb2xkZXIgZW5naW5lcyB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBnbG9iYWxUaGlzLnJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG4gIH0gZWxzZSB7XG4gICAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdO1xuXG4gIGlmIChfaSA9PSBudWxsKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuXG4gIHZhciBfcywgX2U7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5TGltaXQgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5TGltaXQuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlUmVzdCBmcm9tIFwiLi9ub25JdGVyYWJsZVJlc3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZXMvc3R5bGUuY3NzJ1xuaW1wb3J0ICcuL2xvZ2ljL2dhbWVfaGFuZGxlcidcbiJdLCJuYW1lcyI6WyJzdGF0ZXMiLCJPYmplY3QiLCJmcmVlemUiLCJXQVRFUiIsIlNISVAiLCJNSVNTRUQiLCJISVQiLCJTVU5LIiwiQVJPVU5EX1NVTksiLCJldmVudHMiLCJCT0FSRF9IT1ZFUkVEIiwiQk9BUkRfQ0xJQ0tFRCIsIlNISVBfVkFMSURBVEVEIiwiU0hJUF9ST1RBVEVEIiwiU0hJUF9QTEFDRUQiLCJQTEFZRVJTX0NSRUFURUQiLCJHQU1FX1NUQVJURUQiLCJDT01QVVRFUl9QTEFDRURfU0hJUFMiLCJDT01QVVRFUl9CT0FSRF9DTElDS0VEIiwiQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQiLCJQTEFZRVJfRklOSVNIRURfVFVSTiIsIkNPTVBVVEVSX0ZJTklTSEVEX1RVUk4iLCJHQU1FX0VOREVEIiwiR2FtZWJvYXJkIiwiZ2V0UmFuZG9tSW50ZWdlciIsImdldFJhbmRvbUNvb3JkcyIsIl9nZXRSYW5kb21QbGFuZSIsIkFpR2FtZWJvYXJkIiwiZ2FtZWJvYXJkIiwiX3BsYWNlU2hpcEF0UmFuZG9tIiwic2l6ZSIsInBsYW5lIiwiY29vcmRzIiwic2V0UGxhbmUiLCJpc1ZhbGlkRm9yUGxhY2UiLCJ5IiwieCIsInBsYWNlIiwicGxhY2VGbGVldCIsImFzc2lnbiIsIlBsYXllciIsImN1cnJ5IiwiZ3QiLCJsdCIsInJlbW92ZSIsIl9hdHRhY2tEaXJlY3Rpb25zIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiX2dldE9wcG9zaXRlRGlyZWN0aW9uIiwiZGlyZWN0aW9uIiwiX2lzU2hpcEhvcml6b250YWwiLCJoaXRDZWxscyIsImxlbmd0aCIsIl9nZXRFbmRPbkF4aXMiLCJheGlzIiwiZ2V0TGFzdCIsImNvbXBhcmlzb25PcCIsInJlZHVjZSIsInByZXYiLCJuZXh0IiwiX2dldExlZnRtb3N0IiwiX2dldFJpZ2h0bW9zdCIsIl9nZXRUb3Btb3N0IiwiX2dldEJvdHRvbW1vc3QiLCJBaVBsYXllciIsImNvbXB1dGVyIiwibGFzdEhpdCIsIl9maW5kUmFuZG9tU3BvdFRvQXR0YWNrIiwiYm9hcmQiLCJpbmNsdWRlcyIsInN0YXRlIiwiX2ZpbmRTcG90QWZ0ZXJIaXQiLCJkaXJlY3Rpb25zIiwia2V5cyIsInJhbmRvbURpcmVjdGlvbiIsInJ5IiwicngiLCJpc1ZhbGlkVGFyZ2V0IiwicmFuZG9tQ29vcmRzIiwidmFsaWRpdHkiLCJfZ2Fpbk9wcG9zaXRlRW5kIiwibGVmdG1vc3QiLCJyaWdodG1vc3QiLCJ0b3Btb3N0IiwiYm90dG9tbW9zdCIsIl9hdHRhY2tTcGVjaWZpY1Nwb3QiLCJhdHRhY2siLCJzdGF0dXMiLCJnZXRBdHRhY2tTdGF0dXMiLCJfYXR0YWNrSW5EaXJlY3Rpb24iLCJhdHRhY2tQbGF5ZXIiLCJ2YWx1ZSIsIl9hdHRhY2tBZnRlckhpdCIsInB1c2giLCJfYXR0YWNrUmFuZG9tQ2VsbCIsInNoaXBTdGF0dXMiLCJzZXREaXJlY3Rpb24iLCJ2YWwiLCJuYW1lIiwidHlwZSIsInJlcGVhdCIsImZpbmRJbmRleCIsInBpcGUiLCJtYXAiLCJmbGF0dGVuIiwiZGVjcmVtZW50IiwiZXEiLCJhbnkiLCJmaWx0ZXIiLCJvYmplY3RJbkFycmF5IiwicmVtb3ZlRHVwbGljYXRlT2JqIiwiU2hpcCIsIl9jcmVhdGVSb3ciLCJfY3JlYXRlR2FtZWJvYXJkIiwiX21hcENvb3JkcyIsInJlc3VsdCIsImkiLCJfY29vcmRzVG9JbmRleGVzIiwiZmxlZXQiLCJtaXNzZWQiLCJfbWFwQm9hcmQiLCJfbWFwU2hpcCIsIl9tYXBNaXNzZWQiLCJfbWFwSGl0IiwiX21hcFN1bmsiLCJfbWFwQXJvdW5kIiwiX2ZpbmRTaGlwIiwiZmluZCIsInNoaXAiLCJzZWdtZW50cyIsInNlZ21lbnQiLCJfZ2V0U2VnbWVudHMiLCJfaXNTaGlwU3VuayIsImlzU3VuayIsIl9nZXRTaGlwQ2VsbHMiLCJfZ2V0U3Vua0NlbGxzIiwiY2VsbCIsIl9hbnlTaGlwIiwiaXNGbGVldFN1bmsiLCJldmVyeSIsIl9pc092ZXJsYXBzIiwib2NjdXBpZWRDZWxscyIsInRhaWwiLCJqIiwiX2lzT3ZlcmZsb3dzIiwiX2dldENlbGxTdGF0ZSIsIml5IiwiaXgiLCJyb3ciLCJfaXNBZGphY2VudFRvU2hpcHMiLCJ0b3BDZWxsIiwiYm90dG9tQ2VsbCIsImxlZnRDZWxsIiwicmlnaHRDZWxsIiwidG9wTGVmdCIsImJvdHRvbUxlZnQiLCJ0b3BSaWdodCIsImJvdHRvbVJpZ2h0IiwiX2dldFN1cnJvdW5kaW5nQ2VsbHMiLCJfaXNDZWxsVmFsaWQiLCJnZXRBcmVhQXJvdW5kU3VuayIsInN1bmtDZWxscyIsInJlY2VpdmVBdHRhY2siLCJoaXRTaGlwIiwiaGl0U2VnbWVudEluZGV4IiwiaGl0IiwiYXR0YWNrZWRDZWxsIiwibmV3UGxhbmUiLCJpc0ZpcnN0IiwidHVybiIsImNoYW5nZVR1cm4iLCJfdHlwZXMiLCJfc2VnbWVudHNDcmVhdG9yIiwiaG9yaXpvbnRhbGx5IiwiaW50YWN0IiwidmVydGljYWxseSIsInVuZGVmaW5lZCIsIkVycm9yIiwiZXZlbnRzSGFuZGxlciIsImJvYXJkSGFuZGxlciIsIndyYXBJbkRpdiIsInF1ZXJ5RG9jdW1lbnQiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwicmVwbGFjZUNsYXNzIiwiZGVsYXkiLCJ1aUxvZ2ljIiwic3RhcnRCdG4iLCJyZXN0YXJ0QnRuIiwibmFtZUlucCIsIm5hbWVJbnBEaXYiLCJyb3RhdGVCdG4iLCJsb2dEaXYiLCJoaW50c0RpdiIsIm5hbWVJbnB1dGVkIiwiQm9vbGVhbiIsInNoaXBzUGxhY2VkIiwiZGlzYWJsZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZm9yRWFjaCIsImVsIiwicGFyZW50Tm9kZSIsInRyaWdnZXIiLCJpbm5lclRleHQiLCJkYXRhc2V0IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJvbiIsImFyZVNoaXBzUGxhY2VkIiwic2hpcFR5cGUiLCJvbkVhY2giLCJwbGF5ZXIiLCJsb2dDbGFzcyIsIm1zZyIsImRpdiIsInByZXBlbmQiLCJib2FyZFZpZXdMb2dpYyIsInBsYXllckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsImNyZWF0ZUJvYXJkIiwicmVuZGVyUGxheWVyIiwicmVuZGVyQm9hcmQiLCJyZW5kZXJDb21wdXRlciIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiZXh0cmFjdENvb3JkcyIsImRhdGEiLCJoaWdobGlnaHRGdXR1cmVTaGlwIiwiZGlzcGxheUJvYXJkIiwiY2xlYXJIaWdobGlnaHRzIiwiZ2FtZUxvZ2ljIiwic2hpcHNUb1BsYWNlIiwiZ2FtZVN0YXJ0ZWQiLCJnYW1lRW5kZWQiLCJuZXh0U2hpcFNpemUiLCJpc1ZhbGlkIiwic2hpZnQiLCJfY2VsbFRhYmxlIiwicyIsInciLCJoIiwibSIsImEiLCJfY2VsbENsYXNzZXMiLCJ2YWx1ZXMiLCJfY3JlYXRlQ2VsbCIsImlzSGlkZGVuIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwiX2NlbGxzRmluZGVyIiwicXVlcnlTZWxlY3RvciIsImNvb3JkIiwiTnVtYmVyIiwiZG9tQm9hcmQiLCJhcHBlbmQiLCJib2FyZFN0YXRlIiwiY2VsbFN0YXRlIiwiY2VsbFZpZXciLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xhc3NOYW1lIiwic2hpcFNlZ21lbnRzIiwic3RyIiwiY2xhc3NlcyIsImNyZWF0ZUVsIiwiZWxlbWVudCIsImFkZElkIiwiaWQiLCJuZXdDbGFzcyIsInJlbW92ZWQiLCJvbGRDbGFzcyIsInJlcGxhY2UiLCJhZGREYXRhQXR0ciIsImRhdGFBdHRyIiwiZGF0YVZhbCIsImNzc1NlbGVjdG9yIiwicXVlcnkiLCJldmVudE5hbWUiLCJmbiIsImFyck9mRXZlbnRzIiwiZXZlbnQiLCJvZmYiLCJyZW1vdmVkRm4iLCJjdXJyaWVkIiwiYXJncyIsImJpbmQiLCJjaGVja1RydXRoaW5lc3MiLCJjaGVja0ZhbHNpbmVzcyIsImhhc1RydXRoeVZhbHVlcyIsImFyciIsInNvbWUiLCJoYXNGYWxzeVZhbHVlcyIsInJlcGxhY2VFdmVyeU50aCIsIm50aCIsInN0YXJ0IiwidW50aWwiLCJsZW4iLCJyZXBsYWNlQXQiLCJpbmRleCIsImZ1bmN0b3IiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJpdGVtIiwicHJvcCIsImlzQXJyYXkiLCJpc09iamVjdCIsImZ1bmN0aW9ucyIsImFjYyIsIm4iLCJkZWNyZW1lbnRFYWNoIiwiaW5jcmVtZW50IiwiaW5jcmVtZW50RWFjaCIsIm51bSIsImlsZW4iLCJqYXJyIiwiamxlbiIsIm9iakVxdWFsIiwib2JqMSIsIm9iajIiLCJvYmoiLCJjdXJyZW50T2JqIiwib2NjdXJhbmNlcyIsInNwbGljZSIsImIiLCJndGUiLCJsdGUiLCJhbGwiLCJwcmVkIiwibW9kaWZ5IiwibWluIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiXSwic291cmNlUm9vdCI6IiJ9