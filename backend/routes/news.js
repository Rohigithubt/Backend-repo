const express = require('express');
const router = express.Router();
const NewsApiController = require('../controllers/NewsApiController');
const upload = require('../config/multerfile'); 

router.post('/create-news',upload.single('image'),NewsApiController.createnews);
router.post('/index-news',NewsApiController.indexnews);
router.post('/edit-news',NewsApiController.editnews);
router.post('/update-news',NewsApiController.updatenews);
router.post('/delete-news',NewsApiController.deletenews);


module.exports = router;