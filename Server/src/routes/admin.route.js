const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const AdminController = require('../app/controllers/admin.controller');
const storage = multer.diskStorage({
    destination: './admin/upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const up = multer({ storage: storage });
// hien thi sach
router.get('/listbook',AdminController.listbook);
// them sach
router.post('/addbook', AdminController.addbook);
//sua sach
//router.put('/update', AdminController.update);
//xoa sach
router.post('/removebook', AdminController.removebook);
// Thiết lập thư mục tĩnh để truy cập hình ảnh
router.use('/images', express.static('admin/upload/images'));
// Route xử lý tải lên hình ảnh
router.post('/upload', up.single('book'), AdminController.upload);
module.exports = router;
