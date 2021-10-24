import express from 'express'
import mongoose from 'mongoose'
import { URL } from './models/URL'
import cors from 'cors'
import validateURL from './validation/url'

const app = express()
const port = 8080

// middlewares
app.use(cors())
app.use(express.json())

// db config
const dbURI = require('./config/keys').mongoURI

// Connect to MongoDB instance
mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

// base page
app.get('/', (req, res) => {
  URL.findOne({ id: req.query.id }).then((url) => {
    if (url) {
      res.json(url)
    } else {
      res.status(400).json({ status: 'Short URL is does not exist' })
    }
  })
})

// @route POST /create
// @desc Create short URL
// @access Public
app.post('/create', (req, res) => {
  console.log(req.body)
  URL.findOne({ id: req.body.id }).then((url) => {
    if (url) {
      res.status(400).json({ status: 'Short URL ID exists' })
    } else {
      const { errors, isValid } = validateURL(req.body)
      if (isValid) {
        const _id: string = new mongoose.Types.ObjectId().toString()
        new URL({
          id: req.body.id ? req.body.id : _id,
          _id: _id,
          url: req.body.url,
        })
          .save()
          .then((newUrl: { _doc: Object }) =>
            res.json({ ...newUrl._doc, status: 'Inserted record' }),
          )
          .catch((err: Object) => console.log(err))
      } else {
        res.status(400).json({ ...errors, status: 'Invalid input' })
      }
    }
  })
})
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}/`)
})
