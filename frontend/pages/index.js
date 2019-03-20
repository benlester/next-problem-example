import React from 'react'

import { parseQuery } from '../lib/searchQuery'

import Search from '../components/search'

function IndexPage ({ initialQuery }) {
  return (
    <div>
      <div>
        <h1>Search Results</h1>
      </div>
      <div>
        <h1>DEBUG</h1>
        <h2>INITIAL QUERY PROPS</h2>
        <pre>{JSON.stringify(initialQuery, null, 2)} </pre>
      </div>
      <div>
        <Search query={initialQuery} />
      </div>
    </div>
  )
}

IndexPage.getInitialProps = async ({ query }) => {
  console.log('GET INITIAL PROPS IS BEING CALLED')
  const initialQuery = parseQuery({ ...query })
  return { initialQuery }
}

export default IndexPage
