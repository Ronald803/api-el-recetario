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

module.exports = {
    add,list
}
