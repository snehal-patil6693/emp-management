import React,{useState} from "react";
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions } from "@fluentui/react-components/unstable";
import {Label, Input} from '@fluentui/react-components';
import { Button } from "@fluentui/react-components";
import './Register.css';

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
   
    
    const onSubmitForm = async e => {
      e.preventDefault();
    
      try {
      
        const body = {name,email,role,password };
        const response = await fetch("http://localhost:5001/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        
    
        window.location = "/";
      } catch (err) {
        console.error(err.message);
      }
    };
    
     

    
  

    return(
      <div className="register">
      <Dialog>
      <DialogTrigger>
        <Button style={{background:'#06c',color:'#fff',height:'2.5rem',fontSize:'1rem'}}><b>Sign-Up</b></Button>
      </DialogTrigger>
      <DialogSurface aria-label="label">
        <DialogTitle>Sign-Up</DialogTitle>
        <DialogBody>
        <form className='d-flex mt-5' onSubmit={onSubmitForm}>
         <Label>Name</Label><br/>
         <Input type='text' className='form-control' placeholder='name' onChange={e => setName(e.target.value)} /><br/>
         <Label>Email</Label><br/>
         <Input type='email' className='form-control' placeholder='email' onChange={e => setEmail(e.target.value)}/><br/>
         <Label>Role</Label><br/>
         <Input type='text' className='form-control' placeholder='role' onChange={e => setRole(e.target.value)}/><br/>
         <Label>Password</Label><br/>
         <Input type='password' className='form-control' placeholder='password' onChange={e => setPassword(e.target.value)}/><br/><br/>
         <button className='btn btn-success'>Submit</button>
      </form>
        </DialogBody>
        <DialogActions>
          <DialogTrigger>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
          
        </DialogActions>
      </DialogSurface>
    </Dialog>
      </div>
    )
}

export default Register