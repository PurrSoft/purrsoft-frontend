export const appendQueryParams = <
  T extends Record<string, string | number | boolean | undefined>,
>(
  baseUrl: string,
  params?: T,
): string => {
  if (!params) {
    return baseUrl;
  }

  const queryParams = Object.entries(params)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== undefined) // Exclude undefined values
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&');

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};
