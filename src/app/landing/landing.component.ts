import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;


  
  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }
  
  simpleLogin(){

  }

  userRegister(){

  }

  goLogon(){
    //window.alert('here goes action');

    this.router.navigate(['/login'])
  }

}
