const storeUsers        = require('./store.users');
const bcryptjs          = require('bcryptjs');
const jwt               = require('jsonwebtoken')
const storeRecipes      = require('../recipes/store.recipes');

function addUser(name,email,password){
    return new Promise(async(resolve,reject)=>{
        if(!name || !email || !password){ return reject('Información incompleta')};
        // ________________ checking if the email has not been used already _________
        const userFound = await storeUsers.list({email});
        if(userFound.length>0){return reject('Solicitud denegada')}
        // _________________________ encrypting password _____________
        const salt = bcryptjs.genSaltSync();
        const encryptPassword = bcryptjs.hashSync(password,salt);
        // ___________________________________________________________
        const user = {
            name, email, 
            password: encryptPassword, 
            favorites:[],
            recommended: [],
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
    getUser,
}
