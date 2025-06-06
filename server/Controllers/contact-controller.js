import Contact from "../Models/contact-model.js";

export const createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
    
        if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
        }
    
        const newContact = new Contact({
        name,
        email,
        message,
        });
    
        await newContact.save();
    
        res.status(201).json({ success: true, data: newContact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}