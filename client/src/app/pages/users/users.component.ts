import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TableComponent } from '@components/table/table.component';
import { Perms } from '@enums/perms';
import { UserResponse } from '@interfaces/api';
import { UsersService } from '@services/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, TableComponent, RouterLink],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  usersResults!: Observable<UserResponse[]>;
  user$!: Observable<UserResponse>;
  cols = ['#', 'Nombres', 'Email', 'Cuenta', 'Opciones'];

  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.usersResults = this.service.getUsers();
    this.user$ = this.service.whoami();
  }

  getPermString(perm: number) {
    return Perms[perm];
  }
}
