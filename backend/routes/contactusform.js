const express = require('express');
const router = express.Router();
const ContactUsFormApiController = require('../controllers/ContactUsFormApiCotroller');

router.post('/create-contactusform', ContactUsFormApiController.createcontactusform);
router.post('/index-contactusform', ContactUsFormApiController.indexcontactusform);
router.post('/delete-contactusform', ContactUsFormApiController.deletecontactusform);

module.exports = router;