import jwt from "jsonwebtoken";
import User from "./../models/User.js";

const postSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "name, email and password are required",
    });
  }

  // Basic validation (simple, user-friendly)
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameValidationRegex = /^[a-zA-Z ]+$/;

  if (!nameValidationRegex.test(name)) {
    return res.status(400).json({
      success: false,
      message: "Name should contain only alphabets and spaces",
    });
  }

  if (!emailValidationRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Email is not valid",
    });
  }

  // ⚠️ Removed strong password regex for free choice
  if (password.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 3 characters long",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: `User with email ${email} already exists`,
    });
  }

  // ✅ Store password directly (plain text)
  const newUser = new User({ name, email, password });
  const savedUser = await newUser.save();

  res.json({
    success: true,
    message: "User registered successfully",
    user: savedUser,
  });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email and password are required",
    });
  }

  // ✅ Compare plain password
  const existingUser = await User.findOne({
    email,
    password,
  }).select("_id name email");

  if (existingUser) {
    // ✅ Ensure JWT secret is present
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET not set in environment variables",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      message: "User logged in successfully",
      user: existingUser,
      token,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
};

export { postLogin, postSignup };
