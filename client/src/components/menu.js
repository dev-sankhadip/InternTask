import React from 'react'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom';


const Menu=(props)=>
{
    return(
        <React.Fragment>
            <Button type="danger" onClick={()=>{ props.history.push('/') }}>Create</Button>
            <Button type="primary" onClick={()=>{ props.history.push('/list') }}>List User</Button>
        </React.Fragment>
    )
}

export default withRouter(Menu);