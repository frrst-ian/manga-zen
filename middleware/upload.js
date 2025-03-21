// middleware/cloudinaryUpload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Verify Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Log Cloudinary config status (masking sensitive info)
console.log('Cloudinary configured for cloud:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('Cloudinary API key:', process.env.CLOUDINARY_API_KEY ? '*** configured ***' : 'missing');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    // Generate filename with folder structure
    const extension = file.mimetype.split('/')[1];
    const publicId = `manga-${Date.now()}`;
    
    const params = {
      folder: 'manga-zen/covers', // Organized folder structure
      public_id: publicId,
      secure: true, 
      allowed_formats: ['jpg', 'jpeg', 'png'],
      format: extension,
    };

    // Log upload parameters
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

// Add error logging for multer
upload.errorHandler = (err, req, res, next) => {
  console.error('Upload error:', err);
  res.status(400).json({
    success: false,
    message: err.message
  });
};

module.exports = upload;