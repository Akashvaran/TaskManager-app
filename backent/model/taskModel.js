import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    taskname: {
        type: String,
        required: [true, 'Task name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    deadline: {
        type: Date,
        required: [true, 'Deadline is required']
    },
     createdUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel', 
        required: true
    }
}, {
    timestamps: true
});

const taskModel = mongoose.model('taskModel', taskSchema);

export default taskModel;