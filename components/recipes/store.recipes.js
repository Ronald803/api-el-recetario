const ModelRecipe = require('./model.recipes');

async function add(recipe){
    const newRecipe     = new ModelRecipe(recipe);
    const recipeSaved   = newRecipe.save(); 
    return recipeSaved;
}

async function list(filter){
    const recipes = await ModelRecipe.find(filter);
    return recipes
}
async function increaseFavorite(idRecipe,number){
    let foundRecipe = await ModelRecipe.findById(idRecipe);
    foundRecipe.favorite = foundRecipe.favorite + number;
    const updatedRecipe = await foundRecipe.save();
    return updatedRecipe;
}

async function increaseRecommended(idRecipe,number){
    let foundRecipe = await ModelRecipe.findById(idRecipe);
    foundRecipe.recommended = foundRecipe.recommended + number;
    const updatedRecipe = await foundRecipe.save();
    return updatedRecipe;
}
module.exports = {
    add,list,increaseFavorite,increaseRecommended
}
