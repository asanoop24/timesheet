import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm;
  errorMessage: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email': new FormControl(),
      'password': new FormControl()
    });
  }

  onSubmit(){
    // console.log(this.signInForm);
    this.errorMessage = '';
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;

    // this.authService.signIn(email, password)
    // .subscribe(
    //   response => {
    //     let user = response.user;
    //     localStorage.setItem('token', user.tokens[0].token);
    //     localStorage.setItem('role', user.role);
    //     this.router.navigateByUrl(`/${user.role}-dashboard`);
    //     // console.log(`Anoop  /${user.role}-dashboard`);
    //   },
    //   error => {
    //     this.errorMessage = error.error.error;
    //   }
    // );


  }

}
