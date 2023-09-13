import logger from "../config/logger";

/**
 * Return an error message string given an unknown throw
 */
export function getErrorMessage(error: unknown): string | undefined {
  if (error instanceof Error) return error.message;
  return;
}

/**
 * Error reporting function
 */
export function reportError(obj: unknown, message?: string) {
  logger.error(obj, message);
}
