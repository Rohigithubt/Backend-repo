const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type:String,
        required: true,
    },
    totalInvitation: {
        type: Number,
        default: 0,
    },
    requiredvolunteer: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    image: {
        type: String,
        required: true,
    },

},
{
        timestamps: { createdAt: "created_at",
            updatedAt: false
         },
    })

const Event = mongoose.model('event',EventSchema);
module.exports = Event;