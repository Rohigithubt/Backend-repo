const News = require('../models/News');
const randomString = require('randomstring');

module.exports = {
  createnews,
  indexnews,
  editnews,
  updatenews,
  deletenews,

};

async function createnews(req, res) {
  const { title, content, date } = req.body; 
  console.log(req.body,"req.body")

  try {
    if (!title || !content) {
      return res.status(400).json({ status: false, message: "Title and content are required" });
    }

    const existing = await News.findOne({ title });
    if (existing) {
      return res.status(400).json({ status: false, message: "Title is already in use" });
    }


    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
    console.log(req.file,"req.file")

    const news = await News.create({
      title,
      content,
      date: date || new Date(), 
      image: imagePath, 
    });

    return res.status(200).json({ status: true, message: "News created successfully", news });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}

async function indexnews(req,res) {
    try{
       const news = await News.find({isDeleted:false});
       if(!news || news.length ==0){
        return res.status(404).json({status:false,message:"No data found:"});
       }    
       return res.status(200).json({status:true,data:news});        
    }
    catch(error){
       console.log("news fetch failed:",error);
       return res.status(500).json({status:false,message:"Internal server error:"});       
    }
}

async function editnews(req,res) {
  const {newsId} = req.body;
  try{
    const news = await News.findById(newsId);
    if(!news){
      return res.status(404).json({status:false,message:"News not found:"});
    }
    return res.status(200).json({status:true,data:news});
  }
  catch(error){
    console.log(error);
    return res.status(500).json({status:false,message:"Internal server error:"});
  }
}

async function updatenews(req, res) {
  const { newsId, updateData } = req.body;
  console.log(newsId, updateData);

  try {
    delete updateData.newsId;
    const news = await News.findByIdAndUpdate(newsId, updateData, { new: true });
    if (!news) {
      return res.status(404).json({ status: false, message: "News not found" });
    }
    return res.status(200).json({ status: true, news });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "News update failed" });
  }
}

async function deletenews(req,res) {
  try{
    let {newsId} = req.body;
    let result = await News.findByIdAndDelete(newsId);
    return res.status(200).json({status:true,message:"News deleted successfully"});
  }
  catch(error){
    console.log(error);
    return res.status(500).json({status:false,message:"Internal server error"});  
  }
}