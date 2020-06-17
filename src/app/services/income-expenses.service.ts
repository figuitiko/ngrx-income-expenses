import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import 'firebase/firestore'
import {IncomeExpensesModel} from "../models/income-expenses.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class IncomeExpensesService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthService) { }

  createIncomeExpenses(incomeExpenses: IncomeExpensesModel){

   return  this.firestore.doc(`${this.authService.user.uid}/income-expenses`)
          .collection('items')
          .add({...incomeExpenses})


  }
}
