export function handleError(e: unknown) {
  if (typeof e === "string") {
    console.error(e);
  } else if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error("There was an error");
  }
}
