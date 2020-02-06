import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ProfileList=()=>
{
    const [users, setUsers]=useState([]);
    useEffect(()=>
    {
        axios.get('http://localhost:1234/user')
        .then((res)=>
        {
            console.log(res);
            setUsers(res.data.result);
        })
        .catch((err)=>
        {
            console.log(err);
            alert("Error");
        })
    },[])


    const usersView=users.length>0 ? users.map((user)=>
    {
        return(
            <>
            <div>
                <Link to={'/'+user.userid}>Name: { user.name }</Link>
                {/* <p>Email: { user.email }</p>
                <p>Number: { user.number }</p>
                <p>Age: { user.age }</p>
                <p>Hobbies: { user.hobby }</p>
                <p>Skills: { user.skill }</p>
                <p>Interests: { user.interest }</p>
                <img src={'http://localhost:1234/'+user.filename}  style={{ width:40, height:40 }} /> */}
            </div>
            <hr/>
            </>
        )
    }) : <p>No user</p>

    return(
        <React.Fragment>
            { usersView }
        </React.Fragment>
    )
}

export default ProfileList;