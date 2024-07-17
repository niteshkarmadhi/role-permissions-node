import { initializePermissionManager as __initializePermissionManager } from "./middleware/initializePermissionManager";
import __PermissionManager from "./PermissionManager"
import dotenv from 'dotenv';

dotenv.config();

export const initializePermissionManager = __initializePermissionManager;
export const PermissionManager = __PermissionManager;