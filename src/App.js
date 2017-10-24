import React, { Component } from 'react';
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import NewPage from "./components/pages/NewPage";
import Search from "./components/pages/Search";

class App extends Component {
  render() {
    return (
          <div>
            <Route path="/" exact component={Search} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/new" exact component={NewPage} />
            <Route path="/search" exact component={HomePage} />
          </div>
    );
  }
}

export default App;
