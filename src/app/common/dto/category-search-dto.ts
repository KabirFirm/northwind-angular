import {CurrentPage} from "../model/current-page";
import {prop, propArray} from "@rxweb/reactive-form-validators";

export class CategorySearchDto extends CurrentPage {
  @propArray()
  idList:Array<string | null> = [];
  @propArray()
  categoryNameList:Array<string>;
  @prop()  searchTerm: string;


  public constructor(o?: Partial<CategorySearchDto>) {
    super();
    Object.assign(this, o);
  }
}
