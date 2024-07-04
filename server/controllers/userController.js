import User from "../models/User.js";

// Controller for user registration
export const registerUser = async (req, res) => {
  // 从请求体中解构出用户名、头像、电子邮件和密码
  const { username, avatar, email, password } = req.body;
  try {
    // 在数据库中查找具有给定电子邮件的用户
    const userExists = await User.findOne({ email });
    // 如果用户已存在
    if (userExists) {
      // 返回 400 状态码和相应的错误消息
      return res.status(400).json({ message: "User already exists" });
    }
    // 创建一个新的用户实例
    const user = new User({ username, avatar, email, password });
    // 将新用户保存到数据库
    await user.save();
    // 返回 201 状态码和成功注册的消息
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // 如果在上述操作中出现错误，返回 400 状态码和错误消息
    res.status(400).json({ message: err.message });
  }
};

// Controller for user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Received email:", email);
  console.log("Received password:", password);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log("Invalid credentials for email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      username: user.username,
      avatar: user.avatar,
      email: user.email,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(400).json({ message: err.message });
  }
};


