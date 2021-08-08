import './AddConnection.css';

import ConnectionDetailsDialog from "components/ConnectionDialog/ConnectionDetailsDialog";

import WOC from "assets/WaysOfCommunications"
import { useState } from 'react';
import axios from 'axios';

function AddConnection (props) {

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    woc: WOC.EMPTY.id,
    lastCommunicated: new Date().toJSON()
  });

  function openDialog () {
    setNewContact(prev => ({
      ...prev,
      lastCommunicated: new Date().toJSON()
    }))
    setDialogOpen(true);
  };
  function closeDialog () {
    setDialogOpen(false);
  };

  function postAddConnection () {
    axios.post("http://localhost:3001/contacts", newContact).then((res) => {
      console.log(res.data);
      props.updateContactListFunction(prev => !prev);
    });
  }

  return (
    <div className="AddConnection">
      <div className="add-connection-symbol">
        <span onClick={openDialog}>+</span>
      </div>
      <div className="add-connection-text">Add Connection</div>
      <ConnectionDetailsDialog
        isOpen={isDialogOpen}
        howToCloseDialog={closeDialog}
        howToUpdateContact={setNewContact}
        howToPostForm={postAddConnection}/>
    </div>
  );
}

export default AddConnection;
