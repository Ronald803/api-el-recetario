const db        = require('mongoose')

db.Promise = global.Promise;

async function connectDB(url){
    await db.connect(url)
        .then(()=>{console.log('[db] Conected successfully')})
        .catch( (e)=>{console.log('[db] ',e)})
}

module.exports = connectDB;