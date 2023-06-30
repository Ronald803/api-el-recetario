const storeRecipe       = require('./store.recipes');

function addRecipe(name,image,favorite,time,difficulty,recommended,category,ingredients,process,autor){
    return new Promise(async(resolve,reject)=>{
        const recipe =
            {   
                name,image,favorite,time,difficulty,recommended,category,ingredients,process,autor
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

function likeRecipe(queries){
    console.log({queries});
    return new Promise(async(resolve,reject)=>{
        resolve("Petición put a recipe")
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
    getRecipes,
    likeRecipe
}

