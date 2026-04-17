// backend/routes/config.js
const express = require('express');
const router = express.Router();

// WHY this endpoint?
// Browser cannot read .env directly.
// So backend reads .env and sends values to frontend via API.
// Only expose PUBLIC values here — never send PINATA_JWT to frontend!

router.get('/config', (req, res) => {
  try {
    const address = process.env.CONTRACT_ADDRESS;
    const abi     = process.env.CONTRACT_ABI;

    console.log('Config endpoint hit. CONTRACT_ADDRESS:', address );
    console.log('Config endpoint hit. CONTRACT_ABI:', abi );

    if (!address || !abi) {
      return res.status(500).json({
        success: false,
        error: 'CONTRACT_ADDRESS or CONTRACT_ABI missing in .env'
      });
    }

    res.json({
      success: true,
      contractAddress: address,
      contractABI: JSON.parse(abi)  // parse the JSON string into array
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;