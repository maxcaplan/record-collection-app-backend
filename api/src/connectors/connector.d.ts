export declare interface IDataType {
  [key: string]: unknown;
}

export declare interface ConnectorResponse<DataType> {
  data?: DataType;
  succeeded: boolean;
  errors?: unknown | unknown[];
}

export declare interface Connector<DataType> {
  connect(): Promise<ConnectorResponse<DataType>>;

  close(force?: boolean): Promise<ConnectorResponse<DataType>>;

  findOne(...args: unknown[]): Promise<ConnectorResponse<DataType | null>>;

  findMany(...args: unknown[]): Promise<ConnectorResponse<DataType[]>>;

  insertOne(...args: unknown[]): Promise<ConnectorResponse<DataType>>;

  insertMany(...args: unknown[]): Promise<ConnectorResponse<DataType>>;

  updateOne(...args: unknown[]): Promise<ConnectorResponse<DataType>>;

  updateMany(...args: unknown[]): Promise<ConnectorResponse<DataType>>;

  replaceOne(...args: unknown[]): Promise<ConnectorResponse<DataType>>;

  deleteOne(...args: unknown[]): Promise<ConnectorResponse<DataType>>;

  deleteMany(...args: unknown[]): Promise<ConnectorResponse<DataType>>;
}
