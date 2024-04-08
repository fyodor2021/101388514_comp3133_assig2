import { Component } from '@angular/core'
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  payload:any
  constructor(private router:Router){
    this.payload = this.router.getCurrentNavigation()?.extras.state;
  }
  
}
