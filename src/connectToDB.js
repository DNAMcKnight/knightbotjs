import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const DB_URL = process.env.SWIMBOT_DB;

export const getLinkedTags = async (discordID) => {
  const client = new MongoClient(DB_URL);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    const cursor = client
      .db("Database")
      .collection("account_data")
      .find(
        {
          discord_id: discordID,
        },
        { projection: { _id: 1 } }
      );
    const result = await cursor.toArray();
    return result.map((doc) => doc._id);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

export const getLinkedUser = async (tag) => {
  const client = new MongoClient(DB_URL);

  try {
    if (!tag.startsWith("#")) {
      tag = `#${tag}`;
    }

    await client.connect();

    const cursor = await client
      .db("Database")
      .collection("account_data")
      .findOne(
        { _id: tag },
        { projection: { discord_id: 1, _id: 0 } } // Only return discord_id field
      );

    return cursor?.discord_id; // Returns just the discord_id value
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await client.close();
  }
};

// console.log(await getLinkedTags("310517079642079234"));
// async function main() {
//   const client = new MongoClient(DB_URL);

//   try {
//     // Connect to the MongoDB cluster
//     await client.connect();

//     // Make the appropriate DB calls
//     const cursor = await client.db("Database").collection("account_data").find({
//       _id: "#PY89PLLY",
//     });
//     console.log("Databases:");
//     const result = await cursor.toArray();
//     console.log(result);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }

// async function listDatabases(client) {
//   // const databasesList = await client.db().admin().listDatabases();
//   const cursor = await client.db("Database").collection("account_data").find({
//     _id: "#PY89PLLY",
//   });
//   console.log("Databases:");
//   const result = await cursor.toArray();
//   console.log(result);
// }

// main().catch(console.error);
