import {ApiService} from "../common/service/api.service";
import {Observable} from "rxjs";
import {ApiResponse} from "../common/model/api-response";
import {apiUriLocation} from "../common/apiUrILocations/api-uri-location";
import {HttpParams} from "@angular/common/http";
import {Page} from "../common/model/page";
import {Injectable} from "@angular/core";
import {ProductDto} from "../common/dto/product-dto";

@Injectable()
export class ProductService {
  constructor(private api: ApiService) {}

  saveProduct(product: ProductDto): Observable<ApiResponse<ProductDto>> {
    return this.api.postV2<ApiResponse<ProductDto>>(`${apiUriLocation.crud_product}`, product);
  }

  updateProduct(id:string, product:ProductDto): Observable<ApiResponse<ProductDto>> {
    return this.api.putV2<ApiResponse<ProductDto>>(`${apiUriLocation.crud_product}`, product, new HttpParams().append("id",id));
  }

  deleteProductById(id: string): Observable<ApiResponse<ProductDto>> {
    return this.api.deleteV3<ApiResponse<ProductDto>>(`${apiUriLocation.crud_product}`,
      new HttpParams().append('id', id));
  }

  searchProductPage(body:object): Observable<ApiResponse<Page<ProductDto>>> {
    return this.api.postV2<ApiResponse<Page<ProductDto>>>(
      `${apiUriLocation.search_product}`, body);
  }
}
