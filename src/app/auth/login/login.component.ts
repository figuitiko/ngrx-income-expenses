import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2'
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import  * as ui from "../../share/ui.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading:boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   this.uiSubscription = this.store.select('ui').subscribe(ui=> {
                          this.isLoading = ui.isloading;
                          console.log('loading sub')
    });

  }
  ngOnDestroy(): void {
     this.uiSubscription.unsubscribe();
  }

  loginUser(){

    if(this.loginForm.invalid) {return};
      this.store.dispatch(ui.isLoading())
    //this.loading();
    const {email, password} = this.loginForm.value;

    this.authService.loginUser(email, password)
      .then(credentials=>{
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

    Swal.fire({
      title: 'wait a second!',
      html: 'I will close in <b></b> milliseconds.',

      onBeforeOpen: () => {
        Swal.showLoading()

      }
    });
  }
  private closeLoading(){
    Swal.close();
  }

}
