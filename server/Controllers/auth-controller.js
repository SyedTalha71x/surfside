import User from "../Models/user-model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Helpers/helper.js";
import nodemailer from "nodemailer";


export const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json(({ error: "Please enter all fields" }));
    }

    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json(({ error: "User already exists" }));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let role = "user";

    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(200).json({status: true, message: "User created successfully"});
  } catch (err) {
    console.error(err.message);
    return res
      .status(400)
      .json(({ error: "Internal Server Error" }));
  }
};
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json(({ error: "Please enter all fields" }));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json(({ error: "Invalid email or password" }));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json(({ error: "Invalid email or password" }));
    }

    let role = user.role;

    const token = generateToken(user._id, user.email, role);
    return res
      .status(200)
      .json({ token:  token});
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json(({ error: "Internal Server Error" }));
  }
};
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res
        .status(400)
        .json(({ error: "Please provide an email" }));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json(({ error: "User not found with this email" }));
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 1000 * 60 * 5;

    if (user.otp && user.otpExpiry > Date.now()) {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
    }

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      from: "yourEmail@gmail.com",
      subject: "Your OTP Code",
      html: `<p>Your OTP code is <b>${otp}</b>. It is valid for 5 minutes.</p>`,
    });

    return res.status(200).json({status: true, message: "OTP sent to email"});
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json(({ error: "Internal Server Error" }));
  }
};
export const verifyOTP = async (req, res) => {
  const { otp } = req.body;

  try {
    if (!otp) {
      return res
        .status(400)
        .json(({ error: "OTP is required" }));
    }

    const user = await User.findOne({
      otp,
      otpExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json(({ error: "Invalid or expired OTP" }));
    }

    return res
      .status(200)
      .json({ status: true , message:  "OTP verified successfully"});
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json(({ error: "Internal Server Error" }));
  }
};
export const resetPassword = async (req, res) => {
  const { newPassword, confirmPassword, otp } = req.body;

  try {
    if (!newPassword || !confirmPassword || !otp) {
      return res.status(400).json(
        ({
          error: "New password, confirm password, and OTP are required",
        })
      );
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json(({ error: "Passwords do not match" }));
    }

    const user = await User.findOne({
      otp,
      otpExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json(({ error: "Invalid or expired OTP" }));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res
      .status(200)
      .json({status: true, message: "Password reset successfully"});
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json(({ error: "Internal Server Error" }));
  }
};

export const AdminSignup = async (req, res) => {
  const { name, email, password, secretKey } = req.body;

  try {

    if(!secretKey || secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res
        .status(403)
        .json(({ error: "Invalid secret key" }));
    }

    if (!name || !email || !password) {
      return res
        .status(400)
        .json(({ error: "Please enter all fields" }));
    }

    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json(({ error: "User already exists" }));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let role = "admin";

    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(200).json({status: true, message: "User created successfully"});
  } catch (err) {
    console.error(err.message);
    return res
      .status(400)
      .json(({ error: "Internal Server Error" }));
  }
};
export const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json(({ error: "Please enter all fields" }));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json(({ error: "Invalid email or password" }));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json(({ error: "Invalid email or password" }));
    }

    let role = user.role;

    const token = generateToken(user._id, user.email, role);
    return res
      .status(200)
      .json({ token:  token});
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json(({ error: "Internal Server Error" }));
  }
};
