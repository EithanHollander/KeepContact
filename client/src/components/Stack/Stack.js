import './Stack.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

import Contact from "components/Contact/Contact";

function Stack (props) {

  const [contactsList, setContactsList] = useState([]);
  const [contactListTimeRendering, setContactListTimeRendering] = useState(false);

  function updateContactList() {
    axios.get("http://localhost:3001/contacts").then((res) => {
      console.log(res.data);
      setContactsList(res.data);
    });
  }

  useEffect(() => {
    updateContactList();
  }, [props]);

  useEffect(() => {
    updateContactList();
  }, [contactListTimeRendering]);
  useEffect(() => {
    const timer=setTimeout(() => {
      setContactListTimeRendering(!contactListTimeRendering);
    }, 10000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });



  return (
    <div className="Stack">
      <div className="stack-inner">
        {contactsList.map((contact, i) => {
          return <Contact key={i} name={contact.name}></Contact>
        })}
      </div>
    </div>
  );
}

export default Stack;
