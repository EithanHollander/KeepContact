import './AddConnection.css';

import ConnectionDialog from "components/ConnectionDialog/ConnectionDialog";
import WOC from "assets/WaysOfCommunications"
import {useState} from 'react';
import axios from 'axios';

function AddConnection (props) {

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({name: "", wayOfComm: WOC.EMPTY.id.toString()});

  function openDialog () {
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
      <ConnectionDialog
        isOpen={isDialogOpen}
        howToCloseDialog={closeDialog}
        howToChangeContact={setNewContact}
        howToAddConnection={postAddConnection}></ConnectionDialog>
    </div>
  );
}

export default AddConnection;
