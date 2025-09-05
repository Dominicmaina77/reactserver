const express = require('express');
const { createUser, findUser, deleteUser, updateUser, login, getUserData } = require('../controller/UserController');
const router = express.Router();
router.use(express.urlencoded({extended:true}));
router.use(express.json());

router.post('/register', createUser)
router.get('/finduser/:id', findUser )
router.delete('/deleteuser/:id', deleteUser)
router.put('/updateuser/:id', updateUser)
router.post('/login', login)
router.post('/userdata', getUserData)

module.exports = router;
