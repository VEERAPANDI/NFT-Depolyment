## 📊 Complete Data Flow Summary
```
1. User picks image.jpg
        ↓
2. Frontend → POST /api/upload-image (FormData)
        ↓
3. Backend → Pinata pinFileToIPFS → returns CID: "bafkrei..."
        ↓
4. Frontend → POST /api/upload-metadata { name, description, imageCID }
        ↓
5. Backend builds metadata JSON:
   {
     "name": "Cool Ape #1",
     "description": "...",
     "image": "ipfs://bafkrei...",
     "attributes": [...]
   }
        ↓
6. Backend → Pinata pinJSONToIPFS → returns metadataCID: "bafkrey..."
        ↓
7. tokenURI = "ipfs://bafkrey..."
        ↓
8. Frontend → Smart Contract mint(walletAddress, tokenURI)
        ↓
9. NFT minted on blockchain ✅
   OpenSea/wallets fetch ipfs://bafkrey... and display your image