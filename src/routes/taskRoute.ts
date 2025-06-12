import { Router, Request, Response } from "express";
import { createNewTask, getTaskByUser } from "../controllers/taskController";
import { registerValidator } from "../middleware/validators";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get('/', authenticateToken, getTaskByUser);
router.post('/createTask', authenticateToken, createNewTask);

export default router;