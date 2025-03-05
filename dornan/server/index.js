const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3003;

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phno: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: "" },
  message: { type: String, default: "" },
});

const Message = new mongoose.model("Message", MessageSchema);

app.post("/contact", async (req, res) => {
  try {
    let body = req.body;
    console.log(body);
    let msg = new Message(body);
    await msg.save();
    res.status(200).json({ message: "Message sent successfully" });
  } catch (er) {
    res.status(500).json({ message: "Could not send request" });
  }
});

app.get("/messages", async (req, res) => {
  let messages = await Message.find({});
  res.status(200).json(messages);
});

app.listen(PORT, () => {
  console.log("App started on port 3003");
});
