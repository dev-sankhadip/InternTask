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


    const usersView=users.length>0 ? users.map((user,i)=>
    {
        return(
            <div key={i}>
                <Link to={'/'+user.userid}>Name: { user.name }</Link>
            <hr/>
            </div>
        )
    }) : <p>No user</p>

    return(
        <React.Fragment>
            { usersView }
        </React.Fragment>
    )
}

export default ProfileList;