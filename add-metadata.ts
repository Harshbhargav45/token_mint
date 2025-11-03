import "dotenv/config";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";

const main = async () => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const payer = getKeypairFromEnvironment("SECRET_KEY");

  const mint = new PublicKey("9gThZKJjQ6AfVA8iKEJnNUunaNujvSAzHeE6Sfe5c7Ze");

  const metadataPDA = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  )[0];

  const tx = new Transaction().add(
    createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPDA,
        mint,
        mintAuthority: payer.publicKey,
        payer: payer.publicKey,
        updateAuthority: payer.publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name: "Harsh Token",
            symbol: "HRSH",
            uri: "",
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          },
          isMutable: true,
          collectionDetails: null,
        },
      }
    )
  );

  const sig = await sendAndConfirmTransaction(connection, tx, [payer]);
  console.log("✅ Metadata added successfully!");
  console.log("Signature:", sig);
};

main();
