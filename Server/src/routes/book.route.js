const express = require('express');
const router = express.Router();
const bookController = require('../app/controllers/book.controller');

router.get('/getall', bookController.all);
router.get('/getcategory', bookController.category);

router.get('/:id', bookController.show);
router.get('/description/:name', bookController.description);

module.exports = router;
