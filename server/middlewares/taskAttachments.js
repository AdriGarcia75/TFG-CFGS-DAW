const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const taskId = req.params.taskId;

    const dir = path.join(__dirname, '..', 'uploads', 'attachments', taskId);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');
    cb(null, `${timestamp}-${safeName}`);
  }
});

const taskAttachments = multer({ storage });

module.exports = taskAttachments;
