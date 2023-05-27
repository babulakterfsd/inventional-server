const mongoose = require('mongoose');
const taskSchema = require('../schemas/Task.schema');

const Task = mongoose.model('of_data_raws', taskSchema);

module.exports = Task;