import mongodb from "mongodb";
import envLoader from "./env_loader";

/**
 * A class to handle the connection to the MongoDB server.
 */
class DBClient {
  /**
   * Initializes a new DBClient instance.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || "localhost";
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || "files_manager";
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Checks if the MongoDB client is connected.
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Retrieves the total number of users in the database.
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    return this.client.db().collection("users").countDocuments();
  }

  /**
   * Retrieves the total number of files in the database.
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    return this.client.db().collection("files").countDocuments();
  }

  /**
   * Gets a reference to the `users` collection.
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    return this.client.db().collection("users");
  }

  /**
   * Gets a reference to the `files` collection.
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    return this.client.db().collection("files");
  }
}

export const dbClient = new DBClient();
export default dbClient;
