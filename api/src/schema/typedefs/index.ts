import { typeDefs as commonTypeDefs } from "./common";
import { typeDefs as genreTypeDefs } from "./genre";
import { typeDefs as artistTypeDefs } from "./artist";
import { typeDefs as albumTypeDefs } from "./album";

export const typeDefs = [
  commonTypeDefs,
  artistTypeDefs,
  albumTypeDefs,
  genreTypeDefs,
];
