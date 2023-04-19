const fs = require('fs');
const multer = require('multer');
const uniqid = require('uniqid');

// Setup upload config
const getStorage = (storedPath) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const path = storedPath;
      fs.mkdirSync(path, { recursive: true });
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const [fileName, fileExtension] = file.originalname.split('.');
      cb(null, uniqid(`${fileName}-`, `.${fileExtension}`));
    },
  });
};

const upload = (toPath) => {
  return multer({
    storage: getStorage(toPath),
    limits: {
      fileSize: 5000000, // 5mb = 5000000 bytes
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    },
  });
};

const uploadMiddleware = {
  uploadSingle: (toPath, fieldName) => {
    return (req, res, next) => {
      const action = upload(toPath).single(fieldName);

      action(req, res, (error) => {
        if (error) {
          // A Multer error occurred when uploading.
          return res.status(400).jsonp({
            error: error.message || 'Failed to upload file with unknown reason',
          });
        }

        // Everything went fine.
        next();
      });
    };
  },

  validateFormData: (req, res, next) => {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return res
        .status(400)
        .json({ error: 'Invalid content-type, only multipart/form-data is supported' });
    }

    next();
  },

  withThumbnail: (req, res, next) => {
    const now = Date.now();

    if (!['PATCH', 'POST'].includes(req.method)) {
      return res.status(404).json({ error: 'Not Found' });
    }

    if (req.file?.filename) {
      req.body.imageUrl = `${process.env.STATIC_URL}/thumbnails/${req.file?.filename}`;
    }

    if (req.method === 'PATCH') {
      req.body.updatedAt = now;
    } else {
      req.body.createdAt = now;
      req.body.updatedAt = now;
    }

    next();
  },
};

module.exports = uploadMiddleware;
