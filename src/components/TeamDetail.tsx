import * as History from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { IPlayer, ITeam } from 'src/model';
import { editTeam, remoteAddTeam } from 'src/redux/team/actions';
import { IRootState } from '../redux/store';

interface ITeamDetailProps {
  team?: ITeam;
  match: match<{id: string}>;
  addTeam: (team: ITeam) => void;
  editTeam: (team: ITeam) => void;
  history: History.History;
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

    if (this.props.team != null) {
      this.state = {
        color: this.props.team.color,
        name: this.props.team.name,
        players: this.props.team.players.slice()
      };
    }
  }
  public render() {
    return (
      <div>
      
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
    if (this.props.team != null) {
      this.props.editTeam({
        id: this.props.team.id,
        name: this.state.name,
        // tslint:disable-next-line:object-literal-sort-keys
        color: this.state.color,
        players: this.state.players
      });
    } else {
    this.props.addTeam({
      color: this.state.color,      
      id: Date.now(),
      name: this.state.name,
      players: this.state.players
    });

    this.props.history.push("/teams");
  }
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

const TeamDetail = connect((rootState: IRootState, ownProps: {match: match<{id: string}>}) => ({
  team: rootState.team.teams.find(t => t.id === parseInt(ownProps.match.params.id, 10))
}), (dispatch: any) => ({
  addTeam: (team: ITeam) => { dispatch(remoteAddTeam(team.name, team.color, team.players)) },
  editTeam: (team: ITeam) => { dispatch(editTeam(team.id, team.name, team.color, team.players))}
}))(PureTeamDetail);

export default TeamDetail;
