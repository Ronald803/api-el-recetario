const express           = require('express');
const router            = express.Router();
const controllerRecipes = require('./controller.recipes');
const responsePattern   = require('../../network/responsePattern');
const {validateJWT}     = require('../../middlewares/validateJWT');
const multer            = require('multer');
const upload = multer(); // TODO: Cambiar el nombre de upload

router.get('/favorites',(req,res)=>{
    controllerRecipes.getFavoriteRecipes()
        .then(favoriteRecipes=>{
            responsePattern.success(req,res,`Estas son las ${favoriteRecipes.length} recetas favoritas`,favoriteRecipes,200);
        })
        .catch(e=>{
            responsePattern.error(req,res,400,e);
        })
})
router.get('/recommended',(req,res)=>{
    controllerRecipes.getRecommendedRecipes()
        .then(recommendedRecipes=>{
            responsePattern.success(req,res,recommendedRecipes.length,recommendedRecipes,200)
        })
        .catch(e=>{
            responsePattern.error(req,res,400,e);
        })
})
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    controllerRecipes.getRecipes({_id:id})
        .then(recipe=>{
            responsePattern.success(req,res,recipe.length,recipe,200);
        })
        .catch(e=>{
            responsePattern.error(req,res,400,e)
        })
})
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

router.post('/',validateJWT([]),upload.any(),(req,res)=>{
    const {body,files} = req;
    const {name,favorite,time,difficulty,recommended,category,ingredients,process} = JSON.parse(req.body.bodyJson);
    const autor = req.user.name;
    controllerRecipes.addRecipe(name,favorite,time,difficulty,recommended,category,ingredients,process,autor,files)
        .then(newRecipe=>{
            responsePattern.success(req,res,'Receta añadida correctamente',newRecipe,201)
        })
        .catch(e=>{
            responsePattern.error(req,res,400,e)
        })
})

router.put('/',validateJWT([]),(req,res)=>{
    controllerRecipes.likeRecipe(req.query,req.user)
        .then(answer=>{
            responsePattern.success(req,res,`Le diste ${req.query.action} a la receta exitosamente`,answer,201)
        })
        .catch(e=>{
            responsePattern.error(req,res,400,e)
        })
})

module.exports = router;