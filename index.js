const express   = require('express');
const cors      = require('cors');
const config    = require('./config');
const app       = express();
const router    = require('./network/router');
const connectDB = require('./db')

connectDB(config.dbUrl);
app.use( cors() );
app.use(express.json());
router(app);

app.listen(config.port,()=>{
    console.log('The app is listening: Port 3000');
});
