import React from "react";
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import LoginPages from "./Pages/LoginPages/LoginPages";
import RegisterPages from "./Pages/RegisterPages/RegisterPages";
import StartPages from "./Pages/StartPages/StartPages";


export default function App() {
  return (
    <Router>
        <Switch>
          {/* <Route path="/" component={StartPages} exact /> */}
          <Route path="/" component={LoginPages} exact />
          <Route path="/register" component={RegisterPages} exact />
        </Switch>
    </Router>
  );
}

