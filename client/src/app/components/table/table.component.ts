import { Component, Input } from '@angular/core';
import { TableRowComponent } from './table-row/table-row.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableRowComponent],
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input({ required: true }) columns: string[] = [];
}
