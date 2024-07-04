import mongoose from "mongoose";

export const Connection = async () => {
  try {
    // 尝试连接到 MongoDB 数据库
    await mongoose.connect(
      "mongodb+srv://aeguoweijiang:6Ta7mfYYCixIWnXj@cluster0.nnkmws9.mongodb.net/chat"
    );
    console.log("DB connected"); // 如果连接成功，打印"DB connected"
  } catch (error) {
    // 如果连接失败，打印错误信息并退出进程
    console.error("DB connection failed:", error);
    process.exit(1); // 退出进程，表示发生了不可恢复的错误
  }
};



