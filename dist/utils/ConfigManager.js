"use strict";

var _templateObject;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var fs = require('fs');
var path = require('path');
module.exports = /*#__PURE__*/function () {
  function ConfigManager() {
    _classCallCheck(this, ConfigManager);
    _defineProperty(this, "configJsonFilePath", path.join(__dirname, '..', 'utils', 'config.json'));
  }
  return _createClass(ConfigManager, [{
    key: "getConfig",
    value: function getConfig() {
      var _this = this;
      return new Promise(function (resolve, reject) {
        fs.readFile(_this.configJsonFilePath, 'utf8', function (err, data) {
          if (err) {
            reject(err);
            return;
          }
          var jsonData;
          try {
            jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (parseErr) {
            reject(parseErr);
            return;
          }
        });
      });
    }
  }, {
    key: "setConfig",
    value: function setConfig(dataJson) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        _this2.getConfig().then(function (jsonData) {
          var _jsonData = _objectSpread(_objectSpread({}, jsonData), dataJson);
          fs.writeFile(_this2.configJsonFilePath, JSON.stringify(_jsonData, null, 2), 'utf8', function (writeErr) {
            if (writeErr) {
              reject(writeErr);
              return;
            }
            resolve(true);
          });
        })["catch"](function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: "tableDefinations",
    value: function tableDefinations() {
      return {
        mysql: ["CREATE TABLE permissions (\n                    id INT AUTO_INCREMENT PRIMARY KEY,\n                    name VARCHAR(255) NOT NULL,\n                    slug VARCHAR(100) NOT NULL,\n                    description TEXT,\n                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n                )", "CREATE TABLE groups (\n                    id INT AUTO_INCREMENT PRIMARY KEY,\n                    name VARCHAR(255) NOT NULL,\n                    slug VARCHAR(100) NOT NULL,\n                    description TEXT,\n                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n                );", "CREATE TABLE group_has_permissions (\n                    id INT AUTO_INCREMENT PRIMARY KEY,\n                    group_id INT NOT NULL,\n                    permission_id INT NOT NULL,\n                    FOREIGN KEY (group_id) REFERENCES groups(id),\n                    FOREIGN KEY (permission_id) REFERENCES permissions(id)\n                );", "CREATE TABLE user_groups (\n                    id INT AUTO_INCREMENT PRIMARY KEY,\n                    group_id INT NOT NULL,\n                    user_id INT NOT NULL,\n                    FOREIGN KEY (group_id) REFERENCES groups(id)\n                );"(_templateObject || (_templateObject = _taggedTemplateLiteral(["CREATE TABLE user_permissions (\n                    id INT AUTO_INCREMENT PRIMARY KEY,\n                    permission_id INT NOT NULL,\n                    user_id INT NOT NULL,\n                    FOREIGN KEY (permission_id) REFERENCES permissions(id)\n                );"])))],
        postgress: ["CREATE TABLE permissions (\n                    id SERIAL PRIMARY KEY,\n                    name VARCHAR(255) NOT NULL,\n                    slug VARCHAR(100) NOT NULL,\n                    description TEXT,\n                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n                );", "CREATE TABLE groups (\n                    id SERIAL PRIMARY KEY,\n                    name VARCHAR(255) NOT NULL,\n                    slug VARCHAR(100) NOT NULL,\n                    description TEXT,\n                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n                );", "CREATE TABLE group_has_permissions (\n                    id SERIAL PRIMARY KEY,\n                    group_id INT NOT NULL REFERENCES groups(id),\n                    permission_id INT NOT NULL REFERENCES permissions(id)\n                );", "CREATE TABLE user_groups (\n                    id SERIAL PRIMARY KEY,\n                    group_id INT NOT NULL REFERENCES groups(id),\n                    user_id INT NOT NULL\n                );", "CREATE TABLE user_permissions (\n                    id SERIAL PRIMARY KEY,\n                    permission_id INT NOT NULL REFERENCES permissions(id),\n                    user_id INT NOT NULL\n                );"]
      };
    }
  }]);
}();