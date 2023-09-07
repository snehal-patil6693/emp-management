import React, { useState, useEffect } from "react";
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell } from "@fluentui/react-components/unstable";
import { Button } from "@fluentui/react-components";
import {Delete12Filled,EditRegular} from "@fluentui/react-icons";
import EditEmp from './EditEmp';

const columns = [{
    columnKey: 'id',
    label: 'Id'
  }, {
    columnKey: 'name',
    label: 'Name'
  }, {
    columnKey: 'email',
    label: 'Email'
  }, {
    columnKey: 'date',
    label: 'Date'
  },
  {
    columnKey: 'actions',
    label: 'Actions'
  },];

function EmpList() {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async id => {
        try {
          const deleteTodo = await fetch(`http://localhost:5001/emp/${id}`, {
            method: "DELETE"
          });
    
          setTodos(todos.filter(emp => emp.id !== id));
     
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
        {todos.map(emp => (
        <TableRow key={emp.id}>
            <TableCell >{emp.id}</TableCell>
            <TableCell >{emp.name}</TableCell>
            <TableCell >
              {emp.email}
            </TableCell>
            <TableCell>{emp.date}</TableCell>
            <TableCell>
                <Button icon={<EditRegular />} appearance='subtle'></Button>
                <Button icon={<Delete12Filled />} appearance='subtle' className="btn btn-danger"
                onClick={() => deleteTodo(emp.id)}></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </div>
    )
}

export default EmpList