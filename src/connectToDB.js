import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const DB_URL = process.env.SWIMBOT_DB;

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */

  const client = new MongoClient(DB_URL);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
  // const databasesList = await client.db().admin().listDatabases();
  const cursor = await client.db("Database").collection("account_data").find({
    _id: "#PY89PLLY",
  });
  console.log("Databases:");
  const result = await cursor.toArray();
  console.log(result);
}

main().catch(console.error);
