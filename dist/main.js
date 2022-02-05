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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxtQkFBbUI7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixnQkFBZ0I7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUEsQ0FBQyxTQUFTbUIsUUFBVCxHQUFxQjtBQUNwQlMsRUFBQUEscUVBQUE7QUFDQTNELEVBQUFBLDBFQUFBO0FBQ0FnQyxFQUFBQSxxRUFBQTtBQUNELENBSkQsSSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29uc3RhbnRzL2NlbGxfc3RhdGVzLmpzIiwid2VicGFjazovLy8uL2NvbnN0YW50cy9ldmVudF90eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9mYWN0b3JpZXMvYWlfZ2FtZWJvYXJkLmpzIiwid2VicGFjazovLy8uL2ZhY3Rvcmllcy9haV9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovLy8uL2xvZ2ljL2JvYXJkX2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbG9naWMvZ2FtZV9oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL2xvZ2ljL21lbnVfaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi91aS9kb21fYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vdWkvZG9tX2Z1bmNzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2V2ZW50c19oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2Z1bmNfaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9oZWxwZXJfZnVuY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3R5bGVzL3N0eWxlLmNzcz9kZjA2Iiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlU3ByZWFkLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJleHBvcnQgY29uc3Qgc3RhdGVzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIFdBVEVSOiAndycsXG4gIFNISVA6ICdzJyxcbiAgTUlTU0VEOiAnbScsXG4gIEhJVDogJ2gnLFxuICBTVU5LOiAneCcsXG4gIEFST1VORF9TVU5LOiAnYSdcbn0pXG4iLCJleHBvcnQgY29uc3QgZXZlbnRzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEJPQVJEX0hPVkVSRUQ6ICdCb2FyZCBob3ZlcmVkJyxcbiAgQk9BUkRfQ0xJQ0tFRDogJ0JvYXJkIGNsaWNrZWQnLFxuICBTSElQX1ZBTElEQVRFRDogJ1NoaXAgdmFsaWRhdGVkJyxcbiAgU0hJUF9ST1RBVEVEOiAnU2hpcCByb3RhdGVkJyxcbiAgU0hJUF9QTEFDRUQ6ICdTaGlwIHBsYWNlZCcsXG4gIFBMQVlFUlNfQ1JFQVRFRDogJ1BsYXllcnMgY3JlYXRlZCcsXG4gIEdBTUVfU1RBUlRFRDogJ0dhbWUgc3RhcnRlZCcsXG4gIENPTVBVVEVSX1BMQUNFRF9TSElQUzogJ0NvbXB1dGVyIHBsYWNlZCBzaGlwcycsXG4gIENPTVBVVEVSX0JPQVJEX0NMSUNLRUQ6ICdDb21wdXRlciBib2FyZCBjbGlja2VkJyxcbiAgQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQ6ICdDb21wdXRlciBib2FyZCBhdHRhY2tlZCcsXG4gIFBMQVlFUl9GSU5JU0hFRF9UVVJOOiAnUGxheWVyIG1hZGUgbW92ZScsXG4gIENPTVBVVEVSX0ZJTklTSEVEX1RVUk46ICdDb21wdXRlciBtYWRlIG1vdmUnLFxuICBHQU1FX0VOREVEOiAnR2FtZSBlbmRlZCcsXG4gIFJFU1RBUlRfUkVRVUVTVEVEOiAnUmVzdGFydCByZXF1ZXN0ZWQnLFxuICBSRVNUQVJUX1ZBTElEQVRFRDogJ1Jlc3RhcnQgdmFsaWRhdGVkJyxcbiAgR0FNRV9SRVNUQVJURUQ6ICdHYW1lIHJlc3RhcnRlZCdcbn0pXG4iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCdcbmltcG9ydCB7IGdldFJhbmRvbUludGVnZXIsIGdldFJhbmRvbUNvb3JkcyB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcl9mdW5jcydcblxuLyogQWlHYW1lYm9hcmQgZmFjdG9yeSBmb3IgZ2FtZWJvYXJkcyBjb250cm9sbGVkIGJ5IGFuIGFpLlxuICogVGhvc2Ugb2JqZWN0cyBoYXZlIG1ldGhvZHMgdGhhdCBoZWxwIEFJIHRvIHBsYXkgdGhlIGdhbWUsXG4gKiBsaWtlIGZvciBwbGFjaW5nIHJhbmRvbSBzaGlwcyBhY3Jvc3MgdmlydHVhbCBib2FyZC4gKi9cblxuY29uc3QgX2dldFJhbmRvbVBsYW5lID0gKCkgPT4ge1xuICByZXR1cm4gZ2V0UmFuZG9tSW50ZWdlcigxLCAyKSA9PT0gMSA/ICdob3Jpem9udGFsbHknIDogJ3ZlcnRpY2FsbHknXG59XG5cbmV4cG9ydCBjb25zdCBBaUdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gR2FtZWJvYXJkKClcblxuICBjb25zdCBfcGxhY2VTaGlwQXRSYW5kb20gPSAoc2l6ZSkgPT4ge1xuICAgIGNvbnN0IHBsYW5lID0gX2dldFJhbmRvbVBsYW5lKClcbiAgICBsZXQgY29vcmRzID0gZ2V0UmFuZG9tQ29vcmRzKClcbiAgICBnYW1lYm9hcmQuc2V0UGxhbmUocGxhbmUpXG4gICAgd2hpbGUgKCFnYW1lYm9hcmQuaXNWYWxpZEZvclBsYWNlKGNvb3Jkcy55LCBjb29yZHMueCwgc2l6ZSkpIHtcbiAgICAgIGNvb3JkcyA9IGdldFJhbmRvbUNvb3JkcygpXG4gICAgfVxuICAgIGdhbWVib2FyZC5wbGFjZShjb29yZHMueSwgY29vcmRzLngsIHNpemUpXG4gIH1cblxuICBjb25zdCBwbGFjZUZsZWV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHNpemVzID0gWzUsIDQsIDMsIDMsIDIsIDIsIDEsIDFdXG4gICAgZm9yIChsZXQgc2l6ZSBvZiBzaXplcykge1xuICAgICAgX3BsYWNlU2hpcEF0UmFuZG9tKHNpemUpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZ2FtZWJvYXJkLCB7XG4gICAgcGxhY2VGbGVldFxuICB9KVxufVxuIiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInXG5pbXBvcnQgeyBzdGF0ZXMgfSBmcm9tICcuLi9jb25zdGFudHMvY2VsbF9zdGF0ZXMnXG5pbXBvcnQgeyBnZXRSYW5kb21JbnRlZ2VyLCBnZXRSYW5kb21Db29yZHMgfSBmcm9tICcuLi91dGlscy9oZWxwZXJfZnVuY3MnXG5pbXBvcnQgeyBjdXJyeSwgZ3QsIGx0LCByZW1vdmUgfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5cbi8qIEFpUGxheWVyIGZhY3RvcnkgZm9yIHBsYXllcnMgY29udHJvbGxlZCBieSBhbiBhaS5cbiAqIEFpIHBsYXllcnMgZmluZCBhbmQgYXR0YWNrIHNoaXBzIG9uIHRoZSBwbGF5ZXIgYm9hcmRzLiBBdCBmaXJzdCxcbiAqIHRoZXkgYXR0YWNrcyBhcmUgcmFuZG9tLCBidXQgd2hlbiB0aGV5IGZpbmQgdGhlIHNoaXAgY2VsbCwgdGhleSB0cnkgdG8gZmluZFxuICogZGlyZWN0aW9uIHdpdGggb3RoZXIgc2hpcCBjZWxscywgYW5kIHRoZW4gcHJlc3MgaW50byB0aGlzIGRpcmVjdGlvbixcbiAqIHVudGlsIHRoZSBzaGlwIGlzIHN1bmsuICovXG5cbmNvbnN0IF9hdHRhY2tEaXJlY3Rpb25zID0ge1xuICBsZWZ0OiAoeSwgeCkgPT4gKHsgeSwgeDogeCAtIDEgfSksXG4gIHJpZ2h0OiAoeSwgeCkgPT4gKHsgeSwgeDogeCArIDEgfSksXG4gIHRvcDogKHksIHgpID0+ICh7IHk6IHkgLSAxLCB4IH0pLFxuICBib3R0b206ICh5LCB4KSA9PiAoeyB5OiB5ICsgMSwgeCB9KVxufVxuXG5jb25zdCBfZ2V0T3Bwb3NpdGVEaXJlY3Rpb24gPSAoZGlyZWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICByZXR1cm4gJ3JpZ2h0J1xuICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgIHJldHVybiAnbGVmdCdcbiAgICBjYXNlICd0b3AnOlxuICAgICAgcmV0dXJuICdib3R0b20nXG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIHJldHVybiAndG9wJ1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJydcbiAgfVxufVxuXG5jb25zdCBfaXNTaGlwSG9yaXpvbnRhbCA9IChoaXRDZWxscykgPT5cbiAgaGl0Q2VsbHMubGVuZ3RoID4gMVxuICAgID8gaGl0Q2VsbHNbMF0ueSA9PT0gaGl0Q2VsbHNbMV0ueVxuICAgIDogZmFsc2VcblxuY29uc3QgX2dldEVuZE9uQXhpcyA9IGN1cnJ5KChheGlzLCBnZXRMYXN0LCBoaXRDZWxscykgPT4ge1xuICBjb25zdCBjb21wYXJpc29uT3AgPSBnZXRMYXN0ID8gZ3QgOiBsdFxuICByZXR1cm4gaGl0Q2VsbHMucmVkdWNlKChwcmV2LCBuZXh0KSA9PlxuICAgIGNvbXBhcmlzb25PcChwcmV2W2F4aXNdLCBuZXh0W2F4aXNdKVxuICAgICAgPyBwcmV2XG4gICAgICA6IG5leHRcbiAgKVxufVxuKVxuXG5jb25zdCBfZ2V0TGVmdG1vc3QgPSBfZ2V0RW5kT25BeGlzKCd4JywgZmFsc2UpXG5jb25zdCBfZ2V0UmlnaHRtb3N0ID0gX2dldEVuZE9uQXhpcygneCcsIHRydWUpXG5jb25zdCBfZ2V0VG9wbW9zdCA9IF9nZXRFbmRPbkF4aXMoJ3knLCBmYWxzZSlcbmNvbnN0IF9nZXRCb3R0b21tb3N0ID0gX2dldEVuZE9uQXhpcygneScsIHRydWUpXG5cbmV4cG9ydCBjb25zdCBBaVBsYXllciA9ICgpID0+IHtcbiAgY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoJ0NvbXB1dGVyJywgZmFsc2UpXG4gIGxldCBoaXRDZWxscyA9IFtdXG4gIGxldCBsYXN0SGl0ID0ge31cbiAgbGV0IGRpcmVjdGlvbiA9ICcnXG5cbiAgY29uc3QgX2ZpbmRSYW5kb21TcG90VG9BdHRhY2sgPSAoYm9hcmQpID0+IHtcbiAgICBsZXQgY29vcmRzID0gZ2V0UmFuZG9tQ29vcmRzKClcbiAgICB3aGlsZSAoW3N0YXRlcy5ISVQsIHN0YXRlcy5NSVNTRUQsIHN0YXRlcy5TVU5LLCBzdGF0ZXMuQVJPVU5EX1NVTktdLmluY2x1ZGVzKGJvYXJkLnN0YXRlW2Nvb3Jkcy55IC0gMV1bY29vcmRzLnggLSAxXSkpIHtcbiAgICAgIGNvb3JkcyA9IGdldFJhbmRvbUNvb3JkcygpXG4gICAgfVxuICAgIHJldHVybiB7IHk6IGNvb3Jkcy55LCB4OiBjb29yZHMueCB9XG4gIH1cblxuICBjb25zdCBfZmluZFNwb3RBZnRlckhpdCA9IChib2FyZCwgeSwgeCkgPT4ge1xuICAgIGxldCBkaXJlY3Rpb25zID0gT2JqZWN0LmtleXMoX2F0dGFja0RpcmVjdGlvbnMpXG4gICAgbGV0IHJhbmRvbURpcmVjdGlvbiA9IGRpcmVjdGlvbnNbZ2V0UmFuZG9tSW50ZWdlcigwLCAzKV1cbiAgICBsZXQgeyB5OiByeSwgeDogcnggfSA9IF9hdHRhY2tEaXJlY3Rpb25zW3JhbmRvbURpcmVjdGlvbl0oeSwgeClcblxuICAgIHdoaWxlICghYm9hcmQuaXNWYWxpZFRhcmdldChyeSwgcngpICYmIGRpcmVjdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgZGlyZWN0aW9ucyA9IHJlbW92ZShyYW5kb21EaXJlY3Rpb24sIGRpcmVjdGlvbnMpXG4gICAgICByYW5kb21EaXJlY3Rpb24gPSBkaXJlY3Rpb25zW2dldFJhbmRvbUludGVnZXIoMCwgZGlyZWN0aW9ucy5sZW5ndGggLSAxKV1cbiAgICAgIGNvbnN0IHJhbmRvbUNvb3JkcyA9IF9hdHRhY2tEaXJlY3Rpb25zW3JhbmRvbURpcmVjdGlvbl0oeSwgeClcbiAgICAgIHJ5ID0gcmFuZG9tQ29vcmRzLnlcbiAgICAgIHJ4ID0gcmFuZG9tQ29vcmRzLnhcbiAgICB9XG4gICAgaWYgKCFib2FyZC5pc1ZhbGlkVGFyZ2V0KHJ5LCByeCkpIHtcbiAgICAgIHJldHVybiB7IHZhbGlkaXR5OiBmYWxzZSB9XG4gICAgfVxuICAgIHJldHVybiB7IHZhbGlkaXR5OiB0cnVlLCBkaXJlY3Rpb246IHJhbmRvbURpcmVjdGlvbiwgeTogcnksIHg6IHJ4IH1cbiAgfVxuXG4gIGNvbnN0IF9nYWluT3Bwb3NpdGVFbmQgPSAoKSA9PiB7XG4gICAgbGV0IGxlZnRtb3N0XG4gICAgbGV0IHJpZ2h0bW9zdFxuICAgIGxldCB0b3Btb3N0XG4gICAgbGV0IGJvdHRvbW1vc3RcbiAgICBzd2l0Y2ggKF9pc1NoaXBIb3Jpem9udGFsKGhpdENlbGxzKSkge1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBsZWZ0bW9zdCA9IF9nZXRMZWZ0bW9zdChoaXRDZWxscylcbiAgICAgICAgcmlnaHRtb3N0ID0gX2dldFJpZ2h0bW9zdChoaXRDZWxscylcbiAgICAgICAgcmV0dXJuIGxhc3RIaXQueCA9PT0gbGVmdG1vc3QueFxuICAgICAgICAgID8gcmlnaHRtb3N0XG4gICAgICAgICAgOiBsZWZ0bW9zdFxuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgdG9wbW9zdCA9IF9nZXRUb3Btb3N0KGhpdENlbGxzKVxuICAgICAgICBib3R0b21tb3N0ID0gX2dldEJvdHRvbW1vc3QoaGl0Q2VsbHMpXG4gICAgICAgIHJldHVybiBsYXN0SGl0LnkgPT09IHRvcG1vc3QueVxuICAgICAgICAgID8gYm90dG9tbW9zdFxuICAgICAgICAgIDogdG9wbW9zdFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHt9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgX2F0dGFja1NwZWNpZmljU3BvdCA9IChib2FyZCwgeSwgeCkgPT4ge1xuICAgIGNvbXB1dGVyLmF0dGFjayhib2FyZCwgeSwgeClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMoeSwgeClcbiAgICByZXR1cm4gc3RhdHVzXG4gIH1cblxuICBjb25zdCBfYXR0YWNrSW5EaXJlY3Rpb24gPSAoYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBfYXR0YWNrRGlyZWN0aW9uc1tkaXJlY3Rpb25dKGxhc3RIaXQueSwgbGFzdEhpdC54KVxuICAgIGlmICghYm9hcmQuaXNWYWxpZFRhcmdldChjb29yZHMueSwgY29vcmRzLngpKSB7XG4gICAgICBkaXJlY3Rpb24gPSBfZ2V0T3Bwb3NpdGVEaXJlY3Rpb24oZGlyZWN0aW9uKVxuICAgICAgbGFzdEhpdCA9IF9nYWluT3Bwb3NpdGVFbmQoKVxuICAgICAgaWYgKCFib2FyZC5pc1ZhbGlkVGFyZ2V0KF9hdHRhY2tEaXJlY3Rpb25zW2RpcmVjdGlvbl0obGFzdEhpdC55LCBsYXN0SGl0LngpKSkge1xuICAgICAgICBkaXJlY3Rpb24gPSAnJ1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF0dGFja1BsYXllcihib2FyZClcbiAgICB9XG4gICAgY29tcHV0ZXIuYXR0YWNrKGJvYXJkLCBjb29yZHMueSwgY29vcmRzLngpXG4gICAgY29uc3Qgc3RhdHVzID0gYm9hcmQuZ2V0QXR0YWNrU3RhdHVzKGNvb3Jkcy55LCBjb29yZHMueClcbiAgICBpZiAoc3RhdHVzLnZhbHVlICE9PSAnaGl0Jykge1xuICAgICAgZGlyZWN0aW9uID0gX2dldE9wcG9zaXRlRGlyZWN0aW9uKGRpcmVjdGlvbilcbiAgICAgIGxhc3RIaXQgPSBfZ2Fpbk9wcG9zaXRlRW5kKClcbiAgICB9XG4gICAgcmV0dXJuIHN0YXR1c1xuICB9XG5cbiAgY29uc3QgX2F0dGFja0FmdGVySGl0ID0gKGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gX2ZpbmRTcG90QWZ0ZXJIaXQoYm9hcmQsIGxhc3RIaXQueSwgbGFzdEhpdC54KVxuICAgIGlmICghY29vcmRzLnZhbGlkaXR5KSB7XG4gICAgICBsYXN0SGl0ID0ge31cbiAgICAgIGhpdENlbGxzID0gW11cbiAgICAgIHJldHVybiBhdHRhY2tQbGF5ZXIoYm9hcmQpXG4gICAgfVxuICAgIGRpcmVjdGlvbiA9IGNvb3Jkcy5kaXJlY3Rpb25cbiAgICBjb21wdXRlci5hdHRhY2soYm9hcmQsIGNvb3Jkcy55LCBjb29yZHMueClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMoY29vcmRzLnksIGNvb3Jkcy54KVxuICAgIGlmIChzdGF0dXMudmFsdWUgIT09ICdoaXQnKSB7XG4gICAgICByZXR1cm4gc3RhdHVzXG4gICAgfVxuICAgIGxhc3RIaXQgPSB7IHk6IGNvb3Jkcy55LCB4OiBjb29yZHMueCB9XG4gICAgaGl0Q2VsbHMucHVzaChsYXN0SGl0KVxuICAgIHJldHVybiBzdGF0dXNcbiAgfVxuXG4gIGNvbnN0IF9hdHRhY2tSYW5kb21DZWxsID0gKGJvYXJkKSA9PiB7XG4gICAgY29uc3QgcmFuZG9tQ29vcmRzID0gX2ZpbmRSYW5kb21TcG90VG9BdHRhY2soYm9hcmQpXG4gICAgY29tcHV0ZXIuYXR0YWNrKGJvYXJkLCByYW5kb21Db29yZHMueSwgcmFuZG9tQ29vcmRzLngpXG4gICAgY29uc3Qgc3RhdHVzID0gYm9hcmQuZ2V0QXR0YWNrU3RhdHVzKHJhbmRvbUNvb3Jkcy55LCByYW5kb21Db29yZHMueClcbiAgICByZXR1cm4gc3RhdHVzXG4gIH1cblxuICBjb25zdCBhdHRhY2tQbGF5ZXIgPSAoYm9hcmQsIHksIHgpID0+IHtcbiAgICBsZXQgc3RhdHVzXG4gICAgaWYgKHkgJiYgeCkge1xuICAgICAgc3RhdHVzID0gX2F0dGFja1NwZWNpZmljU3BvdChib2FyZCwgeSwgeClcbiAgICB9IGVsc2UgaWYgKGxhc3RIaXQueSAmJiBsYXN0SGl0LnggJiYgZGlyZWN0aW9uICE9PSAnJykge1xuICAgICAgc3RhdHVzID0gX2F0dGFja0luRGlyZWN0aW9uKGJvYXJkKVxuICAgIH0gZWxzZSBpZiAobGFzdEhpdC55ICYmIGxhc3RIaXQueCkge1xuICAgICAgc3RhdHVzID0gX2F0dGFja0FmdGVySGl0KGJvYXJkKVxuICAgIH0gZWxzZSBpZiAoIShsYXN0SGl0LnkgJiYgbGFzdEhpdC54KSkge1xuICAgICAgc3RhdHVzID0gX2F0dGFja1JhbmRvbUNlbGwoYm9hcmQpXG4gICAgfVxuICAgIGlmIChzdGF0dXMuc2hpcFN0YXR1cyA9PT0gJ2RhbWFnZWQnKSB7XG4gICAgICBsYXN0SGl0ID0geyB5OiBzdGF0dXMueSwgeDogc3RhdHVzLnggfVxuICAgICAgaGl0Q2VsbHMucHVzaChsYXN0SGl0KVxuICAgIH1cbiAgICBpZiAoc3RhdHVzLnNoaXBTdGF0dXMgPT09ICdkZXN0cm95ZWQnKSB7XG4gICAgICBkaXJlY3Rpb24gPSAnJ1xuICAgICAgbGFzdEhpdCA9IHt9XG4gICAgICBoaXRDZWxscyA9IFtdXG4gICAgfVxuICAgIHJldHVybiBzdGF0dXNcbiAgfVxuXG4gIGNvbnN0IHNldERpcmVjdGlvbiA9ICh2YWwpID0+IHsgZGlyZWN0aW9uID0gdmFsIH1cblxuICByZXR1cm4ge1xuICAgIGF0dGFja1BsYXllcixcbiAgICBzZXREaXJlY3Rpb24sXG4gICAgZ2V0IGRpcmVjdGlvbiAoKSB7IHJldHVybiBkaXJlY3Rpb24gfSxcbiAgICBnZXQgbmFtZSAoKSB7IHJldHVybiBjb21wdXRlci5uYW1lIH0sXG4gICAgZ2V0IHR5cGUgKCkgeyByZXR1cm4gY29tcHV0ZXIudHlwZSB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHJlcGVhdCwgZmluZEluZGV4LCBwaXBlLCBtYXAsIGZsYXR0ZW4sIGRlY3JlbWVudCwgY3VycnksIGVxLCBhbnksIGZpbHRlciwgb2JqZWN0SW5BcnJheSwgZ3QsIGx0LCByZW1vdmVEdXBsaWNhdGVPYmogfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xuaW1wb3J0IHsgc3RhdGVzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NlbGxfc3RhdGVzJ1xuXG4vKiBGYWN0b3J5IGZvciBnYW1lYm9hcmQgb2JqZWN0cy5cbiAqIEdhbWVib2FyZCByZXByZXNlbnRzIHRoZSB2aXJ0dWFsIGJvYXJkcy4gSXQgdmFsaWRhdGVzIGFuZCByZWNlaXZlIGF0dGFja3MsXG4gKiB2YWxpZGF0ZXMgYW5kIHBsYWNlcyBzaGlwcyBvbnRvIGl0c2VsZiwgbWFwcyBzZWxscyB3aXRoIGRpZmZlcmVudCBzdGF0ZXMgKi9cblxuY29uc3QgX2NyZWF0ZVJvdyA9ICgpID0+IHJlcGVhdCgoKSA9PiBzdGF0ZXMuV0FURVIsIDEwKVxuY29uc3QgX2NyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHJlcGVhdChfY3JlYXRlUm93LCAxMClcblxuY29uc3QgX21hcENvb3JkcyA9IGN1cnJ5KChib2FyZCwgdmFsdWUsIGNvb3JkcykgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbLi4uYm9hcmRdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgeyB5LCB4IH0gPSBkZWNyZW1lbnQoY29vcmRzW2ldKVxuICAgIHJlc3VsdFt5XVt4XSA9IHZhbHVlXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuY29uc3QgX2Nvb3Jkc1RvSW5kZXhlcyA9ICh5LCB4KSA9PiB7XG4gIHJldHVybiBkZWNyZW1lbnQoW3ksIHhdKVxufVxuXG5leHBvcnQgY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBmbGVldCA9IFtdXG4gIGNvbnN0IG1pc3NlZCA9IFtdXG4gIGxldCBwbGFuZSA9ICdob3Jpem9udGFsbHknXG4gIGxldCBzdGF0ZSA9IF9jcmVhdGVHYW1lYm9hcmQoKVxuXG4gIGNvbnN0IF9tYXBCb2FyZCA9IF9tYXBDb29yZHMoc3RhdGUpXG4gIGNvbnN0IF9tYXBTaGlwID0gX21hcEJvYXJkKHN0YXRlcy5TSElQKVxuICBjb25zdCBfbWFwTWlzc2VkID0gX21hcEJvYXJkKHN0YXRlcy5NSVNTRUQpXG4gIGNvbnN0IF9tYXBIaXQgPSBfbWFwQm9hcmQoc3RhdGVzLkhJVClcbiAgY29uc3QgX21hcFN1bmsgPSBfbWFwQm9hcmQoc3RhdGVzLlNVTkspXG4gIGNvbnN0IF9tYXBBcm91bmQgPSBfbWFwQm9hcmQoc3RhdGVzLkFST1VORF9TVU5LKVxuXG4gIGNvbnN0IF9maW5kU2hpcCA9ICh5LCB4KSA9PlxuICAgIGZsZWV0LmZpbmQoKHNoaXApID0+IHNoaXAuc2VnbWVudHMuZmluZCgoc2VnbWVudCkgPT4gc2VnbWVudC55ID09PSB5ICYmIHNlZ21lbnQueCA9PT0geCkpXG5cbiAgY29uc3QgX2dldFNlZ21lbnRzID0gKHNoaXApID0+IHNoaXAuc2VnbWVudHNcblxuICBjb25zdCBfaXNTaGlwU3VuayA9IChzaGlwKSA9PiBzaGlwLmlzU3VuaygpXG5cbiAgY29uc3QgX2dldFNoaXBDZWxscyA9ICgpID0+IHBpcGUoXG4gICAgbWFwKF9nZXRTZWdtZW50cyksXG4gICAgZmxhdHRlblxuICApKGZsZWV0KVxuXG4gIGNvbnN0IF9nZXRTdW5rQ2VsbHMgPSAoKSA9PiBwaXBlKFxuICAgIGZpbHRlcihfaXNTaGlwU3VuayksXG4gICAgbWFwKF9nZXRTZWdtZW50cyksXG4gICAgZmxhdHRlbixcbiAgICBtYXAoKGNlbGwpID0+ICh7IHk6IGNlbGwueSwgeDogY2VsbC54IH0pKVxuICApKGZsZWV0KVxuXG4gIGNvbnN0IF9hbnlTaGlwID0gYW55KGVxKHN0YXRlcy5TSElQKSlcblxuICBjb25zdCBpc0ZsZWV0U3VuayA9ICgpID0+IGZsZWV0LmV2ZXJ5KF9pc1NoaXBTdW5rKVxuXG4gIGNvbnN0IF9pc092ZXJsYXBzID0gKHksIHgsIHNpemUpID0+IHtcbiAgICBjb25zdCBvY2N1cGllZENlbGxzID0gX2dldFNoaXBDZWxscygpXG4gICAgaWYgKHBsYW5lID09PSAnaG9yaXpvbnRhbGx5JyAmJiBvY2N1cGllZENlbGxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHRhaWwgPSB4ICsgc2l6ZVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvY2N1cGllZENlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSB4OyBqIDwgdGFpbDsgaisrKSB7XG4gICAgICAgICAgaWYgKG9jY3VwaWVkQ2VsbHNbaV0ueSA9PT0geSAmJiBvY2N1cGllZENlbGxzW2ldLnggPT09IGopIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwbGFuZSA9PT0gJ3ZlcnRpY2FsbHknICYmIG9jY3VwaWVkQ2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdGFpbCA9IHkgKyBzaXplXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9jY3VwaWVkQ2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IHk7IGogPCB0YWlsOyBqKyspIHtcbiAgICAgICAgICBpZiAob2NjdXBpZWRDZWxsc1tpXS55ID09PSBqICYmIG9jY3VwaWVkQ2VsbHNbaV0ueCA9PT0geCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBfaXNPdmVyZmxvd3MgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGlmICgocGxhbmUgPT09ICdob3Jpem9udGFsbHknICYmIHggKyAtLXNpemUgPiAxMCkgfHxcbiAgICAgICAgKHBsYW5lID09PSAndmVydGljYWxseScgJiYgeSArIC0tc2l6ZSA+IDEwKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBfZ2V0Q2VsbFN0YXRlID0gKHksIHgpID0+IHtcbiAgICBjb25zdCBbaXksIGl4XSA9IF9jb29yZHNUb0luZGV4ZXMoeSwgeClcbiAgICBjb25zdCByb3cgPSBzdGF0ZVtpeV1cbiAgICByZXR1cm4gcm93XG4gICAgICA/IHN0YXRlW2l5XVtpeF1cbiAgICAgIDogbnVsbFxuICB9XG5cbiAgY29uc3QgX2lzQWRqYWNlbnRUb1NoaXBzID0gKHksIHgsIHNpemUpID0+IHtcbiAgICBpZiAocGxhbmUgPT09ICdob3Jpem9udGFsbHknKSB7XG4gICAgICBjb25zdCB0YWlsID0geCArIHNpemVcblxuICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB0YWlsOyBpKyspIHtcbiAgICAgICAgY29uc3QgdG9wQ2VsbCA9IF9nZXRDZWxsU3RhdGUoeSAtIDEsIGkpXG4gICAgICAgIGNvbnN0IGJvdHRvbUNlbGwgPSBfZ2V0Q2VsbFN0YXRlKHkgKyAxLCBpKVxuICAgICAgICBpZiAoX2FueVNoaXAoW3RvcENlbGwsIGJvdHRvbUNlbGxdKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgbGVmdENlbGwgPSBfZ2V0Q2VsbFN0YXRlKHksIHggLSAxKVxuICAgICAgY29uc3QgcmlnaHRDZWxsID0gX2dldENlbGxTdGF0ZSh5LCB0YWlsKVxuICAgICAgaWYgKF9hbnlTaGlwKFtsZWZ0Q2VsbCwgcmlnaHRDZWxsXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgY29uc3QgdG9wTGVmdCA9IF9nZXRDZWxsU3RhdGUoeSAtIDEsIHggLSAxKVxuICAgICAgY29uc3QgYm90dG9tTGVmdCA9IF9nZXRDZWxsU3RhdGUoeSArIDEsIHggLSAxKVxuICAgICAgY29uc3QgdG9wUmlnaHQgPSBfZ2V0Q2VsbFN0YXRlKHkgLSAxLCB0YWlsKVxuICAgICAgY29uc3QgYm90dG9tUmlnaHQgPSBfZ2V0Q2VsbFN0YXRlKHkgKyAxLCB0YWlsKVxuICAgICAgaWYgKF9hbnlTaGlwKFt0b3BMZWZ0LCBib3R0b21MZWZ0LCB0b3BSaWdodCwgYm90dG9tUmlnaHRdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwbGFuZSA9PT0gJ3ZlcnRpY2FsbHknKSB7XG4gICAgICBjb25zdCB0YWlsID0geSArIHNpemVcblxuICAgICAgY29uc3QgdG9wQ2VsbCA9IF9nZXRDZWxsU3RhdGUoeSAtIDEsIHgpXG4gICAgICBjb25zdCBib3R0b21DZWxsID0gX2dldENlbGxTdGF0ZSh0YWlsLCB4KVxuICAgICAgaWYgKF9hbnlTaGlwKFt0b3BDZWxsLCBib3R0b21DZWxsXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IHk7IGkgPCB0YWlsOyBpKyspIHtcbiAgICAgICAgY29uc3QgbGVmdENlbGwgPSBfZ2V0Q2VsbFN0YXRlKGksIHggLSAxKVxuICAgICAgICBjb25zdCByaWdodENlbGwgPSBfZ2V0Q2VsbFN0YXRlKGksIHggKyAxKVxuICAgICAgICBpZiAoX2FueVNoaXAoW2xlZnRDZWxsLCByaWdodENlbGxdKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgdG9wTGVmdCA9IF9nZXRDZWxsU3RhdGUoeSAtIDEsIHggLSAxKVxuICAgICAgY29uc3QgdG9wUmlnaHQgPSBfZ2V0Q2VsbFN0YXRlKHkgLSAxLCB4ICsgMSlcbiAgICAgIGNvbnN0IGJvdHRvbUxlZnQgPSBfZ2V0Q2VsbFN0YXRlKHRhaWwsIHggLSAxKVxuICAgICAgY29uc3QgYm90dG9tUmlnaHQgPSBfZ2V0Q2VsbFN0YXRlKHRhaWwsIHggKyAxKVxuICAgICAgaWYgKF9hbnlTaGlwKFt0b3BMZWZ0LCBib3R0b21MZWZ0LCB0b3BSaWdodCwgYm90dG9tUmlnaHRdKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IF9nZXRTdXJyb3VuZGluZ0NlbGxzID0gKHsgeSwgeCB9KSA9PiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHsgeTogeSAtIDEsIHggfSxcbiAgICAgIHsgeTogeSArIDEsIHggfSxcbiAgICAgIHsgeSwgeDogeCAtIDEgfSxcbiAgICAgIHsgeSwgeDogeCArIDEgfSxcbiAgICAgIHsgeTogeSAtIDEsIHg6IHggLSAxIH0sXG4gICAgICB7IHk6IHkgKyAxLCB4OiB4ICsgMSB9LFxuICAgICAgeyB5OiB5IC0gMSwgeDogeCArIDEgfSxcbiAgICAgIHsgeTogeSArIDEsIHg6IHggLSAxIH1cbiAgICBdXG4gIH1cblxuICBjb25zdCBfaXNDZWxsVmFsaWQgPSAoeyB5LCB4IH0pID0+XG4gICAgIWFueSgoYXhpcykgPT4gKGd0KGF4aXMsIDEwKSB8fCBsdChheGlzLCAxKSksIFt4LCB5XSlcblxuICBjb25zdCBnZXRBcmVhQXJvdW5kU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBzdW5rQ2VsbHMgPSBfZ2V0U3Vua0NlbGxzKClcbiAgICByZXR1cm4gcGlwZShcbiAgICAgIG1hcChfZ2V0U3Vycm91bmRpbmdDZWxscyksXG4gICAgICBmbGF0dGVuLFxuICAgICAgZmlsdGVyKChjZWxsKSA9PiAhb2JqZWN0SW5BcnJheShjZWxsLCBzdW5rQ2VsbHMpKSxcbiAgICAgIGZpbHRlcihfaXNDZWxsVmFsaWQpLFxuICAgICAgcmVtb3ZlRHVwbGljYXRlT2JqXG4gICAgKShzdW5rQ2VsbHMpXG4gIH1cblxuICBjb25zdCBpc1ZhbGlkRm9yUGxhY2UgPSAoeSwgeCwgc2l6ZSkgPT4gKFxuICAgICFfaXNPdmVybGFwcyh5LCB4LCBzaXplKSAmJlxuICAgICFfaXNPdmVyZmxvd3MoeSwgeCwgc2l6ZSkgJiZcbiAgICAhX2lzQWRqYWNlbnRUb1NoaXBzKHksIHgsIHNpemUpXG4gIClcblxuICBjb25zdCBwbGFjZSA9ICh5LCB4LCBzaXplKSA9PiB7XG4gICAgaWYgKCFpc1ZhbGlkRm9yUGxhY2UoeSwgeCwgc2l6ZSkpIHJldHVyblxuXG4gICAgY29uc3Qgc2hpcCA9IFNoaXAoeSwgeCwgc2l6ZSwgcGxhbmUpXG4gICAgZmxlZXQucHVzaChzaGlwKVxuICAgIHN0YXRlID0gX21hcFNoaXAoc2hpcC5zZWdtZW50cylcbiAgICByZXR1cm4gc2hpcFxuICB9XG5cbiAgY29uc3QgaXNWYWxpZFRhcmdldCA9ICh5LCB4KSA9PiB7XG4gICAgY29uc3QgW2l5LCBpeF0gPSBfY29vcmRzVG9JbmRleGVzKHksIHgpXG4gICAgY29uc3Qgcm93ID0gc3RhdGVbaXldXG4gICAgaWYgKHJvdykge1xuICAgICAgc3dpdGNoIChzdGF0ZVtpeV1baXhdKSB7XG4gICAgICAgIGNhc2Ugc3RhdGVzLlNISVA6XG4gICAgICAgIGNhc2Ugc3RhdGVzLldBVEVSOlxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIGNhc2Ugc3RhdGVzLk1JU1NFRDpcbiAgICAgICAgY2FzZSBzdGF0ZXMuSElUOlxuICAgICAgICBjYXNlIHN0YXRlcy5TVU5LOlxuICAgICAgICBjYXNlIHN0YXRlcy5BUk9VTkRfU1VOSzpcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHksIHgpID0+IHtcbiAgICBjb25zdCBoaXRTaGlwID0gX2ZpbmRTaGlwKHksIHgpXG4gICAgaWYgKCFoaXRTaGlwKSB7XG4gICAgICBtaXNzZWQucHVzaCh7IHksIHggfSlcbiAgICAgIHN0YXRlID0gX21hcE1pc3NlZChbeyB5LCB4IH1dKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGhpdFNlZ21lbnRJbmRleCA9IGZpbmRJbmRleChzZWdtZW50ID0+IHNlZ21lbnQueSA9PT0geSAmJiBzZWdtZW50LnggPT09IHgsIGhpdFNoaXAuc2VnbWVudHMpXG4gICAgaGl0U2hpcC5oaXQoaGl0U2VnbWVudEluZGV4KVxuICAgIGlmIChoaXRTaGlwLmlzU3VuaygpKSB7XG4gICAgICBzdGF0ZSA9IF9tYXBTdW5rKGhpdFNoaXAuc2VnbWVudHMpXG4gICAgICBzdGF0ZSA9IF9tYXBBcm91bmQoZ2V0QXJlYUFyb3VuZFN1bmsoKSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUgPSBfbWFwSGl0KFt7IHksIHggfV0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0QXR0YWNrU3RhdHVzID0gKHksIHgpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSB7IHksIHggfVxuICAgIGNvbnN0IGF0dGFja2VkQ2VsbCA9IF9nZXRDZWxsU3RhdGUoeSwgeClcbiAgICBsZXQgc2hpcFxuICAgIGxldCBzdGF0dXNcbiAgICBzd2l0Y2ggKGF0dGFja2VkQ2VsbCkge1xuICAgICAgY2FzZSBzdGF0ZXMuTUlTU0VEOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7IHZhbHVlOiAnbWlzc2VkJyB9LCBjb29yZHMpXG4gICAgICBjYXNlIHN0YXRlcy5ISVQ6XG4gICAgICBjYXNlIHN0YXRlcy5TVU5LOlxuICAgICAgICBzaGlwID0gX2ZpbmRTaGlwKHksIHgpXG4gICAgICAgIHN0YXR1cyA9IHsgdmFsdWU6ICdoaXQnLCBzaGlwOiBzaGlwLnR5cGUgfVxuICAgICAgICByZXR1cm4gc2hpcC5pc1N1bmsoKVxuICAgICAgICAgID8gT2JqZWN0LmFzc2lnbihzdGF0dXMsIGNvb3JkcywgeyBzaGlwU3RhdHVzOiAnZGVzdHJveWVkJyB9KVxuICAgICAgICAgIDogT2JqZWN0LmFzc2lnbihzdGF0dXMsIGNvb3JkcywgeyBzaGlwU3RhdHVzOiAnZGFtYWdlZCcgfSlcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsgdmFsdWU6IGF0dGFja2VkQ2VsbCB9LCBjb29yZHMpXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc2V0UGxhbmUgPSAobmV3UGxhbmUpID0+IHsgcGxhbmUgPSBuZXdQbGFuZSB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXQgc3RhdGUgKCkgeyByZXR1cm4gc3RhdGUgfSxcbiAgICBnZXQgZmxlZXQgKCkgeyByZXR1cm4gZmxlZXQgfSxcbiAgICBnZXQgbWlzc2VkICgpIHsgcmV0dXJuIG1pc3NlZCB9LFxuICAgIGlzVmFsaWRGb3JQbGFjZSxcbiAgICBwbGFjZSxcbiAgICBpc1ZhbGlkVGFyZ2V0LFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0QXR0YWNrU3RhdHVzLFxuICAgIGdldEFyZWFBcm91bmRTdW5rLFxuICAgIGlzRmxlZXRTdW5rLFxuICAgIHNldFBsYW5lXG4gIH1cbn1cblxuZXhwb3J0IHsgX2NyZWF0ZUdhbWVib2FyZCB9XG4iLCIvKiBGYWN0b3J5IGZvciBwbGF5ZXIgb2JqZWN0cy5cbiAqIFBsYXllcnMgaGF2ZSBuYW1lLCB0dXJuIHByZWNlZGVuY2UsIGNhbiBhdHRhY2sgb3RoZXIgYm9hcmRzLCBoYXZlIHR5cGVzLiAqL1xuXG5jb25zdCBQbGF5ZXIgPSAobmFtZSwgaXNGaXJzdCkgPT4ge1xuICBjb25zdCB0eXBlID0gaXNGaXJzdCA/ICdwbGF5ZXInIDogJ2NvbXB1dGVyJ1xuICBsZXQgdHVybiA9IGlzRmlyc3RcblxuICBjb25zdCBjaGFuZ2VUdXJuID0gKCkgPT4geyB0dXJuID0gIXR1cm4gfVxuXG4gIGNvbnN0IGF0dGFjayA9IChib2FyZCwgeSwgeCkgPT4ge1xuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soeSwgeClcbiAgICBjb25zdCBzdGF0dXMgPSBib2FyZC5nZXRBdHRhY2tTdGF0dXMoeSwgeClcbiAgICBpZiAoc3RhdHVzLnZhbHVlICE9PSAnaGl0Jykge1xuICAgICAgY2hhbmdlVHVybigpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXQgbmFtZSAoKSB7IHJldHVybiBuYW1lIH0sXG4gICAgZ2V0IHR5cGUgKCkgeyByZXR1cm4gdHlwZSB9LFxuICAgIGdldCB0dXJuICgpIHsgcmV0dXJuIHR1cm4gfSxcbiAgICBhdHRhY2ssXG4gICAgY2hhbmdlVHVyblxuICB9XG59XG5cbmV4cG9ydCB7IFBsYXllciB9XG4iLCIvKiBGYWN0b3J5IGZvciB0aGUgc2hpcCBvYmplY3RzLlxuICogU2hpcHMgaGF2ZSB0eXBlcywgc2VnbWVudHMsIGNhbiBiZSBoaXQgYW5kIHN1bmsgKi9cblxuY29uc3QgX3R5cGVzID0ge1xuICAxOiAnUGF0cm9sIGJvYXQnLFxuICAyOiAnRGVzdHJveWVyJyxcbiAgMzogJ0NydWlzZXInLFxuICA0OiAnQmF0dGxlc2hpcCcsXG4gIDU6ICdDYXJyaWVyJ1xufVxuXG5jb25zdCBfc2VnbWVudHNDcmVhdG9yID0ge1xuICBob3Jpem9udGFsbHkgKHksIHgsIHNpemUpIHtcbiAgICBjb25zdCBzZWdtZW50cyA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIHNlZ21lbnRzW2ldID0geyB5LCB4OiAoeCArIGkpLCBpbnRhY3Q6IHRydWUgfVxuICAgIH1cbiAgICByZXR1cm4gc2VnbWVudHNcbiAgfSxcbiAgdmVydGljYWxseSAoeSwgeCwgc2l6ZSkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgc2VnbWVudHNbaV0gPSB7IHk6ICh5ICsgaSksIHgsIGludGFjdDogdHJ1ZSB9XG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50c1xuICB9XG59XG5cbmNvbnN0IFNoaXAgPSAoeSwgeCwgc2l6ZSwgcGxhbmUpID0+IHtcbiAgY29uc3QgdHlwZSA9IF90eXBlc1tzaXplXVxuICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoJ0ltcHJvcGVyIHNoaXAgc2l6ZScpXG5cbiAgY29uc3Qgc2VnbWVudHMgPSBfc2VnbWVudHNDcmVhdG9yW3BsYW5lXSh5LCB4LCBzaXplKVxuXG4gIGNvbnN0IGhpdCA9IChzZWdtZW50KSA9PiB7IHNlZ21lbnRzW3NlZ21lbnRdLmludGFjdCA9IGZhbHNlIH1cblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiBzZWdtZW50cy5ldmVyeSgoc2VnbWVudCkgPT4gc2VnbWVudC5pbnRhY3QgPT09IGZhbHNlKVxuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgICBnZXQgc2l6ZSAoKSB7IHJldHVybiBzaXplIH0sXG4gICAgZ2V0IHR5cGUgKCkgeyByZXR1cm4gdHlwZSB9LFxuICAgIGdldCBzZWdtZW50cyAoKSB7IHJldHVybiBzZWdtZW50cyB9XG4gIH1cbn1cblxuZXhwb3J0IHsgU2hpcCB9XG4iLCJpbXBvcnQgeyBldmVudHMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRfdHlwZXMnXG5pbXBvcnQgeyBldmVudHNIYW5kbGVyIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzX2hhbmRsZXInXG5pbXBvcnQgeyBkb21Cb2FyZCB9IGZyb20gJy4uL3VpL2RvbV9ib2FyZCdcbmltcG9ydCB7IHF1ZXJ5RG9jdW1lbnQgIH0gZnJvbSAnLi4vdWkvZG9tX2Z1bmNzJ1xuXG4vKiBib2FyZHNIYW5kbGVyIGNvbnRyb2xzIHRoZSBib2FyZHM6IGhpZ2hsaWdodHMgc2hpcHMsIHNlbmQgY29vcmRzIHRvXG4gKiBnYW1lIGhhbmRsZXIgZm9yIHZhbGlkYXRpb24sIGF0dGFjaGVzIHRvIGJvYXJkcyBldmVudCBsaXN0ZW5lcnMsXG4gKiByZW5kZXJzIHRoZSBib2FyZHMgYWZ0ZXIgcGxheWVyIGFuZCBjb21wdXRlciBhdHRhY2tzICovXG5cbmNvbnN0IGJvYXJkc0hhbmRsZXIgPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJCb2FyZCA9IHF1ZXJ5RG9jdW1lbnQoJyNwbGF5ZXItYm9hcmQnKVxuICBjb25zdCBjb21wdXRlckJvYXJkID0gcXVlcnlEb2N1bWVudCgnI2NvbXB1dGVyLWJvYXJkJylcblxuICBjb25zdCByZW5kZXJQbGF5ZXIgPSBkb21Cb2FyZC5yZW5kZXJCb2FyZChwbGF5ZXJCb2FyZCwgZmFsc2UpXG4gIGNvbnN0IHJlbmRlckNvbXB1dGVyID0gZG9tQm9hcmQucmVuZGVyQm9hcmQoY29tcHV0ZXJCb2FyZCwgdHJ1ZSlcblxuICBjb25zdCBjcmVhdGVCb2FyZHMgPSAoKSA9PiB7XG4gICAgZG9tQm9hcmQuY3JlYXRlQm9hcmQoZmFsc2UsIHBsYXllckJvYXJkKVxuICAgIGRvbUJvYXJkLmNyZWF0ZUJvYXJkKHRydWUsIGNvbXB1dGVyQm9hcmQpXG4gIH1cblxuICBjb25zdCByZXNldEJvYXJkcyA9IChwbGFuZSkgPT4ge1xuICAgIGRvbUJvYXJkLnJlY3JlYXRlQm9hcmQoZmFsc2UsIHBsYXllckJvYXJkKVxuICAgIGRvbUJvYXJkLnJlY3JlYXRlQm9hcmQodHJ1ZSwgY29tcHV0ZXJCb2FyZClcbiAgICBkb21Cb2FyZC5zZXRQbGFuZShwbGFuZSlcbiAgfVxuXG4gIGNvbnN0IHNlbmRDb29yZHNGb3JWYWxpZGF0aW9uID0gKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IGRvbUJvYXJkLmV4dHJhY3RDb29yZHMoZS50YXJnZXQpXG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkJPQVJEX0hPVkVSRUQsIGNvb3JkcylcbiAgICB9XG4gIH1cblxuICBjb25zdCBoaWdodGxpZ2h0VmFsaWRhdGVkQ29vcmRzID0gKGRhdGEpID0+IHtcbiAgICBkb21Cb2FyZC5oaWdobGlnaHRGdXR1cmVTaGlwKC4uLmRhdGEpXG4gIH1cblxuICBjb25zdCBzZW5kU2hpcEZvclZhbGlkYXRpb24gPSAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSkge1xuICAgICAgY29uc3QgY29vcmRzID0gZG9tQm9hcmQuZXh0cmFjdENvb3JkcyhlLnRhcmdldClcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuQk9BUkRfQ0xJQ0tFRCwgY29vcmRzKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlVmFsaWRhdGVkU2hpcCA9ICh7IHNoaXAgfSkgPT4ge1xuICAgIGRvbUJvYXJkLnBsYWNlKC4uLnNoaXApXG4gIH1cblxuICBjb25zdCByZW5kZXJDb21wdXRlclN0YXRlID0gKHsgc3RhdGUgfSkgPT4ge1xuICAgIHJlbmRlckNvbXB1dGVyKHN0YXRlKVxuICB9XG5cbiAgY29uc3QgcmVuZGVyUGxheWVyU3RhdGUgPSAoeyBzdGF0ZSB9KSA9PiB7XG4gICAgcmVuZGVyUGxheWVyKHN0YXRlKVxuICB9XG5cbiAgY29uc3Qgc2VuZEF0dGFja2VkQ29vcmRzID0gKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IGRvbUJvYXJkLmV4dHJhY3RDb29yZHMoZS50YXJnZXQpXG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkNPTVBVVEVSX0JPQVJEX0NMSUNLRUQsIGNvb3JkcylcbiAgICB9XG4gIH1cblxuICBjb25zdCBjaGFuZ2VQbGFuZSA9IChwbGFuZSkgPT4ge1xuICAgIGRvbUJvYXJkLnNldFBsYW5lKHBsYW5lKVxuICB9XG5cbiAgY29uc3QgaW5pdEJvYXJkcyA9ICgpID0+IHtcbiAgICBjcmVhdGVCb2FyZHMoKVxuICAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHNlbmRDb29yZHNGb3JWYWxpZGF0aW9uKVxuICAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VuZFNoaXBGb3JWYWxpZGF0aW9uKVxuICAgIHBsYXllckJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBkb21Cb2FyZC5jbGVhckhpZ2hsaWdodHMpXG4gICAgY29tcHV0ZXJCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbmRBdHRhY2tlZENvb3JkcylcbiAgICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5TSElQX1ZBTElEQVRFRCwgaGlnaHRsaWdodFZhbGlkYXRlZENvb3JkcylcbiAgICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5TSElQX1BMQUNFRCwgcGxhY2VWYWxpZGF0ZWRTaGlwKVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLlNISVBfUk9UQVRFRCwgY2hhbmdlUGxhbmUpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuQ09NUFVURVJfRklOSVNIRURfVFVSTiwgcmVuZGVyUGxheWVyU3RhdGUpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuR0FNRV9SRVNUQVJURUQsIHJlc2V0Qm9hcmRzKVxuICAgIGV2ZW50c0hhbmRsZXIub25FYWNoKFtldmVudHMuQ09NUFVURVJfUExBQ0VEX1NISVBTLCBldmVudHMuQ09NUFVURVJfQk9BUkRfQVRUQUNLRURdLCByZW5kZXJDb21wdXRlclN0YXRlKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0Qm9hcmRzXG4gIH1cbn0pKClcblxuZXhwb3J0IHsgYm9hcmRzSGFuZGxlciB9XG4iLCJpbXBvcnQgeyBldmVudHMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRfdHlwZXMnXG5pbXBvcnQgeyBldmVudHNIYW5kbGVyIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzX2hhbmRsZXInXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuLi9mYWN0b3JpZXMvcGxheWVyJ1xuaW1wb3J0IHsgQWlQbGF5ZXIgfSBmcm9tICcuLi9mYWN0b3JpZXMvYWlfcGxheWVyJ1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi4vZmFjdG9yaWVzL2dhbWVib2FyZCdcbmltcG9ydCB7IEFpR2FtZWJvYXJkIH0gZnJvbSAnLi4vZmFjdG9yaWVzL2FpX2dhbWVib2FyZCdcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAnLi4vdXRpbHMvaGVscGVyX2Z1bmNzJ1xuXG4vKiBnYW1lSGFuZGxlciBjb250cm9scyB0aGUgZmxvdyBvZiB0aGUgZ2FtZTogdmFsaWRhdGVzIGRhdGFcbiAqIHNlbnQgZnJvbSBtZW51SGFuZGxlciBhbmQgYm9hcmRzSGFuZGxlciBhbmQgdXNlcyBtZXRob2RzIG9mIGFsbFxuICogcmVsZXZhbnQgZm9yIHRoZSBnYW1lIGZhY3RvcmllcyBmb3IgdmlydHVhbCBib2FyZCBtYW5pcHVsYXRpb24gKi9cblxuY29uc3QgZ2FtZUhhbmRsZXIgPSAoKCkgPT4ge1xuICBsZXQgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKVxuICBsZXQgY29tcHV0ZXJCb2FyZCA9IEFpR2FtZWJvYXJkKClcbiAgbGV0IHNoaXBzVG9QbGFjZSA9IFs1LCA0LCAzLCAzLCAyLCAyLCAxLCAxXVxuICBsZXQgcGxheWVyXG4gIGxldCBjb21wdXRlclxuICBsZXQgZ2FtZVN0YXJ0ZWQgPSBmYWxzZVxuICBsZXQgZ2FtZUVuZGVkID0gZmFsc2VcblxuICBjb25zdCB2YWxpZGF0ZUNvb3JkcyA9IChjb29yZHMpID0+IHtcbiAgICBpZiAoc2hpcHNUb1BsYWNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgW3ksIHhdID0gY29vcmRzXG4gICAgY29uc3QgbmV4dFNoaXBTaXplID0gc2hpcHNUb1BsYWNlWzBdXG4gICAgY29uc3QgaXNWYWxpZCA9IHBsYXllckJvYXJkLmlzVmFsaWRGb3JQbGFjZSh5LCB4LCBuZXh0U2hpcFNpemUpXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5TSElQX1ZBTElEQVRFRCwgW3ksIHgsIG5leHRTaGlwU2l6ZSwgaXNWYWxpZF0pXG4gIH1cblxuICBjb25zdCB2YWxpZGF0ZVBsYWNlbWVudCA9IChjb29yZHMpID0+IHtcbiAgICBpZiAoc2hpcHNUb1BsYWNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuXG4gICAgY29uc3QgW3ksIHhdID0gY29vcmRzXG4gICAgY29uc3QgbmV4dFNoaXBTaXplID0gc2hpcHNUb1BsYWNlWzBdXG4gICAgY29uc3QgaXNWYWxpZCA9IHBsYXllckJvYXJkLmlzVmFsaWRGb3JQbGFjZSh5LCB4LCBuZXh0U2hpcFNpemUpXG4gICAgaWYgKCFpc1ZhbGlkKSByZXR1cm5cbiAgICBjb25zdCBzaGlwID0gcGxheWVyQm9hcmQucGxhY2UoeSwgeCwgbmV4dFNoaXBTaXplKVxuICAgIHNoaXBzVG9QbGFjZS5zaGlmdCgpXG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKFxuICAgICAgZXZlbnRzLlNISVBfUExBQ0VELFxuICAgICAge1xuICAgICAgICBzaGlwOiBbeSwgeCwgbmV4dFNoaXBTaXplXSxcbiAgICAgICAgc2hpcFR5cGU6IHNoaXAudHlwZSxcbiAgICAgICAgYXJlU2hpcHNQbGFjZWQ6IHNoaXBzVG9QbGFjZS5sZW5ndGggPT09IDBcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBjb25zdCBzdGFydEdhbWUgPSAobmFtZSkgPT4ge1xuICAgIGdhbWVTdGFydGVkID0gdHJ1ZVxuICAgIHBsYXllciA9IFBsYXllcihuYW1lLCB0cnVlKVxuICAgIGNvbXB1dGVyID0gQWlQbGF5ZXIoKVxuICAgIGNvbXB1dGVyQm9hcmQucGxhY2VGbGVldCg1KVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuQ09NUFVURVJfUExBQ0VEX1NISVBTLCB7IHN0YXRlOiBjb21wdXRlckJvYXJkLnN0YXRlIH0pXG4gIH1cblxuICBjb25zdCByZXN0YXJ0R2FtZSA9IChwbGFuZSkgPT4ge1xuICAgIHNoaXBzVG9QbGFjZSA9IFs1LCA0LCAzLCAzLCAyLCAyLCAxLCAxXVxuICAgIGdhbWVTdGFydGVkID0gZmFsc2VcbiAgICBnYW1lRW5kZWQgPSBmYWxzZVxuICAgIHBsYXllckJvYXJkID0gR2FtZWJvYXJkKClcbiAgICBjb21wdXRlckJvYXJkID0gQWlHYW1lYm9hcmQoKVxuICAgIHBsYXllckJvYXJkLnNldFBsYW5lKHBsYW5lKVxuICB9XG5cbiAgY29uc3QgaGFuZGxlUGxheWVyQXR0YWNrID0gKGNvb3JkcykgPT4ge1xuICAgIGlmICghZ2FtZVN0YXJ0ZWQgfHwgZ2FtZUVuZGVkIHx8ICFwbGF5ZXIudHVybiB8fCAhY29tcHV0ZXJCb2FyZC5pc1ZhbGlkVGFyZ2V0KC4uLmNvb3JkcykpIHJldHVyblxuICAgIHBsYXllci5hdHRhY2soY29tcHV0ZXJCb2FyZCwgLi4uY29vcmRzKVxuICAgIGNvbnN0IHN0YXR1cyA9IGNvbXB1dGVyQm9hcmQuZ2V0QXR0YWNrU3RhdHVzKC4uLmNvb3JkcylcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoXG4gICAgICBldmVudHMuQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQsXG4gICAgICB7IHN0YXRlOiBjb21wdXRlckJvYXJkLnN0YXRlLCBzdGF0dXMsIHBsYXllciB9XG4gICAgKVxuICAgIGlmICghcGxheWVyLnR1cm4pIHtcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuUExBWUVSX0ZJTklTSEVEX1RVUk4sIG51bGwpXG4gICAgfVxuICAgIGlmIChjb21wdXRlckJvYXJkLmlzRmxlZXRTdW5rKCkpIHtcbiAgICAgIGdhbWVFbmRlZCA9IHRydWVcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuR0FNRV9FTkRFRCwgcGxheWVyLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgaGFuZGxlQ29tcHV0ZXJBdHRhY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKHBsYXllckJvYXJkLmlzRmxlZXRTdW5rKCkpIHtcbiAgICAgIGdhbWVFbmRlZCA9IHRydWVcbiAgICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuR0FNRV9FTkRFRCwgY29tcHV0ZXIubmFtZSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBhd2FpdCBkZWxheSg0MDApXG4gICAgY29uc3Qgc3RhdHVzID0gY29tcHV0ZXIuYXR0YWNrUGxheWVyKHBsYXllckJvYXJkKVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihcbiAgICAgIGV2ZW50cy5DT01QVVRFUl9GSU5JU0hFRF9UVVJOLFxuICAgICAgeyBzdGF0ZTogcGxheWVyQm9hcmQuc3RhdGUsIHN0YXR1cywgcGxheWVyOiBjb21wdXRlciB9XG4gICAgKVxuICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdoaXQnKSB7XG4gICAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLlBMQVlFUl9GSU5JU0hFRF9UVVJOLCBudWxsKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHBsYXllci5jaGFuZ2VUdXJuKClcbiAgfVxuXG4gIGNvbnN0IGNoYW5nZVBsYW5lID0gKHBsYW5lKSA9PiB7XG4gICAgcGxheWVyQm9hcmQuc2V0UGxhbmUocGxhbmUpXG4gIH1cblxuICBjb25zdCB2YWxpZGF0ZVJlc3RhcnQgPSAoKSA9PiBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLlJFU1RBUlRfVkFMSURBVEVELCB7IHR1cm46IHBsYXllci50dXJuLCBlbmRlZDogZ2FtZUVuZGVkIH0pXG5cbiAgY29uc3QgaW5pdEdhbWUgPSAoKSA9PiB7XG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuQk9BUkRfSE9WRVJFRCwgdmFsaWRhdGVDb29yZHMpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuQk9BUkRfQ0xJQ0tFRCwgdmFsaWRhdGVQbGFjZW1lbnQpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuU0hJUF9ST1RBVEVELCBjaGFuZ2VQbGFuZSlcbiAgICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5HQU1FX1NUQVJURUQsIHN0YXJ0R2FtZSlcbiAgICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5SRVNUQVJUX1JFUVVFU1RFRCwgdmFsaWRhdGVSZXN0YXJ0KVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLkdBTUVfUkVTVEFSVEVELCByZXN0YXJ0R2FtZSlcbiAgICBldmVudHNIYW5kbGVyLm9uKGV2ZW50cy5DT01QVVRFUl9CT0FSRF9DTElDS0VELCBoYW5kbGVQbGF5ZXJBdHRhY2spXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuUExBWUVSX0ZJTklTSEVEX1RVUk4sIGhhbmRsZUNvbXB1dGVyQXR0YWNrKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0R2FtZVxuICB9XG59KSgpXG5cbmV4cG9ydCB7IGdhbWVIYW5kbGVyIH1cbiIsImltcG9ydCB7IGV2ZW50cyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudF90eXBlcydcbmltcG9ydCB7IGV2ZW50c0hhbmRsZXIgfSBmcm9tICcuLi91dGlscy9ldmVudHNfaGFuZGxlcidcbmltcG9ydCB7IHBpcGUgfSBmcm9tICcuLi91dGlscy9mdW5jX2hlbHBlcnMnXG5pbXBvcnQgeyB3cmFwSW5EaXYsIHF1ZXJ5RG9jdW1lbnQsIGFkZENsYXNzLCByZW1vdmVDbGFzcywgcmVwbGFjZUVsLCBjbG9uZUVsLCBjcmVhdGVFbCwgYWRkSWQsIGFkZFRleHQgfSBmcm9tICcuLi91aS9kb21fZnVuY3MnXG5cbi8qIG1lbnVIYW5kbGVyIGNvbnRyb2xzIHRoZSBtZW51OiBkaXNhYmxlcywgaGlkZXMgYW5kIHNob3dzIG1lbnUgZWxlbWVudHMsXG4gKiBhdHRhY2hlcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlbSwgY29udHJvbHMgbG9ncywgZ2l2ZXMgdGhlIHVzZXIgYWJpbGl0eVxuICogdG8gc3RhcnQsIHJlc3RhcnQgbWVudSwgdG8gaW5wdXQgdGhlaXIgbmFtZSAqL1xuXG5jb25zdCBtZW51SGFuZGxlciA9ICgoKSA9PiB7XG4gIGNvbnN0IHN0YXJ0QnRuID0gcXVlcnlEb2N1bWVudCgnI3N0YXJ0LWdhbWUnKVxuICBjb25zdCByZXN0YXJ0QnRuID0gcXVlcnlEb2N1bWVudCgnI3Jlc3RhcnQtZ2FtZScpXG4gIGNvbnN0IG5hbWVJbnAgPSBxdWVyeURvY3VtZW50KCcjcGxheWVyLW5hbWUnKVxuICBjb25zdCByb3RhdGVCdG4gPSBxdWVyeURvY3VtZW50KCcjcm90YXRlJylcbiAgY29uc3QgbG9nRGl2ID0gcXVlcnlEb2N1bWVudCgnI2xvZycpXG4gIGxldCBoaW50c0RpdiA9IHF1ZXJ5RG9jdW1lbnQoJyNoaW50cycpXG5cbiAgbGV0IHNoaXBzUGxhY2VkID0gZmFsc2VcbiAgbGV0IG1zZ0NvdW50ID0gMFxuXG4gIGNvbnN0IF9oaWRlID0gKGVsKSA9PiBhZGRDbGFzcygnZGlzcGxheS1ub25lJywgZWwpXG5cbiAgY29uc3QgX3Nob3cgPSAoZWwpID0+IHJlbW92ZUNsYXNzKCdkaXNwbGF5LW5vbmUnLCBlbClcblxuICBjb25zdCBfcmVwbGFjZUhpbnRzID0gKG1zZykgPT4gcGlwZShcbiAgICAgIGNyZWF0ZUVsKFsnaGludHMnXSksXG4gICAgICBhZGRJZCgnaGludHMnKSxcbiAgICAgIGFkZFRleHQobXNnKSxcbiAgICAgIHJlcGxhY2VFbChoaW50c0RpdilcbiAgICApKCdkaXYnKVxuXG4gIGNvbnN0IGhhbmRsZVN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1zZyA9IGBHb29kIGx1Y2ssIEFkbWlyYWwgJHtuYW1lSW5wLnZhbHVlfSFgXG4gICAgaGludHNEaXYgPSBfcmVwbGFjZUhpbnRzKG1zZylcbiAgICA7W3N0YXJ0QnRuLCByb3RhdGVCdG5dLmZvckVhY2goX2hpZGUpXG4gICAgX3Nob3cocmVzdGFydEJ0bilcbiAgICBuYW1lSW5wLmRpc2FibGVkID0gdHJ1ZVxuICAgIGV2ZW50c0hhbmRsZXIudHJpZ2dlcihldmVudHMuR0FNRV9TVEFSVEVELCBuYW1lSW5wLnZhbHVlKVxuICB9XG5cbiAgY29uc3QgaGFuZGxlRW5kID0gKG5hbWUpID0+IHsgaGludHNEaXYuaW5uZXJUZXh0ID0gYCR7bmFtZX0gd29uIWAgfVxuXG4gIGNvbnN0IHJlcXVlc3RSZXN0YXJ0ID0gKCkgPT4gZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5SRVNUQVJUX1JFUVVFU1RFRClcblxuICBjb25zdCBoYW5kbGVSZXN0YXJ0ID0gKHsgdHVybiwgZW5kZWQgfSkgPT4ge1xuICAgIGlmICghKHR1cm4gfHwgZW5kZWQpKSByZXR1cm5cbiAgICBjb25zdCBtc2cgPSBgV2VsY29tZSBiYWNrLCBBZG1pcmFsICR7bmFtZUlucC52YWx1ZX0hYFxuICAgIGhpbnRzRGl2ID0gX3JlcGxhY2VIaW50cyhtc2cpXG4gICAgO1tzdGFydEJ0biwgcm90YXRlQnRuXS5mb3JFYWNoKF9zaG93KVxuICAgIF9oaWRlKHJlc3RhcnRCdG4pXG4gICAgc2hpcHNQbGFjZWQgPSBmYWxzZVxuICAgIG5hbWVJbnAuZGlzYWJsZWQgPSBmYWxzZVxuICAgIG1zZ0NvdW50ID0gMFxuICAgIGNoZWNrU3RhcnRDb25kaXRpb25zKClcbiAgICBldmVudHNIYW5kbGVyLnRyaWdnZXIoZXZlbnRzLkdBTUVfUkVTVEFSVEVELCByb3RhdGVCdG4uZGF0YXNldC5wbGFuZSlcbiAgfVxuXG4gIGNvbnN0IHJvdGF0ZSA9ICgpID0+IHtcbiAgICBpZiAocm90YXRlQnRuLmRhdGFzZXQucGxhbmUgPT09ICd2ZXJ0aWNhbGx5Jykge1xuICAgICAgcm90YXRlQnRuLmRhdGFzZXQucGxhbmUgPSAnaG9yaXpvbnRhbGx5J1xuICAgICAgcm90YXRlQnRuLmlubmVyVGV4dCA9ICdIb3Jpem9udGFsJ1xuICAgIH0gZWxzZSBpZiAocm90YXRlQnRuLmRhdGFzZXQucGxhbmUgPT09ICdob3Jpem9udGFsbHknKSB7XG4gICAgICByb3RhdGVCdG4uZGF0YXNldC5wbGFuZSA9ICd2ZXJ0aWNhbGx5J1xuICAgICAgcm90YXRlQnRuLmlubmVyVGV4dCA9ICdWZXJ0aWNhbCdcbiAgICB9XG4gICAgZXZlbnRzSGFuZGxlci50cmlnZ2VyKGV2ZW50cy5TSElQX1JPVEFURUQsIHJvdGF0ZUJ0bi5kYXRhc2V0LnBsYW5lKVxuICB9XG5cbiAgY29uc3QgY2hlY2tTdGFydENvbmRpdGlvbnMgPSAoKSA9PiB7XG4gICAgc3RhcnRCdG4uZGlzYWJsZWQgPSAhKG5hbWVJbnAudmFsdWUgJiYgc2hpcHNQbGFjZWQpXG4gIH1cblxuICBjb25zdCBjaGVja1NoaXBzUmVhZGluZXNzID0gKHsgYXJlU2hpcHNQbGFjZWQsIHNoaXBUeXBlIH0pID0+IHtcbiAgICAoYXJlU2hpcHNQbGFjZWQpXG4gICAgICA/IHNoaXBzUGxhY2VkID0gdHJ1ZVxuICAgICAgOiBzaGlwc1BsYWNlZCA9IGZhbHNlXG4gICAgY2hlY2tTdGFydENvbmRpdGlvbnMoKVxuICAgIGhpbnRzRGl2LmlubmVyVGV4dCA9IGAke3NoaXBUeXBlfSBoYXMgYmVlbiBwbGFjZWQuYFxuICB9XG5cbiAgY29uc3QgX2NyZWF0ZUxvZ01lc3NhZ2UgPSAoc3RhdHVzLCBwbGF5ZXIpID0+IHtcbiAgICBjb25zdCBsb2dDbGFzcyA9IGBsb2ctJHtwbGF5ZXIudHlwZX0tJHtzdGF0dXMuc2hpcFN0YXR1cyB8fCBzdGF0dXMudmFsdWV9YFxuICAgIGxldCBtc2cgPSBgVHVybiAkeysrbXNnQ291bnR9LiB5JHtzdGF0dXMueX0geSR7c3RhdHVzLnh9YFxuICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdtaXNzZWQnKSB7XG4gICAgICBtc2cgKz0gYCAke3BsYXllci5uYW1lfSBtaXNzZWQuLi5gXG4gICAgfVxuICAgIGlmIChzdGF0dXMudmFsdWUgPT09ICdoaXQnKSB7XG4gICAgICBtc2cgKz0gYCAke3BsYXllci5uYW1lfSAke3N0YXR1cy5zaGlwU3RhdHVzfSAke3N0YXR1cy5zaGlwfSFgXG4gICAgfVxuICAgIHJldHVybiB3cmFwSW5EaXYobXNnLCBbbG9nQ2xhc3NdKVxuICB9XG5cbiAgY29uc3QgZGlzcGxheUxvZ01lc3NhZ2UgPSAoeyBzdGF0dXMsIHBsYXllciB9KSA9PiB7XG4gICAgY29uc3QgbG9nID0gX2NyZWF0ZUxvZ01lc3NhZ2Uoc3RhdHVzLCBwbGF5ZXIpXG4gICAgY29uc3QgaGludCA9IGNsb25lRWwobG9nKVxuICAgIGhpbnQuaWQgPSAnaGludHMnXG4gICAgbG9nRGl2LnByZXBlbmQobG9nKVxuICAgIGhpbnRzRGl2ID0gcmVwbGFjZUVsKGhpbnRzRGl2LCBoaW50KVxuICB9XG5cbiAgY29uc3QgaW5pdE1lbnUgPSAoKSA9PiB7XG4gICAgY2hlY2tTdGFydENvbmRpdGlvbnMoKVxuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU3RhcnQpXG4gICAgcmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcXVlc3RSZXN0YXJ0KVxuICAgIHJvdGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJvdGF0ZSlcbiAgICBuYW1lSW5wLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tTdGFydENvbmRpdGlvbnMpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuU0hJUF9QTEFDRUQsIGNoZWNrU2hpcHNSZWFkaW5lc3MpXG4gICAgZXZlbnRzSGFuZGxlci5vbihldmVudHMuR0FNRV9FTkRFRCwgaGFuZGxlRW5kKVxuICAgIGV2ZW50c0hhbmRsZXIub24oZXZlbnRzLlJFU1RBUlRfVkFMSURBVEVELCBoYW5kbGVSZXN0YXJ0KVxuICAgIGV2ZW50c0hhbmRsZXIub25FYWNoKFtldmVudHMuQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQsIGV2ZW50cy5DT01QVVRFUl9GSU5JU0hFRF9UVVJOXSwgZGlzcGxheUxvZ01lc3NhZ2UpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXRNZW51XG4gIH1cbn0pKClcblxuZXhwb3J0IHsgbWVudUhhbmRsZXIgfVxuIiwiaW1wb3J0IHsgZm9yRWFjaCwgcGlwZSwgZmlsdGVyLCBjdXJyeSB9IGZyb20gJy4uL3V0aWxzL2Z1bmNfaGVscGVycydcbmltcG9ydCB7IGFkZENsYXNzLCBjbGVhckVsQ29udGVudCwgcmVtb3ZlQ2xhc3MgfSBmcm9tICcuL2RvbV9mdW5jcydcbmltcG9ydCB7IHN0YXRlcyB9IGZyb20gJy4uL2NvbnN0YW50cy9jZWxsX3N0YXRlcydcblxuY29uc3QgX2NlbGxUYWJsZSA9IHtcbiAgczogJ3NoaXAnLFxuICB3OiAnd2F0ZXInLFxuICBoOiAnaGl0JyxcbiAgbTogJ21pc3MnLFxuICB4OiAnc3VuaycsXG4gIGE6ICdhcm91bmQtc3Vuaydcbn1cblxuY29uc3QgX2NlbGxDbGFzc2VzID0gT2JqZWN0LnZhbHVlcyhfY2VsbFRhYmxlKVxuXG5jb25zdCBfY3JlYXRlQ2VsbCA9IChpc0hpZGRlbiwgeSwgeCkgPT4ge1xuICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJylcbiAgY2VsbC5kYXRhc2V0LnkgPSB5XG4gIGNlbGwuZGF0YXNldC54ID0geFxuICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3dhdGVyJylcbiAgaWYgKGlzSGlkZGVuKSBjZWxsLmNsYXNzTGlzdC5hZGQoJ2ZvZy1vZi13YXInKVxuICByZXR1cm4gY2VsbFxufVxuXG5jb25zdCBfY2VsbHNGaW5kZXIgPSB7XG4gIGhvcml6b250YWxseSAoeSwgeCwgc2l6ZSkge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gW11cbiAgICBjb25zdCB0YWlsID0geCArIHNpemVcbiAgICBmb3IgKGxldCBpID0geDsgaSA8IHRhaWw7IGkrKykge1xuICAgICAgc2VnbWVudHMucHVzaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS15PScke3l9J11bZGF0YS14PScke2l9J11gKSlcbiAgICB9XG4gICAgcmV0dXJuIHNlZ21lbnRzXG4gIH0sXG4gIHZlcnRpY2FsbHkgKHksIHgsIHNpemUpIHtcbiAgICBjb25zdCBzZWdtZW50cyA9IFtdXG4gICAgY29uc3QgdGFpbCA9IHkgKyBzaXplXG4gICAgZm9yIChsZXQgaSA9IHk7IGkgPCB0YWlsOyBpKyspIHtcbiAgICAgIHNlZ21lbnRzLnB1c2goZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteT0nJHtpfSddW2RhdGEteD0nJHt4fSddYCkpXG4gICAgfVxuICAgIHJldHVybiBzZWdtZW50c1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBkb21Cb2FyZCA9ICgoKSA9PiB7XG4gIGxldCBwbGFuZSA9ICdob3Jpem9udGFsbHknXG5cbiAgY29uc3QgZXh0cmFjdENvb3JkcyA9IChjZWxsKSA9PlxuICAgIFtjZWxsLmRhdGFzZXQueSwgY2VsbC5kYXRhc2V0LnhdLm1hcChjb29yZCA9PiBOdW1iZXIoY29vcmQpKVxuXG4gIGNvbnN0IGNyZWF0ZUJvYXJkID0gKGlzSGlkZGVuLCBkb21Cb2FyZCkgPT4ge1xuICAgIGZvciAobGV0IHkgPSAxOyB5IDwgMTE7IHkrKykge1xuICAgICAgZm9yIChsZXQgeCA9IDE7IHggPCAxMTsgeCsrKSB7XG4gICAgICAgIGRvbUJvYXJkLmFwcGVuZChfY3JlYXRlQ2VsbChpc0hpZGRlbiwgeSwgeCkpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVjcmVhdGVCb2FyZCA9IChpc0hpZGRlbiwgZG9tQm9hcmQpID0+IHtcbiAgICBjbGVhckVsQ29udGVudChkb21Cb2FyZClcbiAgICBjcmVhdGVCb2FyZChpc0hpZGRlbiwgZG9tQm9hcmQpXG4gIH1cblxuICBjb25zdCByZW5kZXJCb2FyZCA9IGN1cnJ5KChkb21Cb2FyZCwgaXNIaWRkZW4sIGJvYXJkU3RhdGUpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBjZWxsU3RhdGUgPSBib2FyZFN0YXRlW2ldW2pdXG4gICAgICAgIGNvbnN0IGNlbGxWaWV3ID0gZG9tQm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEteT0nJHtpICsgMX0nXVtkYXRhLXg9JyR7aiArIDF9J11gKVxuICAgICAgICBpZiAoIWNlbGxWaWV3LmNsYXNzTGlzdC5jb250YWlucyhfY2VsbFRhYmxlW2NlbGxTdGF0ZV0pKSBhZGRDbGFzcyhfY2VsbFRhYmxlW2NlbGxTdGF0ZV0sIGNlbGxWaWV3KVxuICAgICAgICBpZiAoaXNIaWRkZW4gJiYgW3N0YXRlcy5NSVNTRUQsIHN0YXRlcy5ISVQsIHN0YXRlcy5TVU5LLCBzdGF0ZXMuQVJPVU5EX1NVTktdLmluY2x1ZGVzKGNlbGxTdGF0ZSkpIHtcbiAgICAgICAgICByZW1vdmVDbGFzcygnZm9nLW9mLXdhcicsIGNlbGxWaWV3KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IGNsZWFySGlnaGxpZ2h0cyA9ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJylcbiAgICAuZm9yRWFjaCgoZWwpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Z1dHVyZS1zaGlwJywgJ3dyb25nLXBsYWNlbWVudCcpKVxuXG4gIGNvbnN0IGhpZ2hsaWdodEZ1dHVyZVNoaXAgPSAoeSwgeCwgc2l6ZSwgaXNWYWxpZCkgPT4ge1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IChpc1ZhbGlkKSA/ICdmdXR1cmUtc2hpcCcgOiAnd3JvbmctcGxhY2VtZW50J1xuICAgIGNvbnN0IHNlZ21lbnRzID0gX2NlbGxzRmluZGVyW3BsYW5lXSh5LCB4LCBzaXplKVxuICAgIGNsZWFySGlnaGxpZ2h0cygpXG4gICAgY29uc3QgdmFsaWRDZWxscyA9IHNlZ21lbnRzLmZpbHRlcigoZWwpID0+IEJvb2xlYW4oZWwpKVxuICAgIHZhbGlkQ2VsbHMuZm9yRWFjaCgoZWwpID0+IGFkZENsYXNzKGNsYXNzTmFtZSwgZWwpKVxuICB9XG5cbiAgY29uc3QgcGxhY2UgPSAoeSwgeCwgc2l6ZSkgPT4ge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gX2NlbGxzRmluZGVyW3BsYW5lXSh5LCB4LCBzaXplKVxuICAgIHNlZ21lbnRzLmZvckVhY2goKGVsKSA9PiBhZGRDbGFzcygnc2hpcCcsIGVsKSlcbiAgfVxuXG4gIGNvbnN0IHNldFBsYW5lID0gKG5ld1BsYW5lKSA9PiB7IHBsYW5lID0gbmV3UGxhbmUgfVxuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlQm9hcmQsXG4gICAgcmVjcmVhdGVCb2FyZCxcbiAgICByZW5kZXJCb2FyZCxcbiAgICBzZXRQbGFuZSxcbiAgICBleHRyYWN0Q29vcmRzLFxuICAgIGhpZ2hsaWdodEZ1dHVyZVNoaXAsXG4gICAgY2xlYXJIaWdobGlnaHRzLFxuICAgIHBsYWNlXG4gIH1cbn0pKClcbiIsImltcG9ydCB7IGN1cnJ5IH0gZnJvbSAnLi4vdXRpbHMvZnVuY19oZWxwZXJzJ1xuXG5jb25zdCB3cmFwSW5EaXYgPSBjdXJyeSgoc3RyLCBjbGFzc2VzKSA9PiB7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGRpdi5pbm5lclRleHQgPSBzdHJcbiAgZGl2LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NlcylcbiAgcmV0dXJuIGRpdlxufSlcblxuY29uc3QgY3JlYXRlRWwgPSBjdXJyeSgoY2xhc3NlcywgZWxlbWVudCkgPT4ge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudClcbiAgZWwuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzKVxuICByZXR1cm4gZWxcbn0pXG5cbmNvbnN0IGFkZElkID0gY3VycnkoKGlkLCBlbGVtZW50KSA9PiB7XG4gIGVsZW1lbnQuaWQgPSBpZFxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgYWRkVGV4dCA9IGN1cnJ5KChzdHIsIGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudC50ZXh0Q29udGVudCA9IHN0clxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgYWRkQ2xhc3MgPSBjdXJyeSgobmV3Q2xhc3MsIGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5ld0NsYXNzKVxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgcmVtb3ZlQ2xhc3MgPSBjdXJyeSgocmVtb3ZlZCwgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUocmVtb3ZlZClcbiAgcmV0dXJuIGVsZW1lbnRcbn0pXG5cbmNvbnN0IHJlcGxhY2VDbGFzcyA9IGN1cnJ5KChvbGRDbGFzcywgbmV3Q2xhc3MsIGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudC5jbGFzc0xpc3QucmVwbGFjZShvbGRDbGFzcywgbmV3Q2xhc3MpXG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5jb25zdCB0b2dnbGVDbGFzcyA9IGN1cnJ5KCh0b2dnbGVkQ2xhc3MsIGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHRvZ2dsZWRDbGFzcylcbiAgcmV0dXJuIGVsZW1lbnRcbn0pXG5cbmNvbnN0IGFkZENsYXNzZXMgPSBjdXJyeSgoY2xhc3NlcywgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NlcylcbiAgcmV0dXJuIGVsZW1lbnRcbn0pXG5cbmNvbnN0IHJlbW92ZUNsYXNzZXMgPSBjdXJyeSgoY2xhc3NlcywgZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3NlcylcbiAgcmV0dXJuIGVsZW1lbnRcbn0pXG5cbmNvbnN0IGFkZERhdGFBdHRyID0gY3VycnkoKGRhdGFBdHRyLCBkYXRhVmFsLCBlbGVtZW50KSA9PiB7XG4gIGVsZW1lbnRbZGF0YUF0dHJdID0gZGF0YVZhbFxuICByZXR1cm4gZWxlbWVudFxufSlcblxuY29uc3QgY3NzU2VsZWN0b3IgPSBjdXJyeSgoZWxlbWVudCwgcXVlcnkpID0+IHtcbiAgcmV0dXJuIGVsZW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeSlcbn0pXG5cbmNvbnN0IHF1ZXJ5RG9jdW1lbnQgPSBjc3NTZWxlY3Rvcihkb2N1bWVudClcblxuY29uc3QgcmVwbGFjZUVsID0gY3VycnkoKG9sZEVsZW1lbnQsIG5ld0VsZW1lbnQpID0+IHtcbiAgb2xkRWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdFbGVtZW50LCBvbGRFbGVtZW50KVxuICByZXR1cm4gbmV3RWxlbWVudFxufSlcblxuY29uc3QgY2xvbmVFbCA9IGN1cnJ5KChlbGVtZW50KSA9PiB7XG4gIHJldHVybiBlbGVtZW50LmNsb25lTm9kZSh0cnVlKVxufSlcblxuY29uc3QgY2xlYXJFbENvbnRlbnQgPSBjdXJyeSgoZWxlbWVudCkgPT4ge1xuICB3aGlsZSAoZWxlbWVudC5sYXN0Q2hpbGQpIHtcbiAgICBlbGVtZW50Lmxhc3RDaGlsZC5yZW1vdmUoKVxuICB9XG4gIHJldHVybiBlbGVtZW50XG59KVxuXG5leHBvcnQge1xuICB3cmFwSW5EaXYsXG4gIGNyZWF0ZUVsLFxuICBhZGRJZCxcbiAgYWRkVGV4dCxcbiAgYWRkQ2xhc3MsXG4gIGFkZENsYXNzZXMsXG4gIHJlbW92ZUNsYXNzLFxuICByZW1vdmVDbGFzc2VzLFxuICByZXBsYWNlQ2xhc3MsXG4gIHRvZ2dsZUNsYXNzLFxuICBhZGREYXRhQXR0cixcbiAgY3NzU2VsZWN0b3IsXG4gIHF1ZXJ5RG9jdW1lbnQsXG4gIHJlcGxhY2VFbCxcbiAgY2xvbmVFbCxcbiAgY2xlYXJFbENvbnRlbnRcbn1cbiIsImV4cG9ydCBjb25zdCBldmVudHNIYW5kbGVyID0gKCgpID0+IHtcbiAgY29uc3QgZXZlbnRzID0ge31cblxuICByZXR1cm4ge1xuICAgIG9uIChldmVudE5hbWUsIGZuKSB7XG4gICAgICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdIHx8IFtdXG4gICAgICBldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKVxuICAgIH0sXG5cbiAgICBvbkVhY2ggKGFyck9mRXZlbnRzLCBmbikge1xuICAgICAgYXJyT2ZFdmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnRzW2V2ZW50XSA9IGV2ZW50c1tldmVudF0gfHwgW11cbiAgICAgICAgZXZlbnRzW2V2ZW50XS5wdXNoKGZuKVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgb2ZmIChldmVudE5hbWUsIHJlbW92ZWRGbikge1xuICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKChmbikgPT4gZm4gIT09IHJlbW92ZWRGbilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdHJpZ2dlciAoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaCgoZm4pID0+IGZuKGRhdGEpKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSkoKVxuIiwiY29uc3QgY3VycnkgPSAoZm4pID0+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGN1cnJpZWQgKC4uLmFyZ3MpIHtcbiAgICBpZiAoZm4ubGVuZ3RoICE9PSBhcmdzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGN1cnJpZWQuYmluZChudWxsLCAuLi5hcmdzKVxuICAgIH1cbiAgICByZXR1cm4gZm4oLi4uYXJncylcbiAgfVxufVxuXG5jb25zdCBjaGVja1RydXRoaW5lc3MgPSAoZWwpID0+IEJvb2xlYW4oZWwpXG5cbmNvbnN0IGNoZWNrRmFsc2luZXNzID0gKGVsKSA9PiAhZWxcblxuY29uc3QgaGFzVHJ1dGh5VmFsdWVzID0gKGFycikgPT4gYXJyLnNvbWUoY2hlY2tUcnV0aGluZXNzKVxuXG5jb25zdCBoYXNGYWxzeVZhbHVlcyA9IChhcnIpID0+IGFyci5zb21lKGNoZWNrRmFsc2luZXNzKVxuXG5jb25zdCByZXBsYWNlRXZlcnlOdGggPSBjdXJyeSgobnRoLCBzdGFydCwgdW50aWwsIHZhbHVlLCBhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gWy4uLmFycl1cbiAgY29uc3QgcyA9ICh0eXBlb2Ygc3RhcnQgPT09ICdudW1iZXInKSA/IHN0YXJ0IDogbnRoIC0gMVxuICBjb25zdCBsZW4gPSB1bnRpbCB8fCBhcnIubGVuZ3RoXG4gIGZvciAobGV0IGkgPSBzOyBpIDwgbGVuOyBpICs9IG50aCkge1xuICAgIHJlc3VsdFtpXSA9IHZhbHVlXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuY29uc3QgcmVwbGFjZUF0ID0gY3VycnkoKGluZGV4LCB2YWx1ZSwgYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFsuLi5hcnJdXG4gIHJlc3VsdFtpbmRleF0gPSB2YWx1ZVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCBtYXAgPSBjdXJyeSgoZm4sIGZ1bmN0b3IpID0+IHtcbiAgbGV0IHJlc3VsdFxuICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmdW5jdG9yKSkge1xuICAgIGNhc2UgJ1tvYmplY3QgQXJyYXldJzpcbiAgICAgIHJlc3VsdCA9IFtdXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZnVuY3Rvcikge1xuICAgICAgICByZXN1bHQucHVzaChmbihpdGVtKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRcbiAgICBjYXNlICdbb2JqZWN0IE9iamVjdF0nOlxuICAgICAgcmVzdWx0ID0ge31cbiAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3Qua2V5cyhmdW5jdG9yKSkge1xuICAgICAgICByZXN1bHRbcHJvcF0gPSBmbihmdW5jdG9yW3Byb3BdKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICB9XG59KVxuXG5jb25zdCBpc0FycmF5ID0gY3VycnkoKHZhbCkgPT4gKFxuICB2YWwgIT09IG51bGwgJiZcbiAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbikpXG5cbmNvbnN0IGlzT2JqZWN0ID0gY3VycnkoKHZhbCkgPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IE9iamVjdF0nKVxuXG5jb25zdCBwaXBlID0gKC4uLmZ1bmN0aW9ucykgPT5cbiAgKHZhbHVlKSA9PiBmdW5jdGlvbnMucmVkdWNlKChhY2MsIGZuKSA9PiBmbihhY2MpLCB2YWx1ZSlcblxuY29uc3QgZGVjcmVtZW50ID0gY3VycnkoKHZhbCkgPT4gKGlzQXJyYXkodmFsKSB8fCBpc09iamVjdCh2YWwpKVxuICA/IG1hcCgobikgPT4gKHR5cGVvZiBuID09PSAnbnVtYmVyJykgPyBuIC0gMSA6IG4sIHZhbClcbiAgOiB2YWwgLSAxXG4pXG5cbmNvbnN0IGRlY3JlbWVudEVhY2ggPSBtYXAoZGVjcmVtZW50KVxuXG5jb25zdCBpbmNyZW1lbnQgPSBjdXJyeSgodmFsKSA9PiAoaXNBcnJheSh2YWwpIHx8IGlzT2JqZWN0KHZhbCkpXG4gID8gbWFwKChuKSA9PiAodHlwZW9mIG4gPT09ICdudW1iZXInKSA/IG4gKyAxIDogbiwgdmFsKVxuICA6IHZhbCArIDFcbilcblxuY29uc3QgaW5jcmVtZW50RWFjaCA9IG1hcChpbmNyZW1lbnQpXG5cbmNvbnN0IHJlcGVhdCA9IGN1cnJ5KChmbiwgbnVtKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IG51bSkge1xuICAgIHJlc3VsdFtpXSA9IGZuKGkpXG4gICAgaSsrXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuY29uc3QgZmluZCA9IGN1cnJ5KChmbiwgYXJyKSA9PiB7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgaWYgKGZuKGFycltpXSkpIHtcbiAgICAgIHJldHVybiBhcnJbaV1cbiAgICB9XG4gICAgaSsrXG4gIH1cbn0pXG5cbmNvbnN0IGZpbmRJbmRleCA9IGN1cnJ5KChmbiwgYXJyKSA9PiB7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgaWYgKGZuKGFycltpXSkpIHtcbiAgICAgIHJldHVybiBpXG4gICAgfVxuICAgIGkrK1xuICB9XG59KVxuXG5jb25zdCBmb3JFYWNoID0gY3VycnkoKGZuLCBhcnIpID0+IHtcbiAgY29uc3QgbGVuID0gYXJyLmxlbmd0aFxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICBmbihhcnJbaV0pXG4gICAgaSsrXG4gIH1cbiAgcmV0dXJuIGFyclxufSlcblxuY29uc3QgZmxhdHRlbiA9IGN1cnJ5KChhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgY29uc3QgaWxlbiA9IGFyci5sZW5ndGhcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgaWxlbikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyW2ldKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgY29uc3QgamFyciA9IGZsYXR0ZW4oYXJyW2ldKVxuICAgICAgY29uc3QgamxlbiA9IGphcnIubGVuZ3RoXG4gICAgICBsZXQgaiA9IDBcbiAgICAgIHdoaWxlIChqIDwgamxlbikge1xuICAgICAgICByZXN1bHQucHVzaChqYXJyW2pdKVxuICAgICAgICBqKytcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnB1c2goYXJyW2ldKVxuICAgIH1cbiAgICBpKytcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCBmaWx0ZXIgPSBjdXJyeSgoZm4sIGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIGlmIChmbihhcnJbaV0pKSB7XG4gICAgICByZXN1bHQucHVzaChhcnJbaV0pXG4gICAgfVxuICAgIGkrK1xuICB9XG4gIHJldHVybiByZXN1bHRcbn0pXG5cbmNvbnN0IG9iakVxdWFsID0gY3VycnkoKG9iajEsIG9iajIpID0+IHtcbiAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKG9iajEpKSB7XG4gICAgaWYgKG9iajFbcHJvcF0gIT09IG9iajJbcHJvcF0pIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufSlcblxuY29uc3Qgb2JqZWN0SW5BcnJheSA9IGN1cnJ5KChvYmosIGFycikgPT4ge1xuICBmb3IgKGNvbnN0IGN1cnJlbnRPYmogb2YgYXJyKSB7XG4gICAgaWYgKG9iakVxdWFsKGN1cnJlbnRPYmosIG9iaikpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufSlcblxuY29uc3QgcmVtb3ZlRHVwbGljYXRlT2JqID0gY3VycnkoKGFycikgPT4ge1xuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoXG4gIGlmIChsZW4gPD0gMSkgcmV0dXJuIGFyclxuICBjb25zdCByZXN1bHQgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKCFvYmplY3RJbkFycmF5KGFycltpXSwgcmVzdWx0KSkge1xuICAgICAgcmVzdWx0LnB1c2goYXJyW2ldKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59KVxuXG5jb25zdCByZW1vdmUgPSBjdXJyeSgoaXRlbSwgYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFsuLi5hcnJdXG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChhcnJbaV0gPT09IGl0ZW0pIHtcbiAgICAgIHJlc3VsdC5zcGxpY2UoaSwgMSlcbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufSlcblxuY29uc3QgZ3QgPSBjdXJyeSgoYSwgYikgPT4gYSA+IGIpXG5jb25zdCBsdCA9IGN1cnJ5KChhLCBiKSA9PiBhIDwgYilcbmNvbnN0IGd0ZSA9IGN1cnJ5KChhLCBiKSA9PiBhID49IGIpXG5jb25zdCBsdGUgPSBjdXJyeSgoYSwgYikgPT4gYSA8PSBiKVxuY29uc3QgZXEgPSBjdXJyeSgoYSwgYikgPT4gYSA9PT0gYilcblxuY29uc3QgYWxsID0gY3VycnkoKHByZWQsIGFycikgPT4ge1xuICBjb25zdCBsZW4gPSBhcnIubGVuZ3RoXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXByZWQoYXJyW2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59KVxuXG5jb25zdCBhbnkgPSBjdXJyeSgocHJlZCwgYXJyKSA9PiB7XG4gIGNvbnN0IGxlbiA9IGFyci5sZW5ndGhcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChwcmVkKGFycltpXSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufSlcblxuY29uc3QgbW9kaWZ5ID0gY3VycnkoKHByb3AsIGZuLCBvYmopID0+XG4gIE9iamVjdC5hc3NpZ24oXG4gICAge30sXG4gICAgb2JqLFxuICAgIHsgW3Byb3BdOiBmbihvYmpbcHJvcF0pIH1cbiAgKSlcblxuZXhwb3J0IHsgaGFzVHJ1dGh5VmFsdWVzLCByZXBsYWNlRXZlcnlOdGgsIHJlcGxhY2VBdCwgcGlwZSwgbWFwLCBjdXJyeSwgZGVjcmVtZW50LCBkZWNyZW1lbnRFYWNoLCBpbmNyZW1lbnQsIGluY3JlbWVudEVhY2gsIHJlcGVhdCwgZmluZCwgZmluZEluZGV4LCBmb3JFYWNoLCBoYXNGYWxzeVZhbHVlcywgZmxhdHRlbiwgZmlsdGVyLCBvYmpFcXVhbCwgb2JqZWN0SW5BcnJheSwgcmVtb3ZlRHVwbGljYXRlT2JqLCByZW1vdmUsIGd0LCBsdCwgZ3RlLCBsdGUsIGVxLCBhbGwsIGFueSwgaXNBcnJheSwgaXNPYmplY3QsIG1vZGlmeSB9XG4iLCJjb25zdCBnZXRSYW5kb21JbnRlZ2VyID0gKG1pbiwgbWF4KSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluXG5cbmNvbnN0IGdldFJhbmRvbUNvb3JkcyA9ICgpID0+IHtcbiAgY29uc3QgeSA9IGdldFJhbmRvbUludGVnZXIoMSwgMTApXG4gIGNvbnN0IHggPSBnZXRSYW5kb21JbnRlZ2VyKDEsIDEwKVxuICByZXR1cm4geyB5LCB4IH1cbn1cblxuY29uc3QgZGVsYXkgPSBhc3luYyAobXMpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgc2V0VGltZW91dChyZXNvbHZlLCBtcylcbiAgfSlcbn1cblxuZXhwb3J0IHsgZ2V0UmFuZG9tSW50ZWdlciwgZ2V0UmFuZG9tQ29vcmRzLCBkZWxheSB9XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIGRlZmluZShHcCwgXCJjb25zdHJ1Y3RvclwiLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gIGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgXCJjb25zdHJ1Y3RvclwiLCBHZW5lcmF0b3JGdW5jdGlvbik7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgZGVmaW5lKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlLCBhc3luY0l0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIGRlZmluZShHcCwgaXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcblxuICBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIGluIG1vZGVybiBlbmdpbmVzXG4gIC8vIHdlIGNhbiBleHBsaWNpdGx5IGFjY2VzcyBnbG9iYWxUaGlzLiBJbiBvbGRlciBlbmdpbmVzIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gXCJvYmplY3RcIikge1xuICAgIGdsb2JhbFRoaXMucmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbiAgfSBlbHNlIHtcbiAgICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHtcbiAgICBhcnIyW2ldID0gYXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFycjI7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn0iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2kgPSBhcnIgPT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl07XG5cbiAgaWYgKF9pID09IG51bGwpIHJldHVybjtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG5cbiAgdmFyIF9zLCBfZTtcblxuICB0cnkge1xuICAgIGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRoSG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRoSG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXlMaW1pdCBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVSZXN0IGZyb20gXCIuL25vbkl0ZXJhYmxlUmVzdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn0iLCJpbXBvcnQgYXJyYXlXaXRob3V0SG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRob3V0SG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkgZnJvbSBcIi4vdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkuanNcIjtcbmltcG9ydCBub25JdGVyYWJsZVNwcmVhZCBmcm9tIFwiLi9ub25JdGVyYWJsZVNwcmVhZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59IiwiaW1wb3J0IGFycmF5TGlrZVRvQXJyYXkgZnJvbSBcIi4vYXJyYXlMaWtlVG9BcnJheS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlcy9zdHlsZS5jc3MnXG5pbXBvcnQgJy4vbG9naWMvbWVudV9oYW5kbGVyJ1xuaW1wb3J0ICcuL2xvZ2ljL2JvYXJkX2hhbmRsZXInXG5pbXBvcnQgJy4vbG9naWMvZ2FtZV9oYW5kbGVyJ1xuaW1wb3J0IHsgbWVudUhhbmRsZXIgfSBmcm9tICcuL2xvZ2ljL21lbnVfaGFuZGxlcidcbmltcG9ydCB7IGJvYXJkc0hhbmRsZXIgfSBmcm9tICcuL2xvZ2ljL2JvYXJkX2hhbmRsZXInXG5pbXBvcnQgeyBnYW1lSGFuZGxlciB9IGZyb20gJy4vbG9naWMvZ2FtZV9oYW5kbGVyJ1xuXG4vKiB0aGlzIGlzIHdoZXJlIGhhbmRsZXJzIGluaXRpYWxpemUgYW5kIHRoZSBnYW1lIGlzIHB1dCB0b2dldGhlciAqL1xuXG4oZnVuY3Rpb24gaW5pdEdhbWUgKCkge1xuICBtZW51SGFuZGxlci5pbml0TWVudSgpXG4gIGJvYXJkc0hhbmRsZXIuaW5pdEJvYXJkcygpXG4gIGdhbWVIYW5kbGVyLmluaXRHYW1lKClcbn0pKClcbiJdLCJuYW1lcyI6WyJzdGF0ZXMiLCJPYmplY3QiLCJmcmVlemUiLCJXQVRFUiIsIlNISVAiLCJNSVNTRUQiLCJISVQiLCJTVU5LIiwiQVJPVU5EX1NVTksiLCJldmVudHMiLCJCT0FSRF9IT1ZFUkVEIiwiQk9BUkRfQ0xJQ0tFRCIsIlNISVBfVkFMSURBVEVEIiwiU0hJUF9ST1RBVEVEIiwiU0hJUF9QTEFDRUQiLCJQTEFZRVJTX0NSRUFURUQiLCJHQU1FX1NUQVJURUQiLCJDT01QVVRFUl9QTEFDRURfU0hJUFMiLCJDT01QVVRFUl9CT0FSRF9DTElDS0VEIiwiQ09NUFVURVJfQk9BUkRfQVRUQUNLRUQiLCJQTEFZRVJfRklOSVNIRURfVFVSTiIsIkNPTVBVVEVSX0ZJTklTSEVEX1RVUk4iLCJHQU1FX0VOREVEIiwiUkVTVEFSVF9SRVFVRVNURUQiLCJSRVNUQVJUX1ZBTElEQVRFRCIsIkdBTUVfUkVTVEFSVEVEIiwiR2FtZWJvYXJkIiwiZ2V0UmFuZG9tSW50ZWdlciIsImdldFJhbmRvbUNvb3JkcyIsIl9nZXRSYW5kb21QbGFuZSIsIkFpR2FtZWJvYXJkIiwiZ2FtZWJvYXJkIiwiX3BsYWNlU2hpcEF0UmFuZG9tIiwic2l6ZSIsInBsYW5lIiwiY29vcmRzIiwic2V0UGxhbmUiLCJpc1ZhbGlkRm9yUGxhY2UiLCJ5IiwieCIsInBsYWNlIiwicGxhY2VGbGVldCIsInNpemVzIiwiYXNzaWduIiwiUGxheWVyIiwiY3VycnkiLCJndCIsImx0IiwicmVtb3ZlIiwiX2F0dGFja0RpcmVjdGlvbnMiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJfZ2V0T3Bwb3NpdGVEaXJlY3Rpb24iLCJkaXJlY3Rpb24iLCJfaXNTaGlwSG9yaXpvbnRhbCIsImhpdENlbGxzIiwibGVuZ3RoIiwiX2dldEVuZE9uQXhpcyIsImF4aXMiLCJnZXRMYXN0IiwiY29tcGFyaXNvbk9wIiwicmVkdWNlIiwicHJldiIsIm5leHQiLCJfZ2V0TGVmdG1vc3QiLCJfZ2V0UmlnaHRtb3N0IiwiX2dldFRvcG1vc3QiLCJfZ2V0Qm90dG9tbW9zdCIsIkFpUGxheWVyIiwiY29tcHV0ZXIiLCJsYXN0SGl0IiwiX2ZpbmRSYW5kb21TcG90VG9BdHRhY2siLCJib2FyZCIsImluY2x1ZGVzIiwic3RhdGUiLCJfZmluZFNwb3RBZnRlckhpdCIsImRpcmVjdGlvbnMiLCJrZXlzIiwicmFuZG9tRGlyZWN0aW9uIiwicnkiLCJyeCIsImlzVmFsaWRUYXJnZXQiLCJyYW5kb21Db29yZHMiLCJ2YWxpZGl0eSIsIl9nYWluT3Bwb3NpdGVFbmQiLCJsZWZ0bW9zdCIsInJpZ2h0bW9zdCIsInRvcG1vc3QiLCJib3R0b21tb3N0IiwiX2F0dGFja1NwZWNpZmljU3BvdCIsImF0dGFjayIsInN0YXR1cyIsImdldEF0dGFja1N0YXR1cyIsIl9hdHRhY2tJbkRpcmVjdGlvbiIsImF0dGFja1BsYXllciIsInZhbHVlIiwiX2F0dGFja0FmdGVySGl0IiwicHVzaCIsIl9hdHRhY2tSYW5kb21DZWxsIiwic2hpcFN0YXR1cyIsInNldERpcmVjdGlvbiIsInZhbCIsIm5hbWUiLCJ0eXBlIiwicmVwZWF0IiwiZmluZEluZGV4IiwicGlwZSIsIm1hcCIsImZsYXR0ZW4iLCJkZWNyZW1lbnQiLCJlcSIsImFueSIsImZpbHRlciIsIm9iamVjdEluQXJyYXkiLCJyZW1vdmVEdXBsaWNhdGVPYmoiLCJTaGlwIiwiX2NyZWF0ZVJvdyIsIl9jcmVhdGVHYW1lYm9hcmQiLCJfbWFwQ29vcmRzIiwicmVzdWx0IiwiaSIsIl9jb29yZHNUb0luZGV4ZXMiLCJmbGVldCIsIm1pc3NlZCIsIl9tYXBCb2FyZCIsIl9tYXBTaGlwIiwiX21hcE1pc3NlZCIsIl9tYXBIaXQiLCJfbWFwU3VuayIsIl9tYXBBcm91bmQiLCJfZmluZFNoaXAiLCJmaW5kIiwic2hpcCIsInNlZ21lbnRzIiwic2VnbWVudCIsIl9nZXRTZWdtZW50cyIsIl9pc1NoaXBTdW5rIiwiaXNTdW5rIiwiX2dldFNoaXBDZWxscyIsIl9nZXRTdW5rQ2VsbHMiLCJjZWxsIiwiX2FueVNoaXAiLCJpc0ZsZWV0U3VuayIsImV2ZXJ5IiwiX2lzT3ZlcmxhcHMiLCJvY2N1cGllZENlbGxzIiwidGFpbCIsImoiLCJfaXNPdmVyZmxvd3MiLCJfZ2V0Q2VsbFN0YXRlIiwiaXkiLCJpeCIsInJvdyIsIl9pc0FkamFjZW50VG9TaGlwcyIsInRvcENlbGwiLCJib3R0b21DZWxsIiwibGVmdENlbGwiLCJyaWdodENlbGwiLCJ0b3BMZWZ0IiwiYm90dG9tTGVmdCIsInRvcFJpZ2h0IiwiYm90dG9tUmlnaHQiLCJfZ2V0U3Vycm91bmRpbmdDZWxscyIsIl9pc0NlbGxWYWxpZCIsImdldEFyZWFBcm91bmRTdW5rIiwic3Vua0NlbGxzIiwicmVjZWl2ZUF0dGFjayIsImhpdFNoaXAiLCJoaXRTZWdtZW50SW5kZXgiLCJoaXQiLCJhdHRhY2tlZENlbGwiLCJuZXdQbGFuZSIsImlzRmlyc3QiLCJ0dXJuIiwiY2hhbmdlVHVybiIsIl90eXBlcyIsIl9zZWdtZW50c0NyZWF0b3IiLCJob3Jpem9udGFsbHkiLCJpbnRhY3QiLCJ2ZXJ0aWNhbGx5IiwidW5kZWZpbmVkIiwiRXJyb3IiLCJldmVudHNIYW5kbGVyIiwiZG9tQm9hcmQiLCJxdWVyeURvY3VtZW50IiwiYm9hcmRzSGFuZGxlciIsInBsYXllckJvYXJkIiwiY29tcHV0ZXJCb2FyZCIsInJlbmRlclBsYXllciIsInJlbmRlckJvYXJkIiwicmVuZGVyQ29tcHV0ZXIiLCJjcmVhdGVCb2FyZHMiLCJjcmVhdGVCb2FyZCIsInJlc2V0Qm9hcmRzIiwicmVjcmVhdGVCb2FyZCIsInNlbmRDb29yZHNGb3JWYWxpZGF0aW9uIiwiZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiZXh0cmFjdENvb3JkcyIsInRyaWdnZXIiLCJoaWdodGxpZ2h0VmFsaWRhdGVkQ29vcmRzIiwiZGF0YSIsImhpZ2hsaWdodEZ1dHVyZVNoaXAiLCJzZW5kU2hpcEZvclZhbGlkYXRpb24iLCJwbGFjZVZhbGlkYXRlZFNoaXAiLCJyZW5kZXJDb21wdXRlclN0YXRlIiwicmVuZGVyUGxheWVyU3RhdGUiLCJzZW5kQXR0YWNrZWRDb29yZHMiLCJjaGFuZ2VQbGFuZSIsImluaXRCb2FyZHMiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xlYXJIaWdobGlnaHRzIiwib24iLCJvbkVhY2giLCJkZWxheSIsImdhbWVIYW5kbGVyIiwic2hpcHNUb1BsYWNlIiwicGxheWVyIiwiZ2FtZVN0YXJ0ZWQiLCJnYW1lRW5kZWQiLCJ2YWxpZGF0ZUNvb3JkcyIsIm5leHRTaGlwU2l6ZSIsImlzVmFsaWQiLCJ2YWxpZGF0ZVBsYWNlbWVudCIsInNoaWZ0Iiwic2hpcFR5cGUiLCJhcmVTaGlwc1BsYWNlZCIsInN0YXJ0R2FtZSIsInJlc3RhcnRHYW1lIiwiaGFuZGxlUGxheWVyQXR0YWNrIiwiaGFuZGxlQ29tcHV0ZXJBdHRhY2siLCJ2YWxpZGF0ZVJlc3RhcnQiLCJlbmRlZCIsImluaXRHYW1lIiwid3JhcEluRGl2IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInJlcGxhY2VFbCIsImNsb25lRWwiLCJjcmVhdGVFbCIsImFkZElkIiwiYWRkVGV4dCIsIm1lbnVIYW5kbGVyIiwic3RhcnRCdG4iLCJyZXN0YXJ0QnRuIiwibmFtZUlucCIsInJvdGF0ZUJ0biIsImxvZ0RpdiIsImhpbnRzRGl2Iiwic2hpcHNQbGFjZWQiLCJtc2dDb3VudCIsIl9oaWRlIiwiZWwiLCJfc2hvdyIsIl9yZXBsYWNlSGludHMiLCJtc2ciLCJoYW5kbGVTdGFydCIsImZvckVhY2giLCJkaXNhYmxlZCIsImhhbmRsZUVuZCIsImlubmVyVGV4dCIsInJlcXVlc3RSZXN0YXJ0IiwiaGFuZGxlUmVzdGFydCIsImNoZWNrU3RhcnRDb25kaXRpb25zIiwiZGF0YXNldCIsInJvdGF0ZSIsImNoZWNrU2hpcHNSZWFkaW5lc3MiLCJfY3JlYXRlTG9nTWVzc2FnZSIsImxvZ0NsYXNzIiwiZGlzcGxheUxvZ01lc3NhZ2UiLCJsb2ciLCJoaW50IiwiaWQiLCJwcmVwZW5kIiwiaW5pdE1lbnUiLCJjbGVhckVsQ29udGVudCIsIl9jZWxsVGFibGUiLCJzIiwidyIsImgiLCJtIiwiYSIsIl9jZWxsQ2xhc3NlcyIsInZhbHVlcyIsIl9jcmVhdGVDZWxsIiwiaXNIaWRkZW4iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJfY2VsbHNGaW5kZXIiLCJxdWVyeVNlbGVjdG9yIiwiY29vcmQiLCJOdW1iZXIiLCJhcHBlbmQiLCJib2FyZFN0YXRlIiwiY2VsbFN0YXRlIiwiY2VsbFZpZXciLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xhc3NOYW1lIiwidmFsaWRDZWxscyIsIkJvb2xlYW4iLCJzdHIiLCJjbGFzc2VzIiwiZGl2IiwiZWxlbWVudCIsInRleHRDb250ZW50IiwibmV3Q2xhc3MiLCJyZW1vdmVkIiwicmVwbGFjZUNsYXNzIiwib2xkQ2xhc3MiLCJyZXBsYWNlIiwidG9nZ2xlQ2xhc3MiLCJ0b2dnbGVkQ2xhc3MiLCJ0b2dnbGUiLCJhZGRDbGFzc2VzIiwicmVtb3ZlQ2xhc3NlcyIsImFkZERhdGFBdHRyIiwiZGF0YUF0dHIiLCJkYXRhVmFsIiwiY3NzU2VsZWN0b3IiLCJxdWVyeSIsIm9sZEVsZW1lbnQiLCJuZXdFbGVtZW50IiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsImNsb25lTm9kZSIsImxhc3RDaGlsZCIsImV2ZW50TmFtZSIsImZuIiwiYXJyT2ZFdmVudHMiLCJldmVudCIsIm9mZiIsInJlbW92ZWRGbiIsImN1cnJpZWQiLCJhcmdzIiwiYmluZCIsImNoZWNrVHJ1dGhpbmVzcyIsImNoZWNrRmFsc2luZXNzIiwiaGFzVHJ1dGh5VmFsdWVzIiwiYXJyIiwic29tZSIsImhhc0ZhbHN5VmFsdWVzIiwicmVwbGFjZUV2ZXJ5TnRoIiwibnRoIiwic3RhcnQiLCJ1bnRpbCIsImxlbiIsInJlcGxhY2VBdCIsImluZGV4IiwiZnVuY3RvciIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsIml0ZW0iLCJwcm9wIiwiaXNBcnJheSIsImlzT2JqZWN0IiwiZnVuY3Rpb25zIiwiYWNjIiwibiIsImRlY3JlbWVudEVhY2giLCJpbmNyZW1lbnQiLCJpbmNyZW1lbnRFYWNoIiwibnVtIiwiaWxlbiIsImphcnIiLCJqbGVuIiwib2JqRXF1YWwiLCJvYmoxIiwib2JqMiIsIm9iaiIsImN1cnJlbnRPYmoiLCJzcGxpY2UiLCJiIiwiZ3RlIiwibHRlIiwiYWxsIiwicHJlZCIsIm1vZGlmeSIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0Il0sInNvdXJjZVJvb3QiOiIifQ==