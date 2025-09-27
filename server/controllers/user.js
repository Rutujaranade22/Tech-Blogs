import md5 from "md5";
import User from "./../models/User.js";

const postSignup = async (req, res) => {
   const newUser = new User({ name, email, password: md5(password) });

  const savedUser = await newUser.save();


   const existingUser = await User.findOne({
    email,
    password: md5(password),
  }).select("_id name email");

  if (existingUser) {
    return res.json({
      success: true,
      message: "User logged in successfully",
      user: existingUser,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
};

export { postLogin, postSignup };