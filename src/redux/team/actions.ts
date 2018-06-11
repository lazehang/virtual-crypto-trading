import axios from "axios";
import { Dispatch } from "react-redux";
import { IPlayer, ITeam } from "src/model";

export const ADD_TEAM = 'ADD_TEAM';
type ADD_TEAM = typeof ADD_TEAM;

export const DELETE_TEAM = 'DELETE_TEAM';
type DELETE_TEAM = typeof DELETE_TEAM;

export const EDIT_TEAM = 'EDIT_TEAM';
type EDIT_TEAM = typeof EDIT_TEAM;

export const CLEAR_TEAM = 'CLEAR_TEAM';
type CLEAR_TEAM = typeof CLEAR_TEAM;

export interface IAddTeamAction {
    type: ADD_TEAM;
    name: string;
    color: string;
    players: IPlayer[]
}

export interface IEditTeamAction {
    type: EDIT_TEAM;
    id: number;
    name: string;
    color: string;
    players: IPlayer[]
}

export interface IDeleteTeamAction {
    type: DELETE_TEAM;
    id: number;
}

export interface IClearTeamAction {
    type: CLEAR_TEAM;
  }

export type ITeamActions = IAddTeamAction | IEditTeamAction | IDeleteTeamAction | IClearTeamAction;

export function remoteFetchTeam() {
    return (dispatch: Dispatch) => {
      axios.get<ITeam[]>(process.env.REACT_APP_API_URL+'teams').then(resp => {
        dispatch(clearTeam());
        resp.data.map((team: ITeam) => {
          dispatch(addTeam(team.id, team.name, team.color, team.players));
        });
      });
    };
  }

  export function remoteAddTeam(name: string, color: string, players: IPlayer[]) {
      return (dispatch: Dispatch) => {
          axios.post(process.env.REACT_APP_API_URL+'teams',
          {name, color, players}
        ).then(resp => dispatch(addTeam(resp.data.id, name, color, players)));
      }
  }

  export function remoteDeleteTeam(id: number) {
    return (dispatch: Dispatch) => {
        axios.delete(process.env.REACT_APP_API_URL+'teams/'+id).then(resp => dispatch(deleteTeam(resp.data.id)));
    }
}


export function addTeam(id: number, name: string, color: string, players: IPlayer[]) {
    return {
        color,
        name,
        players,
        type: ADD_TEAM
    }
}

export function editTeam(id: number, name: string, color: string, players: IPlayer[]) {
    return {
        color,
        id,
        name,
        players,
        type: EDIT_TEAM
    }
}

export function deleteTeam(id: number) {
    return {
        id,
        type: DELETE_TEAM
    }
}

export function clearTeam() {
    return {
        type: CLEAR_TEAM,
    }
}
