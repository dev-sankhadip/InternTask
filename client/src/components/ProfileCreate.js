import React,{ useState } from 'react'
import { Input, Typography, Button, DatePicker } from 'antd'
import './auth.css'


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

    }

    const updateFile=(e, setter)=>
    {

    }

    const submitHandler=()=>
    {

    }

    return(
        <React.Fragment>
            <form className="auth-form">
                <Typography.Title level="3" underline={true} type="secondary">Create</Typography.Title>
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
                    <input type="file" className="custom-file-input" id="customFile" onChange={(e)=>{ updateFile(e,setFile) }} required />
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