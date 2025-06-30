import express from "express";
import { createNote, deleteNote, getAllNotes, getNotebyID, updateNode } from "../controllers/notesControllers.js";


const router = express.Router();


router.get("/",getAllNotes);

router.post("/",createNote);

router.put("/:id", updateNode);

router.delete("/:id",deleteNote);

router.get("/:id",getNotebyID);


export default router;