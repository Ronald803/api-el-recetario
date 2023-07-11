const express           = require('express');
const router            = express.Router();
const controllerUser    = require('./controller.users');
const responsePattern   = require('../../network/responsePattern');
const {validateJWT}     = require('../../middlewares/validateJWT');
const controllerRecipes = require('../recipes/controller.recipes');

router.get('/favorites/details',validateJWT([]),async (req,res)=>{
    const arrayIdFavoriteRecipeUser = req.user.favorites;
    let recipesWithDetails = await Promise.all(
        arrayIdFavoriteRecipeUser.map(idRecipe=>{
            return controllerRecipes.getRecipes({_id:idRecipe})
                .then(recipe=>{
                    return recipe[0]
                })
        })
    )
    responsePattern.success(req,res,`Estos son los favoritos de ${req.user.name} con todos los detalles`,recipesWithDetails,201)
})

router.get('/favorites',validateJWT([]),(req,res)=>{
    if(req.user.favorites){
        responsePattern.success(req,res,`Estos son los favoritos de ${req.user.name}`,{favorites: req.user.favorites},201);
    } else {
        responsePattern.error(req,res,400,'No se encontraron los favoritos');
    }
})

router.get('/',(req,res)=>{
    controllerUser.getUser()
        .then(user=>{
            res.json(user)
        })
        .catch(e=>{
            res.json(e)
        })
})
router.post('/',(req,res)=>{
    const {name,email,password} = req.body
    controllerUser.addUser(name,email,password)
        .then(newUser=>{
            responsePattern.success(req,res,"Usuario añadido correctamente",newUser,201)
        })
        .catch(e=>{
            responsePattern.error(req,res,400,e)
        })
})



module.exports = router;

// __________________ Example ______________
// user : {
//     id: "123",
//     name : "Bellota Saltarina",
//     email : "belloti@gmail.com",
// password: "123",
//     favorites : [2,3,7]
// },
