import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Nav from "./components/Nav";
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <>
      <CssBaseline/>
      <Router>
        <Route path="/admin"><Nav/></Route>
      </Router>
    </>
  );
}

export default App;
