import React,{useEffect, useState} from 'react';
import {Label, Input} from '@fluentui/react-components';
import './Login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const[todos, setTodos] = useState([]);
 
  const getTodos = async () => { 
    try{
    const response = await fetch("http://localhost:5001/todos");
    const jsonData = await response.json();

    setTodos(jsonData);
    }
    catch(err){
        console.error(err.message);
    }
    
 };

 const getTodos1 = async () => { 
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
    getTodos1();
 },[]);

 console.log(todos);

 const onSubmitForm = async e => {
  e.preventDefault();

  try {
      const body = {email,password };
      todos.map(admin =>{
        if(admin.email===email&&admin.password===password){
          localStorage.setItem("name",admin.name)
          localStorage.setItem("id",admin.id)
          window.location = "/adminpanel";
          alert('You are logged in as Admin!');
          
        }
      })
         
      
    } catch (err) {
      console.error(err.message);
    }
    try {
      const body = {email,password };
      todos.map(emp =>{
        if(emp.email===email&&password==='123'){
          window.location = "/userpanel";
          localStorage.setItem("name",emp.name)
          localStorage.setItem("id",emp.id)
          alert('You are logged in as User!');
          
        }
      })
         
      
    } catch (err) {
      console.error(err.message);
    }
  
  };

    
     return (
    <div className='login'>
        
        <form className='d-flex mt-5' onSubmit={onSubmitForm}>
          
         <Label style={{fontSize:'1rem'}}><b>Email</b></Label><br/>
         <Input type='email' className='form-control' placeholder='email' onChange={e => setEmail(e.target.value)} style={{width:'15rem',height:'2.5rem'}}/><br/><br/>
         <Label style={{fontSize:'1rem'}}><b>Password</b></Label><br/> 
         <Input type='password' className='form-control' placeholder='password' onChange={e => setPassword(e.target.value)} style={{width:'15rem',height:'2.5rem'}}/><br/>
         <br/>
         <center><button className='btn btn-success' style={{fontSize:'1rem', width: '15rem',height:'2.5rem',background: '#06c',color:'#fff',border:'1px solid #fff',borderRadius:'4px'}} ><b>Login</b></button></center>
        
        </form>
  
    </div>
    );
}

export default Login; 