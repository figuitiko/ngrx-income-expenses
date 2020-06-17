import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncomeExpensesModel} from "../models/income-expenses.model";
import {IncomeExpensesService} from "../services/income-expenses.service";

import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import * as ui from "../share/ui.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styles: [
  ]
})
export class IncomeExpensesComponent implements OnInit, OnDestroy{

  incomeForm: FormGroup;
  typeData: string = 'income';
  loading: Boolean = false;
  loadingSubs: Subscription;


  constructor(private fb: FormBuilder, private incomeExpensesService: IncomeExpensesService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ui').subscribe(ui=>this.loading = ui.isloading)
    this.incomeForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    })
  }
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  saveData(){

    this.store.dispatch(ui.isLoading());

    if(this.incomeForm.invalid){return;}

    console.log(this.incomeForm.value);
    console.log(this.typeData);

    const { description, amount  } = this.incomeForm.value

    const incomeExpensesModel = new IncomeExpensesModel(description, amount, this.typeData);

    this.incomeExpensesService.createIncomeExpenses(incomeExpensesModel)
      .then(()=> {
        this.incomeForm.reset();
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Register created', description, 'success');
      })
      .catch(err=> {
        this.store.dispatch(ui.stopLoading())
        Swal.fire('Error', err.message, 'error')
      } );

  }

}
