const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    shared:{type:Boolean,required:true},
    sharedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{timestamps:true})

const Note = mongoose.model("Note",noteSchema);

module.exports = Note;