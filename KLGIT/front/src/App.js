import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddMem from "./components/addmem";
import listmem from "./components/list"


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-light bg-light">
            <a href="/todos" className="navbar-brand">
              MEMY.pl
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                 Przeglądaj memy
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Dodaj mema
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>

              <Route exact path="/add" component={AddMem} />
              <Route extac path="/" component={listmem} />

            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
