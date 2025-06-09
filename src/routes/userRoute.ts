import { Router, Request, Response } from "express";
import { register, login, getAllUsers} from "../controllers/userController";
import { registerValidator } from "../middleware/validators";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post('/register', register);
router.post('/login', login)
router.get('/users', authenticateToken, getAllUsers)

export default router;