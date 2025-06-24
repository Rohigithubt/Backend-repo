const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    locationName: {
      type:String,
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

const Location = mongoose.model('location',LocationSchema);
module.exports = Location;