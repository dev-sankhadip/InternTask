import React,{ useState, useEffect } from 'react'
import axios from 'axios';


const Profile=(props)=>
{
    const [user, setUser]=useState([]);
    useEffect(()=>
    {
        const { userid }=props.match.params;
        axios.get(`http://localhost:1234/user/${userid}`)
        .then((res)=>
        {
            setUser(res.data.result);
        })
        .catch((err)=>
        {
            console.log(err);
            alert("Error");
        })
    },[])


    const userView=user.length>0 ? user.map((u,i)=>
    {
        return(
            <div key={i}>
                <p>Name: { u.name }</p>
                <p>Email: { u.email }</p>
                <p>Number: { u.number }</p>
                <p>Age: { u.age }</p>
                <p>Hobbies: { u.hobby }</p>
                <p>Skills: { u.skill }</p>
                <p>Interests: { u.interest }</p>
                <img src={'http://localhost:1234/'+u.filename}  style={{ width:40, height:40 }} />
            </div>
        )
    }) : <p>No user</p>

    return(
        <React.Fragment>
            { userView }
        </React.Fragment>
    )
}

export default Profile;