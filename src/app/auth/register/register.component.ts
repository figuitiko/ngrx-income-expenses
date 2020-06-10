import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {createGlobalSettings} from "@angular/cli/utilities/config";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Subscription} from "rxjs";
import * as ui from "../../share/ui.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  isLoading:boolean;
  uiSubscription: Subscription;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>
              ) { }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      name:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required],
    });
    this.uiSubscription = this.store.select('ui').subscribe(ui=> this.isLoading = ui.isloading);

  }
  ngOnDestroy(): void {

    this.uiSubscription.unsubscribe();
  }

  createUser(){
    // this.loading();
   if(this.formGroup.invalid) {return};


   this.store.dispatch(ui.isLoading());


    const {name, email, password} = this.formGroup.value;

    this.authService.createUser(name,email, password)
      .then(credentials => {
        console.log(credentials);
        // this.closeLoading();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(err=> {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,

        })
      });

  }
  private loading() {
    let timerInterval
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()

      }
    })
  }

  private closeLoading(){
    Swal.close();
  }

}
