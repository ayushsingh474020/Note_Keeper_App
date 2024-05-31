const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {type:String,required:true},
  dueDate: {type:Date,required:true},
//   priority: {
//     type: String,
//     enum: ['low', 'medium', 'high'],
//     default: 'medium'
//   },
//   status: {
//     type: String,
//     enum: ['todo', 'inProgress', 'completed'],
//     default: 'todo'
//   },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
//   assignedTo: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;