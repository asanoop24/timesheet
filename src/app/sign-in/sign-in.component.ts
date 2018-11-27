import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, Data } from '@angular/router';
import { DataService } from './../services/data.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm;
  errorMessage: string = '';

  constructor(private router: Router, private dataService: DataService) { }

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

    this.dataService.login(email, password)
    .subscribe(
      response => {
        localStorage.setItem('employee', JSON.stringify(response['employee'][0]));
        let manager = JSON.parse(localStorage.getItem('employee'))['manager_name'];
        this.router.navigateByUrl('/home');
      }, 
      error => {
        console.log(error);
        this.errorMessage = error.error.error;
      }
    );


  }

}
