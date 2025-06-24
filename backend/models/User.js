const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    phoneno: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'volunteer'],
        default: 'user',
    },
    location: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },


},
    {
        timestamps: { createdAt: "created_at",
            updatedAt: false
         },
    })
const User = mongoose.model('user', UserSchema);
module.exports = User;