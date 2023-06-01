import {prop} from '@rxweb/reactive-form-validators';

export class CurrentPage {

  @prop() page:number;

  @prop() size:number = 10;

  /*  @prop()
    sortKeyOrderMap: Map<String, String>;*/

  public constructor(o?: Partial<CurrentPage>) {
    Object.assign(this, o);
  }
}
