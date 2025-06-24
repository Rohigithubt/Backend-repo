const Location = require('../models/Location');

module.exports = {
  createlocation, 
  indexlocation,
  deletelocation,
  editlocation,
  updatelocation,

};

async function createlocation(req,res) {
   const {locationName} = req.body;
   
    try{
        if(!locationName){
            return res.status(400).json({status:false, message:"Location name is required:"});
        }

        const existingLocation = await Location.findOne({locationName});
        if(existingLocation){
            return res.status(401).json({status:false,message:"Location is already in use:"});
        }

        await Location.create(req.body);
        return res.status(200).json({status:true,message:"Location created successfully:"});
    }
    catch(error){
        return res.status(500).json({status:false,message:"Internal Server Error:"});
    }
}

async function indexlocation(req,res) {
    try{
        const location = await Location.find({isDeleted:false});
        if(!location || location.length == 0){
            return res.status(404).json({status:false,message:"location not found"});
        }
        return res.status(200).json({status:true,data:location});
    }
    catch(error){
        console.log('location fetch failed',error);
        res.status(500).json("Internal server error");  
    }
}


async function deletelocation(req,res) {
  try{
      let {locationId} = req.body;
      console.log(req.body);
      let result= await Location.findByIdAndDelete(locationId);
      res.status(200).json({status:true,message: "location deleted successfully"});
  }
  catch(error){
    console.log(error)
    res.status(500).json({error:"delete data failed"})
  }
  
}

async function editlocation(req,res) {
    const {locationId} = req.body;
    try{
       const location = await Location.findById(locationId);
       if(!location){
        return res.status(404   ).json({status:false,message:"Location not found"});   
       }
       return res.status(200).json({status:true, data:location});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({status:false,message:"Internal server error"});
    }
}

async function updatelocation(req,res) {
  const {locationId} = req.body;
  const updateData = {...req.body};
  
  try{
    delete updateData.locationId;

    const location = await Location.findByIdAndUpdate(locationId,updateData,{new:true});
    if(!location){
        return res.status(401).json({status:false,error:"Location not found"});
    }
    return res.status(200).json({status:true,location});
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"location update failed"});
  }
}