db = db.getSiblingDB("data");
db.runCommand({
  createUser: process.env.DB_API_USER,
  pwd: process.env.DB_API_PASS,
  roles: [{ role: "readWrite", db: "data" }],
});

db.createCollection("owned_albums", { capped: false });
db.createCollection("wishlist_albums", { capped: false });
db.createCollection("artists", { capped: false });
db.createCollection("genres", { capped: false });
