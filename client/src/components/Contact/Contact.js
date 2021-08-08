import './Contact.css';

import WOC from "assets/WaysOfCommunications";
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import axios from 'axios';

import TimeDiff from 'js-time-diff';

function Contact (props) {
  const keyWOC = Object.keys(WOC).find(key => WOC[key].id.toString()===props.value.wayOfComm);
  const stringWOC = Object.keys(WOC).filter(key => key===keyWOC).map(key => WOC[key].toString);

  function updateComm() {
    var now = new Date();
    axios.put("http://localhost:3001/comm", {id: props.value._id, date: now.toJSON()}).then((res) => {
      console.log(res.data);
      props.updateContactListFunction(prev => !prev);
    });
  }

  return (
    <div className="Contact">
      <div className="contact-details">
        <p> {props.value.name} </p>
        <p> {stringWOC} </p>
        <p> {TimeDiff(props.value.lastCommunicated)}</p>
      </div>
      <div className="contact-actions">
        <IconButton style={{color: "var(--white)"}} onClick={updateComm}>
          <DoneIcon fontSize="small"/>
        </IconButton>
      </div>
    </div>
  );
}

export default Contact;
