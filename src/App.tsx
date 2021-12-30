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
import DashboardPages from "./Pages/DashboardPages/DashboardPages";
import AwaitingPages from "./Pages/AwaitingPages/AwaitingPages";
import CreateNewGamePage from "./Pages/CreateNewGamePage/CreateNewGamePage";
import PlaygroundPage from "./Pages/PlaygroundPage/PlaygroundPage";
import RunningGamesPage from "./Pages/RunningGamesPage/RunningGamesPage";


export default function App() {
  return (
    <Router>
        <Switch>
          {/* <Route path="/" component={StartPages} exact      /> */}
          <Route path="/" component={LoginPages} exact />
          <Route path="/register" component={RegisterPages} exact />
          <Route path="/dashboard" component={DashboardPages} exact />
          <Route path="/waiting-for-team-mate" component={AwaitingPages} exact />
          <Route path="/create-new-game" component={CreateNewGamePage} exact />
          <Route path="/play-ground" component={PlaygroundPage} exact />
          <Route path="/running-games" component={RunningGamesPage} exact />
        </Switch>
    </Router>
  );
}

