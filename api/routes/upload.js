const express = require('express');
const multer = require('multer');
const router = express.Router();

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle image upload
router.post('/upload-image', upload.single('image'), (req, res) => {
  try {
    // Here, you can process the uploaded image (e.g., save it to a storage service)
    // For demonstration purposes, we'll simply send back a JSON response with the image data.
    const imageData = req.file.buffer.toString('base64');
    res.json({ data: { url: `data:image/png;base64,${imageData}` } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
