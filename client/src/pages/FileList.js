import React, { useState, useEffect } from "react";
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell } from "@fluentui/react-components/unstable";
import { Button } from "@fluentui/react-components";
import {Delete12Filled,EditRegular} from "@fluentui/react-icons";

const columns = [{
    columnKey: 'id',
    label: 'Id'
  }, {
    columnKey: 'file',
    label: 'File Name'
  }, {
    columnKey: 'date',
    label: 'Created On'
  }, {
    columnKey: 'name',
    label: 'Assigned To'
  },
  {
    columnKey: 'actions',
    label: 'Actions'
  },];

function FileList() {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async id => {
        try {
          const deleteTodo = await fetch(`http://localhost:5001/file/${id}`, {
            method: "DELETE"
          });
    
          setTodos(todos.filter(file =>file.id !== id));
        } catch (err) {
          console.error(err.message);
        }
      };

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
    
     
    
     useEffect(() => {
        getTodos();
     },[]);
    
     console.log(todos);
    

    return(
        <div>
           <Table>
      <TableHeader>
        <TableRow>
          {columns.map(column => <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map(file => (
        <TableRow key={file.id}>
            <TableCell >{file.id}</TableCell>
            <TableCell >{file.file}</TableCell>
            <TableCell >
              {file.date}
            </TableCell>
            <TableCell>{file.name}</TableCell>
            <TableCell>
                <Button icon={<EditRegular />} appearance='subtle' ></Button>
                <Button icon={<Delete12Filled />} appearance='subtle' className="btn btn-danger"
                onClick={() => deleteTodo(file.id)}></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </div>
    )
}

export default FileList