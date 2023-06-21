const express           = require('express');
const router            = express.Router();
const controllerRecipes = require('./controller.recipes');
const responsePattern   = require('../../network/responsePattern');
const {validateJWT}     = require('../../middlewares/validateJWT');

router.get('/',(req,res)=>{
    const queries = req.query;
    controllerRecipes.getRecipes(req.body,queries)
        .then(recipes=>{
            responsePattern.success(req,res,recipes.length,recipes,200);
        })
        .catch(e=>{
            responsePattern.error(req,res,400,e)
        })
})


router.post('/',validateJWT([]),(req,res)=>{
    const {name,image,punctuation,favorite,time,difficulty,recommended,category,ingredients,process} = req.body
    const autor = req.user.name;
    controllerRecipes.addRecipe(name,image,punctuation,favorite,time,difficulty,recommended,category,ingredients,process,autor)
        .then(newRecipe=>{
            responsePattern.success(req,res,'Receta añadida correctamente',newRecipe,201)
        })
        .catch(e=>{
            responsePattern.error(req,res,400,e)
        })
})

module.exports = router;