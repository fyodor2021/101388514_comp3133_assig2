import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deleteEmployee, editEmployee, getAllEmployees } from '../graphql.operations';
import { Apollo } from 'apollo-angular';
@Component({
  selector: 'app-employeeshow',
  standalone: true,
  imports: [],
  templateUrl: './employeeshow.component.html',
  styleUrl: './employeeshow.component.css'
})
export class EmployeeshowComponent{
  @Input() data : any;
  @Input() query: any;
  constructor(private router:Router, private apollo:Apollo){

  }
  handleViewClick(){
    
    this.router.navigate(['details'],{state:this.data})
  }
  handleEditClick(){
    this.router.navigate(['add'],{state:this.data})
  }
  handleDeleteClick(){
    this.apollo.mutate(
      {
        mutation: deleteEmployee,
        variables: {
          id: this.data._id
        }
      }
    ).subscribe(
      {
        next: result => {
          this.query.refetch();
        }, error: err => {
          console.log(err)
        }
      }
    )
  }
}
