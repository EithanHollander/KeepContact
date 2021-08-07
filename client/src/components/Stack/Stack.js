import './Stack.css';
import React from 'react';

import Contact from "components/Contact/Contact";

function Stack () {
    return (
      <div className="Stack">
        <div className="stack-inner">
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
          <Contact/>
        </div>
      </div>
    );
}

export default Stack;
