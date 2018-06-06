import { ITeam } from "src/model";
import { ADD_TEAM, DELETE_TEAM, EDIT_TEAM, ITeamActions } from "./actions";

export interface ITeamState {
    teams: ITeam[];
}

const initialState = {
    teams:[]
};
export function reducer(oldState: ITeamState = initialState, action: ITeamActions) {
    switch (action.type) {
        case ADD_TEAM:
        {
            const teams = oldState.teams.concat([{
                color: action.color,                
                id: Date.now(),
                name: action.name,
                players: action.players
            }]);
            return {...oldState, teams};
        }
        case EDIT_TEAM:
        {
            const teams = oldState.teams.filter(team => team.id === action.id);
            teams.push({
                color: action.color,
                id: action.id,
                name: action.name,
                players: action.players
            })
            return {...oldState, teams};

        }
        case DELETE_TEAM:
        {
            const teams = oldState.teams.filter(team => team.id === action.id);
            return {...oldState, ...teams};
        }
    }

    return oldState;
};