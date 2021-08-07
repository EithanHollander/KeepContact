import './Contact.css';

import WOC from "assets/WaysOfCommunications";

function Contact (props) {
  const keyWOC = Object.keys(WOC).find(key => WOC[key].id.toString()===props.value.wayOfComm);
  const stringWOC = Object.keys(WOC).filter(key => key===keyWOC).map(key => WOC[key].toString);

  return <div className="Contact">
  <p> {props.value.name} </p>
  <p> {stringWOC} </p>
  </div>
}

export default Contact;
