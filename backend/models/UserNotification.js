const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserNotificationSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required:true,
        default:false,
    },
},
{
  timestamps: {
    createdAt: "created_at",
    updatedAt: false,
  },
});

const UserNotification = mongoose.model('usernotification',UserNotificationSchema);
module.exports = UserNotification;