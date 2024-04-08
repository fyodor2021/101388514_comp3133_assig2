import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EmployeelistComponent} from '../employeelist/employeelist.component'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EmployeelistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private router:Router){}
  ngOnInit(): void {
    if(!window.localStorage.getItem('username')){
      this.router.navigate(['login'])
    }
  }
}
