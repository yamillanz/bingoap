import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;


  constructor(private viewportScroller: ViewportScroller, private router: Router) { }

  onClickScroll(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);

    const elmnt = document.getElementById(elementId);
    elmnt.scrollIntoView({behavior: "smooth"});
  }
/*   scroll(id){
    const elmnt = document.getElementById(id);
    elmnt.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
} */

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
}
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
