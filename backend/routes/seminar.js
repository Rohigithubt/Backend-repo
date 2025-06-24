const express = require('express');
const router = express.Router();
const SeminarApiController = require('../controllers/SeminarApiController');
const upload = require('../config/multerfile');

router.post('/create-seminar',upload.single('image'),SeminarApiController.createseminar);
router.post('/index-seminar',SeminarApiController.indexseminar);
router.post('/edit-seminar',SeminarApiController.editseminar);
router.post('/update-seminar',SeminarApiController.updateseminar);
router.post('/delete-seminar',SeminarApiController.deleteseminar);



module.exports = router;