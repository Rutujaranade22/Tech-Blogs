import User from "../models/User.js";

const postSignup =async (req, res)=>{
 const {name,email,password}= req.body;

 const newUser = new User ({name, email,password});

 const savedUser = await newUser.save();
res.json({
    success:true,
    message:"User register successfully",
    user:savedUser,
});
};
const postLogin = (req, res)=>{};

export {postLogin,postSignup};