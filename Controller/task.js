const Tasks = require('../Model/task');

const createTask = async (req, res) => {
    try {
        const newTask = new Tasks({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            user_id: req.body.user_id,
            created_date: new Date()
        })
        await newTask.save();
        res.status(201).json({ message: "Task created successfully" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllTasks = async (req, res) => {
    try {
        const getTask = await Tasks.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind : "$userDetails"
            }
            , {
                $project: {
                    _id: 1,
                    title: 1,
                    category: 1,
                    description: 1,
                    status : 1,
                    due_date :1,
                    created_date: 1,
                    "userDetails.username": 1

                }
            }
        ]);
        if (!getTask) {
            res.status(404).json({ message: "No Tasks found" })
        }
        res.status(200).json(getTask)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const getOneTask = async (req, res) => {
    try {
        const id = req.params.id
        const getTask = await Tasks.find({user_id: id});
        if (!getTask) {
            return res.status(404).json({ message: "No Tasks found" })
        }
        res.status(200).json(getTask)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const getTask = await Tasks.findById(id);
        if (!getTask) {
            return res.status(404).json({ message: "No Task found" });
        }
        if (req.body.title) {
            getTask.title = req.body.title;
        }
        if (req.body.category) {
            getTask.category = req.body.category;
        }
        if (req.body.description) {
            getTask.description = req.body.description;
        }
        if (req.body.status) {
            getTask.status = req.body.status;
        }
        if (req.body.due_date) {
            getTask.due_date = req.body.due_date;
        }
        if (req.body.user_id) {
            getTask.user_id = req.body.user_id;
        }

        const updatedTask = await getTask.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        const getTask = await Tasks.findByIdAndDelete(id);
        if (!getTask) {
            return res.status(404).json({ message: "No Tasks found" })
        }
        res.status(200).json({ message: "Task deleted succcessfully" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    createTask,
    getAllTasks,
    getOneTask,
    updateTask,
    deleteTask
}
