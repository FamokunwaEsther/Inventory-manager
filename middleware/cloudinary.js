const multer = require('multer');
const cloudinary = require('../configs/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'inventorymanagement',
    allowedFormats: ['jpg', 'png']
});

const upload = multer({ storage: storage });
module
