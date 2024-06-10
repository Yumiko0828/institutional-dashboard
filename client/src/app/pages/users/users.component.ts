import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TableCellComponent } from '@components/table/table-cell/table-cell.component';
import { TableRowComponent } from '@components/table/table-row/table-row.component';
import { TableComponent } from '@components/table/table.component';
import { Perms } from '@enums/perms';
import { UserResponse } from '@interfaces/api';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, TableComponent, TableRowComponent, TableCellComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  usersResults!: Observable<UserResponse[]>;

  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.usersResults = this.service.getUsers();
  }

  getPermString(perm: number) {
    return Perms[perm];
  }
}
