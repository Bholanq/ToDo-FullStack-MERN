import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();
const app =express();



//middlewares
app.use(express.json()); //this middleware allows us to parse the model bodies i.e req.body()
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production")
{
    app.use(cors(
    
))
}


app.use(rateLimiter);

app.use((req,res,next) =>{
    console.log(`Request method is ${req.method} and request url is ${req.url}`);
    next();
});
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res) =>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
})
}

connectDB().then(() => {app.listen(PORT,()=>{
    console.log("Server started on PORT:", PORT);
    });
});


