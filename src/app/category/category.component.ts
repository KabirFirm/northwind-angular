import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CategoryDto} from "../common/dto/category-dto";
import {FormService} from "../common/service/form-service";
import {CategoryService} from "./category.service";
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs";
import {ApiResponse} from "../common/model/api-response";
import {CurrentPage} from "../common/model/current-page";
import {Page} from "../common/model/page";
import {joinObj} from "../common/util/object-util";
import {CategorySearchDto} from "../common/dto/category-search-dto";
import {ConfirmationDialogService} from "../common/service/confirmation-dialog.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy{

  categoryFg: FormGroup = this.formService.makeBlankForm(CategoryDto);
  //category search
  categorySearchFg: FormGroup =  this.formService.makeBlankForm(CategorySearchDto);
  categoryDtoPage: Page<CategoryDto> = new Page<CategoryDto>();

  destroy$: Subject<boolean> = new Subject<boolean>();
  spinner = false;

  breadCrumbItems: Array<{}> = [
    {label: 'Northwind'},
    {label: 'Category', active: true}
  ];

  columnDefCategory = [
    { headerName: 'Category Name', field: 'categoryName', editable: false, colId: 'categoryName', filter: true },
    { headerName: 'Description', field: 'description', editable: false, colId: 'description', filter: true },
    { headerName: 'Picture', field: 'picture', editable: false, colId: 'picture', filter: true },
    {
      headerName: 'Action', editable: false, colId: 'action', width: 150,
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        updateFlag: true,
        update: (param: any) => {
          this.onUpdate(param.data);
        },
        show: (param: any) => {
          //this.showOnModal(param);
        }
      },
      pinned: false
    }
  ];

  ngOnInit() {
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    // this.destroy$.next(true);
    // this.destroy$.unsubscribe();
  }

  constructor(
    public categoryService: CategoryService,
    private confirmationDialogService: ConfirmationDialogService,
    private formService: FormService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService) {
  }

  onUpdate(categoryDto: CategoryDto) {
    categoryDto.updateMode = true;
    this.categoryFg.patchValue(categoryDto);
  }

  onSaveCategory(): void {

    const categoryDto: CategoryDto = new CategoryDto(this.categoryFg.value);
    this.confirmationDialogService.confirm('Do you really want to save?')
      .then((confirmed) => {

        if (confirmed) {
          this.categoryService.saveCategory(categoryDto)
            .subscribe((res: ApiResponse<CategoryDto>) => {
              this.searchCategoryPage(new CurrentPage({ page: 0, size: 10 }));
              this.categoryFg.patchValue({});
              this.categoryFg.reset();
              //this.toastr.success(res.message, `Success`);
            }, err => {
              this.toastr.error(err.message, "Error");
            });
        }
      });
  }
  searchCategoryPage(currentPage: CurrentPage): void {
    console.log("coming here");
    const pageConcatSearchFg = joinObj(this.categorySearchFg.value, currentPage)
    const categorySearchDto = new CategorySearchDto(pageConcatSearchFg);
    this.spinner = true;
    this.categoryService.searchCategoryPage(categorySearchDto)
      .subscribe((ar: ApiResponse<Page<CategoryDto>>) => {
        this.spinner = false
        this.categoryDtoPage = ar.data;
      }, error => {
        console.error(error)
        this.spinner = false
      });
  }

  onUpdateCategory(): void {
    this.confirmationDialogService.confirm('Do you really want to update?')
      .then((confirmed) => {
        if (confirmed) {
          const categoryDto: CategoryDto = new CategoryDto(this.categoryFg.value);
          this.categoryService.updateCategory(categoryDto.id, categoryDto)
            .subscribe((res: any) => {
              this.searchCategoryPage(new CurrentPage({ page: 0, size: 10 }));
              // console.log("update success");
              // this.searchCategoryPage({ page: 0, size: 10 });
              this.categoryFg.reset();
              this.toastr.success(res.message, `Success`);
            }, err => {
              this.toastr.error(err.message, "Error");
            });
        }
      });
  }

  delete(categoryDto: CategoryDto) {
    this.confirmationDialogService.deleteConfirm('Do you really want to delete this Category ?')
      .then((confirmed) => {
        if (confirmed) {
          this.categoryService.deleteCategoryById(categoryDto.id)
            .subscribe((res: ApiResponse<CategoryDto>) => {
              if (res.status) {
                this.toastr.success(res.message, `Success`);
                this.searchCategoryPage({ page: 0, size: 10 });
              } else {
                this.toastr.error(res.message, `Error`);
              }
            }, (err: ApiResponse<CategoryDto>) => {
              console.error(err);
            });
        }
      });
  }

  showOnModal(categoryDto: CategoryDto) {
    console.log(categoryDto);
  }

  onClearForm() {
    this.confirmationDialogService.confirm('Do you really want to clear?')
      .then((confirmed) => {
        if (confirmed) {
          this.categoryFg.reset();
          this.searchCategoryPage({ page: 0, size: 10 });
        }
      });
  }

  onClearSearch() {
    this.categorySearchFg.reset();
    this.searchCategoryPage({ page: 0, size: 10 });
  }

}
