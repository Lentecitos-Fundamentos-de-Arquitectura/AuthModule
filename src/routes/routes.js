const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/controllers');
const router = express.Router();

router.post('/users', registerUser);
router.post('/users/login', loginUser);
router.get('/users', getAllUsers);

module.exports = router;