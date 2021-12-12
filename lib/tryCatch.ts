export default async function tryCatch(
  promise: Promise<any>
): Promise<[error: unknown, data: any]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    console.error(error);
    return [error, null];
  }
}
