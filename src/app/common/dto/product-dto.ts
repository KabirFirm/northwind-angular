import {FormStatusWithPage} from "../model/FormStatusWithPage";
import {prop, required} from "@rxweb/reactive-form-validators";

export class ProductDto extends FormStatusWithPage{
  @prop()
  id: string;

  @required({ message: 'productName is required' })
  productName: string;
  @prop() supplierId: string;
  @prop() companyName: string;
  @prop() categoryId: string;
  @prop() categoryName: string;
  @prop() quantityPerUnit: string;
  @prop() unitPrice: string;
  @prop() unitsInStock: string;
  @prop() unitsOnOrder: string;
  @prop() reorderLevel: string;
  @prop() discontinued: string;

  public constructor(o?: Partial<ProductDto>) {
    super()
    Object.assign(this, o);
  }

}
