// frontend/mint.js (if using ethers.js with MetaMask)
const { ethers } = require('ethers');
const contractABI = require('./NFT_ABI.json'); // your contract ABI

async function mintOnChain(tokenURI) {
  // Connect to MetaMask wallet
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contractAddress = '0xYourContractAddress';
  const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

  // Call the mint function — passes the IPFS metadata URI as tokenURI
  // WHY tokenURI? ERC-721 standard stores this on-chain so wallets
  // can fetch the metadata JSON and display your NFT image
  const tx = await nftContract.mint(await signer.getAddress(), tokenURI);
  await tx.wait(); // wait for blockchain confirmation

  console.log('NFT minted! Transaction:', tx.hash);
}