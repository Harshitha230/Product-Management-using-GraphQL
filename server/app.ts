import express, { application } from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import cors from 'cors'
import schema from './schemas'
import { graphqlHTTP } from 'express-graphql'

dotenv.config()

const PORT = process.env.PORT || 9000
const db_url =
  'mongodb+srv://user2:abcd1234@products.ez3ki.mongodb.net/Products?retryWrites=true&w=majority'

const app = express()
app.use(cors())

//MongoDB connection
mongoose.connect(db_url)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const startServer = async () => {
  app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  )
  app.listen(PORT, () => console.log('Server is running on Port 9000'))
}

startServer()
