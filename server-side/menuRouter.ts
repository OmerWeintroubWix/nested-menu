import * as express from "express";
import {createMenu, deleteMenu, getMenus, renameMenu} from "./menuControllers";

const router = express.Router()

const BASE_URL = "/api/menu/";
router.get(BASE_URL, getMenus);
router.post(BASE_URL, createMenu)
router.delete(BASE_URL + ':menuId', deleteMenu)
router.put(BASE_URL + ':menuId', renameMenu);
export default router