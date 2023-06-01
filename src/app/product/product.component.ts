import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ProductDto} from "../common/dto/product-dto";
import {Page} from "../common/model/page";
import {Subject} from "rxjs";
import {ConfirmationDialogService} from "../common/service/confirmation-dialog.service";
import {FormService} from "../common/service/form-service";
import {ToastrService} from "ngx-toastr";
import {ApiResponse} from "../common/model/api-response";
import {CurrentPage} from "../common/model/current-page";
import {joinObj} from "../common/util/object-util";
import {ProductSearchDto} from "../common/dto/product-search-dto";
import {ProductService} from "./product.service";
import {CategoryDto} from "../common/dto/category-dto";
import {SupplierDto} from "../common/dto/supplier-dto";
import {CategoryService} from "../category/category.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy{
  productFg: FormGroup = this.formService.makeBlankForm(ProductDto);
  //product search
  productSearchFg: FormGroup =  this.formService.makeBlankForm(ProductSearchDto);
  productDtoPage: Page<ProductDto> = new Page<ProductDto>();
  categoryDtoList: Array<CategoryDto>;
  supplierDtoList: Array<SupplierDto>;

  destroy$: Subject<boolean> = new Subject<boolean>();
  spinner = false;

  breadCrumbItems: Array<{}> = [
    {label: 'Northwind'},
    {label: 'Product', active: true}
  ];

  columnDefProduct = [
    { headerName: 'Product Name', field: 'productName', editable: false, colId: 'productName', filter: true },
    { headerName: 'Category', field: 'categoryName', editable: false, colId: 'categoryId', filter: true },
    { headerName: 'Supplier', field: 'companyName', editable: false, colId: 'supplierId', filter: true },
    { headerName: 'QPU', field: 'quantityPerUnit', editable: false, colId: 'quantityPerUnit', filter: true },
    { headerName: 'Unit Price', field: 'unitPrice', editable: false, colId: 'unitPrice', filter: true },
    { headerName: 'UIS', field: 'unitsInStock', editable: false, colId: 'unitsInStock', filter: true },
    { headerName: 'UIO', field: 'unitsOnOrder', editable: false, colId: 'unitsOnOrder', filter: true },
    { headerName: 'Reorder Level', field: 'reorderLevel', editable: false, colId: 'reorderLevel', filter: true },
    { headerName: 'Discontinued', field: 'discontinued', editable: false, colId: 'discontinued', filter: true },
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
      pinned: true
    }
  ];

  ngOnInit() {
    //this.cdr.detectChanges();
    this.getCategoryDtoList();
    this.getSupplierDtoList();
  }

  ngOnDestroy() {
    // this.destroy$.next(true);
    // this.destroy$.unsubscribe();
  }

  constructor(
    public productService: ProductService,
    private confirmationDialogService: ConfirmationDialogService,
    private formService: FormService,
    private categoryService: CategoryService,
    //private categoryService: Supp,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService) {
  }

  onUpdate(productDto: ProductDto) {
    console.log(productDto.categoryName);

    productDto.updateMode = true;
    this.productFg.patchValue(productDto);
  }

  getCategoryDtoList(): void {
    this.categoryService.searchCategoryDtoList()
      .subscribe((ar: ApiResponse<Array<CategoryDto>>) => {
        console.log(ar.data['content']);
        if (ar.status) {
          this.categoryDtoList = ar.data['content'];
        }
      }, error => {
        console.error(error);
      });
  }

  getSupplierDtoList(): void {
    this.categoryService.searchSupplierDtoList()
      .subscribe((ar: ApiResponse<Array<SupplierDto>>) => {
        if (ar.status) {
          this.supplierDtoList = ar.data['content'];
        }
      }, error => {
        console.error(error);
      });
  }

  onChangeCategory(categoryDto: CategoryDto) {
    this.productFg.patchValue({categoryName:categoryDto.categoryName})
   //if(!value) return;
  }

  onChangeSupplier(supplierDto: SupplierDto) {
    this.productFg.patchValue({companyName: supplierDto.companyName})
    //if(!value) return;
  }

  onSaveProduct(): void {

    const productDto: ProductDto = new ProductDto(this.productFg.value);
    this.confirmationDialogService.confirm('Do you really want to save?')
      .then((confirmed) => {

        productDto.discontinued = '0';

        console.log(productDto);

        if (confirmed) {
          this.productService.saveProduct(productDto)
            .subscribe((res: ApiResponse<ProductDto>) => {
              this.searchProductPage(new CurrentPage({ page: 0, size: 10 }));
              this.productFg.patchValue({});
              this.productFg.reset();
              //this.toastr.success(res.message, `Success`);
            }, err => {
              this.toastr.error(err.message, "Error");
            });
        }
      });
  }
  searchProductPage(currentPage: CurrentPage): void {
    console.log("coming here");
    const pageConcatSearchFg = joinObj(this.productSearchFg.value, currentPage)
    const productSearchDto = new ProductSearchDto(pageConcatSearchFg);
    this.spinner = true;
    this.productService.searchProductPage(productSearchDto)
      .subscribe((ar: ApiResponse<Page<ProductDto>>) => {
        this.spinner = false
        this.productDtoPage = ar.data;
      }, error => {
        console.error(error)
        this.spinner = false
      });
  }

  onUpdateProduct(): void {
    this.confirmationDialogService.confirm('Do you really want to update?')
      .then((confirmed) => {
        if (confirmed) {
          const productDto: ProductDto = new ProductDto(this.productFg.value);
          this.productService.updateProduct(productDto.id, productDto)
            .subscribe((res: any) => {
              this.searchProductPage(new CurrentPage({ page: 0, size: 10 }));
              // console.log("update success");
              // this.searchCategoryPage({ page: 0, size: 10 });
              this.productFg.reset();
              this.toastr.success(res.message, `Success`);
            }, err => {
              this.toastr.error(err.message, "Error");
            });
        }
      });
  }

  delete(productDto: ProductDto) {
    this.confirmationDialogService.deleteConfirm('Do you really want to delete this Product ?')
      .then((confirmed) => {
        if (confirmed) {
          this.productService.deleteProductById(productDto.id)
            .subscribe((res: ApiResponse<ProductDto>) => {
              if (res.status) {
                this.toastr.success(res.message, `Success`);
                this.searchProductPage({ page: 0, size: 10 });
              } else {
                this.toastr.error(res.message, `Error`);
              }
            }, (err: ApiResponse<ProductDto>) => {
              console.error(err);
            });
        }
      });
  }

  showOnModal(productDto: ProductDto) {
    console.log(productDto);
  }

  onClearForm() {
    this.confirmationDialogService.confirm('Do you really want to clear?')
      .then((confirmed) => {
        if (confirmed) {
          this.productFg.reset();
          this.searchProductPage({ page: 0, size: 10 });
        }
      });
  }

  onClearSearch() {
    this.productSearchFg.reset();
    this.searchProductPage({ page: 0, size: 10 });
  }
}
