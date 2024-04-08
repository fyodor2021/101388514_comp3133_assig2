import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { signup } from '../graphql.operations';
import { single } from 'rxjs';
@Component({
  selector: 'app-registeration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registeration.component.html',
  styleUrl: './registeration.component.css'
})
export class RegisterationComponent {
  validation: any;
  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })
  constructor(private router:Router, private apollo:Apollo){}
  onSubmit() {
    this.apollo.mutate(
      {
        mutation: signup,
        variables: {
          input: this.registerForm.value
        }
      }
    ).subscribe(
      {
        next: result => {
          this.router.navigate(['home'])
        }, error: err => {
          this.validation = err
        }
      }
    )
  }
}
