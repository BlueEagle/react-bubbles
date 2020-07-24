import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute"
import Login from "./components/Login";
import BubblePage from './components/BubblePage'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        
        <PrivateRoute path="/bubble-page" component={BubblePage}/>
      </div>
    </Router>
  );
}

export default App;
