const ModelRecipe   = require('./model.recipes');
const {google}      = require('googleapis');
const path          = require('path');
const stream = require('stream')

async function saveImageToGoogleDrive(file){
    const KEYFILEPATH = path.join(__dirname + "/credentials.json")
    const SCOPES = ['https://www.googleapis.com/auth/drive']
    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES
    })
    const uploadFile = async (fileObject)=>{
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileObject.buffer);
        const {data} = await google.drive({
            version: 'v3',
            auth: auth
        }).files.create({
            media:{
                mimeType: fileObject.mimeType,
                body: bufferStream
            },
            requestBody:{
                name: fileObject.originalname,
                parents: ['13YCbttCTQHU5RVrOiqUF042cb6eyWNZJ']
            },
            fields: "id,name"
        })
        return data.id
    }
    const id = await uploadFile(file);
    return id;
}

async function add(recipe){
    const newRecipe     = new ModelRecipe(recipe);
    const recipeSaved   = newRecipe.save(); 
    return recipeSaved;
}

async function list(filter){
    const recipes = await ModelRecipe.find(filter);
    return recipes
}
async function increaseFavorite(idRecipe,number){
    let foundRecipe = await ModelRecipe.findById(idRecipe);
    foundRecipe.favorite = foundRecipe.favorite + number;
    const updatedRecipe = await foundRecipe.save();
    return updatedRecipe;
}

async function increaseRecommended(idRecipe,number){
    let foundRecipe = await ModelRecipe.findById(idRecipe);
    foundRecipe.recommended = foundRecipe.recommended + number;
    const updatedRecipe = await foundRecipe.save();
    return updatedRecipe;
}
module.exports = {
    add,list,
    increaseFavorite,
    increaseRecommended,
    saveImageToGoogleDrive
}
