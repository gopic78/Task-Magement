const express = require("express");
const { createTask, getAllTasks, getOneTask, deleteTask, updateTask } = require("../Controller/task");
const auth = require('../helper/jwt');

const router = express.Router();


router.route('/task')
    .get(getAllTasks)
    .post(auth.verifyToken,createTask)

router.route('/task/:id')
    .get(getOneTask)
    .put(auth.verifyToken,updateTask)
    .delete(auth.verifyToken,deleteTask)


const Taskrouter = router;
module.exports = Taskrouter;
