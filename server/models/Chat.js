import mongoose from "mongoose";

// 创建聊天模型，定义了聊天记录的结构和属性
// 结构包括用户名、消息内容、头像、创建时间
// 属性定义了每个字段的类型和是否必填
const chatSchema = new mongoose.Schema({
  username: { type: String, required: true }, // 用户名，必填
  message: { type: String, required: true }, // 消息内容，必填
  avatar: { type: String, required: true }, // 头像地址，必填
  createdAt: { type: Date, default: Date.now }, // 创建时间，默认为当前时间
});

// 使用模型定义创建一个聊天模型，命名为Chat
const Chat = mongoose.model("Chat", chatSchema);

// 导出Chat模型，供其他文件使用
export default Chat;
