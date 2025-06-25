const express = require('express');
const router = express.Router();
const UserApiController = require('../controllers/UserApiController');
const upload = require('../config/multerfile')

router.post('/register',upload.single('image'),UserApiController.register);
router.post('/login',UserApiController.login);
router.post('/index',UserApiController.index);
router.post('/editprofile',UserApiController.editprofile);
router.post('/updateprofile',upload.single('image'),UserApiController.updateprofile);
router.post('/destroy',UserApiController.destroy);
router.post('/logout',UserApiController.logout);

// router.post('/',AdminApiController.);
// router.post('/',AdminApiController.register);
// router.post('/',AdminApiController.register);

module.exports=router;