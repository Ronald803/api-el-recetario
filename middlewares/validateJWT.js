const {response,request}= require('express');
const jwt               = require('jsonwebtoken');
const ModelUser         = require('../components/users/model.users');
const responsePattern   = require('../network/responsePattern');

const validateJWT = (rolArray)=>{
    return async (req=request,res=response,next)=>{
        const token = req.header('xtoken')
        console.log("desde validatejwt");
        console.log({token});
        try {
            if(!token && rolArray[0]=='everybody'){return next()}
            if(!token){
                return responsePattern.error(req,res,400,'There is no token');
            };
            const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
            const user = await ModelUser.findById(uid);
            if(rolArray){
                if(rolArray[0]=='everybody'){
                    req.user = user;
                    return next()
                }
            }
            let permission = false;
            if(rolArray.length>0){
                rolArray.map(rol=>{
                    if(rol===user.rol){
                        permission=true;
                    }
                })
            } else {permission = true}
            if(!permission){
                return responsePattern.error(req,res,400,'You do not have permission for this operation')
            }
            req.user = user;
            next();
        } catch (error) {
            responsePattern.error(req,res,401,'Something went wrong')
        }    
    }
}

module.exports = {validateJWT}