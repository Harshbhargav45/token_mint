import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const main = async () => {
  const connection = new Connection(clusterApiUrl("devnet"));

  console.log("Loading user keypair...");
  const user = getKeypairFromEnvironment("SECRET_KEY");

  console.log(` User (Payer) Address: ${user.publicKey.toBase58()}`);
  console.log(" Creating new token mint... (this might take a few seconds)");

  const tokenMint = await createMint(
    connection,
    user,
    user.publicKey,
    user.publicKey,
    9
  );
};

main();
