import "dotenv/config";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";

const main = async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const payer = getKeypairFromEnvironment("SECRET_KEY");

  const mintAddress = new PublicKey(
    "HW29wXYdNx9QGqtgZKeTRFeaePuYk2TDRpCknXfbRuTM"
  );

  console.log("Fetching or Creating Token Account...");

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mintAddress,
    payer.publicKey
  );

  console.log(`Token Account Ready: ${tokenAccount.address.toBase58()}`);
  console.log("Minting Tokens");

  const amount = 100 * Math.pow(10, 9);

  const signature = await mintTo(
    connection,
    payer,
    mintAddress,
    tokenAccount.address,
    payer.publicKey,
    amount
  );

  console.log("✅ Minted successfully!");
  console.log("Transaction Signature:", signature);
};

main();
