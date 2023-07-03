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
async function iLikeThisRecipe(id,idRecipe){
    const foundUser = await ModelUser.findById(id);
    foundUser.favorites.push(idRecipe);
    const updatedUser = await foundUser.save();
    return updatedUser;
}
async function iDislikeThisRecipe(id,idRecipe){
    const foundUser = await ModelUser.findById(id);
    const index = foundUser.favorites.indexOf(idRecipe);
    foundUser.favorites.splice(index,1);
    const updatedUser = await foundUser.save();
    return updatedUser;
}
async function recommendRecipe(idUser,idRecipe){
    const foundUser = await ModelUser.findById(idUser);
    foundUser.recommended.push(idRecipe);
    const updatedUser = await foundUser.save();
    return updatedUser;
}
async function undoRecommendRecipe(idUser,idRecipe){
    const foundUser = await ModelUser.findById(idUser);
    const index = foundUser.recommended.indexOf(idRecipe);
    foundUser.recommended.splice(index,1);
    const updatedUser = await foundUser.save();
    return updatedUser;
}
module.exports = {
    add,list,iLikeThisRecipe,iDislikeThisRecipe,recommendRecipe,undoRecommendRecipe
}