import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }
    `]
})



export class DashboardComponent implements OnInit {
  visibleSidebar1;
    
  visibleSidebar2;
  
  visibleSidebar3;
  
  visibleSidebar4;
  
  visibleSidebar5;
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

    

}
