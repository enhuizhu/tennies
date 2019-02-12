import React from 'react';
import UserInfoService from '../../services/userInfoServices';
import PlayerCard from '../../components/playerCard/PlayerCard';
import "./Game.css";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    
    if (!UserInfoService.isLogged()) {
      window.location.href = '/';
    }

    this.playerInfo = UserInfoService.getPlayers();
    this.winner = null;
    this.message = null;
    this.currentGameStatus = null;
    this.newGame = this.newGame.bind(this);

    this.gameStatus = {
      equal: 'DEUCE',
      advantage: 'ADVANTAGE',
      over: 'OVER'
    }

    this.state = {
      player1score: 0,
      player2score: 0,
      gameStatus: null,
    };
  }

  newGame() {
    this.setState( {
      player1score: 0,
      player2score: 0,
      gameStatus: null,
    });

    this.winner = null;
    this.message = null;
    this.currentGameStatus = null;
  }

  addPoint(player) {
    let scoreKey;
    
    if (player === this.playerInfo.player1) {
      scoreKey = 'player1score';
    } else {
      scoreKey = 'player2score';
    }

    let currentScore = this.state[scoreKey];

    if (currentScore < 30) {
      currentScore += 15;
    } else {
      currentScore += 10;
    }

    this.setState({
      [scoreKey]: currentScore
    }, () => {
      this.checkGameOver();
    });
  }

  checkGameOver() {
    const maxPoint = Math.max(this.state.player1score, this.state.player2score);
          
      if (this.state.player1score === this.state.player2score 
        && this.state.player1score >= 40
      ) {
        this.message = this.gameStatus.equal;
        this.setState({
          gameStatus: this.gameStatus.equal
        });
      } else if (maxPoint > 40){
        const dis = Math.abs(this.state.player1score - this.state.player2score);

        if (dis >= 20) {
          this.winner = this.state.player1score > this.state.player2score ? this.playerInfo.player1 : this.playerInfo.player2;
          // this.currentGameStatus = this.gameStatus.over;
          this.setState({
            gameStatus: this.gameStatus.over
          });
        } else {
          this.message = null;

          this.setState({
            gameStatus: null
          });
        }
      }
  }

  render() {
    const playerCards =(
     <div className="cards-container">
      <PlayerCard 
        playerName={this.playerInfo.player1}
        points={this.state.player1score > 40 ? 40 : this.state.player1score}
        isAdvantage={this.state.player1score > 40 && this.state.player1score > this.state.player2score}
        addPoint={()=> {
          this.addPoint(this.playerInfo.player1);
        }}
      >
      </PlayerCard>
      <div className="message-board">
          {this.message}
      </div>
      <PlayerCard 
        playerName={this.playerInfo.player2}
        points={this.state.player2score > 40 ? 40 : this.state.player2score}
        isAdvantage={this.state.player2score > 40 && this.state.player2score > this.state.player1score}
        addPoint={()=> {
          this.addPoint(this.playerInfo.player2);
        }}
      >
      </PlayerCard>
      </div>);
    
    const gameOver = (<div>
      {this.winner} win the game
      <button className="btn" onClick={this.newGame}>New Game</button>
    </div>);

    return (
      <div className="game-container">
        {
          this.state.gameStatus === this.gameStatus.over ? gameOver : playerCards
        }
      </div>
    );
  }
}
