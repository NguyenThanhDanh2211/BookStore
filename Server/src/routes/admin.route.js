const express = require('express');
const router = express.Router();

const AdminController = require('../app/controllers/admin.controller');

router.post('/create', AdminController.create);
router.post('/update', AdminController.update);
router.post('/delete', AdminController.delete);

module.exports = router;
