import { Bson, MongoClient } from "./deps.ts";

const client = new MongoClient();
console.log("Connecting to database...");
await client.connect("mongodb://root:test@mongo:27017");
console.log("Connected!");

interface RecordSchema {
  _id: Bson.ObjectId;
  name: string;
  artists: string[];
  label: string;
  format: Format;
  country: string;
  released: Date;
  genres: string[];
  disks: Disk[];
  credits: Credit[];
  condition: Stars;
  rating: Stars;
}

interface Format {
  size: number;
  speed: number;
  weight: number;
}

interface Disk {
  sides: Sides[];
}

interface Sides {
  tracks: Track[];
}

interface Track {
  name: string;
  playtime: number;
}

interface Credit {
  name: string;
  role: string;
}

enum Stars {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

const db = client.database("records");
const inventory = db.collection<RecordSchema>("inventory");

const getInventory = async () => {
  console.log("Getting inventory");
  const records = await inventory.find();
  console.log(records);
  const recordsArray = await records.toArray()
  console.log(recordsArray);

  return recordsArray;
};

const getInventoryRecord = async (args: any) => {
  const records = await inventory.find({ name: args.name }).toArray()
  return records
};

export const resolvers = {
  Query: {
    hello: () => `Hello, World!`,
    getInventory: () => getInventory(),
    getInventoryRecord: (_: any, args: any) => getInventoryRecord(args),
  },

  Stars: {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  },
};
