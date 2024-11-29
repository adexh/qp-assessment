import { type PrismaClient } from '@prisma/client';

interface DatabaseOptions {
  databaseURL: string;
  databaseName: string;
}

class Database {
  private static instance: Database | null = null;

  private dbClient: PrismaClient;
  private connectionURL: string;
  public databaseName: string;

  /**
   * Private constructor to enforce singleton pattern.
   *
   * @param {PrismaClient} PrismaClientClass - The Prisma Client class to instantiate.
   * @param {DatabaseOptions} options - The database connection options.
   */
  private constructor(PrismaClientClass: typeof PrismaClient, options: DatabaseOptions) {
    const { databaseURL, databaseName } = options;

    this.connectionURL = databaseURL;
    this.databaseName = databaseName;

    // Instantiate PrismaClient with the provided connection URL
    this.dbClient = new PrismaClientClass({
      datasources: {
        db: {
          url: this.connectionURL,
        },
      },
    });
  }

  /**
   * Gets the singleton instance of the Database.
   *
   * @param {typeof PrismaClient} PrismaClientClass - The Prisma Client class to instantiate.
   * @param {DatabaseOptions} options - The database connection options.
   * @returns {Database} The singleton Database instance.
   */
  public static getInstance(
    PrismaClientClass: typeof PrismaClient,
    options: DatabaseOptions
  ): Database {
    if (!Database.instance) {
      Database.instance = new Database(PrismaClientClass, options);
    }
    return Database.instance;
  }

  /**
   * Connects to the database.
   *
   * @returns {Promise<void>} A promise indicating connection success.
   */
  public async connect(): Promise<void> {
    await this.dbClient.$connect();
  }

  /**
   * Disconnects from the database.
   *
   * @returns {Promise<boolean>} A promise representing disconnection success.
   */
  public async disconnect(): Promise<boolean> {
    await this.dbClient.$disconnect();
    return true;
  }

  /**
   * Exposes the PrismaClient instance directly.
   *
   * @returns {PrismaClient} The Prisma Client instance.
   */
  public getClient(): PrismaClient {
    return this.dbClient;
  }
}

export default Database;
