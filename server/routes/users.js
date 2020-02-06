const userRouter=require('express').Router();
const { connection }=require('../db/db');
const fileUpload=require('express-fileupload');
const shortid=require('shortid');


userRouter.use(fileUpload());


userRouter.post('/create',(request, respose)=>
{
    console.log(request.body);
    console.log(request.files);
    if(request.files==null)
    {
        return respose.status(500).send({ msg:"No file added" });
    }
    const userid=shortid.generate();
    const { file }=request.files;
    const { name, email, interest, age, number,skill, hobby }=request.body;
    const sqlCreateUserQuery="insert into user(userid, name, email, age, number,filename, hobby, skill, interest) values(?,?,?,?,?,?,?,?,?)";
    const path="/home/sankha/Desktop/task/server/public/";
    file.mv(`${path}${file.name}`,(err)=>
    {
        if(err)
        {
            return respose.status(500).send({ msg:"File upload error" });
        }
        connection.query(sqlCreateUserQuery,[userid, name, email,age, number, file.name, hobby, skill, interest],(err, result)=>
        {
            if(err)
            {
                console.log(err);
                return respose.status(500).send({ msg:"Internal error" });
            }
            return respose.status(200).send({ msg:"User created" });
        })
    })
})

userRouter.get('/',(request, respose)=>
{
    const sql="select * from user";
    connection.query(sql,(err, result)=>
    {
        if(err)
        {
            return respose.status(500).send({ msg:"Internal error" });
        }
        respose.status(200).send({ result })
    })
})

module.exports=userRouter;