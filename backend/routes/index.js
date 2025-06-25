const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.use('/api',require('./user'));
router.use('/api',require('./location'));
router.use('/api',require('./news'));
router.use('/api',require('./webinar'));
router.use('/api',require('./seminar'));
router.use('/api',require('./contactusform'));
router.use('/api',require('./event'));
router.use('/api',require('./usernotification'));


module.exports = router;
