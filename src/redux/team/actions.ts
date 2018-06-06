import { IPlayer } from "src/model";

export const ADD_TEAM = 'ADD_TEAM';
type ADD_TEAM = typeof ADD_TEAM;

export const DELETE_TEAM = 'DELETE_TEAM';
type DELETE_TEAM = typeof DELETE_TEAM;

export const EDIT_TEAM = 'EDIT_TEAM';
type EDIT_TEAM = typeof EDIT_TEAM;

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

export type ITeamActions = IAddTeamAction | IEditTeamAction | IDeleteTeamAction;

export function addTeam(name: string, color: string, players: IPlayer[]) {
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

