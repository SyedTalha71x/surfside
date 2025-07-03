import Contact from "../Models/contact-model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.CUSTOMER_SUPPORT_EMAIL,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #2c3e50;">📩 New Contact Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2980b9;">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f2f2f2; padding: 15px; border-left: 4px solid #3498db; white-space: pre-line; border-radius: 5px;">
            ${message}
          </div>
          <hr style="margin: 30px 0;" />
          <p style="font-size: 12px; color: #999;">Sent via contact form on <strong>ConvertingCurrency.com</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Message sent successfully", data: newContact });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
