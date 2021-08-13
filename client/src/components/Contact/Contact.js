import './Contact.css';

import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import axios from 'axios';
import SERVER_IP_ADDRESS from "assets/addresses";

import TimeDiff from 'js-time-diff';
import { WhatsappShareButton } from 'react-share'

function Contact (props) {

  function updateComm() {
    var now = new Date();
    axios.put(SERVER_IP_ADDRESS + "/contacts/comm", {id: props.value._id, date: now.toJSON()}).then((res) => {
      console.log(res.data);
      props.updateContactListFunction(prev => !prev);
    });
  }

  function wocToDisplay() {
    var wocIcon;
    switch (props.value.woc) {
      case "empty":
        wocIcon = <PersonOutlineIcon/>;
        break;
      case "meet":
        wocIcon = <RoomOutlinedIcon/>
        break;
      case "call":
        wocIcon = <CallOutlinedIcon/>;
        break;
      case "whatsapp":
        wocIcon = <WhatsappShareButton url="היי, מה קורה?"><WhatsAppIcon/></WhatsappShareButton>;
        break;
      default:
        wocIcon = <PersonOutlineIcon/>;
    }
    return wocIcon;
  }

  function timeToDisplay() {
    var timeDiff = TimeDiff(props.value.nextComm).toString();
    if (timeDiff.includes('after')) {
      timeDiff = timeDiff.replace('after', '');
      timeDiff = 'in ' + timeDiff;
    }
    else {
      timeDiff = timeDiff.replace('ago', 'late');
    }
    return <span> {timeDiff}</span>;
  }

  return (
    <div className="Contact">
      <div className="contact-details">
        <div className="contact-details-row">
          {wocToDisplay()}
          <span> {props.value.name}</span>
        </div>
        <div className="contact-details-row">
          <ScheduleOutlinedIcon/>
          {timeToDisplay()}
        </div>
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
