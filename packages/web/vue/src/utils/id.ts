let counter = 0;

/** A document-unique id for label, description and error associations. */
export function uniqueId(prefix: string) {
  counter += 1;
  return `${prefix}-${counter}`;
}
