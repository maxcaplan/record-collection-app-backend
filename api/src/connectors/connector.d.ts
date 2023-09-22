export declare enum Collection {
  OWNED_ALBUMS = "owned_albums",
  WISHLIST_ALBUMS = "wishlist_albums",
  ARTISTS = "artists",
  GENRES = "genres",
}

export declare interface Data {
  [key: string | number | symbol]: unknown;
}

export declare interface DataWithOptionalID extends Data {
  _id?: string;
}

export declare interface ConnectorResponse {
  succeeded: boolean;
  errors?: unknown | unknown[];
}

export declare interface ConnectorDataResponse<DataType extends Data | Data[]>
  extends ConnectorResponse {
  data?: DataType;
}

export declare interface Connector {
  /** Establish a connection with the database */
  connect(): Promise<ConnectorResponse>;

  /** Close the connection to the database */
  close(force?: boolean): Promise<ConnectorResponse>;

  /**
   * Find the first document in a collection that matches a filter
   * @param collection - The name of the collection to use
   * @param filter - The filter to match the documents to
   */
  findOne<DataType extends Data>(
    collection: Collection,
    filter: DataType,
    ...args: any[]
  ): Promise<ConnectorDataResponse<DataType>>;

  /**
   * Find all documents in a collection that match a filter
   * @param collection - The name of the collection to use
   * @param filter - The filter to match the documents to
   */
  findMany<DataType extends Data>(
    collection: Collection,
    filter: DataType,
    ...args: any[]
  ): Promise<ConnectorDataResponse<DataType[]>>;

  /**
   * Insert a document into a collection
   * @param collection - The name of the collection to use
   * @param doc - The document to insert
   */
  insertOne<DataType extends DataWithOptionalID>(
    collection: Collection,
    doc: DataType,
    ...args: any[]
  ): Promise<ConnectorDataResponse<DataType>>;

  /**
   * Insert multiple documents into a collection
   * @param collection - The name of the collection to use
   * @param docs - An array of documents to insert
   */
  insertMany<DataType extends Data>(
    collection: Collection,
    doc: DataType[],
    ...args: any[]
  ): Promise<ConnectorDataResponse<DataType[]>>;

  /**
   * Update the first document in a collection that matches a filter
   * @param collection - The name of the collection to use
   * @param filter - The filter to match the document to update to
   * @param update - The update document
   */
  updateOne<DataType extends Data>(
    collection: Collection,
    filter: DataType,
    update: DataType,
    ...args: any[]
  ): Promise<ConnectorResponse>;

  /**
   * Update multiple documents in a collection that match a filter
   * @param collection - The name of the collection to use
   * @param filter - The filter to match the documents to update to
   * @param update - The update document
   */
  updateMany<DataType extends Data>(
    collection: Collection,
    filter: DataType,
    update: DataType,
    ...args: any[]
  ): Promise<ConnectorResponse>;

  /**
   * Replace a document in a collection that matches a filter with a new
   * document
   * @param collection - The name of the collection to use
   * @param filter - The filter to match the document to replace to
   * @param doc - The document to replace the matched document with
   */
  replaceOne<DataType extends Data>(
    collection: Collection,
    filter: DataType,
    doc: DataType,
    ...args: any[]
  ): Promise<ConnectorDataResponse<DataType>>;

  /**
   * Delete the first document in a collection that matches a filter.
   * If no filter is given, the first document in the collection is deleted.
   * @param collection - The name of the collection to use
   * @param filter - The filter to match the document to delete to
   */
  deleteOne<DataType extends Data>(
    collection: Collection,
    filter?: DataType,
    ...args: any[]
  ): Promise<ConnectorDataResponse<DataType>>;

  /**
   * Delete multiple documents in a collection that match a filter.
   * If no filter is given, every document in the collection is deleted
   * @param collection - The name of the collection to use
   * @param filter - The filter to match the documents to delete to
   */
  deleteMany<DataType extends Data>(
    collection: Collection,
    filter?: DataType,
    ...args: any[]
  ): Promise<ConnectorDataResponse<DataType[]>>;
}
