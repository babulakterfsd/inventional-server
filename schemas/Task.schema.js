const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
            of_username: String,
            of_url: String,
            ig_username: String,
            ig_url: String,
            is_validated: {
                type: Boolean || String,
                default: false
            },
            is_valid: {
                type: Boolean || String,
                default: false
            },
            validated_ig_url: String,
            follower_count: String,
            name: String,
            bio: String,
            ig_bio: String,
            likes: Number,
            subscribers: Number,
            emails: {
                type: Boolean || String,
                default: false
            },
            phoneNumbers: {
                type: Boolean || String,
                default: false
            },
            websites: {
                type: Boolean || String,
                default: false
            },
          }
);


module.exports = taskSchema;