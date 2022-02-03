const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    text: {
      type: String,
    },
    fileUrl: {
      type: String,
    },
    creater: { type: Schema.Types.ObjectId, ref: "User", required: true },
    onReplyTo: { type: Schema.Types.ObjectId, ref: "Message" },
    forwardBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
