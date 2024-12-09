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
    const accounts = client.db("Database").collection("account_data");
    const cursor = await accounts.find(
      { discord_id: discordID },
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

    const accounts = client.db("Database").collection("account_data");
    const cursor = await accounts.findOne(
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

export const linkUser = async (resp, discord_id) => {
  const client = new MongoClient(DB_URL);

  try {
    if (!tag.startsWith("#")) {
      tag = `#${tag}`;
    }

    await client.connect();
    const date = new Date().toISOString().replace(/\.\d{3}Z$/, ".000+00:00");
    const accounts = client.db("Database").collection("account_data");
    const cursor = await accounts.insertOne({
      _id: resp.tag,
      discord_id: String(discord_id),
      player_info: resp,
      last_update: date,
    });

    return true;
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await client.close();
  }
};

export const unlinkUser = async (tag) => {
  const client = new MongoClient(DB_URL);

  try {
    if (!tag.startsWith("#")) {
      tag = `#${tag}`;
    }

    await client.connect();
    const accounts = client.db("Database").collection("account_data");
    const cursor = await accounts.deleteOne({ _id: tag });

    return true;
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await client.close();
  }
};
