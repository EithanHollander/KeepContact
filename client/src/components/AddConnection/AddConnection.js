import './AddConnection.css';
import React from 'react';
import axios from 'axios';


function AddConnection (props) {

  function AddConnectionButton () {
    axios.post("http://localhost:3001/contacts", {name: "wow"}).then((res) => {
      console.log(res.data);
      props.updateContactListFunction(prev => !prev);
    });
  }

  return (
    <div className="AddConnection">
      <div className="add-connection-symbol">
        <span onClick={AddConnectionButton}>+</span>
      </div>
      <div className="add-connection-text">Add Connection</div>
    </div>
  );
}

export default AddConnection;
