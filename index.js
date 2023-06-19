const express   = require('express');
const config    = require('./config');
const app       = express();
const router    = require('./network/router')
const connectDB = require('./db')

connectDB(config.dbUrl);
app.use(express.json());
router(app);

app.listen(config.port,()=>{
    console.log('The app is listening: Port 3000');
});
