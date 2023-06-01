import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from "ag-grid-angular";
import { CategoryComponent } from './category/category.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DataGridModule} from "./data-grid/data-grid.module";
import {HttpClientModule} from "@angular/common/http";
import {CategoryService} from "./category/category.service";
import {FormService} from "./common/service/form-service";
import {RxFormBuilder} from "@rxweb/reactive-form-validators";
import {ToastrModule, ToastrService} from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import {ProductService} from "./product/product.service";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    ReactiveFormsModule,
    DataGridModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule
  ],
  providers: [
    CategoryService,
    ProductService,
    ToastrService,
    FormService,
    RxFormBuilder,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
