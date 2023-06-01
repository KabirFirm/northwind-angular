import {Inject, Injectable, Injector, Type} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable({providedIn:'root'})
export class ApiService {

  constructor(private http: HttpClient/*, private toastrService: ToastrService*/) {

  }

  private formatErrors(httpErrorResponse: HttpErrorResponse) {
    console.log({httpErrorResponse})
    if(httpErrorResponse.status === 404){
      console.log("Network issue")
      //this.toastrService.error("Network issue","Message")
    }
    if(httpErrorResponse.status === 503){
      console.log("Network issue")
      //this.toastrService.error("Network issue","Message")
    }
    //console.log(error);
    return throwError(httpErrorResponse.error);
  }

  /**
   * @deprecated The method should not be used
   */
  post(path: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.post(`${path}`, JSON.stringify(body), {params} )
      .pipe(catchError(this.formatErrors));
  }

  //use this
  postV2<T>(path: string, body: Object = {}, params: HttpParams = new HttpParams() ): Observable<T> {
    return this.http.post<T>(path, body, {params} )
      .pipe(catchError(this.formatErrors))
  }

  postV3<T>(path: string, body: Object = {}, params: HttpParams = new HttpParams() ): Observable<HttpResponse<T>> {
    return this.http.post<T>(`${path}`, JSON.stringify(body), {params, observe: 'response'})
      .pipe(catchError(this.formatErrors))
  }

  postV4<T>(path: string, body: Object = {}, params: HttpParams = new HttpParams() ): Observable<T> {
    return this.http.post<T>(`${path}`, JSON.stringify(body), {'params' : params, 'responseType' : 'arraybuffer' as 'json'})
      .pipe(catchError(this.formatErrors))
  }

  /**
   * @deprecated The method should not be used
   */
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  //use this
  putV2<T>(path: string, body: Object = {}, params: HttpParams = new HttpParams() ): Observable<T> {
    return this.http.put<T>(path, body, {params} )
      .pipe(catchError(this.formatErrors))
  }

  /**
   * @deprecated The method should not be used
   */
  delete(path:any): Observable<any> {
    return this.http.delete(`${path}`)
      .pipe(catchError(this.formatErrors));
  }

  /**
   * @deprecated The method should not be used
   */
  deleteV2<T>(path: string): Observable<T> {
    return this.http.delete<T>(path)
      .pipe(catchError(this.formatErrors))
  }

  //use this
  deleteV3<T>(path: string, params:HttpParams, body: Object = {}): Observable<T> {
    return this.http.delete<T>(path, {params,body})
      .pipe(catchError(this.formatErrors))
  }

  /**
   * @deprecated The method should not be used
   */
  get(path: string, params: HttpParams = new HttpParams() ): Observable<any> {
    return this.http.get(`${path}`, {params})
      .pipe(catchError(this.formatErrors));
  }


  getV2<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${path}`, {'params' : params, 'responseType' : 'arraybuffer' as 'json'})
      .pipe(catchError(this.formatErrors));
  }

  /**
   * get response
   * @param date example
   * @param pattern example
   * @return example
   */
  getV3<T>(path: string, params: HttpParams = new HttpParams()): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${path}`, {'params' : params, 'responseType': 'arraybuffer' as 'json', observe: 'response'})
      .pipe(catchError(this.formatErrors));
  }

  getV4<T>(path: string, params: HttpParams = new HttpParams()): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${path}`, {'params' : params, 'responseType': 'json', observe: 'response'})
      .pipe(catchError(this.formatErrors));
  }

  getV5<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${path}`, {'params' : params, 'responseType': 'json'})
      .pipe(catchError(this.formatErrors));
  }

  fileUpload(uri:string, formData:FormData): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders().append('req_type', 'file_upload');
    const req = new HttpRequest('POST', `${uri}`, formData, {headers, reportProgress: true, responseType: 'json'});
    return this.http.request(req).pipe(catchError(this.formatErrors))
  }

  fileUploadWithFileCategory(uri:string, formData:FormData, params:HttpParams = new HttpParams()): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders().append('req_type', 'file_upload');
    const req = new HttpRequest('POST', `${uri}`, formData, {headers, params, reportProgress: true, responseType: 'json'});
    return this.http.request(req).pipe(catchError(this.formatErrors))
  }

  /*fileUploadV2(path: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
    const httpOptions = {'params' : params, 'responseType'  : 'arraybuffer' as 'json'};
    return this.http.post(`${path}`, JSON.stringify(body), httpOptions)
      .pipe(catchError(this.formatErrors));
  }*/

}
