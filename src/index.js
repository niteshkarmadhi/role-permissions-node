const initializePermissionManager = require("./middleware/initializePermissionManager");
require('dotenv').config();

module.exports = {
    initializePermissionManager: initializePermissionManager()
}