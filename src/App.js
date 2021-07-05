import React, { useState }  from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthContext } from './contexts';

import Container from 'react-bootstrap/Container';

import HeaderBar from './components/HeaderBar';

import Home from './pages/Home';
import Logon from './pages/Logon';
import Mas from './pages/Mas';

function App() {
  const [authInfo, setAuthInfo] = useState({
    authenticated: false,
    user: "",
    tokenInfo: {},
    session: {},
    csrf: {}
  });
  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      <Router>
        <Container>
          <HeaderBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/mas" exact component={Mas} />
            <Route path="/logon" exact component={Logon} />
          </Switch>
        </Container>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;