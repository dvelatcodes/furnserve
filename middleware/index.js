import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

dotenv.config();

export const authPioneer = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  try {
    const decoded = jwt.verify(token, process.env.Access_Secret_Token);
    req.User = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
};
