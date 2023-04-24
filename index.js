import app from './app.js';
import connectDB from './services/external/databaseConnection.js';
import {listenAppMsg} from './utils/messages.js';

const port = 3000;

app.listen(port, () => {
  console.log(listenAppMsg(port));
  connectDB();
});
