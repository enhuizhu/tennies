import React from 'react';
import './Login.css';
import userInfoService from '../../services/userInfoServices';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    userInfoService.login(this.player1.value, this.player2.value);
    window.location.href = '#/game';
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-wrapper">
          <input type="text" placeholder="player1 name" ref={(player1) => {
            this.player1 = player1;
          }}/>
          <input type="text" placeholder="player2 name" ref={(player2) => {
            this.player2 = player2;
          }}/>
          <button className="btn" onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
}
