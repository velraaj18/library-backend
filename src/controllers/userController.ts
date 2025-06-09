import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

dotenv.config();

// Get all the users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select({ password: 0 });
    if (users) {
      res.status(200).json({ message: "Users Retreived", users });
      console.log(users);
    }
  } catch (error) {
    res.status(500).json({ message: "Bad request" });
  }
};

// In register, check if email is already in user table if not store the new entry in User.
export const register = async (req: Request, res: Response) => {
  
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

  const { name, email, password } = req.body;
  try {
    const isEmailFound = await User.findOne({ email });
    if (isEmailFound) {
      res.status(400).json({ message: "User Already found" });    
    }

    // Encrytpt the password using bcrypt package
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    // Never use return before res.status
    res.status(200).json({ message: "User Registered" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// In login, we need to check if the user name and the password matches the record in Db.
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User Not found" });
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
      }

      const jwtToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      console.log(jwtToken)
      res.status(200).json({ message: "User found", jwtToken, user});
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
