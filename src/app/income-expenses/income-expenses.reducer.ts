import {createReducer, on} from '@ngrx/store';
import {setItems, unSetItems} from './income-expenses.actions';
import {IncomeExpensesModel} from "../models/income-expenses.model";

export interface State {
  items: IncomeExpensesModel[];
}

export const initialState = {
  items:[]
};

const _incomeExpensesReducer = createReducer(initialState,
  on(setItems, (state,{items}) => ({...state, items: [...items]})),
  on(unSetItems, state => ({...state})),


);

export function incomeExpensesReducer(state, action) {
  return _incomeExpensesReducer(state, action);
}
