import './AddConnection.css';

import ConnectionDetailsDialog from "components/ConnectionDialog/ConnectionDetailsDialog";

import { useState } from 'react';
import axios from 'axios';
import SERVER_IP_ADDRESS from "assets/addresses";


function AddConnection (props) {

  const EMPTY_CONTACT = {
    name: "",
    woc: "empty",
    lastCommunicated: new Date().toJSON(),
    recurrence: {
      amount: "1",
      jump: "week"
    }
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
    axios.post(SERVER_IP_ADDRESS + "/contacts", newContact).then((res) => {
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
