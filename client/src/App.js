import './App.css';

import Header from "components/Header/Header";
import Stack from "components/Stack/Stack";
import AddConnection from "components/AddConnection/AddConnection";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="app-inner">
        <AddConnection></AddConnection>
        <Stack></Stack>
      </div>
    </div>
  );
}

export default App;
