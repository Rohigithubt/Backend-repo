const Seminar = require('../models/Seminar');
const randomString = require('randomstring');

module.exports  = {
   createseminar,
   indexseminar,
   editseminar,
   updateseminar,
   deleteseminar,
};

async function createseminar(req,res) {
    const {title,ticketPrice,totalTicket,date,startTime,endTime,venue} = req.body;
    console.log(req.body,"req.body");

    try{
        if(!title || !ticketPrice || !totalTicket || !date || !startTime || !endTime || !venue){
            return res.status(400).json({status:false,message:"All fields are required:"});
        }

        const existingseminar = await Seminar.findOne({title});
        if(existingseminar){
            return res.status(400).json({status:false,message:"Seminar is aready defined:"});
        }

        const imagepath = req.file ? `uploads/${req.file.filename}` : '';
        const seminar = await Seminar.create({
            title,
            ticketPrice,
            totalTicket,
            date: new Date(date),
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            venue,
            image: imagepath,
        });
        return res.status(200).json({status:true,message:"Seminar created successfully:"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({status:false,message:"Internal server error:"});
    }
}

async function indexseminar(req,res) {
    try{
        const seminar = await Seminar.find({isDeleted:false});
        if(!seminar || seminar.length == 0){
            return res.status(404).json({status:false,message:"Seminar not found:"});
        }
        return res.status(200).json({status:true,data:seminar});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({status:false,message:"Internal server error:"});
    }
}

async function editseminar(req,res) {
    const {seminarId} = req.body;
    try{
        const seminar = await Seminar.findById(seminarId);
        if(!seminar){
            return res.status(404).json({status:false,message:"Seminar not found:"});
        }
        return res.status(200).json({status:true,data:seminar});
    }
    catch(error){
        return res.status(500).json({status:false,message:"Internal server error:"});
    }
}

async function updateseminar(req,res) {
    const {seminarId} = req.body;
    const updateData = {...req.body};

    try{
        delete updateData.seminarId;
        const seminar = await Seminar.findByIdAndUpdate(seminarId,updateData,{new:true});
        if(!seminar){
            return res.status(404).json({status:false,message:"Seminar not found:"});
        }
        return res.status(200).json({status:true,seminar});
    }
    catch(error){
        return res.status(500).json({status:false,message:"Internal server error:"});
    }
}

async function deleteseminar(req,res) {
    try{
        let {seminarId} = req.body;
        let result = await Seminar.findByIdAndDelete(seminarId);
        return res.status(200).json({status:true,message:"Seminar deleted successfully:"});
    }
    catch(error){
        return res.status(500).json({status:true,message:"Internal server error"});
    }
}