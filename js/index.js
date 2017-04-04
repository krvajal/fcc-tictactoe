'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _reactTapEventPlugin2.default)();

var Square = function (_React$Component) {
  _inherits(Square, _React$Component);

  function Square() {
    _classCallCheck(this, Square);

    var _this = _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).call(this));

    _this.state = { value: null };
    return _this;
  }

  _createClass(Square, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'box', onClick: function onClick() {
            return _this2.props.onClick();
          } },
        ' ',
        this.props.value
      );
    }
  }]);

  return Square;
}(_react2.default.Component);

var Board = function (_React$Component2) {
  _inherits(Board, _React$Component2);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
  }

  _createClass(Board, [{
    key: 'renderSquare',
    value: function renderSquare(i) {
      var _this4 = this;

      return _react2.default.createElement(Square, { value: this.props.value[i], onClick: function onClick() {
          return _this4.props.onClick(i);
        } });
    }
  }, {
    key: 'render',
    value: function render() {
      var winner = calculateWinner(this.props.value);
      if (winner) {
        return _react2.default.createElement(
          'div',
          { className: 'game-board' },
          _react2.default.createElement(
            'div',
            { className: 'winner-wrapper' },
            _react2.default.createElement(
              'div',
              { className: 'winner-info' },
              '  ',
              winner,
              ' '
            ),
            'won'
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'game-board' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            this.renderSquare(0),
            this.renderSquare(1),
            this.renderSquare(2)
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            this.renderSquare(3),
            this.renderSquare(4),
            this.renderSquare(5)
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            this.renderSquare(6),
            this.renderSquare(7),
            this.renderSquare(8)
          )
        );
      }
    }
  }]);

  return Board;
}(_react2.default.Component);

function TurnButton(props) {
  if (props.active) {
    return _react2.default.createElement(
      'button',
      { className: 'turn-btn active' },
      props.value,
      '     '
    );
  } else {
    return _react2.default.createElement(
      'button',
      { className: 'turn-btn' },
      props.value
    );
  }
}

var Game = function (_React$Component3) {
  _inherits(Game, _React$Component3);

  function Game() {
    _classCallCheck(this, Game);

    var _this5 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));

    _this5.handleChange = function (event, index, value) {
      _this5.setState({ difficulty: value });
    };

    _this5.state = { squares: Array(9).fill(null), isXNext: true, difficulty: 1, playing: false };
    return _this5;
  }

  _createClass(Game, [{
    key: 'render',
    value: function render() {
      var _this6 = this;

      var status = void 0;
      if (this.state.isXNext) {
        status = "X Turn";
      } else {
        status = "O Turn";
      }

      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          _SelectField2.default,
          {
            floatingLabelText: '',
            value: this.state.difficulty,
            onChange: this.handleChange,
            disabled: this.state.playing
          },
          _react2.default.createElement(_MenuItem2.default, { value: 1, primaryText: 'Easy' }),
          _react2.default.createElement(_MenuItem2.default, { value: 2, primaryText: 'Medium' }),
          _react2.default.createElement(_MenuItem2.default, { value: 3, primaryText: 'Hard' }),
          _react2.default.createElement(_MenuItem2.default, { value: 4, primaryText: 'Play against a friend' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'turn-buttons' },
          _react2.default.createElement(TurnButton, { value: 'X', active: this.state.isXNext }),
          _react2.default.createElement(TurnButton, { value: 'O', active: !this.state.isXNext })
        ),
        _react2.default.createElement(
          'div',
          { className: 'status-info' },
          status
        ),
        _react2.default.createElement(Board, { value: this.state.squares, onClick: function onClick(i) {
            return _this6.handleClick(i);
          } }),
        _react2.default.createElement(
          'button',
          { className: 'restart-btn', onClick: function onClick() {
              return _this6.startState();
            } },
          'RESTART GAME'
        )
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick(i) {

      if (this.canPlay()) {
        var squares = this.state.squares.slice();
        var winner = calculateWinner(squares);
        if (winner || squares[i]) return;
        squares[i] = this.state.isXNext ? 'X' : 'O';
        this.setState({ squares: squares, isXNext: !this.state.isXNext });
        this.setState({ playing: true });
        if (this.state.difficulty !== 4) {
          this.playComputer();
        }
      }
    }
  }, {
    key: 'playComputer',
    value: function playComputer() {
      this.setState({ playing: true });
    }
  }, {
    key: 'canPlay',
    value: function canPlay() {

      if (this.state.difficulty == 4) return true;
      if (this.state.isXNext) return true;
      return false;
    }
  }, {
    key: 'startState',
    value: function startState() {

      this.setState({ squares: Array(9).fill(null), isXNext: true });
      this.setState({ playing: false });
    }
  }]);

  return Game;
}(_react2.default.Component);

var App = function App() {
  return _react2.default.createElement(
    _MuiThemeProvider2.default,
    null,
    _react2.default.createElement(Game, null)
  );
};

var elem = _react2.default.createElement(App, null);
_reactDom2.default.render(elem, document.getElementById("root"));

function calculateWinner(squares) {
  var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (var i = 0; i < lines.length; i++) {
    var _lines$i = _slicedToArray(lines[i], 3),
        a = _lines$i[0],
        b = _lines$i[1],
        c = _lines$i[2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}