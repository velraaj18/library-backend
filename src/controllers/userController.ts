import User from "../models/User";
import { Request, Response } from "express";

// Get all the users
export const getAllUsers = async(req : Request, res : Response) => {
    try {
        const users = await User.find();
        if(users){
            res.status(200).json({message: 'Users Retreived', users});
        }
    } catch (error) {
        res.status(500).json({message : 'Bad request'});
    }
}

// In register, check if email is already in user table if not store the new entry in User.
export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const isEmailFound = await User.findOne({ email });
        if (isEmailFound) {
            res.status(400).json({ "message": "User Already found" });
            return;
        }
        const user = new User({
            name, email, password
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
        const user = await User.findOne({ email, password });
        if (!user) {
            res.status(404).json({ message: 'User Not found' });
            return;
        }
        res.status(200).json({ message: 'User found', user });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};