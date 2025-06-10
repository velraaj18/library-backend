import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute";
import taskRoutes from "./routes/taskRoute";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Explicit type 
const port : number = 5001;

app.use('/api/auth', userRoutes);
app.use('/api/task', taskRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running at ${port}`)
    })
})