import "dotenv/config";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID as METADATA_PID,
} from "@metaplex-foundation/mpl-token-metadata";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const main = async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const payer = getKeypairFromEnvironment("SECRET_KEY");

  
  const mint = new PublicKey("BH2sojudcxLzEyixBwPisFr7TzqmHRVa4tkKn1k8qPZj");

  
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PID.toBuffer(),
      mint.toBuffer(),
    ],
    METADATA_PID
  );

  
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

  console.log("Metadat");
  console.log("Tx:", sig);
};

main();
