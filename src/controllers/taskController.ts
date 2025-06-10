import { JwtPayload } from "jsonwebtoken";
import Task from "../models/Task";
import { Request, Response } from "express"; 
import { authenticateToken, AuthenticatedRequest } from "../middleware/auth";

export const getTaskByUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Assuming your JWT payload contains the user's ID as `id` or `_id`
    const id = (req.user as JwtPayload).id || (req.user as JwtPayload)._id;
    console.log(id)
    const tasks = await Task.find({ userId: id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
}


export const createNewTask = async (req : AuthenticatedRequest, res: Response) => {
    const { title, description, priority, isCompleted, dueDate, dateCreated, dateModified, status } = req.body; 
    const user = req.user as JwtPayload
    try {
      const newTask = new Task({
        title,
        description, 
        priority,
        isCompleted,
        dueDate,
        dateCreated,
        dateModified,
        status,
        userId : user?.id
      })

      await newTask.save()
      res.status(200).json({message : "Task Created"})
    } catch (error) {
      res.status(500).json({ error: error });
    }
}