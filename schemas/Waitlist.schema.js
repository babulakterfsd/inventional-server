const mongoose = require('mongoose');
const validator = require('validator');

const waitlistSchema = mongoose.Schema(
    {
            email: {
                type: String,
                required: true,
                unique: [true, 'Email already exists'],
                validate: [validator.isEmail, 'Please provide a valid email'],
            }
          }, {
        timestamps: true,
          }
);

module.exports = waitlistSchema;