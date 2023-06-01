import {CurrentPage} from "../model/current-page";
import {prop, propArray} from "@rxweb/reactive-form-validators";

export class ProductSearchDto extends CurrentPage {
  @propArray()
  idList:Array<string | null> = [];
  @propArray()
  productNameList:Array<string>;
  @prop()  searchTerm: string;


  public constructor(o?: Partial<ProductSearchDto>) {
    super();
    Object.assign(this, o);
  }
}
