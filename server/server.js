import express from "express";
import http from "http";
import { Server as ioServer } from "socket.io";
import { Connection } from "./db.js";
import Chat from "./models/Chat.js";
import multer from "multer";
import path from "path";
import cors from "cors";
import userRouter from "./routes/userRoute.js";

// Create a new express application
const app = express();

// Allow CORS requests from all origins
app.use(cors());

// Connect to the database
Connection();

// Middleware to parse JSON
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/", userRouter); // 设置静态文件路由

// Configure multer storage location and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route for avatar upload
app.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  if (req.file) {
    res.status(200).json({ url: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ error: "File upload failed" });
  }
});

// Route for file upload in chat
app.post("/upload-file", upload.single("file"), (req, res) => {
  if (req.file) {
    res.status(200).json({ url: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ error: "File upload failed" });
  }
});

const httpServer = http.createServer(app);

// Create socket.io instance
const io = new ioServer(httpServer, {
  cors: {
    origin: "*",
  },
});

// Handle socket.io connections
io.on("connection", (socket) => {
  console.log("a user connected");

  // Load chat history when user connects and send it
  const loadMessages = async () => {
    try {
      const messages = await Chat.find().sort({ createdAt: 1 }).exec();
      socket.emit("chat", messages);
    } catch (err) {
      console.log(err);
    }
  };

  loadMessages();

  // Broadcast chat messages to all users
  socket.on("chat", (chat) => {
    io.emit("chat", chat);
  });

  // Save new message to the database and broadcast to all users
  socket.on("newMessage", async (message) => {
    try {
      const newMessage = new Chat(message);
      await newMessage.save();
      io.emit("message", message);
    } catch (err) {
      console.log(err);
    }
  });

  // Save new file message to the database and broadcast to all users
  socket.on("newFileMessage", async (message) => {
    try {
      const newMessage = new Chat(message);
      await newMessage.save();
      io.emit("fileMessage", message);
    } catch (err) {
      console.log(err);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start the server
httpServer.listen(3001, () => {
  console.log("server running on port 3001");
});
