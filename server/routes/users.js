const userRouter=require('express').Router();
const { connection }=require('../db/db');
const fileUpload=require('express-fileupload');

userRouter.use(fileUpload());


userRouter.post('/create',(request, respose)=>
{
    console.log(request.body);
    console.log(request.files);
})

module.exports=userRouter;