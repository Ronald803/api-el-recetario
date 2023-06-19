const ModelUser = require('./model.users')

async function add(user){
    const newUser = new ModelUser(user);
    const userSaved = await newUser.save();
    return(userSaved)
}
async function list(filter){
    const users = await ModelUser.find(filter);
    return users;
}

module.exports = {
    add,list
}