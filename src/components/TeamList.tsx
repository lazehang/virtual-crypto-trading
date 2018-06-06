import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ITeam } from 'src/model';
import { IRootState } from 'src/redux/store';

interface ITeamListProps {
    teams: ITeam[];
}
class PureTeamList extends React.Component<ITeamListProps, {}> {
    constructor(props: ITeamListProps) {
        super(props);
    }

  public render() {
      const teams = this.props.teams;
    return (
      <div>
        <h2>Team List</h2>
        <Link to="/teams/add">Add Team</Link>
        <table>
            <thead>
                <tr>
                    <th>Team Name</th>
                    <th>Number of Players</th>
                    <th>Actions</th>                    
                </tr>
            </thead>
            <tbody>
               {
                   teams.map(team => (
                       // tslint:disable-next-line:no-unused-expression
                       <tr key={team.id}>
                        <td>{team.name}</td>
                        <td>{team.players.length}</td>
                        <td><Link to={`teams/${team.id}`}>Edit</Link></td>
                       </tr>
                   ))
               }
            </tbody>
        </table>
      </div>
    );
  }
}

const TeamList = connect((rootState: IRootState) => ({
    teams: rootState.team.teams
}))(PureTeamList);

export default TeamList;
