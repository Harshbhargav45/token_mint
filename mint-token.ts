import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const main = async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const payer = getKeypairFromEnvironment("SECRET_KEY");

  const mint = new PublicKey("BH2sojudcxLzEyixBwPisFr7TzqmHRVa4tkKn1k8qPZj");

  console.log("Creating or fetching ATA...");

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,              
    mint,
    payer.publicKey      
  );

  console.log("ATA:", tokenAccount.address.toBase58());

  const amount = 100 * 10 ** 9;

  const sig = await mintTo(
    connection,
    payer,
    mint,
    tokenAccount.address,
    payer.publicKey,
    amount
  );

  console.log("Minted successfully!");
  console.log("Tx:", sig);
};

main();
