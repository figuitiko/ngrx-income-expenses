import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {createGlobalSettings} from "@angular/cli/utilities/config";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      name:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required],
    });

  }

  createUser(){
    this.loading();
   if(this.formGroup.invalid) {return};


    const {name, email, password} = this.formGroup.value;

    this.authService.createUser(name,email, password)
      .then(credentials => {
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
