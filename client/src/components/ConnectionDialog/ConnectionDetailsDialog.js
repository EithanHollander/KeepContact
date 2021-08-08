import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import WOC from "assets/WaysOfCommunications";

function ConnectionDetailsDialog(props) {

  function handleInputChange (event) {
    props.howToUpdateContact(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function submitConnection (event) {
    event.preventDefault();
    props.howToPostForm();
    props.howToCloseDialog();
  }

  return (
    <Dialog open={props.isOpen} onClose={props.howToCloseDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Connection</DialogTitle>
      <form action="/" method="POST" onSubmit={submitConnection}>
        <DialogContent>
          <DialogContentText>
            Let's add a contact to our list!
          </DialogContentText>

          <FormControl margin="dense" style={{display: "block"}}>
            <TextField required autoFocus label="Contact's Name" name="name" onChange={handleInputChange}/>
          </FormControl>

          <FormControl margin="dense">
            <Select native aria-describedby="select-woc-helper-text" name="woc" onChange={handleInputChange}>
              {Object.keys(WOC).map((key, i) => (<option key={i} value={WOC[key].id}>{WOC[key].toString}</option>))}
            </Select>
            <FormHelperText id="select-woc-helper-text">Favorite way to communicate</FormHelperText>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => {props.howToCloseDialog()}} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add Connection
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ConnectionDetailsDialog;
