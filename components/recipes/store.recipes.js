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
//_________________ Example __________________
// recipes:  [
//     {   id:1,
//         name: "Piquemacho",
//         image: "/img/carousel/platillos-principales.jpg",
//         punctuation: 7,
//         favorite: false,
//         time: 2,
//         difficulty : 10,
//         recommended : true,
//         category: ["Comida típica", "Platillos principales"],
//         ingredients : ["cebolla", "carne", "salchicha", "papas"],
//         process : ["Cortar todos los ingredientes", "Freir los ingredientes", "Servir"]
//     },
