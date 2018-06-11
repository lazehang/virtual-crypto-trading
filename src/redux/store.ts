import { applyMiddleware, combineReducers, createStore } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import {ITeamState, reducer as teamReducer} from "./team/reducer";

export interface IRootState {
    team: ITeamState,
}
export const store = createStore(combineReducers({
    team: teamReducer,
}), applyMiddleware(thunk, logger));
