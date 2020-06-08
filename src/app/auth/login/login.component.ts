import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }
  loginUser(){
    this.loading();
    if(this.loginForm.invalid) {return};
    const {email, password} = this.loginForm.value;

    this.authService.loginUser(email, password)
      .then(credentials=>{
        console.log(credentials);
        this.closeLoading();
        this.router.navigate(['/']);

      })
      .catch(err=> {
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
