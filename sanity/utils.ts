interface BuildQueryParams {
  type: string;
  query: string;
  category: string;
  page: number;
  perPage?: number;
}

export function buildQuery(params: BuildQueryParams) {
  const { type, query, category, page = 1, perPage = 10 } = params;

  // Base groq query
  const conditions = [`*[_type=="${type}"]`];

  // If we have a specific query
  if (query) conditions.push(`title match "*${type}*"`);

  // If we have a category
  if (category && category !== "all")
    conditions.push(`category === "${category}"`);

  // Pagination limits

  const offset = (page - 1) * perPage;
  const limits = perPage;

  return conditions.length > 1
    ? `${conditions[0]} && (${conditions
        .slice(1)
        .join(" && ")})][${offset}...${limits}]`
    : `${conditions[0]}[${offset}...${limits}]`;
}
