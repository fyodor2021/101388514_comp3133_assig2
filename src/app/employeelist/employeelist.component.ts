import { Component, OnInit, OnChanges, DoCheck, AfterViewInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getAllEmployees as getAllEmployeesQuery } from '../graphql.operations';
import { Router } from '@angular/router';
import { EmployeeshowComponent } from '../employeeshow/employeeshow.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employeelist',
  standalone: true,
  imports: [EmployeeshowComponent,CommonModule],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent implements OnInit, AfterViewInit {
  employees: any
  employeesQuery: any
  constructor(private apollo: Apollo,private router:Router) { }

  loadData() {
    console.log('in load data...');
    this.employeesQuery = this.apollo.watchQuery(
      {
        query: getAllEmployeesQuery,
      }
    )
    this.employeesQuery.valueChanges.subscribe(
      {
        next: (result: any) => {
            this.employees = result.data
        },error: (err: any) => {
          console.log(err) 
        }
      }
    )
  }
  
  ngOnInit(): void {
    this.loadData()
  }

  ngAfterViewInit(): void {
    this.employeesQuery.refetch()
  }

  handleAddEmployeeClick(){
    this.router.navigate(['add'])
  }
  handleLogoutClick(){
    window.localStorage.removeItem('username');
    window.location.reload()

  }
}
