import {Sort} from "./sort";

export class Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
  sort: Sort = new Sort();
}
