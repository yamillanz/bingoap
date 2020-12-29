import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { user } from '../models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
usuarios: user [];
id: any;


  constructor(private usersService: UsersService, 
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
		this.usersService.getAllUsers().subscribe(data => {
       this.usuarios = data;
    })

  }

  goToEditarUser(id) {
    this.router.navigate(['dashboard/perfil/cliente/editar', id],{
      skipLocationChange: true
    });
    
  } 
  

}
