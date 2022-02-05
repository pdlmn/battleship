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
    var sizes = [5, 4, 3, 2, 2];

    for (var _i = 0, _sizes = sizes; _i < _sizes.length; _i++) {
      var size = _sizes[_i];

      _placeShipAtRandom(size);
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
/* harmony import */ var _utils_helper_funcs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/helper_funcs */ "./utils/helper_funcs.js");
/* harmony import */ var _ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../ui/dom_funcs */ "./ui/dom_funcs.js");














(function menuHandler() {
  var startBtn = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#start-game');
  var restartBtn = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#restart-game');
  var nameInp = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#player-name');
  var rotateBtn = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#rotate');
  var logDiv = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#log');
  var hintsDiv = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#hints');
  var shipsPlaced = false;
  var msgCount = 0;

  var _hide = function _hide(el) {
    return (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.addClass)('display-none', el);
  };

  var _show = function _show(el) {
    return (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.removeClass)('display-none', el);
  };

  var handleStart = function handleStart() {
    ;
    [startBtn, rotateBtn].forEach(_hide);

    _show(restartBtn);

    nameInp.disabled = true;
    hintsDiv.innerText = 'Good luck, Admiral!';
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_STARTED, nameInp.value);
  };

  var rotate = function rotate() {
    if (rotateBtn.dataset.plane === 'vertically') {
      rotateBtn.dataset.plane = 'horizontally';
      rotateBtn.innerText = 'Horizontal';
    } else if (rotateBtn.dataset.plane === 'horizontally') {
      rotateBtn.dataset.plane = 'vertically';
      rotateBtn.innerText = 'Vertical';
    }

    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_ROTATED, rotateBtn.dataset.plane);
  };

  var checkStartConditions = function checkStartConditions() {
    startBtn.disabled = !(nameInp.value && shipsPlaced);
  };

  var checkShipsReadiness = function checkShipsReadiness(_ref) {
    var areShipsPlaced = _ref.areShipsPlaced,
        shipType = _ref.shipType;
    areShipsPlaced ? shipsPlaced = true : shipsPlaced = false;
    checkStartConditions();
    hintsDiv.innerText = "".concat(shipType, " has been placed.");
  };

  var _createLogMessage = function _createLogMessage(status, player) {
    var logClass = "log-".concat(player.type, "-").concat(status.shipStatus || status.value);
    var msg = "Turn ".concat(++msgCount, ". y").concat(status.y, " y").concat(status.x);

    if (status.value === 'missed') {
      msg += " ".concat(player.name, " missed...");
    }

    if (status.value === 'hit') {
      msg += " ".concat(player.name, " ").concat(status.shipStatus, " ").concat(status.ship, "!");
    }

    return (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.wrapInDiv)(msg, [logClass]);
  };

  var displayLogMessage = function displayLogMessage(_ref2) {
    var status = _ref2.status,
        player = _ref2.player;

    var log = _createLogMessage(status, player);

    var hint = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.cloneEl)(log);
    hint.id = 'hints';
    logDiv.prepend(log);
    hintsDiv = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.replaceEl)(hintsDiv, hint);
  };

  var handleEnd = function handleEnd(name) {
    hintsDiv.innerText = "".concat(name, " won!");
    (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.removeClass)('hidden', restartBtn);
  };

  var initMenu = function initMenu() {
    checkStartConditions();
    startBtn.addEventListener('click', handleStart);
    rotateBtn.addEventListener('click', rotate);
    nameInp.addEventListener('input', checkStartConditions);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_PLACED, checkShipsReadiness);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.onEach([_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_BOARD_ATTACKED, _constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_FINISHED_TURN], displayLogMessage);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_ENDED, handleEnd);
  };

  initMenu();
  return {
    initMenu: initMenu
  };
})();

(function boardViewLogic() {
  var playerBoard = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#player-board');
  var computerBoard = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#computer-board');
  var renderPlayer = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.renderBoard(playerBoard, false);
  var renderComputer = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.renderBoard(computerBoard, true);

  var createBoards = function createBoards() {
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.createBoard(false, playerBoard);
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.createBoard(true, computerBoard);
  };

  var sendCoordsForValidation = function sendCoordsForValidation(e) {
    if (e.target.classList.contains('cell')) {
      var coords = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.extractCoords(e.target);
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.BOARD_HOVERED, coords);
    }
  };

  var hightlightValidatedCoords = function hightlightValidatedCoords(data) {
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.highlightFutureShip.apply(_ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(data));
  };

  var sendShipForValidation = function sendShipForValidation(e) {
    if (e.target.classList.contains('cell')) {
      var coords = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.extractCoords(e.target);
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.BOARD_CLICKED, coords);
    }
  };

  var placeValidatedShip = function placeValidatedShip(_ref3) {
    var ship = _ref3.ship;
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.place.apply(_ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__["default"])(ship));
  };

  var renderComputerState = function renderComputerState(_ref4) {
    var state = _ref4.state;
    renderComputer(state);
  };

  var renderPlayerState = function renderPlayerState(_ref5) {
    var state = _ref5.state;
    renderPlayer(state);
  };

  var sendAttackedCoords = function sendAttackedCoords(e) {
    if (e.target.classList.contains('cell')) {
      var coords = _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.extractCoords(e.target);
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_BOARD_CLICKED, coords);
    }
  };

  var stopListeningToPreGameEvents = function stopListeningToPreGameEvents() {
    playerBoard.removeEventListener('mouseover', sendCoordsForValidation);
    playerBoard.removeEventListener('click', sendShipForValidation);
    playerBoard.removeEventListener('mouseleave', _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.clearHighlights);
  };

  var initBoards = function initBoards() {
    createBoards();
    playerBoard.addEventListener('mouseover', sendCoordsForValidation);
    playerBoard.addEventListener('click', sendShipForValidation);
    playerBoard.addEventListener('mouseleave', _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.clearHighlights);
    computerBoard.addEventListener('click', sendAttackedCoords);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_VALIDATED, hightlightValidatedCoords);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_PLACED, placeValidatedShip);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_ROTATED, _ui_dom_board__WEBPACK_IMPORTED_MODULE_10__.boardHandler.setPlane);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_STARTED, stopListeningToPreGameEvents);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_FINISHED_TURN, renderPlayerState);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.onEach([_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_PLACED_SHIPS, _constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_BOARD_ATTACKED], renderComputerState);
  };

  initBoards();
  return {
    initBoards: initBoards
  };
})();

(function gameHandler() {
  var shipsToPlace = [5, 4, 3, 2, 2];
  var playerBoard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_8__.Gameboard)();
  var computerBoard = (0,_factories_ai_gameboard__WEBPACK_IMPORTED_MODULE_9__.AiGameboard)();
  var player;
  var computer;
  var gameStarted = false;
  var gameEnded = false;

  var validateCoords = function validateCoords(coords) {
    if (shipsToPlace.length === 0) return;

    var _coords = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(coords, 2),
        y = _coords[0],
        x = _coords[1];

    var nextShipSize = shipsToPlace[0];
    var isValid = playerBoard.isValidForPlace(y, x, nextShipSize);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_VALIDATED, [y, x, nextShipSize, isValid]);
  };

  var validatePlacement = function validatePlacement(coords) {
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
  };

  var startGame = function startGame(name) {
    gameStarted = true;
    player = (0,_factories_player__WEBPACK_IMPORTED_MODULE_6__.Player)(name, true);
    computer = (0,_factories_ai_player__WEBPACK_IMPORTED_MODULE_7__.AiPlayer)();
    computerBoard.placeFleet(5);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_PLACED_SHIPS, {
      state: computerBoard.state
    });
  };

  var handlePlayerAttack = function handlePlayerAttack(coords) {
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
  };

  var handleComputerAttack = /*#__PURE__*/function () {
    var _ref6 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
      var status;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!playerBoard.isFleetSunk()) {
                _context.next = 4;
                break;
              }

              gameEnded = true;
              _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_ENDED, computer.name);
              return _context.abrupt("return");

            case 4:
              _context.next = 6;
              return (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_11__.delay)(400);

            case 6:
              status = computer.attackPlayer(playerBoard);
              _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_FINISHED_TURN, {
                state: playerBoard.state,
                status: status,
                player: computer
              });

              if (!(status.value === 'hit')) {
                _context.next = 11;
                break;
              }

              _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.PLAYER_FINISHED_TURN, null);
              return _context.abrupt("return");

            case 11:
              player.changeTurn();

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleComputerAttack() {
      return _ref6.apply(this, arguments);
    };
  }();

  var initGame = function initGame() {
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.BOARD_HOVERED, validateCoords);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.BOARD_CLICKED, validatePlacement);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_ROTATED, playerBoard.setPlane);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_STARTED, startGame);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_BOARD_CLICKED, handlePlayerAttack);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.PLAYER_FINISHED_TURN, handleComputerAttack);
  };

  initGame();
  return {
    initGame: initGame
  };
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
/* harmony import */ var _dom_funcs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom_funcs */ "./ui/dom_funcs.js");
/* harmony import */ var _constants_cell_states__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/cell_states */ "./constants/cell_states.js");



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

  var renderBoard = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.curry)(function (domBoard, isHidden, boardState) {
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var cellState = boardState[i][j];
        var cellView = domBoard.querySelector("[data-y='".concat(i + 1, "'][data-x='").concat(j + 1, "']"));

        if (!cellView.classList.contains(_cellTable[cellState])) {
          (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_1__.addClass)(_cellTable[cellState], cellView);
        }

        if (isHidden && [_constants_cell_states__WEBPACK_IMPORTED_MODULE_2__.states.MISSED, _constants_cell_states__WEBPACK_IMPORTED_MODULE_2__.states.HIT, _constants_cell_states__WEBPACK_IMPORTED_MODULE_2__.states.SUNK, _constants_cell_states__WEBPACK_IMPORTED_MODULE_2__.states.AROUND_SUNK].includes(cellState)) {
          (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_1__.removeClass)('fog-of-war', cellView);
        }
      }
    }
  });

  var clearHighlights = function clearHighlights() {
    return document.querySelectorAll('.cell').forEach(function (el) {
      return el.classList.remove('future-ship', 'wrong-placement', "h-".concat(plane, "-start"), "h-".concat(plane, "-end"));
    });
  };

  var highlightFutureShip = function highlightFutureShip(y, x, size, isValid) {
    var className = isValid ? 'future-ship' : 'wrong-placement';

    var segments = _cellsFinder[plane](y, x, size);

    clearHighlights();
    var validCells = segments.filter(function (el) {
      return Boolean(el);
    });
    validCells.forEach(function (el, i) {
      (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_1__.addClass)(className, el);
      if (i === 0) (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_1__.addClass)("h-".concat(plane, "-start"), el);
      if (i === segments.length - 1) (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_1__.addClass)("h-".concat(plane, "-end"), el);
    });
  };

  var place = function place(y, x, size) {
    var segments = _cellsFinder[plane](y, x, size);

    segments.forEach(function (el, i) {
      el.classList.add('ship');
      if (i === 0) (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_1__.addClass)("".concat(plane, "-start"), el);
      if (i === segments.length - 1) (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_1__.addClass)("".concat(plane, "-end"), el);
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
/* harmony export */   "wrapInDiv": () => (/* binding */ wrapInDiv),
/* harmony export */   "createEl": () => (/* binding */ createEl),
/* harmony export */   "addId": () => (/* binding */ addId),
/* harmony export */   "addClass": () => (/* binding */ addClass),
/* harmony export */   "addClasses": () => (/* binding */ addClasses),
/* harmony export */   "removeClass": () => (/* binding */ removeClass),
/* harmony export */   "removeClasses": () => (/* binding */ removeClasses),
/* harmony export */   "replaceClass": () => (/* binding */ replaceClass),
/* harmony export */   "toggleClass": () => (/* binding */ toggleClass),
/* harmony export */   "addDataAttr": () => (/* binding */ addDataAttr),
/* harmony export */   "cssSelector": () => (/* binding */ cssSelector),
/* harmony export */   "queryDocument": () => (/* binding */ queryDocument),
/* harmony export */   "replaceEl": () => (/* binding */ replaceEl),
/* harmony export */   "cloneEl": () => (/* binding */ cloneEl)
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
var toggleClass = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (toggledClass, element) {
  element.classList.toggle(toggledClass);
  return element;
});
var addClasses = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (classes, element) {
  var _element$classList;

  (_element$classList = element.classList).add.apply(_element$classList, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(classes));

  return element;
});
var removeClasses = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (classes, element) {
  var _element$classList2;

  (_element$classList2 = element.classList).remove.apply(_element$classList2, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(classes));

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
var replaceEl = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (oldElement, newElement) {
  oldElement.parentNode.replaceChild(newElement, oldElement);
  return newElement;
});
var cloneEl = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (element) {
  return element.cloneNode(true);
});


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBMEIsb0JBQW9CLENBQUU7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDanZCZTtBQUNmOztBQUVBLHlDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDUmU7QUFDZjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDRnFEO0FBQ3RDO0FBQ2YsaUNBQWlDLGdFQUFnQjtBQUNqRDs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNiZTtBQUNmO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0ZlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSw0QkFBNEIsK0JBQStCO0FBQzNEOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM1QmU7QUFDZjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNGZTtBQUNmO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGaUQ7QUFDWTtBQUNZO0FBQ3RCO0FBQ3BDO0FBQ2YsU0FBUyw4REFBYyxTQUFTLG9FQUFvQixZQUFZLDBFQUEwQixZQUFZLCtEQUFlO0FBQ3JIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnVEO0FBQ0o7QUFDc0I7QUFDbEI7QUFDeEM7QUFDZixTQUFTLGlFQUFpQixTQUFTLCtEQUFlLFNBQVMsMEVBQTBCLFNBQVMsaUVBQWlCO0FBQy9HOzs7Ozs7Ozs7Ozs7Ozs7O0FDTnFEO0FBQ3RDO0FBQ2Y7QUFDQSxvQ0FBb0MsZ0VBQWdCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLHNGQUFzRixnRUFBZ0I7QUFDdEc7Ozs7OztVQ1JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb25zdGFudHMvY2VsbF9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY29uc3RhbnRzL2V2ZW50X3R5cGVzLmpzIiwid2VicGFjazovLy8uL2ZhY3Rvcmllcy9haV9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vZmFjdG9yaWVzL2FpX3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovLy8uL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vLy4vbG9naWMvZ2FtZV9oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3VpL2RvbV9ib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi91aS9kb21fZnVuY3MuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvZXZlbnRzX2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvZnVuY19oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2hlbHBlcl9mdW5jcy5qcyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvc3R5bGUuY3NzP2RmMDYiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsImV4cG9ydCBjb25zdCBzdGF0ZXMgPSBPYmplY3QuZnJlZXplKHtcbiAgV0FURVI6ICd3JyxcbiAgU0hJUDogJ3MnLFxuICBNSVNTRUQ6ICdtJyxcbiAgSElUOiAnaCcsXG4gIFNVTks6ICd4JyxcbiAgQVJPVU5EX1NVTks6ICdhJ1xufSlcbiIsImV4cG9ydCBjb25zdCBldmVudHMgPSBPYmplY3QuZnJlZXplKHtcbiAgQk9BUkRfSE9WRVJFRDogJ0JvYXJkIGhvdmVyZWQnLFxuICBCT0FSRF9DTElDS0VEOiAnQm9hcmQgY2xpY2tlZCcsXG4gIFNISVBfVkFMSURBVEVEOiAnU2hpcCB2YWxpZGF0ZWQnLFxuICBTSElQX1JPVEFURUQ6ICdTaGlwIHJvdGF0ZWQnLFxuICBTSElQX1BMQUNFRDogJ1NoaXAgcGxhY2VkJyxcbiAgUExBWUVSU19DUkVBVEVEOiAnUGxheWVycyBjcmVhdGVkJyxcbiAgR0FNRV9TVEFSVEVEOiAnR2FtZSBzdGFydGVkJyxcbiAgQ09NUFVURVJfUExBQ0VEX1NISVBTOiAnQ29tcHV0ZXIgcGxhY2VkIHNoaXBzJyxcbiAgQ09NUFVURVJfQk9BUkRfQ0xJQ0tFRDogJ0NvbXB1dGVyIGJvYXJkIGNsaWNrZWQnLFxuICBDT01QVVRFUl9CT0FSRF9BVFRBQ0tFRDogJ0NvbXB1dGVyIGJvYXJkIGF0dGFja2VkJyxcbiAgUExBWUVSX0ZJTklTSEVEX1RVUk46ICdQbGF5ZXIgbWFkZSBtb3ZlJyxcbiAgQ09NUFVURVJfRklOSVNIRURfVFVSTjogJ0NvbXB1dGVyIG1hZGUgbW92ZScsXG4gIEdBTUVfRU5ERUQ6ICdHYW1lIGVuZGVkJ1xufSlcbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJ1xuaW1wb3J0IHsgZ2V0UmFuZG9tSW50ZWdlciwgZ2V0UmFuZG9tQ29vcmRzIH0gZnJvbSAnLi4vdXRpbHMvaGVscGVyX2Z1bmNzJ1xuXG5jb25zdCBfZ2V0UmFuZG9tUGxhbmUgPSAoKSA9PiB7XG4gIHJldHVybiBnZXRSYW5kb21JbnRlZ2VyKDEsIDIpID09PSAxID8gJ2hvcml6b250YWxseScgOiAndmVydGljYWxseSdcbn1cblxuZXhwb3J0IGNvbnN0IEFpR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxuXG4gIGNvbnN0IF9wbGFjZVNoaXBBdFJhbmRvbSA9IChzaXplKSA9PiB7XG4gICAgY29uc3QgcGxhbmUgPSBfZ2V0UmFuZG9tUGxhbmUoKVxuICAgIGxldCBjb29yZHMgPSBnZXRSYW5kb21Db29yZHMoKVxuICAgIGdhbWVib2FyZC5zZXRQbGFuZShwbGFuZSlcbiAgICB3aGlsZSAoIWdhbWVib2FyZC5pc1ZhbGlkRm9yUGxhY2UoY29vcmRzLnksIGNvb3Jkcy54LCBzaXplKSkge1xuICAgICAgY29vcmRzID0gZ2V0UmFuZG9tQ29vcmRzKClcbiAgICB9XG4gICAgZ2FtZWJvYXJkLnBsYWNlKGNvb3Jkcy55LCBjb29yZHMueCwgc2l6ZSlcbiAgfVxuXG4gIGNvbnN0IHBsYWNlRmxlZXQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2l6ZXMgPSBbNSwgNCwgMywgMiwgMl1cbiAgICBmb3IgKGxldCBzaXplIG9mIHNpemVzKSB7XG4gICAgICBfcGxhY2VTaGlwQXRSYW5kb20oc2l6ZSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihnYW1lYm9hcmQsIHtcbiAgICBwbGFjZUZsZWV0XG4gIH0pXG59XG4iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3BsYXllcidcbmltcG9ydCB7IHN0YXRlcyB9IGZyb20gJy4uL2NvbnN0YW50cy9jZWxsX3N0YXRlcydcbmltcG9ydCB7IGdldFJhbmRvbUludGVnZXIsIGdldFJhbmRvbUNvb3JkcyB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcl9mdW5jcydcbmltcG9ydCB7IGN1cnJ5LCBndCwgbHQsIHJlbW92ZSB9IGZyb20gJy4uL3V0aWxzL2Z1bmNfaGVscGVycydcblxuY29uc3QgX2F0dGFja0RpcmVjdGlvbnMgPSB7XG4gIGxlZnQ6ICh5LCB4KSA9PiAoeyB5LCB4OiB4IC0gMSB9KSxcbiAgcmlnaHQ6ICh5LCB4KSA9PiAoeyB5LCB4OiB4ICsgMSB9KSxcbiAgdG9wOiAoeSwgeCkgPT4gKHsgeTogeSAtIDEsIHggfSksXG4gIGJvdHRvbTogKHksIHgpID0+ICh7IHk6IHkgKyAxLCB4IH0pXG59XG5cbmNvbnN0IF9nZXRPcHBvc2l0ZURpcmVjdGlvbiA9IChkaXJlY3Rpb24pID0+IHtcbiAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHJldHVybiAncmlnaHQnXG4gICAgY2FzZSAncmlnaHQnOlxuICAgICAgcmV0dXJuICdsZWZ0J1xuICAgIGNhc2UgJ3RvcCc6XG4gICAgICByZXR1cm4gJ2JvdHRvbSdcbiAgICBjYXNlICdib3R0b20nOlxuICAgICAgcmV0dXJuICd0b3AnXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJ1xuICB9XG59XG5cbmNvbnN0IF9pc1NoaXBIb3Jpem9udGFsID0gKGhpdENlbGxzKSA9PlxuICBoaXRDZWxscy5sZW5ndGggPiAxXG4gICAgPyBoaXRDZWxsc1swXS55ID09PSBoaXRDZWxsc1sxXS55XG4gICAgOiBmYWxzZVxuXG5jb25zdCBfZ2V0RW5kT25BeGlzID0gY3VycnkoKGF4aXMsIGdldExhc3QsIGhpdENlbGxzKSA9PiB7XG4gIGNvbnN0IGNvbXBhcmlzb25PcCA9IGdldExhc3QgPyBndCA6IGx0XG4gIHJldHVybiBoaXRDZWxscy5yZWR1Y2UoKHByZXYsIG5leHQpID0+XG4gICAgY29tcGFyaXNvbk9wKHByZXZbYXhpc10sIG5leHRbYXhpc10pXG4gICAgICA/IHByZXZcbiAgICAgIDogbmV4dFxuICApXG59XG4pXG5cbmNvbnN0IF9nZXRMZWZ0bW9zdCA9IF9nZXRFbmRPbkF4aXMoJ3gnLCBmYWxzZSlcbmNvbnN0IF9nZXRSaWdodG1vc3QgPSBfZ2V0RW5kT25BeGlzKCd4JywgdHJ1ZSlcbmNvbnN0IF9nZXRUb3Btb3N0ID0gX2dldEVuZE9uQXhpcygneScsIGZhbHNlKVxuY29uc3QgX2dldEJvdHRvbW1vc3QgPSBfZ2V0RW5kT25BeGlzKCd5JywgdHJ1ZSlcblxuZXhwb3J0IGNvbnN0IEFpUGxheWVyID0gKCkgPT4ge1xuICBjb25zdCBjb21wdXRlciA9IFBsYXllcignQ29tcHV0ZXInLCBmYWxzZSlcbiAgbGV0IGhpdENlbGxzID0gW11cbiAgbGV0IGxhc3RIaXQgPSB7fVxuICBsZXQgZGlyZWN0aW9uID0gJydcblxuICBjb25zdCBfZmluZFJhbmRvbVNwb3RUb0F0dGFjayA9IChib2FyZCkgPT4ge1xuICAgIGxldCBjb29yZHMgPSBnZXRSYW5kb21Db29yZHMoKVxuICAgIHdoaWxlIChbc3RhdGVzLkhJVCwgc3RhdGVzLk1JU1NFRCwgc3RhdGVzLlNVTkssIHN0YXRlcy5BUk9VTkRfU1VOS10uaW5jbHVkZXMoYm9hcmQuc3RhdGVbY29vcmRzLnkgLSAxXVtjb29yZHMueCAtIDFdKSkge1xuICAgICAgY29vcmRzID0gZ2V0UmFuZG9tQ29vcmRzKClcbiAgICB9XG4gICAgcmV0dXJuIHsgeTogY29vcmRzLnksIHg6IGNvb3Jkcy54IH1cbiAgfVxuXG4gIGNvbnN0IF9maW5kU3BvdEFmdGVySGl0ID0gKGJvYXJkLCB5LCB4KSA9PiB7XG4gICAgbGV0IGRpcmVjdGlvbnMgPSBPYmplY3Qua2V5cyhfYXR0YWNrRGlyZWN0aW9ucylcbiAgICBsZXQgcmFuZG9tRGlyZWN0aW9uID0gZGlyZWN0aW9uc1tnZXRSYW5kb21JbnRlZ2VyKDAsIDMpXVxuICAgIGxldCB7IHk6IHJ5LCB4OiByeCB9ID0gX2F0dGFja0RpcmVjdGlvbnNbcmFuZG9tRGlyZWN0aW9uXSh5LCB4KVxuXG4gICAgd2hpbGUgKCFib2FyZC5pc1ZhbGlkVGFyZ2V0KHJ5LCByeCkgJiYgZGlyZWN0aW9ucy5sZW5ndGggPiAxKSB7XG4gICAgICBkaXJlY3Rpb25zID0gcmVtb3ZlKHJhbmRvbURpcmVjdGlvbiwgZGlyZWN0aW9ucylcbiAgICAgIHJhbmRvbURpcmVjdGlvbiA9IGRpcmVjdGlvbnNbZ2V0UmFuZG9tSW50ZWdlcigwLCBkaXJlY3Rpb25zLmxlbmd0aCAtIDEpXVxuICAgICAgY29uc3QgcmFuZG9tQ29vcmRzID0gX2F0dGFja0RpcmVjdGlvbnNbcmFuZG9tRGlyZWN0aW9uXSh5LCB4KVxuICAgICAgcnkgPSByYW5kb21Db29yZHMueVxuICAgICAgcnggPSByYW5kb21Db29yZHMueFxuICAgIH1cbiAgICBpZiAoIWJvYXJkLmlzVmFsaWRUYXJnZXQocnksIHJ4KSkge1xuICAgICAgcmV0dXJuIHsgdmFsaWRpdHk6IGZhbHNlIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsaWRpdHk6IHRydWUsIGRpcmVjdGlvbjogcmFuZG9tRGlyZWN0aW9uLCB5OiByeSwgeDogcnggfVxuICB9XG5cbiAgY29uc3QgX2dhaW5PcHBvc2l0ZUVuZCA9ICgpID0+IHtcbiAgICBsZXQgbGVmdG1vc3RcbiAgICBsZXQgcmlnaHRtb3N0XG4gICAgbGV0IHRvcG1vc3RcbiAgICBsZXQgYm90dG9tbW9zdFxuICAgIHN3aXRjaCAoX2lzU2hpcEhvcml6b250YWwoaGl0Q2VsbHMpKSB7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIGxlZnRtb3N0ID0gX2dldExlZnRtb3N0KGhpdENlbGxzKVxuICAgICAgICByaWdodG1vc3QgPSBfZ2V0UmlnaHRtb3N0KGhpdENlbGxzKVxuICAgICAgICByZXR1cm4gbGFzdEhpdC54ID09PSBsZWZ0bW9zdC54XG4gICAgICAgICAgPyByaWdodG1vc3RcbiAgICAgICAgICA6IGxlZnRtb3N0XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICB0b3Btb3N0ID0gX2dldFRvcG1vc3QoaGl0Q2VsbHMpXG4gICAgICAgIGJvdHRvbW1vc3QgPSBfZ2V0Qm90dG9tbW9zdChoaXRDZWxscylcbiAgICAgICAgcmV0dXJuIGxhc3RIaXQueSA9PT0gdG9wbW9zdC55XG4gICAgICAgICAgPyBib3R0b21tb3N0XG4gICAgICAgICAgOiB0b3Btb3N0XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ge31cbiAgICB9XG4gIH1cblxuICBjb25zdCBfYXR0YWNrU3BlY2lmaWNTcG90ID0gKGJvYXJkLCB5LCB4KSA9PiB7XG4gICAgY29tcHV0ZXIuYXR0YWNrKGJvYXJkLCB5LCB4KVxuICAgIGNvbnN0IHN0YXR1cyA9IGJvYXJkLmdldEF0dGFja1N0YXR1cyh5LCB4KVxuICAgIHJldHVybiBzdGF0dXNcbiAgfVxuXG4gIGNvbnN0IF9hdHRhY2tJbkRpcmVjdGlvbiA9IChib2FyZCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IF9hdHRhY2tEaXJlY3Rpb25zW2RpcmVjdGlvbl0obGFzdEhpdC55LCBsYXN0SGl0LngpXG4gICAgaWYgKCFib2FyZC5pc1ZhbGlkVGFyZ2V0KGNvb3Jkcy55LCBjb29yZHMueCkpIHtcbiAgICAgIGRpcmVjdGlvbiA9IF9nZXRPcHBvc2l0ZURpcmVjdGlvbihkaXJlY3Rpb24pXG4gICAgICBsYXN0SGl0ID0gX2dhaW5PcHBvc2l0ZUVuZCgpXG4gICAgICBpZiAoIWJvYXJkLmlzVmFsaWRUYXJnZXQoX2F0dGFja0RpcmVjdGlvbnNbZGlyZWN0aW9uXShsYXN0SGl0LnksIGxhc3RIaXQueCkpKSB7XG4gICAgICAgIGRpcmVjdGlvbiA9ICcnXG4gICAgICB9XG4gICAgICByZXR1cm4gYXR0YWNrUGxheWVyKGJvYXJkKVxuICAgIH1cbiAgICBjb21wdXRlci5hdHRhY2soYm9hcmQsIGNvb3Jkcy55LCBjb29yZHMueClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMoY29vcmRzLnksIGNvb3Jkcy54KVxuICAgIGlmIChzdGF0dXMudmFsdWUgIT09ICdoaXQnKSB7XG4gICAgICBkaXJlY3Rpb24gPSBfZ2V0T3Bwb3NpdGVEaXJlY3Rpb24oZGlyZWN0aW9uKVxuICAgICAgbGFzdEhpdCA9IF9nYWluT3Bwb3NpdGVFbmQoKVxuICAgIH1cbiAgICByZXR1cm4gc3RhdHVzXG4gIH1cblxuICBjb25zdCBfYXR0YWNrQWZ0ZXJIaXQgPSAoYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBfZmluZFNwb3RBZnRlckhpdChib2FyZCwgbGFzdEhpdC55LCBsYXN0SGl0LngpXG4gICAgaWYgKCFjb29yZHMudmFsaWRpdHkpIHtcbiAgICAgIGxhc3RIaXQgPSB7fVxuICAgICAgaGl0Q2VsbHMgPSBbXVxuICAgICAgcmV0dXJuIGF0dGFja1BsYXllcihib2FyZClcbiAgICB9XG4gICAgZGlyZWN0aW9uID0gY29vcmRzLmRpcmVjdGlvblxuICAgIGNvbXB1dGVyLmF0dGFjayhib2FyZCwgY29vcmRzLnksIGNvb3Jkcy54KVxuICAgIGNvbnN0IHN0YXR1cyA9IGJvYXJkLmdldEF0dGFja1N0YXR1cyhjb29yZHMueSwgY29vcmRzLngpXG4gICAgaWYgKHN0YXR1cy52YWx1ZSAhPT0gJ2hpdCcpIHtcbiAgICAgIHJldHVybiBzdGF0dXNcbiAgICB9XG4gICAgbGFzdEhpdCA9IHsgeTogY29vcmRzLnksIHg6IGNvb3Jkcy54IH1cbiAgICBoaXRDZWxscy5wdXNoKGxhc3RIaXQpXG4gICAgcmV0dXJuIHN0YXR1c1xuICB9XG5cbiAgY29uc3QgX2F0dGFja1JhbmRvbUNlbGwgPSAoYm9hcmQpID0+IHtcbiAgICBjb25zdCByYW5kb21Db29yZHMgPSBfZmluZFJhbmRvbVNwb3RUb0F0dGFjayhib2FyZClcbiAgICBjb21wdXRlci5hdHRhY2soYm9hcmQsIHJhbmRvbUNvb3Jkcy55LCByYW5kb21Db29yZHMueClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMocmFuZG9tQ29vcmRzLnksIHJhbmRvbUNvb3Jkcy54KVxuICAgIHJldHVybiBzdGF0dXNcbiAgfVxuXG4gIGNvbnN0IGF0dGFja1BsYXllciA9IChib2FyZCwgeSwgeCkgPT4ge1xuICAgIGxldCBzdGF0dXNcbiAgICBpZiAoeSAmJiB4KSB7XG4gICAgICBzdGF0dXMgPSBfYXR0YWNrU3BlY2lmaWNTcG90KGJvYXJkLCB5LCB4KVxuICAgIH0gZWxzZSBpZiAobGFzdEhpdC55ICYmIGxhc3RIaXQueCAmJiBkaXJlY3Rpb24gIT09ICcnKSB7XG4gICAgICBzdGF0dXMgPSBfYXR0YWNrSW5EaXJlY3Rpb24oYm9hcmQpXG4gICAgfSBlbHNlIGlmIChsYXN0SGl0LnkgJiYgbGFzdEhpdC54KSB7XG4gICAgICBzdGF0dXMgPSBfYXR0YWNrQWZ0ZXJIaXQoYm9hcmQpXG4gICAgfSBlbHNlIGlmICghKGxhc3RIaXQueSAmJiBsYXN0SGl0LngpKSB7XG4gICAgICBzdGF0dXMgPSBfYXR0YWNrUmFuZG9tQ2VsbChib2FyZClcbiAgICB9XG4gICAgaWYgKHN0YXR1cy5zaGlwU3RhdHVzID09PSAnZGFtYWdlZCcpIHtcbiAgICAgIGxhc3RIaXQgPSB7IHk6IHN0YXR1cy55LCB4OiBzdGF0dXMueCB9XG4gICAgICBoaXRDZWxscy5wdXNoKGxhc3RIaXQpXG4gICAgfVxuICAgIGlmIChzdGF0dXMuc2hpcFN0YXR1cyA9PT0gJ2Rlc3Ryb3llZCcpIHtcbiAgICAgIGRpcmVjdGlvbiA9ICcnXG4gICAgICBsYXN0SGl0ID0ge31cbiAgICAgIGhpdENlbGxzID0gW11cbiAgICB9XG4gICAgcmV0dXJuIHN0YXR1c1xuICB9XG5cbiAgY29uc3Qgc2V0RGlyZWN0aW9uID0gKHZhbCkgPT4geyBkaXJlY3Rpb24gPSB2YWwgfVxuXG4gIHJldHVybiB7XG4gICAgYXR0YWNrUGxheWVyLFxuICAgIHNldERpcmVjdGlvbixcbiAgICBnZXQgZGlyZWN0aW9uICgpIHsgcmV0dXJuIGRpcmVjdGlvbiB9LFxuICAgIGdldCBuYW1lICgpIHsgcmV0dXJuIGNvbXB1dGVyLm5hbWUgfSxcbiAgICBnZXQgdHlwZSAoKSB7IHJldHVybiBjb21wdXRlci50eXBlIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVwZWF0LCBmaW5kSW5kZXgsIHBpcGUsIG1hcCwgZmxhdHRlbiwgZGVjcmVtZW50LCBjdXJyeSwgZXEsIGFueSwgZmlsdGVyLCBvYmplY3RJbkFycmF5LCBndCwgbHQsIHJlbW92ZUR1cGxpY2F0ZU9iaiB9IGZyb20gJy4uL3V0aWxzL2Z1bmNfaGVscGVycydcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnXG5pbXBvcnQgeyBzdGF0ZXMgfSBmcm9tICcuLi9jb25zdGFudHMvY2VsbF9zdGF0ZXMnXG5cbmNvbnN0IF9jcmVhdGVSb3cgPSAoKSA9PiByZXBlYXQoKCkgPT4gc3RhdGVzLldBVEVSLCAxMClcbmNvbnN0IF9jcmVhdGVHYW1lYm9hcmQgPSAoKSA9PiByZXBlYXQoX2NyZWF0ZVJvdywgMTApXG5cbmNvbnN0IF9tYXBDb29yZHMgPSBjdXJyeSgoYm9hcmQsIHZhbHVlLCBjb29yZHMpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gWy4uLmJvYXJkXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHsgeSwgeCB9ID0gZGVjcmVtZW50KGNvb3Jkc1tpXSlcbiAgICByZXN1bHRbeV1beF0gPSB2YWx1ZVxuICB9XG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IF9jb29yZHNUb0luZGV4ZXMgPSAoeSwgeCkgPT4ge1xuICByZXR1cm4gZGVjcmVtZW50KFt5LCB4XSlcbn1cblxuZXhwb3J0IGNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZmxlZXQgPSBbXVxuICBjb25zdCBtaXNzZWQgPSBbXVxuICBsZXQgcGxhbmUgPSAnaG9yaXpvbnRhbGx5J1xuICBsZXQgc3RhdGUgPSBfY3JlYXRlR2FtZWJvYXJkKClcblxuICBjb25zdCBfbWFwQm9hcmQgPSBfbWFwQ29vcmRzKHN0YXRlKVxuICBjb25zdCBfbWFwU2hpcCA9IF9tYXBCb2FyZChzdGF0ZXMuU0hJUClcbiAgY29uc3QgX21hcE1pc3NlZCA9IF9tYXBCb2FyZChzdGF0ZXMuTUlTU0VEKVxuICBjb25zdCBfbWFwSGl0ID0gX21hcEJvYXJkKHN0YXRlcy5ISVQpXG4gIGNvbnN0IF9tYXBTdW5rID0gX21hcEJvYXJkKHN0YXRlcy5TVU5LKVxuICBjb25zdCBfbWFwQXJvdW5kID0gX21hcEJvYXJkKHN0YXRlcy5BUk9VTkRfU1VOSylcblxuICBjb25zdCBfZmluZFNoaXAgPSAoeSwgeCkgPT5cbiAgICBmbGVldC5maW5kKChzaGlwKSA9PiBzaGlwLnNlZ21lbnRzLmZpbmQoKHNlZ21lbnQpID0+IHNlZ21lbnQueSA9PT0geSAmJiBzZWdtZW50LnggPT09IHgpKVxuXG4gIGNvbnN0IF9nZXRTZWdtZW50cyA9IChzaGlwKSA9PiBzaGlwLnNlZ21lbnRzXG5cbiAgY29uc3QgX2lzU2hpcFN1bmsgPSAoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKVxuXG4gIGNvbnN0IF9nZXRTaGlwQ2VsbHMgPSAoKSA9PiBwaXBlKFxuICAgIG1hcChfZ2V0U2VnbWVudHMpLFxuICAgIGZsYXR0ZW5cbiAgKShmbGVldClcblxuICBjb25zdCBfZ2V0U3Vua0NlbGxzID0gKCkgPT4gcGlwZShcbiAgICBmaWx0ZXIoX2lzU2hpcFN1bmspLFxuICAgIG1hcChfZ2V0U2VnbWVudHMpLFxuICAgIGZsYXR0ZW4sXG4gICAgbWFwKChjZWxsKSA9PiAoeyB5OiBjZWxsLnksIHg6IGNlbGwueCB9KSlcbiAgKShmbGVldClcblxuICBjb25zdCBfYW55U2hpcCA9IGFueShlcShzdGF0ZXMuU0hJUCkpXG5cbiAgY29uc3QgaXNGbGVldFN1bmsgPSAoKSA9PiBmbGVldC5ldmVyeShfaXNTaGlwU3VuaylcblxuICBjb25zdCBfaXNPdmVybGFwcyA9ICh5LCB4LCBzaXplKSA9PiB7XG4gICAgY29uc3Qgb2NjdXBpZWRDZWxscyA9IF9nZXRTaGlwQ2VsbHMoKVxuICAgIGlmIChwbGFuZSA9PT0gJ2hvcml6b250YWxseScgJiYgb2NjdXBpZWRDZWxscy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0YWlsID0geCArIHNpemVcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2NjdXBpZWRDZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0geDsgaiA8IHRhaWw7IGorKykge1xuICAgICAgICAgIGlmIChvY2N1cGllZENlbGxzW2ldLnkgPT09IHkgJiYgb2NjdXBpZWRDZWxsc1tpXS54ID09PSBqKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGxhbmUgPT09ICd2ZXJ0aWNhbGx5JyAmJiBvY2N1cGllZENlbGxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHRhaWwgPSB5ICsgc2l6ZVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvY2N1cGllZENlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSB5OyBqIDwgdGFpbDsgaisrKSB7XG4gICAgICAgICAgaWYgKG9jY3VwaWVkQ2VsbHNbaV0ueSA9PT0gaiAmJiBvY2N1cGllZENlbGxzW2ldLnggPT09IHgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgX2lzT3ZlcmZsb3dzID0gKHksIHgsIHNpemUpID0+IHtcbiAgICBpZiAoKHBsYW5lID09PSAnaG9yaXpvbnRhbGx5JyAmJiB4ICsgLS1zaXplID4gMTApIHx8XG4gICAgICAgIChwbGFuZSA9PT0gJ3ZlcnRpY2FsbHknICYmIHkgKyAtLXNpemUgPiAxMCkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgX2dldENlbGxTdGF0ZSA9ICh5LCB4KSA9PiB7XG4gICAgY29uc3QgW2l5LCBpeF0gPSBfY29vcmRzVG9JbmRleGVzKHksIHgpXG4gICAgY29uc3Qgcm93ID0gc3RhdGVbaXldXG4gICAgcmV0dXJuIHJvd1xuICAgICAgPyBzdGF0ZVtpeV1baXhdXG4gICAgICA6IG51bGxcbiAgfVxuXG4gIGNvbnN0IF9pc0FkamFjZW50VG9TaGlwcyA9ICh5LCB4LCBzaXplKSA9PiB7XG4gICAgaWYgKHBsYW5lID09PSAnaG9yaXpvbnRhbGx5Jykge1xuICAgICAgY29uc3QgdGFpbCA9IHggKyBzaXplXG5cbiAgICAgIGZvciAobGV0IGkgPSB4OyBpIDwgdGFpbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHRvcENlbGwgPSBfZ2V0Q2VsbFN0YXRlKHkgLSAxLCBpKVxuICAgICAgICBjb25zdCBib3R0b21DZWxsID0gX2dldENlbGxTdGF0ZSh5ICsgMSwgaSlcbiAgICAgICAgaWYgKF9hbnlTaGlwKFt0b3BDZWxsLCBib3R0b21DZWxsXSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxlZnRDZWxsID0gX2dldENlbGxTdGF0ZSh5LCB4IC0gMSlcbiAgICAgIGNvbnN0IHJpZ2h0Q2VsbCA9IF9nZXRDZWxsU3RhdGUoeSwgdGFpbClcbiAgICAgIGlmIChfYW55U2hpcChbbGVmdENlbGwsIHJpZ2h0Q2VsbF0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRvcExlZnQgPSBfZ2V0Q2VsbFN0YXRlKHkgLSAxLCB4IC0gMSlcbiAgICAgIGNvbnN0IGJvdHRvbUxlZnQgPSBfZ2V0Q2VsbFN0YXRlKHkgKyAxLCB4IC0gMSlcbiAgICAgIGNvbnN0IHRvcFJpZ2h0ID0gX2dldENlbGxTdGF0ZSh5IC0gMSwgdGFpbClcbiAgICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gX2dldENlbGxTdGF0ZSh5ICsgMSwgdGFpbClcbiAgICAgIGlmIChfYW55U2hpcChbdG9wTGVmdCwgYm90dG9tTGVmdCwgdG9wUmlnaHQsIGJvdHRvbVJpZ2h0XSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGxhbmUgPT09ICd2ZXJ0aWNhbGx5Jykge1xuICAgICAgY29uc3QgdGFpbCA9IHkgKyBzaXplXG5cbiAgICAgIGNvbnN0IHRvcENlbGwgPSBfZ2V0Q2VsbFN0YXRlKHkgLSAxLCB4KVxuICAgICAgY29uc3QgYm90dG9tQ2VsbCA9IF9nZXRDZWxsU3RhdGUodGFpbCwgeClcbiAgICAgIGlmIChfYW55U2hpcChbdG9wQ2VsbCwgYm90dG9tQ2VsbF0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSB5OyBpIDwgdGFpbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGxlZnRDZWxsID0gX2dldENlbGxTdGF0ZShpLCB4IC0gMSlcbiAgICAgICAgY29uc3QgcmlnaHRDZWxsID0gX2dldENlbGxTdGF0ZShpLCB4ICsgMSlcbiAgICAgICAgaWYgKF9hbnlTaGlwKFtsZWZ0Q2VsbCwgcmlnaHRDZWxsXSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRvcExlZnQgPSBfZ2V0Q2VsbFN0YXRlKHkgLSAxLCB4IC0gMSlcbiAgICAgIGNvbnN0IHRvcFJpZ2h0ID0gX2dldENlbGxTdGF0ZSh5IC0gMSwgeCArIDEpXG4gICAgICBjb25zdCBib3R0b21MZWZ0ID0gX2dldENlbGxTdGF0ZSh0YWlsLCB4IC0gMSlcbiAgICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gX2dldENlbGxTdGF0ZSh0YWlsLCB4ICsgMSlcbiAgICAgIGlmIChfYW55U2hpcChbdG9wTGVmdCwgYm90dG9tTGVmdCwgdG9wUmlnaHQsIGJvdHRvbVJpZ2h0XSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBfZ2V0U3Vycm91bmRpbmdDZWxscyA9ICh7IHksIHggfSkgPT4ge1xuICAgIHJldHVybiBbXG4gICAgICB7IHk6IHkgLSAxLCB4IH0sXG4gICAgICB7IHk6IHkgKyAxLCB4IH0sXG4gICAgICB7IHksIHg6IHggLSAxIH0sXG4gICAgICB7IHksIHg6IHggKyAxIH0sXG4gICAgICB7IHk6IHkgLSAxLCB4OiB4IC0gMSB9LFxuICAgICAgeyB5OiB5ICsgMSwgeDogeCArIDEgfSxcbiAgICAgIHsgeTogeSAtIDEsIHg6IHggKyAxIH0sXG4gICAgICB7IHk6IHkgKyAxLCB4OiB4IC0gMSB9XG4gICAgXVxuICB9XG5cbiAgY29uc3QgX2lzQ2VsbFZhbGlkID0gKHsgeSwgeCB9KSA9PlxuICAgICFhbnkoKGF4aXMpID0+IChndChheGlzLCAxMCkgfHwgbHQoYXhpcywgMSkpLCBbeCwgeV0pXG5cbiAgY29uc3QgZ2V0QXJlYUFyb3VuZFN1bmsgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3Vua0NlbGxzID0gX2dldFN1bmtDZWxscygpXG4gICAgcmV0dXJuIHBpcGUoXG4gICAgICBtYXAoX2dldFN1cnJvdW5kaW5nQ2VsbHMpLFxuICAgICAgZmxhdHRlbixcbiAgICAgIGZpbHRlcigoY2VsbCkgPT4gIW9iamVjdEluQXJyYXkoY2VsbCwgc3Vua0NlbGxzKSksXG4gICAgICBmaWx0ZXIoX2lzQ2VsbFZhbGlkKSxcbiAgICAgIHJlbW92ZUR1cGxpY2F0ZU9ialxuICAgICkoc3Vua0NlbGxzKVxuICB9XG5cbiAgY29uc3QgaXNWYWxpZEZvclBsYWNlID0gKHksIHgsIHNpemUpID0+IChcbiAgICAhX2lzT3ZlcmxhcHMoeSwgeCwgc2l6ZSkgJiZcbiAgICAhX2lzT3ZlcmZsb3dzKHksIHgsIHNpemUpICYmXG4gICAgIV9pc0FkamFjZW50VG9TaGlwcyh5LCB4LCBzaXplKVxuICApXG5cbiAgY29uc3QgcGxhY2UgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGlmICghaXNWYWxpZEZvclBsYWNlKHksIHgsIHNpemUpKSByZXR1cm5cblxuICAgIGNvbnN0IHNoaXAgPSBTaGlwKHksIHgsIHNpemUsIHBsYW5lKVxuICAgIGZsZWV0LnB1c2goc2hpcClcbiAgICBzdGF0ZSA9IF9tYXBTaGlwKHNoaXAuc2VnbWVudHMpXG4gICAgcmV0dXJuIHNoaXBcbiAgfVxuXG4gIGNvbnN0IGlzVmFsaWRUYXJnZXQgPSAoeSwgeCkgPT4ge1xuICAgIGNvbnN0IFtpeSwgaXhdID0gX2Nvb3Jkc1RvSW5kZXhlcyh5LCB4KVxuICAgIGNvbnN0IHJvdyA9IHN0YXRlW2l5XVxuICAgIGlmIChyb3cpIHtcbiAgICAgIHN3aXRjaCAoc3RhdGVbaXldW2l4XSkge1xuICAgICAgICBjYXNlIHN0YXRlcy5TSElQOlxuICAgICAgICBjYXNlIHN0YXRlcy5XQVRFUjpcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBjYXNlIHN0YXRlcy5NSVNTRUQ6XG4gICAgICAgIGNhc2Ugc3RhdGVzLkhJVDpcbiAgICAgICAgY2FzZSBzdGF0ZXMuU1VOSzpcbiAgICAgICAgY2FzZSBzdGF0ZXMuQVJPVU5EX1NVTks6XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh5LCB4KSA9PiB7XG4gICAgY29uc3QgaGl0U2hpcCA9IF9maW5kU2hpcCh5LCB4KVxuICAgIGlmICghaGl0U2hpcCkge1xuICAgICAgbWlzc2VkLnB1c2goeyB5LCB4IH0pXG4gICAgICBzdGF0ZSA9IF9tYXBNaXNzZWQoW3sgeSwgeCB9XSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBoaXRTZWdtZW50SW5kZXggPSBmaW5kSW5kZXgoc2VnbWVudCA9PiBzZWdtZW50LnkgPT09IHkgJiYgc2VnbWVudC54ID09PSB4LCBoaXRTaGlwLnNlZ21lbnRzKVxuICAgIGhpdFNoaXAuaGl0KGhpdFNlZ21lbnRJbmRleClcbiAgICBpZiAoaGl0U2hpcC5pc1N1bmsoKSkge1xuICAgICAgc3RhdGUgPSBfbWFwU3VuayhoaXRTaGlwLnNlZ21lbnRzKVxuICAgICAgc3RhdGUgPSBfbWFwQXJvdW5kKGdldEFyZWFBcm91bmRTdW5rKCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlID0gX21hcEhpdChbeyB5LCB4IH1dKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGdldEF0dGFja1N0YXR1cyA9ICh5LCB4KSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0geyB5LCB4IH1cbiAgICBjb25zdCBhdHRhY2tlZENlbGwgPSBfZ2V0Q2VsbFN0YXRlKHksIHgpXG4gICAgbGV0IHNoaXBcbiAgICBsZXQgc3RhdHVzXG4gICAgc3dpdGNoIChhdHRhY2tlZENlbGwpIHtcbiAgICAgIGNhc2Ugc3RhdGVzLk1JU1NFRDpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyB2YWx1ZTogJ21pc3NlZCcgfSwgY29vcmRzKVxuICAgICAgY2FzZSBzdGF0ZXMuSElUOlxuICAgICAgY2FzZSBzdGF0ZXMuU1VOSzpcbiAgICAgICAgc2hpcCA9IF9maW5kU2hpcCh5LCB4KVxuICAgICAgICBzdGF0dXMgPSB7IHZhbHVlOiAnaGl0Jywgc2hpcDogc2hpcC50eXBlIH1cbiAgICAgICAgcmV0dXJuIHNoaXAuaXNTdW5rKClcbiAgICAgICAgICA/IE9iamVjdC5hc3NpZ24oc3RhdHVzLCBjb29yZHMsIHsgc2hpcFN0YXR1czogJ2Rlc3Ryb3llZCcgfSlcbiAgICAgICAgICA6IE9iamVjdC5hc3NpZ24oc3RhdHVzLCBjb29yZHMsIHsgc2hpcFN0YXR1czogJ2RhbWFnZWQnIH0pXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IHZhbHVlOiBhdHRhY2tlZENlbGwgfSwgY29vcmRzKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNldFBsYW5lID0gKG5ld1BsYW5lKSA9PiB7IHBsYW5lID0gbmV3UGxhbmUgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0IHN0YXRlICgpIHsgcmV0dXJuIHN0YXRlIH0sXG4gICAgZ2V0IGZsZWV0ICgpIHsgcmV0dXJuIGZsZWV0IH0sXG4gICAgZ2V0IG1pc3NlZCAoKSB7IHJldHVybiBtaXNzZWQgfSxcbiAgICBpc1ZhbGlkRm9yUGxhY2UsXG4gICAgcGxhY2UsXG4gICAgaXNWYWxpZFRhcmdldCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldEF0dGFja1N0YXR1cyxcbiAgICBnZXRBcmVhQXJvdW5kU3VuayxcbiAgICBpc0ZsZWV0U3VuayxcbiAgICBzZXRQbGFuZVxuICB9XG59XG5cbmV4cG9ydCB7IF9jcmVhdGVHYW1lYm9hcmQgfVxuIiwiZXhwb3J0IGNvbnN0IFBsYXllciA9IChuYW1lLCBpc0ZpcnN0KSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBpc0ZpcnN0ID8gJ3BsYXllcicgOiAnY29tcHV0ZXInXG4gIGxldCB0dXJuID0gaXNGaXJzdFxuXG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7IHR1cm4gPSAhdHVybiB9XG5cbiAgY29uc3QgYXR0YWNrID0gKGJvYXJkLCB5LCB4KSA9PiB7XG4gICAgYm9hcmQucmVjZWl2ZUF0dGFjayh5LCB4KVxuICAgIGNvbnN0IHN0YXR1cyA9IGJvYXJkLmdldEF0dGFja1N0YXR1cyh5LCB4KVxuICAgIGlmIChzdGF0dXMudmFsdWUgIT09ICdoaXQnKSB7XG4gICAgICBjaGFuZ2VUdXJuKClcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldCBuYW1lICgpIHsgcmV0dXJuIG5hbWUgfSxcbiAgICBnZXQgdHlwZSAoKSB7IHJldHVybiB0eXBlIH0sXG4gICAgZ2V0IHR1cm4gKCkgeyByZXR1cm4gdHVybiB9LFxuICAgIGF0dGFjayxcbiAgICBjaGFuZ2VUdXJuXG4gIH1cbn1cbiIsImNvbnN0IF90eXBlcyA9IHtcbiAgMjogJ0Rlc3Ryb3llcicsXG4gIDM6ICdDcnVpc2VyJyxcbiAgNDogJ0JhdHRsZXNoaXAnLFxuICA1OiAnQ2Fycmllcidcbn1cblxuY29uc3QgX3NlZ21lbnRzQ3JlYXRvciA9IHtcbiAgaG9yaXpvbnRhbGx5ICh5LCB4LCBzaXplKSB7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBzZWdtZW50c1tpXSA9IHsgeSwgeDogKHggKyBpKSwgaW50YWN0OiB0cnVlIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlZ21lbnRzXG4gIH0sXG4gIHZlcnRpY2FsbHkgKHksIHgsIHNpemUpIHtcbiAgICBjb25zdCBzZWdtZW50cyA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIHNlZ21lbnRzW2ldID0geyB5OiAoeSArIGkpLCB4LCBpbnRhY3Q6IHRydWUgfVxuICAgIH1cbiAgICByZXR1cm4gc2VnbWVudHNcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgU2hpcCA9ICh5LCB4LCBzaXplLCBwbGFuZSkgPT4ge1xuICBjb25zdCB0eXBlID0gX3R5cGVzW3NpemVdXG4gIGlmICh0eXBlID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignSW1wcm9wZXIgc2hpcCBzaXplJylcblxuICBjb25zdCBzZWdtZW50cyA9IF9zZWdtZW50c0NyZWF0b3JbcGxhbmVdKHksIHgsIHNpemUpXG5cbiAgY29uc3QgaGl0ID0gKHNlZ21lbnQpID0+IHsgc2VnbWVudHNbc2VnbWVudF0uaW50YWN0ID0gZmFsc2UgfVxuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHNlZ21lbnRzLmV2ZXJ5KChzZWdtZW50KSA9PiBzZWdtZW50LmludGFjdCA9PT0gZmFsc2UpXG5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGdldCBzaXplICgpIHsgcmV0dXJuIHNpemUgfSxcbiAgICBnZXQgdHlwZSAoKSB7IHJldHVybiB0eXBlIH0sXG4gICAgZ2V0IHNlZ21lbnRzICgpIHsgcmV0dXJuIHNlZ21lbnRzIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgZXZlbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50X3R5cGVzJ1xuaW1wb3J0IHsgZXZlbnRzSGFuZGxlciB9IGZyb20gJy4uL3V0aWxzL2V2ZW50c19oYW5kbGVyJ1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi4vZmFjdG9yaWVzL3BsYXllcidcbmltcG9ydCB7IEFpUGxheWVyIH0gZnJvbSAnLi4vZmFjdG9yaWVzL2FpX3BsYXllcidcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4uL2ZhY3Rvcmllcy9nYW1lYm9hcmQnXG5pbXBvcnQgeyBBaUdhbWVib2FyZCB9IGZyb20gJy4uL2ZhY3Rvcmllcy9haV9nYW1lYm9hcmQnXG5pbXBvcnQgeyBib2FyZEhhbmRsZXIgfSBmcm9tICcuLi91aS9kb21fYm9hcmQnXG5pbXBvcnQgeyBkZWxheSB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcl9mdW5jcydcbmltcG9ydCB7IHdyYXBJbkRpdiwgcXVlcnlEb2N1bWVudCwgYWRkQ2xhc3MsIHJlbW92ZUNsYXNzLCByZXBsYWNlRWwsIGNsb25lRWwgfSBmcm9tICcuLi91aS9kb21fZnVuY3MnXG5cbjsoZnVuY3Rpb24gbWVudUhhbmRsZXIgKCkge1xuICBjb25zdCBzdGFydEJ0biA9IHF1ZXJ5RG9jdW1lbnQoJyNzdGFydC1nYW1lJylcbiAgY29uc3QgcmVzdGFydEJ0biA9IHF1ZXJ5RG9jdW1lbnQoJyNyZXN0YXJ0LWdhbWUnKVxuICBjb25zdCBuYW1lSW5wID0gcXVlcnlEb2N1bWVudCgnI3BsYXllci1uYW1lJylcbiAgY29uc3Qgcm90YXRlQnRuID0gcXVlcnlEb2N1bWVudCgnI3JvdGF0ZScpXG4gIGNvbnN0IGxvZ0RpdiA9IHF1ZXJ5RG9jdW1lbnQoJyNsb2cnKVxuICBsZXQgaGludHNEaXYgPSBxdWVyeURvY3VtZW50KCcjaGludHMnKVxuXG4gIGxldCBzaGlwc1BsYWNlZCA9IGZhbHNlXG4gIGxldCBtc2dDb3VudCA9IDBcblxuICBjb25zdCBfaGlkZSA9IChlbCkgPT4gYWRkQ2xhc3MoJ2Rpc3BsYXktbm9uZScsIGVsKVxuXG4gIGNvbnN0IF9zaG93ID0gKGVsKSA9PiByZW1vdmVDbGFzcygnZGlzcGxheS1ub25lJywgZWwpXG5cbiAgY29uc3QgaGFuZGxlU3RhcnQgPSAoKSA9PiB7XG4gICAgO1tzdGFydEJ0biwgcm90YXRlQnRuXS5mb3JFYWNoKF9oaWRlKVxuICAgIF9zaG93KHJlc3RhcnRCdG4pXG4gICAgbmFtZUlucC5kaXNhYmxlZCA9IHRydWVcbiAgICBoaW50c0Rpdi5pbm5lclRleHQgPSAnR29vZCBsdWNrLCBBZG1pcmFsISdcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkdBTUVfU1RBUlRFRCwgbmFtZUlucC52YWx1ZSlcbiAgfVxuXG4gIGNvbnN0IHJvdGF0ZSA9ICgpID0+IHtcbiAgICBpZiAocm90YXRlQnRuLmRhdGFzZXQucGxhbmUgPT09ICd2ZXJ0aWNhbGx5Jykge1xuICAgICAgcm90YXRlQnRuLmRhdGFzZXQucGxhbmUgPSAnaG9yaXpvbnRhbGx5J1xuICAgICAgcm90YXRlQnRuLmlubmVyVGV4dCA9ICdIb3Jpem9udGFsJ1xuICAgIH0gZWxzZSBpZiAocm90YXRlQnRuLmRhdGFzZXQucGxhbmUgPT09ICdob3Jpem9udGFsbHknKSB7XG4gICAgICByb3RhdGVCdG4uZGF0YXNldC5wbGFuZSA9ICd2ZXJ0aWNhbGx5J1xuICAgICAgcm90YXRlQnRuLmlubmVyVGV4dCA9ICdWZXJ0aWNhbCdcbiAgICB9XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5TSElQX1JPVEFURUQsIHJvdGF0ZUJ0bi5kYXRhc2V0LnBsYW5lKVxuICB9XG5cbiAgY29uc3QgY2hlY2tTdGFydENvbmRpdGlvbnMgPSAoKSA9PiB7XG4gICAgc3RhcnRCdG4uZGlzYWJsZWQgPSAhKG5hbWVJbnAudmFsdWUgJiYgc2hpcHNQbGFjZWQpXG4gIH1cblxuICBjb25zdCBjaGVja1NoaXBzUmVhZGluZXNzID0gKHsgYXJlU2hpcHNQbGFjZWQsIHNoaXBUeXBlIH0pID0+IHtcbiAgICAoYXJlU2hpcHNQbGFjZWQpXG4gICAgICA/IHNoaXBzUGxhY2VkID0gdHJ1ZVxuICAgICAgOiBzaGlwc1BsYWNlZCA9IGZhbHNlXG4gICAgY2hlY2tTdGFydENvbmRpdGlvbnMoKVxuICAgIGhpbnRzRGl2LmlubmVyVGV4dCA9IGAke3NoaXBUeXBlfSBoYXMgYmVlbiBwbGFjZWQuYFxuICB9XG5cbiAgY29uc3QgX2NyZWF0ZUxvZ01lc3NhZ2UgPSAoc3RhdHVzLCBwbGF5ZXIpID0+IHtcbiAgICBjb25zdCBsb2dDbGFzcyA9IGBsb2ctJHtwbGF5ZXIudHlwZX0tJHtzdGF0dXMuc2hpcFN0YXR1cyB8fCBzdGF0dXMudmFsdWV9YFxuICAgIGxldCBtc2cgPSBgVHVybiAkeysrbXNnQ291bnR9LiB5JHtzdGF0dXMueX0geSR7c3RhdHVzLnh9YFxuICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdtaXNzZWQnKSB7XG4gICAgICBtc2cgKz0gYCAke3BsYXllci5uYW1lfSBtaXNzZWQuLi5gXG4gICAgfVxuICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdoaXQnKSB7XG4gICAgICBtc2cgKz0gYCAke3BsYXllci5uYW1lfSAke3N0YXR1cy5zaGlwU3RhdHVzfSAke3N0YXR1cy5zaGlwfSFgXG4gICAgfVxuICAgIHJldHVybiB3cmFwSW5EaXYobXNnLCBbbG9nQ2xhc3NdKVxuICB9XG5cbiAgY29uc3QgZGlzcGxheUxvZ01lc3NhZ2UgPSAoeyBzdGF0dXMsIHBsYXllciB9KSA9PiB7XG4gICAgY29uc3QgbG9nID0gX2NyZWF0ZUxvZ01lc3NhZ2Uoc3RhdHVzLCBwbGF5ZXIpXG4gICAgY29uc3QgaGludCA9IGNsb25lRWwobG9nKVxuICAgIGhpbnQuaWQgPSAnaGludHMnXG4gICAgbG9nRGl2LnByZXBlbmQobG9nKVxuICAgIGhpbnRzRGl2ID0gcmVwbGFjZUVsKGhpbnRzRGl2LCBoaW50KVxuICB9XG5cbiAgY29uc3QgaGFuZGxlRW5kID0gKG5hbWUpID0+IHtcbiAgICBoaW50c0Rpdi5pbm5lclRleHQgPSBgJHtuYW1lfSB3b24hYFxuICAgIHJlbW92ZUNsYXNzKCdoaWRkZW4nLCByZXN0YXJ0QnRuKVxuICB9XG5cbiAgY29uc3QgaW5pdE1lbnUgPSAoKSA9PiB7XG4gICAgY2hlY2tTdGFydENvbmRpdGlvbnMoKVxuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU3RhcnQpXG4gICAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcm90YXRlKVxuICAgIG5hbWVJbnAuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGVja1N0YXJ0Q29uZGl0aW9ucylcbiAgICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5TSElQX1BMQUNFRCwgY2hlY2tTaGlwc1JlYWRpbmVzcylcbiAgICBldmVudHNIYW5kbGVyLm9uRWFjaChbZXZlbnRzLkNPTVBVVEVSX0JPQVJEX0FUVEFDS0VELCBldmVudHMuQ09NUFVURVJfRklOSVNIRURfVFVSTl0sIGRpc3BsYXlMb2dNZXNzYWdlKVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLkdBTUVfRU5ERUQsIGhhbmRsZUVuZClcbiAgfVxuXG4gIGluaXRNZW51KClcblxuICByZXR1cm4ge1xuICAgIGluaXRNZW51XG4gIH1cbn0pKClcblxuOyhmdW5jdGlvbiBib2FyZFZpZXdMb2dpYyAoKSB7XG4gIGNvbnN0IHBsYXllckJvYXJkID0gcXVlcnlEb2N1bWVudCgnI3BsYXllci1ib2FyZCcpXG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBxdWVyeURvY3VtZW50KCcjY29tcHV0ZXItYm9hcmQnKVxuXG4gIGNvbnN0IHJlbmRlclBsYXllciA9IGJvYXJkSGFuZGxlci5yZW5kZXJCb2FyZChwbGF5ZXJCb2FyZCwgZmFsc2UpXG4gIGNvbnN0IHJlbmRlckNvbXB1dGVyID0gYm9hcmRIYW5kbGVyLnJlbmRlckJvYXJkKGNvbXB1dGVyQm9hcmQsIHRydWUpXG5cbiAgY29uc3QgY3JlYXRlQm9hcmRzID0gKCkgPT4ge1xuICAgIGJvYXJkSGFuZGxlci5jcmVhdGVCb2FyZChmYWxzZSwgcGxheWVyQm9hcmQpXG4gICAgYm9hcmRIYW5kbGVyLmNyZWF0ZUJvYXJkKHRydWUsIGNvbXB1dGVyQm9hcmQpXG4gIH1cblxuICBjb25zdCBzZW5kQ29vcmRzRm9yVmFsaWRhdGlvbiA9IChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICBjb25zdCBjb29yZHMgPSBib2FyZEhhbmRsZXIuZXh0cmFjdENvb3JkcyhlLnRhcmdldClcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuQk9BUkRfSE9WRVJFRCwgY29vcmRzKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGhpZ2h0bGlnaHRWYWxpZGF0ZWRDb29yZHMgPSAoZGF0YSkgPT4ge1xuICAgIGJvYXJkSGFuZGxlci5oaWdobGlnaHRGdXR1cmVTaGlwKC4uLmRhdGEpXG4gIH1cblxuICBjb25zdCBzZW5kU2hpcEZvclZhbGlkYXRpb24gPSAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSkge1xuICAgICAgY29uc3QgY29vcmRzID0gYm9hcmRIYW5kbGVyLmV4dHJhY3RDb29yZHMoZS50YXJnZXQpXG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkJPQVJEX0NMSUNLRUQsIGNvb3JkcylcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVZhbGlkYXRlZFNoaXAgPSAoeyBzaGlwIH0pID0+IHtcbiAgICBib2FyZEhhbmRsZXIucGxhY2UoLi4uc2hpcClcbiAgfVxuXG4gIGNvbnN0IHJlbmRlckNvbXB1dGVyU3RhdGUgPSAoeyBzdGF0ZSB9KSA9PiB7XG4gICAgcmVuZGVyQ29tcHV0ZXIoc3RhdGUpXG4gIH1cblxuICBjb25zdCByZW5kZXJQbGF5ZXJTdGF0ZSA9ICh7IHN0YXRlIH0pID0+IHtcbiAgICByZW5kZXJQbGF5ZXIoc3RhdGUpXG4gIH1cblxuICBjb25zdCBzZW5kQXR0YWNrZWRDb29yZHMgPSAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSkge1xuICAgICAgY29uc3QgY29vcmRzID0gYm9hcmRIYW5kbGVyLmV4dHJhY3RDb29yZHMoZS50YXJnZXQpXG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkNPTVBVVEVSX0JPQVJEX0NMSUNLRUQsIGNvb3JkcylcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdG9wTGlzdGVuaW5nVG9QcmVHYW1lRXZlbnRzID0gKCkgPT4ge1xuICAgIHBsYXllckJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHNlbmRDb29yZHNGb3JWYWxpZGF0aW9uKVxuICAgIHBsYXllckJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VuZFNoaXBGb3JWYWxpZGF0aW9uKVxuICAgIHBsYXllckJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBib2FyZEhhbmRsZXIuY2xlYXJIaWdobGlnaHRzKVxuICB9XG5cbiAgY29uc3QgaW5pdEJvYXJkcyA9ICgpID0+IHtcbiAgICBjcmVhdGVCb2FyZHMoKVxuICAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHNlbmRDb29yZHNGb3JWYWxpZGF0aW9uKVxuICAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VuZFNoaXBGb3JWYWxpZGF0aW9uKVxuICAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBib2FyZEhhbmRsZXIuY2xlYXJIaWdobGlnaHRzKVxuICAgIGNvbXB1dGVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZW5kQXR0YWNrZWRDb29yZHMpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuU0hJUF9WQUxJREFURUQsIGhpZ2h0bGlnaHRWYWxpZGF0ZWRDb29yZHMpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuU0hJUF9QTEFDRUQsIHBsYWNlVmFsaWRhdGVkU2hpcClcbiAgICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5TSElQX1JPVEFURUQsIGJvYXJkSGFuZGxlci5zZXRQbGFuZSlcbiAgICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5HQU1FX1NUQVJURUQsIHN0b3BMaXN0ZW5pbmdUb1ByZUdhbWVFdmVudHMpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuQ09NUFVURVJfRklOSVNIRURfVFVSTiwgcmVuZGVyUGxheWVyU3RhdGUpXG4gICAgZXZlbnRzSGFuZGxlci5vbkVhY2goW2V2ZW50cy5DT01QVVRFUl9QTEFDRURfU0hJUFMsIGV2ZW50cy5DT01QVVRFUl9CT0FSRF9BVFRBQ0tFRF0sIHJlbmRlckNvbXB1dGVyU3RhdGUpXG4gIH1cblxuICBpbml0Qm9hcmRzKClcblxuICByZXR1cm4ge1xuICAgIGluaXRCb2FyZHNcbiAgfVxufSkoKVxuXG47KGZ1bmN0aW9uIGdhbWVIYW5kbGVyICgpIHtcbiAgY29uc3Qgc2hpcHNUb1BsYWNlID0gWzUsIDQsIDMsIDIsIDJdXG4gIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKClcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEFpR2FtZWJvYXJkKClcbiAgbGV0IHBsYXllclxuICBsZXQgY29tcHV0ZXJcbiAgbGV0IGdhbWVTdGFydGVkID0gZmFsc2VcbiAgbGV0IGdhbWVFbmRlZCA9IGZhbHNlXG5cbiAgY29uc3QgdmFsaWRhdGVDb29yZHMgPSAoY29vcmRzKSA9PiB7XG4gICAgaWYgKHNoaXBzVG9QbGFjZS5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGNvbnN0IFt5LCB4XSA9IGNvb3Jkc1xuICAgIGNvbnN0IG5leHRTaGlwU2l6ZSA9IHNoaXBzVG9QbGFjZVswXVxuICAgIGNvbnN0IGlzVmFsaWQgPSBwbGF5ZXJCb2FyZC5pc1ZhbGlkRm9yUGxhY2UoeSwgeCwgbmV4dFNoaXBTaXplKVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuU0hJUF9WQUxJREFURUQsIFt5LCB4LCBuZXh0U2hpcFNpemUsIGlzVmFsaWRdKVxuICB9XG5cbiAgY29uc3QgdmFsaWRhdGVQbGFjZW1lbnQgPSAoY29vcmRzKSA9PiB7XG4gICAgaWYgKHNoaXBzVG9QbGFjZS5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGNvbnN0IFt5LCB4XSA9IGNvb3Jkc1xuICAgIGNvbnN0IG5leHRTaGlwU2l6ZSA9IHNoaXBzVG9QbGFjZVswXVxuICAgIGNvbnN0IGlzVmFsaWQgPSBwbGF5ZXJCb2FyZC5pc1ZhbGlkRm9yUGxhY2UoeSwgeCwgbmV4dFNoaXBTaXplKVxuICAgIGlmICghaXNWYWxpZCkgcmV0dXJuXG4gICAgY29uc3Qgc2hpcCA9IHBsYXllckJvYXJkLnBsYWNlKHksIHgsIG5leHRTaGlwU2l6ZSlcbiAgICBzaGlwc1RvUGxhY2Uuc2hpZnQoKVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcbiAgICAgIGV2ZW50cy5TSElQX1BMQUNFRCxcbiAgICAgIHtcbiAgICAgICAgc2hpcDogW3ksIHgsIG5leHRTaGlwU2l6ZV0sXG4gICAgICAgIHNoaXBUeXBlOiBzaGlwLnR5cGUsXG4gICAgICAgIGFyZVNoaXBzUGxhY2VkOiBzaGlwc1RvUGxhY2UubGVuZ3RoID09PSAwXG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgY29uc3Qgc3RhcnRHYW1lID0gKG5hbWUpID0+IHtcbiAgICBnYW1lU3RhcnRlZCA9IHRydWVcbiAgICBwbGF5ZXIgPSBQbGF5ZXIobmFtZSwgdHJ1ZSlcbiAgICBjb21wdXRlciA9IEFpUGxheWVyKClcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlRmxlZXQoNSlcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkNPTVBVVEVSX1BMQUNFRF9TSElQUywgeyBzdGF0ZTogY29tcHV0ZXJCb2FyZC5zdGF0ZSB9KVxuICB9XG5cbiAgY29uc3QgaGFuZGxlUGxheWVyQXR0YWNrID0gKGNvb3JkcykgPT4ge1xuICAgIGlmICghZ2FtZVN0YXJ0ZWQgfHwgZ2FtZUVuZGVkIHx8ICFwbGF5ZXIudHVybiB8fCAhY29tcHV0ZXJCb2FyZC5pc1ZhbGlkVGFyZ2V0KC4uLmNvb3JkcykpIHJldHVyblxuICAgIHBsYXllci5hdHRhY2soY29tcHV0ZXJCb2FyZCwgLi4uY29vcmRzKVxuICAgIGNvbnN0IHN0YXR1cyA9IGNvbXB1dGVyQm9hcmQuZ2V0QXR0YWNrU3RhdHVzKC4uLmNvb3JkcylcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXG4gICAgICBldmVudHMuQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQsXG4gICAgICB7IHN0YXRlOiBjb21wdXRlckJvYXJkLnN0YXRlLCBzdGF0dXMsIHBsYXllciB9XG4gICAgKVxuICAgIGlmICghcGxheWVyLnR1cm4pIHtcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuUExBWUVSX0ZJTklTSEVEX1RVUk4sIG51bGwpXG4gICAgfVxuICAgIGlmIChjb21wdXRlckJvYXJkLmlzRmxlZXRTdW5rKCkpIHtcbiAgICAgIGdhbWVFbmRlZCA9IHRydWVcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuR0FNRV9FTkRFRCwgcGxheWVyLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgaGFuZGxlQ29tcHV0ZXJBdHRhY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKHBsYXllckJvYXJkLmlzRmxlZXRTdW5rKCkpIHtcbiAgICAgIGdhbWVFbmRlZCA9IHRydWVcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuR0FNRV9FTkRFRCwgY29tcHV0ZXIubmFtZSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBhd2FpdCBkZWxheSg0MDApXG4gICAgY29uc3Qgc3RhdHVzID0gY29tcHV0ZXIuYXR0YWNrUGxheWVyKHBsYXllckJvYXJkKVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcbiAgICAgIGV2ZW50cy5DT01QVVRFUl9GSU5JU0hFRF9UVVJOLFxuICAgICAgeyBzdGF0ZTogcGxheWVyQm9hcmQuc3RhdGUsIHN0YXR1cywgcGxheWVyOiBjb21wdXRlciB9XG4gICAgKVxuICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdoaXQnKSB7XG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLlBMQVlFUl9GSU5JU0hFRF9UVVJOLCBudWxsKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHBsYXllci5jaGFuZ2VUdXJuKClcbiAgfVxuXG4gIGNvbnN0IGluaXRHYW1lID0gKCkgPT4ge1xuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLkJPQVJEX0hPVkVSRUQsIHZhbGlkYXRlQ29vcmRzKVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLkJPQVJEX0NMSUNLRUQsIHZhbGlkYXRlUGxhY2VtZW50KVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLlNISVBfUk9UQVRFRCwgcGxheWVyQm9hcmQuc2V0UGxhbmUpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuR0FNRV9TVEFSVEVELCBzdGFydEdhbWUpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuQ09NUFVURVJfQk9BUkRfQ0xJQ0tFRCwgaGFuZGxlUGxheWVyQXR0YWNrKVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLlBMQVlFUl9GSU5JU0hFRF9UVVJOLCBoYW5kbGVDb21wdXRlckF0dGFjaylcbiAgfVxuXG4gIGluaXRHYW1lKClcblxuICByZXR1cm4ge1xuICAgIGluaXRHYW1lXG4gIH1cbn0pKClcbiIsImltcG9ydCB7IGZvckVhY2gsIHBpcGUsIGZpbHRlciwgY3VycnkgfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5pbXBvcnQgeyBhZGRDbGFzcywgcmVtb3ZlQ2xhc3MgfSBmcm9tICcuL2RvbV9mdW5jcydcbmltcG9ydCB7IHN0YXRlcyB9IGZyb20gJy4uL2NvbnN0YW50cy9jZWxsX3N0YXRlcydcblxuY29uc3QgX2NlbGxUYWJsZSA9IHtcbiAgczogJ3NoaXAnLFxuICB3OiAnd2F0ZXInLFxuICBoOiAnaGl0JyxcbiAgbTogJ21pc3MnLFxuICB4OiAnc3VuaycsXG4gIGE6ICdhcm91bmQtc3Vuaydcbn1cblxuY29uc3QgX2NlbGxDbGFzc2VzID0gT2JqZWN0LnZhbHVlcyhfY2VsbFRhYmxlKVxuXG5jb25zdCBfY3JlYXRlQ2VsbCA9IChpc0hpZGRlbiwgeSwgeCkgPT4ge1xuICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJylcbiAgY2VsbC5kYXRhc2V0LnkgPSB5XG4gIGNlbGwuZGF0YXNldC54ID0geFxuICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3dhdGVyJylcbiAgaWYgKGlzSGlkZGVuKSBjZWxsLmNsYXNzTGlzdC5hZGQoJ2ZvZy1vZi13YXInKVxuICByZXR1cm4gY2VsbFxufVxuXG5jb25zdCBfY2VsbHNGaW5kZXIgPSB7XG4gIGhvcml6b250YWxseSAoeSwgeCwgc2l6ZSkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gW11cbiAgICBjb25zdCB0YWlsID0geCArIHNpemVcbiAgICBmb3IgKGxldCBpID0geDsgaSA8IHRhaWw7IGkrKykge1xuICAgICAgc2VnbWVudHMucHVzaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS15PScke3l9J11bZGF0YS14PScke2l9J11gKSlcbiAgICB9XG4gICAgcmV0dXJuIHNlZ21lbnRzXG4gIH0sXG4gIHZlcnRpY2FsbHkgKHksIHgsIHNpemUpIHtcbiAgICBjb25zdCBzZWdtZW50cyA9IFtdXG4gICAgY29uc3QgdGFpbCA9IHkgKyBzaXplXG4gICAgZm9yIChsZXQgaSA9IHk7IGkgPCB0YWlsOyBpKyspIHtcbiAgICAgIHNlZ21lbnRzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteT0nJHtpfSddW2RhdGEteD0nJHt4fSddYCkpXG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50c1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBib2FyZEhhbmRsZXIgPSAoKCkgPT4ge1xuICBsZXQgcGxhbmUgPSAnaG9yaXpvbnRhbGx5J1xuXG4gIGNvbnN0IGV4dHJhY3RDb29yZHMgPSAoY2VsbCkgPT5cbiAgICBbY2VsbC5kYXRhc2V0LnksIGNlbGwuZGF0YXNldC54XS5tYXAoY29vcmQgPT4gTnVtYmVyKGNvb3JkKSlcblxuICBjb25zdCBjcmVhdGVCb2FyZCA9IChpc0hpZGRlbiwgZG9tQm9hcmQpID0+IHtcbiAgICBmb3IgKGxldCB5ID0gMTsgeSA8IDExOyB5KyspIHtcbiAgICAgIGZvciAobGV0IHggPSAxOyB4IDwgMTE7IHgrKykge1xuICAgICAgICBkb21Cb2FyZC5hcHBlbmQoX2NyZWF0ZUNlbGwoaXNIaWRkZW4sIHksIHgpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlbmRlckJvYXJkID0gY3VycnkoKGRvbUJvYXJkLCBpc0hpZGRlbiwgYm9hcmRTdGF0ZSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGNlbGxTdGF0ZSA9IGJvYXJkU3RhdGVbaV1bal1cbiAgICAgICAgY29uc3QgY2VsbFZpZXcgPSBkb21Cb2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS15PScke2kgKyAxfSddW2RhdGEteD0nJHtqICsgMX0nXWApXG4gICAgICAgIGlmICghY2VsbFZpZXcuY2xhc3NMaXN0LmNvbnRhaW5zKF9jZWxsVGFibGVbY2VsbFN0YXRlXSkpIHtcbiAgICAgICAgICBhZGRDbGFzcyhfY2VsbFRhYmxlW2NlbGxTdGF0ZV0sIGNlbGxWaWV3KVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0hpZGRlbiAmJiBbc3RhdGVzLk1JU1NFRCwgc3RhdGVzLkhJVCwgc3RhdGVzLlNVTkssIHN0YXRlcy5BUk9VTkRfU1VOS10uaW5jbHVkZXMoY2VsbFN0YXRlKSkge1xuICAgICAgICAgIHJlbW92ZUNsYXNzKCdmb2ctb2Ytd2FyJywgY2VsbFZpZXcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgY2xlYXJIaWdobGlnaHRzID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKVxuICAgIC5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnZnV0dXJlLXNoaXAnLCAnd3JvbmctcGxhY2VtZW50JywgYGgtJHtwbGFuZX0tc3RhcnRgLCBgaC0ke3BsYW5lfS1lbmRgKSlcblxuICBjb25zdCBoaWdobGlnaHRGdXR1cmVTaGlwID0gKHksIHgsIHNpemUsIGlzVmFsaWQpID0+IHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSAoaXNWYWxpZCkgPyAnZnV0dXJlLXNoaXAnIDogJ3dyb25nLXBsYWNlbWVudCdcbiAgICBjb25zdCBzZWdtZW50cyA9IF9jZWxsc0ZpbmRlcltwbGFuZV0oeSwgeCwgc2l6ZSlcbiAgICBjbGVhckhpZ2hsaWdodHMoKVxuICAgIGNvbnN0IHZhbGlkQ2VsbHMgPSBzZWdtZW50cy5maWx0ZXIoKGVsKSA9PiBCb29sZWFuKGVsKSlcbiAgICB2YWxpZENlbGxzLmZvckVhY2goKGVsLCBpKSA9PiB7XG4gICAgICBhZGRDbGFzcyhjbGFzc05hbWUsIGVsKVxuICAgICAgaWYgKGkgPT09IDApIGFkZENsYXNzKGBoLSR7cGxhbmV9LXN0YXJ0YCwgZWwpXG4gICAgICBpZiAoaSA9PT0gc2VnbWVudHMubGVuZ3RoIC0gMSkgYWRkQ2xhc3MoYGgtJHtwbGFuZX0tZW5kYCwgZWwpXG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHBsYWNlID0gKHksIHgsIHNpemUpID0+IHtcbiAgICBjb25zdCBzZWdtZW50cyA9IF9jZWxsc0ZpbmRlcltwbGFuZV0oeSwgeCwgc2l6ZSlcbiAgICBzZWdtZW50cy5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpXG4gICAgICBpZiAoaSA9PT0gMCkgYWRkQ2xhc3MoYCR7cGxhbmV9LXN0YXJ0YCwgZWwpXG4gICAgICBpZiAoaSA9PT0gc2VnbWVudHMubGVuZ3RoIC0gMSkgYWRkQ2xhc3MoYCR7cGxhbmV9LWVuZGAsIGVsKVxuICAgIH0pXG4gIH1cblxuICBjb25zdCBzZXRQbGFuZSA9IChuZXdQbGFuZSkgPT4geyBwbGFuZSA9IG5ld1BsYW5lIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZUJvYXJkLFxuICAgIHJlbmRlckJvYXJkLFxuICAgIHNldFBsYW5lLFxuICAgIGV4dHJhY3RDb29yZHMsXG4gICAgaGlnaGxpZ2h0RnV0dXJlU2hpcCxcbiAgICBjbGVhckhpZ2hsaWdodHMsXG4gICAgcGxhY2VcbiAgfVxufSkoKVxuIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5cbmNvbnN0IHdyYXBJbkRpdiA9IGN1cnJ5KChzdHIsIGNsYXNzZXMpID0+IHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZGl2LmlubmVyVGV4dCA9IHN0clxuICBkaXYuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKVxuICByZXR1cm4gZGl2XG59KVxuXG5jb25zdCBjcmVhdGVFbCA9IGN1cnJ5KChjbGFzc2VzLCBlbGVtZW50KSA9PiB7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KVxuICBlbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpXG4gIHJldHVybiBlbFxufSlcblxuY29uc3QgYWRkSWQgPSBjdXJyeSgoaWQsIGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudC5pZCA9IGlkXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCBhZGRDbGFzcyA9IGN1cnJ5KChuZXdDbGFzcywgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQobmV3Q2xhc3MpXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCByZW1vdmVDbGFzcyA9IGN1cnJ5KChyZW1vdmVkLCBlbGVtZW50KSA9PiB7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShyZW1vdmVkKVxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgcmVwbGFjZUNsYXNzID0gY3VycnkoKG9sZENsYXNzLCBuZXdDbGFzcywgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC5yZXBsYWNlKG9sZENsYXNzLCBuZXdDbGFzcylcbiAgcmV0dXJuIGVsZW1lbnRcbn0pXG5cbmNvbnN0IHRvZ2dsZUNsYXNzID0gY3VycnkoKHRvZ2dsZWRDbGFzcywgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUodG9nZ2xlZENsYXNzKVxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgYWRkQ2xhc3NlcyA9IGN1cnJ5KChjbGFzc2VzLCBlbGVtZW50KSA9PiB7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKVxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgcmVtb3ZlQ2xhc3NlcyA9IGN1cnJ5KChjbGFzc2VzLCBlbGVtZW50KSA9PiB7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzKVxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgYWRkRGF0YUF0dHIgPSBjdXJyeSgoZGF0YUF0dHIsIGRhdGFWYWwsIGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudFtkYXRhQXR0cl0gPSBkYXRhVmFsXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCBjc3NTZWxlY3RvciA9IGN1cnJ5KChlbGVtZW50LCBxdWVyeSkgPT4ge1xuICByZXR1cm4gZWxlbWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KVxufSlcblxuY29uc3QgcXVlcnlEb2N1bWVudCA9IGNzc1NlbGVjdG9yKGRvY3VtZW50KVxuXG5jb25zdCByZXBsYWNlRWwgPSBjdXJyeSgob2xkRWxlbWVudCwgbmV3RWxlbWVudCkgPT4ge1xuICBvbGRFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0VsZW1lbnQsIG9sZEVsZW1lbnQpXG4gIHJldHVybiBuZXdFbGVtZW50XG59KVxuXG5jb25zdCBjbG9uZUVsID0gY3VycnkoKGVsZW1lbnQpID0+IHtcbiAgcmV0dXJuIGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpXG59KVxuXG5leHBvcnQge1xuICB3cmFwSW5EaXYsXG4gIGNyZWF0ZUVsLFxuICBhZGRJZCxcbiAgYWRkQ2xhc3MsXG4gIGFkZENsYXNzZXMsXG4gIHJlbW92ZUNsYXNzLFxuICByZW1vdmVDbGFzc2VzLFxuICByZXBsYWNlQ2xhc3MsXG4gIHRvZ2dsZUNsYXNzLFxuICBhZGREYXRhQXR0cixcbiAgY3NzU2VsZWN0b3IsXG4gIHF1ZXJ5RG9jdW1lbnQsXG4gIHJlcGxhY2VFbCxcbiAgY2xvbmVFbFxufVxuIiwiZXhwb3J0IGNvbnN0IGV2ZW50c0hhbmRsZXIgPSAoKCkgPT4ge1xuICBjb25zdCBldmVudHMgPSB7fVxuXG4gIHJldHVybiB7XG4gICAgb24gKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0gfHwgW11cbiAgICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pXG4gICAgfSxcblxuICAgIG9uRWFjaCAoYXJyT2ZFdmVudHMsIGZuKSB7XG4gICAgICBhcnJPZkV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICBldmVudHNbZXZlbnRdID0gZXZlbnRzW2V2ZW50XSB8fCBbXVxuICAgICAgICBldmVudHNbZXZlbnRdLnB1c2goZm4pXG4gICAgICB9KVxuICAgIH0sXG5cbiAgICBvZmYgKGV2ZW50TmFtZSwgcmVtb3ZlZEZuKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoKGZuKSA9PiBmbiAhPT0gcmVtb3ZlZEZuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0cmlnZ2VyIChldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4gZm4oZGF0YSkpXG4gICAgICB9XG4gICAgfVxuICB9XG59KSgpXG4iLCJjb25zdCBjdXJyeSA9IChmbikgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gY3VycmllZCAoLi4uYXJncykge1xuICAgIGlmIChmbi5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY3VycmllZC5iaW5kKG51bGwsIC4uLmFyZ3MpXG4gICAgfVxuICAgIHJldHVybiBmbiguLi5hcmdzKVxuICB9XG59XG5cbmNvbnN0IGNoZWNrVHJ1dGhpbmVzcyA9IChlbCkgPT4gQm9vbGVhbihlbClcblxuY29uc3QgY2hlY2tGYWxzaW5lc3MgPSAoZWwpID0+ICFlbFxuXG5jb25zdCBoYXNUcnV0aHlWYWx1ZXMgPSAoYXJyKSA9PiBhcnIuc29tZShjaGVja1RydXRoaW5lc3MpXG5cbmNvbnN0IGhhc0ZhbHN5VmFsdWVzID0gKGFycikgPT4gYXJyLnNvbWUoY2hlY2tGYWxzaW5lc3MpXG5cbmNvbnN0IHJlcGxhY2VFdmVyeU50aCA9IGN1cnJ5KChudGgsIHN0YXJ0LCB1bnRpbCwgdmFsdWUsIGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbLi4uYXJyXVxuICBjb25zdCBzID0gKHR5cGVvZiBzdGFydCA9PT0gJ251bWJlcicpID8gc3RhcnQgOiBudGggLSAxXG4gIGNvbnN0IGxlbiA9IHVudGlsIHx8IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IHM7IGkgPCBsZW47IGkgKz0gbnRoKSB7XG4gICAgcmVzdWx0W2ldID0gdmFsdWVcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCByZXBsYWNlQXQgPSBjdXJyeSgoaW5kZXgsIHZhbHVlLCBhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gWy4uLmFycl1cbiAgcmVzdWx0W2luZGV4XSA9IHZhbHVlXG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IG1hcCA9IGN1cnJ5KChmbiwgZnVuY3RvcikgPT4ge1xuICBsZXQgcmVzdWx0XG4gIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0b3IpKSB7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOlxuICAgICAgcmVzdWx0ID0gW11cbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBmdW5jdG9yKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGZuKGl0ZW0pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG4gICAgICByZXN1bHQgPSB7fVxuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKGZ1bmN0b3IpKSB7XG4gICAgICAgIHJlc3VsdFtwcm9wXSA9IGZuKGZ1bmN0b3JbcHJvcF0pXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn0pXG5cbmNvbnN0IGlzQXJyYXkgPSBjdXJyeSgodmFsKSA9PiAoXG4gIHZhbCAhPT0gbnVsbCAmJlxuICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuKSlcblxuY29uc3QgaXNPYmplY3QgPSBjdXJyeSgodmFsKSA9PiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cbmNvbnN0IHBpcGUgPSAoLi4uZnVuY3Rpb25zKSA9PlxuICAodmFsdWUpID0+IGZ1bmN0aW9ucy5yZWR1Y2UoKGFjYywgZm4pID0+IGZuKGFjYyksIHZhbHVlKVxuXG5jb25zdCBkZWNyZW1lbnQgPSBjdXJyeSgodmFsKSA9PiAoaXNBcnJheSh2YWwpIHx8IGlzT2JqZWN0KHZhbCkpXG4gID8gbWFwKChuKSA9PiAodHlwZW9mIG4gPT09ICdudW1iZXInKSA/IG4gLSAxIDogbiwgdmFsKVxuICA6IHZhbCAtIDFcbilcblxuY29uc3QgZGVjcmVtZW50RWFjaCA9IG1hcChkZWNyZW1lbnQpXG5cbmNvbnN0IGluY3JlbWVudCA9IGN1cnJ5KCh2YWwpID0+IChpc0FycmF5KHZhbCkgfHwgaXNPYmplY3QodmFsKSlcbiAgPyBtYXAoKG4pID0+ICh0eXBlb2YgbiA9PT0gJ251bWJlcicpID8gbiArIDEgOiBuLCB2YWwpXG4gIDogdmFsICsgMVxuKVxuXG5jb25zdCBpbmNyZW1lbnRFYWNoID0gbWFwKGluY3JlbWVudClcblxuY29uc3QgcmVwZWF0ID0gY3VycnkoKGZuLCBudW0pID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbnVtKSB7XG4gICAgcmVzdWx0W2ldID0gZm4oaSlcbiAgICBpKytcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCBmaW5kID0gY3VycnkoKGZuLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBpZiAoZm4oYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIGFycltpXVxuICAgIH1cbiAgICBpKytcbiAgfVxufSlcblxuY29uc3QgZmluZEluZGV4ID0gY3VycnkoKGZuLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBpZiAoZm4oYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIGlcbiAgICB9XG4gICAgaSsrXG4gIH1cbn0pXG5cbmNvbnN0IGZvckVhY2ggPSBjdXJyeSgoZm4sIGFycikgPT4ge1xuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIGZuKGFycltpXSlcbiAgICBpKytcbiAgfVxuICByZXR1cm4gYXJyXG59KVxuXG5jb25zdCBmbGF0dGVuID0gY3VycnkoKGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBjb25zdCBpbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBpbGVuKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnJbaV0pID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICBjb25zdCBqYXJyID0gZmxhdHRlbihhcnJbaV0pXG4gICAgICBjb25zdCBqbGVuID0gamFyci5sZW5ndGhcbiAgICAgIGxldCBqID0gMFxuICAgICAgd2hpbGUgKGogPCBqbGVuKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGphcnJbal0pXG4gICAgICAgIGorK1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChhcnJbaV0pXG4gICAgfVxuICAgIGkrK1xuICB9XG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IGZpbHRlciA9IGN1cnJ5KChmbiwgYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgaWYgKGZuKGFycltpXSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGFycltpXSlcbiAgICB9XG4gICAgaSsrXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuY29uc3Qgb2JqRXF1YWwgPSBjdXJyeSgob2JqMSwgb2JqMikgPT4ge1xuICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMob2JqMSkpIHtcbiAgICBpZiAob2JqMVtwcm9wXSAhPT0gb2JqMltwcm9wXSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59KVxuXG5jb25zdCBvYmplY3RJbkFycmF5ID0gY3VycnkoKG9iaiwgYXJyKSA9PiB7XG4gIGZvciAoY29uc3QgY3VycmVudE9iaiBvZiBhcnIpIHtcbiAgICBpZiAob2JqRXF1YWwoY3VycmVudE9iaiwgb2JqKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59KVxuXG5jb25zdCByZW1vdmVEdXBsaWNhdGVPYmogPSBjdXJyeSgoYXJyKSA9PiB7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgaWYgKGxlbiA8PSAxKSByZXR1cm4gYXJyXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIW9iamVjdEluQXJyYXkoYXJyW2ldLCByZXN1bHQpKSB7XG4gICAgICByZXN1bHQucHVzaChhcnJbaV0pXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IHJlbW92ZSA9IGN1cnJ5KChpdGVtLCBhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gWy4uLmFycl1cbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycltpXSA9PT0gaXRlbSkge1xuICAgICAgcmVzdWx0LnNwbGljZShpLCAxKVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCBndCA9IGN1cnJ5KChhLCBiKSA9PiBhID4gYilcbmNvbnN0IGx0ID0gY3VycnkoKGEsIGIpID0+IGEgPCBiKVxuY29uc3QgZ3RlID0gY3VycnkoKGEsIGIpID0+IGEgPj0gYilcbmNvbnN0IGx0ZSA9IGN1cnJ5KChhLCBiKSA9PiBhIDw9IGIpXG5jb25zdCBlcSA9IGN1cnJ5KChhLCBiKSA9PiBhID09PSBiKVxuXG5jb25zdCBhbGwgPSBjdXJyeSgocHJlZCwgYXJyKSA9PiB7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghcHJlZChhcnJbaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn0pXG5cbmNvbnN0IGFueSA9IGN1cnJ5KChwcmVkLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKHByZWQoYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59KVxuXG5jb25zdCBtb2RpZnkgPSBjdXJyeSgocHJvcCwgZm4sIG9iaikgPT5cbiAgT2JqZWN0LmFzc2lnbihcbiAgICB7fSxcbiAgICBvYmosXG4gICAgeyBbcHJvcF06IGZuKG9ialtwcm9wXSkgfVxuICApKVxuXG5leHBvcnQgeyBoYXNUcnV0aHlWYWx1ZXMsIHJlcGxhY2VFdmVyeU50aCwgcmVwbGFjZUF0LCBwaXBlLCBtYXAsIGN1cnJ5LCBkZWNyZW1lbnQsIGRlY3JlbWVudEVhY2gsIGluY3JlbWVudCwgaW5jcmVtZW50RWFjaCwgcmVwZWF0LCBmaW5kLCBmaW5kSW5kZXgsIGZvckVhY2gsIGhhc0ZhbHN5VmFsdWVzLCBmbGF0dGVuLCBmaWx0ZXIsIG9iakVxdWFsLCBvYmplY3RJbkFycmF5LCByZW1vdmVEdXBsaWNhdGVPYmosIHJlbW92ZSwgZ3QsIGx0LCBndGUsIGx0ZSwgZXEsIGFsbCwgYW55LCBpc0FycmF5LCBpc09iamVjdCwgbW9kaWZ5IH1cbiIsImNvbnN0IGdldFJhbmRvbUludGVnZXIgPSAobWluLCBtYXgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW5cblxuY29uc3QgZ2V0UmFuZG9tQ29vcmRzID0gKCkgPT4ge1xuICBjb25zdCB5ID0gZ2V0UmFuZG9tSW50ZWdlcigxLCAxMClcbiAgY29uc3QgeCA9IGdldFJhbmRvbUludGVnZXIoMSwgMTApXG4gIHJldHVybiB7IHksIHggfVxufVxuXG5jb25zdCBkZWxheSA9IGFzeW5jIChtcykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKVxuICB9KVxufVxuXG5leHBvcnQgeyBnZXRSYW5kb21JbnRlZ2VyLCBnZXRSYW5kb21Db29yZHMsIGRlbGF5IH1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lKEdwLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufSIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcblxuICBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcblxuICB2YXIgX3MsIF9lO1xuXG4gIHRyeSB7XG4gICAgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheVdpdGhvdXRIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhvdXRIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlU3ByZWFkIGZyb20gXCIuL25vbkl0ZXJhYmxlU3ByZWFkLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGVzL3N0eWxlLmNzcydcbmltcG9ydCAnLi9sb2dpYy9nYW1lX2hhbmRsZXInXG4iXSwibmFtZXMiOlsic3RhdGVzIiwiT2JqZWN0IiwiZnJlZXplIiwiV0FURVIiLCJTSElQIiwiTUlTU0VEIiwiSElUIiwiU1VOSyIsIkFST1VORF9TVU5LIiwiZXZlbnRzIiwiQk9BUkRfSE9WRVJFRCIsIkJPQVJEX0NMSUNLRUQiLCJTSElQX1ZBTElEQVRFRCIsIlNISVBfUk9UQVRFRCIsIlNISVBfUExBQ0VEIiwiUExBWUVSU19DUkVBVEVEIiwiR0FNRV9TVEFSVEVEIiwiQ09NUFVURVJfUExBQ0VEX1NISVBTIiwiQ09NUFVURVJfQk9BUkRfQ0xJQ0tFRCIsIkNPTVBVVEVSX0JPQVJEX0FUVEFDS0VEIiwiUExBWUVSX0ZJTklTSEVEX1RVUk4iLCJDT01QVVRFUl9GSU5JU0hFRF9UVVJOIiwiR0FNRV9FTkRFRCIsIkdhbWVib2FyZCIsImdldFJhbmRvbUludGVnZXIiLCJnZXRSYW5kb21Db29yZHMiLCJfZ2V0UmFuZG9tUGxhbmUiLCJBaUdhbWVib2FyZCIsImdhbWVib2FyZCIsIl9wbGFjZVNoaXBBdFJhbmRvbSIsInNpemUiLCJwbGFuZSIsImNvb3JkcyIsInNldFBsYW5lIiwiaXNWYWxpZEZvclBsYWNlIiwieSIsIngiLCJwbGFjZSIsInBsYWNlRmxlZXQiLCJzaXplcyIsImFzc2lnbiIsIlBsYXllciIsImN1cnJ5IiwiZ3QiLCJsdCIsInJlbW92ZSIsIl9hdHRhY2tEaXJlY3Rpb25zIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiX2dldE9wcG9zaXRlRGlyZWN0aW9uIiwiZGlyZWN0aW9uIiwiX2lzU2hpcEhvcml6b250YWwiLCJoaXRDZWxscyIsImxlbmd0aCIsIl9nZXRFbmRPbkF4aXMiLCJheGlzIiwiZ2V0TGFzdCIsImNvbXBhcmlzb25PcCIsInJlZHVjZSIsInByZXYiLCJuZXh0IiwiX2dldExlZnRtb3N0IiwiX2dldFJpZ2h0bW9zdCIsIl9nZXRUb3Btb3N0IiwiX2dldEJvdHRvbW1vc3QiLCJBaVBsYXllciIsImNvbXB1dGVyIiwibGFzdEhpdCIsIl9maW5kUmFuZG9tU3BvdFRvQXR0YWNrIiwiYm9hcmQiLCJpbmNsdWRlcyIsInN0YXRlIiwiX2ZpbmRTcG90QWZ0ZXJIaXQiLCJkaXJlY3Rpb25zIiwia2V5cyIsInJhbmRvbURpcmVjdGlvbiIsInJ5IiwicngiLCJpc1ZhbGlkVGFyZ2V0IiwicmFuZG9tQ29vcmRzIiwidmFsaWRpdHkiLCJfZ2Fpbk9wcG9zaXRlRW5kIiwibGVmdG1vc3QiLCJyaWdodG1vc3QiLCJ0b3Btb3N0IiwiYm90dG9tbW9zdCIsIl9hdHRhY2tTcGVjaWZpY1Nwb3QiLCJhdHRhY2siLCJzdGF0dXMiLCJnZXRBdHRhY2tTdGF0dXMiLCJfYXR0YWNrSW5EaXJlY3Rpb24iLCJhdHRhY2tQbGF5ZXIiLCJ2YWx1ZSIsIl9hdHRhY2tBZnRlckhpdCIsInB1c2giLCJfYXR0YWNrUmFuZG9tQ2VsbCIsInNoaXBTdGF0dXMiLCJzZXREaXJlY3Rpb24iLCJ2YWwiLCJuYW1lIiwidHlwZSIsInJlcGVhdCIsImZpbmRJbmRleCIsInBpcGUiLCJtYXAiLCJmbGF0dGVuIiwiZGVjcmVtZW50IiwiZXEiLCJhbnkiLCJmaWx0ZXIiLCJvYmplY3RJbkFycmF5IiwicmVtb3ZlRHVwbGljYXRlT2JqIiwiU2hpcCIsIl9jcmVhdGVSb3ciLCJfY3JlYXRlR2FtZWJvYXJkIiwiX21hcENvb3JkcyIsInJlc3VsdCIsImkiLCJfY29vcmRzVG9JbmRleGVzIiwiZmxlZXQiLCJtaXNzZWQiLCJfbWFwQm9hcmQiLCJfbWFwU2hpcCIsIl9tYXBNaXNzZWQiLCJfbWFwSGl0IiwiX21hcFN1bmsiLCJfbWFwQXJvdW5kIiwiX2ZpbmRTaGlwIiwiZmluZCIsInNoaXAiLCJzZWdtZW50cyIsInNlZ21lbnQiLCJfZ2V0U2VnbWVudHMiLCJfaXNTaGlwU3VuayIsImlzU3VuayIsIl9nZXRTaGlwQ2VsbHMiLCJfZ2V0U3Vua0NlbGxzIiwiY2VsbCIsIl9hbnlTaGlwIiwiaXNGbGVldFN1bmsiLCJldmVyeSIsIl9pc092ZXJsYXBzIiwib2NjdXBpZWRDZWxscyIsInRhaWwiLCJqIiwiX2lzT3ZlcmZsb3dzIiwiX2dldENlbGxTdGF0ZSIsIml5IiwiaXgiLCJyb3ciLCJfaXNBZGphY2VudFRvU2hpcHMiLCJ0b3BDZWxsIiwiYm90dG9tQ2VsbCIsImxlZnRDZWxsIiwicmlnaHRDZWxsIiwidG9wTGVmdCIsImJvdHRvbUxlZnQiLCJ0b3BSaWdodCIsImJvdHRvbVJpZ2h0IiwiX2dldFN1cnJvdW5kaW5nQ2VsbHMiLCJfaXNDZWxsVmFsaWQiLCJnZXRBcmVhQXJvdW5kU3VuayIsInN1bmtDZWxscyIsInJlY2VpdmVBdHRhY2siLCJoaXRTaGlwIiwiaGl0U2VnbWVudEluZGV4IiwiaGl0IiwiYXR0YWNrZWRDZWxsIiwibmV3UGxhbmUiLCJpc0ZpcnN0IiwidHVybiIsImNoYW5nZVR1cm4iLCJfdHlwZXMiLCJfc2VnbWVudHNDcmVhdG9yIiwiaG9yaXpvbnRhbGx5IiwiaW50YWN0IiwidmVydGljYWxseSIsInVuZGVmaW5lZCIsIkVycm9yIiwiZXZlbnRzSGFuZGxlciIsImJvYXJkSGFuZGxlciIsImRlbGF5Iiwid3JhcEluRGl2IiwicXVlcnlEb2N1bWVudCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJyZXBsYWNlRWwiLCJjbG9uZUVsIiwibWVudUhhbmRsZXIiLCJzdGFydEJ0biIsInJlc3RhcnRCdG4iLCJuYW1lSW5wIiwicm90YXRlQnRuIiwibG9nRGl2IiwiaGludHNEaXYiLCJzaGlwc1BsYWNlZCIsIm1zZ0NvdW50IiwiX2hpZGUiLCJlbCIsIl9zaG93IiwiaGFuZGxlU3RhcnQiLCJmb3JFYWNoIiwiZGlzYWJsZWQiLCJpbm5lclRleHQiLCJ0cmlnZ2VyIiwicm90YXRlIiwiZGF0YXNldCIsImNoZWNrU3RhcnRDb25kaXRpb25zIiwiY2hlY2tTaGlwc1JlYWRpbmVzcyIsImFyZVNoaXBzUGxhY2VkIiwic2hpcFR5cGUiLCJfY3JlYXRlTG9nTWVzc2FnZSIsInBsYXllciIsImxvZ0NsYXNzIiwibXNnIiwiZGlzcGxheUxvZ01lc3NhZ2UiLCJsb2ciLCJoaW50IiwiaWQiLCJwcmVwZW5kIiwiaGFuZGxlRW5kIiwiaW5pdE1lbnUiLCJhZGRFdmVudExpc3RlbmVyIiwib24iLCJvbkVhY2giLCJib2FyZFZpZXdMb2dpYyIsInBsYXllckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsInJlbmRlclBsYXllciIsInJlbmRlckJvYXJkIiwicmVuZGVyQ29tcHV0ZXIiLCJjcmVhdGVCb2FyZHMiLCJjcmVhdGVCb2FyZCIsInNlbmRDb29yZHNGb3JWYWxpZGF0aW9uIiwiZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiZXh0cmFjdENvb3JkcyIsImhpZ2h0bGlnaHRWYWxpZGF0ZWRDb29yZHMiLCJkYXRhIiwiaGlnaGxpZ2h0RnV0dXJlU2hpcCIsInNlbmRTaGlwRm9yVmFsaWRhdGlvbiIsInBsYWNlVmFsaWRhdGVkU2hpcCIsInJlbmRlckNvbXB1dGVyU3RhdGUiLCJyZW5kZXJQbGF5ZXJTdGF0ZSIsInNlbmRBdHRhY2tlZENvb3JkcyIsInN0b3BMaXN0ZW5pbmdUb1ByZUdhbWVFdmVudHMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2xlYXJIaWdobGlnaHRzIiwiaW5pdEJvYXJkcyIsImdhbWVIYW5kbGVyIiwic2hpcHNUb1BsYWNlIiwiZ2FtZVN0YXJ0ZWQiLCJnYW1lRW5kZWQiLCJ2YWxpZGF0ZUNvb3JkcyIsIm5leHRTaGlwU2l6ZSIsImlzVmFsaWQiLCJ2YWxpZGF0ZVBsYWNlbWVudCIsInNoaWZ0Iiwic3RhcnRHYW1lIiwiaGFuZGxlUGxheWVyQXR0YWNrIiwiaGFuZGxlQ29tcHV0ZXJBdHRhY2siLCJpbml0R2FtZSIsIl9jZWxsVGFibGUiLCJzIiwidyIsImgiLCJtIiwiYSIsIl9jZWxsQ2xhc3NlcyIsInZhbHVlcyIsIl9jcmVhdGVDZWxsIiwiaXNIaWRkZW4iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJfY2VsbHNGaW5kZXIiLCJxdWVyeVNlbGVjdG9yIiwiY29vcmQiLCJOdW1iZXIiLCJkb21Cb2FyZCIsImFwcGVuZCIsImJvYXJkU3RhdGUiLCJjZWxsU3RhdGUiLCJjZWxsVmlldyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjbGFzc05hbWUiLCJ2YWxpZENlbGxzIiwiQm9vbGVhbiIsInN0ciIsImNsYXNzZXMiLCJkaXYiLCJjcmVhdGVFbCIsImVsZW1lbnQiLCJhZGRJZCIsIm5ld0NsYXNzIiwicmVtb3ZlZCIsInJlcGxhY2VDbGFzcyIsIm9sZENsYXNzIiwicmVwbGFjZSIsInRvZ2dsZUNsYXNzIiwidG9nZ2xlZENsYXNzIiwidG9nZ2xlIiwiYWRkQ2xhc3NlcyIsInJlbW92ZUNsYXNzZXMiLCJhZGREYXRhQXR0ciIsImRhdGFBdHRyIiwiZGF0YVZhbCIsImNzc1NlbGVjdG9yIiwicXVlcnkiLCJvbGRFbGVtZW50IiwibmV3RWxlbWVudCIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJjbG9uZU5vZGUiLCJldmVudE5hbWUiLCJmbiIsImFyck9mRXZlbnRzIiwiZXZlbnQiLCJvZmYiLCJyZW1vdmVkRm4iLCJjdXJyaWVkIiwiYXJncyIsImJpbmQiLCJjaGVja1RydXRoaW5lc3MiLCJjaGVja0ZhbHNpbmVzcyIsImhhc1RydXRoeVZhbHVlcyIsImFyciIsInNvbWUiLCJoYXNGYWxzeVZhbHVlcyIsInJlcGxhY2VFdmVyeU50aCIsIm50aCIsInN0YXJ0IiwidW50aWwiLCJsZW4iLCJyZXBsYWNlQXQiLCJpbmRleCIsImZ1bmN0b3IiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJpdGVtIiwicHJvcCIsImlzQXJyYXkiLCJpc09iamVjdCIsImZ1bmN0aW9ucyIsImFjYyIsIm4iLCJkZWNyZW1lbnRFYWNoIiwiaW5jcmVtZW50IiwiaW5jcmVtZW50RWFjaCIsIm51bSIsImlsZW4iLCJqYXJyIiwiamxlbiIsIm9iakVxdWFsIiwib2JqMSIsIm9iajIiLCJvYmoiLCJjdXJyZW50T2JqIiwic3BsaWNlIiwiYiIsImd0ZSIsImx0ZSIsImFsbCIsInByZWQiLCJtb2RpZnkiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtcyIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCJdLCJzb3VyY2VSb290IjoiIn0=