import express from "express";
import morgan from "morgan";
import cors from "cors"
import routeHandler from "./routes/api/main.routes.js";
import PKG from './package.json' assert {type: 'json'}

const app = express();

//** MiddleWare **//
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
//app.use(morgan("combined"))
app.use(cors())
app.set('etag', false)

//** API routes **//
routeHandler(app, 'api')

app.get('/api', (req,res) => {
    res.status(200).json({
      name: PKG.name,
      author: PKG.author,
      description: PKG.description,
      version: PKG.version
    })
  })
  

export default app
