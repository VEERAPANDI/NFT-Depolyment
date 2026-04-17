// backend/routes/metadata.js
const express = require('express');
const axios   = require('axios');
const router  = express.Router();

router.post('/upload-metadata', async (req, res) => {
  try {
    const { name, description, imageCID, attributes, tokenId } = req.body;

    const JWT = process.env.PINATA_JWT;
    if (!JWT) return res.status(500).json({ success: false, error: 'PINATA_JWT missing' });

    // ── Build ERC-721 standard metadata ──
    const metadata = {
      name:        name,
      description: description,
      image:       `https://ipfs.io/ipfs/${imageCID}`,    // points to image 
      external_url: 'https://in.linkedin.com/in/veerapandi-l-520596111', // optional: your project website
      attributes: attributes || [{
        trait_type: 'Owner',
        value: 'Veerapandi Lakshmanan',
      }, {
        trait_type: 'Owner Linkedin',
        value: 'https://in.linkedin.com/in/veerapandi-l-520596111',
      }]
    };

    // ── Upload metadata JSON to IPFS ──
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      {
        pinataContent:  metadata,
        pinataMetadata: { name: `${tokenId !== undefined ? tokenId : 'metadata'}.json` },
        pinataOptions:  { cidVersion: 1 }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${JWT}`
        }
      }
    );

    const metadataCID = response.data.IpfsHash;

    res.json({
      success:     true,
      metadataCID: metadataCID,
      tokenURI:    `https://gateway.pinata.cloud/ipfs/${metadataCID}`,
      // ── Also return gateway URL so you can verify it opens ──
      gatewayURL:  `https://gateway.pinata.cloud/ipfs/${metadataCID}`
    });

  } catch (error) {
    console.error('Metadata error:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.response?.data?.error?.reason || error.message });
  }
});

module.exports = router;