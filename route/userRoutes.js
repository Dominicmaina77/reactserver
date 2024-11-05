const express = require('express');
const { createUser } = require('../controller/UserController');
const router = express.Router();
router.use(express.urlencoded({extended:true}));
router.use(express.json());

router.post('/createuser', createUser)

module.exports = router;
