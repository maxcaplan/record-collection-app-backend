db.inventory.insertOne({
  name: "In Rainbows",
  artists: ["Radiohead"],
  label: "XL Recordings",
  format: { size: 12, speed: 33, weight: 180 },
  country: "Europe",
  released: "1199059200",
  genres: ["Electronic", "Rock"],
  disks: [
    [
      { name: "15 Step", playtime: 237 },
      { name: "Bodysnatchers", playtime: 242 },
      { name: "Nude", playtime: 255 },
      { name: "Weird Fishes/Arpeggi", playtime: 318 },
      { name: "All I Need", playtime: 229 },
    ],
    [
      { name: "Faust Arp", playtime: 130 },
      { name: "Reckoner", playtime: 290 },
      { name: "House Of Cards", playtime: 328 },
      { name: "Jigsaw Falling Into Place", playtime: 249 },
      { name: "Videotape", playtime: 280 },
    ],
  ],
});
