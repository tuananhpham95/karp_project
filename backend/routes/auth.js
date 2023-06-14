const userController = require('../controllers/userController');
const userLocation = require('../controllers/userController')
const jwt = require("jsonwebtoken");
const middleWare = require('../controllers/middleWare')

const router = require('express').Router();

router.post('/register',userController.userRegister);
router.post('/login',userController.userLogin );
router.post('/location',userController.userLocation)
// router.put('/update/:id',userController.userUpdate);
router.delete('/delete/:id',userController.userDelete);
router.post('/logout/',middleWare.verifyAccessToken,userController.userLogout);
router.post('/upload-file',userController.userLoadFile);
router.post('/getUser',userController.getUser);
router.get('/getAllImages',userController.getAllImages);
router.get('/getAllLocations',userController.getAllLocations);
// router.post('/saveAddressToDatabase',userController.saveAddressToDatabase);




module.exports = router;

