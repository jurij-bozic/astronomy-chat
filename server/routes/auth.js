const express = require('express');
const { signup, login } = require('../controllers/auth.js');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

//exporting the router
module.exports = router;