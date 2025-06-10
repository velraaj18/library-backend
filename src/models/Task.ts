import mongoose from "mongoose";
import { TaskStatus, TaskPriority } from "../enums/taskEnums";

const taskSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: Object.values(TaskPriority),
    default: TaskPriority.Medium,
  },
  isCompleted: {
    type: Boolean,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  dateModified: {
    type: Date,
  },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.Pending,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Task", taskSchema);
