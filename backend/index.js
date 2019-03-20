// express server stuff
import express from 'express'
import cors from 'cors'

// query redirection stuff
import { parseQuery } from './helpers/queryString'

// helmet for security
import helmet from 'helmet'

// import nextjs
import next from 'next'

const PORT = 8080
const dev = true

const nextApp = next({ dev, dir: `${__dirname}/../frontend/` })
const handle = nextApp.getRequestHandler()

nextApp
  .prepare()
  .then(() => {
    const app = express()

    app.use(helmet())
    app.use(cors('*'))

    app.get('/', (req, res) => {
      let redirect
      // prune empty fields
      for (const key of Object.keys(req.query)) {
        if (Array.isArray(req.query[key])) {
          if (!req.query[key].length) {
            delete req.query[key]
            redirect = true
          }
        } else if (['', undefined, null].includes(req.query[key])) {
          delete req.query[key]
          redirect = true
        }
      }

      if (redirect) {
        const newQuery = parseQuery(req.query)
        return res.redirect(`/?${newQuery}`)
      } else {
        return nextApp.render(req, res, '/', req.query)
      }
    })

    app.get('*', (req, res) => {
      return handle(req, res)
    })

    app.listen(PORT)
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
