import {useState, useRef, useEffect} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function ConnectionDialog (props) {

  const [contactName, setContactName] = useState("");
  const [showErrorForName, setErrorForName] = useState(false);
  const isFirstRun = useRef(true);

  // NAME HANDLING
  function updateContactName(event) {
    setContactName(event.target.value);
    props.howToChangeContact(prev =>
      ({
        ...prev,
        name: event.target.value
      }));
  }
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current=false;
      return;
    }
    setErrorForName(!contactName);
  }, [contactName]);

  // EXIT & FINISH DIALOG
  function exitDialogRoutine() {
    setContactName("");
    setErrorForName(false);
    isFirstRun.current=true; //helps for setErrorForName for the next render
    props.howToCloseDialog();
  }
  function finishDialogAdd() {
    console.log(contactName);
    if (!contactName) {
      setErrorForName(true);
      return;
    }
    props.howToAddConnection();
    exitDialogRoutine();
  }

  return (
    <Dialog open={props.isOpen} onClose={exitDialogRoutine} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Connection</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let's add another contact to our list!
        </DialogContentText>
        <TextField
          error={showErrorForName}
          required
          autoFocus
          margin="dense"
          id="name"
          label="Contact's Name"
          type="text"
          fullWidth
          onChange={updateContactName}
        />
      </DialogContent>
      <DialogActions>
        <Button style={{marginRight:"135px"}} onClick={exitDialogRoutine} color="secondary">
          Cancel
        </Button>
        <Button onClick={finishDialogAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConnectionDialog;
