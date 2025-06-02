import express from "express";

const app = express();

// Explicit type 
const port : number = 5001;

app.get("/", (req, res)=> {
    res.json({message : 'Hello from backend'})
});

app.listen(port, () => {
    console.log(`Server is running in ${port}`)
})