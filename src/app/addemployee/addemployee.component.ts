import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { addEmployee,editEmployee, getAllEmployees } from '../graphql.operations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css'
})
export class AddemployeeComponent implements OnInit{
  payload:any;
  addEmployeeForm!: FormGroup;
  constructor(private router: Router, private apollo: Apollo) {
    this.payload = this.router.getCurrentNavigation()?.extras.state;
   }
   ngOnInit(): void {
     console.log(this.payload)
     if(this.payload){
      this.addEmployeeForm = new FormGroup({
        first_name: new FormControl(this.payload.first_name),
        last_name: new FormControl(this.payload.last_name),
        gender: new FormControl(this.payload.gender),
        salary: new FormControl(this.payload.salary),
        email: new FormControl(this.payload.email),
      })
     }else{
     this.addEmployeeForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      gender: new FormControl(''),
      salary: new FormControl(''),
      email: new FormControl(''),
    })
     }

   }
  validation: string | undefined

  onSubmit() {
    if(!this.payload){
      this.apollo.mutate(
        {
          mutation: addEmployee,
          variables: {
            input: {
              first_name: this.addEmployeeForm.get('first_name')?.value,
              email: this.addEmployeeForm.get('email')?.value,
              last_name: this.addEmployeeForm.get('last_name')?.value,
              gender: this.addEmployeeForm.get('gender')?.value,
              salary: this.addEmployeeForm.get('salary')?.value,
            }
          }
        }
      ).subscribe(
        {
          next: result => {
            this.validation = 'employee successfully added'
            this.router.navigate(['home'])                             
          }, error: err => {
            this.validation = err
  
          }
        }
      )
    }else{
      this.apollo.mutate(
        {
          mutation: editEmployee,
          variables: {
            id:this.payload._id,
            input: {
              first_name: this.addEmployeeForm.get('first_name')?.value,
              email: this.addEmployeeForm.get('email')?.value,
              last_name: this.addEmployeeForm.get('last_name')?.value,
              gender: this.addEmployeeForm.get('gender')?.value,
              salary: this.addEmployeeForm.get('salary')?.value,
            }
          }
        }
      ).subscribe(
        {
          next: result => {
            this.validation = 'employee successfully edited'
            this.router.navigate(['home'])
          }, error: err => {
            this.validation = err
  
          }
        }
      )
    }    
   
  }
}
