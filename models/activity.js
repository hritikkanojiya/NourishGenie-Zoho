const mongoose = require('mongoose');
const moment = require('moment');

const userActivitySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  activities:{
    type: Object,
    required: true,
  },
  date:{
    type:String,
    default: moment().tz('Asia/Kolkata').format('YYYY-MM-DD'),
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }

});



const userActivity = mongoose.model('userActivity', userActivitySchema);

module.exports = userActivity;
