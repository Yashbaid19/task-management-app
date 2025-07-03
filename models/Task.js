const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'inprogress', 'completed'],
      default: 'pending',
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // auto adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Task', TaskSchema);