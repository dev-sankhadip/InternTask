import React,{ useState } from 'react'
import { Input, Typography, Button } from 'antd'
import './auth.css'
import axios from 'axios';

const ProfileCreate=()=>
{
    const [name, setName]=useState('');
    const [interest, setInterest]=useState('');
    const [email, setEmail]=useState('');
    const [age, setAge]=useState('');
    const [number, setNumber]=useState('');
    const [skill, setSkill]=useState('');
    const [hobby, setHobby]=useState('');
    const [file, setFile]=useState('');

    const updateInfo=(e, setter)=>
    {
        console.log(e.target.value);
        setter(e.target.value);
    }

    const updateFile=(e)=>
    {
        setFile(e.target.files[0]);
    }

    const submitHandler=async ()=>
    {
        const formData=new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('interest', interest);
        formData.append('email', email);
        formData.append('age', age);
        formData.append('number', number);
        formData.append('skill', skill);
        formData.append('hobby', hobby);
        try{
            const response=await axios.post('http://localhost:1234/user/create', formData, {
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            })
            console.log(response);
        }
        catch(err)
        {
            console.log(err);
            alert("Error");
        }
    }

    return(
        <React.Fragment>
            <form className="auth-form">
                <Typography.Title level={1} underline={true} type="secondary">Create</Typography.Title>
                <div style={{ marginTop:10 }}>
                    <Input placeholder="Your Name" required onChange={(e)=>{ updateInfo(e, setName) }} name="username" />
                </div>
                <div style={{ marginTop:10 }}>
                    <Input placeholder="Your Interests " required onChange={(e)=>{ updateInfo(e, setInterest) }} name="interest" />
                </div>
                <div style={{ marginTop:10 }}>
                    <Input placeholder="Your Email" required onChange={(e)=>{ updateInfo(e, setEmail) }} name="email" />
                </div>
                <div style={{ marginTop:10 }}>
                    <Input placeholder="Your age" required onChange={(e)=>{ updateInfo(e, setAge) }} name="age" />
                </div>
                <div style={{ marginTop:10 }}>
                    <Input type="number" placeholder="Your number" required onChange={(e)=>{ updateInfo(e, setNumber) }} name="number" />
                </div>
                <div className="custom-file" style={{ marginTop:10 }}>
                    <input type="file" className="custom-file-input" id="customFile" onChange={(e)=>{ updateFile(e) }} required />
                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                </div>
                <div style={{ marginTop:10 }}>
                    <Input placeholder="Your hobby" required onChange={(e)=>{ updateInfo(e, setHobby) }} name="hobby" />
                </div>
                <div style={{ marginTop:10 }}>
                    <Input placeholder="Your skills" required onChange={(e)=>{ updateInfo(e, setSkill) }} name="skill" />
                </div>
                <div style={{ marginTop:10 }}>
                    <Button type="primary" onClick={ submitHandler }>Create</Button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default ProfileCreate;