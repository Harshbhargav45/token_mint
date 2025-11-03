import 'dotenv/config';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import { createMint } from '@solana/spl-token';

const main = async () => {
  const connection = new Connection(clusterApiUrl('devnet'));
  const payer = getKeypairFromEnvironment('SECRET_KEY');

  console.log("🚀 Creating Harsh Token...");
  const mint = await createMint(connection, payer, payer.publicKey, null, 9);
  console.log("✅ Harsh Token created successfully!");
  console.log("Mint address:", mint.toBase58());
};

main();
