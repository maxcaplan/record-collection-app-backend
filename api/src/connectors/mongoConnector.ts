import { MongoClient } from "mongodb";
import { getErrorMessage } from "../utility/errorReporting";

import type { ConnectorResponse, Connector } from "./connector";
import type {
  MongoClientOptions,
  Db,
  Document,
  Filter,
  FindOptions,
  OptionalId,
  InsertOneOptions,
  BulkWriteOptions,
  UpdateFilter,
  UpdateOptions,
  WithoutId,
  ReplaceOptions,
  DeleteOptions,
  DropCollectionOptions,
  InsertManyResult,
  InsertOneResult,
  WithId,
  UpdateResult,
  DeleteResult,
} from "mongodb";

/** MongoDB connection abstraction class */
export default class MongoConnector implements Connector<Document> {
  port: string | number;
  user: string;
  pass: string;
  authSource: string;
  connectionUrl: string;
  client: MongoClient;
  db: Db;

  /**
   * Create a MongoConnector
   * @param user - Connection username
   * @param pass - Connection password
   * @param port - Connection port
   * @param authSource - Database to authenticate connection against
   * @param options - Additional client options
   */
  constructor(
    user: string,
    pass: string,
    port: string | number,
    authSource: string,
    options?: MongoClientOptions,
  ) {
    this.user = user;
    this.pass = pass;
    this.port = port;
    this.authSource = authSource;

    this.connectionUrl = this.createConnectionUrl(
      this.user,
      this.pass,
      this.port,
      this.authSource,
    );

    this.client = new MongoClient(this.connectionUrl, options);
    this.db = this.client.db("data");
  }

  /** Connect to MongoDB with `this.connectionUrl` */
  async connect(): Promise<ConnectorResponse<Document>> {
    try {
      await this.client.connect();

      return {
        succeeded: true,
      };
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /**
   * Closes connection to database
   * @param `force` Force close, emitting no events
   */
  async close(force?: boolean): Promise<ConnectorResponse<Document>> {
    try {
      await this.client.close(force);

      return {
        succeeded: true,
      };
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /** Returns the first document that matches given filter in given collection */
  async findOne(
    collection: string,
    filter: Filter<Document>,
    options: FindOptions<Document>,
  ): Promise<ConnectorResponse<WithId<Document> | null>> {
    try {
      const coll = this.db.collection(collection);
      const res = await coll.findOne(filter, options);

      return { data: res, succeeded: true };
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /** Returns array of documents that match given filter in given collection */
  async findMany(
    collection: string,
    filter: Filter<Document>,
    options?: FindOptions<Document>,
  ): Promise<ConnectorResponse<WithId<Document>[]>> {
    try {
      const coll = this.db.collection(collection);
      const cursor = coll.find(filter, options);
      const res = await cursor.toArray();

      return { data: res, succeeded: true };
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /** Inserts a new document into the given collecion */
  async insertOne(
    collection: string,
    doc: OptionalId<Document>,
    options?: InsertOneOptions,
  ): Promise<ConnectorResponse<InsertOneResult<Document>>> {
    try {
      const coll = this.db.collection(collection);
      const res = await coll.insertOne(doc, options);

      return { data: res, succeeded: true };
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /** Inserts multiple new documents into the given collection */
  async insertMany(
    collection: string,
    docs: OptionalId<Document>[],
    options?: BulkWriteOptions,
  ): Promise<ConnectorResponse<InsertManyResult<Document>>> {
    try {
      const coll = this.db.collection(collection);
      const res = await coll.insertMany(docs, options);

      return { data: res, succeeded: true };
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /** Updates first document that matches given filter in given collection */
  async updateOne(
    collection: string,
    filter: Filter<Document>,
    update: UpdateFilter<Document> | Partial<Document>,
    options?: UpdateOptions,
  ): Promise<ConnectorResponse<UpdateResult<Document>>> {
    try {
      const coll = this.db.collection(collection);
      const res = await coll.updateOne(filter, update, options);

      return { data: res, succeeded: true };
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /** Updates all documents that match given filter in given collection */
  async updateMany(
    collection: string,
    filter: Filter<Document>,
    update: UpdateFilter<Document>,
    options?: UpdateOptions,
  ): Promise<ConnectorResponse<UpdateResult<Document>>> {
    try {
      const coll = this.db.collection(collection);
      const res = await coll.updateMany(filter, update, options);

      return { data: res, succeeded: true };
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /** Replaces first document that matches given filter in given collection */
  async replaceOne(
    collection: string,
    filter: Filter<Document>,
    replacment: WithoutId<Document>,
    options?: ReplaceOptions,
  ): Promise<ConnectorResponse<Document | UpdateResult<Document>>> {
    try {
      const coll = this.db.collection(collection);
      const res = await coll.replaceOne(filter, replacment, options);

      return { data: res, succeeded: true };
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /**
   * Deletes first document that matches given filter in given collection
   * If no filter is given, deletes first document in given collection
   */
  async deleteOne(
    collection: string,
    filter?: Filter<Document>,
    options?: DeleteOptions,
  ): Promise<ConnectorResponse<DeleteResult>> {
    try {
      const coll = this.db.collection(collection);
      const res = await coll.deleteOne(filter, options);

      return { data: res, succeeded: true };
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /** Deletes all documents that match given filter in given collection */
  async deleteMany(
    collecion: string,
    filter: Filter<Document>,
    options?: DeleteOptions,
  ): Promise<ConnectorResponse<DeleteResult>> {
    try {
      const coll = this.db.collection(collecion);
      const res = await coll.deleteMany(filter, options);

      return { data: res, succeeded: true };
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /** Drops given collection from the database, deleting all of it'd documents */
  async dropCollection(
    collecion: string,
    options?: DropCollectionOptions,
  ): Promise<ConnectorResponse<boolean>> {
    try {
      const coll = this.db.collection(collecion);
      const res = await coll.drop(options);

      return { data: res, succeeded: true };
    } catch (e) {
      throw new Error(getErrorMessage(e));
    }
  }

  /**
   * Creates a MongoDB connection url with the following components:
   * `this.user` - DB username
   * `this.pass` - DB password
   * `this.port` - DB port
   * `this.authSource` - What DB to authenticate against
   */
  createConnectionUrl(
    user: string,
    pass: string,
    port: string | number,
    authSource: string,
  ): string {
    return encodeURI(
      `mongodb://${user}:${pass}@db:${port}/ps?authSource=${authSource}`,
    );
  }
}
