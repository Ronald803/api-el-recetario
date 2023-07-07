require('dotenv').config();
const config = {
    port:   process.env.PORT            || 4000,
    dbUrl:  process.env.MONGODB_CNN     
}

module.exports = config;