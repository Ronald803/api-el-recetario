const storeUsers        = require('./store.users');
const bcryptjs          = require('bcryptjs');
const jwt               = require('jsonwebtoken')

function addUser(name,email,password){
    return new Promise(async(resolve,reject)=>{
        // _________________________ encrypting password _____________
        const salt = bcryptjs.genSaltSync();
        const encryptPassword = bcryptjs.hashSync(password,salt);
        // ___________________________________________________________
        const user = {
            name, email, 
            password: encryptPassword, 
            favorites:[],
            rol: 'user'
        }
        // _________________________ saving in data base ____________
        const userSaved = await storeUsers.add(user)
        // _________________________ generating jwtoken _____________
        const payload   = {uid:userSaved._id};
        const token     = jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{expiresIn:'4h'});
        // __________________________________________________________
        resolve({
            name: userSaved.name,
            rol: userSaved.rol,
            token
        })
    })
}
function getUser(){
    return new Promise(async (resolve,reject)=>{
        const usersFound = await storeUsers.list()
        resolve(usersFound)
    })
}

module.exports = {
    addUser,
    getUser
}
