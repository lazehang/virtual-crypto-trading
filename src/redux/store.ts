import { combineReducers, createStore } from "redux";
import {ITeamState, reducer as teamReducer} from "./team/reducer";

declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (enhancer: any) => any;
    }
}

export interface IRootState {
    team: ITeamState,
}
export const store = createStore(combineReducers({
    team: teamReducer,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
