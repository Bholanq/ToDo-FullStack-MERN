import Note from "../models/Note.js";

export async function getAllNotes(req,res){
        try {
            const notes = await Note.find().sort({createdAt:-1}); //created At -1 returns the latest created first
            res.status(200).json(notes);
        } catch (error) {
            console.error("Error in getAllNotes Controller",error);
            res.status(500).json({message:"Internal Server Error"});
        }
}

export async function createNote(req,res){
    try {
        
        const {title,content} = req.body 
        const note = new Note({title,content})
        const savednote = await note.save()
        res.status(201).json({savednote})
    } catch (error) {
        console.error("Error in Create Node Controller",error);
            res.status(500).json({message:"Internal Server Error"});
    }
}

export async function updateNode(req, res) {
    try {
        const { title, content } = req.body;
        const { id } = req.params;

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true } // return updated doc & validate schema
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote
        });
    } catch (error) {
        console.error("Error in Update Node Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteNote(req,res){
    
    try{
    const {title,content} = req.body;
    const {id} = req.params;

    const deleteNote = await Note.findByIdAndDelete(id);
            if (!deleteNote) {
            return res.status(404).json({ message: "Note not found" });
        }
                res.status(200).json({
            message: "Note updated successfully",
        });
} catch(error)
{
        console.error("Error in Delete Node Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
}
        
}

export async function getNotebyID(req,res) {
    try {
        
        const {id} = req.params;
        const note = await Note.findById(id);

        if(!note)
        {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in fetching Node ID", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
}