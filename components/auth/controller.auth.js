const bcryptjs      = require('bcryptjs');
const jwt           = require('jsonwebtoken');
const storeUser     = require('../users/store.users');

function login(email,password){
    console.log("controller auth");
    return new Promise( async(resolve,reject)=>{
        if(!email || !password){return reject('Incomplete Data')};
        // _____________________ Checking if email exists _____________
        const user = await storeUser.list({email});
        if(user.length<1){return reject('Incorrect information')};
        //______________________ Checking if password is correct ______
        const validPassword = bcryptjs.compareSync(password,user[0].password);
        if(!validPassword){return reject('Incorrect information')};
        //______________________ Generating jwtoken ___________________
        const payload   = {uid: user[0]._id};
        const token     = jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{expiresIn:'4h'});
        resolve({
            name: user[0].name,
            rol: user[0].rol,
            token
        })
    } )
}

module.exports = {login}