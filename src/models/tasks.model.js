const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 5,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  public: {
    type: Boolean,
    required: true,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  completedBy:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]

}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
