import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const user = getKeypairFromEnvironment("SECRET_KEY");
console.log("✅ Keypair loaded successfully!");
console.log("Public key:", user.publicKey.toBase58());
