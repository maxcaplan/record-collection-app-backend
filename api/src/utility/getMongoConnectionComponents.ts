type ComponentsTuple = [
  user: string,
  pass: string,
  port: string,
  authSource: string,
];

/**
 * Gets database uri connection components from the following environment
 * variables: DB_USER, DB_PASSW, DB_PORT, DB_AUTH_SOURCE
 */
export function getMongoConnectionComponents(): ComponentsTuple {
  const port = process.env.DB_PORT;
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const authSource = process.env.DB_AUTH_SOURCE;

  if (!port) throw new Error("Database port is undefined");
  if (!user) throw new Error("Database user is undefined");
  if (!pass) throw new Error("Database password is undefined");
  if (!authSource) throw new Error("Database auth source is undefined");

  return [user, pass, port, authSource];
}
