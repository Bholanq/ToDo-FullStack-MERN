import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();
const app =express();



//middlewares
app.use(express.json()); //this middleware allows us to parse the model bodies i.e req.body()

app.use(cors(
    
))


app.use(rateLimiter);

app.use((req,res,next) =>{
    console.log(`Request method is ${req.method} and request url is ${req.url}`);
    next();
});
app.use("/api/notes", notesRoutes);
const PORT = process.env.PORT || 5001;

connectDB().then(() => {app.listen(PORT,()=>{
    console.log("Server started on PORT:", PORT);
    });
});


