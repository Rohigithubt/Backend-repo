const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const ContactUsFormSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },
    phoneno: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
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

const ContactUsForm = mongoose.model('contactusform',ContactUsFormSchema);
module.exports = ContactUsForm;