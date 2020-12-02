import { Router } from '@angular/router';
import { User } from './../auth/models/user';
import { AuthService } from './../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent implements OnInit {
  
  
  constructor(private svrAuth: AuthService, private router : Router) { }
  dataUser: User;
  ngOnInit(): void {
    this.svrAuth.getObservableBevior().subscribe((data) => { this.dataUser = {...data}; console.log(data);
     });
  }

  logout(){
    console.log("dalio del beta");
    this.router.navigate(['/logout'])
   // this.svrAuth.logOut();
  }

}
