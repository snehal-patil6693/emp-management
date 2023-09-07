import React, { useState } from "react";
import AddEmp from './AddEmp';
import AddFile from './AddFile';
import FileList from './FileList';
import EmpList from './EmpList';
import AdminList from './AdminList';
import { Avatar} from '@fluentui/react-components';
import './AdminPanel.css';

const name=localStorage.getItem('name');

function AdminPanel(){
    const [isOpen, setOpen] = useState(false);
    return(
    <div className='admin'>
       
        <div className='title' style={{color:'#696969'}}>
            <h1>Welcome {name}!</h1> 
            <Avatar name={name}/>
        </div>
        <br/>

        <div className="adminlist">
            <h3>Admin List :</h3>
            <AdminList/>
        </div>
        <br/>
        <div className="main-page">
        <div className="emp">
       
        &nbsp;&nbsp;<AddEmp/>
        <br/>
        <EmpList/>
        </div>
        <div className="file">
       
        &nbsp;&nbsp;<AddFile />
        <br/>
        <FileList/>
        </div>
        <br/>
        </div>
        <br/><br/>
       
    </div>
    )
}

export default AdminPanel