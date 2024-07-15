"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
module.exports = /*#__PURE__*/function () {
  function PostgresHandler(_connection) {
    var _this = this;
    _classCallCheck(this, PostgresHandler);
    _defineProperty(this, "connection", null);
    _defineProperty(this, "select", function (query) {
      return new Promise(function (resolve, reject) {
        _this.connection.query(query, function (err, results) {
          if (err) {
            reject('Error executing the query: ' + err.stack);
            return;
          }
          resolve(results.rows);
        });
      });
    });
    _defineProperty(this, "findOne", function (query) {
      return new Promise(function (resolve, reject) {
        _this.select(query).then(function (results) {
          resolve(Array.isArray(results) && results.length > 0 ? results[0] : null);
        })["catch"](reject);
      });
    });
    this.connection = _connection;
  }
  return _createClass(PostgresHandler, [{
    key: "insert",
    value: function insert(table, values) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        var fieldsName = Object.keys(values);
        var _values = Object.values(values).map(function (value) {
          return "'".concat(value, "'");
        }).join(', ');
        var insertQuery = "INSERT INTO ".concat(table, " (").concat(fieldsName.join(', '), ") VALUES (").concat(_values, ") RETURNING *");
        _this2.connection.query(insertQuery, function (err, results, fields) {
          if (err) {
            reject('Error executing the query:' + err.stack);
            return;
          }
          resolve(results.rows[0]);
        });
      });
    }
  }, {
    key: "update",
    value: function update(table, obj) {
      var _this3 = this;
      var condition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return new Promise(function (resolve, reject) {
        var setFieldValues = Object.entries(obj).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            field = _ref2[0],
            value = _ref2[1];
          return " ".concat(field, " = '").concat(value, "' ");
        }).join(' , ');
        var updateQuery = "UPDATE ".concat(table, " SET ").concat(setFieldValues, " ").concat(condition ? 'WHERE ' + condition : '', "  RETURNING *");
        _this3.connection.query(updateQuery, function (err, results, fields) {
          if (err) {
            reject('Error executing the update query:' + err.stack);
            return;
          }
          resolve(results.insertId);
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(table) {
      var _this4 = this;
      var condition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return new Promise(function (resolve, reject) {
        var updateQuery = "DELETE FROM ".concat(table, " ").concat(condition ? 'WHERE ' + condition : '');
        _this4.connection.query(updateQuery, function (err, results, fields) {
          if (err) {
            reject('Error executing the update query:' + err.stack);
            return;
          }
          resolve(results.insertId);
        });
      });
    }
  }]);
}();