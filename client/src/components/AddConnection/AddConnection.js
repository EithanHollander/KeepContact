import './AddConnection.css';

import ConnectionDetailsDialog from "components/ConnectionDialog/ConnectionDetailsDialog";

import WOC from "assets/WaysOfCommunications"
import { useState } from 'react';
import axios from 'axios';

function AddConnection (props) {

  const EMPTY_CONTACT = {
    name: "",
    woc: WOC.EMPTY.id,
    lastCommunicated: new Date().toJSON()
  }

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState(EMPTY_CONTACT);

  function openDialog () {
    setNewContact(EMPTY_CONTACT);
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
