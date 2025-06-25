const express = require('express');
const router = express.Router();
const UserNotificationApiController = require('../controllers/UserNotificationApiController');

router.post('/index-usernotification',UserNotificationApiController.indexNotification);
router.post('/delete-usernotification',UserNotificationApiController.deleteNotification);



module.exports = router;