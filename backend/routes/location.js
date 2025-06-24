const express = require('express');
const router = express.Router();
const LocationApiController = require("../controllers/LocationApiController");

router.post('/create-location',LocationApiController.createlocation);
router.post('/index-location',LocationApiController.indexlocation);
router.post('/delete-location',LocationApiController.deletelocation);
router.post('/edit-location',LocationApiController.editlocation);
router.post('/update-location',LocationApiController.updatelocation);


module.exports = router;