const userRouter=require('express').Router();
const { connection }=require('../db/db');


userRouter.post('/create',(request, respose)=>
{
    console.log(request.body);
})