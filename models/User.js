const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    customeId: {
      type: String,
      unique: true,
      required: false,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
