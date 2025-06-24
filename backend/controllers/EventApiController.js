const Event = require('../models/Event');

module.exports = {
   createEvent,
   indexEvent,
   deleteEvent,
};

async function createEvent(req, res) {
    const { title, date, description, location, totalInvitation, requiredvolunteer } = req.body;
    try {
        if (!title || !date || !description || !location || !totalInvitation || !requiredvolunteer) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        const existingEvent = await Event.findOne({ title });
        if (existingEvent) {
            return res.status(400).json({ status: false, message: "Title is already in use" });
        }

        const imagePath = req.file ? `/uploads/${req.file.filename}` : '/defaults/event-default.jpg';

        const event = await Event.create({
            title,
            description,
            location,
            totalInvitation,
            requiredvolunteer,
            date: date || new Date(),
            image: imagePath,
        });

        return res.status(201).json({ status: true, message: "Event created successfully", event });
    } catch (error) {
        console.error("Error creating event:", error); 
        return res.status(500).json({ 
            status: false, 
            message: "Internal server error",
            error: error.message
        });
    }
}

async function indexEvent(req,res) {
    try{
        const event = await Event.find({isDeleted: false});
        if(!event || event.length == 0){
            return res.status(400).json({status:false,message:"No Event Found:"});
        }
        console.log(event,"event")
        return res.status(200).json({status:true,data:event});
    }
    catch(error){
        return res.status(500).json({status:false,message:"Internal server error:"});
    }
}


async function deleteEvent(req,res) {
    try{
      let {eventId} = req.body;
      let result = await Event.findByIdAndDelete(eventId);
      return res.status(200).json({status:true,message:"Event deleted successfully:"});
    }
    catch(error){
        return res.status(500).json({status:false,message:"Internal server error:"});
    }
}
