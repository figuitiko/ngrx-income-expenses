import {createAction, props} from '@ngrx/store';
import {IncomeExpensesModel} from "../models/income-expenses.model";

export const unSetItems = createAction('[Income-expenses Component] setItems');
export const setItems = createAction(
  '[Income-expenses Component] unSetItems',
  props<{items: IncomeExpensesModel[]}>()
);
