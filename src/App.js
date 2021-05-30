import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import List from "./Components/List/List";
import Item from "./Components/Item/Item";
import Agenda from "./Components/Agenda/Agenda";
import { connect } from "react-redux";
import * as actions from "./store/actions/action-exams";
import * as actionsAuth from "./store/actions/action-authentication";
import Spinner from "./Components/Spinner/Spinner";
import Login from "./Components/Login/Login";

class App extends Component {
  componentDidMount() {
    this.props.onInitExams();
    this.props.onInitUser();
  }

  render() {
    if (this.props.exms) {
      return (
        <Router>
          <Switch>
            <Route exact path="/Login" component={Login} />
            <Route exact path="/List">
              <List data={this.props.exms} />
            </Route>
            <Route exact path="/Agenda" component={Agenda} />
            <Route exact path="/Item/:id" component={Item} />
            <Route exact path="/" render={() => (<Redirect to="/Login" />)} />
          </Switch>
        </Router>
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    exms: state.exams,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitExams: () => dispatch(actions.initExams()),
    onInitUser: () => dispatch(actionsAuth.initUser()),
    onSignOutUser: () => dispatch(actionsAuth.logOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
