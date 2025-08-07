import algosdk from 'algosdk';

// Create a fresh keypair
const { addr, sk } = algosdk.generateAccount();

// Convert the secret key to a 25-word mnemonic
const mnemonic = algosdk.secretKeyToMnemonic(sk);

console.log('Address:', addr);
console.log('Mnemonic:', mnemonic);
