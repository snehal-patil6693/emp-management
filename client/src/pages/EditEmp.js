import React, { Fragment, useState } from "react";
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions } from "@fluentui/react-components/unstable";
import { Button } from "@fluentui/react-components";
import {Label, Input} from '@fluentui/react-components';

const EditEmp = ({ emp }) => {
  const [name, setName] = useState(emp.name);
  

  //edit description function

  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { name };
      const response = await fetch(
        `http://localhost:5000/emp/${emp.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/adminpanel";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
   
   <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${emp.id}`}
      >
        Edit
      </button>

      {/* 
        id = id10
      */}
      <div
        class="modal"
        id={`id${emp.id}`}
        onClick={() => setName(emp.name)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Todo</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setName(emp.name)}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-primary"
               
                onClick={e => updateDescription(e)}
              >
                Update
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setName(emp.name)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
  </Fragment>
  );
};

export default EditEmp;