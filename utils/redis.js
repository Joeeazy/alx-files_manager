import { promisify } from "util";
import { createClient } from "redis";

/**
 * A class representing a Redis client.
 */
class RedisClient {
  /**
   * Initializes a new Redis client instance.
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on("error", (err) => {
      console.error(
        "Failed to connect to Redis client:",
        err.message || err.toString()
      );
      this.isClientConnected = false;
    });
    this.client.on("connect", () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks whether the Redis client is connected.
   * @returns {boolean}
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Retrieves the value of a specified key from Redis.
   * @param {String} key The key of the item to retrieve.
   * @returns {String | Object}
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Stores a key-value pair in Redis with an expiration time.
   * @param {String} key The key of the item to store.
   * @param {String | Number | Boolean} value The value to store.
   * @param {Number} duration The time-to-live (TTL) of the item in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  /**
   * Deletes a specified key from Redis.
   * @param {String} key The key of the item to remove.
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
