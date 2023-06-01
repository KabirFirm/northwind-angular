import {prop} from "@rxweb/reactive-form-validators";

export class FormStatusWithPage {

  @prop()  loadingMode: boolean = false;

  @prop()  updateMode: boolean = false;

  @prop()  page:number;

  @prop() size:number = 10;


  public constructor(o?: Partial<FormStatusWithPage>) {
    Object.assign(this, o);
  }

}
