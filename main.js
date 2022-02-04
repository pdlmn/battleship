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
/* harmony import */ var _utils_helper_funcs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/helper_funcs */ "./utils/helper_funcs.js");
/* harmony import */ var _ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../ui/dom_funcs */ "./ui/dom_funcs.js");














(function uiLogic() {
  var startBtn = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#start-game');
  var restartBtn = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#restart-game');
  var nameInp = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#player-name');
  var rotateBtn = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#rotate');
  var logDiv = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#log');
  var hintsDiv = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#hints');
  var nameInputed = Boolean(nameInp.value);
  var shipsPlaced = false;
  var msgCount = 0;
  startBtn.disabled = true;
  startBtn.addEventListener('click', function () {
    ;
    [startBtn, rotateBtn].forEach(function (el) {
      return (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.addClass)('display-none', el);
    });
    nameInp.disabled = true;
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
    var msg = "Turn ".concat(++msgCount, ". y").concat(status.y, " y").concat(status.x);

    if (status.value === 'missed') {
      msg += " ".concat(player.name, " missed...");
    }

    if (status.value === 'hit') {
      msg += " ".concat(player.name, " ").concat(status.shipStatus, " ").concat(status.ship, "!");
    }

    var log = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.wrapInDiv)(msg, [logClass]);
    var hint = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.cloneEl)(log);
    hint.id = 'hints';
    logDiv.prepend(log);
    hintsDiv = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.replaceEl)(hintsDiv, hint);
  });
  _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_ENDED, function (name) {
    hintsDiv.innerText = "".concat(name, " won!");
    (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.removeClass)('hidden', restartBtn);
  });
})();

(function boardViewLogic() {
  var playerBoard = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#player-board');
  var computerBoard = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_12__.queryDocument)('#computer-board');
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
  var computerBoard = (0,_factories_ai_gameboard__WEBPACK_IMPORTED_MODULE_9__.AiGameboard)();
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
            if (!playerBoard.isFleetSunk()) {
              _context.next = 4;
              break;
            }

            gameEnded = true;
            _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_ENDED, computer.name);
            return _context.abrupt("return");

          case 4:
            _context.next = 6;
            return (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_11__.delay)(250);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLE1BQU07QUFDTixlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsbUJBQW1CO0FBQ3BE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O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTkEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbnN0YW50cy9jZWxsX3N0YXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9jb25zdGFudHMvZXZlbnRfdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZmFjdG9yaWVzL2FpX2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9mYWN0b3JpZXMvYWlfcGxheWVyLmpzIiwid2VicGFjazovLy8uL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly8vLi9sb2dpYy9nYW1lX2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdWkvZG9tX2JvYXJkLmpzIiwid2VicGFjazovLy8uL3VpL2RvbV9mdW5jcy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9ldmVudHNfaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9mdW5jX2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvaGVscGVyX2Z1bmNzLmpzIiwid2VicGFjazovLy8uL3N0eWxlcy9zdHlsZS5jc3M/ZGYwNiIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5TGlrZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXN5bmNUb0dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9ub25JdGVyYWJsZVNwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b0NvbnN1bWFibGVBcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiZXhwb3J0IGNvbnN0IHN0YXRlcyA9IE9iamVjdC5mcmVlemUoe1xuICBXQVRFUjogJ3cnLFxuICBTSElQOiAncycsXG4gIE1JU1NFRDogJ20nLFxuICBISVQ6ICdoJyxcbiAgU1VOSzogJ3gnLFxuICBBUk9VTkRfU1VOSzogJ2EnXG59KVxuIiwiZXhwb3J0IGNvbnN0IGV2ZW50cyA9IE9iamVjdC5mcmVlemUoe1xuICBCT0FSRF9IT1ZFUkVEOiAnQm9hcmQgaG92ZXJlZCcsXG4gIEJPQVJEX0NMSUNLRUQ6ICdCb2FyZCBjbGlja2VkJyxcbiAgU0hJUF9WQUxJREFURUQ6ICdTaGlwIHZhbGlkYXRlZCcsXG4gIFNISVBfUk9UQVRFRDogJ1NoaXAgcm90YXRlZCcsXG4gIFNISVBfUExBQ0VEOiAnU2hpcCBwbGFjZWQnLFxuICBQTEFZRVJTX0NSRUFURUQ6ICdQbGF5ZXJzIGNyZWF0ZWQnLFxuICBHQU1FX1NUQVJURUQ6ICdHYW1lIHN0YXJ0ZWQnLFxuICBDT01QVVRFUl9QTEFDRURfU0hJUFM6ICdDb21wdXRlciBwbGFjZWQgc2hpcHMnLFxuICBDT01QVVRFUl9CT0FSRF9DTElDS0VEOiAnQ29tcHV0ZXIgYm9hcmQgY2xpY2tlZCcsXG4gIENPTVBVVEVSX0JPQVJEX0FUVEFDS0VEOiAnQ29tcHV0ZXIgYm9hcmQgYXR0YWNrZWQnLFxuICBQTEFZRVJfRklOSVNIRURfVFVSTjogJ1BsYXllciBtYWRlIG1vdmUnLFxuICBDT01QVVRFUl9GSU5JU0hFRF9UVVJOOiAnQ29tcHV0ZXIgbWFkZSBtb3ZlJyxcbiAgR0FNRV9FTkRFRDogJ0dhbWUgZW5kZWQnXG59KVxuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnXG5pbXBvcnQgeyBnZXRSYW5kb21JbnRlZ2VyLCBnZXRSYW5kb21Db29yZHMgfSBmcm9tICcuLi91dGlscy9oZWxwZXJfZnVuY3MnXG5cbmNvbnN0IF9nZXRSYW5kb21QbGFuZSA9ICgpID0+IHtcbiAgcmV0dXJuIGdldFJhbmRvbUludGVnZXIoMSwgMikgPT09IDEgPyAnaG9yaXpvbnRhbGx5JyA6ICd2ZXJ0aWNhbGx5J1xufVxuXG5leHBvcnQgY29uc3QgQWlHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVib2FyZCgpXG5cbiAgY29uc3QgX3BsYWNlU2hpcEF0UmFuZG9tID0gKHNpemUpID0+IHtcbiAgICBjb25zdCBwbGFuZSA9IF9nZXRSYW5kb21QbGFuZSgpXG4gICAgbGV0IGNvb3JkcyA9IGdldFJhbmRvbUNvb3JkcygpXG4gICAgZ2FtZWJvYXJkLnNldFBsYW5lKHBsYW5lKVxuICAgIHdoaWxlICghZ2FtZWJvYXJkLmlzVmFsaWRGb3JQbGFjZShjb29yZHMueSwgY29vcmRzLngsIHNpemUpKSB7XG4gICAgICBjb29yZHMgPSBnZXRSYW5kb21Db29yZHMoKVxuICAgIH1cbiAgICBnYW1lYm9hcmQucGxhY2UoY29vcmRzLnksIGNvb3Jkcy54LCBzaXplKVxuICB9XG5cbiAgY29uc3QgcGxhY2VGbGVldCA9ICgpID0+IHtcbiAgICBsZXQgc2l6ZSA9IDVcbiAgICB3aGlsZSAoc2l6ZSA+IDApIHtcbiAgICAgIF9wbGFjZVNoaXBBdFJhbmRvbShzaXplKVxuICAgICAgc2l6ZS0tXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZ2FtZWJvYXJkLCB7XG4gICAgcGxhY2VGbGVldFxuICB9KVxufVxuIiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInXG5pbXBvcnQgeyBzdGF0ZXMgfSBmcm9tICcuLi9jb25zdGFudHMvY2VsbF9zdGF0ZXMnXG5pbXBvcnQgeyBnZXRSYW5kb21JbnRlZ2VyLCBnZXRSYW5kb21Db29yZHMgfSBmcm9tICcuLi91dGlscy9oZWxwZXJfZnVuY3MnXG5pbXBvcnQgeyBjdXJyeSwgZ3QsIGx0LCByZW1vdmUgfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5cbmNvbnN0IF9hdHRhY2tEaXJlY3Rpb25zID0ge1xuICBsZWZ0OiAoeSwgeCkgPT4gKHsgeSwgeDogeCAtIDEgfSksXG4gIHJpZ2h0OiAoeSwgeCkgPT4gKHsgeSwgeDogeCArIDEgfSksXG4gIHRvcDogKHksIHgpID0+ICh7IHk6IHkgLSAxLCB4IH0pLFxuICBib3R0b206ICh5LCB4KSA9PiAoeyB5OiB5ICsgMSwgeCB9KVxufVxuXG5jb25zdCBfZ2V0T3Bwb3NpdGVEaXJlY3Rpb24gPSAoZGlyZWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gJ3JpZ2h0J1xuICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgIHJldHVybiAnbGVmdCdcbiAgICBjYXNlICd0b3AnOlxuICAgICAgcmV0dXJuICdib3R0b20nXG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIHJldHVybiAndG9wJ1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJydcbiAgfVxufVxuXG5jb25zdCBfaXNTaGlwSG9yaXpvbnRhbCA9IChoaXRDZWxscykgPT5cbiAgaGl0Q2VsbHMubGVuZ3RoID4gMVxuICAgID8gaGl0Q2VsbHNbMF0ueSA9PT0gaGl0Q2VsbHNbMV0ueVxuICAgIDogZmFsc2VcblxuY29uc3QgX2dldEVuZE9uQXhpcyA9IGN1cnJ5KChheGlzLCBnZXRMYXN0LCBoaXRDZWxscykgPT4ge1xuICBjb25zdCBjb21wYXJpc29uT3AgPSBnZXRMYXN0ID8gZ3QgOiBsdFxuICByZXR1cm4gaGl0Q2VsbHMucmVkdWNlKChwcmV2LCBuZXh0KSA9PlxuICAgIGNvbXBhcmlzb25PcChwcmV2W2F4aXNdLCBuZXh0W2F4aXNdKVxuICAgICAgPyBwcmV2XG4gICAgICA6IG5leHRcbiAgKVxufVxuKVxuXG5jb25zdCBfZ2V0TGVmdG1vc3QgPSBfZ2V0RW5kT25BeGlzKCd4JywgZmFsc2UpXG5jb25zdCBfZ2V0UmlnaHRtb3N0ID0gX2dldEVuZE9uQXhpcygneCcsIHRydWUpXG5jb25zdCBfZ2V0VG9wbW9zdCA9IF9nZXRFbmRPbkF4aXMoJ3knLCBmYWxzZSlcbmNvbnN0IF9nZXRCb3R0b21tb3N0ID0gX2dldEVuZE9uQXhpcygneScsIHRydWUpXG5cbmV4cG9ydCBjb25zdCBBaVBsYXllciA9ICgpID0+IHtcbiAgY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoJ0NvbXB1dGVyJywgZmFsc2UpXG4gIGxldCBoaXRDZWxscyA9IFtdXG4gIGxldCBsYXN0SGl0ID0ge31cbiAgbGV0IGRpcmVjdGlvbiA9ICcnXG5cbiAgY29uc3QgX2ZpbmRSYW5kb21TcG90VG9BdHRhY2sgPSAoYm9hcmQpID0+IHtcbiAgICBsZXQgY29vcmRzID0gZ2V0UmFuZG9tQ29vcmRzKClcbiAgICB3aGlsZSAoW3N0YXRlcy5ISVQsIHN0YXRlcy5NSVNTRUQsIHN0YXRlcy5TVU5LLCBzdGF0ZXMuQVJPVU5EX1NVTktdLmluY2x1ZGVzKGJvYXJkLnN0YXRlW2Nvb3Jkcy55IC0gMV1bY29vcmRzLnggLSAxXSkpIHtcbiAgICAgIGNvb3JkcyA9IGdldFJhbmRvbUNvb3JkcygpXG4gICAgfVxuICAgIHJldHVybiB7IHk6IGNvb3Jkcy55LCB4OiBjb29yZHMueCB9XG4gIH1cblxuICBjb25zdCBfZmluZFNwb3RBZnRlckhpdCA9IChib2FyZCwgeSwgeCkgPT4ge1xuICAgIGxldCBkaXJlY3Rpb25zID0gT2JqZWN0LmtleXMoX2F0dGFja0RpcmVjdGlvbnMpXG4gICAgbGV0IHJhbmRvbURpcmVjdGlvbiA9IGRpcmVjdGlvbnNbZ2V0UmFuZG9tSW50ZWdlcigwLCAzKV1cbiAgICBsZXQgeyB5OiByeSwgeDogcnggfSA9IF9hdHRhY2tEaXJlY3Rpb25zW3JhbmRvbURpcmVjdGlvbl0oeSwgeClcblxuICAgIHdoaWxlICghYm9hcmQuaXNWYWxpZFRhcmdldChyeSwgcngpICYmIGRpcmVjdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgZGlyZWN0aW9ucyA9IHJlbW92ZShyYW5kb21EaXJlY3Rpb24sIGRpcmVjdGlvbnMpXG4gICAgICByYW5kb21EaXJlY3Rpb24gPSBkaXJlY3Rpb25zW2dldFJhbmRvbUludGVnZXIoMCwgZGlyZWN0aW9ucy5sZW5ndGggLSAxKV1cbiAgICAgIGNvbnN0IHJhbmRvbUNvb3JkcyA9IF9hdHRhY2tEaXJlY3Rpb25zW3JhbmRvbURpcmVjdGlvbl0oeSwgeClcbiAgICAgIHJ5ID0gcmFuZG9tQ29vcmRzLnlcbiAgICAgIHJ4ID0gcmFuZG9tQ29vcmRzLnhcbiAgICB9XG4gICAgaWYgKCFib2FyZC5pc1ZhbGlkVGFyZ2V0KHJ5LCByeCkpIHtcbiAgICAgIHJldHVybiB7IHZhbGlkaXR5OiBmYWxzZSB9XG4gICAgfVxuICAgIHJldHVybiB7IHZhbGlkaXR5OiB0cnVlLCBkaXJlY3Rpb246IHJhbmRvbURpcmVjdGlvbiwgeTogcnksIHg6IHJ4IH1cbiAgfVxuXG4gIGNvbnN0IF9nYWluT3Bwb3NpdGVFbmQgPSAoKSA9PiB7XG4gICAgbGV0IGxlZnRtb3N0XG4gICAgbGV0IHJpZ2h0bW9zdFxuICAgIGxldCB0b3Btb3N0XG4gICAgbGV0IGJvdHRvbW1vc3RcbiAgICBzd2l0Y2ggKF9pc1NoaXBIb3Jpem9udGFsKGhpdENlbGxzKSkge1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBsZWZ0bW9zdCA9IF9nZXRMZWZ0bW9zdChoaXRDZWxscylcbiAgICAgICAgcmlnaHRtb3N0ID0gX2dldFJpZ2h0bW9zdChoaXRDZWxscylcbiAgICAgICAgcmV0dXJuIGxhc3RIaXQueCA9PT0gbGVmdG1vc3QueFxuICAgICAgICAgID8gcmlnaHRtb3N0XG4gICAgICAgICAgOiBsZWZ0bW9zdFxuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgdG9wbW9zdCA9IF9nZXRUb3Btb3N0KGhpdENlbGxzKVxuICAgICAgICBib3R0b21tb3N0ID0gX2dldEJvdHRvbW1vc3QoaGl0Q2VsbHMpXG4gICAgICAgIHJldHVybiBsYXN0SGl0LnkgPT09IHRvcG1vc3QueVxuICAgICAgICAgID8gYm90dG9tbW9zdFxuICAgICAgICAgIDogdG9wbW9zdFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgX2F0dGFja1NwZWNpZmljU3BvdCA9IChib2FyZCwgeSwgeCkgPT4ge1xuICAgIGNvbXB1dGVyLmF0dGFjayhib2FyZCwgeSwgeClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMoeSwgeClcbiAgICByZXR1cm4gc3RhdHVzXG4gIH1cblxuICBjb25zdCBfYXR0YWNrSW5EaXJlY3Rpb24gPSAoYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBfYXR0YWNrRGlyZWN0aW9uc1tkaXJlY3Rpb25dKGxhc3RIaXQueSwgbGFzdEhpdC54KVxuICAgIGlmICghYm9hcmQuaXNWYWxpZFRhcmdldChjb29yZHMueSwgY29vcmRzLngpKSB7XG4gICAgICBkaXJlY3Rpb24gPSBfZ2V0T3Bwb3NpdGVEaXJlY3Rpb24oZGlyZWN0aW9uKVxuICAgICAgbGFzdEhpdCA9IF9nYWluT3Bwb3NpdGVFbmQoKVxuICAgICAgaWYgKCFib2FyZC5pc1ZhbGlkVGFyZ2V0KF9hdHRhY2tEaXJlY3Rpb25zW2RpcmVjdGlvbl0obGFzdEhpdC55LCBsYXN0SGl0LngpKSkge1xuICAgICAgICBkaXJlY3Rpb24gPSAnJ1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF0dGFja1BsYXllcihib2FyZClcbiAgICB9XG4gICAgY29tcHV0ZXIuYXR0YWNrKGJvYXJkLCBjb29yZHMueSwgY29vcmRzLngpXG4gICAgY29uc3Qgc3RhdHVzID0gYm9hcmQuZ2V0QXR0YWNrU3RhdHVzKGNvb3Jkcy55LCBjb29yZHMueClcbiAgICBpZiAoc3RhdHVzLnZhbHVlICE9PSAnaGl0Jykge1xuICAgICAgZGlyZWN0aW9uID0gX2dldE9wcG9zaXRlRGlyZWN0aW9uKGRpcmVjdGlvbilcbiAgICAgIGxhc3RIaXQgPSBfZ2Fpbk9wcG9zaXRlRW5kKClcbiAgICB9XG4gICAgcmV0dXJuIHN0YXR1c1xuICB9XG5cbiAgY29uc3QgX2F0dGFja0FmdGVySGl0ID0gKGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gX2ZpbmRTcG90QWZ0ZXJIaXQoYm9hcmQsIGxhc3RIaXQueSwgbGFzdEhpdC54KVxuICAgIGlmICghY29vcmRzLnZhbGlkaXR5KSB7XG4gICAgICBsYXN0SGl0ID0ge31cbiAgICAgIGhpdENlbGxzID0gW11cbiAgICAgIHJldHVybiBhdHRhY2tQbGF5ZXIoYm9hcmQpXG4gICAgfVxuICAgIGRpcmVjdGlvbiA9IGNvb3Jkcy5kaXJlY3Rpb25cbiAgICBjb21wdXRlci5hdHRhY2soYm9hcmQsIGNvb3Jkcy55LCBjb29yZHMueClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMoY29vcmRzLnksIGNvb3Jkcy54KVxuICAgIGlmIChzdGF0dXMudmFsdWUgIT09ICdoaXQnKSB7XG4gICAgICByZXR1cm4gc3RhdHVzXG4gICAgfVxuICAgIGxhc3RIaXQgPSB7IHk6IGNvb3Jkcy55LCB4OiBjb29yZHMueCB9XG4gICAgaGl0Q2VsbHMucHVzaChsYXN0SGl0KVxuICAgIHJldHVybiBzdGF0dXNcbiAgfVxuXG4gIGNvbnN0IF9hdHRhY2tSYW5kb21DZWxsID0gKGJvYXJkKSA9PiB7XG4gICAgY29uc3QgcmFuZG9tQ29vcmRzID0gX2ZpbmRSYW5kb21TcG90VG9BdHRhY2soYm9hcmQpXG4gICAgY29tcHV0ZXIuYXR0YWNrKGJvYXJkLCByYW5kb21Db29yZHMueSwgcmFuZG9tQ29vcmRzLngpXG4gICAgY29uc3Qgc3RhdHVzID0gYm9hcmQuZ2V0QXR0YWNrU3RhdHVzKHJhbmRvbUNvb3Jkcy55LCByYW5kb21Db29yZHMueClcbiAgICByZXR1cm4gc3RhdHVzXG4gIH1cblxuICBjb25zdCBhdHRhY2tQbGF5ZXIgPSAoYm9hcmQsIHksIHgpID0+IHtcbiAgICBsZXQgc3RhdHVzXG4gICAgaWYgKHkgJiYgeCkge1xuICAgICAgc3RhdHVzID0gX2F0dGFja1NwZWNpZmljU3BvdChib2FyZCwgeSwgeClcbiAgICB9IGVsc2UgaWYgKGxhc3RIaXQueSAmJiBsYXN0SGl0LnggJiYgZGlyZWN0aW9uICE9PSAnJykge1xuICAgICAgc3RhdHVzID0gX2F0dGFja0luRGlyZWN0aW9uKGJvYXJkKVxuICAgIH0gZWxzZSBpZiAobGFzdEhpdC55ICYmIGxhc3RIaXQueCkge1xuICAgICAgc3RhdHVzID0gX2F0dGFja0FmdGVySGl0KGJvYXJkKVxuICAgIH0gZWxzZSBpZiAoIShsYXN0SGl0LnkgJiYgbGFzdEhpdC54KSkge1xuICAgICAgc3RhdHVzID0gX2F0dGFja1JhbmRvbUNlbGwoYm9hcmQpXG4gICAgfVxuICAgIGlmIChzdGF0dXMuc2hpcFN0YXR1cyA9PT0gJ2RhbWFnZWQnKSB7XG4gICAgICBsYXN0SGl0ID0geyB5OiBzdGF0dXMueSwgeDogc3RhdHVzLnggfVxuICAgICAgaGl0Q2VsbHMucHVzaChsYXN0SGl0KVxuICAgIH1cbiAgICBpZiAoc3RhdHVzLnNoaXBTdGF0dXMgPT09ICdkZXN0cm95ZWQnKSB7XG4gICAgICBkaXJlY3Rpb24gPSAnJ1xuICAgICAgbGFzdEhpdCA9IHt9XG4gICAgICBoaXRDZWxscyA9IFtdXG4gICAgfVxuICAgIHJldHVybiBzdGF0dXNcbiAgfVxuXG4gIGNvbnN0IHNldERpcmVjdGlvbiA9ICh2YWwpID0+IHsgZGlyZWN0aW9uID0gdmFsIH1cblxuICByZXR1cm4ge1xuICAgIGF0dGFja1BsYXllcixcbiAgICBzZXREaXJlY3Rpb24sXG4gICAgZ2V0IGRpcmVjdGlvbiAoKSB7IHJldHVybiBkaXJlY3Rpb24gfSxcbiAgICBnZXQgbmFtZSAoKSB7IHJldHVybiBjb21wdXRlci5uYW1lIH0sXG4gICAgZ2V0IHR5cGUgKCkgeyByZXR1cm4gY29tcHV0ZXIudHlwZSB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHJlcGVhdCwgZmluZEluZGV4LCBwaXBlLCBtYXAsIGZsYXR0ZW4sIGRlY3JlbWVudCwgY3VycnksIGVxLCBhbnksIGZpbHRlciwgb2JqZWN0SW5BcnJheSwgZ3QsIGx0LCByZW1vdmVEdXBsaWNhdGVPYmogfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xuaW1wb3J0IHsgc3RhdGVzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NlbGxfc3RhdGVzJ1xuXG5jb25zdCBfY3JlYXRlUm93ID0gKCkgPT4gcmVwZWF0KCgpID0+IHN0YXRlcy5XQVRFUiwgMTApXG5jb25zdCBfY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4gcmVwZWF0KF9jcmVhdGVSb3csIDEwKVxuXG5jb25zdCBfbWFwQ29vcmRzID0gY3VycnkoKGJvYXJkLCB2YWx1ZSwgY29vcmRzKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFsuLi5ib2FyZF1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB7IHksIHggfSA9IGRlY3JlbWVudChjb29yZHNbaV0pXG4gICAgcmVzdWx0W3ldW3hdID0gdmFsdWVcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCBfY29vcmRzVG9JbmRleGVzID0gKHksIHgpID0+IHtcbiAgcmV0dXJuIGRlY3JlbWVudChbeSwgeF0pXG59XG5cbmV4cG9ydCBjb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGZsZWV0ID0gW11cbiAgY29uc3QgbWlzc2VkID0gW11cbiAgbGV0IHBsYW5lID0gJ2hvcml6b250YWxseSdcbiAgbGV0IHN0YXRlID0gX2NyZWF0ZUdhbWVib2FyZCgpXG5cbiAgY29uc3QgX21hcEJvYXJkID0gX21hcENvb3JkcyhzdGF0ZSlcbiAgY29uc3QgX21hcFNoaXAgPSBfbWFwQm9hcmQoc3RhdGVzLlNISVApXG4gIGNvbnN0IF9tYXBNaXNzZWQgPSBfbWFwQm9hcmQoc3RhdGVzLk1JU1NFRClcbiAgY29uc3QgX21hcEhpdCA9IF9tYXBCb2FyZChzdGF0ZXMuSElUKVxuICBjb25zdCBfbWFwU3VuayA9IF9tYXBCb2FyZChzdGF0ZXMuU1VOSylcbiAgY29uc3QgX21hcEFyb3VuZCA9IF9tYXBCb2FyZChzdGF0ZXMuQVJPVU5EX1NVTkspXG5cbiAgY29uc3QgX2ZpbmRTaGlwID0gKHksIHgpID0+XG4gICAgZmxlZXQuZmluZCgoc2hpcCkgPT4gc2hpcC5zZWdtZW50cy5maW5kKChzZWdtZW50KSA9PiBzZWdtZW50LnkgPT09IHkgJiYgc2VnbWVudC54ID09PSB4KSlcblxuICBjb25zdCBfZ2V0U2VnbWVudHMgPSAoc2hpcCkgPT4gc2hpcC5zZWdtZW50c1xuXG4gIGNvbnN0IF9pc1NoaXBTdW5rID0gKHNoaXApID0+IHNoaXAuaXNTdW5rKClcblxuICBjb25zdCBfZ2V0U2hpcENlbGxzID0gKCkgPT4gcGlwZShcbiAgICBtYXAoX2dldFNlZ21lbnRzKSxcbiAgICBmbGF0dGVuXG4gICkoZmxlZXQpXG5cbiAgY29uc3QgX2dldFN1bmtDZWxscyA9ICgpID0+IHBpcGUoXG4gICAgZmlsdGVyKF9pc1NoaXBTdW5rKSxcbiAgICBtYXAoX2dldFNlZ21lbnRzKSxcbiAgICBmbGF0dGVuLFxuICAgIG1hcCgoY2VsbCkgPT4gKHsgeTogY2VsbC55LCB4OiBjZWxsLnggfSkpXG4gICkoZmxlZXQpXG5cbiAgY29uc3QgX2FueVNoaXAgPSBhbnkoZXEoc3RhdGVzLlNISVApKVxuXG4gIGNvbnN0IGlzRmxlZXRTdW5rID0gKCkgPT4gZmxlZXQuZXZlcnkoX2lzU2hpcFN1bmspXG5cbiAgY29uc3QgX2lzT3ZlcmxhcHMgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGNvbnN0IG9jY3VwaWVkQ2VsbHMgPSBfZ2V0U2hpcENlbGxzKClcbiAgICBpZiAocGxhbmUgPT09ICdob3Jpem9udGFsbHknICYmIG9jY3VwaWVkQ2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdGFpbCA9IHggKyBzaXplXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9jY3VwaWVkQ2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IHg7IGogPCB0YWlsOyBqKyspIHtcbiAgICAgICAgICBpZiAob2NjdXBpZWRDZWxsc1tpXS55ID09PSB5ICYmIG9jY3VwaWVkQ2VsbHNbaV0ueCA9PT0gaikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBsYW5lID09PSAndmVydGljYWxseScgJiYgb2NjdXBpZWRDZWxscy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0YWlsID0geSArIHNpemVcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2NjdXBpZWRDZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0geTsgaiA8IHRhaWw7IGorKykge1xuICAgICAgICAgIGlmIChvY2N1cGllZENlbGxzW2ldLnkgPT09IGogJiYgb2NjdXBpZWRDZWxsc1tpXS54ID09PSB4KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IF9pc092ZXJmbG93cyA9ICh5LCB4LCBzaXplKSA9PiB7XG4gICAgaWYgKChwbGFuZSA9PT0gJ2hvcml6b250YWxseScgJiYgeCArIC0tc2l6ZSA+IDEwKSB8fFxuICAgICAgICAocGxhbmUgPT09ICd2ZXJ0aWNhbGx5JyAmJiB5ICsgLS1zaXplID4gMTApKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IF9nZXRDZWxsU3RhdGUgPSAoeSwgeCkgPT4ge1xuICAgIGNvbnN0IFtpeSwgaXhdID0gX2Nvb3Jkc1RvSW5kZXhlcyh5LCB4KVxuICAgIGNvbnN0IHJvdyA9IHN0YXRlW2l5XVxuICAgIHJldHVybiByb3dcbiAgICAgID8gc3RhdGVbaXldW2l4XVxuICAgICAgOiBudWxsXG4gIH1cblxuICBjb25zdCBfaXNBZGphY2VudFRvU2hpcHMgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGlmIChwbGFuZSA9PT0gJ2hvcml6b250YWxseScpIHtcbiAgICAgIGNvbnN0IHRhaWwgPSB4ICsgc2l6ZVxuXG4gICAgICBmb3IgKGxldCBpID0geDsgaSA8IHRhaWw7IGkrKykge1xuICAgICAgICBjb25zdCB0b3BDZWxsID0gX2dldENlbGxTdGF0ZSh5IC0gMSwgaSlcbiAgICAgICAgY29uc3QgYm90dG9tQ2VsbCA9IF9nZXRDZWxsU3RhdGUoeSArIDEsIGkpXG4gICAgICAgIGlmIChfYW55U2hpcChbdG9wQ2VsbCwgYm90dG9tQ2VsbF0pKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBsZWZ0Q2VsbCA9IF9nZXRDZWxsU3RhdGUoeSwgeCAtIDEpXG4gICAgICBjb25zdCByaWdodENlbGwgPSBfZ2V0Q2VsbFN0YXRlKHksIHRhaWwpXG4gICAgICBpZiAoX2FueVNoaXAoW2xlZnRDZWxsLCByaWdodENlbGxdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0b3BMZWZ0ID0gX2dldENlbGxTdGF0ZSh5IC0gMSwgeCAtIDEpXG4gICAgICBjb25zdCBib3R0b21MZWZ0ID0gX2dldENlbGxTdGF0ZSh5ICsgMSwgeCAtIDEpXG4gICAgICBjb25zdCB0b3BSaWdodCA9IF9nZXRDZWxsU3RhdGUoeSAtIDEsIHRhaWwpXG4gICAgICBjb25zdCBib3R0b21SaWdodCA9IF9nZXRDZWxsU3RhdGUoeSArIDEsIHRhaWwpXG4gICAgICBpZiAoX2FueVNoaXAoW3RvcExlZnQsIGJvdHRvbUxlZnQsIHRvcFJpZ2h0LCBib3R0b21SaWdodF0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBsYW5lID09PSAndmVydGljYWxseScpIHtcbiAgICAgIGNvbnN0IHRhaWwgPSB5ICsgc2l6ZVxuXG4gICAgICBjb25zdCB0b3BDZWxsID0gX2dldENlbGxTdGF0ZSh5IC0gMSwgeClcbiAgICAgIGNvbnN0IGJvdHRvbUNlbGwgPSBfZ2V0Q2VsbFN0YXRlKHRhaWwsIHgpXG4gICAgICBpZiAoX2FueVNoaXAoW3RvcENlbGwsIGJvdHRvbUNlbGxdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0geTsgaSA8IHRhaWw7IGkrKykge1xuICAgICAgICBjb25zdCBsZWZ0Q2VsbCA9IF9nZXRDZWxsU3RhdGUoaSwgeCAtIDEpXG4gICAgICAgIGNvbnN0IHJpZ2h0Q2VsbCA9IF9nZXRDZWxsU3RhdGUoaSwgeCArIDEpXG4gICAgICAgIGlmIChfYW55U2hpcChbbGVmdENlbGwsIHJpZ2h0Q2VsbF0pKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0b3BMZWZ0ID0gX2dldENlbGxTdGF0ZSh5IC0gMSwgeCAtIDEpXG4gICAgICBjb25zdCB0b3BSaWdodCA9IF9nZXRDZWxsU3RhdGUoeSAtIDEsIHggKyAxKVxuICAgICAgY29uc3QgYm90dG9tTGVmdCA9IF9nZXRDZWxsU3RhdGUodGFpbCwgeCAtIDEpXG4gICAgICBjb25zdCBib3R0b21SaWdodCA9IF9nZXRDZWxsU3RhdGUodGFpbCwgeCArIDEpXG4gICAgICBpZiAoX2FueVNoaXAoW3RvcExlZnQsIGJvdHRvbUxlZnQsIHRvcFJpZ2h0LCBib3R0b21SaWdodF0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgX2dldFN1cnJvdW5kaW5nQ2VsbHMgPSAoeyB5LCB4IH0pID0+IHtcbiAgICByZXR1cm4gW1xuICAgICAgeyB5OiB5IC0gMSwgeCB9LFxuICAgICAgeyB5OiB5ICsgMSwgeCB9LFxuICAgICAgeyB5LCB4OiB4IC0gMSB9LFxuICAgICAgeyB5LCB4OiB4ICsgMSB9LFxuICAgICAgeyB5OiB5IC0gMSwgeDogeCAtIDEgfSxcbiAgICAgIHsgeTogeSArIDEsIHg6IHggKyAxIH0sXG4gICAgICB7IHk6IHkgLSAxLCB4OiB4ICsgMSB9LFxuICAgICAgeyB5OiB5ICsgMSwgeDogeCAtIDEgfVxuICAgIF1cbiAgfVxuXG4gIGNvbnN0IF9pc0NlbGxWYWxpZCA9ICh7IHksIHggfSkgPT5cbiAgICAhYW55KChheGlzKSA9PiAoZ3QoYXhpcywgMTApIHx8IGx0KGF4aXMsIDEpKSwgW3gsIHldKVxuXG4gIGNvbnN0IGdldEFyZWFBcm91bmRTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IHN1bmtDZWxscyA9IF9nZXRTdW5rQ2VsbHMoKVxuICAgIHJldHVybiBwaXBlKFxuICAgICAgbWFwKF9nZXRTdXJyb3VuZGluZ0NlbGxzKSxcbiAgICAgIGZsYXR0ZW4sXG4gICAgICBmaWx0ZXIoKGNlbGwpID0+ICFvYmplY3RJbkFycmF5KGNlbGwsIHN1bmtDZWxscykpLFxuICAgICAgZmlsdGVyKF9pc0NlbGxWYWxpZCksXG4gICAgICByZW1vdmVEdXBsaWNhdGVPYmpcbiAgICApKHN1bmtDZWxscylcbiAgfVxuXG4gIGNvbnN0IGlzVmFsaWRGb3JQbGFjZSA9ICh5LCB4LCBzaXplKSA9PiAoXG4gICAgIV9pc092ZXJsYXBzKHksIHgsIHNpemUpICYmXG4gICAgIV9pc092ZXJmbG93cyh5LCB4LCBzaXplKSAmJlxuICAgICFfaXNBZGphY2VudFRvU2hpcHMoeSwgeCwgc2l6ZSlcbiAgKVxuXG4gIGNvbnN0IHBsYWNlID0gKHksIHgsIHNpemUpID0+IHtcbiAgICBpZiAoIWlzVmFsaWRGb3JQbGFjZSh5LCB4LCBzaXplKSkgcmV0dXJuXG5cbiAgICBjb25zdCBzaGlwID0gU2hpcCh5LCB4LCBzaXplLCBwbGFuZSlcbiAgICBmbGVldC5wdXNoKHNoaXApXG4gICAgc3RhdGUgPSBfbWFwU2hpcChzaGlwLnNlZ21lbnRzKVxuICAgIHJldHVybiBzaGlwXG4gIH1cblxuICBjb25zdCBpc1ZhbGlkVGFyZ2V0ID0gKHksIHgpID0+IHtcbiAgICBjb25zdCBbaXksIGl4XSA9IF9jb29yZHNUb0luZGV4ZXMoeSwgeClcbiAgICBjb25zdCByb3cgPSBzdGF0ZVtpeV1cbiAgICBpZiAocm93KSB7XG4gICAgICBzd2l0Y2ggKHN0YXRlW2l5XVtpeF0pIHtcbiAgICAgICAgY2FzZSBzdGF0ZXMuU0hJUDpcbiAgICAgICAgY2FzZSBzdGF0ZXMuV0FURVI6XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgY2FzZSBzdGF0ZXMuTUlTU0VEOlxuICAgICAgICBjYXNlIHN0YXRlcy5ISVQ6XG4gICAgICAgIGNhc2Ugc3RhdGVzLlNVTks6XG4gICAgICAgIGNhc2Ugc3RhdGVzLkFST1VORF9TVU5LOlxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeSwgeCkgPT4ge1xuICAgIGNvbnN0IGhpdFNoaXAgPSBfZmluZFNoaXAoeSwgeClcbiAgICBpZiAoIWhpdFNoaXApIHtcbiAgICAgIG1pc3NlZC5wdXNoKHsgeSwgeCB9KVxuICAgICAgc3RhdGUgPSBfbWFwTWlzc2VkKFt7IHksIHggfV0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgaGl0U2VnbWVudEluZGV4ID0gZmluZEluZGV4KHNlZ21lbnQgPT4gc2VnbWVudC55ID09PSB5ICYmIHNlZ21lbnQueCA9PT0geCwgaGl0U2hpcC5zZWdtZW50cylcbiAgICBoaXRTaGlwLmhpdChoaXRTZWdtZW50SW5kZXgpXG4gICAgaWYgKGhpdFNoaXAuaXNTdW5rKCkpIHtcbiAgICAgIHN0YXRlID0gX21hcFN1bmsoaGl0U2hpcC5zZWdtZW50cylcbiAgICAgIHN0YXRlID0gX21hcEFyb3VuZChnZXRBcmVhQXJvdW5kU3VuaygpKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZSA9IF9tYXBIaXQoW3sgeSwgeCB9XSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRBdHRhY2tTdGF0dXMgPSAoeSwgeCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IHsgeSwgeCB9XG4gICAgY29uc3QgYXR0YWNrZWRDZWxsID0gX2dldENlbGxTdGF0ZSh5LCB4KVxuICAgIGxldCBzaGlwXG4gICAgbGV0IHN0YXR1c1xuICAgIHN3aXRjaCAoYXR0YWNrZWRDZWxsKSB7XG4gICAgICBjYXNlIHN0YXRlcy5NSVNTRUQ6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgdmFsdWU6ICdtaXNzZWQnIH0sIGNvb3JkcylcbiAgICAgIGNhc2Ugc3RhdGVzLkhJVDpcbiAgICAgIGNhc2Ugc3RhdGVzLlNVTks6XG4gICAgICAgIHNoaXAgPSBfZmluZFNoaXAoeSwgeClcbiAgICAgICAgc3RhdHVzID0geyB2YWx1ZTogJ2hpdCcsIHNoaXA6IHNoaXAudHlwZSB9XG4gICAgICAgIHJldHVybiBzaGlwLmlzU3VuaygpXG4gICAgICAgICAgPyBPYmplY3QuYXNzaWduKHN0YXR1cywgY29vcmRzLCB7IHNoaXBTdGF0dXM6ICdkZXN0cm95ZWQnIH0pXG4gICAgICAgICAgOiBPYmplY3QuYXNzaWduKHN0YXR1cywgY29vcmRzLCB7IHNoaXBTdGF0dXM6ICdkYW1hZ2VkJyB9KVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyB2YWx1ZTogYXR0YWNrZWRDZWxsIH0sIGNvb3JkcylcbiAgICB9XG4gIH1cblxuICBjb25zdCBzZXRQbGFuZSA9IChuZXdQbGFuZSkgPT4geyBwbGFuZSA9IG5ld1BsYW5lIH1cblxuICByZXR1cm4ge1xuICAgIGdldCBzdGF0ZSAoKSB7IHJldHVybiBzdGF0ZSB9LFxuICAgIGdldCBmbGVldCAoKSB7IHJldHVybiBmbGVldCB9LFxuICAgIGdldCBtaXNzZWQgKCkgeyByZXR1cm4gbWlzc2VkIH0sXG4gICAgaXNWYWxpZEZvclBsYWNlLFxuICAgIHBsYWNlLFxuICAgIGlzVmFsaWRUYXJnZXQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRBdHRhY2tTdGF0dXMsXG4gICAgZ2V0QXJlYUFyb3VuZFN1bmssXG4gICAgaXNGbGVldFN1bmssXG4gICAgc2V0UGxhbmVcbiAgfVxufVxuXG5leHBvcnQgeyBfY3JlYXRlR2FtZWJvYXJkIH1cbiIsImV4cG9ydCBjb25zdCBQbGF5ZXIgPSAobmFtZSwgaXNGaXJzdCkgPT4ge1xuICBjb25zdCB0eXBlID0gaXNGaXJzdCA/ICdwbGF5ZXInIDogJ2NvbXB1dGVyJ1xuICBsZXQgdHVybiA9IGlzRmlyc3RcblxuICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4geyB0dXJuID0gIXR1cm4gfVxuXG4gIGNvbnN0IGF0dGFjayA9IChib2FyZCwgeSwgeCkgPT4ge1xuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soeSwgeClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMoeSwgeClcbiAgICBpZiAoc3RhdHVzLnZhbHVlICE9PSAnaGl0Jykge1xuICAgICAgY2hhbmdlVHVybigpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXQgbmFtZSAoKSB7IHJldHVybiBuYW1lIH0sXG4gICAgZ2V0IHR5cGUgKCkgeyByZXR1cm4gdHlwZSB9LFxuICAgIGdldCB0dXJuICgpIHsgcmV0dXJuIHR1cm4gfSxcbiAgICBhdHRhY2ssXG4gICAgY2hhbmdlVHVyblxuICB9XG59XG4iLCJjb25zdCBfdHlwZXMgPSB7XG4gIDE6ICdQYXRyb2wgYm9hdCcsXG4gIDI6ICdEZXN0cm95ZXInLFxuICAzOiAnQ3J1aXNlcicsXG4gIDQ6ICdCYXR0bGVzaGlwJyxcbiAgNTogJ0NhcnJpZXInXG59XG5cbmNvbnN0IF9zZWdtZW50c0NyZWF0b3IgPSB7XG4gIGhvcml6b250YWxseSAoeSwgeCwgc2l6ZSkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgc2VnbWVudHNbaV0gPSB7IHksIHg6ICh4ICsgaSksIGludGFjdDogdHJ1ZSB9XG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50c1xuICB9LFxuICB2ZXJ0aWNhbGx5ICh5LCB4LCBzaXplKSB7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBzZWdtZW50c1tpXSA9IHsgeTogKHkgKyBpKSwgeCwgaW50YWN0OiB0cnVlIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlZ21lbnRzXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFNoaXAgPSAoeSwgeCwgc2l6ZSwgcGxhbmUpID0+IHtcbiAgY29uc3QgdHlwZSA9IF90eXBlc1tzaXplXVxuICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoJ0ltcHJvcGVyIHNoaXAgc2l6ZScpXG5cbiAgY29uc3Qgc2VnbWVudHMgPSBfc2VnbWVudHNDcmVhdG9yW3BsYW5lXSh5LCB4LCBzaXplKVxuXG4gIGNvbnN0IGhpdCA9IChzZWdtZW50KSA9PiB7IHNlZ21lbnRzW3NlZ21lbnRdLmludGFjdCA9IGZhbHNlIH1cblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBzZWdtZW50cy5ldmVyeSgoc2VnbWVudCkgPT4gc2VnbWVudC5pbnRhY3QgPT09IGZhbHNlKVxuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgICBnZXQgc2l6ZSAoKSB7IHJldHVybiBzaXplIH0sXG4gICAgZ2V0IHR5cGUgKCkgeyByZXR1cm4gdHlwZSB9LFxuICAgIGdldCBzZWdtZW50cyAoKSB7IHJldHVybiBzZWdtZW50cyB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGV2ZW50cyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudF90eXBlcydcbmltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tICcuLi91dGlscy9ldmVudHNfaGFuZGxlcidcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4uL2ZhY3Rvcmllcy9wbGF5ZXInXG5pbXBvcnQgeyBBaVBsYXllciB9IGZyb20gJy4uL2ZhY3Rvcmllcy9haV9wbGF5ZXInXG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuLi9mYWN0b3JpZXMvZ2FtZWJvYXJkJ1xuaW1wb3J0IHsgQWlHYW1lYm9hcmQgfSBmcm9tICcuLi9mYWN0b3JpZXMvYWlfZ2FtZWJvYXJkJ1xuaW1wb3J0IHsgYm9hcmRIYW5kbGVyIH0gZnJvbSAnLi4vdWkvZG9tX2JvYXJkJ1xuaW1wb3J0IHsgZGVsYXkgfSBmcm9tICcuLi91dGlscy9oZWxwZXJfZnVuY3MnXG5pbXBvcnQgeyB3cmFwSW5EaXYsIHF1ZXJ5RG9jdW1lbnQsIGFkZENsYXNzLCByZW1vdmVDbGFzcywgcmVwbGFjZUNsYXNzLCB0b2dnbGVDbGFzcywgY3JlYXRlRWwsIHJlcGxhY2VFbCwgY2xvbmVFbCB9IGZyb20gJy4uL3VpL2RvbV9mdW5jcydcblxuOyhmdW5jdGlvbiB1aUxvZ2ljICgpIHtcbiAgY29uc3Qgc3RhcnRCdG4gPSBxdWVyeURvY3VtZW50KCcjc3RhcnQtZ2FtZScpXG4gIGNvbnN0IHJlc3RhcnRCdG4gPSBxdWVyeURvY3VtZW50KCcjcmVzdGFydC1nYW1lJylcbiAgY29uc3QgbmFtZUlucCA9IHF1ZXJ5RG9jdW1lbnQoJyNwbGF5ZXItbmFtZScpXG4gIGNvbnN0IHJvdGF0ZUJ0biA9IHF1ZXJ5RG9jdW1lbnQoJyNyb3RhdGUnKVxuICBjb25zdCBsb2dEaXYgPSBxdWVyeURvY3VtZW50KCcjbG9nJylcbiAgbGV0IGhpbnRzRGl2ID0gcXVlcnlEb2N1bWVudCgnI2hpbnRzJylcblxuICBsZXQgbmFtZUlucHV0ZWQgPSBCb29sZWFuKG5hbWVJbnAudmFsdWUpXG4gIGxldCBzaGlwc1BsYWNlZCA9IGZhbHNlXG4gIGxldCBtc2dDb3VudCA9IDBcblxuICBzdGFydEJ0bi5kaXNhYmxlZCA9IHRydWVcblxuICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICA7W3N0YXJ0QnRuLCByb3RhdGVCdG5dLmZvckVhY2goKGVsKSA9PiBhZGRDbGFzcygnZGlzcGxheS1ub25lJywgZWwpKVxuICAgIG5hbWVJbnAuZGlzYWJsZWQgPSB0cnVlXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5HQU1FX1NUQVJURUQsIG5hbWVJbnAudmFsdWUpXG4gICAgaGludHNEaXYuaW5uZXJUZXh0ID0gJ0dvb2QgbHVjaywgQWRtaXJhbCEnXG4gIH0pXG5cbiAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChyb3RhdGVCdG4uZGF0YXNldC5wbGFuZSA9PT0gJ3ZlcnRpY2FsbHknKSB7XG4gICAgICByb3RhdGVCdG4uZGF0YXNldC5wbGFuZSA9ICdob3Jpem9udGFsbHknXG4gICAgICByb3RhdGVCdG4uaW5uZXJUZXh0ID0gJ0hvcml6b250YWwnXG4gICAgfSBlbHNlIGlmIChyb3RhdGVCdG4uZGF0YXNldC5wbGFuZSA9PT0gJ2hvcml6b250YWxseScpIHtcbiAgICAgIHJvdGF0ZUJ0bi5kYXRhc2V0LnBsYW5lID0gJ3ZlcnRpY2FsbHknXG4gICAgICByb3RhdGVCdG4uaW5uZXJUZXh0ID0gJ1ZlcnRpY2FsJ1xuICAgIH1cbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLlNISVBfUk9UQVRFRCwgcm90YXRlQnRuLmRhdGFzZXQucGxhbmUpXG4gIH0pXG5cbiAgbmFtZUlucC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgKGUuY3VycmVudFRhcmdldC52YWx1ZS5sZW5ndGggPiAwKVxuICAgICAgPyBuYW1lSW5wdXRlZCA9IHRydWVcbiAgICAgIDogbmFtZUlucHV0ZWQgPSBmYWxzZVxuICAgIDsobmFtZUlucHV0ZWQgJiYgc2hpcHNQbGFjZWQpXG4gICAgICA/IHN0YXJ0QnRuLmRpc2FibGVkID0gZmFsc2VcbiAgICAgIDogc3RhcnRCdG4uZGlzYWJsZWQgPSB0cnVlXG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuU0hJUF9QTEFDRUQsICh7IGFyZVNoaXBzUGxhY2VkLCBzaGlwVHlwZSB9KSA9PiB7XG4gICAgOyhhcmVTaGlwc1BsYWNlZClcbiAgICAgID8gc2hpcHNQbGFjZWQgPSB0cnVlXG4gICAgICA6IHNoaXBzUGxhY2VkID0gZmFsc2VcbiAgICA7KG5hbWVJbnB1dGVkICYmIHNoaXBzUGxhY2VkKVxuICAgICAgPyBzdGFydEJ0bi5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICA6IHN0YXJ0QnRuLmRpc2FibGVkID0gdHJ1ZVxuICAgIGhpbnRzRGl2LmlubmVyVGV4dCA9IGAke3NoaXBUeXBlfSBoYXMgYmVlbiBwbGFjZWQuYFxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub25FYWNoKFtcbiAgICBldmVudHMuQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQsXG4gICAgZXZlbnRzLkNPTVBVVEVSX0ZJTklTSEVEX1RVUk5cbiAgXSwgKHsgc3RhdHVzLCBwbGF5ZXIgfSkgPT4ge1xuICAgIGNvbnN0IGxvZ0NsYXNzID0gYGxvZy0ke3BsYXllci50eXBlfS0ke3N0YXR1cy5zaGlwU3RhdHVzIHx8IHN0YXR1cy52YWx1ZX1gXG4gICAgbGV0IG1zZyA9IGBUdXJuICR7Kyttc2dDb3VudH0uIHkke3N0YXR1cy55fSB5JHtzdGF0dXMueH1gXG4gICAgaWYgKHN0YXR1cy52YWx1ZSA9PT0gJ21pc3NlZCcpIHtcbiAgICAgIG1zZyArPSBgICR7cGxheWVyLm5hbWV9IG1pc3NlZC4uLmBcbiAgICB9XG4gICAgaWYgKHN0YXR1cy52YWx1ZSA9PT0gJ2hpdCcpIHtcbiAgICAgIG1zZyArPSBgICR7cGxheWVyLm5hbWV9ICR7c3RhdHVzLnNoaXBTdGF0dXN9ICR7c3RhdHVzLnNoaXB9IWBcbiAgICB9XG4gICAgY29uc3QgbG9nID0gd3JhcEluRGl2KG1zZywgW2xvZ0NsYXNzXSlcbiAgICBjb25zdCBoaW50ID0gY2xvbmVFbChsb2cpXG4gICAgaGludC5pZCA9ICdoaW50cydcbiAgICBsb2dEaXYucHJlcGVuZChsb2cpXG4gICAgaGludHNEaXYgPSByZXBsYWNlRWwoaGludHNEaXYsIGhpbnQpXG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuR0FNRV9FTkRFRCwgKG5hbWUpID0+IHtcbiAgICBoaW50c0Rpdi5pbm5lclRleHQgPSBgJHtuYW1lfSB3b24hYFxuICAgIHJlbW92ZUNsYXNzKCdoaWRkZW4nLCByZXN0YXJ0QnRuKVxuICB9KVxufSkoKVxuXG47KGZ1bmN0aW9uIGJvYXJkVmlld0xvZ2ljICgpIHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBxdWVyeURvY3VtZW50KCcjcGxheWVyLWJvYXJkJylcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IHF1ZXJ5RG9jdW1lbnQoJyNjb21wdXRlci1ib2FyZCcpXG5cbiAgYm9hcmRIYW5kbGVyLmNyZWF0ZUJvYXJkKGZhbHNlLCBwbGF5ZXJCb2FyZClcbiAgYm9hcmRIYW5kbGVyLmNyZWF0ZUJvYXJkKHRydWUsIGNvbXB1dGVyQm9hcmQpXG5cbiAgY29uc3QgcmVuZGVyUGxheWVyID0gYm9hcmRIYW5kbGVyLnJlbmRlckJvYXJkKHBsYXllckJvYXJkKVxuICBjb25zdCByZW5kZXJDb21wdXRlciA9IGJvYXJkSGFuZGxlci5yZW5kZXJCb2FyZChjb21wdXRlckJvYXJkKVxuXG4gIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICBjb25zdCBjb29yZHMgPSBib2FyZEhhbmRsZXIuZXh0cmFjdENvb3JkcyhlLnRhcmdldClcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuQk9BUkRfSE9WRVJFRCwgY29vcmRzKVxuICAgIH1cbiAgfSlcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5TSElQX1ZBTElEQVRFRCwgKGRhdGEpID0+IHtcbiAgICBib2FyZEhhbmRsZXIuaGlnaGxpZ2h0RnV0dXJlU2hpcCguLi5kYXRhKVxuICB9KVxuXG4gIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IGJvYXJkSGFuZGxlci5leHRyYWN0Q29vcmRzKGUudGFyZ2V0KVxuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5CT0FSRF9DTElDS0VELCBjb29yZHMpXG4gICAgfVxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLlNISVBfUExBQ0VELCAoeyBzaGlwIH0pID0+IHtcbiAgICBib2FyZEhhbmRsZXIucGxhY2UoLi4uc2hpcClcbiAgfSlcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5HQU1FX1NUQVJURUQsICgpID0+IHtcbiAgICBib2FyZEhhbmRsZXIuZGlzcGxheUJvYXJkKGNvbXB1dGVyQm9hcmQpXG4gIH0pXG5cbiAgcGxheWVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGJvYXJkSGFuZGxlci5jbGVhckhpZ2hsaWdodHMpXG5cbiAgZXZlbnRzSGFuZGxlci5vbkVhY2goW1xuICAgIGV2ZW50cy5DT01QVVRFUl9QTEFDRURfU0hJUFMsXG4gICAgZXZlbnRzLkNPTVBVVEVSX0JPQVJEX0FUVEFDS0VEXG4gIF0sICh7IHN0YXRlIH0pID0+IHtcbiAgICByZW5kZXJDb21wdXRlcihzdGF0ZSlcbiAgfSlcblxuICBjb21wdXRlckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IGJvYXJkSGFuZGxlci5leHRyYWN0Q29vcmRzKGUudGFyZ2V0KVxuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5DT01QVVRFUl9CT0FSRF9DTElDS0VELCBjb29yZHMpXG4gICAgfVxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLkNPTVBVVEVSX0ZJTklTSEVEX1RVUk4sICh7IHN0YXRlIH0pID0+IHtcbiAgICByZW5kZXJQbGF5ZXIoc3RhdGUpXG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuU0hJUF9ST1RBVEVELCBib2FyZEhhbmRsZXIuc2V0UGxhbmUpXG59KSgpXG5cbjsoZnVuY3Rpb24gZ2FtZUxvZ2ljICgpIHtcbiAgY29uc3Qgc2hpcHNUb1BsYWNlID0gWzUsIDQsIDMsIDIsIDFdXG4gIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKClcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEFpR2FtZWJvYXJkKClcbiAgbGV0IHBsYXllclxuICBsZXQgY29tcHV0ZXJcbiAgbGV0IGdhbWVTdGFydGVkID0gZmFsc2VcbiAgbGV0IGdhbWVFbmRlZCA9IGZhbHNlXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuQk9BUkRfSE9WRVJFRCwgKGNvb3JkcykgPT4ge1xuICAgIGlmIChzaGlwc1RvUGxhY2UubGVuZ3RoID09PSAwKSByZXR1cm5cbiAgICBjb25zdCBbeSwgeF0gPSBjb29yZHNcbiAgICBjb25zdCBuZXh0U2hpcFNpemUgPSBzaGlwc1RvUGxhY2VbMF1cbiAgICBjb25zdCBpc1ZhbGlkID0gcGxheWVyQm9hcmQuaXNWYWxpZEZvclBsYWNlKHksIHgsIG5leHRTaGlwU2l6ZSlcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLlNISVBfVkFMSURBVEVELCBbeSwgeCwgbmV4dFNoaXBTaXplLCBpc1ZhbGlkXSlcbiAgfSlcblxuICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5CT0FSRF9DTElDS0VELCAoY29vcmRzKSA9PiB7XG4gICAgaWYgKHNoaXBzVG9QbGFjZS5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGNvbnN0IFt5LCB4XSA9IGNvb3Jkc1xuICAgIGNvbnN0IG5leHRTaGlwU2l6ZSA9IHNoaXBzVG9QbGFjZVswXVxuICAgIGNvbnN0IGlzVmFsaWQgPSBwbGF5ZXJCb2FyZC5pc1ZhbGlkRm9yUGxhY2UoeSwgeCwgbmV4dFNoaXBTaXplKVxuICAgIGlmICghaXNWYWxpZCkgcmV0dXJuXG4gICAgY29uc3Qgc2hpcCA9IHBsYXllckJvYXJkLnBsYWNlKHksIHgsIG5leHRTaGlwU2l6ZSlcbiAgICBzaGlwc1RvUGxhY2Uuc2hpZnQoKVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcbiAgICAgIGV2ZW50cy5TSElQX1BMQUNFRCxcbiAgICAgIHtcbiAgICAgICAgc2hpcDogW3ksIHgsIG5leHRTaGlwU2l6ZV0sXG4gICAgICAgIHNoaXBUeXBlOiBzaGlwLnR5cGUsXG4gICAgICAgIGFyZVNoaXBzUGxhY2VkOiBzaGlwc1RvUGxhY2UubGVuZ3RoID09PSAwXG4gICAgICB9XG4gICAgKVxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLlNISVBfUk9UQVRFRCwgcGxheWVyQm9hcmQuc2V0UGxhbmUpXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuR0FNRV9TVEFSVEVELCAobmFtZSkgPT4ge1xuICAgIGdhbWVTdGFydGVkID0gdHJ1ZVxuICAgIHBsYXllciA9IFBsYXllcihuYW1lLCB0cnVlKVxuICAgIGNvbXB1dGVyID0gQWlQbGF5ZXIoKVxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VGbGVldCg1KVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcbiAgICAgIGV2ZW50cy5DT01QVVRFUl9QTEFDRURfU0hJUFMsXG4gICAgICB7IHN0YXRlOiBjb21wdXRlckJvYXJkLnN0YXRlIH1cbiAgICApXG4gIH0pXG5cbiAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuQ09NUFVURVJfQk9BUkRfQ0xJQ0tFRCwgKGNvb3JkcykgPT4ge1xuICAgIGlmICghZ2FtZVN0YXJ0ZWQgfHwgZ2FtZUVuZGVkIHx8ICFwbGF5ZXIudHVybiB8fCAhY29tcHV0ZXJCb2FyZC5pc1ZhbGlkVGFyZ2V0KC4uLmNvb3JkcykpIHJldHVyblxuICAgIHBsYXllci5hdHRhY2soY29tcHV0ZXJCb2FyZCwgLi4uY29vcmRzKVxuICAgIGNvbnN0IHN0YXR1cyA9IGNvbXB1dGVyQm9hcmQuZ2V0QXR0YWNrU3RhdHVzKC4uLmNvb3JkcylcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXG4gICAgICBldmVudHMuQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQsXG4gICAgICB7IHN0YXRlOiBjb21wdXRlckJvYXJkLnN0YXRlLCBzdGF0dXMsIHBsYXllciB9XG4gICAgKVxuICAgIGlmICghcGxheWVyLnR1cm4pIHtcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuUExBWUVSX0ZJTklTSEVEX1RVUk4sIG51bGwpXG4gICAgfVxuICAgIGlmIChjb21wdXRlckJvYXJkLmlzRmxlZXRTdW5rKCkpIHtcbiAgICAgIGdhbWVFbmRlZCA9IHRydWVcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuR0FNRV9FTkRFRCwgcGxheWVyLm5hbWUpXG4gICAgfVxuICB9KVxuXG4gIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLlBMQVlFUl9GSU5JU0hFRF9UVVJOLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKHBsYXllckJvYXJkLmlzRmxlZXRTdW5rKCkpIHtcbiAgICAgIGdhbWVFbmRlZCA9IHRydWVcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuR0FNRV9FTkRFRCwgY29tcHV0ZXIubmFtZSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBhd2FpdCBkZWxheSgyNTApXG4gICAgY29uc3Qgc3RhdHVzID0gY29tcHV0ZXIuYXR0YWNrUGxheWVyKHBsYXllckJvYXJkKVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcbiAgICAgIGV2ZW50cy5DT01QVVRFUl9GSU5JU0hFRF9UVVJOLFxuICAgICAgeyBzdGF0ZTogcGxheWVyQm9hcmQuc3RhdGUsIHN0YXR1cywgcGxheWVyOiBjb21wdXRlciB9XG4gICAgKVxuICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdoaXQnKSB7XG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLlBMQVlFUl9GSU5JU0hFRF9UVVJOLCBudWxsKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHBsYXllci5jaGFuZ2VUdXJuKClcbiAgfSlcbn0pKClcbiIsImltcG9ydCB7IGZvckVhY2gsIHBpcGUsIGZpbHRlciwgY3VycnkgfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5pbXBvcnQgeyByZW1vdmVDbGFzcyB9IGZyb20gJy4vZG9tX2Z1bmNzJ1xuXG5jb25zdCBfY2VsbFRhYmxlID0ge1xuICBzOiAnc2hpcCcsXG4gIHc6ICd3YXRlcicsXG4gIGg6ICdoaXQnLFxuICBtOiAnbWlzcycsXG4gIHg6ICdzdW5rJyxcbiAgYTogJ2Fyb3VuZC1zdW5rJ1xufVxuXG5jb25zdCBfY2VsbENsYXNzZXMgPSBPYmplY3QudmFsdWVzKF9jZWxsVGFibGUpXG5cbmNvbnN0IF9jcmVhdGVDZWxsID0gKGlzSGlkZGVuLCB5LCB4KSA9PiB7XG4gIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKVxuICBjZWxsLmRhdGFzZXQueSA9IHlcbiAgY2VsbC5kYXRhc2V0LnggPSB4XG4gIGNlbGwuY2xhc3NMaXN0LmFkZCgnd2F0ZXInKVxuICBpZiAoaXNIaWRkZW4pIGNlbGwuY2xhc3NMaXN0LmFkZCgnZm9nLW9mLXdhcicpXG4gIHJldHVybiBjZWxsXG59XG5cbmNvbnN0IF9jZWxsc0ZpbmRlciA9IHtcbiAgaG9yaXpvbnRhbGx5ICh5LCB4LCBzaXplKSB7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBbXVxuICAgIGNvbnN0IHRhaWwgPSB4ICsgc2l6ZVxuICAgIGZvciAobGV0IGkgPSB4OyBpIDwgdGFpbDsgaSsrKSB7XG4gICAgICBzZWdtZW50cy5wdXNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXk9JyR7eX0nXVtkYXRhLXg9JyR7aX0nXWApKVxuICAgIH1cbiAgICByZXR1cm4gc2VnbWVudHNcbiAgfSxcbiAgdmVydGljYWxseSAoeSwgeCwgc2l6ZSkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gW11cbiAgICBjb25zdCB0YWlsID0geSArIHNpemVcbiAgICBmb3IgKGxldCBpID0geTsgaSA8IHRhaWw7IGkrKykge1xuICAgICAgc2VnbWVudHMucHVzaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS15PScke2l9J11bZGF0YS14PScke3h9J11gKSlcbiAgICB9XG4gICAgcmV0dXJuIHNlZ21lbnRzXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJvYXJkSGFuZGxlciA9ICgoKSA9PiB7XG4gIGxldCBwbGFuZSA9ICdob3Jpem9udGFsbHknXG5cbiAgY29uc3QgZXh0cmFjdENvb3JkcyA9IChjZWxsKSA9PlxuICAgIFtjZWxsLmRhdGFzZXQueSwgY2VsbC5kYXRhc2V0LnhdLm1hcChjb29yZCA9PiBOdW1iZXIoY29vcmQpKVxuXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKGlzSGlkZGVuLCBkb21Cb2FyZCkgPT4ge1xuICAgIGZvciAobGV0IHkgPSAxOyB5IDwgMTE7IHkrKykge1xuICAgICAgZm9yIChsZXQgeCA9IDE7IHggPCAxMTsgeCsrKSB7XG4gICAgICAgIGRvbUJvYXJkLmFwcGVuZChfY3JlYXRlQ2VsbChpc0hpZGRlbiwgeSwgeCkpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVuZGVyQm9hcmQgPSBjdXJyeSgoZG9tQm9hcmQsIGJvYXJkU3RhdGUpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBjZWxsU3RhdGUgPSBib2FyZFN0YXRlW2ldW2pdXG4gICAgICAgIGNvbnN0IGNlbGxWaWV3ID0gZG9tQm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEteT0nJHtpICsgMX0nXVtkYXRhLXg9JyR7aiArIDF9J11gKVxuICAgICAgICBpZiAoIWNlbGxWaWV3LmNsYXNzTGlzdC5jb250YWlucyhfY2VsbFRhYmxlW2NlbGxTdGF0ZV0pKSB7XG4gICAgICAgICAgY2VsbFZpZXcuY2xhc3NMaXN0LnJlbW92ZSguLi5fY2VsbENsYXNzZXMpXG4gICAgICAgICAgY2VsbFZpZXcuY2xhc3NMaXN0LmFkZChfY2VsbFRhYmxlW2NlbGxTdGF0ZV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgY2xlYXJIaWdobGlnaHRzID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKVxuICAgIC5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnZnV0dXJlLXNoaXAnLCAnd3JvbmctcGxhY2VtZW50JykpXG5cbiAgY29uc3QgaGlnaGxpZ2h0RnV0dXJlU2hpcCA9ICh5LCB4LCBzaXplLCBpc1ZhbGlkKSA9PiB7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gKGlzVmFsaWQpID8gJ2Z1dHVyZS1zaGlwJyA6ICd3cm9uZy1wbGFjZW1lbnQnXG4gICAgY29uc3Qgc2VnbWVudHMgPSBfY2VsbHNGaW5kZXJbcGxhbmVdKHksIHgsIHNpemUpXG4gICAgY2xlYXJIaWdobGlnaHRzKClcbiAgICBwaXBlKFxuICAgICAgZmlsdGVyKChlbCkgPT4gQm9vbGVhbihlbCkpLFxuICAgICAgZm9yRWFjaCgoZWwpID0+IGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSlcbiAgICApKHNlZ21lbnRzKVxuICB9XG5cbiAgY29uc3QgZGlzcGxheUJvYXJkID0gKGJvYXJkKSA9PiB7XG4gICAgcmVtb3ZlQ2xhc3MoJ2Rpc3BsYXktbm9uZScsIGJvYXJkKVxuICB9XG5cbiAgY29uc3QgcGxhY2UgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGNvbnN0IHNoaXBTZWdtZW50cyA9IF9jZWxsc0ZpbmRlcltwbGFuZV0oeSwgeCwgc2l6ZSlcbiAgICBzaGlwU2VnbWVudHMuZm9yRWFjaCgoZWwpID0+IGVsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKSlcbiAgfVxuXG4gIGNvbnN0IHNldFBsYW5lID0gKG5ld1BsYW5lKSA9PiB7IHBsYW5lID0gbmV3UGxhbmUgfVxuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlQm9hcmQsXG4gICAgcmVuZGVyQm9hcmQsXG4gICAgc2V0UGxhbmUsXG4gICAgZXh0cmFjdENvb3JkcyxcbiAgICBoaWdobGlnaHRGdXR1cmVTaGlwLFxuICAgIGNsZWFySGlnaGxpZ2h0cyxcbiAgICBkaXNwbGF5Qm9hcmQsXG4gICAgcGxhY2VcbiAgfVxufSkoKVxuIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5cbmNvbnN0IHdyYXBJbkRpdiA9IGN1cnJ5KChzdHIsIGNsYXNzZXMpID0+IHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZGl2LmlubmVyVGV4dCA9IHN0clxuICBkaXYuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKVxuICByZXR1cm4gZGl2XG59KVxuXG5jb25zdCBjcmVhdGVFbCA9IGN1cnJ5KChjbGFzc2VzLCBlbGVtZW50KSA9PiB7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KVxuICBlbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpXG4gIHJldHVybiBlbFxufSlcblxuY29uc3QgYWRkSWQgPSBjdXJyeSgoaWQsIGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudC5pZCA9IGlkXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCBhZGRDbGFzcyA9IGN1cnJ5KChuZXdDbGFzcywgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQobmV3Q2xhc3MpXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCByZW1vdmVDbGFzcyA9IGN1cnJ5KChyZW1vdmVkLCBlbGVtZW50KSA9PiB7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShyZW1vdmVkKVxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgcmVwbGFjZUNsYXNzID0gY3VycnkoKG9sZENsYXNzLCBuZXdDbGFzcywgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC5yZXBsYWNlKG9sZENsYXNzLCBuZXdDbGFzcylcbiAgcmV0dXJuIGVsZW1lbnRcbn0pXG5cbmNvbnN0IHRvZ2dsZUNsYXNzID0gY3VycnkoKHRvZ2dsZWRDbGFzcywgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUodG9nZ2xlZENsYXNzKVxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgYWRkRGF0YUF0dHIgPSBjdXJyeSgoZGF0YUF0dHIsIGRhdGFWYWwsIGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudFtkYXRhQXR0cl0gPSBkYXRhVmFsXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCBjc3NTZWxlY3RvciA9IGN1cnJ5KChlbGVtZW50LCBxdWVyeSkgPT4ge1xuICByZXR1cm4gZWxlbWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KVxufSlcblxuY29uc3QgcXVlcnlEb2N1bWVudCA9IGNzc1NlbGVjdG9yKGRvY3VtZW50KVxuXG5jb25zdCByZXBsYWNlRWwgPSBjdXJyeSgob2xkRWxlbWVudCwgbmV3RWxlbWVudCkgPT4ge1xuICBvbGRFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0VsZW1lbnQsIG9sZEVsZW1lbnQpXG4gIHJldHVybiBuZXdFbGVtZW50XG59KVxuXG5jb25zdCBjbG9uZUVsID0gY3VycnkoKGVsZW1lbnQpID0+IHtcbiAgcmV0dXJuIGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpXG59KVxuXG5leHBvcnQge1xuICB3cmFwSW5EaXYsXG4gIGNyZWF0ZUVsLFxuICBhZGRJZCxcbiAgYWRkQ2xhc3MsXG4gIHJlbW92ZUNsYXNzLFxuICByZXBsYWNlQ2xhc3MsXG4gIHRvZ2dsZUNsYXNzLFxuICBhZGREYXRhQXR0cixcbiAgY3NzU2VsZWN0b3IsXG4gIHF1ZXJ5RG9jdW1lbnQsXG4gIHJlcGxhY2VFbCxcbiAgY2xvbmVFbFxufVxuIiwiZXhwb3J0IGNvbnN0IGV2ZW50c0hhbmRsZXIgPSAoKCkgPT4ge1xuICBjb25zdCBldmVudHMgPSB7fVxuXG4gIHJldHVybiB7XG4gICAgb24gKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0gfHwgW11cbiAgICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pXG4gICAgfSxcblxuICAgIG9uRWFjaCAoYXJyT2ZFdmVudHMsIGZuKSB7XG4gICAgICBhcnJPZkV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICBldmVudHNbZXZlbnRdID0gZXZlbnRzW2V2ZW50XSB8fCBbXVxuICAgICAgICBldmVudHNbZXZlbnRdLnB1c2goZm4pXG4gICAgICB9KVxuICAgIH0sXG5cbiAgICBvZmYgKGV2ZW50TmFtZSwgcmVtb3ZlZEZuKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoKGZuKSA9PiBmbiAhPT0gcmVtb3ZlZEZuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0cmlnZ2VyIChldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4gZm4oZGF0YSkpXG4gICAgICB9XG4gICAgfVxuICB9XG59KSgpXG4iLCJjb25zdCBjdXJyeSA9IChmbikgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gY3VycmllZCAoLi4uYXJncykge1xuICAgIGlmIChmbi5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY3VycmllZC5iaW5kKG51bGwsIC4uLmFyZ3MpXG4gICAgfVxuICAgIHJldHVybiBmbiguLi5hcmdzKVxuICB9XG59XG5cbmNvbnN0IGNoZWNrVHJ1dGhpbmVzcyA9IChlbCkgPT4gQm9vbGVhbihlbClcblxuY29uc3QgY2hlY2tGYWxzaW5lc3MgPSAoZWwpID0+ICFlbFxuXG5jb25zdCBoYXNUcnV0aHlWYWx1ZXMgPSAoYXJyKSA9PiBhcnIuc29tZShjaGVja1RydXRoaW5lc3MpXG5cbmNvbnN0IGhhc0ZhbHN5VmFsdWVzID0gKGFycikgPT4gYXJyLnNvbWUoY2hlY2tGYWxzaW5lc3MpXG5cbmNvbnN0IHJlcGxhY2VFdmVyeU50aCA9IGN1cnJ5KChudGgsIHN0YXJ0LCB1bnRpbCwgdmFsdWUsIGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbLi4uYXJyXVxuICBjb25zdCBzID0gKHR5cGVvZiBzdGFydCA9PT0gJ251bWJlcicpID8gc3RhcnQgOiBudGggLSAxXG4gIGNvbnN0IGxlbiA9IHVudGlsIHx8IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IHM7IGkgPCBsZW47IGkgKz0gbnRoKSB7XG4gICAgcmVzdWx0W2ldID0gdmFsdWVcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCByZXBsYWNlQXQgPSBjdXJyeSgoaW5kZXgsIHZhbHVlLCBhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gWy4uLmFycl1cbiAgcmVzdWx0W2luZGV4XSA9IHZhbHVlXG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IG1hcCA9IGN1cnJ5KChmbiwgZnVuY3RvcikgPT4ge1xuICBsZXQgcmVzdWx0XG4gIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0b3IpKSB7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOlxuICAgICAgcmVzdWx0ID0gW11cbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBmdW5jdG9yKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGZuKGl0ZW0pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG4gICAgICByZXN1bHQgPSB7fVxuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKGZ1bmN0b3IpKSB7XG4gICAgICAgIHJlc3VsdFtwcm9wXSA9IGZuKGZ1bmN0b3JbcHJvcF0pXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn0pXG5cbmNvbnN0IGlzQXJyYXkgPSBjdXJyeSgodmFsKSA9PiAoXG4gIHZhbCAhPT0gbnVsbCAmJlxuICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuKSlcblxuY29uc3QgaXNPYmplY3QgPSBjdXJyeSgodmFsKSA9PiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cbmNvbnN0IHBpcGUgPSAoLi4uZnVuY3Rpb25zKSA9PlxuICAodmFsdWUpID0+IGZ1bmN0aW9ucy5yZWR1Y2UoKGFjYywgZm4pID0+IGZuKGFjYyksIHZhbHVlKVxuXG5jb25zdCBkZWNyZW1lbnQgPSBjdXJyeSgodmFsKSA9PiAoaXNBcnJheSh2YWwpIHx8IGlzT2JqZWN0KHZhbCkpXG4gID8gbWFwKChuKSA9PiAodHlwZW9mIG4gPT09ICdudW1iZXInKSA/IG4gLSAxIDogbiwgdmFsKVxuICA6IHZhbCAtIDFcbilcblxuY29uc3QgZGVjcmVtZW50RWFjaCA9IG1hcChkZWNyZW1lbnQpXG5cbmNvbnN0IGluY3JlbWVudCA9IGN1cnJ5KCh2YWwpID0+IChpc0FycmF5KHZhbCkgfHwgaXNPYmplY3QodmFsKSlcbiAgPyBtYXAoKG4pID0+ICh0eXBlb2YgbiA9PT0gJ251bWJlcicpID8gbiArIDEgOiBuLCB2YWwpXG4gIDogdmFsICsgMVxuKVxuXG5jb25zdCBpbmNyZW1lbnRFYWNoID0gbWFwKGluY3JlbWVudClcblxuY29uc3QgcmVwZWF0ID0gY3VycnkoKGZuLCBudW0pID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbnVtKSB7XG4gICAgcmVzdWx0W2ldID0gZm4oaSlcbiAgICBpKytcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCBmaW5kID0gY3VycnkoKGZuLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBpZiAoZm4oYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIGFycltpXVxuICAgIH1cbiAgICBpKytcbiAgfVxufSlcblxuY29uc3QgZmluZEluZGV4ID0gY3VycnkoKGZuLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBpZiAoZm4oYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIGlcbiAgICB9XG4gICAgaSsrXG4gIH1cbn0pXG5cbmNvbnN0IGZvckVhY2ggPSBjdXJyeSgoZm4sIGFycikgPT4ge1xuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIGZuKGFycltpXSlcbiAgICBpKytcbiAgfVxuICByZXR1cm4gYXJyXG59KVxuXG5jb25zdCBmbGF0dGVuID0gY3VycnkoKGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBjb25zdCBpbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBpbGVuKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnJbaV0pID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICBjb25zdCBqYXJyID0gZmxhdHRlbihhcnJbaV0pXG4gICAgICBjb25zdCBqbGVuID0gamFyci5sZW5ndGhcbiAgICAgIGxldCBqID0gMFxuICAgICAgd2hpbGUgKGogPCBqbGVuKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGphcnJbal0pXG4gICAgICAgIGorK1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChhcnJbaV0pXG4gICAgfVxuICAgIGkrK1xuICB9XG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IGZpbHRlciA9IGN1cnJ5KChmbiwgYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgaWYgKGZuKGFycltpXSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGFycltpXSlcbiAgICB9XG4gICAgaSsrXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuY29uc3Qgb2JqRXF1YWwgPSBjdXJyeSgob2JqMSwgb2JqMikgPT4ge1xuICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMob2JqMSkpIHtcbiAgICBpZiAob2JqMVtwcm9wXSAhPT0gb2JqMltwcm9wXSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59KVxuXG5jb25zdCBvYmplY3RJbkFycmF5ID0gY3VycnkoKG9iaiwgYXJyKSA9PiB7XG4gIGZvciAoY29uc3QgY3VycmVudE9iaiBvZiBhcnIpIHtcbiAgICBpZiAob2JqRXF1YWwoY3VycmVudE9iaiwgb2JqKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59KVxuXG5jb25zdCByZW1vdmVEdXBsaWNhdGVPYmogPSBjdXJyeSgoYXJyKSA9PiB7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgaWYgKGxlbiA8PSAxKSByZXR1cm4gYXJyXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGNvbnN0IG9jY3VyYW5jZXMgPSAwXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIW9iamVjdEluQXJyYXkoYXJyW2ldLCByZXN1bHQpKSB7XG4gICAgICByZXN1bHQucHVzaChhcnJbaV0pXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IHJlbW92ZSA9IGN1cnJ5KChpdGVtLCBhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gWy4uLmFycl1cbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycltpXSA9PT0gaXRlbSkge1xuICAgICAgcmVzdWx0LnNwbGljZShpLCAxKVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCBndCA9IGN1cnJ5KChhLCBiKSA9PiBhID4gYilcbmNvbnN0IGx0ID0gY3VycnkoKGEsIGIpID0+IGEgPCBiKVxuY29uc3QgZ3RlID0gY3VycnkoKGEsIGIpID0+IGEgPj0gYilcbmNvbnN0IGx0ZSA9IGN1cnJ5KChhLCBiKSA9PiBhIDw9IGIpXG5jb25zdCBlcSA9IGN1cnJ5KChhLCBiKSA9PiBhID09PSBiKVxuXG5jb25zdCBhbGwgPSBjdXJyeSgocHJlZCwgYXJyKSA9PiB7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghcHJlZChhcnJbaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn0pXG5cbmNvbnN0IGFueSA9IGN1cnJ5KChwcmVkLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKHByZWQoYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59KVxuXG5jb25zdCBtb2RpZnkgPSBjdXJyeSgocHJvcCwgZm4sIG9iaikgPT5cbiAgT2JqZWN0LmFzc2lnbihcbiAgICB7fSxcbiAgICBvYmosXG4gICAgeyBbcHJvcF06IGZuKG9ialtwcm9wXSkgfVxuICApKVxuXG5leHBvcnQgeyBoYXNUcnV0aHlWYWx1ZXMsIHJlcGxhY2VFdmVyeU50aCwgcmVwbGFjZUF0LCBwaXBlLCBtYXAsIGN1cnJ5LCBkZWNyZW1lbnQsIGRlY3JlbWVudEVhY2gsIGluY3JlbWVudCwgaW5jcmVtZW50RWFjaCwgcmVwZWF0LCBmaW5kLCBmaW5kSW5kZXgsIGZvckVhY2gsIGhhc0ZhbHN5VmFsdWVzLCBmbGF0dGVuLCBmaWx0ZXIsIG9iakVxdWFsLCBvYmplY3RJbkFycmF5LCByZW1vdmVEdXBsaWNhdGVPYmosIHJlbW92ZSwgZ3QsIGx0LCBndGUsIGx0ZSwgZXEsIGFsbCwgYW55LCBpc0FycmF5LCBpc09iamVjdCwgbW9kaWZ5IH1cbiIsImNvbnN0IGdldFJhbmRvbUludGVnZXIgPSAobWluLCBtYXgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW5cblxuY29uc3QgZ2V0UmFuZG9tQ29vcmRzID0gKCkgPT4ge1xuICBjb25zdCB5ID0gZ2V0UmFuZG9tSW50ZWdlcigxLCAxMClcbiAgY29uc3QgeCA9IGdldFJhbmRvbUludGVnZXIoMSwgMTApXG4gIHJldHVybiB7IHksIHggfVxufVxuXG5jb25zdCBkZWxheSA9IGFzeW5jIChtcykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKVxuICB9KVxufVxuXG5leHBvcnQgeyBnZXRSYW5kb21JbnRlZ2VyLCBnZXRSYW5kb21Db29yZHMsIGRlbGF5IH1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lKEdwLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufSIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcblxuICBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcblxuICB2YXIgX3MsIF9lO1xuXG4gIHRyeSB7XG4gICAgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheVdpdGhvdXRIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhvdXRIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlU3ByZWFkIGZyb20gXCIuL25vbkl0ZXJhYmxlU3ByZWFkLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGVzL3N0eWxlLmNzcydcbmltcG9ydCAnLi9sb2dpYy9nYW1lX2hhbmRsZXInXG4iXSwibmFtZXMiOlsic3RhdGVzIiwiT2JqZWN0IiwiZnJlZXplIiwiV0FURVIiLCJTSElQIiwiTUlTU0VEIiwiSElUIiwiU1VOSyIsIkFST1VORF9TVU5LIiwiZXZlbnRzIiwiQk9BUkRfSE9WRVJFRCIsIkJPQVJEX0NMSUNLRUQiLCJTSElQX1ZBTElEQVRFRCIsIlNISVBfUk9UQVRFRCIsIlNISVBfUExBQ0VEIiwiUExBWUVSU19DUkVBVEVEIiwiR0FNRV9TVEFSVEVEIiwiQ09NUFVURVJfUExBQ0VEX1NISVBTIiwiQ09NUFVURVJfQk9BUkRfQ0xJQ0tFRCIsIkNPTVBVVEVSX0JPQVJEX0FUVEFDS0VEIiwiUExBWUVSX0ZJTklTSEVEX1RVUk4iLCJDT01QVVRFUl9GSU5JU0hFRF9UVVJOIiwiR0FNRV9FTkRFRCIsIkdhbWVib2FyZCIsImdldFJhbmRvbUludGVnZXIiLCJnZXRSYW5kb21Db29yZHMiLCJfZ2V0UmFuZG9tUGxhbmUiLCJBaUdhbWVib2FyZCIsImdhbWVib2FyZCIsIl9wbGFjZVNoaXBBdFJhbmRvbSIsInNpemUiLCJwbGFuZSIsImNvb3JkcyIsInNldFBsYW5lIiwiaXNWYWxpZEZvclBsYWNlIiwieSIsIngiLCJwbGFjZSIsInBsYWNlRmxlZXQiLCJhc3NpZ24iLCJQbGF5ZXIiLCJjdXJyeSIsImd0IiwibHQiLCJyZW1vdmUiLCJfYXR0YWNrRGlyZWN0aW9ucyIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsIl9nZXRPcHBvc2l0ZURpcmVjdGlvbiIsImRpcmVjdGlvbiIsIl9pc1NoaXBIb3Jpem9udGFsIiwiaGl0Q2VsbHMiLCJsZW5ndGgiLCJfZ2V0RW5kT25BeGlzIiwiYXhpcyIsImdldExhc3QiLCJjb21wYXJpc29uT3AiLCJyZWR1Y2UiLCJwcmV2IiwibmV4dCIsIl9nZXRMZWZ0bW9zdCIsIl9nZXRSaWdodG1vc3QiLCJfZ2V0VG9wbW9zdCIsIl9nZXRCb3R0b21tb3N0IiwiQWlQbGF5ZXIiLCJjb21wdXRlciIsImxhc3RIaXQiLCJfZmluZFJhbmRvbVNwb3RUb0F0dGFjayIsImJvYXJkIiwiaW5jbHVkZXMiLCJzdGF0ZSIsIl9maW5kU3BvdEFmdGVySGl0IiwiZGlyZWN0aW9ucyIsImtleXMiLCJyYW5kb21EaXJlY3Rpb24iLCJyeSIsInJ4IiwiaXNWYWxpZFRhcmdldCIsInJhbmRvbUNvb3JkcyIsInZhbGlkaXR5IiwiX2dhaW5PcHBvc2l0ZUVuZCIsImxlZnRtb3N0IiwicmlnaHRtb3N0IiwidG9wbW9zdCIsImJvdHRvbW1vc3QiLCJfYXR0YWNrU3BlY2lmaWNTcG90IiwiYXR0YWNrIiwic3RhdHVzIiwiZ2V0QXR0YWNrU3RhdHVzIiwiX2F0dGFja0luRGlyZWN0aW9uIiwiYXR0YWNrUGxheWVyIiwidmFsdWUiLCJfYXR0YWNrQWZ0ZXJIaXQiLCJwdXNoIiwiX2F0dGFja1JhbmRvbUNlbGwiLCJzaGlwU3RhdHVzIiwic2V0RGlyZWN0aW9uIiwidmFsIiwibmFtZSIsInR5cGUiLCJyZXBlYXQiLCJmaW5kSW5kZXgiLCJwaXBlIiwibWFwIiwiZmxhdHRlbiIsImRlY3JlbWVudCIsImVxIiwiYW55IiwiZmlsdGVyIiwib2JqZWN0SW5BcnJheSIsInJlbW92ZUR1cGxpY2F0ZU9iaiIsIlNoaXAiLCJfY3JlYXRlUm93IiwiX2NyZWF0ZUdhbWVib2FyZCIsIl9tYXBDb29yZHMiLCJyZXN1bHQiLCJpIiwiX2Nvb3Jkc1RvSW5kZXhlcyIsImZsZWV0IiwibWlzc2VkIiwiX21hcEJvYXJkIiwiX21hcFNoaXAiLCJfbWFwTWlzc2VkIiwiX21hcEhpdCIsIl9tYXBTdW5rIiwiX21hcEFyb3VuZCIsIl9maW5kU2hpcCIsImZpbmQiLCJzaGlwIiwic2VnbWVudHMiLCJzZWdtZW50IiwiX2dldFNlZ21lbnRzIiwiX2lzU2hpcFN1bmsiLCJpc1N1bmsiLCJfZ2V0U2hpcENlbGxzIiwiX2dldFN1bmtDZWxscyIsImNlbGwiLCJfYW55U2hpcCIsImlzRmxlZXRTdW5rIiwiZXZlcnkiLCJfaXNPdmVybGFwcyIsIm9jY3VwaWVkQ2VsbHMiLCJ0YWlsIiwiaiIsIl9pc092ZXJmbG93cyIsIl9nZXRDZWxsU3RhdGUiLCJpeSIsIml4Iiwicm93IiwiX2lzQWRqYWNlbnRUb1NoaXBzIiwidG9wQ2VsbCIsImJvdHRvbUNlbGwiLCJsZWZ0Q2VsbCIsInJpZ2h0Q2VsbCIsInRvcExlZnQiLCJib3R0b21MZWZ0IiwidG9wUmlnaHQiLCJib3R0b21SaWdodCIsIl9nZXRTdXJyb3VuZGluZ0NlbGxzIiwiX2lzQ2VsbFZhbGlkIiwiZ2V0QXJlYUFyb3VuZFN1bmsiLCJzdW5rQ2VsbHMiLCJyZWNlaXZlQXR0YWNrIiwiaGl0U2hpcCIsImhpdFNlZ21lbnRJbmRleCIsImhpdCIsImF0dGFja2VkQ2VsbCIsIm5ld1BsYW5lIiwiaXNGaXJzdCIsInR1cm4iLCJjaGFuZ2VUdXJuIiwiX3R5cGVzIiwiX3NlZ21lbnRzQ3JlYXRvciIsImhvcml6b250YWxseSIsImludGFjdCIsInZlcnRpY2FsbHkiLCJ1bmRlZmluZWQiLCJFcnJvciIsImV2ZW50c0hhbmRsZXIiLCJib2FyZEhhbmRsZXIiLCJkZWxheSIsIndyYXBJbkRpdiIsInF1ZXJ5RG9jdW1lbnQiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwicmVwbGFjZUNsYXNzIiwidG9nZ2xlQ2xhc3MiLCJjcmVhdGVFbCIsInJlcGxhY2VFbCIsImNsb25lRWwiLCJ1aUxvZ2ljIiwic3RhcnRCdG4iLCJyZXN0YXJ0QnRuIiwibmFtZUlucCIsInJvdGF0ZUJ0biIsImxvZ0RpdiIsImhpbnRzRGl2IiwibmFtZUlucHV0ZWQiLCJCb29sZWFuIiwic2hpcHNQbGFjZWQiLCJtc2dDb3VudCIsImRpc2FibGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvckVhY2giLCJlbCIsInRyaWdnZXIiLCJpbm5lclRleHQiLCJkYXRhc2V0IiwiZSIsImN1cnJlbnRUYXJnZXQiLCJvbiIsImFyZVNoaXBzUGxhY2VkIiwic2hpcFR5cGUiLCJvbkVhY2giLCJwbGF5ZXIiLCJsb2dDbGFzcyIsIm1zZyIsImxvZyIsImhpbnQiLCJpZCIsInByZXBlbmQiLCJib2FyZFZpZXdMb2dpYyIsInBsYXllckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsImNyZWF0ZUJvYXJkIiwicmVuZGVyUGxheWVyIiwicmVuZGVyQm9hcmQiLCJyZW5kZXJDb21wdXRlciIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiZXh0cmFjdENvb3JkcyIsImRhdGEiLCJoaWdobGlnaHRGdXR1cmVTaGlwIiwiZGlzcGxheUJvYXJkIiwiY2xlYXJIaWdobGlnaHRzIiwiZ2FtZUxvZ2ljIiwic2hpcHNUb1BsYWNlIiwiZ2FtZVN0YXJ0ZWQiLCJnYW1lRW5kZWQiLCJuZXh0U2hpcFNpemUiLCJpc1ZhbGlkIiwic2hpZnQiLCJfY2VsbFRhYmxlIiwicyIsInciLCJoIiwibSIsImEiLCJfY2VsbENsYXNzZXMiLCJ2YWx1ZXMiLCJfY3JlYXRlQ2VsbCIsImlzSGlkZGVuIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwiX2NlbGxzRmluZGVyIiwicXVlcnlTZWxlY3RvciIsImNvb3JkIiwiTnVtYmVyIiwiZG9tQm9hcmQiLCJhcHBlbmQiLCJib2FyZFN0YXRlIiwiY2VsbFN0YXRlIiwiY2VsbFZpZXciLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xhc3NOYW1lIiwic2hpcFNlZ21lbnRzIiwic3RyIiwiY2xhc3NlcyIsImRpdiIsImVsZW1lbnQiLCJhZGRJZCIsIm5ld0NsYXNzIiwicmVtb3ZlZCIsIm9sZENsYXNzIiwicmVwbGFjZSIsInRvZ2dsZWRDbGFzcyIsInRvZ2dsZSIsImFkZERhdGFBdHRyIiwiZGF0YUF0dHIiLCJkYXRhVmFsIiwiY3NzU2VsZWN0b3IiLCJxdWVyeSIsIm9sZEVsZW1lbnQiLCJuZXdFbGVtZW50IiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsImNsb25lTm9kZSIsImV2ZW50TmFtZSIsImZuIiwiYXJyT2ZFdmVudHMiLCJldmVudCIsIm9mZiIsInJlbW92ZWRGbiIsImN1cnJpZWQiLCJhcmdzIiwiYmluZCIsImNoZWNrVHJ1dGhpbmVzcyIsImNoZWNrRmFsc2luZXNzIiwiaGFzVHJ1dGh5VmFsdWVzIiwiYXJyIiwic29tZSIsImhhc0ZhbHN5VmFsdWVzIiwicmVwbGFjZUV2ZXJ5TnRoIiwibnRoIiwic3RhcnQiLCJ1bnRpbCIsImxlbiIsInJlcGxhY2VBdCIsImluZGV4IiwiZnVuY3RvciIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsIml0ZW0iLCJwcm9wIiwiaXNBcnJheSIsImlzT2JqZWN0IiwiZnVuY3Rpb25zIiwiYWNjIiwibiIsImRlY3JlbWVudEVhY2giLCJpbmNyZW1lbnQiLCJpbmNyZW1lbnRFYWNoIiwibnVtIiwiaWxlbiIsImphcnIiLCJqbGVuIiwib2JqRXF1YWwiLCJvYmoxIiwib2JqMiIsIm9iaiIsImN1cnJlbnRPYmoiLCJvY2N1cmFuY2VzIiwic3BsaWNlIiwiYiIsImd0ZSIsImx0ZSIsImFsbCIsInByZWQiLCJtb2RpZnkiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtcyIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCJdLCJzb3VyY2VSb290IjoiIn0=