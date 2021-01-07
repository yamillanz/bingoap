import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	@ViewChild('navBurger') navBurger: ElementRef;
	@ViewChild('navMenu') navMenu: ElementRef;
	@ViewChild('navBar') navbar: ElementRef;

	constructor(private viewportScroller: ViewportScroller, private router: Router) { }

	async onClickScroll(elementId: string){
		/* 	if (elementId == "home") {
				this.router.navigate(['/landing']);
				this.viewportScroller.scrollToAnchor(elementId);
			} else {
				this.router.navigate(['/landing']);
				this.viewportScroller.scrollToAnchor(elementId);
			} */
		//
		//const elmnt = document.getElementById(elementId);
		await this.router.navigate(['/landing']);
		this.viewportScroller.scrollToAnchor(elementId);
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


	goLogon() {
		//window.alert('here goes action');

		this.router.navigate(['/login'])
	}

	newUser() {
		this.router.navigate(['/landing/users/register'])
	}

}
