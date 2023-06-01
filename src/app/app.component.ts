import { Component } from '@angular/core';
import {ColDef} from "ag-grid-community";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rowData: any[] = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Celica', price: 72000 }
  ];

  colDefs: ColDef[] = [
    {field: 'make'},
    {field: 'model'},
    {field: 'price'},
  ];
}
