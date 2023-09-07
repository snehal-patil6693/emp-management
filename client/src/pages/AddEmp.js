import React,{useState} from "react";
import {Label, Input} from '@fluentui/react-components';
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions } from "@fluentui/react-components/unstable";
import { Button } from "@fluentui/react-components";

function AddEmp(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date().toLocaleString());
    
   
    
    const onSubmitForm = async e => {
      e.preventDefault();
    
      try {
      
        const body = {name,email,date };
        const response = await fetch("http://localhost:5001/emp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        
    
        window.location = "/adminpanel";
      } catch (err) {
        console.error(err.message);
      }
    };
    
     


    return(
        <div>
        
        <Dialog>
        <DialogTrigger>
        <Button>Add Employee</Button>
        </DialogTrigger>
        <DialogSurface aria-label="label">
        <DialogTitle>Add Employee</DialogTitle>
        <DialogBody>
           <form className='d-flex mt-5' onSubmit={onSubmitForm}>
         <Label>Name</Label><br/>
         <Input type='text' className='form-control' placeholder='name' onChange={e => setName(e.target.value)}/><br/>
         <Label>Email</Label><br/>
         <Input type='email' className='form-control' placeholder='email' onChange={e => setEmail(e.target.value)}/><br/>
         <Label>Join Date</Label><br/>
         <Input type='date' className='form-control' placeholder='date' onChange={e => setDate(e.target.value)}/><br/>
         
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

export default AddEmp