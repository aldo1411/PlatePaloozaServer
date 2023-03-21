import mongoose from "mongoose"
import { config } from "dotenv"

config()

const databaseName = process.env.DATABES_NAME
const databaseUser = process.env.DATABASE_USER
const databasePassword = process.env.DATABASE_PASSWORD

const connectDB = () =>{
  mongoose.set('strictQuery', false);
  mongoose.connect(`mongodb+srv://${databaseUser}:${databasePassword}@${databaseName}.vsqd0xl.mongodb.net/?retryWrites=true&w=majority`).then( () =>{
    console.log(`💿 Database -> 
    ✅ The database has been connected ;)`)
  }).catch(e =>{
    console.error(`💿 Database ->
    ❌ Error connecting the database! :(
    ${e}`)

    console.log(`💿 Database -> 
    retry after 5 seconds`)
    setTimeout(connectDB, 5000)
  })
}

export default connectDB