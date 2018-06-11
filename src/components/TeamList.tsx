import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ITeam } from 'src/model';
import { IRootState } from 'src/redux/store';
import { deleteTeam, remoteFetchTeam } from '../redux/team/actions';

interface ITeamListProps {
    teams: ITeam[];
    deleteT: (id: number) => void;
    loadTeam: () => void;
}
class PureTeamList extends React.Component<ITeamListProps, {}> {
    constructor(props: ITeamListProps) {
        super(props);
    }
    
    public componentWillMount() {
        this.props.loadTeam();
    }

    private deleteTeam = (teamId: number) => {
        this.props.deleteT(teamId);
    }

  // tslint:disable-next-line:member-ordering
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
                       <tr key={team.id}>
                        <td>{team.name}</td>
                        <td>{team.players.length}</td>
                        <td><Link to={`teams/${team.id}`}>Edit</Link> | <a href="javascript:void(0)" onClick={this.deleteTeam.bind(this, team.id)}>Delete</a></td>
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
}),
(dispatch: any) => ({
    loadTeam: () => { dispatch(remoteFetchTeam()) },
    // tslint:disable-next-line:object-literal-sort-keys
    deleteT: (id: number) => { dispatch(deleteTeam(id)) }
}
))(PureTeamList);

export default TeamList;
