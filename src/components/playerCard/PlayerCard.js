import React from 'react';
import './PlayerCard.css';

export default class PlayerCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player-card pull-left">
        
        <div className="player-name">
          {this.props.playerName}
        </div>
        
        <div className="player-score">
          {
            this.props.points >= 40 && this.props.isAdvantage ?
            'ADVANTAGE' : this.props.points
          }
        </div>

        <div className="btn-wrapper">
          <button className="btn" onClick={this.props.addPoint}>Add Point</button>
        </div>
      </div>
    );
  }

  
}

