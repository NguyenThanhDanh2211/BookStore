const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/home.controller');

router.use('/', homeController.index);

module.exports = router;
