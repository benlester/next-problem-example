import queryString from 'query-string'
import { pickBy } from 'lodash'

export const parseQuery = searchQuery => {
  const arrayFields = ['manufacturer', 'brand']

  const valueFields = ['lowPrice', 'highPrice']

  // cleaning array fields - making sure all are present to be passed to Search component
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

  // cleaning value fields - if they're not in URL assign to ''
  for (const field of valueFields) {
    if (!Object.keys(searchQuery).includes(field)) {
      searchQuery[field] = ''
    }
  }

  if (searchQuery.lowPrice) {
    searchQuery.lowPrice = parseFloat(searchQuery.lowPrice)
  } else {
    searchQuery.lowPrice = ''
  }

  if (searchQuery.highPrice) {
    searchQuery.highPrice = parseFloat(searchQuery.highPrice)
  } else {
    searchQuery.highPrice = ''
  }

  return searchQuery
}

export const queryStringWithoutEmpty = (searchObject, stringify) => {
  const withoutEmpty = pickBy(searchObject, val => {
    if (Array.isArray(val)) {
      return val.length > 0
    } else {
      return val !== '' && val !== null
    }
  })
  return stringify ? queryString.stringify(withoutEmpty) : withoutEmpty
}
