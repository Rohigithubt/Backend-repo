const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeminarSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  ticketPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  totalTicket: {
    type: Number,
    required: true, 
    min: 0,
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
  venue: {
    type: String,
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


const Seminar = mongoose.model('seminar',SeminarSchema);
module.exports = Seminar;