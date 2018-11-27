import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  role: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.role = JSON.parse(localStorage.getItem('employee'))['employee_role'];
    console.log(this.role);
  }

  onLogout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
