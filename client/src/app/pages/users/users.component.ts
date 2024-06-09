import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TableCellComponent } from 'src/app/components/table/table-cell/table-cell.component';
import { TableRowComponent } from 'src/app/components/table/table-row/table-row.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { Perms } from 'src/app/core/enums/perms';
import { UserResponse } from 'src/app/core/interfaces/api';
import { UsersService } from 'src/app/core/services/users.service';

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
