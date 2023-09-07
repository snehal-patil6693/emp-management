import React, {useState, useEffect} from 'react';
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell } from "@fluentui/react-components/unstable";
import FileList from './FileList';
import './UserPanel.css';

const name = localStorage.getItem("name");
const id = localStorage.getItem("id");


const columns = [{
    columnKey: 'id',
    label: 'Id'
  }, {
    columnKey: 'file',
    label: 'File Name'
  },
  {columnKey: 'name',
  label: 'Assigned To'
}, {
    columnKey: 'date',
    label: 'Created On'
  }, ]

function UserPanel(){

    const [todos, setTodos] = useState([]);
    
    todos.map(file =>{
      if(file.name===name){
       
       const file1=file.file;
       const name1=file.name;
       const date1=file.date;

      }
    }) 

    const getTodos = async () => { 
        try{
        const response = await fetch("http://localhost:5001/file");
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
    


    return(
    <div className='user'>
      <div style={{color:'#696969'}}><h1>Welcome {name}! </h1></div>
      <br/>
       <Table>
      <TableHeader>
        <TableRow>
          {columns.map(column => <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>)}
        </TableRow>
      </TableHeader>
      <TableBody>
      {todos.map(file => 
          <TableRow key={file.id}>
          <TableCell >{file.id}</TableCell>
          <TableCell >{file.file}</TableCell>
          <TableCell >{file.name}</TableCell>
          <TableCell >
            {file.date}
          </TableCell>
          </TableRow>
   
    )}
      </TableBody>
    </Table>
    </div>
    )
}

export default UserPanel