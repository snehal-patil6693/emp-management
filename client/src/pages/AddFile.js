import React,{useState,useEffect, useId} from "react";
import {Label, Input} from '@fluentui/react-components';
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions,Select,Option, Dropdown } from "@fluentui/react-components/unstable";
import { Button } from "@fluentui/react-components";
import Axios from "axios";
import FormData from "form-data";

function AddFile(){
   
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date().toLocaleString());
    const [file, setFile] = useState("")
    const [todos, setTodos] = useState([]);
    const selectId = useId();

    
    const onSubmitForm = async e => {
      e.preventDefault();
    
      try {
       
        const body = {file,date,name };
        const response = await fetch("http://localhost:5001/file", {
          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify(body)
        });
        
    
        window.location = "/adminpanel";
      } catch (err) {
        console.error(err.message);
      }
    };
    

    const getTodos = async () => { 
      
        try{
        const response = await fetch("http://localhost:5001/emp");
        const jsonData = await response.json();
    
        setTodos(jsonData);
        }
        catch(err){
            console.error(err.message);
        }
        
     };
    
    
     useEffect(() => {
        getTodos();
     },[]);
    
     console.log(todos)


    return(
        <div>
      
        <Dialog>
        <DialogTrigger>
        <Button>Add File</Button>
        </DialogTrigger>
        <DialogSurface aria-label="label">
         <DialogTitle>Add File</DialogTitle>
        <DialogBody>
           <form className='d-flex mt-5' onSubmit={onSubmitForm}>
         <Label>File Name</Label><br/>
         <Input type='file' className='form-control' name='file'  onChange={e => setFile(e.target.value)}/><br/>
         <Label>Created On</Label><br/>
         <Input type='date' className='form-control'  onChange={e => setDate(e.target.value)}/><br/>
         <Label>Assigned To</Label><br/>
        
         <Select id={`${selectId}-outline`} appearance="outline" onChange={e => setName(e.target.value)} >
         {todos.map(emp => (
        <option key={emp.id}>{emp.name}</option>
        ))}
       </Select> <br/>
         
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

export default AddFile          

