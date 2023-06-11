const userController = require('../controllers/userController');
const userLocation = require('../controllers/userController')

const router = require('express').Router();

//authRoutes
router.post('/register',userController.userRegister);
router.post('/login',userController.userlogin );
router.post('/location',userController.userLocation)
router.put('/update/:id',userController.userUpdate);
router.delete('/delete/:id',userController.userDelete);


module.exports = router;

