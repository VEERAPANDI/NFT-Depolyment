# 🖼️ NFT Deployment

**Create, Deploy & Mint Your Own NFTs on Blockchain**

A simple project demonstrating how to create and deploy **NFTs (Non-Fungible Tokens)** using smart contracts, IPFS storage, and blockchain networks like Ethereum.

---

## 📌 Overview

This repository provides a step-by-step implementation of:

* Creating NFT smart contracts (ERC-721 standard)
* Uploading metadata to IPFS
* Deploying contracts to blockchain
* Minting NFTs

NFTs are unique digital assets stored on a blockchain and commonly used for art, collectibles, and digital ownership ([Quicknode][1])

---

## 🚀 Features

* 🧾 ERC-721 NFT smart contract
* 🌐 IPFS-based metadata storage
* ⚡ Smart contract deployment scripts
* 🖼 Mint NFTs with unique token URIs
* 🔗 Blockchain interaction using Web3

---

## 🧰 Tech Stack

* Solidity
* Hardhat / Truffle
* Ethers.js / Web3.js
* OpenZeppelin Contracts
* IPFS (Pinata / Infura)

---

## 📂 Project Structure

```bash
NFT-Depolyment/
│
├── contracts/        # Solidity smart contracts
├── scripts/          # Deployment & mint scripts
├── metadata/         # NFT metadata JSON files
├── assets/           # Images / media files
├── hardhat.config.js # Hardhat configuration
├── package.json
└── README.md
```

---

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/VEERAPANDI/NFT-Depolyment.git

cd NFT-Depolyment

# Install dependencies
npm install
```

---

## 🔧 Configuration

Create a `.env` file:

```env
PRIVATE_KEY=your_wallet_private_key
RPC_URL=your_blockchain_rpc_url
```

---

## 🏗️ Compile Smart Contract

```bash
npx hardhat compile
```

---

## 🚀 Deploy Contract

```bash
npx hardhat run scripts/deploy.js --network goerli
```

After deployment, you will get:

* Contract address
* Network details

---

## 🖼️ Upload NFT Metadata

1. Upload image to IPFS (Pinata / Infura)
2. Create metadata JSON:

```json
{
  "name": "My NFT",
  "description": "My first NFT",
  "image": "ipfs://<CID>"
}
```

---

## 🎨 Mint NFT

```bash
npx hardhat run scripts/mint.js --network goerli
```

---

## 🔐 Example Smart Contract

```solidity
contract MyNFT is ERC721URIStorage {
    uint256 public tokenCounter;

    constructor() ERC721("MyNFT", "MNFT") {
        tokenCounter = 0;
    }

    function mintNFT(address recipient, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = tokenCounter;
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter++;
        return newItemId;
    }
}
```

---

## 🌍 Deployment Flow

1. Create NFT asset
2. Upload to IPFS
3. Create metadata
4. Deploy smart contract
5. Mint NFT

---

## 🧪 Use Cases

* 🎨 Digital Art NFTs
* 🎮 Game Assets
* 📜 Certificates
* 🎟 Event Tickets
* 🛒 NFT Marketplaces

---

## ⚠️ Notes

* Use testnet (Goerli / Sepolia) before mainnet
* Keep private keys secure
* Gas fees apply for deployment

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a branch
3. Commit changes
4. Open Pull Request

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

## 📜 License

MIT License

---

## 📚 References

* ERC-721 Standard
* OpenZeppelin Contracts
* IPFS Documentation
