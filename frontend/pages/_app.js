import React from 'react'
import App, { Container } from 'next/app'

import 'sanitize.css/sanitize.css'

export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
          }}
        >
          <Component {...pageProps} />
        </div>
      </Container>
    )
  }
}
