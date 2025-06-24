const express = require('express');
const router = express.Router();
const WebinarApiController = require('../controllers/WebinarApiController');
const upload = require('../config/multerfile');

router.post('/create-webinar',upload.single('image'),WebinarApiController.createwebinar);
router.post('/index-webinar',WebinarApiController.indexwebinar);
router.post('/edit-webinar',WebinarApiController.editwebinar);
router.post('/update-webinar',upload.single('image'),WebinarApiController.updatewebinar);
router.post('/delete-webinar',WebinarApiController.deletewebinar);



module.exports = router;