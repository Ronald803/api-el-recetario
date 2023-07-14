const storeRecipe       = require('./store.recipes');
const storeUser        = require('../users/store.users')
function addRecipe(name,favorite,time,difficulty,recommended,category,ingredients,process,autor){
    return new Promise(async(resolve,reject)=>{
        const recipe =
            {   
                name,image:"lalalala",favorite,time,difficulty,recommended,category,ingredients,process,autor
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
        try {
            const recipes = await storeRecipe.list(filter);
            if(queries){
                let recipesFiltered = filterArray(recipes,queries.type);
                recipesFiltered=filterArray(recipesFiltered,queries.comida)
                return resolve(recipesFiltered)
            } else {
                return resolve(recipes)
            }        
        } catch (error) {
            return reject(error)            
        }
    })
}

function likeRecipe(queries,user){
    return new Promise(async(resolve,reject)=>{
        try {
        // _________________ Verify that the recipe exists _______________________________
            const recipe = await storeRecipe.list({_id: queries.id})
            if(recipe.length===0){return reject("Esa receta no existe")}                
        
        //__________________ Verify if the user has already liked the recipe _____________
        let alreadyLikedRecipe = false;
        let alreadyRecommendedRecipe = false;
        user.favorites.map(idRecipe=>{
            if(idRecipe == queries.id){alreadyLikedRecipe = true}
        })
        user.recommended.map(idRecipe=>{
            if(idRecipe == queries.id){alreadyRecommendedRecipe = true}
        })

        if(queries.action === 'like'){
            if(alreadyLikedRecipe){return reject(`${user.name} ya le dió like a ${recipe[0].name}`)}
            //__________________ Save the id recipe in the users favorites object ____________
            const updatedUser = await storeUser.iLikeThisRecipe(user._id,queries.id);
            //__________________ Increase number of favorite in recipe object ________________
            const updatedRecipe = await storeRecipe.increaseFavorite(queries.id,1);    
            return resolve(updatedRecipe);
        } else if (queries.action === 'dislike'){
            if(!alreadyLikedRecipe){return reject(`${user.name} no le dió like a ${recipe[0].name}, por lo que no se le puede quitar el like`)};
            // _________________ Delete the id recipe of the users favorites objects _________
            const updatedUser = await storeUser.iDislikeThisRecipe(user._id,queries.id);
            // _________________ Decrease number of favorite in recipe object ________________
            const updatedRecipe = await storeRecipe.increaseFavorite(queries.id,-1);
            return resolve(updatedRecipe)
        } else if (queries.action === 'recommend') {
            if(alreadyRecommendedRecipe){return reject(`${user.name} ya recomendó ${recipe[0].name}`)}
            // _________________ Users only can recommend three recipes ______________________
            if(user.recommended.length === 3){return reject(`${user.name} ya recomendó 3 recetas`)}
            // _________________ Save the id recipe in the users recommended object __________
            const updatedUser = await storeUser.recommendRecipe(user._id,queries.id);
            // _________________ Increase the number of recommended in recipe object _________
            const updatedRecipe = await storeRecipe.increaseRecommended(queries.id,1);
            return resolve(updatedRecipe);            
        } else if (queries.action === 'undoRecommend') {
            if(!alreadyRecommendedRecipe){return reject(`${user.name} no recomendó ${recipe[0].name }, por lo que no se puede quitar de recomendados`)}
            // _________________ Delete the id recipe of the users recommended object ________
            const updatedUser = await storeUser.undoRecommendRecipe(user._id,queries.id);
            // _________________ Decrease number of recommended recipes object _______________
            const updatedRecipe = await storeRecipe.increaseRecommended(queries.id,-1);
            return resolve(updatedRecipe);
        }
        return reject(`La acción ${queries.action} es incorrecta`)
        } catch (error) {
            return reject('Revisa el id de la receta');
        }
    })
}

function getFavoriteRecipes(){
    const max = 10;
    return new Promise(async(resolve,reject)=>{
        const recipes = await storeRecipe.list();
        // ___________________ Filter the recipes that has at least one point in "favorite" ______________________
        let moreThanOnePointFavoriteRecipe = recipes.filter(recipe=>{
            return recipe.favorite > 0
        })
        moreThanOnePointFavoriteRecipe = moreThanOnePointFavoriteRecipe.sort((a,b)=>{
            return b.favorite - a.favorite
        })
        if(moreThanOnePointFavoriteRecipe.length<=max){
            return resolve(moreThanOnePointFavoriteRecipe)
        } else if(moreThanOnePointFavoriteRecipe.length>max){
            let justMaxFavoriteRecipes = [];
            console.log("aadf");
            for(let i=0 ; i<max ; i++){
                justMaxFavoriteRecipes.push(moreThanOnePointFavoriteRecipe[i])
            }
            return resolve(justMaxFavoriteRecipes)
        }
    })
}

function getRecommendedRecipes(){
    return new Promise(async(resolve,reject)=>{
        const recipes = await storeRecipe.list();
        // ____________________ Filter the recipes that has been recommended at least one time ______________________
        let recommendedRecipes = recipes.filter(recipe=>{
            return recipe.recommended > 0
        })
        resolve (recommendedRecipes)
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
    likeRecipe,
    getFavoriteRecipes,
    getRecommendedRecipes
}
