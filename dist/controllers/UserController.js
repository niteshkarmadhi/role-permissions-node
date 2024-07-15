"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BaseDBHandler = require("../BaseDBHandler");
var _lodash = require("lodash");
module.exports = /*#__PURE__*/function (_BaseDBHandler) {
  function UserController(connection, dBDialect, _userId) {
    var _this;
    _classCallCheck(this, UserController);
    _this = _callSuper(this, UserController, [connection, dBDialect]);
    _defineProperty(_this, "userId", null);
    _this.userId = _userId;
    return _this;
  }
  _inherits(UserController, _BaseDBHandler);
  return _createClass(UserController, [{
    key: "revokePermissions",
    value: function () {
      var _revokePermissions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(permissionSlug) {
        var permissionIds;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getIdBySlugs('permissions', permissionSlug);
            case 2:
              permissionIds = _context.sent;
              this.__delete('group_has_permissions', "user_id = '".concat(this.userId, "' and permission_id in ").concat(this.prepareForWhereIn(permissionIds), " "));
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function revokePermissions(_x) {
        return _revokePermissions.apply(this, arguments);
      }
      return revokePermissions;
    }()
  }, {
    key: "assignPermissions",
    value: function () {
      var _assignPermissions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(permissionSlug) {
        var _this2 = this;
        var permissionIds;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.getIdBySlugs('permissions', permissionSlug);
            case 2:
              permissionIds = _context2.sent;
              permissionIds.forEach(function (permissionId) {
                _this2.__insert('user_permissions', {
                  user_id: _this2.userId,
                  permission_id: permissionId
                });
              });
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function assignPermissions(_x2) {
        return _assignPermissions.apply(this, arguments);
      }
      return assignPermissions;
    }()
  }, {
    key: "group",
    value: function () {
      var _group = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.__findOne("\n            select \n                groups.slug as slug,\n                groups.id as group_id,\n                groups.name as group_name\n            from \n                user_groups\n            join groups on groups.id = user_groups.group_id\n            where user_id = '".concat(this.userId, "' "));
            case 2:
              return _context3.abrupt("return", _context3.sent);
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function group() {
        return _group.apply(this, arguments);
      }
      return group;
    }()
  }, {
    key: "groups",
    value: function () {
      var _groups = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.__select("\n            select \n                groups.slug as slug,\n                groups.id as group_id,\n                groups.name as group_name\n            from \n                user_groups\n            join groups on groups.id = user_groups.group_id\n            where user_groups.user_id = '".concat(this.userId, "' "));
            case 2:
              return _context4.abrupt("return", _context4.sent);
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function groups() {
        return _groups.apply(this, arguments);
      }
      return groups;
    }()
  }, {
    key: "permissions",
    value: function () {
      var _permissions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var permissionIds, userGroup, userPermissionIds;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              permissionIds = [];
              _context5.next = 3;
              return this.__findOne("\n            select \n                group_id\n            from \n                user_groups\n            where user_id = '".concat(this.userId, "'"));
            case 3:
              userGroup = _context5.sent;
              if (!userGroup) {
                _context5.next = 8;
                break;
              }
              _context5.next = 7;
              return this.__select("\n                select \n                    permission_id\n                from \n                    group_has_permissions\n                where group_id = '".concat(userGroup.group_id, "'"));
            case 7:
              permissionIds = _context5.sent.map(function (item) {
                return item.permission_id;
              });
            case 8:
              _context5.next = 10;
              return this.__select("\n            select \n                permission_id\n            from \n                user_permissions\n            where user_id = '".concat(this.userId, "'"));
            case 10:
              userPermissionIds = _context5.sent.map(function (item) {
                return item.permission_id;
              });
              permissionIds = [].concat(_toConsumableArray(permissionIds), _toConsumableArray(userPermissionIds));
              _context5.next = 14;
              return this.__select("\n            select name, id, slug from permissions where id in ".concat(this.prepareForWhereIn(permissionIds), "\n        "));
            case 14:
              return _context5.abrupt("return", _context5.sent);
            case 15:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function permissions() {
        return _permissions.apply(this, arguments);
      }
      return permissions;
    }()
  }, {
    key: "assignGroup",
    value: function () {
      var _assignGroup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(groupSlug) {
        var _this3 = this;
        var groupSlugs, groupIds;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              groupSlugs = this.makeValueToArray(groupSlug);
              _context6.next = 3;
              return this.getIdBySlugs('groups', groupSlugs);
            case 3:
              groupIds = _context6.sent;
              groupIds.forEach(function (groupIds) {
                _this3.__insert('user_groups', {
                  user_id: _this3.userId,
                  group_id: groupIds
                });
              });
            case 5:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function assignGroup(_x3) {
        return _assignGroup.apply(this, arguments);
      }
      return assignGroup;
    }()
  }, {
    key: "syncPermissions",
    value: function () {
      var _syncPermissions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(permissionSlug) {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.__delete('group_has_permissions', "user_id = '".concat(this.userId, "'"));
            case 2:
              this.assignPermissions(permissionSlug);
            case 3:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function syncPermissions(_x4) {
        return _syncPermissions.apply(this, arguments);
      }
      return syncPermissions;
    }()
  }, {
    key: "checkPermissions",
    value: function () {
      var _checkPermissions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(permissionSlug) {
        var isDirectPermission,
          permissionId,
          user_permissions,
          groupIds,
          groupBasedPermissionIds,
          _args8 = arguments;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              isDirectPermission = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : false;
              permissionSlug = this.makeValueToArray(permissionSlug);
              _context8.next = 4;
              return this.getIdBySlugs('permissions', permissionSlug);
            case 4:
              permissionId = _context8.sent;
              _context8.next = 7;
              return this.__findOne("select id from user_permissions where permission_id = '".concat(permissionId, "' and user_id = '").concat(this.userId, "' "));
            case 7:
              user_permissions = _context8.sent;
              if (!isDirectPermission) {
                _context8.next = 12;
                break;
              }
              return _context8.abrupt("return", user_permissions ? true : false);
            case 12:
              if (user_permissions) {
                _context8.next = 22;
                break;
              }
              _context8.next = 15;
              return this.__select("select group_id from user_groups where user_id = '".concat(this.userId, "' "));
            case 15:
              groupIds = _context8.sent.map(function (e) {
                return e.group_id;
              });
              _context8.next = 18;
              return this.__select("select permission_id from group_has_permissions where group_id in ".concat(this.prepareForWhereIn(groupIds)));
            case 18:
              groupBasedPermissionIds = _context8.sent.map(function (e) {
                return e.permission_id;
              });
              return _context8.abrupt("return", _lodash.intersection(permissionId, groupBasedPermissionIds).length > 0);
            case 22:
              return _context8.abrupt("return", user_permissions ? true : false);
            case 23:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function checkPermissions(_x5) {
        return _checkPermissions.apply(this, arguments);
      }
      return checkPermissions;
    }()
  }, {
    key: "hasPermission",
    value: function () {
      var _hasPermission = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(permissionSlug) {
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return this.checkPermissions(permissionSlug);
            case 2:
              return _context9.abrupt("return", _context9.sent);
            case 3:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function hasPermission(_x6) {
        return _hasPermission.apply(this, arguments);
      }
      return hasPermission;
    }()
  }, {
    key: "can",
    value: function () {
      var _can = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(permissionSlug) {
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return this.checkPermissions(permissionSlug);
            case 2:
              return _context10.abrupt("return", _context10.sent);
            case 3:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function can(_x7) {
        return _can.apply(this, arguments);
      }
      return can;
    }()
  }, {
    key: "hasAnyPermission",
    value: function () {
      var _hasAnyPermission = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(permissionSlug) {
        var response;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this.checkPermissions(permissionSlug);
            case 2:
              response = _context11.sent;
              return _context11.abrupt("return", response[0].total > 0 ? true : false);
            case 4:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function hasAnyPermission(_x8) {
        return _hasAnyPermission.apply(this, arguments);
      }
      return hasAnyPermission;
    }()
  }, {
    key: "hasAllPermissions",
    value: function () {
      var _hasAllPermissions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(permissionSlug) {
        var permissionIds, response;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              permissionIds = this.makeValueToArray(permissionSlug);
              _context12.next = 3;
              return this.checkPermissions(permissionIds);
            case 3:
              response = _context12.sent;
              return _context12.abrupt("return", response[0].total == permissionIds.length ? true : false);
            case 5:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function hasAllPermissions(_x9) {
        return _hasAllPermissions.apply(this, arguments);
      }
      return hasAllPermissions;
    }()
  }, {
    key: "hasDirectPermission",
    value: function () {
      var _hasDirectPermission = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(permissionSlug) {
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return this.checkPermissions(permissionSlug, true);
            case 2:
              return _context13.abrupt("return", _context13.sent);
            case 3:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function hasDirectPermission(_x10) {
        return _hasDirectPermission.apply(this, arguments);
      }
      return hasDirectPermission;
    }()
  }, {
    key: "hasAnyDirectPermission",
    value: function () {
      var _hasAnyDirectPermission = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(permissionSlug) {
        var response;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return this.checkPermissions(permissionSlug, true);
            case 2:
              response = _context14.sent;
              return _context14.abrupt("return", response[0].total > 0 ? true : false);
            case 4:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function hasAnyDirectPermission(_x11) {
        return _hasAnyDirectPermission.apply(this, arguments);
      }
      return hasAnyDirectPermission;
    }()
  }, {
    key: "hasAllDirectPermissions",
    value: function () {
      var _hasAllDirectPermissions = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(permissionSlug) {
        var permissionIds, response;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              permissionIds = this.makeValueToArray(permissionSlug);
              _context15.next = 3;
              return this.checkPermissions(permissionIds, true);
            case 3:
              response = _context15.sent;
              return _context15.abrupt("return", response[0].total == permissionIds.length ? true : false);
            case 5:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function hasAllDirectPermissions(_x12) {
        return _hasAllDirectPermissions.apply(this, arguments);
      }
      return hasAllDirectPermissions;
    }()
  }, {
    key: "revokeGroup",
    value: function () {
      var _revokeGroup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(groupSlug) {
        var groupIds;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return this.getIdBySlugs('groups', groupSlug);
            case 2:
              groupIds = _context16.sent;
              this.__delete('user_groups', "user_id = '".concat(this.userId, "' and group_id in ").concat(this.prepareForWhereIn(groupIds), " "));
            case 4:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function revokeGroup(_x13) {
        return _revokeGroup.apply(this, arguments);
      }
      return revokeGroup;
    }()
  }, {
    key: "hasGroup",
    value: function () {
      var _hasGroup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(groupSlug) {
        var groupId;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return this.getIdBySlugs('groups', groupSlug, true);
            case 2:
              groupId = _context17.sent;
              return _context17.abrupt("return", this.__findOne("select id from user_groups where user_id = '".concat(this.userId, "' and group_id = '").concat(groupId, "' ")));
            case 4:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function hasGroup(_x14) {
        return _hasGroup.apply(this, arguments);
      }
      return hasGroup;
    }()
  }, {
    key: "hasAnyGroup",
    value: function () {
      var _hasAnyGroup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(groupSlug) {
        var groupIds;
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return this.getIdBySlugs('groups', groupSlug);
            case 2:
              groupIds = _context18.sent;
              return _context18.abrupt("return", this.__findOne("select id from user_groups where user_id = '".concat(this.userId, "' and group_id in ").concat(this.prepareForWhereIn(groupIds), " ")));
            case 4:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this);
      }));
      function hasAnyGroup(_x15) {
        return _hasAnyGroup.apply(this, arguments);
      }
      return hasAnyGroup;
    }()
  }, {
    key: "hasAllGroups",
    value: function () {
      var _hasAllGroups = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(groupSlug) {
        var groupIds, response;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return this.getIdBySlugs('groups', groupSlug);
            case 2:
              groupIds = _context19.sent;
              response = this.__select("select count(id) as total from user_groups where user_id = '".concat(this.userId, "' and group_id in ").concat(this.prepareForWhereIn(groupIds), " "));
              return _context19.abrupt("return", response[0].total == groupIds.length);
            case 5:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function hasAllGroups(_x16) {
        return _hasAllGroups.apply(this, arguments);
      }
      return hasAllGroups;
    }()
  }]);
}(BaseDBHandler);