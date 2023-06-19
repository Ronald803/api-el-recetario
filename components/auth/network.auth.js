const express           = require('express');
const router            = express.Router();
const controllerAuth    = require('./controller.auth');
const responsePattern   = require('../../network/responsePattern');

router.post('/',(req,res)=>{
    const {email,password} = req.body;
    controllerAuth.login(email,password)
        .then(message=>{
            responsePattern.success(req,res,'Loggeado correctamente',message,200);
        })
        .catch(e=>{
            responsePattern.error(req,res,400,e)
        })
})

module.exports = router;