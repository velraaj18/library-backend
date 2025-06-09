import { body } from "express-validator";

export const registerValidator = () => {
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
}

