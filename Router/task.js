const express = require("express");
const multer = require('multer');
const { createTask, getAllTasks, getOneTask, deleteTask, updateTask } = require("../Controller/task");
const auth = require('../helper/jwt');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
})

const upload = multer({
    storage : storage
})

router.route('/task')
    .get(getAllTasks)
    .post(auth.verifyToken,upload.single('image'),createTask)

router.route('/task/:id')
    .get(getOneTask)
    .put(auth.verifyToken,upload.single('image'),updateTask)
    .delete(auth.verifyToken,deleteTask)


const Taskrouter = router;
module.exports = Taskrouter;