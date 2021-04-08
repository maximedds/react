import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "./AuthService";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername = (e)=>{
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword = (e)=> {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin = (e) =>{
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        (user) => {
          console.log(user);
          this.props.setCurrentUser(user);
          this.props.history.push("/"); 
          // if (user.roles.includes("ROLE_EMPLOYE")) {
          //   this.props.history.push("/employe"); 
          // }
          // else if (user.roles.includes("ROLE_USER")) {
          //   this.props.history.push("/home"); 
          // }
          // window.location.reload();
        },
        error => {
          let resMessage = "";
          if (error.response) {
            // Request made and server responded with a status code(400, 401,...)
            if (error.response.status === 400) {
              resMessage = "Username ou password incorrecte";
            }
          }
          else if (error.request) {
            // Request made but no response received
            console.log(error.message);
            resMessage = "Serveur HS";
          }
          else{
            // Something happened in setting up the request that triggered an Error
            console.log(error.message);
            resMessage = "problème de configuration";
          }
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      
      <div className="col-md-12">
        <div className="card card-container">
          

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div class='bold-line'></div>
<div class='container'>
  <div class='window'>
    <div class='overlay'></div>
    <div class='content'>
      <div class='welcome'>Bienvenue</div>
      <div class='subtitle'>Merci de compléter les champs afin de vous identifier</div>
      <div class='input-fields'>
      <Input
                type="text"
                className='input-line full-width'
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
         <Input
                type="password"
                className='input-line full-width'
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />

      </div>
      <div><button
                className='ghost-round full-width'
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            /></div>
    </div>
  </div>
          </Form>
        </div>
      </div>
    );
  }
}