import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { IPlayer, ITeam } from 'src/model';
import { addTeam } from 'src/redux/team/actions';
import { IRootState } from '../redux/store';

interface ITeamDetailProps {
  match: match<{id: string}>;
  addTeam: (team: ITeam) => void;
}

interface ITeamDetailStates {
  color:string; 
  name: string; 
  players: IPlayer[]
}

class PureTeamDetail extends React.Component<ITeamDetailProps, ITeamDetailStates> {
  constructor(props: ITeamDetailProps) {
    super(props);

    this.state = {
      color: '',
      name: '',
      players: [
        {id: 1, name: '', number: 0, isCaptain: true},
        {id: 2, name: '', number: 0, isCaptain: false},
        {id: 3, name: '', number: 0, isCaptain: false},                
        {id: 4, name: '', number: 0, isCaptain: false}                                        
          
      ]
    };
  }
  public render() {
    return (
      <div>
        // tslint:disable-next-line:radix
        <h2>{!isNaN(parseInt(this.props.match.params.id, 10)) ? 'Editing Team' : 'Add New Team'}</h2>
        <div>
          <label>Team Name : </label>
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </div>

        <div>
          <label>Team Color : </label>
          <input type="text" value={this.state.color} onChange={this.handleColorChange}/>
        </div>

        <table>
          <thead>
            <tr>
              <th>Player Number</th>
              <th>Player Name</th>
              <th>is Captain ?</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.players.map(player => {
                return (
                  <tr key={player.id}>
                    <td><input type="text" value={player.number} onChange={this.handlePlayerNumberChange.bind(this, player.id)}/></td>
                    <td><input type="text" value={player.name} onChange={this.handlePlayerNameChange.bind(this, player.id)}/></td>
                    <td><input type="checkbox" checked={player.isCaptain} onChange={this.handlePlayerCaptainChange.bind(this, player.id)}/></td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
  private handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.addTeam({
      color: this.state.color,      
      id: 1,
      name: this.state.name,
      players: this.state.players
    });
  }

  private handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value
    })
  }

  private handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      color: e.target.value
    })
  }

  private handlePlayerNumberChange = (playerId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const players = this.state.players.slice();
    const player = players.find(p => p.id === playerId);

    if (player != null && !isNaN(parseInt(e.target.value, 10))) {
      player.number = parseInt(e.target.value, 10)
      this.setState({
        players
      })
    }
  }

  private handlePlayerNameChange = (playerId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const players = this.state.players.slice();
    const player = players.find(p => p.id === playerId);
    if (player != null) {
      player.name = e.target.value

      this.setState({
        players
      })
    }
  }

  private handlePlayerCaptainChange = (playerId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const players = this.state.players.slice();
    const player = players.find(p => p.id === playerId);

    if (player != null) {
      if (e.target.checked === true) {
        players.forEach(p => p.isCaptain = false);
      }
      player.isCaptain = e.target.checked;
      this.setState({
        players
      })
    }
  }
}

const TeamDetail = connect((rootState: IRootState) => ({
  
}), (dispatch) => ({
  addTeam: (team: ITeam) => { dispatch(addTeam(team.name, team.color, team.players)) }
}))(PureTeamDetail);

export default TeamDetail;
