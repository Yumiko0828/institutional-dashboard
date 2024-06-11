import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  combineLatest,
  map,
} from 'rxjs';
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
  usersResults: UserResponse[] = [];
  user!: UserResponse;
  cols = ['#', 'Nombres', 'Email', 'Cuenta'];

  constructor(private service: UsersService) {}

  ngOnInit(): void {
    combineLatest([this.service.getUsers(), this.service.whoami()]).subscribe(
      ([users, whoami]) => {
        this.usersResults = users;
        this.user = whoami;
        if (whoami.permissionsLevel === 2) {
          this.cols.push('Opciones');
        }
      }
    );
  }

  getPermString(perm: number) {
    return Perms[perm];
  }

  confirmDelete(id: string) {
    const pass = confirm(
      'La acción que desea realizar es inreversible, ¿estás seguro?'
    );

    if (!pass) return;

    this.service
      .delete(id)
      .pipe(
        catchError((err: string) => {
          alert(`Error: ${err}`);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.usersResults = this.usersResults.filter((u) => u.id !== id);
      });
  }
}
