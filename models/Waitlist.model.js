const mongoose = require('mongoose');
const waitListSchema = require('../schemas/Waitlist.schema');

const WaitList = mongoose.model('Email', waitListSchema);

module.exports = WaitList;