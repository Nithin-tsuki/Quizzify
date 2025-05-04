// const mongoose = require("mongoose");
import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message= mongoose.model("Message", MessageSchema);
export default Message;