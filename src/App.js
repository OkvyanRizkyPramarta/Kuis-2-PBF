import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/protectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Create from "./components/Create";
import Detail from "./components/Detail";
import Edit from "./components/Edit";
import './App.css';

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/create"
        component={Create}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/detail/:id"
        component={Detail}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/edit/:id"
        component={Edit}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
    </Switch>
  );
}
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}
export default connect(mapStateToProps)(App);








/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/