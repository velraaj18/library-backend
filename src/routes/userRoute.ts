import { Router, Request, Response } from "express";

import { register, login, getAllUsers} from "../controllers/userController";

const router = Router();

router.post('/register', register);
router.post('/login', login)
router.get('/users', getAllUsers)

export default router;