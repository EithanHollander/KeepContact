import {useState, useRef, useEffect} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import WOC from "assets/WaysOfCommunications";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

function ConnectionDialog (props) {

  const [contactName, setContactName] = useState("");
  const [showErrorForName, setErrorForName] = useState(false);
  const [contactWOC, setContactWOC] = useState(WOC.EMPTY.id.toString());
  const isFirstRun = useRef(true);

  // NAME HANDLING
  function changeContactName(val) {
    setContactName(val);
    props.howToChangeContact(prev => ({
      ...prev,
      name: val,
    }));
  }
  function updateContactName(event) {
    changeContactName(event.target.value);
  }
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current=false;
      return;
    }
    setErrorForName(!contactName);
  }, [contactName]);

  // WOC HANDLING
  function changeContactWOC(val) {
    console.log("changeContactWOC", val);
    setContactWOC(val);
    props.howToChangeContact(prev => ({
      ...prev,
      wayOfComm: val,
    }));
  }
  function updateContactWOC(event) {
    console.log("updateContactWOC", event.target.value);
    changeContactWOC(event.target.value);
  }

  // EXIT & FINISH DIALOG
  function exitDialogRoutine() {
    changeContactName("");
    setErrorForName(false);
    changeContactWOC(WOC.EMPTY.id.toString());
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
        <FormControl>
          <Select native onChange={updateContactWOC}>
            {Object.keys(WOC).map((key, i) => (<option value={WOC[key].id}>{WOC[key].toString}</option>))}
          </Select>
          <FormHelperText>favorite way to communicate</FormHelperText>
        </FormControl>

      </DialogContent>
      <DialogActions>
        <Button onClick={exitDialogRoutine} color="secondary">
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
