import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { login } from '../graphql.operations';
import { FormGroup, FormControl } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  validation: string | undefined  
  constructor(private apollo: Apollo,private router:Router) { }
  ngOnInit(): void {
    if(window.localStorage.getItem('username')){
      this.router.navigate(['home'])

    }
  }
  onSubmit() {
    this.apollo.watchQuery(
      {
        query: login,
        variables: this.loginForm.value
      }
    ).valueChanges.subscribe(
      {
        next: result => {
          window.localStorage.setItem('username', this.loginForm.value.email || '')
          this.router.navigate(['home'])
        },error: err => {
          this.validation = 'User Not Found' 
        }
      }

    )
  }
  handleRegisterClick(){
    this.router.navigate(['register'])
  }
}
