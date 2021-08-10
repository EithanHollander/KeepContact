import './ConnectionDetailsDialog.css';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';

import { useState, useEffect } from 'react';

function ConnectionDetailsDialog({isOpen, howToCloseDialog, howToUpdateContact, howToPostForm}) {

  const [recurrence, setRecurrence] = useState({
    amount: 1,
    jump: "week"
  });

  function handleInputChange (event) {
    howToUpdateContact(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  function handleRecurrenceInputChange(event) {
    setRecurrence(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }
  useEffect(() => {
    howToUpdateContact(prev => ({
      ...prev,
      recurrence: recurrence
    }));
  }, [recurrence, howToUpdateContact]);
  useEffect(() => {
    setRecurrence({
      amount: 1,
      jump: "week"
    });
    howToUpdateContact(prev => ({
      ...prev,
      lastCommunicated: new Date().toJSON()
    }))
  }, [isOpen, howToUpdateContact])

  function submitConnection (event) {
    event.preventDefault();
    howToPostForm();
    howToCloseDialog();
  }

  return (
    <Dialog open={isOpen} onClose={howToCloseDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add Connection</DialogTitle>
      <form action="/" method="POST" onSubmit={submitConnection}>
        <DialogContent>
          <DialogContentText>
            Let's add a contact to our list!
          </DialogContentText>

          <FormControl margin="dense" className="form-control-name">
            <TextField required autoFocus label="Contact's Name" name="name" onChange={handleInputChange}/>
          </FormControl>

          <Divider style={{marginTop: "20px"}}/>

          <FormControl margin="dense" className="form-control-woc">
            <FormHelperText id="select-woc-helper-text">Favorite way to communicate:</FormHelperText>
            <Select native aria-describedby="select-woc-helper-text" name="woc" onChange={handleInputChange}>
              <option value="empty"></option>
              <option value="whatsapp">Whatsapp</option>
              <option value="call">Phone Call</option>
              <option value="meet">Meet Up</option>
            </Select>
          </FormControl>

          <FormControl margin="normal" className="form-control-recurrence">
            <FormHelperText style={{marginBottom: "-17px"}}>Choose Recurrence:</FormHelperText>
            <FormLabel style={{marginRight: "15px"}}>Every:</FormLabel>
            <Input defaultValue={1} margin="dense" onChange={handleRecurrenceInputChange} style={{width: "55px", marginRight: "10px"}}
              inputProps={{
                step: 1,
                min: 1,
                max: 10000,
                type: 'number',
                name: "amount"
              }}
              value={recurrence.amount}
              error={recurrence.amount > 10000 || recurrence.amount < 1}
            />
            <Select native name="jump" value={recurrence.jump} onChange={handleRecurrenceInputChange}>
              <option value={"day"}>{recurrence.amount > 1 ? "days" : "day"}</option>
              <option value={"week"}>{recurrence.amount > 1 ? "weeks" : "week"}</option>
              <option value={"month"}>{recurrence.amount > 1 ? "months" : "month"}</option>
              <option value={"year"}>{recurrence.amount > 1 ? "years" : "year"}</option>
            </Select>
          </FormControl>

          <Divider style={{marginTop: "20px"}}/>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => {howToCloseDialog()}} color="secondary">
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
