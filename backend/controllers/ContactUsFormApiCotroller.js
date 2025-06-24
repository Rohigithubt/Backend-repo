const ContactUsForm = require('../models/ContactUsForm');

module.exports = {
    createcontactusform,
    indexcontactusform,
    deletecontactusform,
};

async function createcontactusform(req, res) {
    const { firstName, lastName, email, phoneno, message } = req.body;
    try {
        if (!firstName || !lastName || !email || !phoneno || !message) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }
        
        const existingUser = await ContactUsForm.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: false, message: "Email already in use" });
        }
        
        await ContactUsForm.create(req.body);
        return res.status(200).json({status: true, message: "Message sent successfully"});
    } catch(error) {
        console.error("Error in createcontactusform:", error);
        return res.status(500).json({status: false, message: "Internal server error"});
    }
}

async function indexcontactusform(req, res) {
   try {
    const contactForms = await ContactUsForm.find({isDeleted: false});
    console.log(contactForms, "contactForms");
    
    if(!contactForms || contactForms.length === 0) {
        return res.status(404).json({status: false, message: "No contact forms found"});
    }
    
    return res.status(200).json({status: true, data: contactForms});
   } catch(error) {
    console.error("Error in indexcontactusform:", error);
    return res.status(500).json({status: false, message: "Internal server error"});
   }
}

async function deletecontactusform(req,res) {
    try{
        let {contactusformId} = req.body;
        let result = await ContactUsForm.findByIdAndDelete(contactusformId);
        return res.status(200).json({status:true,message:"Contact deleted successfully:"});
    }
    catch(error){
        return res.status(500).json({status:true,message:"Internal server error:"});
    }
}