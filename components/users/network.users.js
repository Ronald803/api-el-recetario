const express           = require('express');
const router            = express.Router();
const controllerUser    = require('./controller.users');
const responsePattern   = require('../../network/responsePattern');
const {validateJWT}     = require('../../middlewares/validateJWT');

router.get('/favorites',validateJWT([]),(req,res)=>{
    const idUser = req.user._id;
    controllerUser.getFavoritesUser(idUser)
        .then(userFavorites=>{
            responsePattern.success(req,res,`Estos son los favoritos de ${req.user.name}`,userFavorites,201)
        })
        .catch(e=>{
            responsePattern.error(req,res,400,e)
        })
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
