import queryString from 'query-string'

export const parseQuery = searchQuery => {
  const arrayFields = ['manufacturer', 'brand']

  const valueFields = ['lowPrice', 'highPrice']

  for (const key of Object.keys(searchQuery)) {
    if (arrayFields.includes(key) && !Array.isArray(searchQuery[key])) {
      searchQuery[key] = [searchQuery[key]]
    }
  }
  for (const field of arrayFields) {
    if (!Object.keys(searchQuery).includes(field)) {
      searchQuery[field] = []
    }
  }

  if (searchQuery.lowPrice) {
    searchQuery.lowPrice = parseFloat(searchQuery.lowPrice)
  }

  if (searchQuery.highPrice) {
    searchQuery.highPrice = parseFloat(searchQuery.highPrice)
  }

  return queryString.stringify(searchQuery)
}
