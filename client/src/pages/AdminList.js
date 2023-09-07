import React, { useState, useEffect } from "react";
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell } from "@fluentui/react-components/unstable";
import { Button } from "@fluentui/react-components";
import {Delete12Filled,EditRegular} from "@fluentui/react-icons";

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
    columnKey: 'role',
    label: 'Role'
  },
  {
    columnKey: 'password',
    label: 'Password'
  },
  {
    columnKey: 'actions',
    label: 'Actions'
  },];

function EmpList() {

    const [todos, setTodos] = useState([]);

    
      const [description, setDescription] = useState("");
    
      //edit description function
    
      const editTodo= async e => {
        e.preventDefault();
        try {
          const body = { description };
          const response = await fetch(
            `http://localhost:5000/todos/${todos.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            }
          );
    
          window.location = "/";
        } catch (err) {
          console.error(err.message);
        }
      };
    

    const deleteTodo = async id => {
        try {
          const deleteTodo = await fetch(`http://localhost:5001/todos/${id}`, {
            method: "DELETE"
          });
    
          setTodos(todos.filter(todos => todos.id !== id));
     
        } catch (err) {
          console.error(err.message);
        }
      };

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
        {todos.map(todos => (
        <TableRow key={todos.id}>
            <TableCell >{todos.id}</TableCell>
            <TableCell >{todos.name}</TableCell>
            <TableCell >
              {todos.email}
            </TableCell>
            <TableCell>{todos.role}</TableCell>
            <TableCell>{todos.password}</TableCell>
            <TableCell>
                <Button icon={<EditRegular />} appearance='subtle' class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todos.id}`}></Button>
                <Button icon={<Delete12Filled />} appearance='subtle' className="btn btn-danger"
                onClick={() => deleteTodo(todos.id)}></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </div>
    )
}

export default EmpList