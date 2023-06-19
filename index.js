const express   = require('express');
const config    = require('./config');
const app       = express();
const router    = require('./network/router')

router(app);
// app.use('/',function(req,res){
//     res.send('hola este es el backend del recetario')
// })

app.listen(config.port,()=>{
    console.log('The app is listening: Port 3000');
});
