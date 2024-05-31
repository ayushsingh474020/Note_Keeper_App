const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const fetchNotes = asyncHandler(async (req,res) => {
    try {
        const notes = await Note.find({ user: req.user._id,shared:false })
        if (notes.length === 0) {
            console.log('No notes found for this user.');
        } else {
            res.status(200).json(notes)
        }
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
})

const fetchParticularNote = asyncHandler(async (req,res) => {
    const id=req.params.id
    try {
        const note = await Note.findOne({_id:id});
        res.status(200).json(note);
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
})

const createNewNote = asyncHandler(async (req,res)=>{
    const {title,content} = req.body;
    if(!title || !content){
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    // const noteExists = await Note.findOne({title:title}).find({user:{$eq:req.user._id}});
    // if(noteExists){
    //     res.status(400);
    //     throw new Error("Note title already exists")
    // }

    try {
        const note = await Note.create({
            title,content,user:req.user._id,shared:false,sharedBy:req.user._id
        })
        if(note){
            res.status(200);
            res.json({
                _id:note._id,
                title:note.title,
                content:note.content,
            });
    
        }
        else{
            res.status(400);
            throw new Error("Failer to create note");
        }
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
})

const shareNote = asyncHandler(async (req,res)=>{
    const {title,content} = req.body;
    const userId = req.params.id;
    if(!title || !content){
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    // const noteExists = await Note.findOne({title:title}).find({user:{$eq:userId}});
    // if(noteExists){
    //     res.status(400);
    //     throw new Error("Note title already exists")
    // }

    try {
        const note = await Note.create({
            title,content,user:userId,shared:true,sharedBy:req.user._id
        })
        if(note){
            res.status(200);
            res.json({
                _id:note._id,
                title:note.title,
                content:note.content,
            });
    
        }
        else{
            res.status(400);
            throw new Error("Failed to share note");
        }
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
})

const editNote = asyncHandler(async (req,res) => {
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(updatedNote)

    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
})

const deleteNote = asyncHandler(async (req,res) => {
    try {
        const noteId = req.params.id; // Assuming the note ID is passed as a URL parameter

        // Use Mongoose to find the note by ID and delete it
        const deletedNote = await Note.findByIdAndDelete(noteId);

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Return a success message as a response
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        // console.error('Error deleting note:', error);
        res.status(500).json({ message: error });
    }
})

const getNotes = asyncHandler(async (req, res) => {
    // console.log(req.query);
    // console.log(req.user._id)
    try {
        const keyword = req.query.search ? {
            $or: [
                { title: { $regex: req.query.search, $options: "i" } },
                { content: { $regex: req.query.search, $options: "i" } }
            ]
        } : {};
        const notes = await Note.find(keyword).find({user:{$eq:req.user._id}});
        // console.log(notes)
        res.send(notes);
    } catch (error) {
        console.log("error")
        res.status(400);
        throw new Error(error)
    }
    
});

const fetchSharedNotes = async (req,res) => {
    try {
        const notes = await Note.find({ user: req.user._id,shared:true })
        if (notes.length === 0) {
            console.log('No notes shared with you');
        } else {
            res.status(200).json(notes)
        }
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
}

module.exports = {fetchNotes,fetchParticularNote,editNote,deleteNote,createNewNote,getNotes,shareNote,fetchSharedNotes}
