const users         = require('../components/users/network.users');
const recipes       = require('../components/recipes/network.recipes');
const auth          = require('../components/auth/network.auth');
const routes = function(server){
    server.use('/api/recipes',recipes);
    server.use('/api/users',users);
    server.use('/api/auth',auth);
    server.use('/api/chefs',(req,res)=>{
        res.send('request to chefs')
    })
}

module.exports = routes;