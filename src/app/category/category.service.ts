import {Injectable} from "@angular/core";
import {CategoryDto} from "../common/dto/category-dto";
import {Observable} from "rxjs";
import {ApiResponse} from "../common/model/api-response";
import {ApiService} from "../common/service/api.service";
import {apiUriLocation} from "../common/apiUrILocations/api-uri-location";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Page} from "../common/model/page";
import {SupplierDto} from "../common/dto/supplier-dto";

@Injectable()
export class CategoryService {

  constructor(private api: ApiService) {}

  saveCategory(category: CategoryDto): Observable<ApiResponse<CategoryDto>> {
    return this.api.postV2<ApiResponse<CategoryDto>>(`${apiUriLocation.crud_category}`, category);
  }

  updateCategory(id:string, category:CategoryDto): Observable<ApiResponse<CategoryDto>> {
    return this.api.putV2<ApiResponse<CategoryDto>>(`${apiUriLocation.crud_category}`, category, new HttpParams().append("id",id));
  }

  deleteCategoryById(id: string): Observable<ApiResponse<CategoryDto>> {
    return this.api.deleteV3<ApiResponse<CategoryDto>>(`${apiUriLocation.crud_category}`,
      new HttpParams().append('id', id));
  }

  searchCategoryPage(body:object): Observable<ApiResponse<Page<CategoryDto>>> {
    return this.api.postV2<ApiResponse<Page<CategoryDto>>>(
      `${apiUriLocation.search_category}`, body);
  }

  searchCategoryDtoList():Observable<ApiResponse<Array<CategoryDto>>> {
    return this.api.postV2(`${apiUriLocation.search_category}`);
  }

  searchSupplierDtoList():Observable<ApiResponse<Array<SupplierDto>>> {
    return this.api.postV2(`${apiUriLocation.search_supplier}`);
  }

}
