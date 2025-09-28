import md5 from "md5";
import User from "./../models/User.js";

const postSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }

  // Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-Z ]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!nameRegex.test(name)) {
    return res.status(400).json({
      success: false,
      message: "Name should contain only alphabets and spaces",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Email is not valid" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be 8+ chars, include uppercase, lowercase, number & special char",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: `User with email ${email} already exists`,
    });
  }

  const newUser = new User({ name, email, password: md5(password) });
  const savedUser = await newUser.save();

  res.json({ success: true, message: "User registered successfully", user: savedUser });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }

  const existingUser = await User.findOne({ email, password: md5(password) }).select(
    "_id name email"
  );

  if (existingUser) {
    return res.json({ success: true, message: "Login successful", user: existingUser });
  } else {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }
};

export { postSignup, postLogin };
