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
  GAME_ENDED: 'Game ended',
  RESTART_REQUESTED: 'Restart requested',
  RESTART_VALIDATED: 'Restart validated',
  GAME_RESTARTED: 'Game restarted'
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


/* AiGameboard factory for gameboards controlled by an ai.
 * Those objects have methods that help AI to play the game,
 * like for placing random ships across virtual board. */

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
    var sizes = [5, 4, 3, 3, 2, 2, 1, 1];

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




/* AiPlayer factory for players controlled by an ai.
 * Ai players find and attack ships on the player boards. At first,
 * they attacks are random, but when they find the ship cell, they try to find
 * direction with other ship cells, and then press into this direction,
 * until the ship is sunk. */

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





/* Factory for gameboard objects.
 * Gameboard represents the virtual boards. It validates and receive attacks,
 * validates and places ships onto itself, maps sells with different states */

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
/* Factory for player objects.
 * Players have name, turn precedence, can attack other boards, have types. */
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
/* Factory for the ship objects.
 * Ships have types, segments, can be hit and sunk */
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

/***/ "./logic/board_handler.js":
/*!********************************!*\
  !*** ./logic/board_handler.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boardsHandler": () => (/* binding */ boardsHandler)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _constants_event_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/event_types */ "./constants/event_types.js");
/* harmony import */ var _utils_events_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/events_handler */ "./utils/events_handler.js");
/* harmony import */ var _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/dom_board */ "./ui/dom_board.js");
/* harmony import */ var _ui_dom_funcs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/dom_funcs */ "./ui/dom_funcs.js");





/* boardsHandler controls the boards: highlights ships, send coords to
 * game handler for validation, attaches to boards event listeners,
 * renders the boards after player and computer attacks */

var boardsHandler = function () {
  var playerBoard = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_4__.queryDocument)('#player-board');
  var computerBoard = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_4__.queryDocument)('#computer-board');
  var renderPlayer = _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.renderBoard(playerBoard, false);
  var renderComputer = _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.renderBoard(computerBoard, true);

  var createBoards = function createBoards() {
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.createBoard(false, playerBoard);
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.createBoard(true, computerBoard);
  };

  var resetBoards = function resetBoards(plane) {
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.recreateBoard(false, playerBoard);
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.recreateBoard(true, computerBoard);
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.setPlane(plane);
  };

  var sendCoordsForValidation = function sendCoordsForValidation(e) {
    if (e.target.classList.contains('cell')) {
      var coords = _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.extractCoords(e.target);
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_2__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_1__.events.BOARD_HOVERED, coords);
    }
  };

  var hightlightValidatedCoords = function hightlightValidatedCoords(data) {
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.highlightFutureShip.apply(_ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
  };

  var sendShipForValidation = function sendShipForValidation(e) {
    if (e.target.classList.contains('cell')) {
      var coords = _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.extractCoords(e.target);
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_2__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_1__.events.BOARD_CLICKED, coords);
    }
  };

  var placeValidatedShip = function placeValidatedShip(_ref) {
    var ship = _ref.ship;
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.place.apply(_ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(ship));
  };

  var renderComputerState = function renderComputerState(_ref2) {
    var state = _ref2.state;
    renderComputer(state);
  };

  var renderPlayerState = function renderPlayerState(_ref3) {
    var state = _ref3.state;
    renderPlayer(state);
  };

  var sendAttackedCoords = function sendAttackedCoords(e) {
    if (e.target.classList.contains('cell')) {
      var coords = _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.extractCoords(e.target);
      _utils_events_handler__WEBPACK_IMPORTED_MODULE_2__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_1__.events.COMPUTER_BOARD_CLICKED, coords);
    }
  };

  var changePlane = function changePlane(plane) {
    _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.setPlane(plane);
  };

  var initBoards = function initBoards() {
    createBoards();
    playerBoard.addEventListener('mouseover', sendCoordsForValidation);
    playerBoard.addEventListener('click', sendShipForValidation);
    playerBoard.addEventListener('mouseleave', _ui_dom_board__WEBPACK_IMPORTED_MODULE_3__.domBoard.clearHighlights);
    computerBoard.addEventListener('click', sendAttackedCoords);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_2__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_1__.events.SHIP_VALIDATED, hightlightValidatedCoords);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_2__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_1__.events.SHIP_PLACED, placeValidatedShip);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_2__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_1__.events.SHIP_ROTATED, changePlane);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_2__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_1__.events.COMPUTER_FINISHED_TURN, renderPlayerState);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_2__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_1__.events.GAME_RESTARTED, resetBoards);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_2__.eventsHandler.onEach([_constants_event_types__WEBPACK_IMPORTED_MODULE_1__.events.COMPUTER_PLACED_SHIPS, _constants_event_types__WEBPACK_IMPORTED_MODULE_1__.events.COMPUTER_BOARD_ATTACKED], renderComputerState);
  };

  return {
    initBoards: initBoards
  };
}();



/***/ }),

/***/ "./logic/game_handler.js":
/*!*******************************!*\
  !*** ./logic/game_handler.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameHandler": () => (/* binding */ gameHandler)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants_event_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/event_types */ "./constants/event_types.js");
/* harmony import */ var _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/events_handler */ "./utils/events_handler.js");
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../factories/player */ "./factories/player.js");
/* harmony import */ var _factories_ai_player__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../factories/ai_player */ "./factories/ai_player.js");
/* harmony import */ var _factories_gameboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../factories/gameboard */ "./factories/gameboard.js");
/* harmony import */ var _factories_ai_gameboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../factories/ai_gameboard */ "./factories/ai_gameboard.js");
/* harmony import */ var _utils_helper_funcs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/helper_funcs */ "./utils/helper_funcs.js");











/* gameHandler controls the flow of the game: validates data
 * sent from menuHandler and boardsHandler and uses methods of all
 * relevant for the game factories for virtual board manipulation */

var gameHandler = function () {
  var playerBoard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_8__.Gameboard)();
  var computerBoard = (0,_factories_ai_gameboard__WEBPACK_IMPORTED_MODULE_9__.AiGameboard)();
  var shipsToPlace = [5, 4, 3, 3, 2, 2, 1, 1];
  var player;
  var computer;
  var gameStarted = false;
  var gameEnded = false;

  var validateCoords = function validateCoords(coords) {
    if (shipsToPlace.length === 0) return;

    var _coords = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(coords, 2),
        y = _coords[0],
        x = _coords[1];

    var nextShipSize = shipsToPlace[0];
    var isValid = playerBoard.isValidForPlace(y, x, nextShipSize);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_VALIDATED, [y, x, nextShipSize, isValid]);
  };

  var validatePlacement = function validatePlacement(coords) {
    if (shipsToPlace.length === 0) return;

    var _coords2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(coords, 2),
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

  var restartGame = function restartGame(plane) {
    shipsToPlace = [5, 4, 3, 3, 2, 2, 1, 1];
    gameStarted = false;
    gameEnded = false;
    playerBoard = (0,_factories_gameboard__WEBPACK_IMPORTED_MODULE_8__.Gameboard)();
    computerBoard = (0,_factories_ai_gameboard__WEBPACK_IMPORTED_MODULE_9__.AiGameboard)();
    playerBoard.setPlane(plane);
  };

  var handlePlayerAttack = function handlePlayerAttack(coords) {
    var _computerBoard, _player, _computerBoard2;

    if (!gameStarted || gameEnded || !player.turn || !(_computerBoard = computerBoard).isValidTarget.apply(_computerBoard, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(coords))) return;

    (_player = player).attack.apply(_player, [computerBoard].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(coords)));

    var status = (_computerBoard2 = computerBoard).getAttackStatus.apply(_computerBoard2, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(coords));

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
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
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
              return (0,_utils_helper_funcs__WEBPACK_IMPORTED_MODULE_10__.delay)(400);

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
      return _ref.apply(this, arguments);
    };
  }();

  var changePlane = function changePlane(plane) {
    playerBoard.setPlane(plane);
  };

  var validateRestart = function validateRestart() {
    return _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.RESTART_VALIDATED, {
      turn: player.turn,
      ended: gameEnded
    });
  };

  var initGame = function initGame() {
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.BOARD_HOVERED, validateCoords);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.BOARD_CLICKED, validatePlacement);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.SHIP_ROTATED, changePlane);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_STARTED, startGame);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.RESTART_REQUESTED, validateRestart);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.GAME_RESTARTED, restartGame);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.COMPUTER_BOARD_CLICKED, handlePlayerAttack);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_5__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_4__.events.PLAYER_FINISHED_TURN, handleComputerAttack);
  };

  return {
    initGame: initGame
  };
}();



/***/ }),

/***/ "./logic/menu_handler.js":
/*!*******************************!*\
  !*** ./logic/menu_handler.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menuHandler": () => (/* binding */ menuHandler)
/* harmony export */ });
/* harmony import */ var _constants_event_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/event_types */ "./constants/event_types.js");
/* harmony import */ var _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/events_handler */ "./utils/events_handler.js");
/* harmony import */ var _utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/func_helpers */ "./utils/func_helpers.js");
/* harmony import */ var _ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/dom_funcs */ "./ui/dom_funcs.js");




/* menuHandler controls the menu: disables, hides and shows menu elements,
 * attaches event listeners to them, controls logs, gives the user ability
 * to start, restart menu, to input their name */

var menuHandler = function () {
  var startBtn = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.queryDocument)('#start-game');
  var restartBtn = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.queryDocument)('#restart-game');
  var nameInp = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.queryDocument)('#player-name');
  var rotateBtn = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.queryDocument)('#rotate');
  var logDiv = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.queryDocument)('#log');
  var hintsDiv = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.queryDocument)('#hints');
  var shipsPlaced = false;
  var msgCount = 0;

  var _hide = function _hide(el) {
    return (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.addClass)('display-none', el);
  };

  var _show = function _show(el) {
    return (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.removeClass)('display-none', el);
  };

  var _replaceHints = function _replaceHints(msg) {
    return (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_2__.pipe)((0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.createEl)(['hints']), (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.addId)('hints'), (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.addText)(msg), (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.replaceEl)(hintsDiv))('div');
  };

  var handleStart = function handleStart() {
    var msg = "Good luck, Admiral ".concat(nameInp.value, "!");
    hintsDiv = _replaceHints(msg);
    [startBtn, rotateBtn].forEach(_hide);

    _show(restartBtn);

    nameInp.disabled = true;
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_0__.events.GAME_STARTED, nameInp.value);
  };

  var handleEnd = function handleEnd(name) {
    hintsDiv.innerText = "".concat(name, " won!");
  };

  var requestRestart = function requestRestart() {
    return _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_0__.events.RESTART_REQUESTED);
  };

  var handleRestart = function handleRestart(_ref) {
    var turn = _ref.turn,
        ended = _ref.ended;
    if (!(turn || ended)) return;
    var msg = "Welcome back, Admiral ".concat(nameInp.value, "!");
    hintsDiv = _replaceHints(msg);
    [startBtn, rotateBtn].forEach(_show);

    _hide(restartBtn);

    shipsPlaced = false;
    nameInp.disabled = false;
    msgCount = 0;
    checkStartConditions();
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_0__.events.GAME_RESTARTED, rotateBtn.dataset.plane);
  };

  var rotate = function rotate() {
    if (rotateBtn.dataset.plane === 'vertically') {
      rotateBtn.dataset.plane = 'horizontally';
      rotateBtn.innerText = 'Horizontal';
    } else if (rotateBtn.dataset.plane === 'horizontally') {
      rotateBtn.dataset.plane = 'vertically';
      rotateBtn.innerText = 'Vertical';
    }

    _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__.eventsHandler.trigger(_constants_event_types__WEBPACK_IMPORTED_MODULE_0__.events.SHIP_ROTATED, rotateBtn.dataset.plane);
  };

  var checkStartConditions = function checkStartConditions() {
    startBtn.disabled = !(nameInp.value && shipsPlaced);
  };

  var checkShipsReadiness = function checkShipsReadiness(_ref2) {
    var areShipsPlaced = _ref2.areShipsPlaced,
        shipType = _ref2.shipType;
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

    return (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.wrapInDiv)(msg, [logClass]);
  };

  var displayLogMessage = function displayLogMessage(_ref3) {
    var status = _ref3.status,
        player = _ref3.player;

    var log = _createLogMessage(status, player);

    var hint = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.cloneEl)(log);
    hint.id = 'hints';
    logDiv.prepend(log);
    hintsDiv = (0,_ui_dom_funcs__WEBPACK_IMPORTED_MODULE_3__.replaceEl)(hintsDiv, hint);
  };

  var initMenu = function initMenu() {
    checkStartConditions();
    startBtn.addEventListener('click', handleStart);
    restartBtn.addEventListener('click', requestRestart);
    rotateBtn.addEventListener('click', rotate);
    nameInp.addEventListener('input', checkStartConditions);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_0__.events.SHIP_PLACED, checkShipsReadiness);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_0__.events.GAME_ENDED, handleEnd);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__.eventsHandler.on(_constants_event_types__WEBPACK_IMPORTED_MODULE_0__.events.RESTART_VALIDATED, handleRestart);
    _utils_events_handler__WEBPACK_IMPORTED_MODULE_1__.eventsHandler.onEach([_constants_event_types__WEBPACK_IMPORTED_MODULE_0__.events.COMPUTER_BOARD_ATTACKED, _constants_event_types__WEBPACK_IMPORTED_MODULE_0__.events.COMPUTER_FINISHED_TURN], displayLogMessage);
  };

  return {
    initMenu: initMenu
  };
}();



/***/ }),

/***/ "./ui/dom_board.js":
/*!*************************!*\
  !*** ./ui/dom_board.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domBoard": () => (/* binding */ domBoard)
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
var domBoard = function () {
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

  var recreateBoard = function recreateBoard(isHidden, domBoard) {
    (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_1__.clearElContent)(domBoard);
    createBoard(isHidden, domBoard);
  };

  var renderBoard = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_0__.curry)(function (domBoard, isHidden, boardState) {
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var cellState = boardState[i][j];
        var cellView = domBoard.querySelector("[data-y='".concat(i + 1, "'][data-x='").concat(j + 1, "']"));
        if (!cellView.classList.contains(_cellTable[cellState])) (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_1__.addClass)(_cellTable[cellState], cellView);

        if (isHidden && [_constants_cell_states__WEBPACK_IMPORTED_MODULE_2__.states.MISSED, _constants_cell_states__WEBPACK_IMPORTED_MODULE_2__.states.HIT, _constants_cell_states__WEBPACK_IMPORTED_MODULE_2__.states.SUNK, _constants_cell_states__WEBPACK_IMPORTED_MODULE_2__.states.AROUND_SUNK].includes(cellState)) {
          (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_1__.removeClass)('fog-of-war', cellView);
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
    var validCells = segments.filter(function (el) {
      return Boolean(el);
    });
    validCells.forEach(function (el) {
      return (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_1__.addClass)(className, el);
    });
  };

  var place = function place(y, x, size) {
    var segments = _cellsFinder[plane](y, x, size);

    segments.forEach(function (el) {
      return (0,_dom_funcs__WEBPACK_IMPORTED_MODULE_1__.addClass)('ship', el);
    });
  };

  var setPlane = function setPlane(newPlane) {
    plane = newPlane;
  };

  return {
    createBoard: createBoard,
    recreateBoard: recreateBoard,
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
/* harmony export */   "addText": () => (/* binding */ addText),
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
/* harmony export */   "cloneEl": () => (/* binding */ cloneEl),
/* harmony export */   "clearElContent": () => (/* binding */ clearElContent)
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
var addText = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (str, element) {
  element.textContent = str;
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
var clearElContent = (0,_utils_func_helpers__WEBPACK_IMPORTED_MODULE_1__.curry)(function (element) {
  while (element.lastChild) {
    element.lastChild.remove();
  }

  return element;
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
/* harmony import */ var _logic_menu_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic/menu_handler */ "./logic/menu_handler.js");
/* harmony import */ var _logic_board_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logic/board_handler */ "./logic/board_handler.js");
/* harmony import */ var _logic_game_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logic/game_handler */ "./logic/game_handler.js");




/* this is where handlers initialize and the game is put together */

(function initGame() {
  _logic_menu_handler__WEBPACK_IMPORTED_MODULE_1__.menuHandler.initMenu();
  _logic_board_handler__WEBPACK_IMPORTED_MODULE_2__.boardsHandler.initBoards();
  _logic_game_handler__WEBPACK_IMPORTED_MODULE_3__.gameHandler.initGame();
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLG1CQUFtQjtBQUNwRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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QUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQSxDQUFDLFNBQVNtQixRQUFULEdBQXFCO0FBQ3BCUyxFQUFBQSxxRUFBQTtBQUNBM0QsRUFBQUEsMEVBQUE7QUFDQWdDLEVBQUFBLHFFQUFBO0FBQ0QsQ0FKRCxJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb25zdGFudHMvY2VsbF9zdGF0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vY29uc3RhbnRzL2V2ZW50X3R5cGVzLmpzIiwid2VicGFjazovLy8uL2ZhY3Rvcmllcy9haV9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vZmFjdG9yaWVzL2FpX3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovLy8uL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vLy4vbG9naWMvYm9hcmRfaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9sb2dpYy9nYW1lX2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbG9naWMvbWVudV9oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3VpL2RvbV9ib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi91aS9kb21fZnVuY3MuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvZXZlbnRzX2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvZnVuY19oZWxwZXJzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2hlbHBlcl9mdW5jcy5qcyIsIndlYnBhY2s6Ly8vLi9zdHlsZXMvc3R5bGUuY3NzP2RmMDYiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhvdXRIb2xlcy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FzeW5jVG9HZW5lcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Db25zdW1hYmxlQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsImV4cG9ydCBjb25zdCBzdGF0ZXMgPSBPYmplY3QuZnJlZXplKHtcbiAgV0FURVI6ICd3JyxcbiAgU0hJUDogJ3MnLFxuICBNSVNTRUQ6ICdtJyxcbiAgSElUOiAnaCcsXG4gIFNVTks6ICd4JyxcbiAgQVJPVU5EX1NVTks6ICdhJ1xufSlcbiIsImV4cG9ydCBjb25zdCBldmVudHMgPSBPYmplY3QuZnJlZXplKHtcbiAgQk9BUkRfSE9WRVJFRDogJ0JvYXJkIGhvdmVyZWQnLFxuICBCT0FSRF9DTElDS0VEOiAnQm9hcmQgY2xpY2tlZCcsXG4gIFNISVBfVkFMSURBVEVEOiAnU2hpcCB2YWxpZGF0ZWQnLFxuICBTSElQX1JPVEFURUQ6ICdTaGlwIHJvdGF0ZWQnLFxuICBTSElQX1BMQUNFRDogJ1NoaXAgcGxhY2VkJyxcbiAgUExBWUVSU19DUkVBVEVEOiAnUGxheWVycyBjcmVhdGVkJyxcbiAgR0FNRV9TVEFSVEVEOiAnR2FtZSBzdGFydGVkJyxcbiAgQ09NUFVURVJfUExBQ0VEX1NISVBTOiAnQ29tcHV0ZXIgcGxhY2VkIHNoaXBzJyxcbiAgQ09NUFVURVJfQk9BUkRfQ0xJQ0tFRDogJ0NvbXB1dGVyIGJvYXJkIGNsaWNrZWQnLFxuICBDT01QVVRFUl9CT0FSRF9BVFRBQ0tFRDogJ0NvbXB1dGVyIGJvYXJkIGF0dGFja2VkJyxcbiAgUExBWUVSX0ZJTklTSEVEX1RVUk46ICdQbGF5ZXIgbWFkZSBtb3ZlJyxcbiAgQ09NUFVURVJfRklOSVNIRURfVFVSTjogJ0NvbXB1dGVyIG1hZGUgbW92ZScsXG4gIEdBTUVfRU5ERUQ6ICdHYW1lIGVuZGVkJyxcbiAgUkVTVEFSVF9SRVFVRVNURUQ6ICdSZXN0YXJ0IHJlcXVlc3RlZCcsXG4gIFJFU1RBUlRfVkFMSURBVEVEOiAnUmVzdGFydCB2YWxpZGF0ZWQnLFxuICBHQU1FX1JFU1RBUlRFRDogJ0dhbWUgcmVzdGFydGVkJ1xufSlcbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJ1xuaW1wb3J0IHsgZ2V0UmFuZG9tSW50ZWdlciwgZ2V0UmFuZG9tQ29vcmRzIH0gZnJvbSAnLi4vdXRpbHMvaGVscGVyX2Z1bmNzJ1xuXG4vKiBBaUdhbWVib2FyZCBmYWN0b3J5IGZvciBnYW1lYm9hcmRzIGNvbnRyb2xsZWQgYnkgYW4gYWkuXG4gKiBUaG9zZSBvYmplY3RzIGhhdmUgbWV0aG9kcyB0aGF0IGhlbHAgQUkgdG8gcGxheSB0aGUgZ2FtZSxcbiAqIGxpa2UgZm9yIHBsYWNpbmcgcmFuZG9tIHNoaXBzIGFjcm9zcyB2aXJ0dWFsIGJvYXJkLiAqL1xuXG5jb25zdCBfZ2V0UmFuZG9tUGxhbmUgPSAoKSA9PiB7XG4gIHJldHVybiBnZXRSYW5kb21JbnRlZ2VyKDEsIDIpID09PSAxID8gJ2hvcml6b250YWxseScgOiAndmVydGljYWxseSdcbn1cblxuZXhwb3J0IGNvbnN0IEFpR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxuXG4gIGNvbnN0IF9wbGFjZVNoaXBBdFJhbmRvbSA9IChzaXplKSA9PiB7XG4gICAgY29uc3QgcGxhbmUgPSBfZ2V0UmFuZG9tUGxhbmUoKVxuICAgIGxldCBjb29yZHMgPSBnZXRSYW5kb21Db29yZHMoKVxuICAgIGdhbWVib2FyZC5zZXRQbGFuZShwbGFuZSlcbiAgICB3aGlsZSAoIWdhbWVib2FyZC5pc1ZhbGlkRm9yUGxhY2UoY29vcmRzLnksIGNvb3Jkcy54LCBzaXplKSkge1xuICAgICAgY29vcmRzID0gZ2V0UmFuZG9tQ29vcmRzKClcbiAgICB9XG4gICAgZ2FtZWJvYXJkLnBsYWNlKGNvb3Jkcy55LCBjb29yZHMueCwgc2l6ZSlcbiAgfVxuXG4gIGNvbnN0IHBsYWNlRmxlZXQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2l6ZXMgPSBbNSwgNCwgMywgMywgMiwgMiwgMSwgMV1cbiAgICBmb3IgKGNvbnN0IHNpemUgb2Ygc2l6ZXMpIHtcbiAgICAgIF9wbGFjZVNoaXBBdFJhbmRvbShzaXplKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKGdhbWVib2FyZCwge1xuICAgIHBsYWNlRmxlZXRcbiAgfSlcbn1cbiIsImltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJ1xuaW1wb3J0IHsgc3RhdGVzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NlbGxfc3RhdGVzJ1xuaW1wb3J0IHsgZ2V0UmFuZG9tSW50ZWdlciwgZ2V0UmFuZG9tQ29vcmRzIH0gZnJvbSAnLi4vdXRpbHMvaGVscGVyX2Z1bmNzJ1xuaW1wb3J0IHsgY3VycnksIGd0LCBsdCwgcmVtb3ZlIH0gZnJvbSAnLi4vdXRpbHMvZnVuY19oZWxwZXJzJ1xuXG4vKiBBaVBsYXllciBmYWN0b3J5IGZvciBwbGF5ZXJzIGNvbnRyb2xsZWQgYnkgYW4gYWkuXG4gKiBBaSBwbGF5ZXJzIGZpbmQgYW5kIGF0dGFjayBzaGlwcyBvbiB0aGUgcGxheWVyIGJvYXJkcy4gQXQgZmlyc3QsXG4gKiB0aGV5IGF0dGFja3MgYXJlIHJhbmRvbSwgYnV0IHdoZW4gdGhleSBmaW5kIHRoZSBzaGlwIGNlbGwsIHRoZXkgdHJ5IHRvIGZpbmRcbiAqIGRpcmVjdGlvbiB3aXRoIG90aGVyIHNoaXAgY2VsbHMsIGFuZCB0aGVuIHByZXNzIGludG8gdGhpcyBkaXJlY3Rpb24sXG4gKiB1bnRpbCB0aGUgc2hpcCBpcyBzdW5rLiAqL1xuXG5jb25zdCBfYXR0YWNrRGlyZWN0aW9ucyA9IHtcbiAgbGVmdDogKHksIHgpID0+ICh7IHksIHg6IHggLSAxIH0pLFxuICByaWdodDogKHksIHgpID0+ICh7IHksIHg6IHggKyAxIH0pLFxuICB0b3A6ICh5LCB4KSA9PiAoeyB5OiB5IC0gMSwgeCB9KSxcbiAgYm90dG9tOiAoeSwgeCkgPT4gKHsgeTogeSArIDEsIHggfSlcbn1cblxuY29uc3QgX2dldE9wcG9zaXRlRGlyZWN0aW9uID0gKGRpcmVjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgcmV0dXJuICdyaWdodCdcbiAgICBjYXNlICdyaWdodCc6XG4gICAgICByZXR1cm4gJ2xlZnQnXG4gICAgY2FzZSAndG9wJzpcbiAgICAgIHJldHVybiAnYm90dG9tJ1xuICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICByZXR1cm4gJ3RvcCdcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnXG4gIH1cbn1cblxuY29uc3QgX2lzU2hpcEhvcml6b250YWwgPSAoaGl0Q2VsbHMpID0+XG4gIGhpdENlbGxzLmxlbmd0aCA+IDFcbiAgICA/IGhpdENlbGxzWzBdLnkgPT09IGhpdENlbGxzWzFdLnlcbiAgICA6IGZhbHNlXG5cbmNvbnN0IF9nZXRFbmRPbkF4aXMgPSBjdXJyeSgoYXhpcywgZ2V0TGFzdCwgaGl0Q2VsbHMpID0+IHtcbiAgY29uc3QgY29tcGFyaXNvbk9wID0gZ2V0TGFzdCA/IGd0IDogbHRcbiAgcmV0dXJuIGhpdENlbGxzLnJlZHVjZSgocHJldiwgbmV4dCkgPT5cbiAgICBjb21wYXJpc29uT3AocHJldltheGlzXSwgbmV4dFtheGlzXSlcbiAgICAgID8gcHJldlxuICAgICAgOiBuZXh0XG4gIClcbn0pXG5cbmNvbnN0IF9nZXRMZWZ0bW9zdCA9IF9nZXRFbmRPbkF4aXMoJ3gnLCBmYWxzZSlcbmNvbnN0IF9nZXRSaWdodG1vc3QgPSBfZ2V0RW5kT25BeGlzKCd4JywgdHJ1ZSlcbmNvbnN0IF9nZXRUb3Btb3N0ID0gX2dldEVuZE9uQXhpcygneScsIGZhbHNlKVxuY29uc3QgX2dldEJvdHRvbW1vc3QgPSBfZ2V0RW5kT25BeGlzKCd5JywgdHJ1ZSlcblxuZXhwb3J0IGNvbnN0IEFpUGxheWVyID0gKCkgPT4ge1xuICBjb25zdCBjb21wdXRlciA9IFBsYXllcignQ29tcHV0ZXInLCBmYWxzZSlcbiAgbGV0IGhpdENlbGxzID0gW11cbiAgbGV0IGxhc3RIaXQgPSB7fVxuICBsZXQgZGlyZWN0aW9uID0gJydcblxuICBjb25zdCBfZmluZFJhbmRvbVNwb3RUb0F0dGFjayA9IChib2FyZCkgPT4ge1xuICAgIGxldCBjb29yZHMgPSBnZXRSYW5kb21Db29yZHMoKVxuICAgIHdoaWxlIChbc3RhdGVzLkhJVCwgc3RhdGVzLk1JU1NFRCwgc3RhdGVzLlNVTkssIHN0YXRlcy5BUk9VTkRfU1VOS10uaW5jbHVkZXMoYm9hcmQuc3RhdGVbY29vcmRzLnkgLSAxXVtjb29yZHMueCAtIDFdKSkge1xuICAgICAgY29vcmRzID0gZ2V0UmFuZG9tQ29vcmRzKClcbiAgICB9XG4gICAgcmV0dXJuIHsgeTogY29vcmRzLnksIHg6IGNvb3Jkcy54IH1cbiAgfVxuXG4gIGNvbnN0IF9maW5kU3BvdEFmdGVySGl0ID0gKGJvYXJkLCB5LCB4KSA9PiB7XG4gICAgbGV0IGRpcmVjdGlvbnMgPSBPYmplY3Qua2V5cyhfYXR0YWNrRGlyZWN0aW9ucylcbiAgICBsZXQgcmFuZG9tRGlyZWN0aW9uID0gZGlyZWN0aW9uc1tnZXRSYW5kb21JbnRlZ2VyKDAsIDMpXVxuICAgIGxldCB7IHk6IHJ5LCB4OiByeCB9ID0gX2F0dGFja0RpcmVjdGlvbnNbcmFuZG9tRGlyZWN0aW9uXSh5LCB4KVxuXG4gICAgd2hpbGUgKCFib2FyZC5pc1ZhbGlkVGFyZ2V0KHJ5LCByeCkgJiYgZGlyZWN0aW9ucy5sZW5ndGggPiAxKSB7XG4gICAgICBkaXJlY3Rpb25zID0gcmVtb3ZlKHJhbmRvbURpcmVjdGlvbiwgZGlyZWN0aW9ucylcbiAgICAgIHJhbmRvbURpcmVjdGlvbiA9IGRpcmVjdGlvbnNbZ2V0UmFuZG9tSW50ZWdlcigwLCBkaXJlY3Rpb25zLmxlbmd0aCAtIDEpXVxuICAgICAgY29uc3QgcmFuZG9tQ29vcmRzID0gX2F0dGFja0RpcmVjdGlvbnNbcmFuZG9tRGlyZWN0aW9uXSh5LCB4KVxuICAgICAgcnkgPSByYW5kb21Db29yZHMueVxuICAgICAgcnggPSByYW5kb21Db29yZHMueFxuICAgIH1cbiAgICBpZiAoIWJvYXJkLmlzVmFsaWRUYXJnZXQocnksIHJ4KSkge1xuICAgICAgcmV0dXJuIHsgdmFsaWRpdHk6IGZhbHNlIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdmFsaWRpdHk6IHRydWUsIGRpcmVjdGlvbjogcmFuZG9tRGlyZWN0aW9uLCB5OiByeSwgeDogcnggfVxuICB9XG5cbiAgY29uc3QgX2dhaW5PcHBvc2l0ZUVuZCA9ICgpID0+IHtcbiAgICBsZXQgbGVmdG1vc3RcbiAgICBsZXQgcmlnaHRtb3N0XG4gICAgbGV0IHRvcG1vc3RcbiAgICBsZXQgYm90dG9tbW9zdFxuICAgIHN3aXRjaCAoX2lzU2hpcEhvcml6b250YWwoaGl0Q2VsbHMpKSB7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIGxlZnRtb3N0ID0gX2dldExlZnRtb3N0KGhpdENlbGxzKVxuICAgICAgICByaWdodG1vc3QgPSBfZ2V0UmlnaHRtb3N0KGhpdENlbGxzKVxuICAgICAgICByZXR1cm4gbGFzdEhpdC54ID09PSBsZWZ0bW9zdC54XG4gICAgICAgICAgPyByaWdodG1vc3RcbiAgICAgICAgICA6IGxlZnRtb3N0XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICB0b3Btb3N0ID0gX2dldFRvcG1vc3QoaGl0Q2VsbHMpXG4gICAgICAgIGJvdHRvbW1vc3QgPSBfZ2V0Qm90dG9tbW9zdChoaXRDZWxscylcbiAgICAgICAgcmV0dXJuIGxhc3RIaXQueSA9PT0gdG9wbW9zdC55XG4gICAgICAgICAgPyBib3R0b21tb3N0XG4gICAgICAgICAgOiB0b3Btb3N0XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ge31cbiAgICB9XG4gIH1cblxuICBjb25zdCBfYXR0YWNrU3BlY2lmaWNTcG90ID0gKGJvYXJkLCB5LCB4KSA9PiB7XG4gICAgY29tcHV0ZXIuYXR0YWNrKGJvYXJkLCB5LCB4KVxuICAgIGNvbnN0IHN0YXR1cyA9IGJvYXJkLmdldEF0dGFja1N0YXR1cyh5LCB4KVxuICAgIHJldHVybiBzdGF0dXNcbiAgfVxuXG4gIGNvbnN0IF9hdHRhY2tJbkRpcmVjdGlvbiA9IChib2FyZCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IF9hdHRhY2tEaXJlY3Rpb25zW2RpcmVjdGlvbl0obGFzdEhpdC55LCBsYXN0SGl0LngpXG4gICAgaWYgKCFib2FyZC5pc1ZhbGlkVGFyZ2V0KGNvb3Jkcy55LCBjb29yZHMueCkpIHtcbiAgICAgIGRpcmVjdGlvbiA9IF9nZXRPcHBvc2l0ZURpcmVjdGlvbihkaXJlY3Rpb24pXG4gICAgICBsYXN0SGl0ID0gX2dhaW5PcHBvc2l0ZUVuZCgpXG4gICAgICBpZiAoIWJvYXJkLmlzVmFsaWRUYXJnZXQoX2F0dGFja0RpcmVjdGlvbnNbZGlyZWN0aW9uXShsYXN0SGl0LnksIGxhc3RIaXQueCkpKSB7XG4gICAgICAgIGRpcmVjdGlvbiA9ICcnXG4gICAgICB9XG4gICAgICByZXR1cm4gYXR0YWNrUGxheWVyKGJvYXJkKVxuICAgIH1cbiAgICBjb21wdXRlci5hdHRhY2soYm9hcmQsIGNvb3Jkcy55LCBjb29yZHMueClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMoY29vcmRzLnksIGNvb3Jkcy54KVxuICAgIGlmIChzdGF0dXMudmFsdWUgIT09ICdoaXQnKSB7XG4gICAgICBkaXJlY3Rpb24gPSBfZ2V0T3Bwb3NpdGVEaXJlY3Rpb24oZGlyZWN0aW9uKVxuICAgICAgbGFzdEhpdCA9IF9nYWluT3Bwb3NpdGVFbmQoKVxuICAgIH1cbiAgICByZXR1cm4gc3RhdHVzXG4gIH1cblxuICBjb25zdCBfYXR0YWNrQWZ0ZXJIaXQgPSAoYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBfZmluZFNwb3RBZnRlckhpdChib2FyZCwgbGFzdEhpdC55LCBsYXN0SGl0LngpXG4gICAgaWYgKCFjb29yZHMudmFsaWRpdHkpIHtcbiAgICAgIGxhc3RIaXQgPSB7fVxuICAgICAgaGl0Q2VsbHMgPSBbXVxuICAgICAgcmV0dXJuIGF0dGFja1BsYXllcihib2FyZClcbiAgICB9XG4gICAgZGlyZWN0aW9uID0gY29vcmRzLmRpcmVjdGlvblxuICAgIGNvbXB1dGVyLmF0dGFjayhib2FyZCwgY29vcmRzLnksIGNvb3Jkcy54KVxuICAgIGNvbnN0IHN0YXR1cyA9IGJvYXJkLmdldEF0dGFja1N0YXR1cyhjb29yZHMueSwgY29vcmRzLngpXG4gICAgaWYgKHN0YXR1cy52YWx1ZSAhPT0gJ2hpdCcpIHtcbiAgICAgIHJldHVybiBzdGF0dXNcbiAgICB9XG4gICAgbGFzdEhpdCA9IHsgeTogY29vcmRzLnksIHg6IGNvb3Jkcy54IH1cbiAgICBoaXRDZWxscy5wdXNoKGxhc3RIaXQpXG4gICAgcmV0dXJuIHN0YXR1c1xuICB9XG5cbiAgY29uc3QgX2F0dGFja1JhbmRvbUNlbGwgPSAoYm9hcmQpID0+IHtcbiAgICBjb25zdCByYW5kb21Db29yZHMgPSBfZmluZFJhbmRvbVNwb3RUb0F0dGFjayhib2FyZClcbiAgICBjb21wdXRlci5hdHRhY2soYm9hcmQsIHJhbmRvbUNvb3Jkcy55LCByYW5kb21Db29yZHMueClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMocmFuZG9tQ29vcmRzLnksIHJhbmRvbUNvb3Jkcy54KVxuICAgIHJldHVybiBzdGF0dXNcbiAgfVxuXG4gIGNvbnN0IGF0dGFja1BsYXllciA9IChib2FyZCwgeSwgeCkgPT4ge1xuICAgIGxldCBzdGF0dXNcbiAgICBpZiAoeSAmJiB4KSB7XG4gICAgICBzdGF0dXMgPSBfYXR0YWNrU3BlY2lmaWNTcG90KGJvYXJkLCB5LCB4KVxuICAgIH0gZWxzZSBpZiAobGFzdEhpdC55ICYmIGxhc3RIaXQueCAmJiBkaXJlY3Rpb24gIT09ICcnKSB7XG4gICAgICBzdGF0dXMgPSBfYXR0YWNrSW5EaXJlY3Rpb24oYm9hcmQpXG4gICAgfSBlbHNlIGlmIChsYXN0SGl0LnkgJiYgbGFzdEhpdC54KSB7XG4gICAgICBzdGF0dXMgPSBfYXR0YWNrQWZ0ZXJIaXQoYm9hcmQpXG4gICAgfSBlbHNlIGlmICghKGxhc3RIaXQueSAmJiBsYXN0SGl0LngpKSB7XG4gICAgICBzdGF0dXMgPSBfYXR0YWNrUmFuZG9tQ2VsbChib2FyZClcbiAgICB9XG4gICAgaWYgKHN0YXR1cy5zaGlwU3RhdHVzID09PSAnZGFtYWdlZCcpIHtcbiAgICAgIGxhc3RIaXQgPSB7IHk6IHN0YXR1cy55LCB4OiBzdGF0dXMueCB9XG4gICAgICBoaXRDZWxscy5wdXNoKGxhc3RIaXQpXG4gICAgfVxuICAgIGlmIChzdGF0dXMuc2hpcFN0YXR1cyA9PT0gJ2Rlc3Ryb3llZCcpIHtcbiAgICAgIGRpcmVjdGlvbiA9ICcnXG4gICAgICBsYXN0SGl0ID0ge31cbiAgICAgIGhpdENlbGxzID0gW11cbiAgICB9XG4gICAgcmV0dXJuIHN0YXR1c1xuICB9XG5cbiAgY29uc3Qgc2V0RGlyZWN0aW9uID0gKHZhbCkgPT4geyBkaXJlY3Rpb24gPSB2YWwgfVxuXG4gIHJldHVybiB7XG4gICAgYXR0YWNrUGxheWVyLFxuICAgIHNldERpcmVjdGlvbixcbiAgICBnZXQgZGlyZWN0aW9uICgpIHsgcmV0dXJuIGRpcmVjdGlvbiB9LFxuICAgIGdldCBuYW1lICgpIHsgcmV0dXJuIGNvbXB1dGVyLm5hbWUgfSxcbiAgICBnZXQgdHlwZSAoKSB7IHJldHVybiBjb21wdXRlci50eXBlIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgcmVwZWF0LCBmaW5kSW5kZXgsIHBpcGUsIG1hcCwgZmxhdHRlbiwgZGVjcmVtZW50LCBjdXJyeSwgZXEsIGFueSwgZmlsdGVyLCBvYmplY3RJbkFycmF5LCBndCwgbHQsIHJlbW92ZUR1cGxpY2F0ZU9iaiB9IGZyb20gJy4uL3V0aWxzL2Z1bmNfaGVscGVycydcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnXG5pbXBvcnQgeyBzdGF0ZXMgfSBmcm9tICcuLi9jb25zdGFudHMvY2VsbF9zdGF0ZXMnXG5cbi8qIEZhY3RvcnkgZm9yIGdhbWVib2FyZCBvYmplY3RzLlxuICogR2FtZWJvYXJkIHJlcHJlc2VudHMgdGhlIHZpcnR1YWwgYm9hcmRzLiBJdCB2YWxpZGF0ZXMgYW5kIHJlY2VpdmUgYXR0YWNrcyxcbiAqIHZhbGlkYXRlcyBhbmQgcGxhY2VzIHNoaXBzIG9udG8gaXRzZWxmLCBtYXBzIHNlbGxzIHdpdGggZGlmZmVyZW50IHN0YXRlcyAqL1xuXG5jb25zdCBfY3JlYXRlUm93ID0gKCkgPT4gcmVwZWF0KCgpID0+IHN0YXRlcy5XQVRFUiwgMTApXG5jb25zdCBfY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4gcmVwZWF0KF9jcmVhdGVSb3csIDEwKVxuXG5jb25zdCBfbWFwQ29vcmRzID0gY3VycnkoKGJvYXJkLCB2YWx1ZSwgY29vcmRzKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFsuLi5ib2FyZF1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB7IHksIHggfSA9IGRlY3JlbWVudChjb29yZHNbaV0pXG4gICAgcmVzdWx0W3ldW3hdID0gdmFsdWVcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCBfY29vcmRzVG9JbmRleGVzID0gKHksIHgpID0+IHtcbiAgcmV0dXJuIGRlY3JlbWVudChbeSwgeF0pXG59XG5cbmV4cG9ydCBjb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGZsZWV0ID0gW11cbiAgY29uc3QgbWlzc2VkID0gW11cbiAgbGV0IHBsYW5lID0gJ2hvcml6b250YWxseSdcbiAgbGV0IHN0YXRlID0gX2NyZWF0ZUdhbWVib2FyZCgpXG5cbiAgY29uc3QgX21hcEJvYXJkID0gX21hcENvb3JkcyhzdGF0ZSlcbiAgY29uc3QgX21hcFNoaXAgPSBfbWFwQm9hcmQoc3RhdGVzLlNISVApXG4gIGNvbnN0IF9tYXBNaXNzZWQgPSBfbWFwQm9hcmQoc3RhdGVzLk1JU1NFRClcbiAgY29uc3QgX21hcEhpdCA9IF9tYXBCb2FyZChzdGF0ZXMuSElUKVxuICBjb25zdCBfbWFwU3VuayA9IF9tYXBCb2FyZChzdGF0ZXMuU1VOSylcbiAgY29uc3QgX21hcEFyb3VuZCA9IF9tYXBCb2FyZChzdGF0ZXMuQVJPVU5EX1NVTkspXG5cbiAgY29uc3QgX2ZpbmRTaGlwID0gKHksIHgpID0+XG4gICAgZmxlZXQuZmluZCgoc2hpcCkgPT4gc2hpcC5zZWdtZW50cy5maW5kKChzZWdtZW50KSA9PiBzZWdtZW50LnkgPT09IHkgJiYgc2VnbWVudC54ID09PSB4KSlcblxuICBjb25zdCBfZ2V0U2VnbWVudHMgPSAoc2hpcCkgPT4gc2hpcC5zZWdtZW50c1xuXG4gIGNvbnN0IF9pc1NoaXBTdW5rID0gKHNoaXApID0+IHNoaXAuaXNTdW5rKClcblxuICBjb25zdCBfZ2V0U2hpcENlbGxzID0gKCkgPT4gcGlwZShcbiAgICBtYXAoX2dldFNlZ21lbnRzKSxcbiAgICBmbGF0dGVuXG4gICkoZmxlZXQpXG5cbiAgY29uc3QgX2dldFN1bmtDZWxscyA9ICgpID0+IHBpcGUoXG4gICAgZmlsdGVyKF9pc1NoaXBTdW5rKSxcbiAgICBtYXAoX2dldFNlZ21lbnRzKSxcbiAgICBmbGF0dGVuLFxuICAgIG1hcCgoY2VsbCkgPT4gKHsgeTogY2VsbC55LCB4OiBjZWxsLnggfSkpXG4gICkoZmxlZXQpXG5cbiAgY29uc3QgX2FueVNoaXAgPSBhbnkoZXEoc3RhdGVzLlNISVApKVxuXG4gIGNvbnN0IGlzRmxlZXRTdW5rID0gKCkgPT4gZmxlZXQuZXZlcnkoX2lzU2hpcFN1bmspXG5cbiAgY29uc3QgX2lzT3ZlcmxhcHMgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGNvbnN0IG9jY3VwaWVkQ2VsbHMgPSBfZ2V0U2hpcENlbGxzKClcbiAgICBpZiAocGxhbmUgPT09ICdob3Jpem9udGFsbHknICYmIG9jY3VwaWVkQ2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdGFpbCA9IHggKyBzaXplXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9jY3VwaWVkQ2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IHg7IGogPCB0YWlsOyBqKyspIHtcbiAgICAgICAgICBpZiAob2NjdXBpZWRDZWxsc1tpXS55ID09PSB5ICYmIG9jY3VwaWVkQ2VsbHNbaV0ueCA9PT0gaikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBsYW5lID09PSAndmVydGljYWxseScgJiYgb2NjdXBpZWRDZWxscy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0YWlsID0geSArIHNpemVcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2NjdXBpZWRDZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0geTsgaiA8IHRhaWw7IGorKykge1xuICAgICAgICAgIGlmIChvY2N1cGllZENlbGxzW2ldLnkgPT09IGogJiYgb2NjdXBpZWRDZWxsc1tpXS54ID09PSB4KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IF9pc092ZXJmbG93cyA9ICh5LCB4LCBzaXplKSA9PiB7XG4gICAgaWYgKChwbGFuZSA9PT0gJ2hvcml6b250YWxseScgJiYgeCArIC0tc2l6ZSA+IDEwKSB8fFxuICAgICAgICAocGxhbmUgPT09ICd2ZXJ0aWNhbGx5JyAmJiB5ICsgLS1zaXplID4gMTApKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IF9nZXRDZWxsU3RhdGUgPSAoeSwgeCkgPT4ge1xuICAgIGNvbnN0IFtpeSwgaXhdID0gX2Nvb3Jkc1RvSW5kZXhlcyh5LCB4KVxuICAgIGNvbnN0IHJvdyA9IHN0YXRlW2l5XVxuICAgIHJldHVybiByb3dcbiAgICAgID8gc3RhdGVbaXldW2l4XVxuICAgICAgOiBudWxsXG4gIH1cblxuICBjb25zdCBfaXNBZGphY2VudFRvU2hpcHMgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGlmIChwbGFuZSA9PT0gJ2hvcml6b250YWxseScpIHtcbiAgICAgIGNvbnN0IHRhaWwgPSB4ICsgc2l6ZVxuXG4gICAgICBmb3IgKGxldCBpID0geDsgaSA8IHRhaWw7IGkrKykge1xuICAgICAgICBjb25zdCB0b3BDZWxsID0gX2dldENlbGxTdGF0ZSh5IC0gMSwgaSlcbiAgICAgICAgY29uc3QgYm90dG9tQ2VsbCA9IF9nZXRDZWxsU3RhdGUoeSArIDEsIGkpXG4gICAgICAgIGlmIChfYW55U2hpcChbdG9wQ2VsbCwgYm90dG9tQ2VsbF0pKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBsZWZ0Q2VsbCA9IF9nZXRDZWxsU3RhdGUoeSwgeCAtIDEpXG4gICAgICBjb25zdCByaWdodENlbGwgPSBfZ2V0Q2VsbFN0YXRlKHksIHRhaWwpXG4gICAgICBpZiAoX2FueVNoaXAoW2xlZnRDZWxsLCByaWdodENlbGxdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0b3BMZWZ0ID0gX2dldENlbGxTdGF0ZSh5IC0gMSwgeCAtIDEpXG4gICAgICBjb25zdCBib3R0b21MZWZ0ID0gX2dldENlbGxTdGF0ZSh5ICsgMSwgeCAtIDEpXG4gICAgICBjb25zdCB0b3BSaWdodCA9IF9nZXRDZWxsU3RhdGUoeSAtIDEsIHRhaWwpXG4gICAgICBjb25zdCBib3R0b21SaWdodCA9IF9nZXRDZWxsU3RhdGUoeSArIDEsIHRhaWwpXG4gICAgICBpZiAoX2FueVNoaXAoW3RvcExlZnQsIGJvdHRvbUxlZnQsIHRvcFJpZ2h0LCBib3R0b21SaWdodF0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBsYW5lID09PSAndmVydGljYWxseScpIHtcbiAgICAgIGNvbnN0IHRhaWwgPSB5ICsgc2l6ZVxuXG4gICAgICBjb25zdCB0b3BDZWxsID0gX2dldENlbGxTdGF0ZSh5IC0gMSwgeClcbiAgICAgIGNvbnN0IGJvdHRvbUNlbGwgPSBfZ2V0Q2VsbFN0YXRlKHRhaWwsIHgpXG4gICAgICBpZiAoX2FueVNoaXAoW3RvcENlbGwsIGJvdHRvbUNlbGxdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0geTsgaSA8IHRhaWw7IGkrKykge1xuICAgICAgICBjb25zdCBsZWZ0Q2VsbCA9IF9nZXRDZWxsU3RhdGUoaSwgeCAtIDEpXG4gICAgICAgIGNvbnN0IHJpZ2h0Q2VsbCA9IF9nZXRDZWxsU3RhdGUoaSwgeCArIDEpXG4gICAgICAgIGlmIChfYW55U2hpcChbbGVmdENlbGwsIHJpZ2h0Q2VsbF0pKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB0b3BMZWZ0ID0gX2dldENlbGxTdGF0ZSh5IC0gMSwgeCAtIDEpXG4gICAgICBjb25zdCB0b3BSaWdodCA9IF9nZXRDZWxsU3RhdGUoeSAtIDEsIHggKyAxKVxuICAgICAgY29uc3QgYm90dG9tTGVmdCA9IF9nZXRDZWxsU3RhdGUodGFpbCwgeCAtIDEpXG4gICAgICBjb25zdCBib3R0b21SaWdodCA9IF9nZXRDZWxsU3RhdGUodGFpbCwgeCArIDEpXG4gICAgICBpZiAoX2FueVNoaXAoW3RvcExlZnQsIGJvdHRvbUxlZnQsIHRvcFJpZ2h0LCBib3R0b21SaWdodF0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgX2dldFN1cnJvdW5kaW5nQ2VsbHMgPSAoeyB5LCB4IH0pID0+IHtcbiAgICByZXR1cm4gW1xuICAgICAgeyB5OiB5IC0gMSwgeCB9LFxuICAgICAgeyB5OiB5ICsgMSwgeCB9LFxuICAgICAgeyB5LCB4OiB4IC0gMSB9LFxuICAgICAgeyB5LCB4OiB4ICsgMSB9LFxuICAgICAgeyB5OiB5IC0gMSwgeDogeCAtIDEgfSxcbiAgICAgIHsgeTogeSArIDEsIHg6IHggKyAxIH0sXG4gICAgICB7IHk6IHkgLSAxLCB4OiB4ICsgMSB9LFxuICAgICAgeyB5OiB5ICsgMSwgeDogeCAtIDEgfVxuICAgIF1cbiAgfVxuXG4gIGNvbnN0IF9pc0NlbGxWYWxpZCA9ICh7IHksIHggfSkgPT5cbiAgICAhYW55KChheGlzKSA9PiAoZ3QoYXhpcywgMTApIHx8IGx0KGF4aXMsIDEpKSwgW3gsIHldKVxuXG4gIGNvbnN0IGdldEFyZWFBcm91bmRTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IHN1bmtDZWxscyA9IF9nZXRTdW5rQ2VsbHMoKVxuICAgIHJldHVybiBwaXBlKFxuICAgICAgbWFwKF9nZXRTdXJyb3VuZGluZ0NlbGxzKSxcbiAgICAgIGZsYXR0ZW4sXG4gICAgICBmaWx0ZXIoKGNlbGwpID0+ICFvYmplY3RJbkFycmF5KGNlbGwsIHN1bmtDZWxscykpLFxuICAgICAgZmlsdGVyKF9pc0NlbGxWYWxpZCksXG4gICAgICByZW1vdmVEdXBsaWNhdGVPYmpcbiAgICApKHN1bmtDZWxscylcbiAgfVxuXG4gIGNvbnN0IGlzVmFsaWRGb3JQbGFjZSA9ICh5LCB4LCBzaXplKSA9PiAoXG4gICAgIV9pc092ZXJsYXBzKHksIHgsIHNpemUpICYmXG4gICAgIV9pc092ZXJmbG93cyh5LCB4LCBzaXplKSAmJlxuICAgICFfaXNBZGphY2VudFRvU2hpcHMoeSwgeCwgc2l6ZSlcbiAgKVxuXG4gIGNvbnN0IHBsYWNlID0gKHksIHgsIHNpemUpID0+IHtcbiAgICBpZiAoIWlzVmFsaWRGb3JQbGFjZSh5LCB4LCBzaXplKSkgcmV0dXJuXG5cbiAgICBjb25zdCBzaGlwID0gU2hpcCh5LCB4LCBzaXplLCBwbGFuZSlcbiAgICBmbGVldC5wdXNoKHNoaXApXG4gICAgc3RhdGUgPSBfbWFwU2hpcChzaGlwLnNlZ21lbnRzKVxuICAgIHJldHVybiBzaGlwXG4gIH1cblxuICBjb25zdCBpc1ZhbGlkVGFyZ2V0ID0gKHksIHgpID0+IHtcbiAgICBjb25zdCBbaXksIGl4XSA9IF9jb29yZHNUb0luZGV4ZXMoeSwgeClcbiAgICBjb25zdCByb3cgPSBzdGF0ZVtpeV1cbiAgICBpZiAocm93KSB7XG4gICAgICBzd2l0Y2ggKHN0YXRlW2l5XVtpeF0pIHtcbiAgICAgICAgY2FzZSBzdGF0ZXMuU0hJUDpcbiAgICAgICAgY2FzZSBzdGF0ZXMuV0FURVI6XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgY2FzZSBzdGF0ZXMuTUlTU0VEOlxuICAgICAgICBjYXNlIHN0YXRlcy5ISVQ6XG4gICAgICAgIGNhc2Ugc3RhdGVzLlNVTks6XG4gICAgICAgIGNhc2Ugc3RhdGVzLkFST1VORF9TVU5LOlxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeSwgeCkgPT4ge1xuICAgIGNvbnN0IGhpdFNoaXAgPSBfZmluZFNoaXAoeSwgeClcbiAgICBpZiAoIWhpdFNoaXApIHtcbiAgICAgIG1pc3NlZC5wdXNoKHsgeSwgeCB9KVxuICAgICAgc3RhdGUgPSBfbWFwTWlzc2VkKFt7IHksIHggfV0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgaGl0U2VnbWVudEluZGV4ID0gZmluZEluZGV4KHNlZ21lbnQgPT4gc2VnbWVudC55ID09PSB5ICYmIHNlZ21lbnQueCA9PT0geCwgaGl0U2hpcC5zZWdtZW50cylcbiAgICBoaXRTaGlwLmhpdChoaXRTZWdtZW50SW5kZXgpXG4gICAgaWYgKGhpdFNoaXAuaXNTdW5rKCkpIHtcbiAgICAgIHN0YXRlID0gX21hcFN1bmsoaGl0U2hpcC5zZWdtZW50cylcbiAgICAgIHN0YXRlID0gX21hcEFyb3VuZChnZXRBcmVhQXJvdW5kU3VuaygpKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZSA9IF9tYXBIaXQoW3sgeSwgeCB9XSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRBdHRhY2tTdGF0dXMgPSAoeSwgeCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IHsgeSwgeCB9XG4gICAgY29uc3QgYXR0YWNrZWRDZWxsID0gX2dldENlbGxTdGF0ZSh5LCB4KVxuICAgIGxldCBzaGlwXG4gICAgbGV0IHN0YXR1c1xuICAgIHN3aXRjaCAoYXR0YWNrZWRDZWxsKSB7XG4gICAgICBjYXNlIHN0YXRlcy5NSVNTRUQ6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgdmFsdWU6ICdtaXNzZWQnIH0sIGNvb3JkcylcbiAgICAgIGNhc2Ugc3RhdGVzLkhJVDpcbiAgICAgIGNhc2Ugc3RhdGVzLlNVTks6XG4gICAgICAgIHNoaXAgPSBfZmluZFNoaXAoeSwgeClcbiAgICAgICAgc3RhdHVzID0geyB2YWx1ZTogJ2hpdCcsIHNoaXA6IHNoaXAudHlwZSB9XG4gICAgICAgIHJldHVybiBzaGlwLmlzU3VuaygpXG4gICAgICAgICAgPyBPYmplY3QuYXNzaWduKHN0YXR1cywgY29vcmRzLCB7IHNoaXBTdGF0dXM6ICdkZXN0cm95ZWQnIH0pXG4gICAgICAgICAgOiBPYmplY3QuYXNzaWduKHN0YXR1cywgY29vcmRzLCB7IHNoaXBTdGF0dXM6ICdkYW1hZ2VkJyB9KVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyB2YWx1ZTogYXR0YWNrZWRDZWxsIH0sIGNvb3JkcylcbiAgICB9XG4gIH1cblxuICBjb25zdCBzZXRQbGFuZSA9IChuZXdQbGFuZSkgPT4geyBwbGFuZSA9IG5ld1BsYW5lIH1cblxuICByZXR1cm4ge1xuICAgIGdldCBzdGF0ZSAoKSB7IHJldHVybiBzdGF0ZSB9LFxuICAgIGdldCBmbGVldCAoKSB7IHJldHVybiBmbGVldCB9LFxuICAgIGdldCBtaXNzZWQgKCkgeyByZXR1cm4gbWlzc2VkIH0sXG4gICAgaXNWYWxpZEZvclBsYWNlLFxuICAgIHBsYWNlLFxuICAgIGlzVmFsaWRUYXJnZXQsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRBdHRhY2tTdGF0dXMsXG4gICAgZ2V0QXJlYUFyb3VuZFN1bmssXG4gICAgaXNGbGVldFN1bmssXG4gICAgc2V0UGxhbmVcbiAgfVxufVxuXG5leHBvcnQgeyBfY3JlYXRlR2FtZWJvYXJkIH1cbiIsIi8qIEZhY3RvcnkgZm9yIHBsYXllciBvYmplY3RzLlxuICogUGxheWVycyBoYXZlIG5hbWUsIHR1cm4gcHJlY2VkZW5jZSwgY2FuIGF0dGFjayBvdGhlciBib2FyZHMsIGhhdmUgdHlwZXMuICovXG5cbmNvbnN0IFBsYXllciA9IChuYW1lLCBpc0ZpcnN0KSA9PiB7XG4gIGNvbnN0IHR5cGUgPSBpc0ZpcnN0ID8gJ3BsYXllcicgOiAnY29tcHV0ZXInXG4gIGxldCB0dXJuID0gaXNGaXJzdFxuXG4gIGNvbnN0IGNoYW5nZVR1cm4gPSAoKSA9PiB7IHR1cm4gPSAhdHVybiB9XG5cbiAgY29uc3QgYXR0YWNrID0gKGJvYXJkLCB5LCB4KSA9PiB7XG4gICAgYm9hcmQucmVjZWl2ZUF0dGFjayh5LCB4KVxuICAgIGNvbnN0IHN0YXR1cyA9IGJvYXJkLmdldEF0dGFja1N0YXR1cyh5LCB4KVxuICAgIGlmIChzdGF0dXMudmFsdWUgIT09ICdoaXQnKSB7XG4gICAgICBjaGFuZ2VUdXJuKClcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldCBuYW1lICgpIHsgcmV0dXJuIG5hbWUgfSxcbiAgICBnZXQgdHlwZSAoKSB7IHJldHVybiB0eXBlIH0sXG4gICAgZ2V0IHR1cm4gKCkgeyByZXR1cm4gdHVybiB9LFxuICAgIGF0dGFjayxcbiAgICBjaGFuZ2VUdXJuXG4gIH1cbn1cblxuZXhwb3J0IHsgUGxheWVyIH1cbiIsIi8qIEZhY3RvcnkgZm9yIHRoZSBzaGlwIG9iamVjdHMuXG4gKiBTaGlwcyBoYXZlIHR5cGVzLCBzZWdtZW50cywgY2FuIGJlIGhpdCBhbmQgc3VuayAqL1xuXG5jb25zdCBfdHlwZXMgPSB7XG4gIDE6ICdQYXRyb2wgYm9hdCcsXG4gIDI6ICdEZXN0cm95ZXInLFxuICAzOiAnQ3J1aXNlcicsXG4gIDQ6ICdCYXR0bGVzaGlwJyxcbiAgNTogJ0NhcnJpZXInXG59XG5cbmNvbnN0IF9zZWdtZW50c0NyZWF0b3IgPSB7XG4gIGhvcml6b250YWxseSAoeSwgeCwgc2l6ZSkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgc2VnbWVudHNbaV0gPSB7IHksIHg6ICh4ICsgaSksIGludGFjdDogdHJ1ZSB9XG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50c1xuICB9LFxuICB2ZXJ0aWNhbGx5ICh5LCB4LCBzaXplKSB7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBzZWdtZW50c1tpXSA9IHsgeTogKHkgKyBpKSwgeCwgaW50YWN0OiB0cnVlIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlZ21lbnRzXG4gIH1cbn1cblxuY29uc3QgU2hpcCA9ICh5LCB4LCBzaXplLCBwbGFuZSkgPT4ge1xuICBjb25zdCB0eXBlID0gX3R5cGVzW3NpemVdXG4gIGlmICh0eXBlID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignSW1wcm9wZXIgc2hpcCBzaXplJylcblxuICBjb25zdCBzZWdtZW50cyA9IF9zZWdtZW50c0NyZWF0b3JbcGxhbmVdKHksIHgsIHNpemUpXG5cbiAgY29uc3QgaGl0ID0gKHNlZ21lbnQpID0+IHsgc2VnbWVudHNbc2VnbWVudF0uaW50YWN0ID0gZmFsc2UgfVxuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHNlZ21lbnRzLmV2ZXJ5KChzZWdtZW50KSA9PiBzZWdtZW50LmludGFjdCA9PT0gZmFsc2UpXG5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGdldCBzaXplICgpIHsgcmV0dXJuIHNpemUgfSxcbiAgICBnZXQgdHlwZSAoKSB7IHJldHVybiB0eXBlIH0sXG4gICAgZ2V0IHNlZ21lbnRzICgpIHsgcmV0dXJuIHNlZ21lbnRzIH1cbiAgfVxufVxuXG5leHBvcnQgeyBTaGlwIH1cbiIsImltcG9ydCB7IGV2ZW50cyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudF90eXBlcydcbmltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tICcuLi91dGlscy9ldmVudHNfaGFuZGxlcidcbmltcG9ydCB7IGRvbUJvYXJkIH0gZnJvbSAnLi4vdWkvZG9tX2JvYXJkJ1xuaW1wb3J0IHsgcXVlcnlEb2N1bWVudCB9IGZyb20gJy4uL3VpL2RvbV9mdW5jcydcblxuLyogYm9hcmRzSGFuZGxlciBjb250cm9scyB0aGUgYm9hcmRzOiBoaWdobGlnaHRzIHNoaXBzLCBzZW5kIGNvb3JkcyB0b1xuICogZ2FtZSBoYW5kbGVyIGZvciB2YWxpZGF0aW9uLCBhdHRhY2hlcyB0byBib2FyZHMgZXZlbnQgbGlzdGVuZXJzLFxuICogcmVuZGVycyB0aGUgYm9hcmRzIGFmdGVyIHBsYXllciBhbmQgY29tcHV0ZXIgYXR0YWNrcyAqL1xuXG5jb25zdCBib2FyZHNIYW5kbGVyID0gKCgpID0+IHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBxdWVyeURvY3VtZW50KCcjcGxheWVyLWJvYXJkJylcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IHF1ZXJ5RG9jdW1lbnQoJyNjb21wdXRlci1ib2FyZCcpXG5cbiAgY29uc3QgcmVuZGVyUGxheWVyID0gZG9tQm9hcmQucmVuZGVyQm9hcmQocGxheWVyQm9hcmQsIGZhbHNlKVxuICBjb25zdCByZW5kZXJDb21wdXRlciA9IGRvbUJvYXJkLnJlbmRlckJvYXJkKGNvbXB1dGVyQm9hcmQsIHRydWUpXG5cbiAgY29uc3QgY3JlYXRlQm9hcmRzID0gKCkgPT4ge1xuICAgIGRvbUJvYXJkLmNyZWF0ZUJvYXJkKGZhbHNlLCBwbGF5ZXJCb2FyZClcbiAgICBkb21Cb2FyZC5jcmVhdGVCb2FyZCh0cnVlLCBjb21wdXRlckJvYXJkKVxuICB9XG5cbiAgY29uc3QgcmVzZXRCb2FyZHMgPSAocGxhbmUpID0+IHtcbiAgICBkb21Cb2FyZC5yZWNyZWF0ZUJvYXJkKGZhbHNlLCBwbGF5ZXJCb2FyZClcbiAgICBkb21Cb2FyZC5yZWNyZWF0ZUJvYXJkKHRydWUsIGNvbXB1dGVyQm9hcmQpXG4gICAgZG9tQm9hcmQuc2V0UGxhbmUocGxhbmUpXG4gIH1cblxuICBjb25zdCBzZW5kQ29vcmRzRm9yVmFsaWRhdGlvbiA9IChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICBjb25zdCBjb29yZHMgPSBkb21Cb2FyZC5leHRyYWN0Q29vcmRzKGUudGFyZ2V0KVxuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5CT0FSRF9IT1ZFUkVELCBjb29yZHMpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgaGlnaHRsaWdodFZhbGlkYXRlZENvb3JkcyA9IChkYXRhKSA9PiB7XG4gICAgZG9tQm9hcmQuaGlnaGxpZ2h0RnV0dXJlU2hpcCguLi5kYXRhKVxuICB9XG5cbiAgY29uc3Qgc2VuZFNoaXBGb3JWYWxpZGF0aW9uID0gKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IGRvbUJvYXJkLmV4dHJhY3RDb29yZHMoZS50YXJnZXQpXG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkJPQVJEX0NMSUNLRUQsIGNvb3JkcylcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVZhbGlkYXRlZFNoaXAgPSAoeyBzaGlwIH0pID0+IHtcbiAgICBkb21Cb2FyZC5wbGFjZSguLi5zaGlwKVxuICB9XG5cbiAgY29uc3QgcmVuZGVyQ29tcHV0ZXJTdGF0ZSA9ICh7IHN0YXRlIH0pID0+IHtcbiAgICByZW5kZXJDb21wdXRlcihzdGF0ZSlcbiAgfVxuXG4gIGNvbnN0IHJlbmRlclBsYXllclN0YXRlID0gKHsgc3RhdGUgfSkgPT4ge1xuICAgIHJlbmRlclBsYXllcihzdGF0ZSlcbiAgfVxuXG4gIGNvbnN0IHNlbmRBdHRhY2tlZENvb3JkcyA9IChlKSA9PiB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICBjb25zdCBjb29yZHMgPSBkb21Cb2FyZC5leHRyYWN0Q29vcmRzKGUudGFyZ2V0KVxuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5DT01QVVRFUl9CT0FSRF9DTElDS0VELCBjb29yZHMpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY2hhbmdlUGxhbmUgPSAocGxhbmUpID0+IHtcbiAgICBkb21Cb2FyZC5zZXRQbGFuZShwbGFuZSlcbiAgfVxuXG4gIGNvbnN0IGluaXRCb2FyZHMgPSAoKSA9PiB7XG4gICAgY3JlYXRlQm9hcmRzKClcbiAgICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBzZW5kQ29vcmRzRm9yVmFsaWRhdGlvbilcbiAgICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbmRTaGlwRm9yVmFsaWRhdGlvbilcbiAgICBwbGF5ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZG9tQm9hcmQuY2xlYXJIaWdobGlnaHRzKVxuICAgIGNvbXB1dGVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZW5kQXR0YWNrZWRDb29yZHMpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuU0hJUF9WQUxJREFURUQsIGhpZ2h0bGlnaHRWYWxpZGF0ZWRDb29yZHMpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuU0hJUF9QTEFDRUQsIHBsYWNlVmFsaWRhdGVkU2hpcClcbiAgICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5TSElQX1JPVEFURUQsIGNoYW5nZVBsYW5lKVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLkNPTVBVVEVSX0ZJTklTSEVEX1RVUk4sIHJlbmRlclBsYXllclN0YXRlKVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLkdBTUVfUkVTVEFSVEVELCByZXNldEJvYXJkcylcbiAgICBldmVudHNIYW5kbGVyLm9uRWFjaChbZXZlbnRzLkNPTVBVVEVSX1BMQUNFRF9TSElQUywgZXZlbnRzLkNPTVBVVEVSX0JPQVJEX0FUVEFDS0VEXSwgcmVuZGVyQ29tcHV0ZXJTdGF0ZSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdEJvYXJkc1xuICB9XG59KSgpXG5cbmV4cG9ydCB7IGJvYXJkc0hhbmRsZXIgfVxuIiwiaW1wb3J0IHsgZXZlbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50X3R5cGVzJ1xuaW1wb3J0IHsgZXZlbnRzSGFuZGxlciB9IGZyb20gJy4uL3V0aWxzL2V2ZW50c19oYW5kbGVyJ1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi4vZmFjdG9yaWVzL3BsYXllcidcbmltcG9ydCB7IEFpUGxheWVyIH0gZnJvbSAnLi4vZmFjdG9yaWVzL2FpX3BsYXllcidcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4uL2ZhY3Rvcmllcy9nYW1lYm9hcmQnXG5pbXBvcnQgeyBBaUdhbWVib2FyZCB9IGZyb20gJy4uL2ZhY3Rvcmllcy9haV9nYW1lYm9hcmQnXG5pbXBvcnQgeyBkZWxheSB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcl9mdW5jcydcblxuLyogZ2FtZUhhbmRsZXIgY29udHJvbHMgdGhlIGZsb3cgb2YgdGhlIGdhbWU6IHZhbGlkYXRlcyBkYXRhXG4gKiBzZW50IGZyb20gbWVudUhhbmRsZXIgYW5kIGJvYXJkc0hhbmRsZXIgYW5kIHVzZXMgbWV0aG9kcyBvZiBhbGxcbiAqIHJlbGV2YW50IGZvciB0aGUgZ2FtZSBmYWN0b3JpZXMgZm9yIHZpcnR1YWwgYm9hcmQgbWFuaXB1bGF0aW9uICovXG5cbmNvbnN0IGdhbWVIYW5kbGVyID0gKCgpID0+IHtcbiAgbGV0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKClcbiAgbGV0IGNvbXB1dGVyQm9hcmQgPSBBaUdhbWVib2FyZCgpXG4gIGxldCBzaGlwc1RvUGxhY2UgPSBbNSwgNCwgMywgMywgMiwgMiwgMSwgMV1cbiAgbGV0IHBsYXllclxuICBsZXQgY29tcHV0ZXJcbiAgbGV0IGdhbWVTdGFydGVkID0gZmFsc2VcbiAgbGV0IGdhbWVFbmRlZCA9IGZhbHNlXG5cbiAgY29uc3QgdmFsaWRhdGVDb29yZHMgPSAoY29vcmRzKSA9PiB7XG4gICAgaWYgKHNoaXBzVG9QbGFjZS5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGNvbnN0IFt5LCB4XSA9IGNvb3Jkc1xuICAgIGNvbnN0IG5leHRTaGlwU2l6ZSA9IHNoaXBzVG9QbGFjZVswXVxuICAgIGNvbnN0IGlzVmFsaWQgPSBwbGF5ZXJCb2FyZC5pc1ZhbGlkRm9yUGxhY2UoeSwgeCwgbmV4dFNoaXBTaXplKVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuU0hJUF9WQUxJREFURUQsIFt5LCB4LCBuZXh0U2hpcFNpemUsIGlzVmFsaWRdKVxuICB9XG5cbiAgY29uc3QgdmFsaWRhdGVQbGFjZW1lbnQgPSAoY29vcmRzKSA9PiB7XG4gICAgaWYgKHNoaXBzVG9QbGFjZS5sZW5ndGggPT09IDApIHJldHVyblxuICAgIGNvbnN0IFt5LCB4XSA9IGNvb3Jkc1xuICAgIGNvbnN0IG5leHRTaGlwU2l6ZSA9IHNoaXBzVG9QbGFjZVswXVxuICAgIGNvbnN0IGlzVmFsaWQgPSBwbGF5ZXJCb2FyZC5pc1ZhbGlkRm9yUGxhY2UoeSwgeCwgbmV4dFNoaXBTaXplKVxuICAgIGlmICghaXNWYWxpZCkgcmV0dXJuXG4gICAgY29uc3Qgc2hpcCA9IHBsYXllckJvYXJkLnBsYWNlKHksIHgsIG5leHRTaGlwU2l6ZSlcbiAgICBzaGlwc1RvUGxhY2Uuc2hpZnQoKVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcbiAgICAgIGV2ZW50cy5TSElQX1BMQUNFRCxcbiAgICAgIHtcbiAgICAgICAgc2hpcDogW3ksIHgsIG5leHRTaGlwU2l6ZV0sXG4gICAgICAgIHNoaXBUeXBlOiBzaGlwLnR5cGUsXG4gICAgICAgIGFyZVNoaXBzUGxhY2VkOiBzaGlwc1RvUGxhY2UubGVuZ3RoID09PSAwXG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgY29uc3Qgc3RhcnRHYW1lID0gKG5hbWUpID0+IHtcbiAgICBnYW1lU3RhcnRlZCA9IHRydWVcbiAgICBwbGF5ZXIgPSBQbGF5ZXIobmFtZSwgdHJ1ZSlcbiAgICBjb21wdXRlciA9IEFpUGxheWVyKClcbiAgICBjb21wdXRlckJvYXJkLnBsYWNlRmxlZXQoNSlcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkNPTVBVVEVSX1BMQUNFRF9TSElQUywgeyBzdGF0ZTogY29tcHV0ZXJCb2FyZC5zdGF0ZSB9KVxuICB9XG5cbiAgY29uc3QgcmVzdGFydEdhbWUgPSAocGxhbmUpID0+IHtcbiAgICBzaGlwc1RvUGxhY2UgPSBbNSwgNCwgMywgMywgMiwgMiwgMSwgMV1cbiAgICBnYW1lU3RhcnRlZCA9IGZhbHNlXG4gICAgZ2FtZUVuZGVkID0gZmFsc2VcbiAgICBwbGF5ZXJCb2FyZCA9IEdhbWVib2FyZCgpXG4gICAgY29tcHV0ZXJCb2FyZCA9IEFpR2FtZWJvYXJkKClcbiAgICBwbGF5ZXJCb2FyZC5zZXRQbGFuZShwbGFuZSlcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZVBsYXllckF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICBpZiAoIWdhbWVTdGFydGVkIHx8IGdhbWVFbmRlZCB8fCAhcGxheWVyLnR1cm4gfHwgIWNvbXB1dGVyQm9hcmQuaXNWYWxpZFRhcmdldCguLi5jb29yZHMpKSByZXR1cm5cbiAgICBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyQm9hcmQsIC4uLmNvb3JkcylcbiAgICBjb25zdCBzdGF0dXMgPSBjb21wdXRlckJvYXJkLmdldEF0dGFja1N0YXR1cyguLi5jb29yZHMpXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKFxuICAgICAgZXZlbnRzLkNPTVBVVEVSX0JPQVJEX0FUVEFDS0VELFxuICAgICAgeyBzdGF0ZTogY29tcHV0ZXJCb2FyZC5zdGF0ZSwgc3RhdHVzLCBwbGF5ZXIgfVxuICAgIClcbiAgICBpZiAoIXBsYXllci50dXJuKSB7XG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLlBMQVlFUl9GSU5JU0hFRF9UVVJOLCBudWxsKVxuICAgIH1cbiAgICBpZiAoY29tcHV0ZXJCb2FyZC5pc0ZsZWV0U3VuaygpKSB7XG4gICAgICBnYW1lRW5kZWQgPSB0cnVlXG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkdBTUVfRU5ERUQsIHBsYXllci5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGhhbmRsZUNvbXB1dGVyQXR0YWNrID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChwbGF5ZXJCb2FyZC5pc0ZsZWV0U3VuaygpKSB7XG4gICAgICBnYW1lRW5kZWQgPSB0cnVlXG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkdBTUVfRU5ERUQsIGNvbXB1dGVyLm5hbWUpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgYXdhaXQgZGVsYXkoNDAwKVxuICAgIGNvbnN0IHN0YXR1cyA9IGNvbXB1dGVyLmF0dGFja1BsYXllcihwbGF5ZXJCb2FyZClcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXG4gICAgICBldmVudHMuQ09NUFVURVJfRklOSVNIRURfVFVSTixcbiAgICAgIHsgc3RhdGU6IHBsYXllckJvYXJkLnN0YXRlLCBzdGF0dXMsIHBsYXllcjogY29tcHV0ZXIgfVxuICAgIClcbiAgICBpZiAoc3RhdHVzLnZhbHVlID09PSAnaGl0Jykge1xuICAgICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5QTEFZRVJfRklOSVNIRURfVFVSTiwgbnVsbClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBwbGF5ZXIuY2hhbmdlVHVybigpXG4gIH1cblxuICBjb25zdCBjaGFuZ2VQbGFuZSA9IChwbGFuZSkgPT4ge1xuICAgIHBsYXllckJvYXJkLnNldFBsYW5lKHBsYW5lKVxuICB9XG5cbiAgY29uc3QgdmFsaWRhdGVSZXN0YXJ0ID0gKCkgPT4gZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5SRVNUQVJUX1ZBTElEQVRFRCwgeyB0dXJuOiBwbGF5ZXIudHVybiwgZW5kZWQ6IGdhbWVFbmRlZCB9KVxuXG4gIGNvbnN0IGluaXRHYW1lID0gKCkgPT4ge1xuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLkJPQVJEX0hPVkVSRUQsIHZhbGlkYXRlQ29vcmRzKVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLkJPQVJEX0NMSUNLRUQsIHZhbGlkYXRlUGxhY2VtZW50KVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLlNISVBfUk9UQVRFRCwgY2hhbmdlUGxhbmUpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuR0FNRV9TVEFSVEVELCBzdGFydEdhbWUpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuUkVTVEFSVF9SRVFVRVNURUQsIHZhbGlkYXRlUmVzdGFydClcbiAgICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5HQU1FX1JFU1RBUlRFRCwgcmVzdGFydEdhbWUpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuQ09NUFVURVJfQk9BUkRfQ0xJQ0tFRCwgaGFuZGxlUGxheWVyQXR0YWNrKVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLlBMQVlFUl9GSU5JU0hFRF9UVVJOLCBoYW5kbGVDb21wdXRlckF0dGFjaylcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdEdhbWVcbiAgfVxufSkoKVxuXG5leHBvcnQgeyBnYW1lSGFuZGxlciB9XG4iLCJpbXBvcnQgeyBldmVudHMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRfdHlwZXMnXG5pbXBvcnQgeyBldmVudHNIYW5kbGVyIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzX2hhbmRsZXInXG5pbXBvcnQgeyBwaXBlIH0gZnJvbSAnLi4vdXRpbHMvZnVuY19oZWxwZXJzJ1xuaW1wb3J0IHsgd3JhcEluRGl2LCBxdWVyeURvY3VtZW50LCBhZGRDbGFzcywgcmVtb3ZlQ2xhc3MsIHJlcGxhY2VFbCwgY2xvbmVFbCwgY3JlYXRlRWwsIGFkZElkLCBhZGRUZXh0IH0gZnJvbSAnLi4vdWkvZG9tX2Z1bmNzJ1xuXG4vKiBtZW51SGFuZGxlciBjb250cm9scyB0aGUgbWVudTogZGlzYWJsZXMsIGhpZGVzIGFuZCBzaG93cyBtZW51IGVsZW1lbnRzLFxuICogYXR0YWNoZXMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZW0sIGNvbnRyb2xzIGxvZ3MsIGdpdmVzIHRoZSB1c2VyIGFiaWxpdHlcbiAqIHRvIHN0YXJ0LCByZXN0YXJ0IG1lbnUsIHRvIGlucHV0IHRoZWlyIG5hbWUgKi9cblxuY29uc3QgbWVudUhhbmRsZXIgPSAoKCkgPT4ge1xuICBjb25zdCBzdGFydEJ0biA9IHF1ZXJ5RG9jdW1lbnQoJyNzdGFydC1nYW1lJylcbiAgY29uc3QgcmVzdGFydEJ0biA9IHF1ZXJ5RG9jdW1lbnQoJyNyZXN0YXJ0LWdhbWUnKVxuICBjb25zdCBuYW1lSW5wID0gcXVlcnlEb2N1bWVudCgnI3BsYXllci1uYW1lJylcbiAgY29uc3Qgcm90YXRlQnRuID0gcXVlcnlEb2N1bWVudCgnI3JvdGF0ZScpXG4gIGNvbnN0IGxvZ0RpdiA9IHF1ZXJ5RG9jdW1lbnQoJyNsb2cnKVxuICBsZXQgaGludHNEaXYgPSBxdWVyeURvY3VtZW50KCcjaGludHMnKVxuXG4gIGxldCBzaGlwc1BsYWNlZCA9IGZhbHNlXG4gIGxldCBtc2dDb3VudCA9IDBcblxuICBjb25zdCBfaGlkZSA9IChlbCkgPT4gYWRkQ2xhc3MoJ2Rpc3BsYXktbm9uZScsIGVsKVxuXG4gIGNvbnN0IF9zaG93ID0gKGVsKSA9PiByZW1vdmVDbGFzcygnZGlzcGxheS1ub25lJywgZWwpXG5cbiAgY29uc3QgX3JlcGxhY2VIaW50cyA9IChtc2cpID0+IHBpcGUoXG4gICAgY3JlYXRlRWwoWydoaW50cyddKSxcbiAgICBhZGRJZCgnaGludHMnKSxcbiAgICBhZGRUZXh0KG1zZyksXG4gICAgcmVwbGFjZUVsKGhpbnRzRGl2KVxuICApKCdkaXYnKVxuXG4gIGNvbnN0IGhhbmRsZVN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1zZyA9IGBHb29kIGx1Y2ssIEFkbWlyYWwgJHtuYW1lSW5wLnZhbHVlfSFgXG4gICAgaGludHNEaXYgPSBfcmVwbGFjZUhpbnRzKG1zZylcbiAgICA7W3N0YXJ0QnRuLCByb3RhdGVCdG5dLmZvckVhY2goX2hpZGUpXG4gICAgX3Nob3cocmVzdGFydEJ0bilcbiAgICBuYW1lSW5wLmRpc2FibGVkID0gdHJ1ZVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuR0FNRV9TVEFSVEVELCBuYW1lSW5wLnZhbHVlKVxuICB9XG5cbiAgY29uc3QgaGFuZGxlRW5kID0gKG5hbWUpID0+IHsgaGludHNEaXYuaW5uZXJUZXh0ID0gYCR7bmFtZX0gd29uIWAgfVxuXG4gIGNvbnN0IHJlcXVlc3RSZXN0YXJ0ID0gKCkgPT4gZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5SRVNUQVJUX1JFUVVFU1RFRClcblxuICBjb25zdCBoYW5kbGVSZXN0YXJ0ID0gKHsgdHVybiwgZW5kZWQgfSkgPT4ge1xuICAgIGlmICghKHR1cm4gfHwgZW5kZWQpKSByZXR1cm5cbiAgICBjb25zdCBtc2cgPSBgV2VsY29tZSBiYWNrLCBBZG1pcmFsICR7bmFtZUlucC52YWx1ZX0hYFxuICAgIGhpbnRzRGl2ID0gX3JlcGxhY2VIaW50cyhtc2cpXG4gICAgO1tzdGFydEJ0biwgcm90YXRlQnRuXS5mb3JFYWNoKF9zaG93KVxuICAgIF9oaWRlKHJlc3RhcnRCdG4pXG4gICAgc2hpcHNQbGFjZWQgPSBmYWxzZVxuICAgIG5hbWVJbnAuZGlzYWJsZWQgPSBmYWxzZVxuICAgIG1zZ0NvdW50ID0gMFxuICAgIGNoZWNrU3RhcnRDb25kaXRpb25zKClcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkdBTUVfUkVTVEFSVEVELCByb3RhdGVCdG4uZGF0YXNldC5wbGFuZSlcbiAgfVxuXG4gIGNvbnN0IHJvdGF0ZSA9ICgpID0+IHtcbiAgICBpZiAocm90YXRlQnRuLmRhdGFzZXQucGxhbmUgPT09ICd2ZXJ0aWNhbGx5Jykge1xuICAgICAgcm90YXRlQnRuLmRhdGFzZXQucGxhbmUgPSAnaG9yaXpvbnRhbGx5J1xuICAgICAgcm90YXRlQnRuLmlubmVyVGV4dCA9ICdIb3Jpem9udGFsJ1xuICAgIH0gZWxzZSBpZiAocm90YXRlQnRuLmRhdGFzZXQucGxhbmUgPT09ICdob3Jpem9udGFsbHknKSB7XG4gICAgICByb3RhdGVCdG4uZGF0YXNldC5wbGFuZSA9ICd2ZXJ0aWNhbGx5J1xuICAgICAgcm90YXRlQnRuLmlubmVyVGV4dCA9ICdWZXJ0aWNhbCdcbiAgICB9XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5TSElQX1JPVEFURUQsIHJvdGF0ZUJ0bi5kYXRhc2V0LnBsYW5lKVxuICB9XG5cbiAgY29uc3QgY2hlY2tTdGFydENvbmRpdGlvbnMgPSAoKSA9PiB7XG4gICAgc3RhcnRCdG4uZGlzYWJsZWQgPSAhKG5hbWVJbnAudmFsdWUgJiYgc2hpcHNQbGFjZWQpXG4gIH1cblxuICBjb25zdCBjaGVja1NoaXBzUmVhZGluZXNzID0gKHsgYXJlU2hpcHNQbGFjZWQsIHNoaXBUeXBlIH0pID0+IHtcbiAgICAoYXJlU2hpcHNQbGFjZWQpXG4gICAgICA/IHNoaXBzUGxhY2VkID0gdHJ1ZVxuICAgICAgOiBzaGlwc1BsYWNlZCA9IGZhbHNlXG4gICAgY2hlY2tTdGFydENvbmRpdGlvbnMoKVxuICAgIGhpbnRzRGl2LmlubmVyVGV4dCA9IGAke3NoaXBUeXBlfSBoYXMgYmVlbiBwbGFjZWQuYFxuICB9XG5cbiAgY29uc3QgX2NyZWF0ZUxvZ01lc3NhZ2UgPSAoc3RhdHVzLCBwbGF5ZXIpID0+IHtcbiAgICBjb25zdCBsb2dDbGFzcyA9IGBsb2ctJHtwbGF5ZXIudHlwZX0tJHtzdGF0dXMuc2hpcFN0YXR1cyB8fCBzdGF0dXMudmFsdWV9YFxuICAgIGxldCBtc2cgPSBgVHVybiAkeysrbXNnQ291bnR9LiB5JHtzdGF0dXMueX0geSR7c3RhdHVzLnh9YFxuICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdtaXNzZWQnKSB7XG4gICAgICBtc2cgKz0gYCAke3BsYXllci5uYW1lfSBtaXNzZWQuLi5gXG4gICAgfVxuICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdoaXQnKSB7XG4gICAgICBtc2cgKz0gYCAke3BsYXllci5uYW1lfSAke3N0YXR1cy5zaGlwU3RhdHVzfSAke3N0YXR1cy5zaGlwfSFgXG4gICAgfVxuICAgIHJldHVybiB3cmFwSW5EaXYobXNnLCBbbG9nQ2xhc3NdKVxuICB9XG5cbiAgY29uc3QgZGlzcGxheUxvZ01lc3NhZ2UgPSAoeyBzdGF0dXMsIHBsYXllciB9KSA9PiB7XG4gICAgY29uc3QgbG9nID0gX2NyZWF0ZUxvZ01lc3NhZ2Uoc3RhdHVzLCBwbGF5ZXIpXG4gICAgY29uc3QgaGludCA9IGNsb25lRWwobG9nKVxuICAgIGhpbnQuaWQgPSAnaGludHMnXG4gICAgbG9nRGl2LnByZXBlbmQobG9nKVxuICAgIGhpbnRzRGl2ID0gcmVwbGFjZUVsKGhpbnRzRGl2LCBoaW50KVxuICB9XG5cbiAgY29uc3QgaW5pdE1lbnUgPSAoKSA9PiB7XG4gICAgY2hlY2tTdGFydENvbmRpdGlvbnMoKVxuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU3RhcnQpXG4gICAgcmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcXVlc3RSZXN0YXJ0KVxuICAgIHJvdGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSlcbiAgICBuYW1lSW5wLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tTdGFydENvbmRpdGlvbnMpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuU0hJUF9QTEFDRUQsIGNoZWNrU2hpcHNSZWFkaW5lc3MpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuR0FNRV9FTkRFRCwgaGFuZGxlRW5kKVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLlJFU1RBUlRfVkFMSURBVEVELCBoYW5kbGVSZXN0YXJ0KVxuICAgIGV2ZW50c0hhbmRsZXIub25FYWNoKFtldmVudHMuQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQsIGV2ZW50cy5DT01QVVRFUl9GSU5JU0hFRF9UVVJOXSwgZGlzcGxheUxvZ01lc3NhZ2UpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXRNZW51XG4gIH1cbn0pKClcblxuZXhwb3J0IHsgbWVudUhhbmRsZXIgfVxuIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5pbXBvcnQgeyBhZGRDbGFzcywgY2xlYXJFbENvbnRlbnQsIHJlbW92ZUNsYXNzIH0gZnJvbSAnLi9kb21fZnVuY3MnXG5pbXBvcnQgeyBzdGF0ZXMgfSBmcm9tICcuLi9jb25zdGFudHMvY2VsbF9zdGF0ZXMnXG5cbmNvbnN0IF9jZWxsVGFibGUgPSB7XG4gIHM6ICdzaGlwJyxcbiAgdzogJ3dhdGVyJyxcbiAgaDogJ2hpdCcsXG4gIG06ICdtaXNzJyxcbiAgeDogJ3N1bmsnLFxuICBhOiAnYXJvdW5kLXN1bmsnXG59XG5cbmNvbnN0IF9jcmVhdGVDZWxsID0gKGlzSGlkZGVuLCB5LCB4KSA9PiB7XG4gIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKVxuICBjZWxsLmRhdGFzZXQueSA9IHlcbiAgY2VsbC5kYXRhc2V0LnggPSB4XG4gIGNlbGwuY2xhc3NMaXN0LmFkZCgnd2F0ZXInKVxuICBpZiAoaXNIaWRkZW4pIGNlbGwuY2xhc3NMaXN0LmFkZCgnZm9nLW9mLXdhcicpXG4gIHJldHVybiBjZWxsXG59XG5cbmNvbnN0IF9jZWxsc0ZpbmRlciA9IHtcbiAgaG9yaXpvbnRhbGx5ICh5LCB4LCBzaXplKSB7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBbXVxuICAgIGNvbnN0IHRhaWwgPSB4ICsgc2l6ZVxuICAgIGZvciAobGV0IGkgPSB4OyBpIDwgdGFpbDsgaSsrKSB7XG4gICAgICBzZWdtZW50cy5wdXNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXk9JyR7eX0nXVtkYXRhLXg9JyR7aX0nXWApKVxuICAgIH1cbiAgICByZXR1cm4gc2VnbWVudHNcbiAgfSxcbiAgdmVydGljYWxseSAoeSwgeCwgc2l6ZSkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gW11cbiAgICBjb25zdCB0YWlsID0geSArIHNpemVcbiAgICBmb3IgKGxldCBpID0geTsgaSA8IHRhaWw7IGkrKykge1xuICAgICAgc2VnbWVudHMucHVzaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS15PScke2l9J11bZGF0YS14PScke3h9J11gKSlcbiAgICB9XG4gICAgcmV0dXJuIHNlZ21lbnRzXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRvbUJvYXJkID0gKCgpID0+IHtcbiAgbGV0IHBsYW5lID0gJ2hvcml6b250YWxseSdcblxuICBjb25zdCBleHRyYWN0Q29vcmRzID0gKGNlbGwpID0+XG4gICAgW2NlbGwuZGF0YXNldC55LCBjZWxsLmRhdGFzZXQueF0ubWFwKGNvb3JkID0+IE51bWJlcihjb29yZCkpXG5cbiAgY29uc3QgY3JlYXRlQm9hcmQgPSAoaXNIaWRkZW4sIGRvbUJvYXJkKSA9PiB7XG4gICAgZm9yIChsZXQgeSA9IDE7IHkgPCAxMTsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMTsgeCA8IDExOyB4KyspIHtcbiAgICAgICAgZG9tQm9hcmQuYXBwZW5kKF9jcmVhdGVDZWxsKGlzSGlkZGVuLCB5LCB4KSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCByZWNyZWF0ZUJvYXJkID0gKGlzSGlkZGVuLCBkb21Cb2FyZCkgPT4ge1xuICAgIGNsZWFyRWxDb250ZW50KGRvbUJvYXJkKVxuICAgIGNyZWF0ZUJvYXJkKGlzSGlkZGVuLCBkb21Cb2FyZClcbiAgfVxuXG4gIGNvbnN0IHJlbmRlckJvYXJkID0gY3VycnkoKGRvbUJvYXJkLCBpc0hpZGRlbiwgYm9hcmRTdGF0ZSkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGNlbGxTdGF0ZSA9IGJvYXJkU3RhdGVbaV1bal1cbiAgICAgICAgY29uc3QgY2VsbFZpZXcgPSBkb21Cb2FyZC5xdWVyeVNlbGVjdG9yKGBbZGF0YS15PScke2kgKyAxfSddW2RhdGEteD0nJHtqICsgMX0nXWApXG4gICAgICAgIGlmICghY2VsbFZpZXcuY2xhc3NMaXN0LmNvbnRhaW5zKF9jZWxsVGFibGVbY2VsbFN0YXRlXSkpIGFkZENsYXNzKF9jZWxsVGFibGVbY2VsbFN0YXRlXSwgY2VsbFZpZXcpXG4gICAgICAgIGlmIChpc0hpZGRlbiAmJiBbc3RhdGVzLk1JU1NFRCwgc3RhdGVzLkhJVCwgc3RhdGVzLlNVTkssIHN0YXRlcy5BUk9VTkRfU1VOS10uaW5jbHVkZXMoY2VsbFN0YXRlKSkge1xuICAgICAgICAgIHJlbW92ZUNsYXNzKCdmb2ctb2Ytd2FyJywgY2VsbFZpZXcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgY2xlYXJIaWdobGlnaHRzID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKVxuICAgIC5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnZnV0dXJlLXNoaXAnLCAnd3JvbmctcGxhY2VtZW50JykpXG5cbiAgY29uc3QgaGlnaGxpZ2h0RnV0dXJlU2hpcCA9ICh5LCB4LCBzaXplLCBpc1ZhbGlkKSA9PiB7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gKGlzVmFsaWQpID8gJ2Z1dHVyZS1zaGlwJyA6ICd3cm9uZy1wbGFjZW1lbnQnXG4gICAgY29uc3Qgc2VnbWVudHMgPSBfY2VsbHNGaW5kZXJbcGxhbmVdKHksIHgsIHNpemUpXG4gICAgY2xlYXJIaWdobGlnaHRzKClcbiAgICBjb25zdCB2YWxpZENlbGxzID0gc2VnbWVudHMuZmlsdGVyKChlbCkgPT4gQm9vbGVhbihlbCkpXG4gICAgdmFsaWRDZWxscy5mb3JFYWNoKChlbCkgPT4gYWRkQ2xhc3MoY2xhc3NOYW1lLCBlbCkpXG4gIH1cblxuICBjb25zdCBwbGFjZSA9ICh5LCB4LCBzaXplKSA9PiB7XG4gICAgY29uc3Qgc2VnbWVudHMgPSBfY2VsbHNGaW5kZXJbcGxhbmVdKHksIHgsIHNpemUpXG4gICAgc2VnbWVudHMuZm9yRWFjaCgoZWwpID0+IGFkZENsYXNzKCdzaGlwJywgZWwpKVxuICB9XG5cbiAgY29uc3Qgc2V0UGxhbmUgPSAobmV3UGxhbmUpID0+IHsgcGxhbmUgPSBuZXdQbGFuZSB9XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVCb2FyZCxcbiAgICByZWNyZWF0ZUJvYXJkLFxuICAgIHJlbmRlckJvYXJkLFxuICAgIHNldFBsYW5lLFxuICAgIGV4dHJhY3RDb29yZHMsXG4gICAgaGlnaGxpZ2h0RnV0dXJlU2hpcCxcbiAgICBjbGVhckhpZ2hsaWdodHMsXG4gICAgcGxhY2VcbiAgfVxufSkoKVxuIiwiaW1wb3J0IHsgY3VycnkgfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5cbmNvbnN0IHdyYXBJbkRpdiA9IGN1cnJ5KChzdHIsIGNsYXNzZXMpID0+IHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZGl2LmlubmVyVGV4dCA9IHN0clxuICBkaXYuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKVxuICByZXR1cm4gZGl2XG59KVxuXG5jb25zdCBjcmVhdGVFbCA9IGN1cnJ5KChjbGFzc2VzLCBlbGVtZW50KSA9PiB7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KVxuICBlbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpXG4gIHJldHVybiBlbFxufSlcblxuY29uc3QgYWRkSWQgPSBjdXJyeSgoaWQsIGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudC5pZCA9IGlkXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCBhZGRUZXh0ID0gY3VycnkoKHN0ciwgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LnRleHRDb250ZW50ID0gc3RyXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCBhZGRDbGFzcyA9IGN1cnJ5KChuZXdDbGFzcywgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQobmV3Q2xhc3MpXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCByZW1vdmVDbGFzcyA9IGN1cnJ5KChyZW1vdmVkLCBlbGVtZW50KSA9PiB7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShyZW1vdmVkKVxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgcmVwbGFjZUNsYXNzID0gY3VycnkoKG9sZENsYXNzLCBuZXdDbGFzcywgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC5yZXBsYWNlKG9sZENsYXNzLCBuZXdDbGFzcylcbiAgcmV0dXJuIGVsZW1lbnRcbn0pXG5cbmNvbnN0IHRvZ2dsZUNsYXNzID0gY3VycnkoKHRvZ2dsZWRDbGFzcywgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUodG9nZ2xlZENsYXNzKVxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgYWRkQ2xhc3NlcyA9IGN1cnJ5KChjbGFzc2VzLCBlbGVtZW50KSA9PiB7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKVxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgcmVtb3ZlQ2xhc3NlcyA9IGN1cnJ5KChjbGFzc2VzLCBlbGVtZW50KSA9PiB7XG4gIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzKVxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgYWRkRGF0YUF0dHIgPSBjdXJyeSgoZGF0YUF0dHIsIGRhdGFWYWwsIGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudFtkYXRhQXR0cl0gPSBkYXRhVmFsXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCBjc3NTZWxlY3RvciA9IGN1cnJ5KChlbGVtZW50LCBxdWVyeSkgPT4ge1xuICByZXR1cm4gZWxlbWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KVxufSlcblxuY29uc3QgcXVlcnlEb2N1bWVudCA9IGNzc1NlbGVjdG9yKGRvY3VtZW50KVxuXG5jb25zdCByZXBsYWNlRWwgPSBjdXJyeSgob2xkRWxlbWVudCwgbmV3RWxlbWVudCkgPT4ge1xuICBvbGRFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0VsZW1lbnQsIG9sZEVsZW1lbnQpXG4gIHJldHVybiBuZXdFbGVtZW50XG59KVxuXG5jb25zdCBjbG9uZUVsID0gY3VycnkoKGVsZW1lbnQpID0+IHtcbiAgcmV0dXJuIGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpXG59KVxuXG5jb25zdCBjbGVhckVsQ29udGVudCA9IGN1cnJ5KChlbGVtZW50KSA9PiB7XG4gIHdoaWxlIChlbGVtZW50Lmxhc3RDaGlsZCkge1xuICAgIGVsZW1lbnQubGFzdENoaWxkLnJlbW92ZSgpXG4gIH1cbiAgcmV0dXJuIGVsZW1lbnRcbn0pXG5cbmV4cG9ydCB7XG4gIHdyYXBJbkRpdixcbiAgY3JlYXRlRWwsXG4gIGFkZElkLFxuICBhZGRUZXh0LFxuICBhZGRDbGFzcyxcbiAgYWRkQ2xhc3NlcyxcbiAgcmVtb3ZlQ2xhc3MsXG4gIHJlbW92ZUNsYXNzZXMsXG4gIHJlcGxhY2VDbGFzcyxcbiAgdG9nZ2xlQ2xhc3MsXG4gIGFkZERhdGFBdHRyLFxuICBjc3NTZWxlY3RvcixcbiAgcXVlcnlEb2N1bWVudCxcbiAgcmVwbGFjZUVsLFxuICBjbG9uZUVsLFxuICBjbGVhckVsQ29udGVudFxufVxuIiwiZXhwb3J0IGNvbnN0IGV2ZW50c0hhbmRsZXIgPSAoKCkgPT4ge1xuICBjb25zdCBldmVudHMgPSB7fVxuXG4gIHJldHVybiB7XG4gICAgb24gKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0gfHwgW11cbiAgICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pXG4gICAgfSxcblxuICAgIG9uRWFjaCAoYXJyT2ZFdmVudHMsIGZuKSB7XG4gICAgICBhcnJPZkV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICBldmVudHNbZXZlbnRdID0gZXZlbnRzW2V2ZW50XSB8fCBbXVxuICAgICAgICBldmVudHNbZXZlbnRdLnB1c2goZm4pXG4gICAgICB9KVxuICAgIH0sXG5cbiAgICBvZmYgKGV2ZW50TmFtZSwgcmVtb3ZlZEZuKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXS5maWx0ZXIoKGZuKSA9PiBmbiAhPT0gcmVtb3ZlZEZuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB0cmlnZ2VyIChldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKChmbikgPT4gZm4oZGF0YSkpXG4gICAgICB9XG4gICAgfVxuICB9XG59KSgpXG4iLCJjb25zdCBjdXJyeSA9IChmbikgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24gY3VycmllZCAoLi4uYXJncykge1xuICAgIGlmIChmbi5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY3VycmllZC5iaW5kKG51bGwsIC4uLmFyZ3MpXG4gICAgfVxuICAgIHJldHVybiBmbiguLi5hcmdzKVxuICB9XG59XG5cbmNvbnN0IGNoZWNrVHJ1dGhpbmVzcyA9IChlbCkgPT4gQm9vbGVhbihlbClcblxuY29uc3QgY2hlY2tGYWxzaW5lc3MgPSAoZWwpID0+ICFlbFxuXG5jb25zdCBoYXNUcnV0aHlWYWx1ZXMgPSAoYXJyKSA9PiBhcnIuc29tZShjaGVja1RydXRoaW5lc3MpXG5cbmNvbnN0IGhhc0ZhbHN5VmFsdWVzID0gKGFycikgPT4gYXJyLnNvbWUoY2hlY2tGYWxzaW5lc3MpXG5cbmNvbnN0IHJlcGxhY2VFdmVyeU50aCA9IGN1cnJ5KChudGgsIHN0YXJ0LCB1bnRpbCwgdmFsdWUsIGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbLi4uYXJyXVxuICBjb25zdCBzID0gKHR5cGVvZiBzdGFydCA9PT0gJ251bWJlcicpID8gc3RhcnQgOiBudGggLSAxXG4gIGNvbnN0IGxlbiA9IHVudGlsIHx8IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IHM7IGkgPCBsZW47IGkgKz0gbnRoKSB7XG4gICAgcmVzdWx0W2ldID0gdmFsdWVcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCByZXBsYWNlQXQgPSBjdXJyeSgoaW5kZXgsIHZhbHVlLCBhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gWy4uLmFycl1cbiAgcmVzdWx0W2luZGV4XSA9IHZhbHVlXG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IG1hcCA9IGN1cnJ5KChmbiwgZnVuY3RvcikgPT4ge1xuICBsZXQgcmVzdWx0XG4gIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0b3IpKSB7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOlxuICAgICAgcmVzdWx0ID0gW11cbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBmdW5jdG9yKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGZuKGl0ZW0pKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG4gICAgICByZXN1bHQgPSB7fVxuICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKGZ1bmN0b3IpKSB7XG4gICAgICAgIHJlc3VsdFtwcm9wXSA9IGZuKGZ1bmN0b3JbcHJvcF0pXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn0pXG5cbmNvbnN0IGlzQXJyYXkgPSBjdXJyeSgodmFsKSA9PiAoXG4gIHZhbCAhPT0gbnVsbCAmJlxuICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJ1xuKSlcblxuY29uc3QgaXNPYmplY3QgPSBjdXJyeSgodmFsKSA9PiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpXG5cbmNvbnN0IHBpcGUgPSAoLi4uZnVuY3Rpb25zKSA9PlxuICAodmFsdWUpID0+IGZ1bmN0aW9ucy5yZWR1Y2UoKGFjYywgZm4pID0+IGZuKGFjYyksIHZhbHVlKVxuXG5jb25zdCBkZWNyZW1lbnQgPSBjdXJyeSgodmFsKSA9PiAoaXNBcnJheSh2YWwpIHx8IGlzT2JqZWN0KHZhbCkpXG4gID8gbWFwKChuKSA9PiAodHlwZW9mIG4gPT09ICdudW1iZXInKSA/IG4gLSAxIDogbiwgdmFsKVxuICA6IHZhbCAtIDFcbilcblxuY29uc3QgZGVjcmVtZW50RWFjaCA9IG1hcChkZWNyZW1lbnQpXG5cbmNvbnN0IGluY3JlbWVudCA9IGN1cnJ5KCh2YWwpID0+IChpc0FycmF5KHZhbCkgfHwgaXNPYmplY3QodmFsKSlcbiAgPyBtYXAoKG4pID0+ICh0eXBlb2YgbiA9PT0gJ251bWJlcicpID8gbiArIDEgOiBuLCB2YWwpXG4gIDogdmFsICsgMVxuKVxuXG5jb25zdCBpbmNyZW1lbnRFYWNoID0gbWFwKGluY3JlbWVudClcblxuY29uc3QgcmVwZWF0ID0gY3VycnkoKGZuLCBudW0pID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbnVtKSB7XG4gICAgcmVzdWx0W2ldID0gZm4oaSlcbiAgICBpKytcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCBmaW5kID0gY3VycnkoKGZuLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBpZiAoZm4oYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIGFycltpXVxuICAgIH1cbiAgICBpKytcbiAgfVxufSlcblxuY29uc3QgZmluZEluZGV4ID0gY3VycnkoKGZuLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBpZiAoZm4oYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIGlcbiAgICB9XG4gICAgaSsrXG4gIH1cbn0pXG5cbmNvbnN0IGZvckVhY2ggPSBjdXJyeSgoZm4sIGFycikgPT4ge1xuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIGZuKGFycltpXSlcbiAgICBpKytcbiAgfVxuICByZXR1cm4gYXJyXG59KVxuXG5jb25zdCBmbGF0dGVuID0gY3VycnkoKGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBjb25zdCBpbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBpbGVuKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnJbaV0pID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICBjb25zdCBqYXJyID0gZmxhdHRlbihhcnJbaV0pXG4gICAgICBjb25zdCBqbGVuID0gamFyci5sZW5ndGhcbiAgICAgIGxldCBqID0gMFxuICAgICAgd2hpbGUgKGogPCBqbGVuKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGphcnJbal0pXG4gICAgICAgIGorK1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChhcnJbaV0pXG4gICAgfVxuICAgIGkrK1xuICB9XG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IGZpbHRlciA9IGN1cnJ5KChmbiwgYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgaWYgKGZuKGFycltpXSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGFycltpXSlcbiAgICB9XG4gICAgaSsrXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuY29uc3Qgb2JqRXF1YWwgPSBjdXJyeSgob2JqMSwgb2JqMikgPT4ge1xuICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMob2JqMSkpIHtcbiAgICBpZiAob2JqMVtwcm9wXSAhPT0gb2JqMltwcm9wXSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59KVxuXG5jb25zdCBvYmplY3RJbkFycmF5ID0gY3VycnkoKG9iaiwgYXJyKSA9PiB7XG4gIGZvciAoY29uc3QgY3VycmVudE9iaiBvZiBhcnIpIHtcbiAgICBpZiAob2JqRXF1YWwoY3VycmVudE9iaiwgb2JqKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59KVxuXG5jb25zdCByZW1vdmVEdXBsaWNhdGVPYmogPSBjdXJyeSgoYXJyKSA9PiB7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgaWYgKGxlbiA8PSAxKSByZXR1cm4gYXJyXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIW9iamVjdEluQXJyYXkoYXJyW2ldLCByZXN1bHQpKSB7XG4gICAgICByZXN1bHQucHVzaChhcnJbaV0pXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IHJlbW92ZSA9IGN1cnJ5KChpdGVtLCBhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gWy4uLmFycl1cbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycltpXSA9PT0gaXRlbSkge1xuICAgICAgcmVzdWx0LnNwbGljZShpLCAxKVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCBndCA9IGN1cnJ5KChhLCBiKSA9PiBhID4gYilcbmNvbnN0IGx0ID0gY3VycnkoKGEsIGIpID0+IGEgPCBiKVxuY29uc3QgZ3RlID0gY3VycnkoKGEsIGIpID0+IGEgPj0gYilcbmNvbnN0IGx0ZSA9IGN1cnJ5KChhLCBiKSA9PiBhIDw9IGIpXG5jb25zdCBlcSA9IGN1cnJ5KChhLCBiKSA9PiBhID09PSBiKVxuXG5jb25zdCBhbGwgPSBjdXJyeSgocHJlZCwgYXJyKSA9PiB7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghcHJlZChhcnJbaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn0pXG5cbmNvbnN0IGFueSA9IGN1cnJ5KChwcmVkLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKHByZWQoYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59KVxuXG5jb25zdCBtb2RpZnkgPSBjdXJyeSgocHJvcCwgZm4sIG9iaikgPT5cbiAgT2JqZWN0LmFzc2lnbihcbiAgICB7fSxcbiAgICBvYmosXG4gICAgeyBbcHJvcF06IGZuKG9ialtwcm9wXSkgfVxuICApKVxuXG5leHBvcnQgeyBoYXNUcnV0aHlWYWx1ZXMsIHJlcGxhY2VFdmVyeU50aCwgcmVwbGFjZUF0LCBwaXBlLCBtYXAsIGN1cnJ5LCBkZWNyZW1lbnQsIGRlY3JlbWVudEVhY2gsIGluY3JlbWVudCwgaW5jcmVtZW50RWFjaCwgcmVwZWF0LCBmaW5kLCBmaW5kSW5kZXgsIGZvckVhY2gsIGhhc0ZhbHN5VmFsdWVzLCBmbGF0dGVuLCBmaWx0ZXIsIG9iakVxdWFsLCBvYmplY3RJbkFycmF5LCByZW1vdmVEdXBsaWNhdGVPYmosIHJlbW92ZSwgZ3QsIGx0LCBndGUsIGx0ZSwgZXEsIGFsbCwgYW55LCBpc0FycmF5LCBpc09iamVjdCwgbW9kaWZ5IH1cbiIsImNvbnN0IGdldFJhbmRvbUludGVnZXIgPSAobWluLCBtYXgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW5cblxuY29uc3QgZ2V0UmFuZG9tQ29vcmRzID0gKCkgPT4ge1xuICBjb25zdCB5ID0gZ2V0UmFuZG9tSW50ZWdlcigxLCAxMClcbiAgY29uc3QgeCA9IGdldFJhbmRvbUludGVnZXIoMSwgMTApXG4gIHJldHVybiB7IHksIHggfVxufVxuXG5jb25zdCBkZWxheSA9IGFzeW5jIChtcykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKVxuICB9KVxufVxuXG5leHBvcnQgeyBnZXRSYW5kb21JbnRlZ2VyLCBnZXRSYW5kb21Db29yZHMsIGRlbGF5IH1cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIGRlZmluZShJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgZGVmaW5lKEdwLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgZGVmaW5lKEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIEdlbmVyYXRvckZ1bmN0aW9uKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoXG4gICAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgdG9TdHJpbmdUYWdTeW1ib2wsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICk7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgZGVmaW5lKGdlbkZ1biwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIik7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvciwgUHJvbWlzZUltcGwpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIGRlZmluZShHcCwgXCJ0b1N0cmluZ1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgaW4gbW9kZXJuIGVuZ2luZXNcbiAgLy8gd2UgY2FuIGV4cGxpY2l0bHkgYWNjZXNzIGdsb2JhbFRoaXMuIEluIG9sZGVyIGVuZ2luZXMgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xuICB9IGVsc2Uge1xuICAgIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykge1xuICAgIGFycjJbaV0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gYXJyMjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShhcnIpO1xufSIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTtcblxuICBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuO1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcblxuICB2YXIgX3MsIF9lO1xuXG4gIHRyeSB7XG4gICAgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImltcG9ydCBhcnJheVdpdGhIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheUxpbWl0IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVJlc3QgZnJvbSBcIi4vbm9uSXRlcmFibGVSZXN0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufSIsImltcG9ydCBhcnJheVdpdGhvdXRIb2xlcyBmcm9tIFwiLi9hcnJheVdpdGhvdXRIb2xlcy5qc1wiO1xuaW1wb3J0IGl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlU3ByZWFkIGZyb20gXCIuL25vbkl0ZXJhYmxlU3ByZWFkLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vc3R5bGVzL3N0eWxlLmNzcydcbmltcG9ydCB7IG1lbnVIYW5kbGVyIH0gZnJvbSAnLi9sb2dpYy9tZW51X2hhbmRsZXInXG5pbXBvcnQgeyBib2FyZHNIYW5kbGVyIH0gZnJvbSAnLi9sb2dpYy9ib2FyZF9oYW5kbGVyJ1xuaW1wb3J0IHsgZ2FtZUhhbmRsZXIgfSBmcm9tICcuL2xvZ2ljL2dhbWVfaGFuZGxlcidcblxuLyogdGhpcyBpcyB3aGVyZSBoYW5kbGVycyBpbml0aWFsaXplIGFuZCB0aGUgZ2FtZSBpcyBwdXQgdG9nZXRoZXIgKi9cblxuKGZ1bmN0aW9uIGluaXRHYW1lICgpIHtcbiAgbWVudUhhbmRsZXIuaW5pdE1lbnUoKVxuICBib2FyZHNIYW5kbGVyLmluaXRCb2FyZHMoKVxuICBnYW1lSGFuZGxlci5pbml0R2FtZSgpXG59KSgpXG4iXSwibmFtZXMiOlsic3RhdGVzIiwiT2JqZWN0IiwiZnJlZXplIiwiV0FURVIiLCJTSElQIiwiTUlTU0VEIiwiSElUIiwiU1VOSyIsIkFST1VORF9TVU5LIiwiZXZlbnRzIiwiQk9BUkRfSE9WRVJFRCIsIkJPQVJEX0NMSUNLRUQiLCJTSElQX1ZBTElEQVRFRCIsIlNISVBfUk9UQVRFRCIsIlNISVBfUExBQ0VEIiwiUExBWUVSU19DUkVBVEVEIiwiR0FNRV9TVEFSVEVEIiwiQ09NUFVURVJfUExBQ0VEX1NISVBTIiwiQ09NUFVURVJfQk9BUkRfQ0xJQ0tFRCIsIkNPTVBVVEVSX0JPQVJEX0FUVEFDS0VEIiwiUExBWUVSX0ZJTklTSEVEX1RVUk4iLCJDT01QVVRFUl9GSU5JU0hFRF9UVVJOIiwiR0FNRV9FTkRFRCIsIlJFU1RBUlRfUkVRVUVTVEVEIiwiUkVTVEFSVF9WQUxJREFURUQiLCJHQU1FX1JFU1RBUlRFRCIsIkdhbWVib2FyZCIsImdldFJhbmRvbUludGVnZXIiLCJnZXRSYW5kb21Db29yZHMiLCJfZ2V0UmFuZG9tUGxhbmUiLCJBaUdhbWVib2FyZCIsImdhbWVib2FyZCIsIl9wbGFjZVNoaXBBdFJhbmRvbSIsInNpemUiLCJwbGFuZSIsImNvb3JkcyIsInNldFBsYW5lIiwiaXNWYWxpZEZvclBsYWNlIiwieSIsIngiLCJwbGFjZSIsInBsYWNlRmxlZXQiLCJzaXplcyIsImFzc2lnbiIsIlBsYXllciIsImN1cnJ5IiwiZ3QiLCJsdCIsInJlbW92ZSIsIl9hdHRhY2tEaXJlY3Rpb25zIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiX2dldE9wcG9zaXRlRGlyZWN0aW9uIiwiZGlyZWN0aW9uIiwiX2lzU2hpcEhvcml6b250YWwiLCJoaXRDZWxscyIsImxlbmd0aCIsIl9nZXRFbmRPbkF4aXMiLCJheGlzIiwiZ2V0TGFzdCIsImNvbXBhcmlzb25PcCIsInJlZHVjZSIsInByZXYiLCJuZXh0IiwiX2dldExlZnRtb3N0IiwiX2dldFJpZ2h0bW9zdCIsIl9nZXRUb3Btb3N0IiwiX2dldEJvdHRvbW1vc3QiLCJBaVBsYXllciIsImNvbXB1dGVyIiwibGFzdEhpdCIsIl9maW5kUmFuZG9tU3BvdFRvQXR0YWNrIiwiYm9hcmQiLCJpbmNsdWRlcyIsInN0YXRlIiwiX2ZpbmRTcG90QWZ0ZXJIaXQiLCJkaXJlY3Rpb25zIiwia2V5cyIsInJhbmRvbURpcmVjdGlvbiIsInJ5IiwicngiLCJpc1ZhbGlkVGFyZ2V0IiwicmFuZG9tQ29vcmRzIiwidmFsaWRpdHkiLCJfZ2Fpbk9wcG9zaXRlRW5kIiwibGVmdG1vc3QiLCJyaWdodG1vc3QiLCJ0b3Btb3N0IiwiYm90dG9tbW9zdCIsIl9hdHRhY2tTcGVjaWZpY1Nwb3QiLCJhdHRhY2siLCJzdGF0dXMiLCJnZXRBdHRhY2tTdGF0dXMiLCJfYXR0YWNrSW5EaXJlY3Rpb24iLCJhdHRhY2tQbGF5ZXIiLCJ2YWx1ZSIsIl9hdHRhY2tBZnRlckhpdCIsInB1c2giLCJfYXR0YWNrUmFuZG9tQ2VsbCIsInNoaXBTdGF0dXMiLCJzZXREaXJlY3Rpb24iLCJ2YWwiLCJuYW1lIiwidHlwZSIsInJlcGVhdCIsImZpbmRJbmRleCIsInBpcGUiLCJtYXAiLCJmbGF0dGVuIiwiZGVjcmVtZW50IiwiZXEiLCJhbnkiLCJmaWx0ZXIiLCJvYmplY3RJbkFycmF5IiwicmVtb3ZlRHVwbGljYXRlT2JqIiwiU2hpcCIsIl9jcmVhdGVSb3ciLCJfY3JlYXRlR2FtZWJvYXJkIiwiX21hcENvb3JkcyIsInJlc3VsdCIsImkiLCJfY29vcmRzVG9JbmRleGVzIiwiZmxlZXQiLCJtaXNzZWQiLCJfbWFwQm9hcmQiLCJfbWFwU2hpcCIsIl9tYXBNaXNzZWQiLCJfbWFwSGl0IiwiX21hcFN1bmsiLCJfbWFwQXJvdW5kIiwiX2ZpbmRTaGlwIiwiZmluZCIsInNoaXAiLCJzZWdtZW50cyIsInNlZ21lbnQiLCJfZ2V0U2VnbWVudHMiLCJfaXNTaGlwU3VuayIsImlzU3VuayIsIl9nZXRTaGlwQ2VsbHMiLCJfZ2V0U3Vua0NlbGxzIiwiY2VsbCIsIl9hbnlTaGlwIiwiaXNGbGVldFN1bmsiLCJldmVyeSIsIl9pc092ZXJsYXBzIiwib2NjdXBpZWRDZWxscyIsInRhaWwiLCJqIiwiX2lzT3ZlcmZsb3dzIiwiX2dldENlbGxTdGF0ZSIsIml5IiwiaXgiLCJyb3ciLCJfaXNBZGphY2VudFRvU2hpcHMiLCJ0b3BDZWxsIiwiYm90dG9tQ2VsbCIsImxlZnRDZWxsIiwicmlnaHRDZWxsIiwidG9wTGVmdCIsImJvdHRvbUxlZnQiLCJ0b3BSaWdodCIsImJvdHRvbVJpZ2h0IiwiX2dldFN1cnJvdW5kaW5nQ2VsbHMiLCJfaXNDZWxsVmFsaWQiLCJnZXRBcmVhQXJvdW5kU3VuayIsInN1bmtDZWxscyIsInJlY2VpdmVBdHRhY2siLCJoaXRTaGlwIiwiaGl0U2VnbWVudEluZGV4IiwiaGl0IiwiYXR0YWNrZWRDZWxsIiwibmV3UGxhbmUiLCJpc0ZpcnN0IiwidHVybiIsImNoYW5nZVR1cm4iLCJfdHlwZXMiLCJfc2VnbWVudHNDcmVhdG9yIiwiaG9yaXpvbnRhbGx5IiwiaW50YWN0IiwidmVydGljYWxseSIsInVuZGVmaW5lZCIsIkVycm9yIiwiZXZlbnRzSGFuZGxlciIsImRvbUJvYXJkIiwicXVlcnlEb2N1bWVudCIsImJvYXJkc0hhbmRsZXIiLCJwbGF5ZXJCb2FyZCIsImNvbXB1dGVyQm9hcmQiLCJyZW5kZXJQbGF5ZXIiLCJyZW5kZXJCb2FyZCIsInJlbmRlckNvbXB1dGVyIiwiY3JlYXRlQm9hcmRzIiwiY3JlYXRlQm9hcmQiLCJyZXNldEJvYXJkcyIsInJlY3JlYXRlQm9hcmQiLCJzZW5kQ29vcmRzRm9yVmFsaWRhdGlvbiIsImUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImV4dHJhY3RDb29yZHMiLCJ0cmlnZ2VyIiwiaGlnaHRsaWdodFZhbGlkYXRlZENvb3JkcyIsImRhdGEiLCJoaWdobGlnaHRGdXR1cmVTaGlwIiwic2VuZFNoaXBGb3JWYWxpZGF0aW9uIiwicGxhY2VWYWxpZGF0ZWRTaGlwIiwicmVuZGVyQ29tcHV0ZXJTdGF0ZSIsInJlbmRlclBsYXllclN0YXRlIiwic2VuZEF0dGFja2VkQ29vcmRzIiwiY2hhbmdlUGxhbmUiLCJpbml0Qm9hcmRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsZWFySGlnaGxpZ2h0cyIsIm9uIiwib25FYWNoIiwiZGVsYXkiLCJnYW1lSGFuZGxlciIsInNoaXBzVG9QbGFjZSIsInBsYXllciIsImdhbWVTdGFydGVkIiwiZ2FtZUVuZGVkIiwidmFsaWRhdGVDb29yZHMiLCJuZXh0U2hpcFNpemUiLCJpc1ZhbGlkIiwidmFsaWRhdGVQbGFjZW1lbnQiLCJzaGlmdCIsInNoaXBUeXBlIiwiYXJlU2hpcHNQbGFjZWQiLCJzdGFydEdhbWUiLCJyZXN0YXJ0R2FtZSIsImhhbmRsZVBsYXllckF0dGFjayIsImhhbmRsZUNvbXB1dGVyQXR0YWNrIiwidmFsaWRhdGVSZXN0YXJ0IiwiZW5kZWQiLCJpbml0R2FtZSIsIndyYXBJbkRpdiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJyZXBsYWNlRWwiLCJjbG9uZUVsIiwiY3JlYXRlRWwiLCJhZGRJZCIsImFkZFRleHQiLCJtZW51SGFuZGxlciIsInN0YXJ0QnRuIiwicmVzdGFydEJ0biIsIm5hbWVJbnAiLCJyb3RhdGVCdG4iLCJsb2dEaXYiLCJoaW50c0RpdiIsInNoaXBzUGxhY2VkIiwibXNnQ291bnQiLCJfaGlkZSIsImVsIiwiX3Nob3ciLCJfcmVwbGFjZUhpbnRzIiwibXNnIiwiaGFuZGxlU3RhcnQiLCJmb3JFYWNoIiwiZGlzYWJsZWQiLCJoYW5kbGVFbmQiLCJpbm5lclRleHQiLCJyZXF1ZXN0UmVzdGFydCIsImhhbmRsZVJlc3RhcnQiLCJjaGVja1N0YXJ0Q29uZGl0aW9ucyIsImRhdGFzZXQiLCJyb3RhdGUiLCJjaGVja1NoaXBzUmVhZGluZXNzIiwiX2NyZWF0ZUxvZ01lc3NhZ2UiLCJsb2dDbGFzcyIsImRpc3BsYXlMb2dNZXNzYWdlIiwibG9nIiwiaGludCIsImlkIiwicHJlcGVuZCIsImluaXRNZW51IiwiY2xlYXJFbENvbnRlbnQiLCJfY2VsbFRhYmxlIiwicyIsInciLCJoIiwibSIsImEiLCJfY3JlYXRlQ2VsbCIsImlzSGlkZGVuIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwiX2NlbGxzRmluZGVyIiwicXVlcnlTZWxlY3RvciIsImNvb3JkIiwiTnVtYmVyIiwiYXBwZW5kIiwiYm9hcmRTdGF0ZSIsImNlbGxTdGF0ZSIsImNlbGxWaWV3IiwicXVlcnlTZWxlY3RvckFsbCIsImNsYXNzTmFtZSIsInZhbGlkQ2VsbHMiLCJCb29sZWFuIiwic3RyIiwiY2xhc3NlcyIsImRpdiIsImVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsIm5ld0NsYXNzIiwicmVtb3ZlZCIsInJlcGxhY2VDbGFzcyIsIm9sZENsYXNzIiwicmVwbGFjZSIsInRvZ2dsZUNsYXNzIiwidG9nZ2xlZENsYXNzIiwidG9nZ2xlIiwiYWRkQ2xhc3NlcyIsInJlbW92ZUNsYXNzZXMiLCJhZGREYXRhQXR0ciIsImRhdGFBdHRyIiwiZGF0YVZhbCIsImNzc1NlbGVjdG9yIiwicXVlcnkiLCJvbGRFbGVtZW50IiwibmV3RWxlbWVudCIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJjbG9uZU5vZGUiLCJsYXN0Q2hpbGQiLCJldmVudE5hbWUiLCJmbiIsImFyck9mRXZlbnRzIiwiZXZlbnQiLCJvZmYiLCJyZW1vdmVkRm4iLCJjdXJyaWVkIiwiYXJncyIsImJpbmQiLCJjaGVja1RydXRoaW5lc3MiLCJjaGVja0ZhbHNpbmVzcyIsImhhc1RydXRoeVZhbHVlcyIsImFyciIsInNvbWUiLCJoYXNGYWxzeVZhbHVlcyIsInJlcGxhY2VFdmVyeU50aCIsIm50aCIsInN0YXJ0IiwidW50aWwiLCJsZW4iLCJyZXBsYWNlQXQiLCJpbmRleCIsImZ1bmN0b3IiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJpdGVtIiwicHJvcCIsImlzQXJyYXkiLCJpc09iamVjdCIsImZ1bmN0aW9ucyIsImFjYyIsIm4iLCJkZWNyZW1lbnRFYWNoIiwiaW5jcmVtZW50IiwiaW5jcmVtZW50RWFjaCIsIm51bSIsImlsZW4iLCJqYXJyIiwiamxlbiIsIm9iakVxdWFsIiwib2JqMSIsIm9iajIiLCJvYmoiLCJjdXJyZW50T2JqIiwic3BsaWNlIiwiYiIsImd0ZSIsImx0ZSIsImFsbCIsInByZWQiLCJtb2RpZnkiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtcyIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCJdLCJzb3VyY2VSb290IjoiIn0=