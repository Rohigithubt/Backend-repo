const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebinarSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: false,
  },
});

const Webinar = mongoose.model('webinar', WebinarSchema);
module.exports = Webinar;
