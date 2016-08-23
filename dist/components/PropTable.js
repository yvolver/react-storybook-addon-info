'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropVal = require('./PropVal');

var _PropVal2 = _interopRequireDefault(_PropVal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypesMap = new _map2.default();
for (var typeName in _react2.default.PropTypes) {
  if (!_react2.default.PropTypes.hasOwnProperty(typeName)) {
    continue;
  }
  var type = _react2.default.PropTypes[typeName];
  PropTypesMap.set(type, typeName);
  PropTypesMap.set(type.isRequired, typeName);
}

var stylesheet = {
  propTable: {
    marginLeft: -10,
    borderSpacing: '10px 5px',
    borderCollapse: 'separate'
  }
};

var PropTable = function (_React$Component) {
  (0, _inherits3.default)(PropTable, _React$Component);

  function PropTable() {
    (0, _classCallCheck3.default)(this, PropTable);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(PropTable).apply(this, arguments));
  }

  (0, _createClass3.default)(PropTable, [{
    key: 'render',
    value: function render() {
      var type = this.props.type;

      if (!type) {
        return null;
      }

      var props = {};

      if (type.propTypes) {
        for (var property in type.propTypes) {
          if (!type.propTypes.hasOwnProperty(property)) {
            continue;
          }
          var typeInfo = type.propTypes[property];
          var propType = PropTypesMap.get(typeInfo) || 'other';
          var required = typeInfo.isRequired === undefined ? 'yes' : 'no';
          props[property] = { property: property, propType: propType, required: required };
        }
      }

      if (type.defaultProps) {
        for (var _property in type.defaultProps) {
          if (!type.defaultProps.hasOwnProperty(_property)) {
            continue;
          }
          var value = type.defaultProps[_property];
          if (value === undefined) {
            continue;
          }
          if (!props[_property]) {
            props[_property] = { property: _property };
          }
          props[_property].defaultValue = value;
        }
      }

      if (type.propDescriptions) {
        for (var _property2 in type.propDescriptions) {
          // if there's no matching prop, skip the description
          if (!type.propDescriptions.hasOwnProperty(_property2)) {
            continue;
          }

          // The value of the description
          var _value = type.propDescriptions[_property2];

          // Skip undefined values
          if (_value === undefined) {
            continue;
          }

          // If we don't have this prop yet, save it
          if (!props[_property2]) {
            props[_property2] = { property: _property2 };
          }

          props[_property2].propDescriptions = _value;
        }
      }

      var array = (0, _values2.default)(props);
      if (!array.length) {
        return _react2.default.createElement(
          'small',
          null,
          'No propTypes defined!'
        );
      }
      array.sort(function (a, b) {
        return a.property > b.property;
      });

      return _react2.default.createElement(
        'table',
        { className: 'props-table', style: stylesheet.propTable },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              { className: 'props-table__header' },
              'property'
            ),
            _react2.default.createElement(
              'th',
              { className: 'props-table__header' },
              'propType'
            ),
            _react2.default.createElement(
              'th',
              { className: 'props-table__header' },
              'required'
            ),
            _react2.default.createElement(
              'th',
              { className: 'props-table__header' },
              'default'
            ),
            _react2.default.createElement(
              'th',
              { className: 'props-table__header' },
              'description'
            )
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          array.map(function (row) {
            return _react2.default.createElement(
              'tr',
              { className: 'props-table__row', key: row.property },
              _react2.default.createElement(
                'td',
                { className: 'props-table__cell cell__property' },
                row.property
              ),
              _react2.default.createElement(
                'td',
                { className: 'props-table__cell cell__type' },
                row.propType
              ),
              _react2.default.createElement(
                'td',
                { className: 'props-table__cell cell__required' },
                row.required
              ),
              _react2.default.createElement(
                'td',
                { className: 'props-table__cell cell__default' },
                row.defaultValue === undefined ? '-' : _react2.default.createElement(_PropVal2.default, { val: row.defaultValue })
              ),
              _react2.default.createElement(
                'td',
                { className: 'props-table__cell cell__description' },
                row.description
              )
            );
          })
        )
      );
    }
  }]);
  return PropTable;
}(_react2.default.Component);

exports.default = PropTable;


PropTable.displayName = 'PropTable';
PropTable.propTypes = {
  type: _react2.default.PropTypes.func
};