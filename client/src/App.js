import './App.css';

import React, {useState} from "react";

import Header from "components/Header/Header";
import Stack from "components/Stack/Stack";
import AddConnection from "components/AddConnection/AddConnection";

import { BrowserView, MobileView } from "react-device-detect";

function App() {

  const [updateContactListToggle, setUpdateContactListToggle] = useState(false);

  return (
    <div>
      <BrowserView>
        <div className="BrowserApp">
          <Header></Header>
          <div className="browser-app-inner">
            <AddConnection updateContactListFunction={setUpdateContactListToggle}></AddConnection>
            <Stack shouldUpdateContactList={updateContactListToggle} updateContactListFunction={setUpdateContactListToggle}></Stack>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className="MobileApp" style={{width: window.innerWidth, height: window.innerHeight}}>
          <Stack shouldUpdateContactList={updateContactListToggle} updateContactListFunction={setUpdateContactListToggle}></Stack>
        </div>
      </MobileView>
    </div>
  );
}

export default App;
