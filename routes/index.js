import {
  regUser,
  loginUser,
  getProfile,
  changePassword,
  createOrder
} from "../controllers/index.js";
import { authPioneer } from "../middleware/index.js";
import express from "express";
// import { authPioneer } from "../middleware/index.js";
const router = express.Router();



router.post("/regUser", regUser);
router.get("/loginUser", loginUser);
router.get("/profile", authPioneer, getProfile);
router.patch("/changePass", authPioneer, changePassword);
router.post("/createOrder", authPioneer, createOrder)

export default router;