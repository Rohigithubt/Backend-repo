const express = require('express');
const router = express.Router();
const EventApiController = require('../controllers/EventApiController');
const upload = require('../config/multerfile'); 

router.post('/create-event',upload.single('image'),EventApiController.createEvent);
router.post('/index-event',EventApiController.indexEvent);
router.post('/delete-event',EventApiController.deleteEvent);
    
module.exports = router;