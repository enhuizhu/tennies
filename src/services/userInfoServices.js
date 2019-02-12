import _ from 'lodash';

const playerInfo = {};

export default class UserInfoService {
  static login(player1, player2) {
    playerInfo.player1 = player1;
    playerInfo.player2 = player2;

    localStorage.setItem('userInfo', JSON.stringify(playerInfo));
  }

  static getPlayers() {
    if (!this.isLogged()) {
      return false
    }

    return JSON.parse(localStorage.getItem('userInfo'));
  }

  static isLogged() {
    const infoStr = localStorage.getItem('userInfo');
    return !_.isEmpty(infoStr);
  }
}
