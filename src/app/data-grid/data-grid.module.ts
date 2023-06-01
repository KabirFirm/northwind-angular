import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataGridComponent} from './data-grid.component';
import {AgGridModule} from 'ag-grid-angular';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {DataGridIconComponent} from './data-grid-icon/data-grid-icon.component';

@NgModule({
  declarations: [
    DataGridComponent,
    DataGridIconComponent
  ],
  imports: [
    CommonModule,
    //AgGridModule.withComponents([DataGridIconComponent]),
    AgGridModule,

    PaginationModule.forRoot(),
    FormsModule,
    MatIconModule
  ],
  providers: [],
  exports: [
    DataGridComponent,
  ],
})
export class DataGridModule {
  constructor(){ }
}
