const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const GroupRoute = require("./routes/groups");
const MessageRoute = require("./routes/messages");

const corsOptions = {
  origin: "*",
  Credential: true,
  optionSuccessStatus: 200,
};

const app = express();
const port = process.env.PORT || 8008;
app.use(cors(corsOptions));
app.use(express.json());

dotenv.config();

// local test server

let db = mongoose
  .connect("mongodb://localhost/ChatApp")
  .then(() => console.log("connected .."));

// main server
// mongoose
//   .connect(
//     `mongodb+srv://amin:${process.env.PASSWORD}@cluster0.soc2v.mongodb.net/ChatApp?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       UseUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("conneted"))
//   .catch((err) => console.log(err));

app.get("/", (req, res) => res.status(200).send("server is running"));

app.use("/api/auth", authRoute);
app.use("/api/groups", GroupRoute);
app.use("/api/messages", MessageRoute);

app.listen(port, () => console.log(`server is running on PORT ${port}`));
