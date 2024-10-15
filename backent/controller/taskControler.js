import taskModel from "../model/taskModel.js";



export const getAllTasks = async (req, res, next) => {
    try {
        const allTasks = await taskModel.find();
        res.status(200).json(allTasks);
    } catch (err) {
        next(err);
    }
};


export const addTask = async (req, res, next) => {
    const { taskname, description, status, deadline } = req.body;
    try {
        const createTask = new taskModel({ taskname, description, status, deadline });
        const createdTask = await createTask.save();
        res.status(201).json(createdTask); 
    } catch (err) {
        next(err);
    }
};


export const getTaskById = async (req, res, next) => {
    try {
        
        const task = await taskModel.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
};

export const updateTaskStatus = async (req, res, next) => {
    
    const { status } = req.body;
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await taskModel.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        next(err);
    }
};
