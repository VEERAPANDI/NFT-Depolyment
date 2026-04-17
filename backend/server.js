// ✅ dotenv MUST be the very first line — before any require()
require('dotenv').config();

const express     = require('express');
const cors        = require('cors');
const uploadRoute   = require('./routes/upload');
const metadataRoute = require('./routes/metadata');
const configRoute   = require('./routes/config');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', uploadRoute);
app.use('/api', metadataRoute);
app.use('/api', configRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  // ✅ Confirm env loaded on startup
  console.log('Pinata JWT loaded:', process.env.PINATA_JWT ? 'YES ✅' : 'NO ❌');
});