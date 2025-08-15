import User from "../models/user.js";
import { genAuthToken } from "../reuseableFunction/genAuthToken.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

// reg user Post method
// reg user Post method
export const regUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser === null) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        ...req.body,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({
        token: genAuthToken(newUser._id),
        user: {
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          address: newUser.address,
        },
      });
    }
    else if (existingUser !== null) {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

// getUser
// getUser
// export const getAllUser = async (req, res) => {
//   try {
//     const userSchools = await User.find();
//     if (userSchools.length > 0) {
//       res.status(200).json(userSchools);
//     }
//   } catch (error) {
//     res.status(401).json(error);
//   }
// };

// login user
// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.query;
    const find = await User.findOne({
      email: email,
    });
    const decipher = await bcrypt.compare(password, find.password);
    if (decipher === true) {
      res.status(200).send({
        token: genAuthToken(find._id),
        user: {
          email: find.email,
          firstName: find.firstName,
          lastName: find.lastName,
          address: find.address
        }
      });
    }
    else if (decipher === false) {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// change passwor
// change password
export const changePassword = async (req, res) => {
  try {
    const { oldPass, newPass } = req.body;
    const user = req.User;
     const find = await User.findOne({
      email: user.email,
    });
    const decipher = await bcrypt.compare(oldPass, find.password);
    if (decipher === true) {
      user.password = newPass;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPass, salt);
      await user.save();

      res.status(200).send({
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address
        }
      });
    }
    else if (decipher === false) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    // authPioneer has already attached the user to req.User
    if (!req.User) {
      return res.status(404).json({ message: "User not found" });
    }

    // send the user info exclude sensitive data like password
    res.status(200).json({
      user: {
        email: req.User.email,
        firstName: req.User.firstName,
        lastName: req.User.lastName,
        address: req.User.address
      }
    });
  } catch (err) {
    res.json({ message: err });
  }
};