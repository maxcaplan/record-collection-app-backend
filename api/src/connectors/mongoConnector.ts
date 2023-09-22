import { MongoClient } from "mongodb";

import type {
  Connector,
  ConnectorDataResponse,
  ConnectorResponse,
  Data,
  DataWithOptionalID,
} from "./connector";
import type {
  MongoClientOptions,
  Db,
  Filter,
  FindOptions,
  InsertOneOptions,
  OptionalUnlessRequiredId,
  BulkWriteOptions,
  UpdateFilter,
  UpdateOptions,
  WithId,
  FindOneAndReplaceOptions,
  DeleteOptions,
} from "mongodb";

export default class MongoConnector implements Connector {
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

  async connect(): Promise<ConnectorResponse> {
    try {
      await this.client.connect();

      return { succeeded: true };
    } catch (error) {
      return { succeeded: false, errors: error };
    }
  }

  async close(force?: boolean): Promise<ConnectorResponse> {
    try {
      await this.client.close(force);

      return { succeeded: true };
    } catch (error) {
      return { succeeded: false, errors: error };
    }
  }

  async findOne<DataType extends Data>(
    collection: string,
    filter: DataType,
    options?: FindOptions,
  ): Promise<ConnectorDataResponse<DataType>> {
    try {
      const coll = this.db.collection<DataType>(collection);
      const res = await coll.findOne(filter as Filter<DataType>, options);

      return { data: res || undefined, succeeded: true };
    } catch (error) {
      return { succeeded: false, errors: error };
    }
  }

  async findMany<DataType extends Data>(
    collection: string,
    filter: DataType,
    options?: FindOptions,
  ): Promise<ConnectorDataResponse<DataType[]>> {
    try {
      const coll = this.db.collection<DataType>(collection);
      const cursor = coll.find(filter as Filter<DataType>, options);

      // Iterate over cursor and cast document to DataType
      const data: DataType[] = [];
      for await (const doc of cursor) {
        data.push(doc as DataType);
      }

      return { data, succeeded: true };
    } catch (error) {
      return { succeeded: false, errors: error };
    }
  }

  async insertOne<DataType extends DataWithOptionalID>(
    collection: string,
    doc: DataType,
    options?: InsertOneOptions,
  ): Promise<ConnectorDataResponse<DataType>> {
    try {
      const coll = this.db.collection<DataType>(collection);
      const res = await coll.insertOne(
        doc as OptionalUnlessRequiredId<DataType>,
        options,
      );

      const data: DataType = doc as DataType;
      data._id = res.insertedId;

      return { data: data, succeeded: true };
    } catch (error) {
      return { succeeded: false, errors: error };
    }
  }

  async insertMany<DataType extends DataWithOptionalID>(
    collection: string,
    docs: DataType[],
    options?: BulkWriteOptions,
  ): Promise<ConnectorDataResponse<DataType[]>> {
    try {
      const coll = this.db.collection<DataType>(collection);
      const res = await coll.insertMany(
        docs as OptionalUnlessRequiredId<DataType>[],
        options,
      );

      for (let i = 0; i < res.insertedCount; i++) {
        docs[i]._id = res.insertedIds[i];
      }

      return { data: docs, succeeded: true };
    } catch (error) {
      return { succeeded: false, errors: error };
    }
  }

  async updateOne<DataType extends Data>(
    collection: string,
    filter: DataType,
    update: DataType,
    options?: UpdateOptions,
  ): Promise<ConnectorResponse> {
    try {
      const coll = this.db.collection<DataType>(collection);

      const updateDoc: UpdateFilter<DataType> = { $set: update };

      await coll.updateOne(filter as Filter<DataType>, updateDoc, options);

      return { succeeded: true };
    } catch (error) {
      return { succeeded: false, errors: error };
    }
  }

  async updateMany<DataType extends Data>(
    collection: string,
    filter: DataType,
    update: DataType,
    options?: UpdateOptions,
  ): Promise<ConnectorResponse> {
    try {
      const coll = this.db.collection<DataType>(collection);

      const updateDoc: UpdateFilter<DataType> = { $set: update };

      await coll.updateMany(filter as Filter<DataType>, updateDoc, options);

      return { succeeded: true };
    } catch (error) {
      return { succeeded: false, errors: error };
    }
  }

  async replaceOne<DataType extends DataWithOptionalID>(
    collection: string,
    filter: DataType,
    doc: DataType,
    options?: FindOneAndReplaceOptions,
  ): Promise<ConnectorDataResponse<DataType>> {
    try {
      const coll = this.db.collection<DataType>(collection);

      const res = await coll.findOneAndReplace(
        filter as Filter<DataType>,
        doc as WithId<DataType>,
        options || { includeResultMetadata: true },
      );

      doc._id = res?._id;

      return { data: doc, succeeded: false };
    } catch (error) {
      return { succeeded: false, errors: error };
    }
  }

  async deleteOne<DataType extends Data>(
    collection: string,
    filter?: DataType,
    options?: DeleteOptions,
  ): Promise<ConnectorResponse> {
    try {
      const coll = this.db.collection<DataType>(collection);

      const deleteFilter = filter ? (filter as Filter<DataType>) : undefined;

      await coll.deleteOne(deleteFilter, options);

      return { succeeded: true };
    } catch (error) {
      return { succeeded: false, errors: error };
    }
  }

  async deleteMany<DataType extends Data>(
    collection: string,
    filter?: DataType,
    options?: DeleteOptions,
  ): Promise<ConnectorResponse> {
    try {
      const coll = this.db.collection<DataType>(collection);

      const deleteFilter = filter ? (filter as Filter<DataType>) : undefined;

      await coll.deleteMany(deleteFilter, options);

      return { succeeded: false };
    } catch (error) {
      return { succeeded: false, errors: error };
    }
  }

  /**
   * Creates a MongoDB connection url with the following components:
   * `this.user` - DB username
   * `this.pass` - DB password
   * `this.port` - DB port
   * `this.authSource` - What DB to authenticate against
   */
  private createConnectionUrl(
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
