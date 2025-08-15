import {
  regUser,
  loginUser,
  getProfile,
  changePassword
} from "../controllers/index.js";
import { authPioneer } from "../middleware/index.js";
import express from "express";
// import { authPioneer } from "../middleware/index.js";
const router = express.Router();



router.post("/regUser", regUser);
router.get("/loginUser", loginUser);
router.get("/profile", authPioneer, getProfile);
router.patch("/changePass", authPioneer, changePassword);

export default router;