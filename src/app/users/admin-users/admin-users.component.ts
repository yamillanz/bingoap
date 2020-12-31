import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { user, SesionActiva } from '../models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
usuarios: user [];
id: any;
checked: boolean;
checkedActivo:boolean;
nonChecked: boolean;
sesionActiva: number;
activo: any;
i: number;
  constructor(private usersService: UsersService, 
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUsers();
    this.checked = true;
    this.nonChecked = false;
  }

  loadUsers() {
		this.usersService.getAllUsers().subscribe(data => {
       this.usuarios = data;
        this.sesionActiva = data[0].sesionActiva;
        this.checked = true;
        this.nonChecked = false;

    
    })
 
  }

  goToEditarUser(id) {
    this.router.navigate(['dashboard/perfil/cliente/editar', id],{
      skipLocationChange: true
    });
    
  } 

  
  

}
