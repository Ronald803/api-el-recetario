const users      = require('../components/users/network.users');

const routes = function(server){
    server.use('/api/recipes',(req,res)=>{
        res.send('request to recipes')
    });
    server.use('/api/users',users);
    server.use('/api/chefs',(req,res)=>{
        res.send('request to chefs')
    })
}

module.exports = routes;