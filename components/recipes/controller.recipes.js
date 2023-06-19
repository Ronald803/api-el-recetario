const storeRecipe       = require('./store.recipes');

function addRecipe(name,image,punctuation,favorite,time,difficulty,recommended,category,ingredients,process,autor){
    return new Promise(async(resolve,reject)=>{
        const recipe =
            {   
                name,image,punctuation,favorite,time,difficulty,recommended,category,ingredients,process,autor
            }
        const recipeSaved = await storeRecipe.add(recipe)
        resolve(recipeSaved)
    })
}

function getRecipes(filter){
    return new Promise(async(resolve,reject)=>{
        const recipes = await storeRecipe.list(filter);
        resolve(recipes)
    })
}

module.exports = {
    addRecipe,
    getRecipes
}