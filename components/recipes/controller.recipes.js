const storeRecipe       = require('./store.recipes');

function addRecipe(name,image,punctuation,favorite,time,difficulty,recommended,category,ingredients,process,autor){
    return new Promise(async(resolve,reject)=>{
        const recipe =
            {   
                name,image,punctuation,favorite,time,difficulty,recommended,category,ingredients,process,autor
            }
        const recipeSaved = await storeRecipe.add(recipe)
        resolve({
            autor: recipeSaved.autor,
            _id: recipeSaved._id
        })
    })
}

function getRecipes(filter,queries){
    return new Promise(async(resolve,reject)=>{
        const recipes = await storeRecipe.list(filter);
        let recipesFiltered = filterArray(recipes,queries.type);
        recipesFiltered=filterArray(recipesFiltered,queries.comida)
        resolve(recipesFiltered)
    })
}

const filterArray = (array,parameter)=>{
    let arrayFiltered=[];
    if(parameter){
        array.map(recipe=>{
            recipe.category.map(cat=>{
                if(cat===parameter){
                    arrayFiltered.push(recipe)
                }
            })
        })
    }else{
        arrayFiltered = [...array];
    }
    return arrayFiltered;
}

module.exports = {
    addRecipe,
    getRecipes
}

