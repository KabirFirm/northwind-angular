import {prop, required} from "@rxweb/reactive-form-validators"
import {FormStatusWithPage} from "../model/FormStatusWithPage";

export class CategoryDto extends FormStatusWithPage{
  @prop()
  id: string;

  @required({ message: 'categoryName is required' })
  categoryName: string;
  @prop() description: string;
  @prop() picture: string;

  public constructor(o?: Partial<CategoryDto>) {
    super()
    Object.assign(this, o);
  }

}
