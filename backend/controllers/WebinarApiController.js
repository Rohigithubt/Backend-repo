const Webinar = require('../models/Webinar');
const randomString = require('randomstring');

module.exports = {
    createwebinar,
    indexwebinar,
    editwebinar,
    updatewebinar,
    deletewebinar,
};

async function createwebinar(req, res) {
    const { title, date, link, startTime, endTime } = req.body;
    console.log(req.body, "reee");

    try {
        if (!title || !link || !date || !startTime || !endTime) {
            return res.status(400).json({ status: false, message: "Title, date, link, start time, and end time are required" });
        }

        const existingwebinar = await Webinar.findOne({ title });
        if (existingwebinar) {
            return res.status(400).json({ status: false, message: "Webinar is already defined" });
        }

        const imagepath = req.file ? `uploads/${req.file.filename}` : '';

        const webinar = await Webinar.create({
            title,
            date: new Date(date),
            link,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            image: imagepath,
        });

        return res.status(200).json({ status: true, message: "Webinar created successfully", webinar });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}


async function indexwebinar(req,res) {
    try{
        const webinar = await Webinar.find({isDeleted:false});
        if(!webinar || webinar.length == 0){
            return res.status(404).json({status:false,message:"Webinar not found"});
        }
        console.log(webinar,"re")
        return res.status(200).json({status:true,data:webinar});
    }
    catch(error){
        return res.status(500).json({status:true,message:"Internal server error:"});
    }
}

async function editwebinar(req,res) {
    const {webinarId} = req.body;
    try{
        const webinar = await Webinar.findById(webinarId);
        if(!webinar){
            return res.status(404).json({status:false,message:"Webinar not found:"});
        }
        return res.status(200).json({status:true,data:webinar});
    }
    catch(error){
        return rs.status(500).json({status:false,message:"Internal server error:"});
    }
}

async function updatewebinar(req,res) {
    const {webinarId} = req.body;
    const updateData = {...req.body};

    try{
        delete updateData.webinarId;
        const webinar = await Webinar.findByIdAndUpdate(webinarId,updateData,{new:true});
        if(!webinar){
            return res.status(404).json({status:true,message:"Webinar not found:"});
        }
        return res.status(200).json({status:true,webinar});
    }
    catch(error){
        return res.status(500).json({status:false,message:"Internal server error:"});
    }
}

async function deletewebinar(req,res) {
    try{
        let {webinarId} = req.body;;
        let result = await Webinar.findByIdAndDelete(webinarId);
        return res.status(200).json({status:true,message:"Webinar deleted successfully:"});
    }
    catch(error){
        return res.status(500).json({status:false,message:"Internal server error:"});
    }
}