// lib/algorand.js
import algosdk from 'algosdk';

const algodClient = new algosdk.Algodv2(
  process.env.ALGORAND_API_TOKEN,
  process.env.ALGORAND_NODE_URL,
  '' // endpoint already includes the port
);

const indexerClient = new algosdk.Indexer(
  process.env.ALGORAND_API_TOKEN,
  process.env.ALGORAND_INDEXER_URL,
  ''
);

const adminAccount = algosdk.mnemonicToSecretKey(process.env.ALGORAND_MNEMONIC);

export { algosdk, algodClient, indexerClient, adminAccount };