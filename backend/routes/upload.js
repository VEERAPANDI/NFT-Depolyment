// backend/routes/upload.js
const express  = require('express');
const multer   = require('multer');
const axios    = require('axios');
const FormData = require('form-data');
const router   = express.Router();

const storage = multer.memoryStorage();
const upload  = multer({ storage });

router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {

    // ✅ DEBUG: Print JWT to confirm it's loading from .env
    // Remove this line after fixing the issue
    console.log('JWT loaded:', process.env.PINATA_JWT ? 'YES ✅' : 'NO ❌');
    console.log('JWT preview:', process.env.PINATA_JWT?.substring(0, 20) + '...');

    const JWT = process.env.PINATA_JWT;

    // ✅ Guard: stop immediately if JWT is missing
    if (!JWT) {
      return res.status(500).json({
        success: false,
        error: 'PINATA_JWT is missing in .env file'
      });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No image file received. Make sure field name is "image"'
      });
    }

    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    formData.append('pinataMetadata', JSON.stringify({
      name: file.originalname,
    }));

    formData.append('pinataOptions', JSON.stringify({
      cidVersion: 1,
    }));

    // ✅ DEBUG: Log headers before sending
    console.log('Sending to Pinata with Authorization: Bearer', JWT.substring(0, 20) + '...');

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          Authorization: `Bearer ${JWT}`,   // ✅ JWT injected here
          ...formData.getHeaders(),          // ✅ sets multipart boundary
        },
        maxContentLength: Infinity,          // ✅ allows large file uploads
        maxBodyLength: Infinity,
      }
    );

    const imageCID = response.data.IpfsHash;

    console.log('Image uploaded successfully! CID:', imageCID);

    res.json({
      success: true,
      imageCID,
      imageURI: `ipfs://${imageCID}`,
    });

  } catch (error) {
    // ✅ Full error log — shows exact Pinata response
    console.error('Pinata upload error status:', error.response?.status);
    console.error('Pinata upload error data:',   error.response?.data);
    console.error('Pinata upload error message:', error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data?.error?.reason || error.message
    });
  }
});

module.exports = router;