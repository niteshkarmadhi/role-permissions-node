"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionManager = exports.initializePermissionManager = void 0;
const initializePermissionManager_1 = require("./middleware/initializePermissionManager");
const PermissionManager_1 = __importDefault(require("./PermissionManager"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.initializePermissionManager = initializePermissionManager_1.initializePermissionManager;
exports.PermissionManager = PermissionManager_1.default;
