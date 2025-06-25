const UserNotification = require('../models/UserNotification');

module.exports = {
    indexNotification,
    deleteNotification,
};

async function indexNotification(req,res) {
    try{
        const usernotification = await UserNotification.find({isDeleted:false});
        if(!usernotification || usernotification.length == 0){
            return res.status(401).json({status:false,message:"No data found:"});
        }
        return res.status(200).json({status:true,data:usernotification});
    }
    catch(error){
        return res.status(500).json({status:false,message:"Internal server error:"});
    }
}

async function deleteNotification(req,res) {
    try{
        let {usernotificationId} = req.body;
        let result = await UserNotification.findByIdAndDelete(usernotificationId);
        return res.status(200).json({status:true,message:"Notification deleted successfully:"}); 
    }
    catch(error){
        return res.status(500).json({status:false,message:"Internal server error:"});   
    }
}