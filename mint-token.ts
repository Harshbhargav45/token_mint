import "dotenv/config";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";

const main = async () => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const payer = getKeypairFromEnvironment("SECRET_KEY");

  const mintAddress = new PublicKey(
    "9gThZKJjQ6AfVA8iKEJnNUunaNujvSAzHeE6Sfe5c7Ze"
  );

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mintAddress,
    payer.publicKey
  );

  console.log("✅ Token account:", tokenAccount.address.toBase58());

  const signature = await mintTo(
    connection,
    payer,
    mintAddress,
    tokenAccount.address,
    payer.publicKey,
    1000_000_000
  );

  console.log("✅ Minted 1000 Harsh Tokens to your wallet!");
  console.log("Signature:", signature);
};

main();
