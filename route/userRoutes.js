const express = require('express');
const { createUser, findUser, deleteUser, updateUser } = require('../controller/UserController');
const router = express.Router();
router.use(express.urlencoded({extended:true}));
router.use(express.json());

router.post('/createuser', createUser)
router.get('/finduser', findUser )
router.delete('/deleteuser', deleteUser)
router.put('/updateuser', updateUser)

module.exports = router;
