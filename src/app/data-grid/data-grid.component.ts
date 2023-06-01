import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {Page} from '../common/model/page';
import {ColDef, GridApi, GridReadyEvent, ValueGetterParams} from 'ag-grid-community';
import {DataGridIconComponent} from './data-grid-icon/data-grid-icon.component';
import {CurrentPage} from '../common/model/current-page';
import {toInteger, toString} from '../common/util/type-convert-util';
import {ColumnApi} from 'ag-grid-community/dist/lib/columns/columnApi';

@Component({
  selector: 'data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, OnChanges {

  @Input() columnDefs: ColDef[];
  @Input() frameworkComponents = {btnCellRenderer: DataGridIconComponent};
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  showPagination = true;
  @ViewChild('agGrid') agGrid: AgGridAngular;
  @Output() getPage = new EventEmitter();
  @Input() page: Page<any>;
  @Input() size = "10";
  content: any[];
  @Input() currentPageNumber: number;
  start: number;
  end: number;

  noRowsTemplate: string;
  loadingTemplate: string;

  constructor() {
    this.loadingTemplate = `<span class="ag-overlay-loading-center">data is loading ...</span>`;
    this.noRowsTemplate = `<span>No rows to show</span>`;
  }

  ngOnInit(): void {
    const currentPage: CurrentPage = new CurrentPage({page: 0, size: toInteger(this.size)})
    this.currentPageNumber = currentPage.page;
    this.size = toString(currentPage.size);

    this.getPage.emit(currentPage);
    if (this.columnDefs === undefined) {
      throw new Error('column definition is undefined')
    }
    if (this.columnDefs === null) {
      throw new Error('column definition is null')
    }

    let pageNumber = this.currentPageNumber;
    let sizeNumber = toInteger(this.size);
    this.columnDefs = this.columnDefs.filter(res => res['colId'] !== 'sl')
    this.columnDefs = [...this.columnDefs, {
      headerName: 'SL',
      editable: false, colId: 'sl', filter: false, pinned: 'left', width: 70,
      valueGetter: function (params: ValueGetterParams) {
        let ind = params.node?.rowIndex ? params.node?.rowIndex : 0;
        return ind + (pageNumber * sizeNumber) + 1;
      },
    },
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.content = this.page.content;
    this.start = this.page.content.length > 0 ? (this.page.number * this.page.size) + 1 : 0;
    this.end = (this.page.number * this.page.size) + this.page.content.length;
  }

  onPageChange(event: PageChangedEvent): void {
    this.currentPageNumber = event.page - 1;
    const currentPage: CurrentPage = new CurrentPage({page: event.page - 1, size: this.page.size})
    this.getPage.emit(currentPage);

    let pageNumber = this.currentPageNumber;
    let sizeNumber = toInteger(this.size);
    this.columnDefs = this.columnDefs.filter(res => res['colId'] !== 'sl')
    this.columnDefs = [...this.columnDefs, {
      headerName: 'SL',
      editable: false, colId: 'sl', filter: false, pinned: 'left', width: 80,
      valueGetter: function (params) {
        let ind = params.node?.rowIndex ? params.node?.rowIndex : 0;
        return ind + (pageNumber * sizeNumber) + 1;
      },
    },
    ];
  }


  /*const selectedNodes = this.agGrid.api.getSelectedNodes();
   const selectedData = selectedNodes.map(node => node.data );*/

  onGridReady($event: GridReadyEvent) {
    //$event.api.sizeColumnsToFit();

    this.gridApi = $event.api;
    this.gridColumnApi = $event.columnApi;

  }

  onRowClicked(e: any) {
    //console.log(e);
    /*if (e.event.target !== undefined) {
      const actionType = e.event.target.getAttribute('data-action-type');
      if (actionType === 'update') {console.log('update'); }
      if (actionType === 'delete') {console.log('delete'); }
    }
    if (e.event.target !== undefined && e.event.target.getAttribute('data-action-type') &&
      e.event.target.getAttribute('data-action-type').indexOf('update') > -1) {
      console.log(e.data);
    }*/
  }

  /*goToPage(n: number) {
    this.gridApi.paginationGoToPage(n);
  }*/

  onPageSizeChanged(eventTarget: any) {
    console.log(eventTarget);
  }

  getSize(): number {
    return toInteger(this.size);
  }

  public defaultColDef: ColDef = {
    resizable: true,
    //wrapText: true,
    //autoHeight: true,
  };


  getRowStyle = function (params: any) {
    //console.log(params)
    if (params.node.rowIndex % 2 === 1) {
      return {background: '#f9f9f9'};
    }
    return undefined;
  };

}
