import {ActionReducerMap} from "@ngrx/store";
import * as ui from './share/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as incomeExpenses from './income-expenses/income-expenses.reducer';


export interface AppState {
  ui: ui.State,
  user: auth.State,
  incomesExpenses: incomeExpenses.State

}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  incomesExpenses: incomeExpenses.incomeExpensesReducer
}

