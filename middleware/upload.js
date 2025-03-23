const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const extension = file.mimetype.split('/')[1];
    const publicId = `manga-${Date.now()}`;
    
    const params = {
      folder: 'manga-zen/covers',
      public_id: publicId,
      secure: true, 
      allowed_formats: ['jpg', 'jpeg', 'png'],
      format: extension,
    };

    console.log('Uploading to Cloudinary:');
    console.log('- Original name:', file.originalname);
    console.log('- Target folder:', params.folder);
    console.log('- Public ID:', publicId);
    console.log('- MIME type:', file.mimetype);

    return params;
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log('Rejected file type:', file.mimetype);
    cb(new Error('Only JPG, JPEG, and PNG files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
});

upload.errorHandler = (err, req, res, next) => {
  console.error('Upload error:', err);
  res.status(400).json({
    success: false,
    message: err.message
  });
};

module.exports = upload;