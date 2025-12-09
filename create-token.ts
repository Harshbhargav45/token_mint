import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const main = async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const payer = getKeypairFromEnvironment("SECRET_KEY");

  console.log("Creating new token mint...");

  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    payer.publicKey,
    9        // decimals
  );

  console.log( "Token Mint Created!");
  console.log("Mint Address:", mint.toBase58());
};

main();
