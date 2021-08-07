import './AddConnection.css';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';


function AddConnection () {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    console.log("WTF");
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="AddConnection">
      <div className="add-connection-symbol"><span>+</span></div>
      <div className="add-connection-text">{!data ? "Loading..." : data}</div>
    </div>
  );
}

export default AddConnection;
