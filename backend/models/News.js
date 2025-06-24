const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: {
       type: String,
       required: true,
    },

    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
 {
        timestamps: { createdAt: "created_at",
            updatedAt: false
         },
}
)

const News = mongoose.model('news',NewsSchema);
module.exports = News;