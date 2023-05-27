const express = require('express');
const TaskController = require('../../controllers/Task.controller');
const router = express.Router();


router.route('/update').get(TaskController.getAllTheUserNames)

module.exports = router;
