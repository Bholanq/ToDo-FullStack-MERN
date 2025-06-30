import mongoose from "mongoose";

//create a schema 
//model based off that schema

const NoteSchema = new mongoose.Schema(

    //obj1
    {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        }

    },
    //obj2
    {timestamps:true}
);

const Note = mongoose.model("Note",NoteSchema);

export default Note;