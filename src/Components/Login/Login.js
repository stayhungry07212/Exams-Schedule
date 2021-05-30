import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import * as database from "../../database-mockup";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { connect } from "react-redux";
import * as actions from "../../store/actions/action-authentication";
import Background from "../Background/Background";

class Login extends Component {
  state = {
    disabled: false,
    loginInformations: {},
    errorLogin: null
  };

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      loginInformations: {
        ...this.state.loginInformations,
        [event.target.name]: event.target.value,
      },
    });
  }

  componentDidMount() {
    if (this.props.user) {
      // this.props.history.push('/Agenda');
    }
  }

  login = () => {
    database
      .signin(this.state.loginInformations)
      .then(res => {
        this.props.history.push('/Agenda')
        database.getUserByID(res.user.uid).on(
          "value",
          (snap) => {
            let details = snap.val();
            details.uid = res.user.uid;
            this.props.onSignInUser(details);
          })

      })
      .catch((err) => {
        this.setState({
          errorLogin: err.message
        });
      });
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-title">Login</div>
          <form className="login-form" noValidate autoComplete="off">
            <TextField
              required
              id="filled-required"
              label="Email"
              name="email"
              onChange={this.handleInputChange}
            />
            <TextField
              required
              id="filled-password-input"
              label="Password"
              type="password"
              name="password"
              onChange={this.handleInputChange}
              autoComplete="current-password"
            />
            <div className="login-error">{this.state.errorLogin}</div>
            <Button
              color="primary"
              disabled={this.state.disabled}
              onClick={this.login}>
              Log in
            </Button>
          </form>

          <div className="no-account">
            <span>if you don't have an account</span>
            <ArrowForwardIcon />
            <Button color="primary" component={Link} to="/Agenda">
              See your timetable
            </Button>
          </div>
        </div>
       <Background></Background>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignInUser: (currentUserUID) =>
      dispatch(actions.updateCurrentUser(currentUserUID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
