import {FormStatusWithPage} from "../model/FormStatusWithPage";
import {prop, required} from "@rxweb/reactive-form-validators";

export class SupplierDto extends FormStatusWithPage{
  @prop()
  id: string;

  @required({ message: 'categoryName is required' })
  categoryName: string;
  @prop() companyName: string;
  @prop() contactName: string;
  @prop() contactTitle: string;
  @prop() address: string;
  @prop() city: string;
  @prop() region: string;
  @prop() postalCode: string;
  @prop() country: string;
  @prop() phone: string;
  @prop() fax: string;
  @prop() homepage: string;

  public constructor(o?: Partial<SupplierDto>) {
    super()
    Object.assign(this, o);
  }

}
