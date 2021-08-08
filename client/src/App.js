import './App.css';

import React, {useState} from "react";

import Header from "components/Header/Header";
import Stack from "components/Stack/Stack";
import AddConnection from "components/AddConnection/AddConnection";

function App() {

  const [updateContactListToggle, setUpdateContactListToggle] = useState(false);

  return (
    <div className="App">
      <Header></Header>
      <div className="app-inner">
        <AddConnection updateContactListFunction={setUpdateContactListToggle}></AddConnection>
        <Stack shouldUpdateContactList={updateContactListToggle} updateContactListFunction={setUpdateContactListToggle}></Stack>
      </div>
    </div>
  );
}

export default App;
